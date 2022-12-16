void main(List<String> args) {
  int fibonacci(n) {
    if (n == 0 || n == 1) {
      return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
  }

  var result = fibonacci(7);

  print(result);

  var num = 1;
  var items = [];
  while (num < 10) {
    num += 1;
    items.add(fibonacci(num));
    print(items);
  }
}
