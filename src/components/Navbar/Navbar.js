import React from "react";
import "./navbar.css";
import logo from "../../assets/balance.png";
import { useDispatch, useSelector } from "react-redux";
import Blockies from "react-blockies";
import config from "../../config.json";
import { loadAccount } from "../../store/interactions";
import { Link } from "react-router-dom";
const Navbar = () => {
  const provider = useSelector((state) => state.provider.connection);
  const account = useSelector((state) => state.provider.account);
  const balance = useSelector((state) => state.provider.balance);
  const chainId = useSelector((state) => state.provider.chainId);
  const dispatch = useDispatch();

  const connectionHandler = async () => {
    await loadAccount(provider, dispatch);
  };
  const networkHandler = async (e) => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: e.target.value,
        },
      ],
    });
  };
  return (
    <div>
      {" "}
      <nav>
        <div className="navbar-title">
          <img src={logo} alt="" />
          <h3>CrowdFunding</h3>
        </div>
        <div className="middleSection">
          <select
            className="navbar-select"
            onChange={networkHandler}
            value={config[chainId] ? `0x${chainId.toString(16)}` : `0`}
          >
            <option value="0" disabled>
              Select Network
            </option>
            <option value="0x7A69">Localhost</option>
            <option value="0x5">Goerli</option>
          </select>
        </div>
        <div className="navbar-buttons">
          {account ? (
            <Link to="/Form">
              <button className="navbar-button">Create a campaign</button>
            </Link>
          ) : (
            <div></div>
          )}
          <div className="userDetails">
            {balance ? (
              <p>
                <small>My Balance : </small>
                {Number(balance).toFixed(4)}
              </p>
            ) : (
              <p>
                <small>My Balance : </small>0 ETH
              </p>
            )}
            {account ? (
              <a href="https://google.com" target="_blank" rel="noreferrer">
                {account.slice(0, 5) + "...." + account.slice(38, 42)}
                <Blockies
                  seed={account}
                  size={10}
                  scale={3}
                  color="#2187D0"
                  bgColor="#F1F2F9"
                  spotColor="#767F92"
                  className="identicon"
                />
              </a>
            ) : (
              <button
                className="navbar-button connectButton"
                onClick={connectionHandler}
              >
                Connect
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
