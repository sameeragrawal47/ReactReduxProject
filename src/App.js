import React, { Component } from 'react';
import './App.css';
import { createStore } from 'redux';

const questions = [{
  "id": 1,
  "text": "Favorite color",
  "answers": [{
    "id": 1,
    "text": "Red",
    "responses": 10
  }, {
    "id": 2,
    "text": "Green",
    "responses": 20
  }, {
    "id": 3,
    "text": "Blue",
    "responses": 5
  }]
}, {
  "id": 2,
  "text": "Favorite animal",
  "answers": [{
    "id": 1,
    "text": "Dog",
    "responses": 150
  }, {
    "id": 2,
    "text": "Cat",
    "responses": 100
  }, {
    "id": 3,
    "text": "Bird",
    "responses": 17
  }]
}];

function questionsReducer(state = questions, action) {
    switch(action.type){
      case "SUBMIT":
        const updatedState = state.map(e =>{
          if(e.id === action.id)
            return{...e,
                  "answers": e.answers.map(f =>{
              if(f.text === action.text){
                return{
                  ...f,
                  ...{"responses": f.responses + 1},
                  
                }
              }
              return f;
            })
          }
        return e;
        })
        console.log("updatedstate", updatedState)
        return updatedState

        break;
      default:
        return state;
    }
}
const store = createStore(questionsReducer);

class App extends Component {
  constructor(){
    super();
    this.state ={
      selectedText: "",
      possibleAnswers: []
    }

  }

// Function to be called on submit of form
handleSubmit(e){
  console.log(e.target.value);
   // created store here
  var k = (document.querySelector('input[name="color"]:checked').value);
  const action ={
    type:"SUBMIT",
    text: k,
    id: 1
    }
  store.dispatch(action);  // Dispatching action to reducer
  let newState = store.getState();
  let posAns = [];
  for( let i of newState){
     if(i.id === action.id){
      for(let j of i.answers){
        if(j.text !== k){
          posAns.push(j);
        }
      }
     }
   } 
  this.setState({
    selectedText: k,
    possibleAnswers: posAns
  });
}
  render() {
    const disp = this.state.possibleAnswers.map(k =>{
      return(
          <li>{k.text} : {k.responses}</li>
      )
    })
    return (
      <div className="App">
        
          <input type="radio" value="Red" name="color" /> Red
          <input type="radio" value="Green" name="color" /> Green
          <input type="button" value="Submit" onClick={this.handleSubmit.bind(this)} />
        <div>
        <text>You Selected: {this.state.selectedText}</text>
        <div>
        <text> Other Possible Answers </text>
        {disp}
        </div>
        </div>
      </div>
    );
  }
}

export default App;
