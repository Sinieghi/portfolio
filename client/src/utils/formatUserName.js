export function formatFirstName(name, n) {
  let str = "";
  let k = 0;
  for (let i = 0; i < n; i++) {
    if (name[i] === " ") k++;
    if (k < 1) str += name[i];
  }

  return str;
}
