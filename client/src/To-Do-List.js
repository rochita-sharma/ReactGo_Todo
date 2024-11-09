import React, { Component } from 'react';
import axios from 'axios';
import {Card, Header, Form, Input, Icon, Button} from "semantic-ui-react";

let endpoint = "http://localhost:9000";

class ToDoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            task: "",
            items: [],
        };
    }
    componentDidMount(){
        this.getTask();
    }

    onChange = (event) => {
        // console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    onSubmit = () => {
        // console.log(this.state.task, "inside submit1");
        let taskToPost = this.state.task;
        // console.log( taskToPost, "inside submit2");
        const userData = {
            task: taskToPost,
            status: false,
        };
        if(taskToPost) {
            // console.log("inside if");
            axios.post(endpoint + "/api/tasks", 
                userData,
                {
                    headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }},
            ).then((res) => {
                this.getTask();
                this.setState({
                    task: "",
                });
                // console.log(res,"inside post");
            });
        }
    }

    getTask = () => {
        axios.get(endpoint + "/api/task").then((res)=>{
            if(res.data) {
                this.setState({
                    items: res.data.map((item) => {
                        let color = "yellow";
                        let style = { 
                            wordWrap: "break-word",
                        };
                        if(item.status) {
                            color = "green";
                            style["textDecoration"] = "line-through";
                        }
                        return (
                            <Card key={item._id} color={color} fluid className="rough">
                                <Card.Content>
                                    <Card.Header textAlign="left">
                                        <div style={style}>{item.task}</div>
                                    </Card.Header>
                                    <Card.Meta textAlign="right">
                                    <Icon
                                        name="check circle"
                                        color="blue"
                                        onClick={() => this.updateTask(item._id)}
                                    />
                                    <span style={{paddingRight:10}}>Done</span>
                                    <Icon
                                        name="undo"
                                        color="yellow"
                                        onClick={() => this.undoTask(item._id)}
                                    />
                                    <span style={{paddingRight:10}}>Undo</span>    
                                    <Icon 
                                        name="delete"
                                        color="red"
                                        onClick={() => this.deleteTask(item._id)} 
                                    />
                                    <span style={{paddingRight: 10}}>Delete</span>
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        );
                    }),
                });
            } else {
                this.setState({
                    items: [],
                });
            }
        });
    };

    updateTask = (id) => {
        axios.put(endpoint + `/api/tasks/${id}`, {
            headers:{
                "Content-Type": "application/x-www-form-urlencoded",    
            },
        }).then((res) => {
            // console.log(res);
            this.getTask();
        }) 
    }

    undoTask = (id) => {
        axios.put(endpoint + "/api/undoTask/" + id, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",   
            },
        }).then((res) => {
            // console.log(res);
            this.getTask();
        })
    }

    deleteTask = (id) => {
        axios.delete(endpoint + "/api/deleteTask/" + id, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }).then((res) => {
            // console.log(res);
            this.getTask(); 
        })
    }


    render() {
        return (
            <div>
                <div className='row'>
                    <Header className="header" as="h2" color="yellow">
                        To Do List
                    </Header>
                </div>
                <div className='row'>
                    <Form>
                        <Input
                            type="text"
                            placeholder="Create Task"
                            name="task"
                            value={this.state.task}
                            onChange={this.onChange}
                            fluid 
                        />
                        <Button 
                            onClick={this.onSubmit}
                            style={{marginTop: 20, marginBottom: 20}}
                        >Create Task</Button>
                    </Form>
                    <div className='row'>
                        <Card.Group>{this.state.items}</Card.Group>
                    </div>
                </div>
            </div>
        );
    }
}

export default ToDoList;
