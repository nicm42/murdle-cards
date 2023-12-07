import { ISuspect } from '../App';
import './SmallCard.css';

type Props = {
  suspect: ISuspect;
  setShowBigCard: (showing: boolean) => void;
};

function SmallCard({ suspect, setShowBigCard }: Props) {
  return (
    <div
      className="card small-card"
      role="button"
      tabIndex={0}
      style={{ '--card-colour': suspect.colour } as React.CSSProperties}
      onClick={() => setShowBigCard(true)}
    >
      <div className="card--emoji">{suspect.emoji}</div>
      <h2 className="card--name">{suspect.name}</h2>
    </div>
  );
}

export default SmallCard;
