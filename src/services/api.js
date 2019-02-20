const fetchData = async function() {
  return await fetch('https://api.github.com/gists?client_id=6396a71f53863e556b11&&client_secret=098d29751f484f46307027baf674d072ae97050a`')
    .then(res => res.json())
    .then(gists => {
      console.log('data coming from fetchData');
      return gists
    }).catch((error) => {
      console.log(error);
    });
};

export default fetchData;
