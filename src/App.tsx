import { useState } from 'react';
import SmallCard from './components/SmallCard';
import BigCard from './components/BigCard';
import './App.css';

function App() {
  const [showBigCard, setShowBigCard] = useState<boolean>(false);

  return (
    <>
      <div className="small-cards">
        <SmallCard setShowBigCard={setShowBigCard} />
      </div>
      {showBigCard && (
        <div className="big-cards">
          <BigCard setShowBigCard={setShowBigCard} />
        </div>
      )}
    </>
  );
}

export default App;
