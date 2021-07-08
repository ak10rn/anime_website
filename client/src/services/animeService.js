import http from "./http";
const querystring = require("querystring");

const apiUrl = "/api/animes";
const reviewUrl = "/api/reviews";

const jikanUrl = "https://api.jikan.moe/v3";

function animeUrl(id) {
  return `https://blooming-headland-42531.herokuapp.com/${jikanUrl}/anime/${id}`;
}

function searchUrl(query) {
  return `https://blooming-headland-42531.herokuapp.com/${jikanUrl}/search/anime/?${querystring.stringify(
    query
  )}`;
}

export function getAnimes() {
  return http.get(apiUrl);
}

export function getAnime(mal_id) {
  return http.get(`${apiUrl}/${mal_id}`);
}

export function saveReview(review) {
  if (review._id) {
    const body = { ...review };
    delete body._id;
    return http.put(`${reviewUrl}/${review._id}`, body);
  }
  return http.post(reviewUrl, review);
}

export function deleteReview(review) {
  return http.delete(reviewUrl, { data: review });
}

// to add a review
// const savedReview = await saveReview(review);
// anime.reviews.push(savedReview._id);
// const savedPost = await saveAnime(anime);
// console.log(savedPost);

// to delete a review
// deleteReview(review);
// const index = anime.reviews.indexOf(review._id);
// anime.review.splice(index);
// const savedPost = await saveAnime(anime);
// console.log(savedPost);

export function getAnimeByMalId(id) {
  return http.get(animeUrl(id));
}

export function getAnimeBySearchQuery(query) {
  console.log("query", query);
  if (query.length < 3) return [];
  console.log("searchquery", searchUrl(query));
  return http.get(searchUrl(query));
}

export function saveAnime(anime) {
  if (anime._id) {
    const body = { ...anime };
    delete body._id;
    return http.put(`${apiUrl}/${anime._id}`, body);
  }
  return http.post(apiUrl, anime);
}

export function deleteAnime(anime) {
  return http.delete(animeUrl(anime._id), { data: anime });
}
