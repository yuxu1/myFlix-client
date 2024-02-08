import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  //set initial state value of movies to empty array
  const [movies, setMovies] = useState([]);

  //selectedMovie state - shows details of movie
  //before a movie is selected, selectedMovie value is null
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    //fetch movie data from API
    fetch("https://my-flix-project-b74d36752ec6.herokuapp.com/movies")
    .then((response) => response.json())
    .then((data)=> {
      const moviesFromApi = data.map((movie) => {
        //extract data from each movie in API
        return {
          id: movie._id,
          title: movie.Title,
          description: movie.Description,
          director: movie.Director,
          genre: movie.Genre,
          image: movie.ImageURL,
          featured: movie.Featured
        };
      });
      //update state of movies to include the list of movies from API
      setMovies(moviesFromApi);
    });
  }, []);

  //if a movie card was clicked (selected), renders MovieView of that movie
  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        //stops rendering MoveView when back button in MovieView is clicked
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  //main view: list of movie cards with the movies' titles
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          //pass function as a prop "onMovieClick" to MovieCard;sets a movie to the selectedMovie state
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
