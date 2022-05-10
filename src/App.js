import React, {useState} from "react";
import "./css/style.css";
import bg from "./img/bgimage.jpg";

//components
import InputTodo from "./components/inputTodo/inputTodo";
import ListTodo from "./components/listTodo/listTodo";


function App() {

  return (
    <div className="App">
      <img className="background-app" src={bg} alt="background-app"/>
      <div className="todo">
        <InputTodo/>
        <ListTodo/>
      </div>
    </div>
  );
}

export default App;
