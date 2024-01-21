export function userInitials(name) {
  let i = 0;
  let u = -1;
  let n = name.length;
  let str = name[0];
  for (i; i < n; i++) {
    if (name[i - 1] === " ") {
      u = i;
      break;
    }
  }
  if (u > 0) str += name[u];
  return str.toUpperCase();
}
