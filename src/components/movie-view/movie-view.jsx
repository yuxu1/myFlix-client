//Movie view - show details of the selected movie

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Button} from "react-bootstrap";

//function prop onBackClick notifies MainView that the back button was clicked
export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Row className="justify-content-md-center">
      <Col md={8}>
        <img className="w-100" src={movie.image} alt="movie cover" />
      </Col>
      <Col md={8}>
        <div className="h1">
          <span>Title:</span>
          <span>{movie.title}</span>
        </div>

        <div className="h6">
          <span>Description:</span>
          <p>{movie.description}</p>
        </div>
        <div className="h6">
          <span>Director:</span>
          <span>{movie.director.Name}</span>
        </div>
        <div className="h6">
          <span>Director Bio:</span>
          <p>{movie.director.Bio}</p>
        </div>
        <div className="h6">
          <span>Director Birth:</span>
          <span>{movie.director.Birthyear}</span>
        </div>
        <div className="h6">
          <span>Director Death:</span>
          <span>{movie.director.Deathyear}</span>
        </div>
        <div className="h6">
          <span>Genre:</span>
          <span>{movie.genre.Name}</span>
        </div>
        <div className="h6">
          <span>Genre Description:</span>
          <p>{movie.genre.Description}</p>
        </div>
        <div className="h6">
          <span>Featured:</span>
          <span>{movie.featured}</span>
        </div>
        <Button variant="secondary" onClick={onBackClick}>
          Back
        </Button>
      </Col>
    </Row>
  );
};
