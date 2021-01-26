import React from "react";
import { Link } from "react-router-dom";

import { LargeWatchlistButton } from "../components/LargeWatchlistButton";

export const MovieCard = ({ title, release_date, poster_path, id }) => {
  return (
    <>
      <Link to={`/movies/${id}`}>
        <article className="movie-thumb">
          <img
            src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
            alt={title}
          />
          <div className="movie-thumb-info">
            <h2>{title}</h2>
            <p>Release date: {release_date}</p>
          </div>
        </article>
      </Link>
      <LargeWatchlistButton movieId={id} />
    </>
  );
};
