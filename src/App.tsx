import { useState, useRef } from 'react';
import SmallCard from './components/SmallCard';
import BigCard from './components/BigCard';
import randomNumber from './utils/randomNumber';
import ISuspect from './utils/ISuspect';
import './App.css';
import suspects from './suspects.json';

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
  // And choose those suspects at random
  // We don't want this to change on re-render, hence making them refs
  const numberOfSuspects = useRef<number>(randomNumber(3, 6));
  const shuffledSuspects = useRef<ISuspect[]>(
    suspects.sort(() => 0.5 - Math.random())
  );
  const suspectsToShow = useRef<ISuspect[]>(
    shuffledSuspects.current.slice(0, numberOfSuspects.current)
  );

  const anyBigCardsShowing: boolean = showBigCard.some((element) => element);

  return (
    <>
      <div className={`small-cards suspects-${numberOfSuspects.current}`}>
        {suspectsToShow.current.map((suspect, index) => (
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
          {suspectsToShow.current.map(
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
