import http from "./http";

const apiUrl = "/api/users";

export function register(user) {
  return http.post(apiUrl, {
    email: user.email,
    password: user.password,
    name: user.name
  });
}

export function getUser(user_id) {
  return http.get(`${apiUrl}/${user_id}`);
}