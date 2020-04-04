'use strict';

const BASE_URL = 'https://api.github.com';

function generateListItem(item) {
  return `
  <li>
    <h2>${item.name}</h2>
    <p>${item.html_url}</p>
  </li>`
};

function generateListItemString(list) {
  let string = list.map(item => generateListItem(item));
  return string.join(' ');
};

function getRepos(username) {
  return fetch(`${BASE_URL}/users/${username}/repos`)
    .then(res => res.json())
    .then(data => data);
};

function handleSearchForm() {
  $('.search-github').submit(function(event) {
    event.preventDefault();
    let value = $('#search-input').val();
    getRepos(value)
      .then(data => $('.search-results').html(generateListItemString(data)));
  });
};

$(handleSearchForm);