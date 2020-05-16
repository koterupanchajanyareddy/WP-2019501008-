

let id = 0;

const Todo = props => (
    <li>
        <input type = "checkbox" onChange = {props.onChecked} checked = {props.todo.checked}/>
        <span>{props.todo.text}</span>
        <button onClick = {props.onDelete} >delete</button>
    </li>
);

class TodoApp extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: [],
        };
    }

    toggleTask(id) {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id !== id) {
                    return todo;
                }
                return {
                    id : todo.id,
                    text: todo.text,
                    checked: !todo.checked,
                }
                
            })
        });
    }

    removeTodo(id) {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        });
    }

    addTodo(text) {
        var text = text;
        text += "  :  " + new Date().toLocaleTimeString();
        this.setState({
            todos : [...this.state.todos, 
                {id: id++, text: text, checked: false}],
        })
    }

    render() {
        return (
        <div>
            <h1>Todo Tasks : </h1>
            <div>Total Tasks : {this.state.todos.length}</div>
            <div>Tasks unChecked count: {
                this.state.todos.filter(todo => !todo.checked).length
                }</div>
            <ul>
                {this.state.todos.map(
                    todo => <Todo
                    onChecked = {() => this.toggleTask(todo.id)}
                    onDelete = {() => this.removeTodo(todo.id)} todo = {todo}
                    />
                    )}
            </ul>
            <span>Task to be done : </span>
            <input type = "text"  id = "Task" />
            <span> Due Date : </span>
            <input type = "date"  id = "Date" />
            <button onClick = {() => this.addTodo(document.getElementById('Task').value 
            + "----------" + document.getElementById('Date').value)}>Add Task</button>
        </div>
        );
    }
}


ReactDOM.render(
    <TodoApp />,
    document.getElementById('todo')
);