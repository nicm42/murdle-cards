import './SmallCard.css';

type Props = {
  setShowBigCard: (showing: boolean) => void;
};

function SmallCard({ setShowBigCard }: Props) {
  return (
    <div
      className="card small-card"
      data-name="brownstone"
      role="button"
      tabIndex={0}
      onClick={() => setShowBigCard(true)}
    >
      <div className="card--emoji">👨‍🦲</div>
      <h2 className="card--name">Brother Brownstone</h2>
    </div>
  );
}

export default SmallCard;
