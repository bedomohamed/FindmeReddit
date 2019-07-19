import reddit from './redditApi.js';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

//form Event Listener
searchForm.addEventListener('submit', e => {
    // Get search term
    const searchTerm = searchInput.value;
    console.log(searchTerm);
    //Get sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    console.log(sortBy);

    //Get limit
    const searchLimit = document.getElementById('limit').value;

    //check input
    if (searchTerm === '') {
        showMessage('Please add a search term', 'alert-danger');
    }
    //clear input
    searchInput.value = '';

    //search reddit
    reddit.search(searchTerm, searchLimit, sortBy).then(results => {
        console.log(results);
        let output = '<div class="card-columns">';
        //Loop through posts
        results.forEach(post => {
            //Check for image
            const image = post.preview ? post.preview.images[0].source.url:'https://torrentfreak.com/images/redditp.png';
            output += `
        <div class="card">
      <img src="${image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${post.title}</h5>
        <p class="card-text">${truncateText(post.selftext, 100)}</p>
        <a href="${post.url}"target="_blank" class="btn btn-primary">Read more</a>
        <hr>
            <span class="badge badge-secondary">subreddit: ${post.subreddit}</span>
            <span class="badge badge-dark">score: ${post.score}</span>

      </div>
    </div>`;
        });
        output += '</div>';
        document.getElementById('results').innerHTML = output;
    });

    e.preventDefault();
});


//Show Message
function showMessage(message, className) {
    //create div
    const div = document.createElement('div');
    //Add classes
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const searchContainer = document.getElementById('search-container');
    //Get Search
    const search = document.getElementById('search');
    //insert message
    searchContainer.insertBefore(div, search);

    //Timeout alert
    setTimeOut(() => document.querySelector('alert').remove(), 3000);
}


//Truncate Text
function truncateText(text, limit) {
    const shortened = text.indexOf(' ', limit);
    if (shortened == -1) return text;
    return text.substring(0, shortened);
}
