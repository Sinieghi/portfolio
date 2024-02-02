export function formatImageName(name, format) {
  let u = format.length;
  let str = "";
  let i = 0;
  let k = -1;
  for (i; i < u; i++) {
    if (format[i - 1] === "/") k = i;
    if (k != -1) {
      k++;
      str += format[i];
    }
  }
  if (formatBoolean(str)) return name + "." + str;
  else throw new Error("Formato inválido de imagem.");
}

function formatBoolean(str) {
  if (
    str === "apng" ||
    str === "avif" ||
    str === "gif" ||
    str === "jpeg" ||
    str === "jpg" ||
    str === "jfif" ||
    str === "pjpeg" ||
    str === "pjp" ||
    str === "png" ||
    str === "svg" ||
    str === "webp"
  )
    return true;
  else {
    return false;
  }
}
