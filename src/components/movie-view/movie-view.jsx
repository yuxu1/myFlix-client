//Movie view - show details of the selected movie

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export const MovieView = ({ movies, addFavorite, removeFavorite }) => {
  //movieId called as  URL param in Route
  const { movieId } = useParams();
  //search through movies array to find one whose id matches id in URL param
  const movie = movies.find((m) => m.id === movieId);
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Row className="justify-content-md-center">
      <Col md={8}>
        <img className="w-100" src={movie.image} alt="movie cover" />
      </Col>
      <Col md={8}>
        <div className="h1">
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>

        <div className="h6">
          <span>Description: </span>
          <p>{movie.description}</p>
        </div>
        <div className="h6">
          <span>Director: </span>
          <span>{movie.director.Name}</span>
        </div>
        <div className="h6">
          <span>Director Bio: </span>
          <p>{movie.director.Bio}</p>
        </div>
        <div className="h6">
          <span>Director Birth: </span>
          <span>{movie.director.Birthyear}</span>
        </div>
        <div className="h6">
          <span>Director Death: </span>
          <span>{movie.director.Deathyear}</span>
        </div>
        <div className="h6">
          <span>Genre: </span>
          <span>{movie.genre.Name}</span>
        </div>
        <div className="h6">
          <span>Genre Description: </span>
          <p>{movie.genre.Description}</p>
        </div>
        <div className="h6">
          <span>Featured: </span>
          {/* featured status (boolean) not visible in UI -> check for value and change it into a string */}
          <span>{movie.featured ? 'true' : 'false'}</span>
        </div>
        <div>
          {!user.FavoriteMovies.includes(movie.id) ? (
            <Button variant="primary" onClick={() => addFavorite(movie.id)}>
              Add to Favorites
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={() => removeFavorite(movie.id)}
            >
              Remove from Favorites
            </Button>
          )}
        </div>
        <Link to={`/`}>
          <Button variant="info">Back</Button>
        </Link>
      </Col>
    </Row>
  );
};
