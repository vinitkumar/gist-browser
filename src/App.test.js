import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from './App';
import GistList from './GistList';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
jest.mock("./services/api");

const API_URL = 'https://api.github.com/gists?client_id=6396a71f53863e556b11&&client_secret=098d29751f484f46307027baf674d072ae97050a';

describe('test the gist browser', () => {
  it('does some work', () => {
    expect(1).toBeDefined();
  });

  it('does render the app', done => {
    const wrapper = shallow(<App />);
    setTimeout(() => {
      wrapper.update();
      let state = wrapper.instance().state;
      expect(state.error).toBeNull();
    });
    done();
  });

});

