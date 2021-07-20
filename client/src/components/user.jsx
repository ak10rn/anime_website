import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserReviews } from "../services/authService";
import { getUser } from "../services/userService";
import UserModal from "./userModal";
import "./user.css";

const User = (props) => {
  const [reviews, setReviews] = useState([]);
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    async function fun() {
      try {
        const { data } = await getUserReviews(id);
        setReviews(Object.values(data));
        const { data: userData } = await getUser(id);
        setUser(userData);
        console.log("userData", userData);
        console.log(data);
      } catch (err) {
        console.log(err);
        props.history.push("/not-found");
      }
    }
    fun();
  }, [id]);

  const handleModal = () => {
    setModal(!modal);
  };
  return (
    <React.Fragment>
      <UserModal user={user} modalState={modal} toggle={handleModal} />
      <div
        className="container text-light row "
        style={{ marginTop: "30px", fontFamily: "monospace" }}
      >
        <div className="container text-light col-3" align="center">
          <img src={user.image} width="200" height="200" alt="dp" />
          <br />
          <br />
          <h1> {user.name} </h1>
          <p>
            Joined {user.register_date && user.register_date.substring(0, 10)}
          </p>
        </div>
        <div className="container text-light col user-about bg-dark">
          <div className="container text-light row">
            <div className="container text-light col" style={{ padding: "0" }}>
              <h3>About Me</h3>
            </div>
            <button
              type="button"
              className="btn btn-warning col-2"
              onClick={handleModal}
            >
              Edit Profile
            </button>
          </div>
          <br></br>
          <div>{user.about}</div>
        </div>
        <h2 align="center" className="bottom">
          {" "}
          I have watched {reviews.length} anime{" "}
        </h2>
      </div>

      <br></br>
      <div className="container text-light row user-reviews bg-dark">
        {reviews.map((review) => (
          <React.Fragment>
            <div className="container text-light row user-review">
              <div className="container text-light col">
                <img
                  src={review.anime.image_url}
                  width="50"
                  height="50"
                  alt="animeimage"
                />
                <div>{review.anime.title}</div>
              </div>
              <div className="container text-light col">
                <div> {review.comment} </div>
              </div>
              <div className="container text-light col">
                <div align="right"> {review.anime.score}/10 </div>
              </div>
              <div className="container text-light col">
                <div align="right"> My rating {review.user_rating}/10 </div>
              </div>
            </div>
            <br></br>
          </React.Fragment>
        ))}
      </div>
    </React.Fragment>
  );
};

export default User;
