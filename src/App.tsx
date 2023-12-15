import { useState, useRef } from 'react';
import SmallCard from './components/SmallCard';
import BigCard from './components/BigCard';
import randomNumber from './utils/randomNumber';
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
  const [isFrontShowing, setIsFrontShowing] = useState<boolean>(false);

  // Show a random number of suspects from 3-6
  // We don't want this to change on re-render, hence making it a ref
  const numberOfSuspects = useRef<number>(randomNumber(3, 6));
  const suspectsToShow = suspects.slice(0, numberOfSuspects.current);

  const anyBigCardsShowing: boolean = showBigCard.some((element) => element);

  return (
    <>
      <div className={`small-cards suspects-${numberOfSuspects.current}`}>
        {suspectsToShow.map((suspect, index) => (
          <SmallCard
            key={suspect.name}
            suspect={suspect}
            showBigCard={showBigCard}
            setShowBigCard={setShowBigCard}
            cardIndexClosed={cardIndexClosed}
            isFrontShowing={isFrontShowing}
            setIsFrontShowing={setIsFrontShowing}
            index={index}
          />
        ))}
      </div>
      {anyBigCardsShowing && (
        <div className="big-cards">
          {suspectsToShow.map(
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
