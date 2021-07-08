import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { getAnimeBySearchQuery } from "../services/animeService";

function SearchBar({ placeholder }) {
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [displaySearchItems, setDisplay] = useState(true);

  const changeHandler = async (event) => {
    setQuery(event.target.value);
    if (!displaySearchItems) setDisplay(true);
    if (event.target.value !== "") {
      const searchedAnimes = await getAnimeBySearchQuery({
        q: event.target.value,
        limit: 10,
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

  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 500), [
    searchData,
    setSearchData,
    query,
    setQuery,
  ]);

  const clearInput = () => {
    setSearchData([]);
    setQuery("");
  };

  const node = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideSearchBar);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSearchBar);
    };
  }, []);

  const handleClickOutsideSearchBar = (e) => {
    console.log(node);
    if (!node.current.contains(e.target)) {
      setDisplay(false);
    }
  };

  return (
    <div className="search" ref={node}>
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
      <div
        className="dataResult"
        style={{
          height: searchData.length !== 0 && displaySearchItems ? "200px" : "0",
        }}
      >
        {searchData.slice(0, 10).map((value) => {
          return (
            <Link key={value.id} className="dataItem" to={`/anime/${value.id}`}>
              <p>{value.title} </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default SearchBar;
