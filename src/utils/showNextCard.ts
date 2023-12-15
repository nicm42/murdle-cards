import updateCardShowing from './updateCardShowing';

const showNextCard = (
  showBigCard: boolean[],
  setShowBigCard: (showing: boolean[]) => void,
  setLastClicked: (clicked: string) => void,
  index: number
): void => {
  const cardToShow = index < showBigCard.length - 1 ? index + 1 : 0;
  updateCardShowing(showBigCard, setShowBigCard, index, cardToShow);
  setLastClicked('next');
};

export default showNextCard;
