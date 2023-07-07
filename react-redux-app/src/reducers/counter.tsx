interface IAction {
  type: string;
}

const counter = (state = 0, actions: IAction) => {
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