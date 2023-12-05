import './BigCard.css';

function Card() {
  return (
    <div className="big-card card" data-name="brownstone">
      <div className="card--emoji">👨‍🦲</div>
      <h2 className="card--name">Brother Brownstone</h2>
      <p className="card--description">
        A monk who has dedicated his life to the church, specifically to making
        money for it.
      </p>
      <p className="card--details">
        5'4" • Left-handed • Brown eyes • Brown hair • Capricorn
      </p>
      <div className="card--buttons">
        <button className="card--button card--button-setdown">
          Set card down
        </button>
        <button
          className="card--button card--button-arrow"
          aria-label="Next card"
        >
          ⮕
        </button>
      </div>
    </div>
  );
}

export default Card;
