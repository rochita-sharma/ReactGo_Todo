import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {Card, Header, Form, Input, Icon, Button} from "semantic-ui-react";
import {useTodo} from './hooks/useTodos'



function ToDo() {
    const {onChange, onSubmit,getTask,updateTask,undoTask,deleteTask, state} = useTodo();
    // const [task, setTask] = useState("")
    // const [data, setData] = useState({
    //     items: [],
    // })

    // useEffect
    useEffect(()=>{
        getTask();  
    }, []);

    

    // const renderItems = () => {
    //     console.log(items.length, "inside render");
    //     if(items.length !== null) {
    //         return(
    //             <div>{items}</div>
    //         );
    //     }
    //     else {
    //         return(
    //             <div></div>
    //         );
    //     }
    // }

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
                        value={state.task}
                        onChange={onChange}
                        fluid 
                    />
                    <Button 
                        onClick={onSubmit}
                        style={{marginTop: 20, marginBottom: 20}}
                    >Create Task</Button>
                </Form>
                <div className='row'>
                    <Card.Group>{state.items}</Card.Group>
                </div>
            </div>
        </div>
    );
}

export default ToDo;