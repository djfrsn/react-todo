import utils from 'utils';

export default class Reducer {
  newTodo(prevState, newState) {
    return {...prevState,
      todos: prevState.todos.concat({
        id: utils.uuid(),
        text: newState.text,
        checked: false
      })
    };
  }
}
