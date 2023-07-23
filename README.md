# A-Social-Platform
- This is a web-based client application for a social platform where users can view posts from other users. 
- The application uses data from the JSON placeholder mock API and implements various features to provide an engaging user experience.
- Below are the details of the project and its functionalities.

## Links
- Accessible link for the deployed project.
  
`https://a-social-platform.vercel.app/`

## To Get Started
### Installation
- To run this application on your local machine, you will need to have Node.js installed.
- Clone the Repository:

     `git@github.com:Chepkoech1/A-Social-Platform.git`

     `cd A-Social-Platform`

- Open in Visual Studio Code:


     `code .`

- Install Dependencies:

     `npm install`

- Start the development server:

     `npm start`

## Usage
- Once the development server is running you can view the app in your browser by navigating into the index.html file the right click and choose to open in live server.
- The app will prompt you to login by username or zip-code.



## Technologies used

## The application was developed using the following technologies.

- HTML, 
- CSS,
- JavaScript for the client-side implementation.
- Fetch API to interact with the JSON placeholder mock API

## Features
## Authentication
- Users can log in using their username or email and zip-code as their password.
- Once authenticated, users can view their profile information, including username, email, zip-code, and membership status (free or premium).
- Authenticated users can also log out from the platform.
- Authenticated users have access to a dedicated "My Posts" page where they can view their own posts.

## Feed Section
- An anonymous or free user can view up to 20 posts per day in the "Feed" section.
- If a free user exceeds their daily limit, a paywall will appear, prompting them to consider a premium membership.
- Each post in the "Feed" section displays the title, body, likes count, comments count, and views count.
- A "Like" button allows users to like a post.
- A "Comment" button allows users to add comments to a post.
- Premium users can block a single post or all posts from a particular user.

## Following section

- Authenticated users can follow other users from a list of all users (10).
- After following other users, a new page/section/tab labeled "Following" becomes accessible.
- In the "Following" section, users can view posts from the users they are following.

##  Contributors

  - Sandra Chepkoech.

## License

  - MIT License.






