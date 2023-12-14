import { useRef, useEffect } from 'react';
import { ISuspect } from '../App';
import './SmallCard.css';

type Props = {
  suspect: ISuspect;
  showBigCard: boolean[];
  setShowBigCard: (showing: boolean[]) => void;
  cardIndexClosed: number;
  isFrontShowing: boolean;
  setIsFrontShowing: (showing: boolean) => void;
  index: number;
};

function SmallCard({
  suspect,
  showBigCard,
  setShowBigCard,
  cardIndexClosed,
  isFrontShowing,
  setIsFrontShowing,
  index,
}: Props) {
  const smallCardRef = useRef<HTMLDivElement>(null);

  // Focus first card
  useEffect(() => {
    if (index === 0) {
      smallCardRef.current?.focus();
    }
  }, [index]);

  // Focus small card of big card closed
  useEffect(() => {
    if (showBigCard.every((card) => card === false)) {
      if (index === cardIndexClosed) {
        smallCardRef.current?.focus();
      }
    }
  }, [cardIndexClosed, showBigCard, index]);

  const handleKeyboardOnCard = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!isFrontShowing) {
        setIsFrontShowing(true);
      } else {
        setBigCardToShow();
      }
    }
  };

  const handleCardClick = () => {
    if (!isFrontShowing) {
      setIsFrontShowing(true);
    } else {
      setBigCardToShow();
    }
  };

  const setBigCardToShow = () => {
    const updatedCards = [...showBigCard];
    updatedCards[index] = true;
    setShowBigCard(updatedCards);
  };

  return (
    <div
      className={
        isFrontShowing ? 'card small-card show-front' : 'card small-card'
      }
      role="button"
      tabIndex={0}
      ref={smallCardRef}
      style={{ '--card-colour': suspect.colour } as React.CSSProperties}
      onClick={handleCardClick}
      onKeyDown={(e) => handleKeyboardOnCard(e)}
    >
      <div className="small-card-inner">
        <div className="small-card-back">
          <div className="card-back--emoji">🔎</div>
        </div>
        <div className="small-card-front">
          <div className="card--emoji">{suspect.emoji}</div>
          <h2 className="card--name">{suspect.name}</h2>
        </div>
      </div>
    </div>
  );
}

export default SmallCard;
