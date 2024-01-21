export function getMyDate() {
  return new Date(
    new Date().setHours(
      new Date().getHours() - new Date().getTimezoneOffset() / 60
    )
  ).toISOString();
}
