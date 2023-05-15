import React from "react";
import { Cards, Navbar } from "../../components";
import { dataBookSelector } from "../../store/selectors";
import { useSelector } from "react-redux";
const Shell = () => {
  const orderData = useSelector(dataBookSelector);
  return (
    <div>
      <Navbar />
      <div className="projectBody">
        {orderData &&
          orderData.map((data, index) => {
            return (
              <Cards
                key={index}
                title={data.title}
                description={data.description}
                amountCollected={data.amountCollectedFormatted}
                target={data.targetFormatted}
                owner={data.owner}
                imageURL={data.image}
                deadline={data.daysLeft}
                id={data.idFormatted}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Shell;
