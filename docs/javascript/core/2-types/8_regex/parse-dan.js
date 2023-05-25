function parseDan(str) {
  let re = /(.*?)\s*(\d+)/;
  let m;
  if ((m = re.exec(str)) !== null) {
    console.log(m);
    if (m.index === re.lastIndex) {
      re.lastIndex++;
    }
    return {
      dan: m[1],
      num: m[2]
    };
  }
  return {
    dan: "",
    num: 0
  };
}

console.log(parseDan('青铜3'));
console.log(parseDan('青铜 3'));