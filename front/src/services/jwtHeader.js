export function getAuthHeader() {
  let token = JSON.parse(localStorage.getItem("auth token"));
  console.log('token '+token)
  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}