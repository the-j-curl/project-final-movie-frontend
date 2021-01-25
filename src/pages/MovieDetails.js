import React from "react";
import { useHistory } from "react-router-dom";

import LargeWatchlistButton from "../components/LargeWatchlistButton";

// import { BackButton } from "../components/BackButton";

export const MovieDetails = ({
  backdrop_path,
  poster_path,
  title,
  vote_average,
  overview,
  genres,
  runtime,
  imdb_id,
  id,
}) => {
  const history = useHistory();

  return (
    <article
      className="movie-details-background"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 70%, rgb(0, 0, 0) 100%), url("https://image.tmdb.org/t/p/w1280/${backdrop_path}")`,
      }}>
      {/* <BackButton className="movies-back-button" history={history} /> */}
      <div className="movie-details-wrapper">
        <img
          className="movie-poster-image"
          src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
          alt={title}
        />
        <div className="movie-details-text">
          <h1>
            {title}
            <span>Rating: {vote_average}/10</span>
          </h1>
          <p className="movie-length">Length: {runtime} minutes</p>
          <a href={`https://www.imdb.com/title/${imdb_id}/`} target="blank">
            <img
              className="imdb-logo"
              src="../images/imdb-image.png"
              alt="imdb logo"
            />
          </a>
          <LargeWatchlistButton movieId={id} />
          <p className="movie-overview">{overview}</p>
          <ul className="genres">
            {genres.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
};

export default MovieDetails;
