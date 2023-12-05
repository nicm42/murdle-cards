import './SmallCard.css';

function Card() {
  return (
    <div
      className="card small-card"
      data-name="brownstone"
      role="button"
      tabIndex={0}
    >
      <div className="card--emoji">👨‍🦲</div>
      <h2 className="card--name">Brother Brownstone</h2>
    </div>
  );
}

export default Card;
