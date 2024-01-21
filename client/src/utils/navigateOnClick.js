export function navigateContent() {
  const emailLink = document.querySelector("#mail");
  const messageLink = document.querySelector("#messages");
  document
    .getElementById("mail")
    .scrollIntoView({ behavior: "smooth", block: "center" });
  emailLink?.classList.add("msg-target");
  messageLink?.classList.add("msg-target");
  setTimeout(() => {
    emailLink.classList.remove("msg-target");
    messageLink.classList.remove("msg-target");
  }, 5000);
}

export function navigateOut(t, d) {
  setTimeout(() => {
    window.location.pathname = d;
  }, t);
}

export function callActionHandleClick(variable, item) {
  let urlNavigate = new URL(window.location.href);
  urlNavigate.searchParams.set(variable, `${item}`);
  window.history.pushState({ path: urlNavigate.href }, "", urlNavigate.href);
  console.log(urlNavigate);
}
