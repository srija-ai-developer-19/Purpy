export function purpyGo(url) {
  window.history.pushState({}, "", url);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.dispatchEvent(new Event("purpy-navigate"));
  window.scrollTo(0, 0);
}