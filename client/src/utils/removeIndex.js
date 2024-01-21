export function removeIndex(arr, n, index) {
  let a = [];
  for (let i = 0; i < n; i++) {
    if (index != i) a[a.length] = arr[i];
  }
  return a;
}
