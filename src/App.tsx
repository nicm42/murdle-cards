import SmallCard from './components/SmallCard';
import BigCard from './components/BigCard';
import './App.css';

function App() {
  return (
    <>
      <div className="small-cards">
        <SmallCard />
      </div>
      <div className="big-cards">
        <BigCard />
      </div>
    </>
  );
}

export default App;
