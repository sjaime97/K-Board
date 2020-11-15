import { CONSTANTS } from "../actions";
import { v4 as uuidv4 } from "uuid";

const initialState = [
  {
    title: "First List",
    id: "list-ed36c6d0-1a0a-45ba-ad66-e1dc60e05aee",
    cards: [
      { id: "card-e35dbcb9-3a50-4fb4-a7a4-e4f7bf20640b", text: "We created a static list and a static card" },
      { id: "card-deda46a0-fc7e-4836-a9d8-430f14ea404b", text: "Card 2 text here" },
    ],
  },
  {
    title: "Second list",
    id:"list-045ecfa1-b33b-4b08-9074-82712278035e",
    cards: [
      { id: "card-8818344b-6d0a-4a12-8fe3-d1d63a72c88a", text: "Card 1 text here" },
      { id: "card-f36332d0-0a26-4dc3-bfa1-589f5d4947d4", text: "Card 2 text here" },
    ],
  },
];

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST:
      const newList = {
        title: action.payload.title,
        cards: [],
        id: `list-${uuidv4()}`,
      };
      return [...state, newList];
    case CONSTANTS.ADD_CARD:
      const newCard = {
        text: action.payload.text,
        id: `card-${uuidv4()}`,
      };

      const newState = state.map(list => {
        if (list.id === action.payload.listID) {
          return {
            ...list,
            cards: [...list.cards, newCard]
          };
        }
        else{
          return list;
        }
      });
      return newState;
    default:
      return state;
  }
};

export default listsReducer;
