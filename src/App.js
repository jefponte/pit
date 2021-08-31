
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import PagePIT from './pages/PagePIT';
import Page404 from './pages/Page404';
import Footer from './components/Footer';




function App() {
  return (
    <div className="App">

      <Router>
        <Header/>
        <Switch > 
          <Route exact path='/pit'>
           <PagePIT/>
          </Route>
          <Route>
            <Page404/>
          </Route>
        </Switch>
        <Footer/>
      </Router>
      
    </div>
  );
}

export default App;
