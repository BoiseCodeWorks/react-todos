import React, {Component} from 'react'

class Todos extends Component {
   constructor(){
    super()
    this.state = {
      todos: []
    }
  }

  componentDidMount(){
    this._getTodos();
  }

  addTask (e){
    e.preventDefault();
    let form = this.refs.form;
    let newTask = this.refs.newTask.value;
    this.state.todos.push(newTask);
    this.setState({
      todos: this.state.todos
    })
    form.reset();
    this._saveTodos()
  }

  removeTask(i){
    this.state.todos.splice(i,1)
    this.setState({
      todos: this.state.todos
    })
    this._saveTodos()
  }

  _saveTodos(){
    localStorage.setItem('todos', JSON.stringify(this.state.todos))
  }

  _getTodos(){
    var todos = JSON.parse(localStorage.getItem('todos'))
    this.setState({
      todos: todos || []
    })
  }

  render() {
    return (
      <div>
        <h2>TODOS: </h2>
        <form ref="form">
          <input type="text" placeholder="Enter the task" ref="newTask"/>
          <button type="submit" onClick={this.addTask.bind(this)}>Add Task</button>
        </form>

        {this.state.todos.map((todo, i) => {
          return (<Todo todo={todo} key={i} removeTask={this.removeTask.bind(this)}/>)
        }) }
      </div>
    )
  }
}



class Todo extends Component {
  render() {
    return (
      <div key={this.props.i}>
        {this.props.todo} - <span onClick={this.props.removeTask.bind(null, this.props.i)}>X</span>
      </div>
    )
  }
}

export default Todos