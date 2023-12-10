import { ISuspect } from '../App';
import './BigCard.css';

type Props = {
  suspect: ISuspect;
  showBigCard: boolean[];
  setShowBigCard: (showing: boolean[]) => void;
  index: number;
};

function BigCard({ suspect, showBigCard, setShowBigCard, index }: Props) {
  const setCardDown = () => {
    const updatedCards = [...showBigCard];
    updatedCards[index] = false;
    setShowBigCard(updatedCards);
  };

  const showNextCard = () => {
    const updatedCards = [...showBigCard];
    const cardToShow = index < showBigCard.length - 1 ? index + 1 : 0;
    updatedCards[index] = false;
    updatedCards[cardToShow] = true;
    setShowBigCard(updatedCards);
  };

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
          onClick={setCardDown}
        >
          Set card down
        </button>
        <button
          className="card--button card--button-arrow"
          aria-label="Next card"
          onClick={showNextCard}
        >
          ⮕
        </button>
      </div>
    </div>
  );
}

export default BigCard;
