const initialState = [
  { id: 0, fname: "Jakob Keith", email: "test1@mail.com", phone: 1234567890 },
  { id: 1, fname: "Simone Mayo", email: "test2@mail.com", phone: 4567391230 },
  { id: 2, fname: "Tanya Good", email: "test3@mail.com", phone: 7561801200 },
  {
    id: 3,
    fname: "Margaret Stout",
    email: "test4@mail.com",
    phone: 9961807200,
  },
  {
    id: 4,
    fname: "Allyson Becker",
    email: "test5@mail.com",
    phone: 1065801870,
  },
];

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      state = [...state, action.payload];
      return state;

    case "DELETE_CONTACT":
      const contactFilter = state.filter((contact) =>
        contact.id === action.payload ? null : contact
      );
      state = contactFilter;
      return state;

    case "UPDATE_CONTACT":
      const contactUpdate = state.filter((contact) =>
        contact.id === action.payload.id
          ? Object.assign(contact, action.payload)
          : contact
      );
      state = contactUpdate;
      return state;
    case "RESET_CONTACT":
      state = [{ name: null, email: null, phone: null }];
      return state;

    default:
      return state;
  }
};

export default contactReducer;
