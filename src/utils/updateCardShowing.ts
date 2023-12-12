const updateCardShowing = (
  showBigCard: boolean[],
  setShowBigCard: (showing: boolean[]) => void,
  cardToHide: number,
  cardToShow?: number
): void => {
  const updatedCards = [...showBigCard];
  updatedCards[cardToHide] = false;
  if (cardToShow !== undefined) {
    updatedCards[cardToShow] = true;
  }
  setShowBigCard(updatedCards);
};

export default updateCardShowing;
