import {firebaseDb} from '../firebase/';

const ref = firebaseDb.ref('todos');

let loadTodosSuccess = (snapshot) => {
  return {
    type: 'TODOS_RECEIVE_DATA',
    data: snapshot.val()
  }
};

let loadTodosError = (error) => {
  return {
    type: 'TODOS_RECIVE_ERROR',
    message: error.message
  }
};

// Subscribe
export const loadTodos = () => {
  return dispatch => {
    ref.off();
    ref.on('value',
      (snapshot) => {dispatch(loadTodosSuccess(snapshot))},
      (error) => {dispatch(loadTodosError(error))}
    )
  }
};

// CREATE_TASK
export const addTodo = (text) => {
  return dispatch => {
    ref
      .push({
        text: text,
        completed: false,
      })
      .catch(error => dispatch({
        type: 'ADD_TASK_ERROR',
        message: error.message,
      }))
    ;
  }
};

// UPDATE_TASK
export const toggleTodo = (key) => {
  return (dispatch, getState) => {
    let state = getState();
    let todo  = state.todos.filter(todo => todo.key === key);

    firebaseDb
      .ref(`todos/${key}`)
      .update({completed: !todo[0].completed})
      .catch(error => dispatch({
        type: 'UPDATE_TASK_ERROR',
        message: error.message,
      }))
    ;
  }
};

// DELETE_TASK
export const deleteTodo = (key) => {
  return dispatch => {
    firebaseDb
      .ref(`todos/${key}`)
      .remove()
      .catch(error => dispatch({
        type: 'DELETE_TASK_ERROR',
        message: error.message,
      }))
    ;
  }
};

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
};
