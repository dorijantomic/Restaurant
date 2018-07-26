const addReviewButton = document.getElementById('post-review-button');
addReviewButton.addEventListener('click', addAndPostReview);

function saveReviewsDataLocally(reviews) {
  debugger;
  return dbPromise.then((db) => {
    debugger;
    const tx = db.transaction('reviews', 'readwrite');
    const reviewsStore = tx.objectStore('reviews');
    reviews.forEach(review => reviewsStore.put(review))
  }).catch(() => {
    throw Error('Reviews were not added to the store');
  })
}

function getLocalReviewsData() {
  return dbPromise.then((db) => {
    debugger;
    const tx = db.transaction('reviews', 'readwrite');
    const reviewsStore = tx.objectStore('reviews');
    return reviewsStore.getAll()
  });
}

function addAndPostReview(e) {
  debugger;
  e.preventDefault();
  const data = [{
    restaurant_id: window.location.search.slice(4),
    name: document.getElementById('name').value,
    comments: document.getElementById('comments').value,
    rating: document.getElementById('rating').value
  }];
  createReviewHTML(data);

  // TODO - save event data locally
  saveReviewsDataLocally(data);

  const headers = new Headers({'Content-Type': 'application/json'});
  const body = JSON.stringify(data);
  location.href=location.href
  return fetch(reviewsUrl, {
    method: 'POST',
    headers: headers,
    body: body
  });
}







const reviewsUrl = `http://localhost:1337/reviews/`
 //opens database
 const dbPromise = idb.open("reviewsDb", 2, (upgradeDb) => {
  // checks if the object store already exists
  if (!upgradeDb.objectStoreNames.contains('reviews')) {
    const reviewsOS = upgradeDb.createObjectStore('reviews', {
      keyPath: 'id'
    })

    reviewsOS.createIndex('restaurant_id', 'restaurant_id',{unique: false})
  }
});

function fetchReviewsData(data) {
  return fetch(`${data}`)
    .then(res => res.json())
}
// filles reviews from the data we stored when the user was online
function fillReviewsOffline(reviewsFromCache) {
  debugger;
  const container = document.getElementById('reviews-container');
  const title = document.createElement('h2');
  title.innerHTML = 'Reviews';
  container.appendChild(title);
  const ul = document.getElementById('reviews-list');
  reviewsFromCache.forEach(review => {
    if (review.restaurant_id == window.location.search.slice(4)) {
      debugger;
      ul.appendChild(createReviewHTML(review));
    } 
  });
  container.appendChild(ul);


}
// stores data into the database from networka and fills reviews from network
function fillReviewsOnline() {
  fetchReviewsData(`${reviewsUrl}?restaurant_id=`+window.location.search.slice(4))
  .then((res) => {
    const reviewsFromNetwork = res;
    saveReviewsDataLocally(reviewsFromNetwork);
    const container = document.getElementById('reviews-container');
    const title = document.createElement('h2');
    title.innerHTML = 'Reviews';
    container.appendChild(title);

    const ul = document.getElementById('reviews-list');
    reviewsFromNetwork.forEach(review => {
      if (review.restaurant_id == window.location.search.slice(4)) {
        debugger;
        const reviewDate = new Date(review.createdAt);
        ul.appendChild(createReviewHTML(review));
      } else {
        return;
      }

    });
    if (!reviewsFromNetwork) {
      const noReviews = document.createElement('p');
      noReviews.innerHTML = 'No reviews yet!';
      container.appendChild(noReviews);
      return;
    } else {
      container.appendChild(ul);
    }
  })

}

// runs when the user enters the page checks if the user is online
// if the user is online fillReviewsOnline() is ran
// if the user is offline fillReviewsOffline(reviews) is ran
function fetchReviews() {
  debugger;
  getLocalReviewsData()
  .then((reviews) => {
    debugger;
    if(navigator.onLine) {
      debugger;
      return fillReviewsOnline()
    } else {
      debugger;
      return fillReviewsOffline(reviews)
    }
  })
}

fetchReviews();



