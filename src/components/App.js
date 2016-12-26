import React, {Component} from 'react';
import { connect } from 'react-redux';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import Footer from './Footer';
import { loadTodos } from '../actions';

class App extends Component {

  componentDidMount(){
    const {dispatch} = this.props;
    dispatch(loadTodos());
  }

  render(){
    return (
      <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    todos: state.todos ? state.todos : []
  };
};

export default connect(
  mapStateToProps,
)(App);

