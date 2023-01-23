import 'bootstrap/dist/css/bootstrap.min.css';
import React, {lazy, Suspense, useState, useEffect, useTransition} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import fetchData from './services/api';
import Loader from './Loader';
const Gist = lazy(() => import('./Gist'));
const GistList = lazy(() => import('./GistList'));

function App() {
  const [gistList, setgistList] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [error, seterror] = useState(null);
  // const [loading, setloading] = useState(true);

  function handleRefresh() {
    const data = fetchData();
    data.then(gists => {
      setgistList(gists);
    });
  }

  useEffect(() => {
    const data = fetchData();
    console.log(seterror);
    data.then(gists => {
      startTransition(() => {
        setgistList(gists);
      });

    });
    return () => {
      // do cleanup here
    };
    // this {} is required to simulate something like ComponentDidMount and ComponentDidUnmount
    // in hooks. Else, there will be hits to the API on infinite loop.
  }, []);

  return (
      <Router>
      <div className="container-fluid">
        <h1>
          <a href="/">Gist Dashboard</a>
          <a
            className="refresh"
            title="Refresh"
            onClick={e => handleRefresh(e)}>
            {!isPending && <i className="fa fa-refresh" />}
            {isPending && <Loader />}
          </a>
        </h1>
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

            <Routes>
            <Route
              path="/"
              element={<Base/>}
            />
            {gistList && (
              <Route
                path="/gist/:gistId"
                element={
                  <Gist />
                }
              />
            )}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

function Base() {
  return (
      <>

    <div>
      Welcome to the Live Gist Dashboard
      <hr/>
      Click on a gist link on the left to open a new gist
      <span role="img" aria-label="left-point-emoji">
                  👈{' '}
                </span>
    </div>
      </>
      );

}

export default App;
