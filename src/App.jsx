import React, { useState,useEffect } from 'react';
import './App.css';

function App() {
// state for current day
  const [currentDay, setCurrentDay] = useState('');
// state for todo
  const [toDo , setTodo] = useState('')
// state for todolist
  const [todoList, SetTodolist] = useState([])

  // useefect for run to get current day
  useEffect(() => {
    // Function to get the current day of the week
    const getCurrentDay = () => {
      const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const today = new Date().getDay(); // Get current day index (0 = Sunday, 1 = Monday, ...)
      const dayOfWeek = weekdays[today]; // Get day name from weekdays array
      return dayOfWeek;
    };

    // Update state with the current day when component mounts
    setCurrentDay(getCurrentDay());
  }, []); 
  
  // delete todo function
    const removeTodo = (deleteId)=>{
    const deleteList = todoList.filter((todo) => todo.id !== deleteId);
    SetTodolist(deleteList);
    }
// return of app
  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>{currentDay}</h2>
      </div>
      <div className="input">
{/* onhange evnt on input field */}
        <input value={toDo } onChange={(event)=>{setTodo(event.target.value)}} type="text" placeholder="🖊️ Add item..." />
        <i onClick={()=>{
// if dtatment for todo is empty or not
          if (toDo.trim() !== '') {
          SetTodolist([...todoList,{id : Date.now(), text : toDo, status : false}]) 
          setTodo('');
          }}} className="fas fa-plus"></i>
      </div>
      <div className="todos">
{/* map for get one by one todo */}
        {
          todoList.map((list)=>{
            return (
              
              <div className="todo">        
                <div className="left">
                  <input onClick={(event)=>{
// filter used for checked condition status
                    SetTodolist(todoList.filter((list2)=>{
                      if (list.id === list2.id) {
                        list2.status = event.target.checked
                      }
                      return list2;
                    }))
                  }}
                  value={list.status} type="checkbox" name="" id="" />
                  <p className={` ${list.status? 'right' : null}`}>{list.text}</p>
                </div>
                <div className="right">
{/* removeToDo variable call for delete ToDo */}
                <i onClick={() => removeTodo(list.id)} className="fas fa-times"></i>
                </div>
              </div>
            )
          })
        }
      </div>    
    </div>
  );
}

export default App;