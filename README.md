# PromoCodesReactSpa
A React SPA project for managing promo codes.

## How-to:
Firstly, this app can run with or without the real counterpart backend ASP.NET Core Web API app (the 
PromoCodesAspNetCoreWebApi) project. The <code>REACT_APP_SHOULD_MOCK_PROMO_CODES_INFRASTRUCTURE</code> configuration entry in .env.development file can be set to <code>true</code> in order to use the mocked backend (powered by Mirage JS), and changing this configuration entry requires a restart of the app.

Use <code>npm start</code> command to simply start the app. A login page is displayed. The user credentials to use can be found in the <code>src\infrastructure\promo-codes\dependencies-doubles\database-servers\usersData.json</code> file. They are same as can be used with the real backend web API app. Logging out is limited to revisiting the login page, which effectively removes the user's identity token from the client only, because of the minimal nature of the project.

Promo codes data to use are in the <code>src\infrastructure\promo-codes\dependencies-doubles\database-servers\promoCodesData.json</code> file, and they can be used with both the real back-end and mock back-end (using Mirage JS).

React's official Create React App was used to initialize the development of the project.
