export function getAuthHeader() {
  let token = localStorage.getItem("auth token");
  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}