# Microfrontends
This code was built while following https://www.udemy.com/course/microfrontend-course

It can be viewed over at https://d3elqjub7wqcv4.cloudfront.net/

## Project structure

This project is a demo for how to make multiple frontend applications integrate into a single "container" app, while also working as standalone apps.

Multiple frontend frameworks are used in different microfrontends (react and vue).
Everything is tied together through the use of webpack's ModuleFederation plugin.

The code for any specific microfrontend is loaded only when accessed. Additionally, package dependencies are shared across the projects wherever possible (see `shared` in the webpack config files).

Routing is handled through a MemoryRouter in all apps, except for the container. Changes are kept in sync between the BrowserRouter in the Container app and the MemoryRouter of other apps through listeners and callbacks.

The following apps are part of this project:

### Container
This acts as the main app integrating the multiple microfrontends. It is responsible for:
 
 - Loading and rendering the correct apps on the correct pages (Routing)
 - Orchestrating the other apps, passing in methods to trigger authentication changes and history updates
 - "Authentication" logic (mocked)
 - Rendering the Header

### Auth
The auth microfrontend contains pages for signing in and signing up. There is no back-end integration. Clicking "sign up" or "sign in" simply tells the container that the user is logged in.

Both pages are written in **React**. The app exposes a `remoteEntry.js` to load it remotely.

Routes:
- /auth/signin
- /auth/signup

### Dashboard
The dashboard is a "secure" Vue microfrontend only accessible when logged in.

Once the user "signed in" through one of the auth pages it can be accessed at /dashboard.

This is mostly significant for its logged-in check and the use of **Vue** instead of React

Routes:
 - /dashboard

### Marketing
The marketing microfrontend defines a pricing and a "products" homepage, written in **React**. There's no additional functionality.

Routes:
- /
- /pricing

## Known issues
Directly browsing to a URL currently doesn't work because I've disabled AWS WAF rules due to cost.

