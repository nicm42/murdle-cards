import { ISuspect } from '../App';
import './BigCard.css';

type Props = {
  suspect: ISuspect;
  setShowBigCard: (showing: boolean) => void;
};

function BigCard({ suspect, setShowBigCard }: Props) {
  return (
    <div
      className="big-card card"
      style={{ '--card-colour': suspect.colour } as React.CSSProperties}
    >
      <div className="card--emoji">{suspect.emoji}</div>
      <h2 className="card--name">{suspect.name}</h2>
      <p className="card--description">{suspect.description}</p>
      <p className="card--details">{suspect.details}</p>
      <div className="card--buttons">
        <button
          className="card--button card--button-setdown"
          onClick={() => setShowBigCard(false)}
        >
          Set card down
        </button>
        <button
          className="card--button card--button-arrow"
          aria-label="Next card"
        >
          ⮕
        </button>
      </div>
    </div>
  );
}

export default BigCard;
