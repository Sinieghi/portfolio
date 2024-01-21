export function removeQuery() {
  window.history.pushState({}, document.title, window.location.pathname);
}
