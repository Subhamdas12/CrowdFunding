import { ethers } from "ethers";
import { get } from "lodash";
import { createSelector } from "reselect";
const openData = (state) => get(state, "crowdFunding.allFunding.data");
export const dataBookSelector = createSelector(openData, (data) => {
  data = decorateOpenData(data);

  return data;
});
const decorateOpenData = (datas) => {
  return datas.map((data) => {
    data = decorateOrder(data);

    return data;
  });
};

const decorateOrder = (data) => {
  const precision = 100000;
  let amountCollectedFormatted =
    Math.round(data.amountCollected * precision) / precision;
  let targetFormatted = Math.round(data.target * precision) / precision;
  targetFormatted = ethers.utils.formatEther(targetFormatted.toString());
  let deadline = Math.floor(parseInt(data.deadline) / 1);
  let todays_date = new Date().getTime();
  todays_date = Math.floor(todays_date / 1000);
  let idFormatted = Math.round(data.id * precision) / precision;
  let difference = deadline - todays_date;
  let daysLeft = Math.floor(difference / 86400);

  let backers = data.donators;

  return {
    ...data,
    targetFormatted,
    amountCollectedFormatted,
    idFormatted,
    daysLeft,
  };
};
