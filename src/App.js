import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 1, name: "Jordi", age: 31},
      { id: 2, name: "Matt", age: 28},
      { id: 3, name: "Joanna", age: 30},
    ],
    showPersons: false
  }

  // switchNameHandler = (newName) => {
  //     // console.log("Was clicked");
  //     // DONT DO THIS --> this.state.persons[0].name = 'Jordi Joan';
  //   this.setState({persons : [
  //     { name: "Jordi", age: 31},
  //     { name: "Matt", age: 28},
  //     { name: "Joanna", age: 25},
  //   ]})  
  // }

  deletePersonHandler = (personIndex) => {
    // COPY FULL ARRAY TO CONSTANT
    // const persons = this.state.persons.slice();
    // ES6 version
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    // ... copies the elements of the object into a new object instead of copy the reference.
    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: ! doesShow})
  }

  render() {
    /** INLINE STYLES */
    const style = {
      backgroundColor: 'black',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      color: 'white',
    }

    let persons = null;

    if(this.state.showPersons){
      persons = (
          <div>
            {this.state.persons.map((person, index) => {
              return (
                <Person 
                  name={person.name} 
                  age={person.age}
                  click={() => this.deletePersonHandler(index)}
                  changed={(event) => this.nameChangedHandler(event, person.id)}
                  key={index} />
                  // KEY IS TO HELP REACT MANAGE THE
              );
            })}
          </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        {/* ineficient, although can be used */}
        <button style={style} 
          onClick={this.togglePersonsHandler}>
          Toggle Persons
        </button>
        {persons}        
      </div>
    );
    // return React.createElement('div', {className: 'App'}, 
    // React.createElement('h1', null, 'Hi, I\'m a React App!!!'));
  }
}

export default App;
