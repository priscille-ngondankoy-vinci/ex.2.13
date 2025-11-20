import { useEffect, useState } from 'react'

import './App.css'
import type { Joke, NewJoke } from "../src/types";



const App = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [count, setCount] = useState(0);


 
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
      
  const interval = setInterval(() => {
    setCount((prev) => (prev + 1) % jokes.length);
  }, 5000); // 10 secondes
  if (count==10) {
    setJokes(jokes);
  }

  return () => clearInterval(interval);
      
  }, [jokes]);
   const currentJoke = jokes[count];




return (
  <div>
    {currentJoke && (
      <div>
        <h2>{currentJoke.title}</h2>
        <p>{currentJoke.content}</p>
      </div>
    )}
  </div>
);
}
const nextJokeId = (jokes: Joke[]) => {
  const ids = jokes.map((joke) => joke.id);
  return Math.max(...ids) + 1;
};

export default App;

