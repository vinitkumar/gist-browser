import React, { Component } from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router} from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Gist from './Gist';
import GistList from './GistList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gistList: null,
    };
  }

  componentDidMount() {
      fetch('https://api.github.com/gists?client_id=6396a71f53863e556b11&&client_secret=098d29751f484f46307027baf674d072ae97050a`')
        .then(res => res.json())
        .then(gists => {
          this.setState({gistList: gists})
        });
  }

  render() {
    const gists = this.state.gistList;
    return (
      <Router>
        <div className="container-fluid">
          <h1> Realtime Gist Monitor <img src={logo} className="App-logo" alt="logo" height="50" width="50"/></h1>
          <div className="row">
            <div className="col-4 sidebar">
              <GistList gists={this.state.gistList} />
            </div>
            <div className="col-8 main-content">
              <Route exact path="/"  render={() => <div>Welcome</div>} />
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
