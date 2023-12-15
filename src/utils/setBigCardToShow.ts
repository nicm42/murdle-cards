const setBigCardToShow = (
  showBigCard: boolean[],
  setShowBigCard: (showing: boolean[]) => void,
  index: number
) => {
  const updatedCards = [...showBigCard];
  updatedCards[index] = true;
  setShowBigCard(updatedCards);
};

export default setBigCardToShow;
