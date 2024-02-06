import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  //set initial state value of movies to list of 3 movies
  const [movies, setMovies] = useState([
    {
      id: '65b89381781555e11c25448c',
      title: 'My Neighbor Totoro',
      description:'Excited about reuniting with their ailing mother, close-knit sisters Satsuki and Mei embark on an exciting adventure when they move with their loving professor father to a new house in the verdant countryside of 1950s summer Japan. Now, nothing can stop them. And with mum in the hospital, the girls have all the time in the world to explore nature and the dense adjacent forest, the home of bashful mystical creatures only children can see. Under the clear blue sky\'s cloudless bliss and the bright yellow sun\'s promise of a luminous future, nothing can blemish the young sisters\' flawless fantasy--not even life\'s trying times. After all, mother is getting better. Then, one radiant morning, as the shimmering green leaves of the towering camphor trees swayed in the soft morning breeze, the wide-eyed siblings stumbled upon a Totoro. But who is the enchanting visitor? Will the rotund neighbour, with his fluffy fur and mysterious eyes, be the girls\' forever friend?',
      image:
        'https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
      director: {
        name:'Hayao Miyazaki',
        bio:'Hayao Miyazaki is a Japanese film director, producer, screenwriter, animator, author, and manga artist. Through a career that has spanned five decades, Miyazaki has attained international acclaim as a masterful storyteller and as a maker of anime feature films and, along with Isao Takahata, co-founded Studio Ghibli, a film and animation studio. Miyazaki has been described as combining elements of Walt Disney, Steven Spielberg and Orson Welles.',
        birthyear:'1941',
        deathyear:''
      },
      genre: {
        name:'animation',
        description:'Animation is a filmmaking technique by which still images are manipulated to create moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets (cels) to be photographed and exhibited on film. Animation has been recognized as an artistic medium, specifically within the entertainment industry. Many animations are computer animations made with computer-generated imagery (CGI). Stop motion animation, in particular claymation, has continued to exist alongside these other forms.'
      }
    },
    {
      id: '65b895ef781555e11c25448d',
      title: 'Jaws',
      image: 'https://m.media-amazon.com/images/M/MV5BMmVmODY1MzEtYTMwZC00MzNhLWFkNDMtZjAwM2EwODUxZTA5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_FMjpg_UX1000_.jpg',
      director: {
        name:'Steven Spielberg',
        bio:'Steven Allan Spielberg (born December 18, 1946) is an American film director, producer and screenwriter. A major figure of the New Hollywood era and pioneer of the modern blockbuster, he is the most commercially successful director in history. He is the recipient of many accolades, including three Academy Awards, two BAFTA Awards, and four Directors Guild of America Awards, as well as the AFI Life Achievement Award in 1995, the Kennedy Center Honor in 2006, the Cecil B. DeMille Award in 2009 and the Presidential Medal of Freedom in 2015. Seven of his films have been inducted into the National Film Registry by the Library of Congress as "culturally, historically or aesthetically significant"',
        birthyear:'1946',
        deathyear:''
      },
      genre: {
        name:'thriller',
        description:'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that evokes excitement and suspense in the audience. The suspense element found in most films\' plots is particularly exploited by the filmmaker in this genre. Tension is created by delaying what the audience sees as inevitable, and is built through situations that are menacing or where escape seems impossible.'
      }
    },
    {
      id: '65b896ff781555e11c25448e',
      title: 'Ghostbusters',
      image:
        'https://m.media-amazon.com/images/M/MV5BMTkxMjYyNzgwMl5BMl5BanBnXkFtZTgwMTE3MjYyMTE@._V1_.jpg',
      director: {
        name:'Ivan Reitman',
        bio:'Ivan Reitman was a Czechoslovak-born Canadian filmmaker. He was best known for his comedy work, especially in the 1980s and 1990s. He was the owner of The Montecito Picture Company, founded in 1998.Films he directed include Meatballs (1979), Stripes (1981), Ghostbusters (1984), Twins (1988), Ghostbusters II (1989), Kindergarten Cop (1990), Dave (1993), Junior (1994) and Draft Day (2014). Reitman also served as producer for such films as National Lampoon\'s Animal House (1978), Heavy Metal (1981), Space Jam (1996) and Private Parts (1997).',
        birthyear:'1946',
        deathyear:'2022'
      },
      genre: {
        name:'comedy',
        description:'A comedy film is a category of film that emphasizes humor. These films are designed to amuse audiences and make them laugh. Films in this genre typically have a happy ending, with dark comedy being an exception to this rule. Comedy is one of the oldest genres in film, and it is derived from classical comedy in theatre. Some of the earliest silent films were comedies such as slapstick comedy, which often relies on visual depictions, such as sight gags and pratfalls, so they can be enjoyed without requiring sound.'
      }
    },
  ]);

  //selectedMovie state - shows details of movie
  //before a movie is selected, selectedMovie value is null
  const [selectedMovie, setSelectedMovie] = useState(null);

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
