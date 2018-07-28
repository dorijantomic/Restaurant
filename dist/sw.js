importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');



  workbox.routing.registerRoute(
    new RegExp('restaurant.html(.*)'),
    workbox.strategies.networkFirst({
      cacheName: 'cache-restaurant-details',
      cacheableResponse: {statuses: [0, 200]}
    })
  );

workbox.routing.registerRoute(
  new RegExp('index.html(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'cache-index.html',
    cacheableResponse: {statuses: [0, 200]}
  })
);
workbox.precaching.precacheAndRoute([
  {
    "url": "css/progressive-image.min.css",
    "revision": "aea86e88d672e8121d85c478e458c044"
  },
  {
    "url": "css/styles.css",
    "revision": "625c3e4eb327448dd78ef9e7438e9ba1"
  },
  {
    "url": "img/1_w_300.webp",
    "revision": "d44e3ebb1ec81c04d5dfa2ed772243e6"
  },
  {
    "url": "img/1_w_433.webp",
    "revision": "156b8994e0615775ac8d1f503029e8c1"
  },
  {
    "url": "img/1_w_653.webp",
    "revision": "68edc1bab29678ebdb42e17892744b8f"
  },
  {
    "url": "img/1_w_800.webp",
    "revision": "0e4612137af3125af45442e7a4406613"
  },
  {
    "url": "img/1.webp",
    "revision": "ce320a17d67a96af2784072de0589a45"
  },
  {
    "url": "img/10_w_300.webp",
    "revision": "2c1f13993ae29598b7022c7bd3471851"
  },
  {
    "url": "img/10_w_433.webp",
    "revision": "714adf8d72828c97aa0bd8bc929b7bb9"
  },
  {
    "url": "img/10_w_653.webp",
    "revision": "67ed5f33dc95de56fc413fcd373eb6ec"
  },
  {
    "url": "img/10_w_800.webp",
    "revision": "c04afbe519be5a311e88ccca684c7d8b"
  },
  {
    "url": "img/10.webp",
    "revision": "92f021f9aa478e3e60ad7d558123ea04"
  },
  {
    "url": "img/2_w_300.webp",
    "revision": "8981d94bd2ef72ed32221d243031b5b6"
  },
  {
    "url": "img/2_w_433.webp",
    "revision": "a444cf1135b219fd3003b6e8259975eb"
  },
  {
    "url": "img/2_w_653.webp",
    "revision": "bba356ff72c3fe7e7f7f44549d8d73a5"
  },
  {
    "url": "img/2_w_800.webp",
    "revision": "d7878060f66f4b33fd8679a9315be876"
  },
  {
    "url": "img/2.webp",
    "revision": "8fd1f34e30f4a28f3582d32bedac0de6"
  },
  {
    "url": "img/3_w_300.webp",
    "revision": "b5da9d18203d276e5c3f05d74712fec5"
  },
  {
    "url": "img/3_w_433.webp",
    "revision": "d7f734fb7906a02dce6dddf42266bbd3"
  },
  {
    "url": "img/3_w_653.webp",
    "revision": "ac58ff5b1282f5a4cfa6f0c09af1378b"
  },
  {
    "url": "img/3_w_800.webp",
    "revision": "1f44fcc55a3347c4501fe03b2d57ef0f"
  },
  {
    "url": "img/3.webp",
    "revision": "7e44752e72f65f063a060244a83a2a38"
  },
  {
    "url": "img/4_w_300.webp",
    "revision": "592b1b4d040698262e64a0fd6e45c8d7"
  },
  {
    "url": "img/4_w_433.webp",
    "revision": "3357f2eaa42b1a182101d9baf482dc32"
  },
  {
    "url": "img/4_w_653.webp",
    "revision": "dfbcecbaeb5519a20c1f012ee04b0062"
  },
  {
    "url": "img/4_w_800.webp",
    "revision": "c9cf616ba5ce0a47a9b2f3418ca5f780"
  },
  {
    "url": "img/4.webp",
    "revision": "7de4d703a089c2556071460d4efdbb9c"
  },
  {
    "url": "img/5_w_300.webp",
    "revision": "7a604e93a688b91433e8d60e454643db"
  },
  {
    "url": "img/5_w_433.webp",
    "revision": "85ca647ff3706f733ea8fa48064c39af"
  },
  {
    "url": "img/5_w_653.webp",
    "revision": "89a4d887992938b28162011feecb902a"
  },
  {
    "url": "img/5_w_800.webp",
    "revision": "67cb903f079e415058522f8ad8a4e384"
  },
  {
    "url": "img/5.webp",
    "revision": "8e425eb4c30625b26a274fa5e81116be"
  },
  {
    "url": "img/6_w_300.webp",
    "revision": "8d559dea6e6ddba168528e54f9542036"
  },
  {
    "url": "img/6_w_433.webp",
    "revision": "aea01b0830c4ce047d92217425b0dae7"
  },
  {
    "url": "img/6_w_653.webp",
    "revision": "6cd3739513f69ecc6383f7ebccc4fbeb"
  },
  {
    "url": "img/6_w_800.webp",
    "revision": "7fbe0d321055cbe370548cc4d6ae4f32"
  },
  {
    "url": "img/6.webp",
    "revision": "26d799084fdd671b2ba9360bc4e0ec5b"
  },
  {
    "url": "img/7_w_300.webp",
    "revision": "1178ab83b72d6e2279eb8bad066ed772"
  },
  {
    "url": "img/7_w_433.webp",
    "revision": "6af17fa6e705e6e0cc466521bd0a6817"
  },
  {
    "url": "img/7_w_653.webp",
    "revision": "bcefb7b69a3a5a425252518ba0f480c1"
  },
  {
    "url": "img/7_w_800.webp",
    "revision": "cd3f1f3b1e837ad6b4dfcbaea2d44e2a"
  },
  {
    "url": "img/7.webp",
    "revision": "1643ebd641a2c2abe68fc949dbb6d45e"
  },
  {
    "url": "img/8_w_300.webp",
    "revision": "0e4b29d1a1766434543e41167752eb87"
  },
  {
    "url": "img/8_w_433.webp",
    "revision": "8bd1c6385b861b150f704440e4a3fe2c"
  },
  {
    "url": "img/8_w_653.webp",
    "revision": "5fadabeb7c1830b9f35d5b4dabc993b2"
  },
  {
    "url": "img/8_w_800.webp",
    "revision": "aae6df09537d519a87770bce9a05f359"
  },
  {
    "url": "img/8.webp",
    "revision": "18c6ec290a5914b408f5ccd90eda84fd"
  },
  {
    "url": "img/9_w_300.webp",
    "revision": "ca5e473430623407077ae775a0fea4ae"
  },
  {
    "url": "img/9_w_433.webp",
    "revision": "177c6fd3339133f1af45cc27e26b54fe"
  },
  {
    "url": "img/9_w_653.webp",
    "revision": "18cc8199abb1380698310f3d35825c8e"
  },
  {
    "url": "img/9_w_800.webp",
    "revision": "cb6a3915f1cda2a49a2783562ad1d2c3"
  },
  {
    "url": "img/9.webp",
    "revision": "22c3f66b238e22b0f91aba7932df910b"
  },
  {
    "url": "img/preview/1.tiny.webp",
    "revision": "7cf7f0e583bbbaff1a8b6efff8cccf4a"
  },
  {
    "url": "img/preview/10.tiny.webp",
    "revision": "e98558775bd3d094250f728f357eb874"
  },
  {
    "url": "img/preview/2.tiny.webp",
    "revision": "cb434c1fb026614526a5e70837122bc7"
  },
  {
    "url": "img/preview/3.tiny.webp",
    "revision": "f1ae0c4e420aa29392645deb7d27c4e7"
  },
  {
    "url": "img/preview/4.tiny.webp",
    "revision": "5d58a480399742c2c355e04bffa542cd"
  },
  {
    "url": "img/preview/5.tiny.webp",
    "revision": "7fc275ac9cbcbba8adfb55c67f39d991"
  },
  {
    "url": "img/preview/6.tiny.webp",
    "revision": "fb4b4040ee82a61602016337948bf954"
  },
  {
    "url": "img/preview/7.tiny.webp",
    "revision": "9b25dc544f302db35e8d0ddfb5e32f48"
  },
  {
    "url": "img/preview/8.tiny.webp",
    "revision": "76c38d2f8cdb90483025030326764481"
  },
  {
    "url": "img/preview/9.tiny.webp",
    "revision": "cb96997d772d97872c34e98877bce200"
  },
  {
    "url": "index.html",
    "revision": "07541d898b9f5d867ef67581dc5b1c4a"
  },
  {
    "url": "js/idb.js",
    "revision": "c1d2742c6acf4cc73e8fe99b2c8f80fc"
  },
  {
    "url": "js/main.js",
    "revision": "1ba6e775b2ebe08cdd57d28ca86f68c1"
  },
  {
    "url": "js/progressive-image.min.js",
    "revision": "68ebb00c48b3d07936421e787ebf4524"
  },
  {
    "url": "js/restaurant_info.js",
    "revision": "130faacda55158a5ea2415a4bfbbbdc1"
  },
  {
    "url": "js/reviewsDatabase.js",
    "revision": "1e3ee1a50e88f538e4c4c11b029c3e97"
  },
  {
    "url": "restaurant.html",
    "revision": "2e168c8299dbf5a7af042e814736a4cb"
  }
]);

const bgSyncPlugin = new workbox.backgroundSync.Plugin('dashboardr-queue');

const networkWithBackgroundSync = new workbox.strategies.NetworkOnly({
  plugins: [bgSyncPlugin],
});

workbox.routing.registerRoute(
  'http://localhost:1337/reviews/',
  networkWithBackgroundSync,
  'POST'
);