import { ethers } from "ethers";
import { get, reject } from "lodash";
import { createSelector } from "reselect";
const events = (state) => get(state, "crowdFunding.events");
const allData = (state) => get(state, "crowdFunding.allFunding.data");
const donateData = (state) => get(state, "crowdFunding.allDonating.data");
const removeCampaigns = (state) =>
  get(state, "crowdFunding.removeCampaigns.data");

export const dataBookSelector = createSelector(
  allData,
  donateData,
  removeCampaigns,
  (data, donate, remove) => {
    data = decorateOpenData(data);
    donate = decorateOpenData(donate);
    data = decorateRequiredFields(donate, data);
    remove = removeOpenData(remove);
    data = removeMatchingIds(data, remove);
    data = sortById(data);
    console.log(data);
    console.log(remove);
    return data;
  }
);
const decorateOpenData = (datas) => {
  return datas.map((data) => {
    data = decorateOrder(data);
    return data;
  });
};
const removeOpenData = (datas) => {
  return datas.map((data) => {
    data = addFormatId(data);
    return data;
  });
};

const decorateOrder = (data) => {
  const precision = 100000;
  // let amountCollectedFormatted =
  //   Math.round(data.amountCollected * precision) / precision;
  let amountCollectedFormatted = ethers.utils.formatEther(data.amountCollected);
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

const decorateRequiredFields = (arr1, arr2) => {
  const idMap = new Map();

  // Loop through first array and add all objects to the map
  for (const obj of arr1) {
    idMap.set(obj.idFormatted, obj);
  }

  // Loop through second array and check if each object's ID exists in the map
  for (const obj of arr2) {
    const existingObj = idMap.get(obj.idFormatted);

    // If the ID already exists, compare the amounts and replace if necessary
    if (existingObj) {
      if (obj.amountCollectedFormatted > existingObj.amountCollectedFormatted) {
        idMap.set(obj.idFormatted, obj);
      }
    } else {
      // If the ID doesn't exist, add it to the map
      idMap.set(obj.idFormatted, obj);
    }
  }

  // Return the values of the map as a new array
  return Array.from(idMap.values());
};
function sortById(arr) {
  return arr.sort((a, b) => a.idFormatted - b.idFormatted);
}

const addFormatId = (data) => {
  let precision = 100000;
  let idFormatted = Math.round(data.id * precision) / precision;
  return {
    ...data,
    idFormatted,
  };
};

function removeMatchingIds(b, a) {
  let aIds = a.map((obj) => obj.idFormatted);
  console.log(aIds);
  let bFiltered = b.filter((obj) => !aIds.includes(obj.idFormatted));
  return bFiltered;
}

export const myEventsSelector = createSelector(events, (events) => {
  return events;
});
