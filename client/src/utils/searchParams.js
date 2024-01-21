export function searchParams(isPathName, isHref, isSearch) {
  if (isPathName) {
    let path = window.location.pathname.split("/");
    return path[path.length - 1];
  }
  if (isHref[0]) {
    const query = new URLSearchParams(window.location.href);
    return query.get(`${isHref[1]}`);
  }
  if (isSearch[0]) {
    const query = new URLSearchParams(window.location.search);
    return query.get(`${isSearch[1]}`);
  }
}
