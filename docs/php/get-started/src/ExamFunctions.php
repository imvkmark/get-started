<?php

namespace Php;

use Artisan;
use Illuminate\Support\Str;
use Op\Classes\LocalDir;
use ReflectionClass;
use ReflectionMethod;
use Storage;
use function Core\Classes\collect;

class ExamFunctions
{

	static $storage;

	public function __construct()
	{
		self::$storage = Storage::disk('storage');
	}

	/**
	 * @var array 可以排除函数前缀
	 */
	private static $funPhpExceptPrefix = [
		'zip_',
		'xmlwriter_',
		'opcache_',
		'xmlrpc_',
		'wddx_',
		'msg_',
		'sem_',
		'shm_',
		'stream_',
		'socket_',
		'password_',
		'readline_',
		'pspell_',
		'posix_',
		'pg_',
		'pcntl_',
		'odbc_',
		'proc_',
		'shmop_',
		'ldap_',
		'mbereg_',
		'intlcal_',
		'intltz_',
		'intlgregcal_',
		'grapheme_',
		'gmp_',
		'dba_',
		'ftp_',
		'collator_',
		'resourcebundle_',
		'cli_',
		'transliterator_',
		'mhash_',
		'ctype_',
		'zlib_',
		'image',
		'iconv_',
		'numfmt_',
		'msgfmt_',
		'idn_',
		'intel_',
		'mb_',
		'xml_',
		'openssl_',
		'gz',
		'deflate_',
		'inflate_',
		'bz',
		'cal_',
	];

	/**
	 * @var array 可以排除用户函数前缀
	 */
	private static $funUserExceptPrefix = [
		'guzzlehttp\\',
		'composer',
		'mb_',
	];

	/**
	 * @var array 可以排除类前缀
	 */
	private static $classExceptPrefix = [
		'SQLite3',
		'DOM',
		'Spl',
		'Soap',
		'GMP',
		'Symfony',
		'Predis',
		'Clockwork',
		'Phar',
		'Dotenv\\',
		'Illuminate\\',
		'EloquentFilter\\',
		'Composer',
		'PHPExcel_',
		'Swift\\',
		'class@',
		'PHPUnit\\',
	];

	/**
	 * @var array 可以排除类后缀
	 */
	private static $classExceptSuffix = [
		'Iterator',
		'Exception',
		'Error',
		'Command',
		'Provider',
		'Controller',
		'Filter',
		'Repository',
		'Channel',
		'Notification',
		'Event',
		'Listener',
		'Policy',
		'Mail',
	];

	/**
	 * @var array 可以排除类包含
	 */
	private static $classExceptContain = [
		'Middlewares',
		'Bootstrap',
	];

	/**
	 * 输出需要检测的 Php 函数
	 * @param int    $functionNum 函数数量
	 * @param int    $methodNum   类方法数量
	 * @param string $version     版本
	 * @return array
	 */
	public static function output($functionNum = 30, $methodNum = 30, $version = 'v1'): array
	{
		if ($version === 'v1') {
			return self::v1($functionNum, $methodNum);
		}

		if ($version === 'v2') {
			return self::v2($functionNum);
		}
	}


	public function v2($functionNum = 30, $trunk = '')
	{
		if (!self::$storage->exists($this->examKey($functionNum))) {
			$this->generate($functionNum);
		}

		$items = self::$storage->get($this->examKey($functionNum));

		$items = collect(json_decode($items));
		if (!$trunk) {
			$trunk = random_int(0, count($items));
		}
		return (array) $items->get($trunk);
	}

	public function generate($functionNum)
	{
		$dir   = LocalDir::alias('lang-php');
		$file  = $dir . '/functions/cheetsheet.md';
		$total = collect(array_filter(file($file)))->filter(function ($line) {
			return Str::contains($line, ' — ');
		});

		$totalFun = $total->shuffle()->values()->map(function ($line) {
			[$fun, $desc] = explode(' — ', $line);
			return [
				$fun, trim($desc),
			];
		})->toArray();
		$truncked = array_chunk($totalFun, $functionNum);
		self::$storage->put($this->examKey($functionNum), json_encode($truncked, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
		return true;
	}


	private function examKey($num)
	{
		return 'app/php/exam-function-' . $num . '.json';
	}

	private static function v1($functionNum, $methodNum)
	{
		/** @noinspection PotentialMalwareInspection */
		$definedFunctions = get_defined_functions();
		$internal         = collect($definedFunctions['internal'])->filter(function ($item) {
			if (Str::startsWith($item, self::$funPhpExceptPrefix)) {
				return false;
			}

			return true;
		});

		$user = collect($definedFunctions['user'])->filter(function ($item) {
			if (Str::startsWith($item, self::$funUserExceptPrefix)) {
				return false;
			}

			return true;
		});

		$functions   = collect();
		$internalNum = ceil($functionNum * .66);
		$userNum     = $functionNum - $internalNum;
		$internal->random($internalNum)->each(function ($item) use ($functions) {
			$functions->push([
				'internal', $item,
			]);
		});
		$user->random($userNum)->each(function ($item) use ($functions) {
			$functions->push([
				'user', $item,
			]);
		});

		// call class location
		Artisan::call('system:inspect', [
			'type'              => 'class',
			'--class_load_only' => true,
		]);

		$classes = collect(get_declared_classes())->filter(function ($item) {
			return !(
				Str::startsWith($item, self::$classExceptPrefix) ||
				Str::endsWith($item, self::$classExceptSuffix) ||
				Str::contains($item, self::$classExceptContain)
			);
		});
		$methods = collect();

		$classes->random($methodNum * 2)->each(function ($className) use ($methods, $methodNum) {
			if ($methods->count() >= $methodNum) {
				return;
			}
			$ref = new ReflectionClass($className);
			if ($ref->isInterface()) {
				return;
			}
			$classMethods = collect($ref->getMethods(ReflectionMethod::IS_PUBLIC))->filter(function (ReflectionMethod $item) {
				if (Str::startsWith($item->getName(), [
					'__',
					'get',
					'set',
					'is',
				])) {
					return false;
				}

				return true;
			});
			/** @var ReflectionMethod $randMethod */
			$randMethod = $classMethods->shuffle()->first();
			if (!$randMethod) {
				return;
			}
			$methods->push([
				$className,
				$randMethod->getName(),
			]);
		});

		return [
			'functions' => $functions,
			'methods'   => $methods,
		];
	}
}
