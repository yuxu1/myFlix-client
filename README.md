# myFlix Client (React)

## Description
This is the client-side of the myFlix project, built based on its existing server-side code (REST API and MongoDB database). It is a single-page application that contains function components and utilizes state routing to navigate between views. It offers users the ability (after registering and logging in) to view movie details, add and remove movies from their favorites list, update their user information, and delete their account.

## Libaries and Tools Utilized
* React : JavaScript library
* Parcel : build tool
* Bootstrap: UI library for styling and responsiveness

## Hosted App
* Hosted on Netlify: https://yx-projects-myflix.netlify.app/login

## Source API
* Code Repository: https://github.com/yuxu1/movie_api
* Hosted on Heroku: https://my-flix-project-b74d36752ec6.herokuapp.com/

## Views
### Signup View
* Allows new users to register
  
### Login View
* Allows registered users to login using a username and password

### Main View
* Displays all movies in database (each displayed in its own movie card)
* Allows user to filter movies by typing in live search bar (by movie title)
* Allows user to filter movies by selecting a genre from dropdown menu
* Allows user to select a movie to see more details about the movie
* Allows user to click a button to add or remove a movie to/from their favorites
* Allows user to logout or navigate to their profile through the navigation bar
  
### Movie View
* Displays data about a single movie, including description, genre details, director details, and cover image
* Allows user to add/remove the movie to/from their list of favorites
  
### Profile View
* Displays logged in user's details (username, birthday, registered email, and favorited movies)
* Allows user to update their information (username, email, birthday, and/or password)
* Allows user to remove a movie from their list of favorites
* Allows user to delete their account

## Set Up App
* Clone this repository
* Navigate to project folder and run in terminal `npm install`
* Run `parcel src/index.html` to build the project
