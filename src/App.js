
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Pagina404 from './pages/Pagina404';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import FormPIT from './pages/FormPIT';

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
           <FormPIT/>
          </Route>
          <Route>
            <Pagina404/>
          </Route>
        </Switch>
        <Footer/>
      </Router>
      
    </div>
  );
}

export default App;
