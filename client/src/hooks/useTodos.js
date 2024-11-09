import React, {  useState } from 'react';
import axios from 'axios';
import {Card, Icon} from "semantic-ui-react";
export const endpoint = "http://localhost:9000";

export const useTodo = () => {
    const [state, setState] = useState({
        task: "",
        items: [],
    })
    const onChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    }

    const onSubmit = () => {
        let toDo = state.task;
        const userData = {
            task: toDo,
            status: false,
        };
        console.log(userData, "inside onSubmit")
        if(toDo !== "") {
            axios.post(endpoint + "/api/tasks", 
                userData,
                {
                    headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }},
            ).then((res) => {
                getTask();
            });
        }
    };

    const getTask = () => {
        axios.get(endpoint + "/api/task").then((res)=>{
            if(res.data) {
                console.log(res.data)

                setState({
                    ...state,
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
                                        onClick={() => updateTask(item._id)}
                                    />
                                    <span style={{paddingRight:10}}>Done</span>
                                    <Icon
                                        name="undo"
                                        color="yellow"
                                        onClick={() => undoTask(item._id)}
                                    />
                                    <span style={{paddingRight:10}}>Undo</span>    
                                    <Icon 
                                        name="delete"
                                        color="red"
                                        onClick={() => deleteTask(item._id)} 
                                    />
                                    <span style={{paddingRight: 10}}>Delete</span>
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        );
                    }),
                });
            } else {
                setState({
                    items: []
                });
            }
        });
    };

    const updateTask = (id) => {
        axios.put(endpoint + `/api/tasks/${id}`, {
            headers:{
                "Content-Type": "application/json",    
            },
        }).then((res) => {
           getTask();
        }) 
    }

    const undoTask = (id) => {
        axios.put(endpoint + "/api/undoTask/" + id, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",   
            },
        }).then((res) => {
            getTask();
        })
    }

    const deleteTask = (id) => {
        axios.delete(endpoint + "/api/deleteTask/" + id, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }).then((res) => {
            getTask(); 
        })
    }
    return {
        state,
        onChange,
        onSubmit,
        getTask,
        updateTask,
        undoTask,
        deleteTask
    }
}