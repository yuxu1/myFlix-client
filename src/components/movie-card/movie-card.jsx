import React from 'react';
import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";
import {Link} from 'react-router-dom';

//represents a card for each movie - display the title of the movie
export const MovieCard = ({ movie }) => {
  return (
    //movie cards set to height:100%
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.genre.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

//define the prop constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birthyear: PropTypes.string.isRequired,
      Deathyear: PropTypes.string
    }).isRequired,
    genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired,
    image: PropTypes.string.isRequired,
    featured: PropTypes.bool.isRequired
  }).isRequired,
};