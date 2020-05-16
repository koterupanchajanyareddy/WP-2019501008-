import {View, Text, Button, ScrollView, TextInput} from 'react-native';
import { CheckBox } from 'react-native-elements';
import React from 'react';
import { Constants } from 'expo';

let id = 0;



const Todo = props => (
    <View >
        <CheckBox onPress = {props.onChecked} checked = {props.todo.checked}/>
        <Text>{props.todo.text}</Text>
        <Button onPress = {props.onDelete} title = "delete" />
    </View>
);

export default class TodoApp extends React.Component {
    constructor() {
        super();
        this.state = {
            Task: '',
            Date: '',
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
        var text1 = text +  "  :  " + new Date().toLocaleTimeString();
        this.setState({
            todos : [...this.state.todos, 
                {id: id++, text: text1, checked: false}],
            Task: '',
            Date: '',
        })
    }

    render() {
        return (
        <View >
            <Text style = {{fontWeight: 'bold'}}>Todo Tasks</Text>
            <Text style = {{paddingTop: 10}}>Total Tasks : {this.state.todos.length}</Text>
            <Text>Unchecked Tasks count: {
                this.state.todos.filter(todo => !todo.checked).length
                }</Text>
            <ScrollView >
                {this.state.todos.map(
                    todo => <Todo
                    onChecked = {() => this.toggleTask(todo.id)}
                    onDelete = {() => this.removeTodo(todo.id)} todo = {todo}
                    />
                    )}
            </ScrollView>
            <Text style = {{paddingTop: 50}}>Task to be done : </Text>
            <TextInput id = "Task" onChangeText = { (Task) => this.setState({Task}) } value = {this.state.Task}/>
            <Text> Due Date : </Text>
            <TextInput type = "date"  id = "Date"  onChangeText = { (Date) => this.setState({Date}) } value = {this.state.Date}/>
            <Button onPress = {() => this.addTodo(this.state.Task 
            + "--------" + this.state.Date)} title = "Add Task" />
        </View>
        );
    }
}