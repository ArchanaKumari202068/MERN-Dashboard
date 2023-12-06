import React from "react";
import "./Card.css";

function Card(props) {
  return (
    <div className="Card">
      <div className="">
        <div className="card_image">
          <img src={props.imageUrl} />
        </div>
        <div className="card_brans">
          <p>{props.brand}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
