---
description: 'Laravel-Excel 3.0文档涵盖基本用法、依赖注入、集合操作，支持将Collection导出为Excel下载或存储到磁盘。提供从查询输出、自定义查询、构造器参数、视图等多种导出方式，并支持队列处理、追加任务及自定义队列。包含多单元表、数据遍历、行遍历、表头添加、列格式化、日期处理、关系导出、Traits扩展、事件（自动注册监听器）及宏。测试方面支持下载、存储和队列导出的测试。'
lastUpdated: '2026-06-17 22:44:35'
head:
  - - meta
    - name: 'og:title'
      content: 'Laravel-Excel 3.0 文档'
  - - meta
    - name: 'og:type'
      content: 'article'
  - - meta
    - name: 'og:description'
      content: 'Laravel-Excel 3.0文档涵盖基本用法、依赖注入、集合操作，支持将Collection导出为Excel下载或存储到磁盘。提供从查询输出、自定义查询、构造器参数、视图等多种导出方式，并支持队列处理、追加任务及自定义队列。包含多单元表、数据遍历、行遍历、表头添加、列格式化、日期处理、关系导出、Traits扩展、事件（自动注册监听器）及宏。测试方面支持下载、存储和队列导出的测试。'
  - - meta
    - name: 'og:url'
      content: 'https://www.wulicode.com//back-end/php/laravel/packages/laravel-excel-v3.html'
---
# Laravel-Excel 3.0 文档

## 基本用法

最简单的导出方法是创建一个自定义的导出类, 这里我们使用发票导出作为示例.在 `App/Exports` 下创建一个 `InvoicesExport` 类

```PHP
namespace App\Exports;
use Maatwebsite\Excel\Concerns\FromCollection;
class InvoicesExport implements FromCollection
{
    public function collection()
    {
        return Invoice::all();
    }
}
```

在控制器中你可以使用如下方式来下载

```Plaintext
public function export()
{
    return Excel::download(new InvoicesExport, 'invoices.xlsx');
}
```

或者存储在 `s3` 磁盘中

```Plaintext
public function storeExcel()
{
    return Excel::store(new InvoicesExport, 'invoices.xlsx', 's3');
}
```

### 依赖注入

如果你的导出需要依赖, 你可以注入导出类

```Plaintext
namespace App\Exports;
use Maatwebsite\Excel\Concerns\FromCollection;
class InvoicesExport implements FromCollection
{
    public function __construct(InvoicesRepository $invoices)
    {
        $this->invoices = $invoices;
    }
    public function collection()
    {
        return $this->invoices->all();
    }
}
```

```Plaintext
public function export(Excel $excel, InvoicesExport $export)
{
    return $excel->download($export, 'invoices.xlsx');
}
```

### 严格的 null 对比

如果你希望 `0` 在 excel 单元格中就是显示 0, 而不是显示 `null`(空单元格), 你可以使用 `WithStrictNullComparison`

```PHP
namespace App\Exports;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;
class InvoicesExport implements FromCollection, WithStrictNullComparison
{
    public function __construct(InvoicesRepository $invoices)
    {
        $this->invoices = $invoices;
    }
    public function collection()
    {
        return $this->invoices->all();
    }
}
```

### Collection 全局定义/宏

这个包提供了 laravel collection 的一些额外的方法(宏) 来简单的下载或者是存储到 excel

### 把 collection 作为 Excel 下载

```Plaintext
(new Collection([[1, 2, 3], [1, 2, 3]]))->downloadExcel(
    $filePath,
    $writerType = null,
    $headings = false
)
```

### 在磁盘上存储 collection

```Plaintext
(new Collection([[1, 2, 3], [1, 2, 3]]))->storeExcel(
    $filePath,
    $disk = null,
    $writerType = null,
    $headings = false
)
```

## 在磁盘上存储导出

