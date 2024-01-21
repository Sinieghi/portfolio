export function findAndRemove(arr, n, keys) {
  let a = [];
  for (let i = 0; i < n; i++) {
    if (arr[i][keys.var] !== keys.value) {
      a[a.length] = arr[i];
    }
  }
  return a;
}

//this one search basically, filter the new data based on those keys
export function findAndRemoveIncomingArray(arr, n, keys) {
  let a = [];
  for (let i = 0; i < n; i++) {
    if (arr[i][keys.var] === keys.value) {
      a[a.length] = arr[i];
    }
  }
  return a;
}

export function findAndRemoveTwoCondition(arr, n, keys) {
  let a = [];
  for (let i = 0; i < n; i++) {
    if (
      arr[i][keys.var[0]] === keys.value[0] &&
      arr[i][keys.var[1]] !== keys.value[1]
    ) {
      a[a.length] = arr[i];
    }
  }
  return a;
}

export function splitDatas(arr, n, keys) {
  let a = [];
  let b = [];
  for (let i = 0; i < n; i++) {
    if (arr[i][keys.var] === keys.value) {
      a[a.length] = arr[i];
    } else {
      b[b.length] = arr[i];
    }
  }
  return { a, b };
}
