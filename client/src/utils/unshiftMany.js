export function unshiftMany(arr, incArr) {
  let a = [];
  let n = incArr.length;
  let i = 0;
  for (i; i < n; i++) {
    a[a.length] = incArr[i];
  }
  n = arr.length;
  for (i = 0; i < n; i++) {
    a[a.length] = arr[i];
  }
  return a;
}
