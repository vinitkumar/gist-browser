import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Gist from './Gist';
import GistList from './GistList';
import fetchData from './services/api';

class App extends Component {
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
              {loading && <i className="fa fa-spin fa-refresh"></i>}
            </a>
          </h1>
          { error && <div className="alert alert-danger" role="alert">error: {error} </div>}
          <div className="row">
            <div className="col-4 sidebar">
              { !error && <GistList gists={gistList} /> }
            </div>
            <div className="col-8 main-content">
              <Route exact path="/"  render={() => <div>Welcome to the gist dashboard that shows the gists created in realtime.
                Please click on a link in sidebar to check them.<span  role="img" aria-label="left-point-emoji">👈 </span></div>} />
              { gists && (
                <Route path="/gist/:gistId" render={({match})=> (
                  <Gist key={match.params.gistId} gist={gists.find(g=> g.id === match.params.gistId )} />
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
