<!-- 单行 -->
<p>This is going to be ignored by PHP and displayed by the browser.</p>
<?php echo 'While this is going to be parsed.'; ?>

<!-- 多行 -->
<?php if ($expression == true): ?>
    This will show if the expression is true.
<?php else: ?>
    Otherwise this will show.
<?php endif; ?>

<!-- 换行 -->
<?php echo 'if you want to serve PHP code in XHTML or XML documents,
                use these tags'; ?>