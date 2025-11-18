import { useEffect, useState } from 'react'

import './App.css'
import { Outlet} from "react-router-dom";
import type { Joke, NewJoke, JokeContext } from "../src/types";

interface JokeMenuProps {
  jokes: Joke[];
}
const JokeMenu = ({ jokes }: JokeMenuProps) => {
  return (
    <div className="pizza-menu">
    <h2>Nos jokes</h2>
    <table>
      <thead>
        <tr>
          <th>Joke</th>
          <th>Contenu</th>
        </tr>
      </thead>
      <tbody>
        {jokes.map((joke) => (
          <tr key={joke.id}>
            <td>{joke.title}</td>
            <td>{joke.content}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};


const App = () => {
  const [actionToBePerformed, setActionToBePerformed] = useState(false);
  const [jokes, setJokes] = useState<Joke[]>([]);
  const addJoke = (newJoke: NewJoke) => {
    const jokeAdded = { ...newJoke, id: nextJokeId(jokes) };
    setJokes([...jokes, jokeAdded]);
  };
    useEffect(() => {
    fetch("http://localhost:3000/jokes")
      .then((response) => {
        if (!response.ok)
          throw new Error(
            `fetch error : ${response.status} : ${response.statusText}`
          );
        return response.json();
      })
      .then((jokes) => setJokes(jokes))
      .catch((err) => {
        console.error("HomePage::error: ", err);
      });
  }, []);
  

  const clearActionToBePerformed = () => {
    setActionToBePerformed(false);
  };

  const fullJokeContext: JokeContext = {
    addJoke,
    jokes,
    setJokes,
    actionToBePerformed,
    setActionToBePerformed,
    clearActionToBePerformed,
    
  };



  return (
    <div className="page">
     
      <main>
        <JokeMenu jokes={jokes} />
        <Outlet context={fullJokeContext} />
      </main>
      
    </div>
  );
};

const nextJokeId = (jokes: Joke[]) => {
  const ids = jokes.map((joke) => joke.id);
  return Math.max(...ids) + 1;
};

export default App;

