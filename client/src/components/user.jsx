import React, { useState } from "react";
import div from "react-read-more-read-less";
import UserModal from "./userModal";
import "./user.css";

const User = (props) => {
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!modal);
  };
  return (
    <React.Fragment>
      <UserModal user={props.user} modalState={modal} toggle={handleModal} />
      <div
        className="container text-light row "
        style={{ marginTop: "30px", fontFamily: "monospace" }}
      >
        <div className="container text-light col-3" align="center">
          <img src={props.user.image} width="200" height="200" alt="dp" />
          <br />
          <br />
          <h1> {props.user.name} </h1>
          <p>Joined {props.user.register_date.substring(0, 10)}</p>
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
          <div>
            lorem dadkasndas adasd adjnasd asdasjd asdjadad ajdaida sdasjdasida
            dasidjasdnasjd dhjahs adjasid sdnasd n adnnauisda lorem dadkasndas
            adasd adjnasd asdasjd asdjadad ajdaida sdasjdasida dasidjasdnasjd
            dhjahs adjasid sdnasd n adnnauisda lorem dadkasndas adasd adjnasd
          </div>
        </div>
        <h2 align="center" className="bottom">
          {" "}
          I have watched 2 anime{" "}
        </h2>
      </div>

      <br></br>
      <div className="container text-light row user-reviews bg-dark">
        <div className="container text-light row user-review">
          <div className="container text-light col">
            <img
              src="https://cdn.myanimelist.net/images/anime/1000/110531.jpg"
              width="50"
              height="50"
              alt="animeimage"
            />
            <div>Naruto</div>
          </div>
          <div className="container text-light col">
            <div> this is my comment regarding this anime </div>
          </div>
          <div className="container text-light col">
            <div align="right"> 8.0/10 </div>
          </div>
        </div>
        <br></br>
        <div className="container text-light row">
          <div className="container text-light col">
            <img
              src="https://cdn.myanimelist.net/images/anime/1000/110531.jpg"
              width="50"
              height="50"
              alt="animeimage"
            />
            <div>Hyuoka</div>
          </div>
          <div className="container text-light col">
            <div> this is my comment regarding this anime </div>
          </div>
          <div className="container text-light col">
            <div align="right"> 8.0/10 </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default User;
