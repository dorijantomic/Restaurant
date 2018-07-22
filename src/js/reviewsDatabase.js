const reviewsUrl = `http://localhost:1337/reviews/`

function fetchReviewsData(data) {
  return fetch(`${data}`)
    .then(res => res.json())
}



function fetchReviews() {
  //opens database
  const dbPromise = idb.open("reviewsDb", 2, (upgradeDb) => {
    // checks if the object store already exists
    if (!upgradeDb.objectStoreNames.contains('reviews')) {
      upgradeDb.createObjectStore('reviews', {
        keyPath: 'id'
      })
    }
  });
  dbPromise.then((db) => {
    const tx = db.transaction('reviews', 'readwrite');
    const reviewsStore = tx.objectStore('reviews');
    return reviewsStore.getAll()
  }).then((reviews) => {
    if (reviews.length) { // checks if reviews exist inside the indexedDB if it exists reviews are populated from it
      const container = document.getElementById('reviews-container');
      const title = document.createElement('h2');
      title.innerHTML = 'Reviews';
      container.appendChild(title);
      const ul = document.getElementById('reviews-list');

      reviews.forEach(review => {
        if (review.restaurant_id == window.location.search.slice(4)) {
          ul.appendChild(createReviewHTML(review));
        } 
      });
      container.appendChild(ul);


    } else {
      fetchReviewsData(reviewsUrl)
        .then((res) => {
          const reviews = res;
          dbPromise.then((db) => {
            const tx = db.transaction('reviews', 'readwrite');
            const reviewsStore = tx.objectStore('reviews');
            reviews.forEach(review => reviewsStore.put(review))
          })

          const container = document.getElementById('reviews-container');
          const title = document.createElement('h2');
          title.innerHTML = 'Reviews';
          container.appendChild(title);

          const ul = document.getElementById('reviews-list');
          reviews.forEach(review => {
            if (review.restaurant_id == window.location.search.slice(4)) {
              ul.appendChild(createReviewHTML(review));
            } else {
              return;
            }

          });
          if (!reviews) {
            const noReviews = document.createElement('p');
            noReviews.innerHTML = 'No reviews yet!';
            container.appendChild(noReviews);
            return;
          } else {
            container.appendChild(ul);
          }
        })
    }
  })
}


fetchReviews();