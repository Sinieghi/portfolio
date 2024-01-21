export function exists(arr, n, { key, val }) {
  let b = false;
  for (let i = 0; i < n; i++) {
    if (arr[i][key] === val) b = true;
  }
  return b;
}
