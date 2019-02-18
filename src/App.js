import 'bootstrap/dist/css/bootstrap.min.css';
import React, { lazy, Suspense, PureComponent, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import fetchData from './services/api';
import Loader from './Loader';
const Gist = lazy(() => import('./Gist'));
const GistList = lazy(() => import('./GistList'));

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      gistList: [],
      error: null,
      loading: true,
    };

    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
      const data = fetchData();
      data.then((gists) => this.setState({gistList: gists, loading: false}));
  }

  refresh(event) {
    this.setState({loading: true});
    const data = fetchData();
    data.then((gists) => this.setState({gistList: gists, loading: false}));

  }

  render() {
    const { gistList, error, loading } = this.state;
    const gists = gistList;
    return (
      <Router>
        <div className="container-fluid">
          <h1><Link to="/">Gist Dashboard</Link>
            <a className="refresh" title="Refresh" onClick={this.refresh.bind(this)}>
              {!loading && <i className="fa fa-refresh"></i> }
              {loading && <Loader />}
            </a>
          </h1>
          { error && <div className="alert alert-danger" role="alert">error: {error} </div>}
          <div className="row">
            <div className="col-4 sidebar">
              { !error &&
                <Suspense fallback={<Loader />}>
                  <GistList gists={gistList} />
                </Suspense>
              }
            </div>
            <div className="col-8 main-content">
              <Route exact path="/"  render={() => <div>Welcome to the gist dashboard that shows the gists created in realtime.
                Please click on a link in sidebar to check them.<span  role="img" aria-label="left-point-emoji">👈 </span></div>} />
              { gists && (
                <Route path="/gist/:gistId" render={({match})=> (
                  <Suspense fallback={<Loader />}>
                    <Gist key={match.params.gistId} gist={gists.find(g=> g.id === match.params.gistId )} />
                  </Suspense>
                )} />
              )}
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
