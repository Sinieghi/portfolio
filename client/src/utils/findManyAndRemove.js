export function findManyAndRemove(arr, n, keys) {
  let a = [];
  let j = keys.value.length;
  for (let i = 0; i < j; i++) {
    let k = -1;
    for (let u = 0; u < n; u++) {
      if (arr[u][keys.var] === keys.value[i]) k = i;
    }
    if (k == -1) a[a.length] = arr[i];
  }
  return a;
}

export function findManyAndRemoveByRef(arr, n, keys) {
  let a = [];
  let j = keys.value.length;
  for (let i = 0; i < j; i++) {
    let k = -1;
    for (let u = 0; u < n; u++) {
      if (arr[u][keys.var[0]] === keys.value[i][keys.var[1]]) k = i;
    }
    if (k == -1) a[a.length] = arr[i];
  }
  return a;
}
