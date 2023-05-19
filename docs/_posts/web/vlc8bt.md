---
title: "使用前端生成 PDF 的注意事项"
date: 2022-07-14 23:53:34
toc: true
categories:
- ["前端","其他"]
---

这里主要使用前端来生成 pdf, 但是由于浏览器安全性的问题会导致浏览器不允许读取图片, 以下这几个步骤则可以生成 pdf


## 前端框架

### jspdf-html2canvas
[https://github.com/johnnywang1994/jsPDF-html2canvas](https://github.com/johnnywang1994/jsPDF-html2canvas)

- 缺点: 对文字进行切割

![image.png](https://file.wulicode.com/yuque/202208/24/23/1505GFNC1VUO.png?x-oss-process=image/resize,h_243)
```javascript
try {
  html2PDF(document.getElementById('exporter'), {
    jsPDF: {
      format: 'a4',
    },
    html2canvas: {
      useCORS: true
    },
    margin: {
      top: 20,
      // right: 20,
      bottom: 20,
      // left: 20,
    },
    imageType: 'image/jpeg',
    output: '导出文件.pdf'
  });
} catch (e) {
  this.$toast.error('导出PDF失败' + e.message);
}
```

### html2pdf.js
[https://github.com/eKoopmans/html2pdf.js](https://github.com/eKoopmans/html2pdf.js)
```javascript
try {
  let element = document.getElementById('exporter');
  return html2pdf().from(element).set({
    jsPDF: {
      format: 'a4',
    },
    html2canvas: {
      useCORS: true
    },
    pagebreak:{mode: ['avoid-all']},
    enableLinks: false,
    margin: [0, 0, 20, 0],
    image: { type: 'jpeg', quality: 0.98 },
    filename: '导出文件.pdf'
  }).save();
} catch (e) {
  console.log(e);
  this.$toast.error('导出PDF失败' + e.message);
}
```

## 相关配置

### 1. 允许图片跨域访问
```nginx
location ~* \.(jpeg|png|gif|jpg)$ {
    add_header Access-Control-Allow-Origin *;
}
```

### 2. 图片添加跨域属性
```html
<img crossorigin="anonymous" src="url..." />
```

### 3. PDF 工具的 html2canvas 开启 CORS
```javascript
html2PDF(document.getElementById('exporter'), {
  // ...
  html2canvas: {
    useCORS: true
  },
  // ...
});
```

