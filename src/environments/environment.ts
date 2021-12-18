// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDhllrdgA_IlQtcTBUYARC4_pt7PULtVb8",
    authDomain: "angular-crud-f00a5.firebaseapp.com",
    projectId: "angular-crud-f00a5",
    storageBucket: "angular-crud-f00a5.appspot.com",
    messagingSenderId: "17637852973",
    appId: "1:17637852973:web:b4c5d5911ad767434935a4",
    measurementId: "G-C61122FKBD"
  },
  spotify: {
    grant_type: "client_credentials",
    client_id: "f26865d22da44eaab2271f52cb0a3525",
    client_secret: "e3d5d617a0ea4f168cfee61b46d0f693",
    urlToken: "https://accounts.spotify.com/api/token",
    url: "https://api.spotify.com/v1/"
  },
  serpApi: {
    key: "cb259f44a586e87f64209daa12e6fc494471c501adaf2c8cf6988f28ca621267",
    url: "https://serpapi.com/search.json"
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
