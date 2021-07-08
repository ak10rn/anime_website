import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import auth from "./services/authService";

import AppNavbar from "./components/navbar";
import Anime from "./components/anime";
import CardContainer from "./components/cardContainer";
import Footer from "./components/footer";
import RegisterForm from "./components/register";
import LoginForm from "./components/login";
import Logout from "./components/logout";
import User from "./components/user";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  async componentDidMount() {
    const { data: user } = await auth.getCurrentUser();
    console.log(user);
    this.setState({ user });
  }
  render() {
    return (
      <Router>
        <div className="App">
          <AppNavbar user={this.state.user} {...this.props} />
          <ToastContainer />
          <main className="container h-100">
            <Switch>
              <Route
                path="/anime/:id"
                render={(props) => (
                  <Anime
                    key={props.match.params.id}
                    user={this.state.user}
                    {...props}
                  />
                )}
              />
              <Route path="/register" component={RegisterForm} />
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <Route path="/profile" component={User} />
              <Route exact path="/" component={CardContainer} />
              {/* <Redirect to="/not-found"/> */}
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
