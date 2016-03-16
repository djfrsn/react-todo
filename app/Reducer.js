import utils from 'utils';

const defaultTodo = {
  id: '',
  text: '',
  completed: false
};

export default class Reducer {
  newTodo(prevState, newState) {
    return {...prevState,
      toggleAll: false,
      todos: prevState.todos.concat({...defaultTodo,
        id: utils.uuid(),
        text: newState.text
      })
    };
  }
  markTodoAsCompleted(prevState, newState) {
    let completedTotal = 0;
    let state = {...prevState,
      todos: prevState.todos.map((todo) => {
        return {...todo,
          completed: newState.id === todo.id ? !todo.completed : todo.completed
        };
      })
    };

    state.todos.forEach((todo) => {
      if (todo.completed) {
        completedTotal++;
      }
    });

    state  = {...state, toggleAll: completedTotal === state.todos.length ? true : false };

    return state;
  }
  editTodo(prevState, newState) {
    return {...prevState,
      todos: prevState.todos.map((todo) => {
        return {...todo,
          editing: newState.id === todo.id ? true : false
        };
      })
    };
  }
  updateTodo(prevState, newState) {
    return {...prevState,
      todos: prevState.todos.map((todo) => {
        const matchedTodo = newState.id === todo.id;
        return {...todo,
          text: matchedTodo ? newState.text : todo.text,
          editing: false
        };
      })
    };
  }
  destroyTodo(prevState, newState) {
    const todos = [];

    prevState.todos.forEach((todo) => {
      if (newState.id !== todo.id) {
        todos.push({...todo});
      }
    });
    return {...prevState,
      toggleAll: false,
      todos: todos
    };
  }
  clearCompletedTodos(prevState) {
    const todos = [];

    prevState.todos.forEach((todo) => {
      if (!todo.completed) {
        todos.push({...todo});
      }
    });
    return {...prevState,
      toggleAll: false,
      todos: todos
    };
  }
  markAllTodoAsCompleted(prevState, newState) {
    return {...prevState,
      toggleAll: newState.checked,
      todos: prevState.todos.map((todo) => {
        return {...todo,
          completed: newState.checked
        };
      })
    };
  }
}
