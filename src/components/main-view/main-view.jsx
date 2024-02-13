import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import {Button} from "react-bootstrap";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {NavigationBar} from '../navigation-bar/navigation-bar';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  //set initial state value of movies to empty array
  const [movies, setMovies] = useState([]);
  //selectedMovie state - shows details of movie
  //before a movie is selected, selectedMovie value is null
 // const [selectedMovie, setSelectedMovie] = useState(null);
  //state variable to keep track of whether a user is logged in & token received from API
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    //check for token before exectuting fetch call
    if (!token) {
      return;
    }

    //fetch movie data from API
    fetch('https://my-flix-project-b74d36752ec6.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          //extract data from each movie in API
          return {
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            director: movie.Director,
            genre: movie.Genre,
            image: movie.ImageURL,
            featured: movie.Featured,
          };
        });

        //update state of movies to include the list of movies from API
        setMovies(moviesFromApi);
      });
  }, [token]);


  return (
    <BrowserRouter>
    <NavigationBar
      user={user}
      onLoggedOut = {()=> {
        setUser(null);
        setToken(null);
        localStorage.clear();
      }}
    />
    <Row className="justify-content-md-center">
      <Routes>
      <Route
        path='/signup'
        element={
          <>
            {user ? (
              <Navigate to='/' />
            ) : (
              <Col md={5}>
                <SignupView />
              </Col>
            )}
          </>
        }
      />

      <Route 
        path='/login'
        element = {
          <>
            {user ? (
              <Navigate to='/' />
            ) : (
              <Col md={5}>
                <LoginView
                  onLoggedIn = {(user,token) => {
                    setUser(user);
                    setToken(token);
                  }}
                />
              </Col>
            )}
          </>
        }
      />

      <Route
        path='/movies/:movieId'
        element = {
          <>
            {!user ? (
              <Navigate to='/login' replace/>
            ) : movies.length === 0 ? (
              <Col>The list is empty!</Col>
            ) : (
              <Col md={8}>
                <MovieView movies={movies}/>
              </Col>
            )}
          </>
        }
      />

      <Route
        path='/'
        element = {
          <>
            {!user ? (
              <Navigate to='/login' replace/>
            ) : movies.length === 0 ? (
              <Col>The list is empty!</Col>
            ) : (
              <>
                {movies.map((movie) => (
                  <Col className='mb-5' key={movie.id} md={3}>
                    <MovieCard movie={movie}/>
                  </Col>
                ))}
              </>
            )}
          </>
        }
      />
    </Routes>
    </Row>
    </BrowserRouter>
  );

  /*
        {!user ? (
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView
            movie={selectedMovie}
            //stops rendering MoveView when back button in MovieView is clicked
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className="mb-5" key={movie.id} md={3}>
              <MovieCard
                movie={movie}
                //pass function as a prop "onMovieClick" to MovieCard;sets a movie to the selectedMovie state
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
          <Button
            variant="secondary"
            //when Logout button clicked, reset(nullify) user and token
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Logout
          </Button>
        </>
      )}
      /*

  //if no user logged in, display LoginView & SignupView; upon login set token to token received from login API
  /*if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }

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
      <button
        //when Logout button clicked, reset(nullify) user and token
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>
    </div>
  );*/
};
