import React, { useState, useMemo } from "react";
import debounce from "lodash.debounce";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { getAnimeBySearchQuery } from "../services/animeService";

function SearchBar({ placeholder, data }) {
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);

  const changeHandler = async (event) => {
    setQuery(event.target.value);
    if (event.target.value !== "") {
      const searchedAnimes = await getAnimeBySearchQuery({
        q: event.target.value,
      });
      const newSearchData = searchedAnimes.data.results.map((anime) => {
        return { title: anime.title, id: anime.mal_id };
      });
      console.log(searchedAnimes);
      setSearchData(newSearchData);
    } else {
      setSearchData([]);
    }
  };

  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), [
    searchData,
    setSearchData,
    query,
    setQuery,
  ]);

  const clearInput = () => {
    setSearchData([]);
    setQuery("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          onChange={debouncedChangeHandler}
        />
        <div className="searchIcon">
          {searchData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {searchData.length !== 0 && (
        <div className="dataResult">
          {searchData.slice(0, 15).map((value) => {
            return (
              <a
                key={value.id}
                className="dataItem"
                href={`/anime/${value.id}`}
              >
                <p>{value.title} </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
