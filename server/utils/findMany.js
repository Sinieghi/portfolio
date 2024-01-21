export function findMany(arr, keys, vars) {
  let p = [];
  let n = arr.length;
  let k = keys.length;
  for (let i = 0; i < n; i++) {
    let h = -1;
    for (let u = 0; u < k; u++) {
      if (arr[i][vars[0]] === keys[u][vars[1]]) h = i;
    }
    if (h != -1) p[p.length] = h;
  }
  return p;
}
