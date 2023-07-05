const counter = (state = 0, actions: { type: string }) => {
  switch (actions.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state -1;
    default:
      return state;
  }
}

export default counter;