导出可以存储到任何 Laravel 支持的 [文件系统](https://laravel.com/docs/5.6/filesystem) 中

```Plaintext
public function storeExcel()
{
    // Store on default disk
    Excel::store(new InvoicesExport(2018), 'invoices.xlsx');
    // Store on a different disk (e.g. s3)
    Excel::store(new InvoicesExport(2018), 'invoices.xlsx', 's3');
    // Store on a different disk with a defined writer type.
    Excel::store(new InvoicesExport(2018), 'invoices.xlsx', 's3', Excel::XLSX);
}
```

### Exportables / 可导出的

在之前的例子中, 我们使用 `Excel::download` 这个 facade 来开始一个导出.Laravel-Excel 同样支持  `Maatwebsite\Excel\Concerns\Exportable` trait, 来让一个类可以直接导出, 当然, 这个类里边需要有 collection 方法.

```PHP
namespace App\Exports;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\Exportable;
class InvoicesExport implements FromCollection
{
    use Exportable;
    public function collection()
    {
        return Invoice::all();
    }
}
```

我们可以不通过 facade 直接进行类的下载

```Plaintext
return (new InvoicesExport)->download('invoices.xlsx');
```

或者是存储到磁盘上.

```Plaintext
return (new InvoicesExport)->store('invoices.xlsx', 's3');
```

### Responsable / 可响应的

之前的例子可以做的简单一点, 例如我们添加 Laravel 的 `Responsable` 到导出类中

```PHP
namespace App\Exports;
use Illuminate\Contracts\Support\Responsable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\Exportable;
class InvoicesExport implements FromCollection, Responsable
{
    use Exportable;
    /**
    * It's required to define the fileName within
    * the export class when making use of Responsable.
    */
    private $fileName = 'invoices.xlsx';
    public function collection()
    {
        return Invoice::all();
    }
}
```

你可以更简单的返回导出类,但是不需要调用 `->download()` 方法.

```Plaintext
return new InvoicesExport();
```

## From Query / 从查询输出

在之前的例子中, 我们在导出类中进行查询, 当然这个解决方案可以用在小的导出类中. 对于更大一点数据的导出类可能造成比较大的性能开销.通过使用 `FromQuery` 关系, 我们可以通过预查询一个导出, 这个场景实现的原理是查询可以分块执行.在 `InvoicesExport` 类中,添加 `FromQuery` 关系, 并且添加一个查询, 并且确保不要使用 `->get()` 来获取到数据!.

```Plaintext
namespace App\Exports;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
class InvoicesExport implements FromQuery
{
    use Exportable;
    public function query()
    {
        return Invoice::query();
    }
}
```

我们可以通过同样的方式来下载

```Plaintext
return (new InvoicesExport)->download('invoices.xlsx');
```

### 自定义查询

这种方式可以通过自定义的参数来进行查询. 简单的作为依赖项传入导出类即可.

### 作为构造器参数

```Plaintext
namespace App\Exports;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
class InvoicesExport implements FromQuery
{
    use Exportable;
    public function __construct(int $year)
    {
        $this->year = $year;
    }
    public function query()
    {
        return Invoice::query()->whereYear('created_at', $this->year);
    }
}
```

`$year` 参数可以传递给导出类.

```Plaintext
return (new InvoicesExport(2018))->download('invoices.xlsx');
```

### 作为设置项

```Plaintext
namespace App\Exports;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
class InvoicesExport implements FromQuery
{
    use Exportable;
    public function forYear(int $year)
    {
        $this->year = $year;
        return $this;
    }
    public function query()
    {
        return Invoice::query()->whereYear('created_at', $this->year);
    }
}
```

我们可以通过 `forYear` 方法来调整年份.

```Plaintext
return (new InvoicesExport)->forYear(2018)->download('invoices.xlsx');
```

## 通过视图

我们可以通过 blade 视图来创建导出. 通过使用 `FromView` 关系.

```Plaintext
namespace App\Exports;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
class InvoicesExport implements FromView
{
    public function view(): View
    {
        return view('exports.invoices', [
            'invoices' => Invoice::all()
        ]);
    }
}
```

这种方式会导出一个 Html 表格到 Excel 单元表, 例如 `users.blade.php`:

```HTML
<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Email</th>
    </tr>
    </thead>
    <tbody>
    @foreach($users as $user)
        <tr>
            <td>{{ $user->name }}</td>
            <td>{{ $user->email }}</td>
        </tr>
    @endforeach
    </tbody>
</table>
```

## 队列

如果你处理更大数据量的数据, 很明智的方法就是使用队列来运行.例如下边的导出类:

```PHP
namespace App\Exports;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
class InvoicesExport implements FromQuery
{
    use Exportable;
    public function query()
    {
        return Invoice::query();
    }
}
```

我们只需要调用一个 `->queue()` 方法即可.

```Plaintext
return (new InvoicesExport)->queue('invoices.xlsx');
```

后台处理这些查询的方式是通过多任务/多切割的方式来进行. 这些任务使用正确的顺序来执行. 并且保证之前的查询都是正确的.

### 另一种方式的队列实现

你可以将导出作为一个可以扔到队列中的实现(利用 Laravel), 可以使用 `ShouldQueue` 约束.

```PHP
namespace App\Exports;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Illuminate\Contracts\Queue\ShouldQueue;
class InvoicesExport implements FromQuery, ShouldQueue
{
    use Exportable;
    public function query()
    {
        return Invoice::query();
    }
}
```

在控制器中可以调用普通的 `->store()` 方法. 基于 `ShouldQueue`, 通过 laravel 的队列方式来实现队列处理. [ps:你需要首先自行配置队列]

```Plaintext
return (new InvoicesExport)->store('invoices.xlsx');
```

### 追加任务 / jobs

`queue()` 方法返回一个 Laravel 的  `PendingDispatch` 实例, 这意味着你可以把其他的任务串联起来, 仅仅当前一个任务执行成功的时候, 后续的任务才能够被执行.

```Plaintext
return (new InvoicesExport)->queue('invoices.xlsx')->chain([
    new NotifyUserOfCompletedExport(request()->user()),
]);
```

```PHP
namespace App\Jobs;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
class InvoiceExportCompletedJob implements ShouldQueue
{
    use Queueable;
    public function handle()
    {
        // Do something.
    }
}
```

### 自定义队列

当 `PendingDispatch` 返回的时候, 我们可以改变我们使用的队列.

```Plaintext
return (new InvoicesExport)->queue('invoices.xlsx')->allOnQueue('exports');
```

## 多单元表

为了能够让导出支持多单元表, 需要使用 `WithMultipleSheets` 关系来实现. 这个 `sheets()` 方法需要返回一个单元表数组.

```PHP
namespace App\Exports;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
class InvoicesExport implements WithMultipleSheets
{
    use Exportable;
    protected $year;
    public function __construct(int $year)
    {
        $this->year = $year;
    }
    /**
     * @return array
     */
    public function sheets(): array
    {
        $sheets = [];
        for ($month = 1; $month <= 12; $month++) {
            $sheets[] = new InvoicesPerMonthSheet($this->year, $month);
        }
        return $sheets;
    }
}
```

这个 `InvoicesPerMonthSheet` 可以实现多种关系. 例如 `FromQuery`, `FromCollection`, …

```PHP
namespace App\Exports;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithTitle;
class InvoicesPerMonthSheet implements FromQuery, WithTitle
{
    private $month;
    private $year;
    public function __construct(int $year, int $month)
    {
        $this->month = $month;
        $this->year  = $year;
    }
    /**
     * @return Builder
     */
    public function query()
    {
        return Invoice
            ::query()
            ->whereYear('created_at', $this->year)
            ->whereMonth('created_at', $this->month);
    }
    /**
     * @return string
     */
    public function title(): string
    {
        return 'Month ' . $this->month;
    }
}
```

以下可以下载 2018 年的所有的发票, 它包含 12 单元表来显示每个月的数据.

```PHP
public function download()
{
    return (new InvoicesExport(2018))->download('invoices.xlsx');
}
```

## 数据遍历

### 遍历行

通过添加  `WithMapping`, 你可以遍历添加到单元行中的每一条数据然后并返回.这种方法你可以控制每一列的数据, 假设你使用 Eloquent 的 query builder.

```PHP
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithMapping;
class InvoicesExport implements FromQuery, WithMapping
{
    /**
    * @var Invoice $invoice
    */
    public function map($invoice): array
    {
        return [
            $invoice->invoice_number,
            Date::dateTimeToExcel($invoice->created_at),
        ];
    }
}
```

### 添加表头

可以通过添加一个  `WithHeadings` 约束来实现. 表头会添加到所有数据的第一行的位置上.

```PHP
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
class InvoicesExport implements FromQuery, WithHeadings
    public function headings(): array
    {
        return [
            '#',
            'Date',
        ];
    }
}
```

## 格式化列

你可以格式化整列, 通过添加 `WithColumnFormatting`, 如果你想更多范围的自定义. 推荐使用 `AfterSheet` 事件来直接和地城的 `Worksheet` 类进行交互.

```PHP
namespace App\Exports;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithMapping;
class InvoicesExport implements WithColumnFormatting, WithMapping
{
    public function map($invoice): array
    {
        return [
            $invoice->invoice_number,
            Date::dateTimeToExcel($invoice->created_at),
            $invoice->total
        ];
    }
    /**
     * @return array
     */
    public function columnFormats(): array
    {
        return [
            'B' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'C' => NumberFormat::FORMAT_CURRENCY_EUR_SIMPLE,
        ];
    }
}
```

### 日期

当操作日期的时候. 推荐使用 `\PhpOffice\PhpSpreadsheet\Shared\Date::dateTimeToExcel()` 来正确的解析你的日期数据.

## 导出关系

| Interface | Explanation |
|-|-|
| `Maatwebsite\Excel\Concerns\FromCollection` | Use a Laravel Collection to populate the export. |
| `Maatwebsite\Excel\Concerns\FromQuery` | Use an Eloquent query to populate the export. |
| `Maatwebsite\Excel\Concerns\FromView` | Use a (Blade) view to to populate the export. |
| `Maatwebsite\Excel\Concerns\WithTitle` | Set the Workbook or Worksheet title. |
| `Maatwebsite\Excel\Concerns\WithHeadings` | Prepend a heading row. |
| `Maatwebsite\Excel\Concerns\WithMapping` | Format the row before it’s written to the file. |
| `Maatwebsite\Excel\Concerns\WithColumnFormatting` | Format certain columns. |
| `Maatwebsite\Excel\Concerns\WithMultipleSheets` | Enable multi-sheet support. Each sheet can have its own concerns (except this one). |
| `Maatwebsite\Excel\Concerns\ShouldAutoSize` | Auto-size the columns in the worksheet. |
| `Maatwebsite\Excel\Concerns\WithStrictNullComparison` | Uses strict comparisions when testing cells for null value. |
| `Maatwebsite\Excel\Concerns\WithEvents` | Register events to hook into the PhpSpreadsheet process. |

### Traits

| Trait | Explanation |
|-|-|
| `Maatwebsite\Excel\Concerns\Exportable` | Add download/store abilities right on the export class itself. |
| `Maatwebsite\Excel\Concerns\RegistersEventListeners` | Auto-register the available event listeners. |

## 扩展

### 事件

导出过程有一些事件，你可以利用这些事件与底层类进行交互，以向导出添加自定义行为。通过使用事件，您可以连接到父包。如果你需要完全控制导出，则不需要使用诸如 “query” 或者 “view” 之类的便利方法。事件将通过添加 `WithEvents` 关注来激活。在 `registerEvents` 方法中，你必须返回一系列事件。Key 是事件的完全限定名(FQN)，Value 是可调用的事件监听器。这可以是一个闭包、可调用的数组 或 invokable 类。

```PHP
namespace App\Exports;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\BeforeExport;
use Maatwebsite\Excel\Events\BeforeWriting;
use Maatwebsite\Excel\Events\BeforeSheet;
class InvoicesExport implements WithEvents
{
    /**
     * @return array
     */
    public function registerEvents(): array
    {
        return [
            // Handle by a closure.
            BeforeExport::class => function(BeforeExport $event) {
                $event->writer->getProperties()->setCreator('Patrick');
            },
            // Array callable, refering to a static method.
            BeforeWriting::class => [self::class, 'beforeWriting'],
            // Using a class with an __invoke method.
            BeforeSheet::class => new BeforeSheetHandler()
        ];
    }
    public static function beforeWriting(BeforeWriting $event)
    {
        //
    }
}
```

请注意，使用 `Closure` 将不可能与队列导出合并，因为PHP不能序列化闭包。在这些情况下，最好使用 `RegistersEventListeners` 特性。

### 自动注册事件监听器

通过使用 `RegistersEventListeners` trait ，你可以自动注册事件监听器，而不需要使用 `registerEvents` 。只有在创建方法时，侦听器才会被注册。

```PHP
namespace App\Exports;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\RegistersEventListeners;
use Maatwebsite\Excel\Events\BeforeExport;
use Maatwebsite\Excel\Events\BeforeWriting;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Events\AfterSheet;
class InvoicesExport implements WithEvents
{
    use Exportable, RegistersEventListeners;
    public static function beforeExport(BeforeExport $event)
    {
        //
    }
    public static function beforeWriting(BeforeWriting $event)
    {
        //
    }
    public static function beforeSheet(BeforeSheet $event)
    {
        //
    }
    public static function afterSheet(AfterSheet $event)
    {
        //
    }
}
```

### 可用的事件

| Event name | Payload | Explanation |
|-|-|-|
| `Maatwebsite\Excel\Events\BeforeExport` | `$event->writer : Writer` | Event gets raised at the start of the process. |
| `Maatwebsite\Excel\Events\BeforeWriting` | `$event->writer : Writer` | Event gets raised before the download/store starts. |
| `Maatwebsite\Excel\Events\BeforeSheet` | `$event->sheet : Sheet` | Event gets raised just after the sheet is created. |
| `Maatwebsite\Excel\Events\AfterSheet` | `$event->sheet : Sheet` | Event gets raised at the end of the sheet process. |

### 宏

`Writer` 和 `Sheet` 都是可以进行宏操作的，这意味着它可以很容易地扩展以满足你的需要。Writer 和 Sheet都有一个 `->getDelegate()` 方法，它返回底层的PhpSpreadsheet 类。这将允许你为 PhpSpreadsheets 方法添加快捷方法，而这个方法在这个包中是不可用的。

### Writer / 写入

```PHP
use \Maatwebsite\Excel\Writer;
Writer::macro('setCreator', function (Writer $writer, string $creator) {
    $writer->getDelegate()->getProperties()->setCreator($creator);
});
```

### Sheet / 单元表

```PHP
use \Maatwebsite\Excel\Sheet;
Sheet::macro('setOrientation', function (Sheet $sheet, $orientation) {
    $sheet->getDelegate()->getPageSetup()->setOrientation($orientation);
});
```

你还可以为样式单元添加一些快捷方法。你可以自由使用这个宏，或者创造你自己的语法!

```PHP
use \Maatwebsite\Excel\Sheet;
Sheet::macro('styleCells', function (Sheet $sheet, string $cellRange, array style) {
    $sheet->getDelegate()->getStyle($cellRange)->applyFromArray($style);
});
```

以上例子可作:

```PHP
namespace App\Exports;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\BeforeExport;
use Maatwebsite\Excel\Events\AfterSheet;
class InvoicesExport implements WithEvents
{
    /**
     * @return array
     */
    public function registerEvents(): array
    {
        return [
            BeforeExport::class  => function(BeforeExport $event) {
                $event->writer->setCreator('Patrick');
            },
            AfterSheet::class    => function(AfterSheet $event) {
                $event->sheet->setOrientation(\PhpOffice\PhpSpreadsheet\Worksheet\PageSetup::ORIENTATION_LANDSCAPE);
                $event->sheet->styleCells(
                    'B2:G8',
                    [
                        'borders' => [
                            'outline' => [
                                'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THICK,
                                'color' => ['argb' => 'FFFF0000'],
                            ],
                        ]
                    ]
                );
            },
        ];
    }
}
```

对于 PhpSpreadsheet 方法, 可查看文档: [https://phpspreadsheet.readthedocs.io/](https://phpspreadsheet.readthedocs.io/)

## 测试 / Testing

The Excel facade can be used to swap the exporter to a fake.

### 测试下载

```PHP
/**
* @test
*/
public function user_can_download_invoices_export()
{
    Excel::fake();
    $this->actingAs($this->givenUser())
         ->get('/invoices/download/xlsx');
    Excel::assertDownloaded('filename.xlsx', function(InvoicesExport $export) {
        // Assert that the correct export is downloaded.
        return $export->collection()->contains('#2018-01');
    });
}
```

### 测试存储导出

```PHP
/**
* @test
*/
public function user_can_store_invoices_export()
{
    Excel::fake();
    $this->actingAs($this->givenUser())
         ->get('/invoices/store/xlsx');
    Excel::assertStored('filename.xlsx', 'diskName');
    Excel::assertStored('filename.xlsx', 'diskName', function(InvoicesExport $export) {
        return true;
    });
    // When passing the callback as 2nd param, the disk will be the default disk.
    Excel::assertStored('filename.xlsx', function(InvoicesExport $export) {
        return true;
    });
}
```

### 测试队列导出

```PHP
/**
* @test
*/
public function user_can_queue_invoices_export()
{
    Excel::fake();
    $this->actingAs($this->givenUser())
         ->get('/invoices/queue/xlsx');
    Excel::assertQueued('filename.xlsx', 'diskName');
    Excel::assertQueued('filename.xlsx', 'diskName', function(InvoicesExport $export) {
        return true;
    });
    // When passing the callback as 2nd param, the disk will be the default disk.
    Excel::assertQueued('filename.xlsx', function(InvoicesExport $export) {
        return true;
    });
}
```