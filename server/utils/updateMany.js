export function updateMany(arr, keys, vars, val) {
  let n = arr.length;
  let k = keys.length;
  for (let i = 0; i < n; i++) {
    let h = -1;
    for (let u = 0; u < k; u++) {
      if (arr[i][vars[0]] === keys[u][vars[1]]) h = i;
    }
    console.log(h);
    if (h != -1) arr[i] = { ...arr[i], [vars[2]]: val };
  }
  return arr;
}
