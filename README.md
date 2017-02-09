# MyTriangleRealty using React, Redux Firebase 


Quick Start
-----------

```shell
$ npm install
$ npm run dev
```

Firebase settings
--------
Copy firebase's web settings into config.js

```javascript
module.exports = {

    FIREBASE_CONFIG: {

      apiKey: "",
      authDomain: "",
      databaseURL: "",
      storageBucket: "",

    }
}
```

Commands
--------

|Script|Description|
|---|---|
|`npm run dev`| Run development server with webpack-dev-server @ `localhost:3000`|
|`npm run build`| Test, and build the application to `./dist`|
|`npm start`| Start production ready app with pm2 from `./dist` @ `localhost:8080`|
|`npm run lint`| Run ESLint on `./src`|


