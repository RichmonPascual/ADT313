import logo from './logo.svg';
import './App.css';
import Firstname from './Component/Firstname';
import Introduction from './Component/Introduction';
import Lastname from './Component/Lastname';
import Section from './Component/Section';

function App() {
  return (
    <div className="App">
      <Firstname/>
      <Lastname/>
      <Section/>
      <Introduction/>
    </div>
  );
}

export default App;
