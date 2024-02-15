import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import moment from 'moment';

export const ProfileView = ({ user, movies, setUser, removeFavorite }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  //filter through movies array to find movies that match those in the DB's FavoriteMovies array
  const favoriteMoviesList = movies.filter((m) => {
     return user.FavoriteMovies.includes(m.id);
  });

  //used to update user's profile information
  const handleUpdate = (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    //fetch and update document from users collection in movies API
    fetch(
      `https://my-flix-project-b74d36752ec6.herokuapp.com/users/${user.Username}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )
      .then(async (response) => {
        if (response.ok) {
          const updatedUser = await response.json();
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
          alert('Profile Updated!');
        } else {
          alert('Update was not made');
        }
      })
      .catch((err) => {
        console.error('Error: ' + err);
      });
  };

  //for deleting a user's profile
  const handleDelete = (e) => {
    e.preventDefault();

    //confirmation window prompted by "Delete Account" button to prevent accidental deletion of profile
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
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
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
      {/* show user's favorite movies in form of <MovieCard> component or note if there are none */}
      <Row className="justify-content-md-center" md={8}>
        <h2>Favorite Movies</h2>
        {favoriteMoviesList.length === 0 ? (
          <Col>
            <p>You haven't added any movies to favorites yet!</p>
          </Col>
        ) : (
          favoriteMoviesList.map((movie) => {
            return (
              <Col className="mb-5" key={movie.id}>
                <MovieCard movie={movie} />
                <Button
                  variant="secondary"
                  onClick={() => removeFavorite(movie.id)}
                >
                  Remove
                </Button>
              </Col>
            );
          })
        )}
      </Row>

      {/* show the authenticated user's profile information (current) & form to update the information */}
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Current User Details</Card.Title>
              <Card.Text>Username: {user.Username}</Card.Text>
              <Card.Text>Email: {user.Email}</Card.Text>
              <Card.Text>
                Birthday:{moment.utc(user.Birthday).format('YYYY-MM-DD')}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* form to update user details & buttons to save changes and delete account */}
        <Col md={6}>
          <h3>Update User Details</h3>
          <Form className="profile-update-form" onSubmit={handleUpdate}>
            <Form.Group controlId="updateUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength="5"
              />
            </Form.Group>
            <Form.Group controlId="updatePassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="updateEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="updateBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={moment.utc(birthday).format('YYYY-MM-DD')}
                onChange={(e) => setBirthday(e.target.value)}
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
