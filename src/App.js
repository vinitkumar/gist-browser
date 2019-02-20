import 'bootstrap/dist/css/bootstrap.min.css';
import React, {lazy, Suspense, useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import fetchData from './services/api';
import Loader from './Loader';
const Gist = lazy(() => import('./Gist'));
const GistList = lazy(() => import('./GistList'));

function App() {
  const [gistList, setgistList] = useState([]);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(true);

  function handleRefresh(event) {
    setloading(true);
    const data = fetchData();
    data.then(gists => {
      setgistList(gists);
      setloading(false);
    });
  }

  useEffect(() => {
    const data = fetchData();
    data.then(gists => {
      setgistList(gists);
      setloading(false);
    });
    return () => {
      // do cleanup here
    };
    // this {} is required to simulate something like ComponentDidMount and ComponentDidUnmount
    // in hooks. Else, there will be hits to the API on infinite loop.
  }, {});

  return (
    <Router>
      <header className="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar custom-nav">
          <Link to="/">Gist Dashboard</Link>
          <a
            className="refresh pull-right"
            title="Refresh"
            onClick={e => handleRefresh(e)}>
            {!loading && <i className="fa fa-refresh" />}
            {loading && <Loader />}
          </a>
        </header>
      <div className="container-fluid gist-scope-container">
        <h1>Welcome to the Realtime Gist dashboard</h1>

        {error && (
          <div className="alert alert-danger" role="alert">
            error: {error}{' '}
          </div>
        )}
        <div className="row">
          <div className="col-4 sidebar">
            {!error && (
              <Suspense fallback={<Loader />}>
                <GistList gists={gistList} />
              </Suspense>
            )}
          </div>
          <div className="col-8 main-content">
            <Route
              exact
              path="/"
              render={() => (
                <div>
                  <span role="img" aria-label="left-point-emoji">
                    👈{' '}
                  </span>
                  Please click on a link in sidebar to load the gist.
                </div>
              )}
            />
            {gistList && (
              <Route
                path="/gist/:gistId"
                render={({match}) => (
                  <Suspense fallback={<Loader />}>
                    <Gist
                      key={match.params.gistId}
                      gist={gistList.find(g => g.id === match.params.gistId)}
                    />
                  </Suspense>
                )}
              />
            )}
          </div>
        </div>
      </div>
    </Router>
  );
}
export default App;
