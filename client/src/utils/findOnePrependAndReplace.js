export function findOnePrependReplace(arr, n, data, keys) {
  let a = [];
  let i = 0;
  a[0] = data;
  for (i; i < n; i++) {
    if (arr[i][keys.var] !== keys.value) {
      a[a.length] = arr[i];
    }
  }
  return a;
}
