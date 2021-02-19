# JYDB Movie Database

**JYDB Movie Database** was created by Jamie Cook and Ylva Nilsson as our final project of the Technigo boot-camp. We are both big movie fans and we wanted to create something fun for our final project. The inspiration behind JYDB was to create a _Netflix_ style streaming site combined with a movie-database app. It is a multi page **React** app built using **React-Router** and **Redux toolkit**.

## Our process

We started by building the basic site skeleton using React-Router and making our external Movie-API call. Next we created our **authentication** functionality because we wanted certain features to only be available for logged in users. We created a _loggedIn_ state in our Redux store and to also stored the users access token in **Local Storage** so that the user would remain logged in after a page refresh. We then

- The homepage displays a hero carousel using **React Slick** which shows 5 random movies from our "Upcoming" category.
- We then have 4 scroll lanes which display movies from x4 different categories. We store these in Redux and they are accessed by our Movie List pages when you select "See all", to save us making unnecessary API calls. Each scroll lane has arrow buttons when in desktop mode. The arrows target the corresponding scroll lane thanks to the **useRef** hook.
- We implemented a Watchlist page which is accessible only when you're logged in. You can add movies to your watchlist on the home screen and also the movie details page itself. This value is stored and accessed from our database. Can't decide what movie to watch? That's not a problem as we have included a **Random Movie Selector** button on the Watchlist page.
- On the Movie Details page we have a **Review** section which can be viewed by all. You need to be logged in to leave one though. The user is also allowed to delete their own comments.

This is a project we would like to continue adding to as we have even more ideas to improve the site. We have created a user-rating endpoint in our backend and did not have time to implement it on the frontend. So this is at the top of our list!

## Features in full

- User Authentication (stored in our DB)
- Watchlist (stored in our DB)
- Reviews (stored in our DB)
- Hero Carousel
- Scroll Lanes
- Movie Details and Actor Details featuring other movies that particular actor/actress has appeared in
- Movie Search
- Random Movie Selector

## Tech

- React Slick
- Sweet Alert
- Styled-components

## Backend

We also developed the backend for this app. The repository can be found here: https://github.com/the-j-curl/project-final-movie-backend

## View it live

Please feel free to create an account, add movies to your watchlist and even leave a comment or two! Take a look here: https://jydb-movies.netlify.app/
