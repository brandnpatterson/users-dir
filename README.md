# postlight-code-challenge

## Database Connection

I created a new database with Sequel Pro and then created a User model with the sequelize-cli. This generated the database connection model which is used in the controllers. I then added the config details with variables from the .env file.

## REST API

I created endpoints for each type of request and tested them using Postman

## Client

I used `create-react-app` to build the frontend and set up a Reducer, `axios`, `react-router`, and fetched the Users list. I added a heade and the pages for the CRUD requests.

## Front End Forms and Styling

I built the front end logic with useReducer and useContext. I also built forms with flash messages and a redirect for creating a user.

I then started to build out the styling with Bulma CSS and the placeholder images for Users.

## Unique username

I configured the User creation so that each User must have a unique username. I retained all error messages in the api file on the frontend, but considered moving them to the backend.

## Filtering

When planning the filter by properties, I first consolidated my other filters and created a reusable filter by username in order to get a single user in any case.
