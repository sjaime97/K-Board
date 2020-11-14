import { CONSTANTS } from "../actions";
import { v4 as uuidv4 } from "uuid";

const initialState = [
  {
    title: "First List",
    id: 0,
    cards: [
      { id: 0, text: "We created a static list and a static card" },
      { id: 1, text: "Card 2 text here" },
      { id: 4, text: "Card 3 text here" },
    ],
  },
  {
    title: "Second list",
    id: 2,
    cards: [
      { id: 0, text: "Card 1 text here" },
      { id: 1, text: "Card 2 text here" },
    ],
  },
];

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST:
      const newList = {
        title: action.payload.title,
        cards: [],
        id: uuidv4(),
      };
      return [...state, newList];
    case CONSTANTS.ADD_CARD:
      const newCard = {
        text: action.payload.text,
        id: uuidv4(),
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
