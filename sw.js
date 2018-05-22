importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');



  workbox.routing.registerRoute(
    new RegExp('restaurant.html(.*)'),
    workbox.strategies.networkFirst({
      cacheName: 'cache-restaurant-details',
      cacheableResponse: {statuses: [0, 200]}
    })
  );
workbox.precaching.precacheAndRoute([
  {
    "url": "css/styles.css",
    "revision": "8148c24e6829af451603c2cf6740bd54"
  },
  {
    "url": "data/restaurants.json",
    "revision": "d594ed8c5fc9de5c05bd3a8151a564d6"
  },
  {
    "url": "img/1_small.jpg",
    "revision": "abb7dec1437bbf5c5bb5a05aaa400636"
  },
  {
    "url": "img/1_small.webp",
    "revision": "d58e5539d632444296b9792c6a38f2a8"
  },
  {
    "url": "img/1.jpg",
    "revision": "cc074688becddd2725114187fba9471c"
  },
  {
    "url": "img/1.webp",
    "revision": "ce320a17d67a96af2784072de0589a45"
  },
  {
    "url": "img/10_small.jpg",
    "revision": "d3f056fb600fc1ccb8eed7992696d64f"
  },
  {
    "url": "img/10_small.webp",
    "revision": "ddcb747172e4b2ef4d7858208d0050e3"
  },
  {
    "url": "img/10.jpg",
    "revision": "2bd68efbe70c926de6609946e359faa2"
  },
  {
    "url": "img/10.webp",
    "revision": "92f021f9aa478e3e60ad7d558123ea04"
  },
  {
    "url": "img/2_small.jpg",
    "revision": "541bb705e5feb81316c0fde92655c05d"
  },
  {
    "url": "img/2_small.webp",
    "revision": "a7c0b65801e3dc5d690605b0ddbe4222"
  },
  {
    "url": "img/2.jpg",
    "revision": "759b34e9a95647fbea0933207f8fc401"
  },
  {
    "url": "img/2.webp",
    "revision": "8fd1f34e30f4a28f3582d32bedac0de6"
  },
  {
    "url": "img/3_small.jpg",
    "revision": "fbc8e2177fe3af4e5861e43f73aaba4e"
  },
  {
    "url": "img/3_small.webp",
    "revision": "d9f791c3a26e60dac7310e2b5da97831"
  },
  {
    "url": "img/3.jpg",
    "revision": "81ee36a32bcfeea00db09f9e08d56cd8"
  },
  {
    "url": "img/3.webp",
    "revision": "7e44752e72f65f063a060244a83a2a38"
  },
  {
    "url": "img/4_small.jpg",
    "revision": "043df3073bb2a016fb12c22143a6db89"
  },
  {
    "url": "img/4_small.webp",
    "revision": "eec3bba67d7f49d79b6f772341077a19"
  },
  {
    "url": "img/4.jpg",
    "revision": "23f21d5c53cbd8b0fb2a37af79d0d37f"
  },
  {
    "url": "img/4.webp",
    "revision": "7de4d703a089c2556071460d4efdbb9c"
  },
  {
    "url": "img/5_small.jpg",
    "revision": "7c6c2b5d91cfa53f065f8e3d675a5da1"
  },
  {
    "url": "img/5_small.webp",
    "revision": "4b700c2066b1d369b712d348fa44c22a"
  },
  {
    "url": "img/5.jpg",
    "revision": "0a166f0f4e10c36882f97327b3835aec"
  },
  {
    "url": "img/5.webp",
    "revision": "8e425eb4c30625b26a274fa5e81116be"
  },
  {
    "url": "img/6_small.webp",
    "revision": "02702c4fbd6324f26c3830b10f89d8d4"
  },
  {
    "url": "img/6.jpg",
    "revision": "eaf1fec4ee66e121cadc608435fec72f"
  },
  {
    "url": "img/6.webp",
    "revision": "26d799084fdd671b2ba9360bc4e0ec5b"
  },
  {
    "url": "img/7_small.webp",
    "revision": "94408c77add24ba352f757dea16d4a82"
  },
  {
    "url": "img/7.jpg",
    "revision": "bd0ac197c58cf9853dc49b6d1d7581cd"
  },
  {
    "url": "img/7.webp",
    "revision": "1643ebd641a2c2abe68fc949dbb6d45e"
  },
  {
    "url": "img/8_small.webp",
    "revision": "4c991c4aecaa378e951c05130dab6655"
  },
  {
    "url": "img/8.jpg",
    "revision": "6e0e6fb335ba49a4a732591f79000bb4"
  },
  {
    "url": "img/8.webp",
    "revision": "18c6ec290a5914b408f5ccd90eda84fd"
  },
  {
    "url": "img/9__small.webp",
    "revision": "d891fbee77f6629b5e57ce0a75f3ac6b"
  },
  {
    "url": "img/9_small.jpg",
    "revision": "c451267dfc811473c8002015389a9916"
  },
  {
    "url": "img/9.jpg",
    "revision": "ba4260dee2806745957f4ac41a20fa72"
  },
  {
    "url": "img/9.webp",
    "revision": "22c3f66b238e22b0f91aba7932df910b"
  },
  {
    "url": "index.html",
    "revision": "581f5f0b17673b7291da7068c026d89d"
  },
  {
    "url": "js/dbhelper.js",
    "revision": "73decf2b49e0f5c82ab2313a6760d414"
  },
  {
    "url": "js/main.js",
    "revision": "87f1c0ba7afa42c682c4fbc0aff8aea2"
  },
  {
    "url": "js/restaurant_info.js",
    "revision": "3ef419de94247311d9e7c01ac508d778"
  },
  {
    "url": "restaurant.html",
    "revision": "c66432d1fe4875ef8b01d2089b72bd06"
  }
]);