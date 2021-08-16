
import './App.css';
import Post from './components/Post';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Pagina404 from './pages/Pagina404';


function App() {
  return (
    <div className="App">

      <Router>
        <Switch >
          <Route  exact path='/'>
            Teswtes
          </Route>
          <Route path='/sobre'>
           <Post/>
          </Route>
          <Route>
            <Pagina404/>
          </Route>
        
        </Switch>
          
      </Router>
      
    </div>
  );
}

export default App;
