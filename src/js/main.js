
let restaurants,
  neighborhoods,
  cuisines
var map
var markers = []

// Opening a database
const dbPromise = idb.open("rr-db", 1, (upgradeDb) => {
  // checks if the object store already exists
  if (!upgradeDb.objectStoreNames.contains('restaurants')) {
    const idOS = upgradeDb.createObjectStore('restaurants', {
      keyPath: 'id'
    })
    idOS.createIndex('id', 'id', {
      unique: true
    });
  }
});

/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  fetchNeighborhoods();
  fetchCuisines();
});

/**
 * Fetch all neighborhoods and set their HTML.
 */

const fetchNeighborhoods = () => {
  DBHelper.fetchNeighborhoods((error, neighborhoods) => {
    if (error) { // Got an error
      console.error(error);
    } else {
      self.neighborhoods = neighborhoods;
      fillNeighborhoodsHTML();
    }
  });
}

/**
 * Set neighborhoods HTML.
 */
const fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
  const select = document.getElementById('neighborhoods-select');
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    select.append(option);
  });
}
/**
 * Fetch all cuisines and set their HTML.
 */
const fetchCuisines = () => {
  DBHelper.fetchCuisines((error, cuisines) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.cuisines = cuisines;
      fillCuisinesHTML();
    }
  });
}

/**
 * Set cuisines HTML.
 */
const fillCuisinesHTML = (cuisines = self.cuisines) => {
  const select = document.getElementById('cuisines-select');

  cuisines.forEach(cuisine => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    select.append(option);
  });
}

/**
 * Initialize Google map, called from HTML.
 */
const initMap = () => {
  let loc = {
    lat: 40.722216,
    lng: -73.987501
  };
  self.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: loc,
    scrollwheel: false
  });
  updateRestaurants();
}

document.getElementById('mapButton').addEventListener('click', () => {
  document.getElementById('map').className = 'open';
});
/**
 * Update page and map for current restaurants.
 */
const updateRestaurants = () => {
  const cSelect = document.getElementById('cuisines-select');
  const nSelect = document.getElementById('neighborhoods-select');

  const cIndex = cSelect.selectedIndex;
  const nIndex = nSelect.selectedIndex;

  const cuisine = cSelect[cIndex].value;
  const neighborhood = nSelect[nIndex].value;

  DBHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      resetRestaurants(restaurants);
      fillRestaurantsHTML();
    }
  })
}

/**
 * Clear current restaurants, their HTML and remove their map markers.
 */
const resetRestaurants = (restaurants) => {
  // Remove all restaurants
  self.restaurants = [];
  const ul = document.getElementById('restaurants-list');
  ul.innerHTML = '';

  // Remove all map markers
  self.markers.forEach(m => m.setMap(null));
  self.markers = [];
  self.restaurants = restaurants;
}

/**
 * Create all restaurants HTML and add them to the webpage.
 */
const fillRestaurantsHTML = (restaurants = self.restaurants) => {
  const ul = document.getElementById('restaurants-list');
  restaurants.forEach(restaurant => {
    ul.append(createRestaurantHTML(restaurant));
  });
  addMarkersToMap();
}

/**
 * Create restaurant HTML.
 */
const createRestaurantHTML = (restaurant) => {
  const li = document.createElement('li');
  const favoriteButton = document.createElement('button');
  favoriteButton.className = 'fav-button';
  favoriteButton.value = restaurant.is_favorite;
  if(favoriteButton.value === 'false' || favoriteButton.value === false) {
    favoriteButton.innerHTML = `<img src = img/gray-heart.png alt = 'favorite button image'>`;
    favoriteButton.setAttribute('Aria-label', 'Set as favorite')
    
  } else {
    favoriteButton.innerHTML = `<img src = img/orange-heart.png>`;
    favoriteButton.setAttribute('Aria-label', 'Remove from favorites')
  }
   
  favoriteButton.onclick = function() {
    if(navigator.onLine) {
      if(favoriteButton.value === 'false'  || favoriteButton.value === false) {
        favoriteButton.value = 'true';
        favoriteButton.setAttribute('Aria-label', 'Remove from favorites')
        fetch(`http://localhost:1337/restaurants/${restaurant.id}/?is_favorite=true`, {method: 'PUT'})
        .then((res)=> {return res.json})
        .then(() => {
          
          
          location.href=location.href})
        
      } else {
        favoriteButton.value = 'false';
        favoriteButton.setAttribute('Aria-label', 'Set as favorite')
        fetch(`http://localhost:1337/restaurants/${restaurant.id}/?is_favorite=false`, {method: 'PUT'})
        .then((res)=> {return res.json})
        .then(() => {location.href=location.href})
      }
    } else {
     
      if(favoriteButton.value === 'false' || favoriteButton.value === false) {
        favoriteButton.value = 'true';
        favoriteButton.setAttribute('Aria-label', 'Remove from favorites')
        fetch(`http://localhost:1337/restaurants/${restaurant.id}/?is_favorite=true`, {method: 'PUT'})
        .then((res)=> {
          dbPromise.then((db) => {
            const tx = db.transaction('restaurants', 'readwrite')
            const restaurantsStore = tx.objectStore('restaurants');
            restaurant.is_favorite = 'true';
            restaurantsStore.put(restaurant);
          })
          return res.json})
        .then(() => {location.href=location.href})
        
      } else {
        favoriteButton.value = 'false';
        favoriteButton.setAttribute('Aria-label', 'Set as favorite')
        fetch(`http://localhost:1337/restaurants/${restaurant.id}/?is_favorite=false`, {method: 'PUT'})
          .then((res)=> {
            dbPromise.then((db) => {
              const tx = db.transaction('restaurants', 'readwrite')
              const restaurantsStore = tx.objectStore('restaurants');
              restaurant.is_favorite = 'false';
              restaurantsStore.put(restaurant);
            })
            return res.json})
          .then(() => {location.href=location.href})
  
      }
  
    
    }
    }
    
  li.appendChild(favoriteButton)
  const placeHolder = document.createElement('a');
  placeHolder.href =  `img/${restaurant.id}.webp`;
  placeHolder.dataset.srcset = DBHelper.smallImageUrlForRestaurant(restaurant);
  placeHolder.className = `progressive replace`;
  placeHolder.tabIndex = '-1';

  const image = document.createElement('img');
  image.src = `img/preview/${restaurant.id}.tiny.webp`
  image.className = `preview restaurant-img`;
  image.alt = `${restaurant.alt}`;
  
  li.append(placeHolder);
  placeHolder.append(image);

  const name = document.createElement('h1');
  name.innerHTML = restaurant.name;
  li.append(name);

  const neighborhood = document.createElement('p');
  neighborhood.innerHTML = restaurant.neighborhood;
  li.append(neighborhood);

  const address = document.createElement('p');
  address.innerHTML = restaurant.address;
  li.append(address);

  const more = document.createElement('a'); 
  more.innerHTML = 'View Details';
  more.setAttribute('aria-label',`View Details about ${restaurant.name}`);
  more.href = DBHelper.urlForRestaurant(restaurant);  
  li.append(more)
  

  return li

}


/**
 * Add markers for current restaurants to the map.
 */
const addMarkersToMap = (restaurants = self.restaurants) => {
  restaurants.forEach(restaurant => {
    // Add marker to the map
    const marker = DBHelper.mapMarkerForRestaurant(restaurant, self.map);
    google.maps.event.addListener(marker, 'click', () => {
      window.location.href = marker.url
    });
    self.markers.push(marker);
  });
}



