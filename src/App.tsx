import { useState } from 'react';
import SmallCard from './components/SmallCard';
import BigCard from './components/BigCard';
import './App.css';
import suspects from './suspects.json';

export interface ISuspect {
  name: string;
  colour?: string;
  emoji?: string;
  description: string;
  details: string;
}

function App() {
  const [showBigCard, setShowBigCard] = useState<boolean>(false);

  const suspect = suspects[0];

  return (
    <>
      <div className="small-cards">
        <SmallCard suspect={suspect} setShowBigCard={setShowBigCard} />
      </div>
      {showBigCard && (
        <div className="big-cards">
          <BigCard suspect={suspect} setShowBigCard={setShowBigCard} />
        </div>
      )}
    </>
  );
}

export default App;
