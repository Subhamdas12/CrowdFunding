import { useEffect } from "react";
import "./App.css";
import config from "./config.json";
import { Alert, Form, LearnMore, Shell } from "./container";

import { useDispatch } from "react-redux";
import {
  loadAccount,
  loadAllData,
  loadCrowdFunding,
  loadNetwork,
  loadProvider,
  subscribeToEvents,
} from "./store/interactions";
import { Route, Routes } from "react-router-dom";
import GetBackers from "./container/GetBackers/GetBackers";

function App() {
  const dispatch = useDispatch();
  const loadBlockchainData = async () => {
    const provider = loadProvider(dispatch);
    const chainId = await loadNetwork(provider, dispatch);
    window.ethereum.on("accountsChanged", () => {
      loadAccount(provider, dispatch);
    });
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });
    const crowdFunding_config = config[chainId].crowdFunding;
    const crowdFunding = await loadCrowdFunding(
      provider,
      crowdFunding_config.address,
      dispatch
    );
    subscribeToEvents(crowdFunding, dispatch);
    loadAllData(provider, crowdFunding, dispatch);
  };
  useEffect(() => {
    loadBlockchainData();
  });
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Shell />}></Route>
        <Route path="/Form" element={<Form />}></Route>
        <Route path="/LearnMore" element={<LearnMore />}></Route>
        <Route path="/GetBackers" element={<GetBackers />}></Route>
      </Routes>
      <Alert />
    </div>
  );
}

export default App;
