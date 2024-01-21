export function push(arr, n, data) {
  let a = [];
  for (let i = 0; i < n; i++) {
    a[i] = arr[i];
  }
  if (data) a[a.length] = data;
  return a;
}
export function pushBool(n, bool) {
  let a = [];
  for (let i = 0; i < n; i++) {
    a[i] = bool;
  }
  return a;
}

export function pushMany(arr, data) {
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
    if (i < k) a[a.length] = { ...arr[i] };
    else a[a.length] = { ...data[j++] };
  }
  return a;
}
