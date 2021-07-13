import React from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const users = [
    {
      image: "http://placekitten.com/200/300",
      name: "akk",
      register_date: "2021-07-08T14:56:16.767Z",
      __v: 0,
      _id: "60e71210c78sdfbc524bc14aa46",
    },
    {
      image: "http://placekitten.com/200/300",
      name: "akk",
      register_date: "2021-07-08T14:56:16.767Z",
      __v: 0,
      _id: "fsd",
    },
    {
      image: "http://placekitten.com/200/300",
      name: "akk",
      register_date: "2021-07-08T14:56:16.767Z",
      __v: 0,
      _id: "60e71210c78bcsdfsdf524bc14aa46",
    },
  ];

  const manageDate = (date) => {
    console.log(date);
    return date;
  };
  return (
    <div
      key={"01"}
      className="container d-flex flex-column bg-dark text-light"
      style={{
        borderRadius: "20px",
        boxShadow:
          "12px 12px 20px 0 rgba(0, 0, 0, 0.25),-8px -8px 12px 0 rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Replace this shit with a table. */}
      <div key={"02"} className="text-center h1 pt-3">
        <p key={"1001012"}>All Users</p>
      </div>
      <div
        key={"03"}
        className="d-flex flex-row justify-content-between h3 mx-5"
      >
        <div key={"04"} className="">
          User
        </div>
        <div key={"05"} className="">
          Date Joined
        </div>
        <div key={"06"} className="">
          Others
        </div>
      </div>
      <div key={"07"} className="d-flex flex-column">
        {users &&
          users.map((user) => {
            return (
              <div
                key={user._id + "1"}
                className="d-flex flex-row justify-content-between mx-5 my-3"
              >
                <div key={user._id + "2"} className="d-flex flex-row">
                  <div key={user._id + "3"}>
                    <Link key={user._id + "4"} to={`/users/${user.name}`}>
                      <img
                        key={user._id + "5"}
                        src={user.image}
                        style={{
                          borderRadius: "50%",
                          height: "3rem",
                          width: "3rem",
                          marginRight: "1.5rem",
                        }}
                        alt="usr_img"
                      />
                    </Link>
                  </div>
                  <Link
                    key={user._id + "6"}
                    to={`/users/${user.name}`}
                    style={{
                      margin: "auto",
                      textDecoration: "none",
                      color: "yellow",
                    }}
                  >
                    <div key={user._id + "7"}>{user.name}</div>
                  </Link>
                </div>
                <div key={user._id + "8"}>{manageDate(user.register_date)}</div>
                <div key={user._id + "9"}>{user._id}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Users;
