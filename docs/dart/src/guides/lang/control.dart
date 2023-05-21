void main(List<String> args) {
  // int
  var year = 1977;
  // array
  var flybyObjects = ['Jupiter', 'Saturn', 'Uranus', 'Neptune'];

  if (year > 2000) {
    print('21st century');
  } else if (year > 1900) {
    print('20st century');
  }

  for (final obj in flybyObjects) {
    print(obj);
  }

  for (int month = 1; month <= 12; month++) {
    print(month);
  }

  while (year < 2023) {
    print(year);
    year += 12;
  }
}
