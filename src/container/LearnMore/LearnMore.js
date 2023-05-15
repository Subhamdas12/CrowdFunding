import React, { useEffect, useState } from "react";
import "./learnMore.css";
import left_arrow from "../../assets/left-arrow.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  donateCampaign,
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
  const location = useLocation();
  const crowdFunding = useSelector((state) => state.crowdFunding.contract);
  const account = useSelector((state) => state.provider.account);
  const provider = useSelector((state) => state.provider.connection);
  const dispatch = useDispatch();
  const backers = useSelector((state) => state.crowdFunding.backers);
  let id = location.state.id;
  const [amountFund, setAmountFund] = useState(0);
  const orderData = useSelector(dataBookSelector);
  const submitHandler = (e) => {
    e.preventDefault();
    donateCampaign(id, amountFund, crowdFunding, account, dispatch, provider);
    setAmountFund(0);
    loadAccount(provider, dispatch);
  };

  useEffect(() => {
    getTotalBackers(id, crowdFunding, dispatch);
  });
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
        <h1>{orderData[id].title}</h1>
        <div className="learnMore__firstLayer">
          <div className="learnMore__firstLayer-left">
            <img id="funding_image" src={orderData[id].image} alt="" />
          </div>
          <div className="learnMore__firstLayer-right">
            <div className="learnMore__firstLayer-right_blocks">
              <h3>{orderData[id].daysLeft}</h3>
              <p>Days Left</p>
            </div>
            <div className="learnMore__firstLayer-right_blocks">
              <h3>{orderData[id].amountCollectedFormatted}</h3>
              <p>
                Raised out of {Number(orderData[id].targetFormatted).toFixed(4)}
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
                seed={orderData[id].owner}
                size={10}
                scale={3}
                color="#2187D0"
                bgColor="#F1F2F9"
                spotColor="#767F92"
                className="identicon"
              />
              <h3>{`By ${orderData[id].owner.slice(0, 5)}....${orderData[
                id
              ].owner.slice(38, 42)}`}</h3>
            </a>
          </div>
          <div className="learnMore__secondLayer-description">
            <h4>STORY</h4>
            <p>{orderData[id].description}</p>
          </div>
        </div>
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
