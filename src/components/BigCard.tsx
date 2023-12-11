import { ISuspect } from '../App';
import './BigCard.css';

type Props = {
  suspect: ISuspect;
  showBigCard: boolean[];
  setShowBigCard: (showing: boolean[]) => void;
  index: number;
};

function BigCard({ suspect, showBigCard, setShowBigCard, index }: Props) {
  const buttonFocus = (element: HTMLButtonElement | null) => element?.focus();

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
  };

  const showNextCard = () => {
    const cardToShow = index < showBigCard.length - 1 ? index + 1 : 0;
    updateCardShowing(index, cardToShow);
  };

  const showPreviousCard = () => {
    const cardToShow = index > 0 ? index - 1 : showBigCard.length - 1;
    updateCardShowing(index, cardToShow);
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
      <button
        className="card--button card--button-setdown"
        ref={buttonFocus}
        onClick={setCardDown}
      >
        Set card down
      </button>
      <div className="card--buttons">
        <button
          className="card--button card--button-arrow card--button-arrow-prev"
          aria-label="Previous card"
          onClick={showPreviousCard}
        >
          <span>⮕</span>
        </button>
        <button
          className="card--button card--button-arrow card--button-arrow-next"
          aria-label="Next card"
          onClick={showNextCard}
        >
          <span>⮕</span>
        </button>
      </div>
    </div>
  );
}

export default BigCard;
