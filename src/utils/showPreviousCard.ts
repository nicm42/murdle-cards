import updateCardShowing from './updateCardShowing';

const showPreviousCard = (
  showBigCard: boolean[],
  setShowBigCard: (showing: boolean[]) => void,
  setLastClicked: (clicked: string) => void,
  index: number
) => {
  const cardToShow = index > 0 ? index - 1 : showBigCard.length - 1;
  updateCardShowing(showBigCard, setShowBigCard, index, cardToShow);
  setLastClicked('previous');
};

export default showPreviousCard;
