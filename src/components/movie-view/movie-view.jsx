//Movie view - show details of the selected movie
//function prop onBackClick notifies MainView that the back button was clicked
export const MovieView = ({movie, onBackClick}) => {
  return (
    <div>
      <div>
        <img src={movie.image} />
      </div>
      <div>
        <span>Title:</span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description:</span>
        <p>{movie.description}</p>
      </div>
      <div>
        <span>Director:</span>
        <span>{movie.director.name}</span>
      </div>
      <div>
        <span>Director Bio:</span>
        <p>{movie.director.bio}</p>
      </div>
      <div>
        <span>Director Birth:</span>
        <span>{movie.director.birthyear}</span>
      </div>
      <div>
        <span>Director Death:</span>
        <span>{movie.director.deathyear}</span>
      </div>
      <div>
        <span>Genre:</span>
        <span>{movie.genre.name}</span>
      </div>
      <div>
        <span>Genre Description:</span>
        <p>{movie.genre.description}</p>
      </div>
      <button onClick = {onBackClick}>Back</button>
    </div>
  );
};