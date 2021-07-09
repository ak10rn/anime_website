import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { getAnimeBySearchQuery } from "../services/animeService";
import { Spinner, Popover, PopoverHeader, PopoverBody } from "reactstrap";

function SearchBar({ placeholder }) {
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [displaySearchItems, setDisplay] = useState(true);
  const [loading, setLoading] = useState(true);

  const changeHandler = async (event) => {
    if (!displaySearchItems) setDisplay(true);
    if (event.target.value !== "") {
      setLoading(true);
      const searchedAnimes = await getAnimeBySearchQuery({
        q: event.target.value,
        limit: 10,
      });
      setLoading(false);
      console.log(searchedAnimes.data.results);
      setSearchData(searchedAnimes.data.results);
    } else {
      setSearchData([]);
    }
  };

  const debouncedChangeHandlerHelper = useMemo(
    () => debounce(changeHandler, 500),
    [searchData, setSearchData, query, setQuery]
  );

  const debouncedChangeHandler = (event) => {
    setQuery(event.target.value);
    debouncedChangeHandlerHelper(event);
  };

  const clearInput = () => {
    setSearchData([]);
    setQuery("");
    setDisplay(false);
  };

  const node = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideSearchBar);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSearchBar);
    };
  }, []);

  const handleClickOutsideSearchBar = (e) => {
    if (!node.current.contains(e.target)) {
      setDisplay(false);
    }
  };

  return (
    <div className="search" ref={node} id="searchMessagePopover">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={debouncedChangeHandler}
          onClick={() => setDisplay(true)}
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
          alignSelf: "center",
          height:
            query.length >= 3 && displaySearchItems
              ? loading
                ? "100px"
                : "520px"
              : "0",
        }}
      >
        <Popover
          placement="bottom"
          isOpen={query.length > 0 && query.length < 3 && displaySearchItems}
          target="searchMessagePopover"
          className='result-message'
          // toggle={toggle}
        >
          <PopoverBody>Enter atleast 3 letters :)</PopoverBody>
        </Popover>

        {loading && query.length >= 3 && (
          <Spinner type="grow" color="primary" className="searchSpinner" />
        )}
        {!loading &&
          query.length >= 3 &&
          searchData.slice(0, 10).map((value) => (
            <Link
              key={value.id}
              className="dataItem"
              to={`/anime/${value.mal_id}`}
            >
              {/* <p>{value.title}</p> */}
              <div
                className="d-flex flex-row px-1"
                style={{
                  borderBottom: "1px dotted black",
                  paddingBottom: "0.25rem",
                }}
              >
                <img src={value.image_url} alt width="50px" height="50px" />
                <div
                  className="ms-2 align-self-center"
                  style={{ width: "210px" }}
                >
                  {value.title}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default SearchBar;
