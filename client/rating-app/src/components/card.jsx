import React, { useState, useRef, useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { authContext } from "../context/authContext";
import axios from "axios";
import "./css/create.css";
import StarRatings from "react-star-ratings";

export default function Card({ item, user }) {
  const [reviewBox, setReviewBox] = useState(false);
  const [rating, setRating] = useState();
  const [restRating, setRestRating] = useState(0);

  let comment = useRef();

  useEffect(async () => {
    const r_id = await item._id;
    const res = await axios.get(`/user/rating/${r_id}`);
    console.log(res.data);
    setRestRating(res.data);
  }, []);

  const sendRating = async (e, r, u, rate) => {
    const newRate = {
      restaurant: r,
      user: u,
      ratingNumber: rate,
      comments: comment.current.value,
    };
    const res = await axios.post("/user/rate", newRate);
    console.log(res.data);
  };
  return (
    <div>
      <div>
        <div className="boxStyle">
          <p>{item.name}</p>
          <button onClick={() => setReviewBox(true)}>give rating</button>
        </div>
        <div>
          <p>average rating: {restRating.ratingSum}</p>
        </div>

        {reviewBox ? (
          <div>
            <StarRatings
              rating={rating}
              starRatedColor="yellow"
              changeRating={(rate) => setRating(rate)}
              numberOfStars={6}
              name="rating"
              starDimension="20px"
              starSpacing="5px"
            />
            <input type="text" ref={comment} />
            <button onClick={() => setReviewBox(false)}>close</button>
            <div>
              <button
                onClick={(event) => sendRating(event, item._id, user, rating)}
              >
                Submit
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
