export function findOne(arr, ref, key) {
  let obj = null;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === ref) {
      obj = arr[i];
      break;
    }
  }
  return obj;
}
