import updateCardShowing from './updateCardShowing';

const setCardDown = (
  showBigCard: boolean[],
  setShowBigCard: (showing: boolean[]) => void,
  index: number,
  setCardIndexClosed: (closed: number) => void,
  setLastClicked: (clicked: string) => void
) => {
  updateCardShowing(showBigCard, setShowBigCard, index);
  setCardIndexClosed(index);
  setLastClicked('');
};

export default setCardDown;
