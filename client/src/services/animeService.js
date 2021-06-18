import http from "./http";

const apiUrl = "/api/animes";

function animeUrl(id) {
  return `${apiUrl}/${id}`;
}

export function getAnimes() {
  return http.get(apiUrl);
}

export function getAnime(id) {
  return http.get(animeUrl(id));
}

export function saveAnime(anime) {
  if (anime._id) {
    const body = { ...anime };
    delete body._id;
    return http.put(animeUrl(anime._id), body);
  }
  return http.post(apiUrl, anime);
}

export function deleteAnime(anime) {
  return http.delete(animeUrl(anime._id),{ data:anime });
}