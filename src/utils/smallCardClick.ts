import setBigCardToShow from './setBigCardToShow';

const smallCardClick = (
  isFrontShowing: boolean,
  setIsFrontShowing: (showing: boolean) => void,
  showBigCard: boolean[],
  setShowBigCard: (showing: boolean[]) => void,
  index: number
) => {
  if (!isFrontShowing) {
    setIsFrontShowing(true);
  } else {
    setBigCardToShow(showBigCard, setShowBigCard, index);
  }
};

export default smallCardClick;
