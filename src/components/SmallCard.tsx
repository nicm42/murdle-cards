import { ISuspect } from '../App';
import './SmallCard.css';

type Props = {
  suspect: ISuspect;
  showBigCard: boolean[];
  setShowBigCard: (showing: boolean[]) => void;
  index: number;
};

function SmallCard({ suspect, showBigCard, setShowBigCard, index }: Props) {
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
      style={{ '--card-colour': suspect.colour } as React.CSSProperties}
      onClick={setBigCardToShow}
    >
      <div className="card--emoji">{suspect.emoji}</div>
      <h2 className="card--name">{suspect.name}</h2>
    </div>
  );
}

export default SmallCard;
