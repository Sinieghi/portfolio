export function unshift(arr, n, data) {
  let a = [];
  let i = 0;
  a[0] = data;
  if (n == 0) return a;
  for (i; i < n; i++) {
    a[a.length] = { ...arr[i] };
  }
  return a;
}

export function unshiftMany(arr, data) {
  if (typeof arr !== "object" || typeof data !== "object")
    throw new Error("Not an object");
  if (data.length == 0) return arr;
  if (arr.length == 0) return data;
  let a = [];
  let k = arr.length;
  let u = data.length;
  let j = 0;
  let n = k + u;
  if (n == 0) return a;
  for (let i = 0; i < n; i++) {
    if (i < u) {
      a[a.length] = { ...data[i] };
    } else a[a.length] = { ...arr[j++] };
  }
  return a;
}

export function unshiftAndClearObj(arr, data, clear) {
  let n = arr.length;
  let a = [];
  a[0] = data;
  if (n == 0) return a;
  for (let i = 0; i < n; i++) {
    if (arr[i][clear.obj] != clear.value) {
      a[a.length] = arr[i];
    }
  }
  return a;
}
