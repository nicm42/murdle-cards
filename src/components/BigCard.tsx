import { useRef, useEffect } from 'react';
import ISuspect from '../utils/ISuspect';
import setCardDown from '../utils/setCardDown';
import showNextCard from '../utils/showNextCard';
import showPreviousCard from '../utils/showPreviousCard';
import './BigCard.css';

type Props = {
  suspect: ISuspect;
  showBigCard: boolean[];
  setShowBigCard: (showing: boolean[]) => void;
  lastClicked: string;
  setLastClicked: (clicked: string) => void;
  setCardIndexClosed: (closed: number) => void;
  index: number;
};

function BigCard({
  suspect,
  showBigCard,
  setShowBigCard,
  lastClicked,
  setLastClicked,
  setCardIndexClosed,
  index,
}: Props) {
  const bigCardRef = useRef<HTMLDivElement>(null);
  const previousButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const setDownRef = useRef<HTMLButtonElement>(null);

  const trapFocus = (event: KeyboardEvent) => {
    // Find all the buttons
    const focusableElements =
      bigCardRef.current?.querySelectorAll<HTMLElement>('button');
    if (focusableElements) {
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // if the lastElement has focus and shift key wasn't pressed
      // then focus the firstElement
      if (document.activeElement === lastElement && !event.shiftKey) {
        event.preventDefault();
        firstElement.focus();
      }

      // if the firstElement has focus and shift key was pressed
      // then focus the lastElement
      if (document.activeElement === firstElement && event.shiftKey) {
        event.preventDefault();
        lastElement.focus();
      }
    }
  };

  // Close big card when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!bigCardRef.current?.contains(event.target as Node)) {
        setCardDown(
          showBigCard,
          setShowBigCard,
          index,
          setCardIndexClosed,
          setLastClicked
        );
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [index, setCardIndexClosed, setLastClicked, showBigCard, setShowBigCard]);

  // Close big card or go to previous/next card when relevant key is pressed
  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCardDown(
          showBigCard,
          setShowBigCard,
          index,
          setCardIndexClosed,
          setLastClicked
        );
      }
      if (event.key === 'ArrowRight') {
        showNextCard(showBigCard, setShowBigCard, setLastClicked, index);
      }
      if (event.key === 'ArrowLeft') {
        showPreviousCard(showBigCard, setShowBigCard, setLastClicked, index);
      }
      if (event.key === 'Tab') {
        trapFocus(event);
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => {
      window.removeEventListener('keydown', handleKeyboard);
    };
  }, [index, setCardIndexClosed, setLastClicked, showBigCard, setShowBigCard]);

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
      ref={bigCardRef}
      style={{ '--card-colour': suspect.colour } as React.CSSProperties}
    >
      <div className="card--emoji">{suspect.emoji}</div>
      <h2 className="card--name">{suspect.name}</h2>
      <p className="card--description">{suspect.description}</p>
      <p className="card--details">{suspect.details}</p>
      <div className="card--buttons">
        <button
          className="card--button card--button-arrow card--button-arrow-prev"
          aria-label="Previous card"
          ref={previousButtonRef}
          onClick={() =>
            showPreviousCard(showBigCard, setShowBigCard, setLastClicked, index)
          }
        >
          <span>⮕</span>
        </button>
        <button
          className="card--button card--button-setdown"
          ref={setDownRef}
          onClick={() =>
            setCardDown(
              showBigCard,
              setShowBigCard,
              index,
              setCardIndexClosed,
              setLastClicked
            )
          }
        >
          Set card down
        </button>
        <button
          className="card--button card--button-arrow card--button-arrow-next"
          aria-label="Next card"
          ref={nextButtonRef}
          onClick={() =>
            showNextCard(showBigCard, setShowBigCard, setLastClicked, index)
          }
        >
          <span>⮕</span>
        </button>
      </div>
    </div>
  );
}

export default BigCard;
