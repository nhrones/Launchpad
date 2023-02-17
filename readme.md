# Add a service worker
Service workers are a key technology that help make PWAs faster and independent of network conditions.

Service workers are specialized Web Workers that intercept network requests from your PWA and enable scenarios that were previously limited to native apps, including:

Offline support.
Advanced caching.
Running background tasks such as receiving PUSH messages, adding badges to the app icon, or fetching data from a server.
For Microsoft Edge to be able to install the app, your app must have a service worker file.

The sw.js file will act as your PWA's service worker. The code above listens to the install event and uses it to cache all resources the app needs to function: the start HTML page, the converter JavaScript file, and the converter CSS file.

The code also intercepts fetch events, which happen every time your app sends a request to the server, and applies a cache-first strategy. The service worker returns cached resources so your app can work offline, and if that fails attempts to download from the server.

