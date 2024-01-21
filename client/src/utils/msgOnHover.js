export function showWraningOnHover(index, isHist) {
  if (isHist) {
    document
      .querySelector(`.check${index}-hist`)
      ?.classList?.add(`ballon_text-container-check-${index}-hist`);
    return;
  } else {
    document
      .querySelector(`.check${index}`)
      ?.classList?.add(`ballon_text-container-check-${index}`);
  }
}
export function hideWraningOnHover(index, isHist) {
  if (isHist) {
    document
      .querySelector(`.check${index}-hist`)
      ?.classList?.remove(`ballon_text-container-check-${index}-hist`);
    return;
  } else {
    document
      .querySelector(`.check${index}`)
      ?.classList?.remove(`ballon_text-container-check-${index}`);
  }
}
