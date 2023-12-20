import { useState, useRef, useMemo } from 'react';
import SmallCard from './components/SmallCard';
import BigCard from './components/BigCard';
import randomNumber from './utils/randomNumber';
import ISuspect from './utils/ISuspect';
import './App.css';
import suspects from './suspects.json';

function App() {
  const [lastClicked, setLastClicked] = useState<string>('');
  const [cardIndexClosed, setCardIndexClosed] = useState<number>(-1);
  const [isFrontShowing, setIsFrontShowing] = useState<boolean>(false);

  // Show a random number of suspects from 3-6
  // And choose those suspects at random
  const numberOfSuspects: number = useMemo(() => {
    return randomNumber(3, 6);
  }, []);
  // For testing
  /* const numberOfSuspects: number = useMemo(() => {
    return randomNumber(3, 3);
  }, []);
  */ const shuffledSuspects: ISuspect[] = useMemo(() => {
    return suspects.sort(() => 0.5 - Math.random());
  }, []);
  // For testing
  /* const shuffledSuspects: ISuspect[] = useMemo(() => {
    return suspects;
  }, []);
 */ const suspectsToShow = useRef<ISuspect[]>(
    shuffledSuspects.slice(0, numberOfSuspects)
  );

  // Now we know how many there are we can set the initial state of showBigCard
  const showBigCardInitialState: boolean[] = useMemo(() => {
    return new Array(numberOfSuspects).fill(false);
  }, [numberOfSuspects]);
  const [showBigCard, setShowBigCard] = useState<boolean[]>(
    showBigCardInitialState
  );

  const anyBigCardsShowing: boolean = showBigCard.some((element) => element);

  return (
    <>
      <div className={`small-cards suspects-${numberOfSuspects}`}>
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
