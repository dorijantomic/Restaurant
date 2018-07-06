
// Opening a database


const dbPromise = idb.open("rr-db",1 ,(upgradeDb) => {
  // checks if the object store already exists
  if(!upgradeDb.objectStoreNames.contains('restaurants')){
  const idOS = upgradeDb.createObjectStore('restaurants', {keyPath: 'id'})
  idOS.createIndex('id', 'id' ,{unique: true}); 
  }
});

const altTags = {
  1:"bustling chinese restaurant",
  2:"rounded pizza",
  3:"shiny empty dining area",
  4:"entrance of a restaurant with neon signs" ,
  5:"crowded restaurant with an open view of the kitchen",
  6:"crowded familly barbacue restaurant",
  7:"entrance to a burger place",
  8:"entrance to the dutch with a blossomed tree next to it",
  9:"people eating ramen noodles" ,
  10:"empty restaurant with white bar stools"
}




/**
 * Common database helper functions.
 */
class DBHelper {
  

  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DATABASE_URL() {
    const port = 1337 // Change this to your servers port
    return `http://localhost:${port}`;
  }

  /**
   * Fetch all restaurants.
   */
  /*
  static fetchRestaurants(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', DBHelper.DATABASE_URL);
    xhr.onload = () => {
      if (xhr.status === 200) { // Got a success response from server!
        const json = JSON.parse(xhr.responseText);
        const restaurants = json.restaurants;
        callback(null, restaurants);
      } else { // Oops!. Got an error from server.
        const error = (`Request failed. Returned status of ${xhr.status}`);
        callback(error, null);
      }
    };
    xhr.send();
  }

  */


  // static fetchRestaurants(callback) {
  //   debugger;
  //   dbPromise.then((db) => {
  //     debugger;
  //     const tx = db.transaction('restaurants', 'readwrite');
  //     const restaurantsStore = tx.objectStore('restaurants');
  //     return restaurantsStore.getAll()
  //   }).then(() => {
  //     debugger;
  //     return fetch(`${DBHelper.DATABASE_URL}/restaurants`)
  //     .then((res) => {
  //       debugger;
  //       return res.json();
  //     }).then((res) => {
  //       debugger;
  //       const restaurants = res;
  //       restaurants.forEach((restaurant, index) => {
  //         debugger;
  //         // for each restaurant add an alt atribute from the altTags objest
  //         if(restaurant.id){
  //           debugger;
  //           restaurant.alt = altTags[restaurant.id]
  //         }
  //       })
  //       callback(null,restaurants)
  //     }).catch((error) => {
  //       callback(error,null)
  //     })
  //   })
   
  // }
  // Opening a database


    
 
 

    static fetchRestaurants(callback) {
      debugger;
      dbPromise.then((db) => {
        const tx = db.transaction('restaurants', 'readwrite');
        const restaurantsStore = tx.objectStore('restaurants');
        return restaurantsStore.getAll()
      }).then((restaurants) => {
        if(restaurants.length) {
          callback(null,restaurants) 
        } else {
          fetch(`${DBHelper.DATABASE_URL}/restaurants`)
          .then((res) => {
            return res.json();
          }).then((res) => {
            debugger;
            const restaurants = res;
            restaurants.forEach((restaurant,index) => {
              if(restaurant.id) {
                restaurant.alt = altTags[restaurant.id]
              }
            })
            dbPromise.then((db) => {
              const tx = db.transaction('restaurants', 'readwrite');
              const restaurantsStore = tx.objectStore('restaurants');
              restaurants.forEach(restaurant=>restaurantsStore.put(restaurant))
            })
            callback(null,restaurants);
          })
        }
      })
    }
  
  


  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById(id, callback) {
    // fetch all restaurants with proper error handling.
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        const restaurant = restaurants.find(r => r.id == id);
        if (restaurant) { // Got the restaurant
          callback(null, restaurant);
        } else { // Restaurant does not exist in the database
          callback('Restaurant does not exist', null);
        }
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  static fetchRestaurantByCuisine(cuisine, callback) {
    // Fetch all restaurants  with proper error handling
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given cuisine type
        const results = restaurants.filter(r => r.cuisine_type == cuisine);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  static fetchRestaurantByNeighborhood(neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given neighborhood
        const results = restaurants.filter(r => r.neighborhood == neighborhood);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        let results = restaurants
        if (cuisine != 'all') { // filter by cuisine
          results = results.filter(r => r.cuisine_type == cuisine);
        }
        if (neighborhood != 'all') { // filter by neighborhood
          results = results.filter(r => r.neighborhood == neighborhood);
        }
        callback(null, results);
      }
    });
  }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchNeighborhoods(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all neighborhoods from all restaurants
        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)
        // Remove duplicates from neighborhoods
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)
        callback(null, uniqueNeighborhoods);
      }
    });
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchCuisines(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all cuisines from all restaurants
        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type)
        // Remove duplicates from cuisines
        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i)
        callback(null, uniqueCuisines);
      }
    });
  }

  /**
   * Restaurant page URL.
   */
  static urlForRestaurant(restaurant) {
    return (`./restaurant.html?id=${restaurant.id}`);
  }

  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant) {
    debugger;
    return (`img/${restaurant.id}.webp`);
  }


  static smallImageUrlForRestaurant(restaurant) {
    return(`
     img/${restaurant.id}_w_300.webp 300w,
     img/${restaurant.id}_w_433.webp 433w,  
     img/${restaurant.id}_w_653.webp 653w
    `)
  }
  /**
   * Map marker for a restaurant.
   */
  static mapMarkerForRestaurant(restaurant, map) {
    const marker = new google.maps.Marker({
      position: restaurant.latlng,
      title: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant),
      map: map,
      animation: google.maps.Animation.DROP}
    );
    return marker;
  }

}
