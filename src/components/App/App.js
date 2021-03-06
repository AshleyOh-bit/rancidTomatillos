import "./App.css";
import React from "react";
import MoviesRepo from "../MoviesRepo/MoviesRepo";
import SelectedMovie from "../SelectedMovie/SelectedMovie";
import Search from "../Search/Search";
import apiCalls from "../../Utilities/apiCalls";
import { Route, Switch, Redirect } from "react-router-dom";
import loadingImage from "../../assets/loadingImage.jpg";
import errorSign from "../../assets/Error-neon-sign.jpeg";
import { cleanAllMovies } from "../../Utilities/Utils";
import RandomMovieBackdrop from "../RandomMovieBackdrop/RandomMovieBackdrop";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      error: "",
    };
  }

  componentDidMount() {
    apiCalls
      .fetchAPIData("/movies")
      .then((response) => {
        if (typeof response === "string") {
          this.setState({ error: response });
        } else {
          this.setState({ movies: cleanAllMovies(response.movies) });
        }
      })
      .catch((err) => this.setState({ error: err.message }));
  }

  render() {
    return (
      <main>
        {!this.state.movies.length && !this.state.error.length && (
          <div className="loading-view">
            <h2> Loading Movies...</h2>
            <img
              className="loading-image"
              alt={"Loading movies"}
              src={loadingImage}
            ></img>
          </div>
        )}

        {this.state.error && (
          <section className="error-view">
            <h2>{this.state.error}</h2>
            <img
              src={errorSign}
              alt={"A neon sign that says error!"}
              className="error-image"
            />
          </section>
        )}
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                <>
                  {this.state.movies.length && (
                    <Search movies={this.state.movies} />
                  )}
                  {this.state.movies.length && (
                    <RandomMovieBackdrop movies={this.state.movies} />
                  )}
                  <MoviesRepo
                    movies={this.state.movies}
                    showMovieDetails={this.showMovieDetails}
                  />
                </>
              );
            }}
          />

          <Route
            path="/movies/:id"
            render={(props) => {
              return (
                <>
                  {this.state.movies.length && (
                    <Search movies={this.state.movies} />
                  )}
                  <SelectedMovie {...props} />
                </>
              );
            }}
          />

          <Route
            exact
            path="/search"
            render={() => <Search movies={this.state.movies} />}
          />
          <Redirect to="/" />
        </Switch>
      </main>
    );
  }
}

export default App;
