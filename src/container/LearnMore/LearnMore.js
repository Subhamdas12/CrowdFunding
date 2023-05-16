import React, { useEffect, useState } from "react";
import "./learnMore.css";
import left_arrow from "../../assets/left-arrow.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  donateCampaign,
  getAmountCollected,
  getTotalBackers,
  loadAccount,
} from "../../store/interactions";
import { useLocation } from "react-router-dom";
import { dataBookSelector } from "../../store/selectors";
import Blockies from "react-blockies";

if (window.performance) {
  if (performance.navigation.type === 1) {
    window.location.replace("/");
  }
}
const LearnMore = () => {
  const navigate = useNavigate();
  const transferInProgress = useSelector(
    (state) => state.crowdFunding.transferInProgress
  );
  const location = useLocation();
  const crowdFunding = useSelector((state) => state.crowdFunding.contract);
  const account = useSelector((state) => state.provider.account);
  const provider = useSelector((state) => state.provider.connection);
  const dispatch = useDispatch();
  const backers = useSelector((state) => state.crowdFunding.backers);
  const amountCollected = useSelector(
    (state) => state.crowdFunding.amountCollected
  );

  let id = location.state.id;
  let indexCard = location.state.indexCard;
  console.log("ID", id);
  console.log("IndexCard", indexCard);
  const [amountFund, setAmountFund] = useState(0);
  let orderData = useSelector(dataBookSelector);
  console.log("Learn more orderData", orderData);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (amountFund < 1000) {
      await donateCampaign(
        id,
        amountFund,
        crowdFunding,
        account,
        dispatch,
        provider
      );
    } else {
      alert("The fund amount should be less then 1000 ETH");
    }
    setAmountFund(0);
    loadAccount(provider, dispatch);
    const targetAmountNow = Number(
      orderData[indexCard].targetFormatted
    ).toFixed(1);
    const amountCollectedNow = amountCollected;
    if (targetAmountNow <= amountCollectedNow) {
      navigate("/");
    }
  };

  useEffect(() => {
    getTotalBackers(id, crowdFunding, dispatch);
    getAmountCollected(id, crowdFunding, dispatch);
  }, [transferInProgress]);
  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <div className="header">
          <div id="backdiv">
            <Link to="/">
              <img src={left_arrow} alt="" />
            </Link>
          </div>
        </div>
        <h1>{orderData[indexCard] && orderData[indexCard].title}</h1>
        <div className="learnMore__firstLayer">
          <div className="learnMore__firstLayer-left">
            <img
              id="funding_image"
              src={orderData[indexCard] && orderData[indexCard].image}
              alt=""
            />
          </div>
          <div className="learnMore__firstLayer-right">
            <div className="learnMore__firstLayer-right_blocks">
              <h3>{orderData[indexCard] && orderData[indexCard].daysLeft}</h3>
              <p>Days Left</p>
            </div>
            <div className="learnMore__firstLayer-right_blocks">
              <h3>{amountCollected}</h3>
              <p>
                Raised out of{" "}
                {orderData[indexCard] &&
                  Number(orderData[indexCard].targetFormatted).toFixed(4)}
              </p>
            </div>
            <div className="learnMore__firstLayer-right_blocks">
              <h3>{backers}</h3>
              <p>Total Backers</p>
            </div>
          </div>
        </div>
        <div className="learnMore__secondLayer">
          <div className="learnMore__secondLayer-creator">
            <h4>CREATOR</h4>
            <a href="#">
              <Blockies
                seed={orderData[indexCard] && orderData[indexCard].owner}
                size={10}
                scale={3}
                color="#2187D0"
                bgColor="#F1F2F9"
                spotColor="#767F92"
                className="identicon"
              />
              <h3>{`By ${
                orderData[indexCard] && orderData[indexCard].owner.slice(0, 5)
              }....${
                orderData[indexCard] && orderData[indexCard].owner.slice(38, 42)
              }`}</h3>
            </a>
          </div>
          <div className="learnMore__secondLayer-description">
            <h4>STORY</h4>
            <p>{orderData[indexCard] && orderData[indexCard].description}</p>
          </div>
        </div>
        <br />

        <br />
        <label htmlFor="target">FUND AMOUNT</label>
        <br />
        <input
          type="text"
          id="imageURL"
          name="imageURL"
          required
          placeholder="ETH 0.1"
          value={amountFund === 0 ? "" : amountFund}
          onChange={(e) => setAmountFund(e.target.value)}
        />
        <br />

        <input type="submit" value="Fund" />
      </form>
    </div>
  );
};

export default LearnMore;
