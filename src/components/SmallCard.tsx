import { useRef, useEffect } from 'react';
import { ISuspect } from '../App';
import './SmallCard.css';

type Props = {
  suspect: ISuspect;
  showBigCard: boolean[];
  setShowBigCard: (showing: boolean[]) => void;
  cardIndexClosed: number;
  index: number;
};

function SmallCard({
  suspect,
  showBigCard,
  setShowBigCard,
  cardIndexClosed,
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
      className="card small-card"
      role="button"
      tabIndex={0}
      ref={smallCardRef}
      style={{ '--card-colour': suspect.colour } as React.CSSProperties}
      onClick={setBigCardToShow}
      onKeyDown={(e) => handleKeyboardOnCard(e)}
    >
      <div className="card--emoji">{suspect.emoji}</div>
      <h2 className="card--name">{suspect.name}</h2>
    </div>
  );
}

export default SmallCard;
