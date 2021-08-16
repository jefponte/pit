
import './App.css';
import Post from './components/Post';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Pagina404 from './pages/Pagina404';
import Header from './components/Header';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">

      <Router>
        <Header/>
        <Switch >
          <Route  exact path='/'>
            <Home/>
          </Route>
          <Route path='/form'>
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
