import React from "react"
import Movie from "../Movie/Movie"
import SelectedMovie from "../SelectedMovie/SelectedMovie"
import './MoviesRepo.css'


class MoviesRepo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: props.movies,
            selectedMovie: ""
        }
    }

    returnHome = () => {
        this.setState({selectedMovie: ""})
      }
  
    showMovieDetails = (id) => {
        // console.log("details")
        const foundMovie = this.state.movies.find(movie => {
          return movie.id === id
        })
        this.setState({selectedMovie: foundMovie})
    } 

    render() {
        const movieComponents = this.state.movies.map(movie => {
            return <Movie 
                        key={movie.id} 
                        id={movie.id}
                        image={movie.poster_path} 
                        showMovieDetails={this.showMovieDetails}
                        returnHome={this.returnHome}
                    />
        })
        return ( 
            <>
            {this.state.selectedMovie ? <SelectedMovie 
                                            key={this.state.selectedMovie.id} 
                                            poster={this.state.selectedMovie.poster_path} 
                                            backdrop={this.state.selectedMovie.backdrop_path}
                                            title={this.state.selectedMovie.title}
                                            rating={this.state.selectedMovie.average_rating}
                                            releaseDate={this.state.selectedMovie.release_date}
                                            returnHome={this.returnHome}
                                        />
                                    : <div className="movie-container">
                                        {movieComponents}
                                      </div>
            }
            </>
        )
    }
}

// const MoviesRepo = props => {
    // const movieComponents = props.movies.map(movie => {
    //         return <Movie 
    //                     key={movie.id} 
    //                     id={movie.id}
    //                     image={movie.poster_path} 
    //                     showMovieDetails={props.showMovieDetails}
    //                 />
    // })
    // return (
    //     <div className="movie-container">
    //         {movieComponents}
    //     </div>
    //     )
// }
//}

export default MoviesRepo