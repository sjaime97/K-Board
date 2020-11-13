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
    default:
      return state;
  }
};

export default listsReducer;
