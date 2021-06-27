import http from "./http";
const querystring = require('querystring');

const apiUrl = "/api/animes";

const jikanUrl = "https://api.jikan.moe/v3";

function animeUrl(id) {
  return `${jikanUrl}/anime/${id}`;
}

function searchUrl(query) {
  return `https://blooming-headland-42531.herokuapp.com/${jikanUrl}/search/anime/?${querystring.stringify(query)}`;
}

export function getAnimes() {
  return http.get(apiUrl);
}

export function getAnimeByMalId(id) {
  return http.get(animeUrl(id));
}

export function getAnimeBySearchQuery(query) {
  console.log(searchUrl(query));
  return http.get(searchUrl(query));
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