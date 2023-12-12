import { useState } from 'react';
import SmallCard from './components/SmallCard';
import BigCard from './components/BigCard';
import setCardDown from './utils/setCardDown';
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
  const [showBigCard, setShowBigCard] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [lastClicked, setLastClicked] = useState<string>('');
  const [cardIndexClosed, setCardIndexClosed] = useState<number>(-1);

  //const suspect = suspects[0];
  const suspects3 = suspects.slice(0, 3);

  const anyBigCardsShowing: boolean = showBigCard.some((element) => element);

  const closeBigCards = () => {
    // Find which card was previously open
    const openIndex = showBigCard.indexOf(true);
    setCardDown(
      showBigCard,
      setShowBigCard,
      openIndex,
      setCardIndexClosed,
      setLastClicked
    );
  };

  return (
    <>
      <div className="small-cards">
        {suspects3.map((suspect, index) => (
          <SmallCard
            key={suspect.name}
            suspect={suspect}
            showBigCard={showBigCard}
            setShowBigCard={setShowBigCard}
            cardIndexClosed={cardIndexClosed}
            index={index}
          />
        ))}
      </div>
      {anyBigCardsShowing && (
        <div className="big-cards" onClick={closeBigCards}>
          {suspects3.map(
            (suspect, index) =>
              showBigCard[index] && (
                <BigCard
                  key={suspect.name}
                  suspect={suspect}
                  showBigCard={showBigCard}
                  setShowBigCard={setShowBigCard}
                  lastClicked={lastClicked}
                  setLastClicked={setLastClicked}
                  setCardIndexClosed={setCardIndexClosed}
                  index={index}
                />
              )
          )}
        </div>
      )}
    </>
  );
}

export default App;
