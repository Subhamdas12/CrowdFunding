import React, { useState } from "react";
import "./form.css";
import left_arrow from "../../assets/left-arrow.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { submitForm } from "../../store/interactions";
if (window.performance) {
  if (performance.navigation.type === 1) {
    window.location.replace("/");
  }
}
const Form = () => {
  const crowdFunding = useSelector((state) => state.crowdFunding.contract);
  const provider = useSelector((state) => state.provider.connection);
  const account = useSelector((state) => state.provider.account);
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (target < 1000) {
      await submitForm(
        account,
        title,
        description,
        target,
        deadline,
        imageURL,
        provider,
        crowdFunding,
        dispatch
      );
      setTitle(0);
      setDescription(0);
      setTarget(0);
      setDeadline(0);
      setImageURL(0);
    } else {
      alert("The target value should be less then 999");
    }
  };

  const [title, setTitle] = useState(0);
  const [description, setDescription] = useState(0);
  const [target, setTarget] = useState(0);
  const [deadline, setDeadline] = useState(0);
  const [imageURL, setImageURL] = useState(0);

  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <div className="header">
          <div id="backdiv">
            <Link to="/">
              <img src={left_arrow} alt="" />
            </Link>
          </div>
          <h1>Create Campaign</h1>
        </div>
        <br />
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          value={title === 0 ? "" : title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor="description">Description:</label>
        <br />
        <textarea
          id="description"
          name="description"
          required
          value={description === 0 ? "" : description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <br />
        <label htmlFor="target">Target:</label>
        <br />
        <input
          type="number"
          id="target"
          name="target"
          placeholder="999"
          required
          value={target === 0 ? "" : target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <br />
        <label htmlFor="deadline">Deadline:</label>
        <br />
        <input
          type="date"
          id="deadline"
          name="deadline"
          required
          value={deadline === 0 ? "" : deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <br />
        <label htmlFor="target">Image URL:</label>
        <br />
        <input
          type="text"
          id="imageURL"
          name="imageURL"
          required
          value={imageURL === 0 ? "" : imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Form;
