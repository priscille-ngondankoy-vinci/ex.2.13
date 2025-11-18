  interface Joke {
    id: number;
    title: string;
    content: string;
  }


type NewJoke = Omit<Joke, "id">;

interface Drink {
  title: string;
  image: string;
  volume: string;
  price: string;
}

interface JokeContext {
  jokes: Joke[];
  setJokes: (jokes: Joke[]) => void;
  actionToBePerformed: boolean;
  setActionToBePerformed: (actionToBePerformed: boolean) => void;
  clearActionToBePerformed: () => void;
  addJoke: (newJoke: Joke) => void;
}

export type { NewJoke, Drink, Joke, JokeContext };
