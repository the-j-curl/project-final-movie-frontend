import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { CgCloseR } from "react-icons/cg";
import swal from "sweetalert";
import styled from "styled-components/macro";

import { user } from "../reducers/user";
import { MovieCard } from "./WatchlistCard";
import { NavButton } from "./NavBar";

export const MovieReviews = ({ movieId }) => {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.user.login.userId);
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const username = useSelector((store) => store.user.login.username);
  const errorMessage = useSelector((store) => store.user.login.errorMessage);
  const isLoggedIn = useSelector((store) => store.user.login.isLoggedIn);
  const [newReview, setNewReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [postedReview, setPostedReview] = useState("");
  const [deletedReview, setDeletedReview] = useState(false);

  const handleSubmit = (newReview) => {
    fetch(`https://final-project-moviedb.herokuapp.com/comments/${movieId}`, {
      method: "POST",
      body: JSON.stringify({ userId, comment: newReview, username }),
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    })
      .then((res) => {
        if (res.ok) {
          setPostedReview(newReview);
        } else {
          throw new Error(
            "Could not post review. Make sure you are logged in and try again."
          );
        }
      })
      .catch((error) => {
        dispatch(
          user.actions.setErrorMessage({ errorMessage: error.toString() })
        );
      });
  };

  const handleNewReview = (event) => {
    event.preventDefault();
    handleSubmit(newReview);
    setNewReview("");
  };

  const handleOnDelete = (reviewId) => {
    setDeletedReview(false);
    swal({
      title: "Delete review?",
      text: "Are you sure you want to delete this review?",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(
          `https://final-project-moviedb.herokuapp.com/comments/${movieId}`,
          {
            method: "DELETE",
            body: JSON.stringify({ userId, _id: reviewId }),
            headers: {
              "Content-Type": "application/json",
              Authorization: accessToken,
            },
          }
        )
          .then((res) => {
            if (res.ok) {
              setDeletedReview(true);
            } else {
              throw new Error(
                "Could not delete review. Make sure you are logged in and try again."
              );
            }
          })
          .catch((error) => {
            dispatch(
              user.actions.setErrorMessage({ errorMessage: error.toString() })
            );
            setDeletedReview(false);
          });
        swal("Deleted!", "Your review has been deleted!", "warning");
      } else {
        swal("Cancelled!", "Your review was not deleted");
      }
    });
  };

  useEffect(() => {
    fetch(`https://final-project-moviedb.herokuapp.com/comments/${movieId}`)
      .then((res) => res.json())
      .then((json) => {
        setReviews(json.sortedComments);
      });
  }, [postedReview, deletedReview, movieId]);

  const renderReviewsTitle = () => {
    if (isLoggedIn || reviews.length > 0) {
      return <h4>Reviews</h4>;
    }
  };

  return (
    <>
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
            <ReviewCard key={review._id}>
              <ReviewText>{review.comment}</ReviewText>
              {username === review.username && (
                <DeleteButton
                  type="button"
                  onClick={() => handleOnDelete(review._id)}>
                  <DeleteIcon />
                </DeleteButton>
              )}
              <Div>
                <ReviewUsername
                  username={username}
                  reviewByUser={review.username}>
                  {review.username}
                </ReviewUsername>
                <ReviewDate>{moment(review.createdAt).fromNow()}</ReviewDate>
              </Div>
            </ReviewCard>
          ))}
      </MovieReview>
    </>
  );
};

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

const DeleteButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  outline: none;
  position: absolute;
  top: 4px;
  right: 4px;

  :hover {
    cursor: pointer;
  }
`;

const DeleteIcon = styled(CgCloseR)`
  color: #3f39fc;
  font-size: 24px;
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
  background: rgba(73, 71, 71, 0.3);
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;

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

  @media (min-width: 1024px) {
    font-weight: 600;
  }
`;

const ReviewUsername = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: ${(props) =>
    props.username === props.reviewByUser ? "#3f39fc" : "#808080"};

  @media (min-width: 1024px) {
    font-size: 14px;
  }
`;

const ReviewDate = styled.p`
  font-size: 12px;
  color: #808080;
`;
