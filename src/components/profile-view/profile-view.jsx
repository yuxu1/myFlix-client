import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import moment from 'moment';

export const ProfileView = ({ user, movies, setUser, removeFavorite }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState(user.Password);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const favoriteMoviesList = movies.filter((m) => {
    user.FavoriteMovies.includes(m.id);
  });

  const handleUpdate = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch(
      `https://my-flix-project-b74d36752ec6.herokuapp.com/users/${user.Username}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer${token}`,
        },
        body: JSON.stringify(data),
      }
    )
      .then(async (response) => {
        if (response.ok) {
          response.json();
          alert('Profile Updated!');
        } else {
          alert('Update was not made');
        }
      })
      .then((updatedUser) => {
        if (updatedUser) {
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
        }
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();

    const confirmDelete = window.confirm(
      'Are you sure you want to delete your profile? This cannot be undone.'
    );
    if (!confirmDelete) {
      return;
    }

    fetch(
      `https://my-flix-project-b74d36752ec6.herokuapp.com/users/${user.Username}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer${token}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        alert('Profile has been deleted');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
      } else {
        alert('Profile not successfully deleted');
      }
    });
  };

  return (
    <Container>
      <Row>
        <h2>Favorite Movies</h2>
        {favoriteMoviesList.length === 0 ? (
          <Col>
            <p>You haven't added any movies to favorites yet!</p>
          </Col>
        ) : (
          favoriteMoviesList.map((movies) => {
            <Col className="mb-5" key={movies.id} md={3}>
              <MovieCard movie={movies} />
              <Button variant="secondary" onClick={() => removeFavorite(movies.id)}>
                Remove from favorites
              </Button>
            </Col>;
          })
        )}
        ;
      </Row>

      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Current User Details</Card.Title>
              <Card.Text>Username: {user.Username}</Card.Text>
              <Card.Text>Email: {user.Email}</Card.Text>
              <Card.Text>Birthday:{moment.utc(user.Birthday).format('MM/DD/YYYY')}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <h3>Update User Details</h3>
          <Form className="profile-update-form" onSubmit={handleUpdate}>
            <Form.Group controlId="updateUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="5"
              />
            </Form.Group>
            <Form.Group controlId="updatePassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="8"
                maxLength="16"
              />
            </Form.Group>
            <Form.Group controlId="updateEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="updateBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={moment.utc(birthday).format('MM/DD/YYYY')}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleUpdate}>
              Save Changes
            </Button>
            <Button variant="danger" type="submit" onClick={handleDelete}>
              Delete Account
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

/*
  
      <div>
        <h2>Favorite Movies</h2>
        
        {favoriteMoviesList.map((movies) => {
          return (
            <>
            {favoriteMoviesList.length===0 ? (
            <Col>The list is empty!</Col>
            ):(
              <div key={movies.id}>
              <img src={movies.image}/>
              <Link to={`/movies/${movies.id}`}>
                <h4>{movies.title}</h4>
              </Link>
              <Button variant='secondary' onClick={()=> removeFav(movies.id)}>
                Remove from favorites
              </Button>
            </div>
            )}
           
            </>
            
          )
        })
        }
      </div>
      
    
      */
