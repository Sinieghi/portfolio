export function findAndReplace(arr, n, data, keys) {
  let a = [];
  if(n == 0)return [data]
  for (let i = 0; i < n; i++) {
    let u = -1;
    if (arr[i][keys.var] === keys.value) {
      u = i;
    }
    if (u != -1) a[u] = data;
    else a[i] = arr[i];
  }
  console.log(a);
  return a;
}
