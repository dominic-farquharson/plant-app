import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Provider } from 'react-redux'
import Nav from './components/nav'
import HomeContainer from './containers/Home'
import NotFound from './components/NotFound/NotFound'
import LoginContainer from './containers/Login';
import ViewPlant from './containers/ViewPlant'
import CreatePlant  from './components/Plants/CreatePlant';
import RegisterContainer from './containers/Register';
import { fetchUser } from './redux/actions/user'
import makeStore from './redux/store'
import { getJWT } from './utils'
import './App.scss';

const store = makeStore()

function App(props) {
  useEffect(() => {
    const token = getJWT()
    store.dispatch(fetchUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Nav />
          <section className="container">
            <Switch>
              <Route exact path="/">
                <HomeContainer />
              </Route>
              <Route exact path="/register">
                <RegisterContainer />
              </Route>
              <Route exact path="/plants/new">
                <CreatePlant />
              </Route>
              <Route exact path="/plants/:id">
                <ViewPlant />
              </Route>
              <Route exact path="/plants/:id/edit">
                <ViewPlant isEditPlant />
              </Route>
              <Route exact path="/login">
                <LoginContainer />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </section>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
