import './App.css';
import MenuIcon from '@material-ui/icons/Menu';
import TaskArea from './components/taskArea';

function App() {
  return (
   
      <div className="App">
        <header>
          <MenuIcon className='menuIcon' style={{ fontSize: "35px" }} />
          <h1>Olá, Anderson!</h1>
        </header>
        <div>
          <TaskArea />
        </div>
        <footer></footer>
      </div>
    
  );
}

export default App;
