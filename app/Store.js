import Reducer from 'Reducer';

export default class Store {
  constructor(subscriber, initialState = { toggleAll: false, todos: [] }) {
    this.reducer = new Reducer();
    this.subscriber = subscriber;
    this._state = initialState;
  }
  dispatch(action) {
    switch (action.type) {
    case 'NEW_TODO':
      this
        .setState(this.reducer.newTodo(this._state, action))
        .subscriber(this._state);
      break;
    case 'MARK_ALL_TODOS_COMPLETED':
      this
        .setState(this.reducer.markAllTodoAsCompleted(this._state, action))
        .subscriber(this._state);
      break;
    case 'MARK_AS_COMPLETED':
      this
        .setState(this.reducer.markTodoAsCompleted(this._state, action))
        .subscriber(this._state);
      break;
    case 'EDIT_TODO':
      this
        .setState(this.reducer.editTodo(this._state, action))
        .subscriber(this._state);
      break;
    case 'UPDATE_TODO':
      this
        .setState(this.reducer.updateTodo(this._state, action))
        .subscriber(this._state);
      break;
    case 'DESTROY_TODO':
      this
        .setState(this.reducer.destroyTodo(this._state, action))
        .subscriber(this._state);
      break;
    default:
    }
  }
  setState(state) {
    this._state = state;
    return this;
  }
  getState() {
    return this._state;
  }
}
