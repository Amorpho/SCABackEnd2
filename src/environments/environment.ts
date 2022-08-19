// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // firebase from original
  // firebaseConfig: {
  //   apiKey: "AIzaSyBXbaSTot6d_XuIxUsdZF0M3BEctYW0h6M",
  //   authDomain: "scadb-71afc.firebaseapp.com",
  //   databaseURL: "https://scadb-71afc-default-rtdb.firebaseio.com",
  //   projectId: "scadb-71afc",
  //   storageBucket: "scadb-71afc.appspot.com",
  //   messagingSenderId: "573108028635",
  //   appId: "1:573108028635:web:f872362d648ad1dad238fe"
  // },

  //firebase fake
  firebaseConfig: {
    apiKey: "AIzaSyA0ZoX0ahXzBeVS67CdcQcYhVczplnhs0M",
    authDomain: "sca2dbtotest.firebaseapp.com",
    projectId: "sca2dbtotest",
    storageBucket: "sca2dbtotest.appspot.com",
    messagingSenderId: "581065213313",
    appId: "1:581065213313:web:e1c3c27a0e7ad95b199480"
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
