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

  // Open big card when pressing enter or space
  useEffect(() => {
    if (index === 0) {
      smallCardRef.current?.focus();
    }

    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (document.activeElement === smallCardRef.current) {
          setBigCardToShow();
        }
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => {
      window.removeEventListener('keydown', handleKeyboard);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Focus small card of big card closed
  useEffect(() => {
    if (showBigCard.every((card) => card === false)) {
      if (index === cardIndexClosed) {
        smallCardRef.current?.focus();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardIndexClosed]);

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
    >
      <div className="card--emoji">{suspect.emoji}</div>
      <h2 className="card--name">{suspect.name}</h2>
    </div>
  );
}

export default SmallCard;
