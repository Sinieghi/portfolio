export function unshift(arr, n, data) {
  let a = [];
  let i = 0;
  if (!data) return arr;
  a[0] = data;
  if (n == 0) return a;
  for (i; i < n; i++) {
    a[a.length] = arr[i];
  }
  return a;
}
