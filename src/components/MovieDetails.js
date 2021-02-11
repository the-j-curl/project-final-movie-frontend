import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import { user } from "../reducers/user";
import { LargeWatchlistButton } from "./LargeWatchlistButton";
import { BackButton } from "./BackButton";
import { IMDBText, MovieTitle, MovieLength, MovieCard } from "./WatchlistCard";
import { NavButton } from "./NavBar";

export const MovieDetails = ({
  backdropPath,
  posterPath,
  title,
  voteAverage,
  overview,
  genres,
  runtime,
  imdbId,
  id,
  movieHomepage,
}) => {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.user.login.userId);
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const username = useSelector((store) => store.user.login.username);
  const errorMessage = useSelector((store) => store.user.login.errorMessage);
  const isLoggedIn = useSelector((store) => store.user.login.isLoggedIn);

  const [newReview, setNewReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [postedReview, setPostedReview] = useState("");

  const history = useHistory();

  const handleSubmit = (newReview) => {
    fetch(`https://final-project-moviedb.herokuapp.com/comments/${id}`, {
      method: "POST",
      body: JSON.stringify({ userId, comment: newReview, username }),
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    })
      .then((res) => {
        setPostedReview(newReview);
        if (!res.ok) {
          throw new Error(
            "Could not post review. Make sure you are logged in and try again"
          );
        }
      })
      .catch((error) => {
        dispatch(
          user.actions.setErrorMessage({ errorMessage: error.toString() })
        );
      });
  };

  useEffect(() => {
    fetch(`https://final-project-moviedb.herokuapp.com/comments/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setReviews(json.sortedComments);
      });
  }, [postedReview, id]);

  const handleNewReview = (event) => {
    event.preventDefault();
    handleSubmit(newReview);
    setNewReview("");
  };

  const renderReviewsTitle = () => {
    if (isLoggedIn || reviews.length > 0) {
      return <h4>Reviews</h4>;
    }
  };

  return (
    <>
      <MovieDetailsWrapper
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 70%, rgb(0, 0, 0) 100%), url("https://image.tmdb.org/t/p/w1280/${backdropPath}")`,
        }}>
        <BackButton className="movies-back-button" history={history} />
        <MovieDetailsContainer>
          <A href={`${movieHomepage}`}>
            <MoviePoster
              src={`https://image.tmdb.org/t/p/w342/${posterPath}`}
              alt={title}
            />{" "}
          </A>
          <MovieDetailsText>
            <MovieTitle>{title}</MovieTitle>
            <MovieLength>
              <a href={`https://www.imdb.com/title/${imdbId}/`}>
                <IMDBText>IMDB</IMDBText>
              </a>{" "}
              | {runtime} mins |<Rating>Rating: {voteAverage}/10</Rating>
            </MovieLength>

            <LargeWatchlistButton movieId={id} />
            <MovieDetailsDescription>{overview}</MovieDetailsDescription>
            <Genres>
              {genres.map((item) => (
                <GenresLi key={item.id}>{item.name}</GenresLi>
              ))}
            </Genres>
          </MovieDetailsText>
        </MovieDetailsContainer>
      </MovieDetailsWrapper>
      <MovieReview>
        {renderReviewsTitle()}
        {isLoggedIn && (
          <ReviewForm onSubmit={handleNewReview}>
            <ReviewTextArea
              value={newReview}
              onChange={(event) => setNewReview(event.target.value)}
              placeholder="Type your review here..."
              rows="4"
              minLength="4"
              maxLength="300"></ReviewTextArea>
            <FormSubmitArea>
              <SubmitButton
                type="submit"
                disabled={
                  newReview.length < 5 || newReview.length > 300 ? true : false
                }>
                Submit
              </SubmitButton>
              <p>
                <Span textLength={newReview.length}>{newReview.length}</Span> /
                300{" "}
              </p>
            </FormSubmitArea>
            <p>{errorMessage}</p>
          </ReviewForm>
        )}
        {reviews &&
          reviews.map((review) => (
            <ReviewCard key={review.createdAt}>
              <ReviewText>{review.comment}</ReviewText>
              <Div>
                <ReviewUsername
                  username={username}
                  reviewByUser={review.username}>
                  {review.username.toUpperCase()}
                </ReviewUsername>
                <ReviewDate>{moment(review.createdAt).fromNow()}</ReviewDate>
              </Div>
            </ReviewCard>
          ))}
      </MovieReview>
    </>
  );
};

const MovieDetailsWrapper = styled.section`
  min-height: 80vh;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  @media (min-width: 768px) {
    padding: 10px;
  }
`;

const MovieDetailsContainer = styled.article`
  color: #fff;
  display: flex;
  align-content: flex-end;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    max-width: 830px;
  }
`;

const MoviePoster = styled.img`
  border: 2px solid #fff;
  width: 70%;
  max-width: 400px;
  border-radius: 10px;
  margin: 14px 0;
  :hover {
    border-color: #3f39fc;
    transition: all 0.3s ease-in;
  }

  @media (min-width: 768px) {
    width: 90%;
    margin: 0;
  }
`;

const MovieDetailsText = styled.div`
  background-color: rgba(22, 21, 21, 0.7);
  padding: 5px;
  width: 90%;
  margin: 10px auto;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  @media (min-width: 768px) {
    width: 55%;
    align-items: flex-start;
  }

  @media (min-width: 1024px) {
    padding: 15px;
  }
`;

const A = styled.a`
  display: flex;
  align-content: center;
  justify-content: center;
`;

const Rating = styled.span`
  color: #fd8a06;
  margin-left: 5px;
  font-size: 16px;
  font-weight: 500;
`;

const MovieDetailsDescription = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  margin: 12px 0 0 0;

  @media (min-width: 1024px) {
    font-size: 18px;
  }
`;

const Genres = styled.ul`
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  font-weight: 600;
`;

const GenresLi = styled.li`
  display: inline;
  margin: 8px 8px 0 0;
  background-color: rgba(17, 69, 226, 0.7);
  padding: 4px 2px;
  font-size: 14px;
`;

const MovieReview = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 350px;

  @media (min-width: 768px) {
    width: 80%;
    max-width: 800px;
  }

  @media (min-width: 1024px) {
    max-width: 500px;
  }
`;
const ReviewTextArea = styled.textarea`
  border: 3px solid #3f39fc;
  width: 100%;
  outline: none;
  width: 100%;
`;

const FormSubmitArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubmitButton = styled(NavButton)`
  width: 30%;

  &:disabled {
    color: #808080;
    background-color: rgba(239, 239, 239, 0.9);
    :hover {
      cursor: unset;
    }
  }
`;

const Span = styled.span`
  color: ${(props) => (props.textLength <= 4 ? "#ff0000" : "#fff")};
`;

const ReviewCard = styled(MovieCard)`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  @media (min-width: 768px) {
    padding: 6px 12px;
  }
`;

const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReviewText = styled.p`
  width: 100%;
  font-weight: 500;
`;

const ReviewUsername = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: ${(props) =>
    props.username === props.reviewByUser ? "#3f39fc" : "#808080"};
`;

const ReviewDate = styled.p`
  font-size: 12px;
  color: #808080;
`;
