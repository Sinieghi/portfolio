export function updateOne(arr, key, vars, value) {
  for (let i = 0; i < arr.length; i++) {
    if (key === arr[i][vars[0]]) {
      arr[i][vars[1]] = value;
    }
  }
}
