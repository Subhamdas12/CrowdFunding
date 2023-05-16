import React, { useState } from "react";
import "./getBackers.css";
import { useLocation } from "react-router-dom";

if (window.performance) {
  if (performance.navigation.type === 1) {
    window.location.replace("/");
  }
}
const GetBackers = () => {
  const location = useLocation();
  //   const id = location.state.id;
  return (
    <div className="container">
      {/* <h2>{id}</h2> */}
      <form>
        <table>
          <thead>
            <tr>
              <th>Column 1</th>
              <th>Column 2</th>
              <th>Column 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Row 1, Column 1</td>
              <td>Row 1, Column 2</td>
              <td>Row 1, Column 3</td>
            </tr>
            <tr>
              <td>Row 2, Column 1</td>
              <td>Row 2, Column 2</td>
              <td>Row 2, Column 3</td>
            </tr>
            <tr>
              <td>Row 3, Column 1</td>
              <td>Row 3, Column 2</td>
              <td>Row 3, Column 3</td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default GetBackers;
