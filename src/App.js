import './App.css';
import movieData from "./movieData"
import React from "react"
import MoviesRepo from "./components/MoviesRepo/MoviesRepo"
import SelectedMovie from "./components/SelectedMovie/SelectedMovie"

class App extends React.Component {
    constructor() {
      super()
      this.state = {
        movies: movieData.movies,
        // selectedMovie: ""
      }
    }

    // returnHome = () => {
    //   this.setState({selectedMovie: ""})
    // }

    // showMovieDetails = (id) => {
    //   const foundMovie = this.state.movies.find(movie => {
    //     return movie.id === id
    //   })
    //   this.setState({selectedMovie: foundMovie})
    // } 

    render() {
      return (
        <main>
          <header> 
            <h1 className="app-title">Rancid Tomatillos</h1>
          </header>
          {/* this is where our conditional rendering will happen */}
          {/* selected movie within conditional */}
          {/* {this.state.selectedMovie ? <SelectedMovie 
                                        key={this.state.selectedMovie.id} 
                                        poster={this.state.selectedMovie.poster_path} 
                                        backdrop={this.state.selectedMovie.backdrop_path}
                                        title={this.state.selectedMovie.title}
                                        rating={this.state.selectedMovie.average_rating}
                                        releaseDate={this.state.selectedMovie.release_date}
                                        returnHome={this.returnHome}
                                      />
                                    : <MoviesRepo 
                                        movies={this.state.movies} 
                                        showMovieDetails={this.showMovieDetails}
                                      /> 
          }                          */}
          <MoviesRepo movies={this.state.movies}/>
        </main>
      );
    }

}

export default App;
