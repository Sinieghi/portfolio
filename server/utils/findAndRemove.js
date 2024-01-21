export function findAndRemove(arr, n, keys) {
  let a = [];
  for (let i = 0; i < n; i++) {
    if (arr[i][keys.var] !== keys.value) {
      a[a.length] = arr[i];
    }
  }
  return a;
}

export function findAndRemoveMongoId(arr, n, keys) {
  let a = [];
  for (let i = 0; i < n; i++) {
    if (arr[i][keys.var].toString() !== keys.value) {
      a[a.length] = arr[i];
    }
  }
  return a;
}
