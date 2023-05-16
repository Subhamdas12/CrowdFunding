import React, { useEffect } from "react";
import "./cards.css";
import sample from "../../assets/neom-nMzbnMzMjYU-unsplash.jpg";
import Blockies from "react-blockies";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Cards = (props) => {
  const navigate = useNavigate();
  let desc = props.description;
  const account = useSelector((state) => state.provider.account);
  // let description = desc.slice(0, 5);
  let description = "Hello";
  const learnMoreHandler = () => {
    console.log(props.indexCard);
    navigate("/LearnMore", {
      state: { indexCard: props.indexCard, id: props.id },
    });
  };

  return (
    <div className="card">
      <img src={props.imageURL} alt="Sample " />
      <div className="content">
        <div className="card_title">
          <h2 className="card_title">
            {" "}
            {props.title ? props.title.slice(0, 26) + "..." : ""}
          </h2>
        </div>
        <div className="card__description">
          <p className="card__description">
            {props.description
              ? props.description.slice(0, 100) + " .... "
              : ""}
          </p>
        </div>

        <div className="card__middle">
          <div>
            <h3>{Number(props.amountCollected).toFixed(4)} ETH</h3>
            <p>{`Raised of ${Number(props.target).toFixed(4)} ETH`}</p>
          </div>
          <div>
            <h3>{props.deadline}</h3>
            <p>Days left</p>
          </div>
        </div>
        <div id="card__identity">
          <Blockies
            seed={props.owner}
            size={10}
            scale={3}
            color="#2187D0"
            bgColor="#F1F2F9"
            spotColor="#767F92"
            className="identicon"
          />
          <p>{`By ${props.owner.slice(0, 5)}....${props.owner.slice(
            38,
            42
          )}`}</p>
        </div>
        {account ? (
          <button onClick={learnMoreHandler}>Learn More</button>
        ) : (
          <h5>Connect to Metamask to LearnMore</h5>
        )}
      </div>
    </div>
  );
};

export default Cards;
