import React, { useState, useEffect } from "react";
import "./users.css";
import { getUsers } from "../services/userService";
import _ from "lodash";
import { Link } from "react-router-dom";
import Moment from "moment";

const Users = (props) => {
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");
  useEffect(() => {
    async function fun (){
      const { data } = await getUsers();
      try {
        setUsers(Object.values(data));
        console.log("users", data);
      } catch (err) {
        console.log(err);
      }
    }
    fun();
  },[]);
  // const allUsers = [
  //   {
  //     image: "http://placekitten.com/300/300",
  //     name: "akk1",
  //     register_date: "2020-07-03T14:56:16.767Z",
  //     _id: "60e71210c78sdfbc524bc14aa46",
  //     noOfAnimeWatched: 10,
  //   },
  //   {
  //     image: "http://placekitten.com/300/300",
  //     name: "akk2",
  //     register_date: "2021-07-07T14:56:16.767Z",
  //     _id: "fsd",
  //     noOfAnimeWatched: 102,
  //   },
  //   {
  //     image: "http://placekitten.com/300/300",
  //     name: "akk3",
  //     register_date: "2029-07-09T14:56:16.767Z",
  //     _id: "60e71210c78bcsdfsdf524bc14aa46",
  //     watched: 5,
  //   },
  // ];
  const getSortedUsersData = (sortBy, order) => {
    const sortedData = _.orderBy(users, sortBy, order);
    setUsers(sortedData);
  };
  useEffect(() => getSortedUsersData(sortBy, order), [sortBy, order]);

  const handleDateFormat = (date) =>
    Moment(date).format("MMMM Do YYYY, h:mm:ss a");

  return (
    <table className="table caption-top table-dark users-table">
      <caption style={{ textAlign: "center", fontSize: "2rem" }}>
        Leaderboard
      </caption>
      <thead>
        <tr>
          <th>
            <span
              onClick={() => {
                setOrder(order === "asc" ? "desc" : "asc");
                setSortBy("name");
              }}
            >
              Users{" "}
              {sortBy === "name" && (
                <i
                  className={`fa fa-chevron-${order === "asc" ? "down" : "up"}`}
                />
              )}
            </span>
          </th>
          <th>
            <span
              onClick={() => {
                setOrder(order === "asc" ? "desc" : "asc");
                setSortBy("register_date");
              }}
            >
              Date Joined{" "}
              {sortBy === "register_date" && (
                <i
                  className={`fa fa-chevron-${order === "asc" ? "down" : "up"}`}
                />
              )}
            </span>
          </th>
          <th>
            <span
              onClick={() => {
                setOrder(order === "asc" ? "desc" : "asc");
                setSortBy("watched");
              }}
            >
              No. of Anime's Watched{" "}
              {sortBy === "watched" && (
                <i
                  className={`fa fa-chevron-${order === "asc" ? "down" : "up"}`}
                />
              )}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>
              <Link to={`/users/${user._id}`}>
                <img src={user.image} alt={user.name} className="user-img" />{" "}
                <span>{user.name}</span>
              </Link>
            </td>
            <td>{handleDateFormat(user.register_date)}</td>
            <td>{user.watched}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Users;
