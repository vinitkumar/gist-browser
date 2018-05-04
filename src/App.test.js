import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from './App';
import GistList from './GistList';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const API_URL = `https://api.github.com/gists?client_id=6396a71f53863e556b11&&client_secret=098d29751f484f46307027baf674d072ae97050a`;

describe('dummy test', () => {
  it('does some work', () =>{
    expect(1).toBeDefined()
  });

  it('should work for API requests to GIST API', () => {
    expect.assertions(1);
    return fetch(API_URL)
        .then(res => res.json())
        .then(gists => {
          expect(gists).toBeDefined()
        });
  });
  it('should work for API requests to GIST API and return valid objects', () => {
    expect.assertions(1);
    return fetch(API_URL)
        .then(res => res.json())
        .then(gists => {
          expect(typeof(gists)).toBe('object')
        });
  });
});

