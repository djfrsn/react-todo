import utils from 'utils';
import { browserHistory } from 'react-router';

const defaultTodo = {
  id: '',
  text: '',
  completed: false,
  visible: true
};

export default class Reducer {
  newTodo(prevState, nextState) {
    return {...prevState,
      toggleAll: false,
      todos: prevState.todos.concat({...defaultTodo,
        id: utils.uuid(),
        text: nextState.text,
        visible: prevState.activeVisibilityFilter !== 'completed'
      })
    };
  }
  markTodoAsCompleted(prevState, nextState) {
    let completedTotal = 0;
    let state = {...prevState,
      todos: prevState.todos.map((todo) => {
        return {...todo,
          completed: nextState.id === todo.id ? !todo.completed : todo.completed
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
  editTodo(prevState, nextState) {
    return {...prevState,
      todos: prevState.todos.map((todo) => {
        return {...todo,
          editing: nextState.id === todo.id ? true : false
        };
      })
    };
  }
  updateTodo(prevState, nextState) {
    return {...prevState,
      todos: prevState.todos.map((todo) => {
        const matchedTodo = nextState.id === todo.id;
        return {...todo,
          text: matchedTodo ? nextState.text : todo.text,
          editing: false
        };
      })
    };
  }
  destroyTodo(prevState, nextState) {
    const todos = [];

    prevState.todos.forEach((todo) => {
      if (nextState.id !== todo.id) {
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
  markAllTodoAsCompleted(prevState, nextState) {
    return {...prevState,
      toggleAll: nextState.checked,
      todos: prevState.todos.map((todo) => {
        return {...todo,
          completed: nextState.checked
        };
      })
    };
  }
  visibilityFilter(prevState, nextState) {
    let todos = {};
    const push = nextState.browserHistoryPush || true;

    if (push) {
      browserHistory.push(`/${nextState.filter === 'all' ? '' : nextState.filter}`);
    }

    switch (nextState.filter) {
    case 'all':
      todos = prevState.todos.map((todo) => {
        return {...todo,
          visible: true
        };
      });
      break;
    case 'active':
      todos = prevState.todos.map((todo) => {
        return {...todo,
          visible: todo.completed ? false : true
        };
      });
      break;
    case 'completed':
      todos = prevState.todos.map((todo) => {
        return {...todo,
          visible: todo.completed ? true : false
        };
      });
      break;
    }

    return {...prevState,
        activeVisibilityFilter: nextState.filter,
        todos: todos
    };
  }
}
