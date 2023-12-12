import { useRef, useEffect } from 'react';
import { ISuspect } from '../App';
import './BigCard.css';

type Props = {
  suspect: ISuspect;
  showBigCard: boolean[];
  setShowBigCard: (showing: boolean[]) => void;
  lastClicked: string;
  setLastClicked: (clicked: string) => void;
  index: number;
};

function BigCard({
  suspect,
  showBigCard,
  setShowBigCard,
  lastClicked,
  setLastClicked,
  index,
}: Props) {
  const previousButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const setDownRef = useRef<HTMLButtonElement>(null);

  const updateCardShowing = (cardToHide: number, cardToShow?: number) => {
    const updatedCards = [...showBigCard];
    updatedCards[cardToHide] = false;
    if (cardToShow !== undefined) {
      updatedCards[cardToShow] = true;
    }
    setShowBigCard(updatedCards);
  };

  const setCardDown = () => {
    updateCardShowing(index);
    setLastClicked('');
  };

  const showNextCard = () => {
    const cardToShow = index < showBigCard.length - 1 ? index + 1 : 0;
    updateCardShowing(index, cardToShow);
    setLastClicked('next');
  };

  const showPreviousCard = () => {
    const cardToShow = index > 0 ? index - 1 : showBigCard.length - 1;
    updateCardShowing(index, cardToShow);
    setLastClicked('previous');
  };

  // Close big card or go to previous/next card when relevant key is pressed
  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCardDown();
      }
      if (event.key === 'ArrowRight') {
        showNextCard();
      }
      if (event.key === 'ArrowLeft') {
        showPreviousCard();
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => {
      window.removeEventListener('keydown', handleKeyboard);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Focus relevant button
  useEffect(() => {
    if (lastClicked === 'next') {
      nextButtonRef.current?.focus();
    } else if (lastClicked === 'previous') {
      previousButtonRef.current?.focus();
    } else {
      setDownRef.current?.focus();
    }
  }, [lastClicked]);

  return (
    <div
      className="big-card card"
      style={{ '--card-colour': suspect.colour } as React.CSSProperties}
    >
      <div className="card--emoji">{suspect.emoji}</div>
      <h2 className="card--name">{suspect.name}</h2>
      <p className="card--description">{suspect.description}</p>
      <p className="card--details">{suspect.details}</p>
      <button
        className="card--button card--button-setdown"
        ref={setDownRef}
        onClick={setCardDown}
      >
        Set card down
      </button>
      <div className="card--buttons">
        <button
          className="card--button card--button-arrow card--button-arrow-prev"
          aria-label="Previous card"
          ref={previousButtonRef}
          onClick={showPreviousCard}
        >
          <span>⮕</span>
        </button>
        <button
          className="card--button card--button-arrow card--button-arrow-next"
          aria-label="Next card"
          ref={nextButtonRef}
          onClick={showNextCard}
        >
          <span>⮕</span>
        </button>
      </div>
    </div>
  );
}

export default BigCard;
