import Reducer from 'Reducer';

export default class Store {
  constructor(subscriber, initialState = { todos: [] }) {
    this.reducer = new Reducer();
    this.subscriber = subscriber;
    this._state = initialState;
  }
  dispatch(action) {
    switch (action.type) {
    case 'NEW_TODO':
      this.setState(this.reducer.newTodo(this._state, action));
      this.subscriber(this._state);
      break;
    default:
    }
  }
  setState(state) {
    this._state = state;
  }
  getState() {
    return this._state;
  }
}
