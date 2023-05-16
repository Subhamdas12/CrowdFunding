export const provider = (state = {}, action) => {
  switch (action.type) {
    case "PROVIDER_LOADED":
      return {
        ...state,
        connection: action.connection,
      };
    case "NETWORK_LOADED":
      return {
        ...state,
        chainId: action.chainId,
      };
    case "ACCOUNT_LOADED":
      return {
        ...state,
        account: action.account,
      };
    case "ETHER_BALANCE_LOADED":
      return {
        ...state,
        balance: action.balance,
      };
    default:
      return state;
  }
};
const DEFAULT_CROWDFUNDING_STATE = {
  loaded: false,
  contract: {},
  transaction: {
    isSuccessful: false,
  },
  allFunding: {
    loaded: false,
    data: [],
  },
  allDonating: {
    loaded: false,
    data: [],
  },
  removeCampaigns: {
    loaded: false,
    data: [],
  },
  events: [],
};
export const crowdFunding = (state = DEFAULT_CROWDFUNDING_STATE, action) => {
  let index, data;
  switch (action.type) {
    case "CROWDFUNDING_LOADED":
      return {
        ...state,
        loaded: true,
        contract: action.crowdFunding,
      };
    case "ALL_CROWDFUNDING_LOADED":
      return {
        ...state,
        allFunding: {
          loaded: true,
          data: action.crowdFundings,
        },
      };
    case "REMOVE_CAMPAIGN":
      return {
        ...state,
        removeCampaigns: {
          loaded: true,
          data: action.removeCampaign,
        },
      };
    case "ALL_DONATION_LOADED":
      return {
        ...state,
        allDonating: {
          loaded: true,
          data: action.crowdDonation,
        },
      };
    case "TOTAL_BACKERS_LOADED":
      return {
        ...state,
        backers: action.backers,
      };
    case "TOTAL_AMOUNT_COLLECTED_LOADED":
      return {
        ...state,
        amountCollected: action.amount,
      };
    case "NEW_FORM_LOADING":
      return {
        ...state,
        transaction: {
          isPending: true,
          isSuccessful: false,
        },
      };
    case "NEW_FORM_SUCCESS":
      index = state.allFunding.data.findIndex(
        (funding) =>
          funding.id.toString() === action.crowdFundingOrder.id.toString()
      );
      if (index === -1) {
        data = [...state.allFunding.data, action.crowdFundingOrder];
      } else {
        data = state.allFunding.data;
      }
      return {
        ...state,
        allFunding: {
          ...state.allFunding,
          data,
        },
        transaction: {
          isPending: false,
          isSuccessful: true,
        },
        events: [action.event, ...state.events],
      };
    case "NEW_FORM_FAIL":
      return {
        ...state,
        transaction: {
          isPending: false,
          isError: true,
          isSuccessful: false,
        },
      };
    case "FUND_REQUEST_INITIALIZED":
      return {
        ...state,
        transaction: {
          isPending: true,
          isSuccessful: false,
        },
        transferInProgress: false,
      };
    case "FUND_REQUEST_SUCCESS":
      index = state.allDonating.data.findIndex(
        (funding) =>
          funding.id.toString() === action.donateFundOrder.id.toString()
      );
      if (index === -1) {
        data = [...state.allDonating.data, action.donateFundOrder];
      } else {
        data = state.allDonating.data;
      }
      return {
        ...state,
        allDonating: {
          ...state.allDonating,
          data,
        },
        transaction: {
          isPending: false,
          isSuccessful: true,
        },
        events: [action.event, ...state.events],
        transferInProgress: true,
      };
    case "FUND_REQUEST_FAIL":
      return {
        ...state,
        transaction: {
          isPending: false,
          isError: true,
          isSuccessful: false,
        },
        transferInProgress: false,
      };
    case "REMOVE_CAMPAIGN_SUCCESS":
      index = state.removeCampaigns.data.findIndex(
        (funding) => funding.id.toString() === action.removeOrder.id.toString()
      );
      if (index === -1) {
        data = [...state.removeCampaigns.data, action.removeOrder];
      } else {
        data = state.removeCampaigns.data;
      }
      return {
        ...state,
        removeCampaigns: {
          ...state.removeCampaigns,
          data,
        },
        transaction: {
          isPending: false,
          isSuccessful: true,
        },
        events: [action.event, ...state.events],
        transferInProgress: true,
      };
    default:
      return state;
  }
};
