import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import {ProfileView} from '../profile-view/profile-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import {Button} from "react-bootstrap";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {NavigationBar} from '../navigation-bar/navigation-bar';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
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

  //add movie to favorites
  const addFavorite = (movieId) => {
    fetch(`https://my-flix-project-b74d36752ec6.herokuapp.com/users/${user.Username}/movies/${movieId}`,{
      method:'POST',
      headers: {
        Authorization: `Bearer${token}`
      }
    }).then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        alert ('Unsuccessful in adding movie to favorites');
      }
    }).then((user) => {
      if(user) {
        localStorage.setItem('user',JSON.stringify(user));
        setUser(user);
      }
    })
  };

  const removeFavorite = (movieId) => {
    fetch (`https://my-flix-project-b74d36752ec6.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer${token}`
      }
    }).then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        alert ('The movie was unable to be removed')
      }
    }).then((updatedUser) => {
      if(updatedUser) {
        localStorage.setItem('user',JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    })
  };

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
        path='/profile'
        element= {
          <>
            {!user ? (
              <Navigate to='/login' replace/>
            ): (
              <Col md={10}>
                <ProfileView user={user} movies={movies} setUser={setUser} removeFavorite={removeFavorite}/>
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
              <Col md={10}>
                <MovieView movies={movies} addFavorite={addFavorite} removeFavorite={removeFavorite}/>
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
                    <MovieCard movie={movie} addFavorite={addFavorite}/>
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
};
