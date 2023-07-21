// Function to toggle visibility of the sections
function showSection(sectionId) {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      if (section.id === sectionId) {
        section.classList.remove("hidden");
      } else {
        section.classList.add("hidden");
      }
    });
}

  // Function to render posts in the "Feed" section
function renderFeed(posts) {
    const feedSection = document.getElementById("feed");
    feedSection.innerHTML = "<h2>Feed</h2>";
    for (const post of posts) {
      const postElement = document.createElement("div");
      postElement.className = "feed-item";
      postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
      feedSection.appendChild(postElement);
    }
}
  

// Function to handle form submission (Login)
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // Perform a fetch to the backend with the login data
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        const foundUser = users.find(
          (user) =>
            (user.username === username || user.email === username) &&
            user.address.zipcode === password
        );
  
        if (foundUser) {
          loggedInUser = foundUser;
          showSection("feed");
          fetchPosts();
        } else {
          alert("Invalid credentials. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        alert("Failed to fetch user data. Please try again later.");
    });
}

// Function to fetch posts
function fetchPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((posts) => {
        renderFeed(posts.slice(0, 20));
        // Render the posts in the "Feed" section
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        alert("Failed to fetch posts. Please try again later.");
    });
}

// Function to handle Logout
function handleLogout() {
    loggedInUser = null;
    showSection("logout");
  }
  // Function to render posts in the "Following" section
  function renderFollowing(posts) {
    const followingSection = document.getElementById("following");
    followingSection.innerHTML = "<h2>Following</h2>";
    for (const post of posts) {
      const postElement = document.createElement("div");
      postElement.className = "following-item";
      postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
      followingSection.appendChild(postElement);
    }
}

// Function to render posts in the "My Posts" section
function renderMyPosts(posts) {
    const myPostsSection = document.getElementById("my-posts");
    myPostsSection.innerHTML = "<h2>My Posts</h2>";
    for (const post of posts) {
      const postElement = document.createElement("div");
      postElement.className = "my-posts-item";
      postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
      myPostsSection.appendChild(postElement);
    }
}

// Function to render the user's profile
function renderProfile(user) {
    const profileSection = document.getElementById("profile");
    profileSection.innerHTML = `<h2>Profile</h2>
    <p>Username: ${user.username}</p>
    <p>Email: ${user.email}</p>
    <p>Zip-code: ${user.address.zipcode}</p>
    <p>Membership: ${user.premium ? "Premium" : "Free"}</p>`;
}

// Function to fetch posts for following
function fetchFollowingPosts() {
    // Replace the followingUserIds with the IDs of users being followed
    const followingUserIds = [2, 3, 4];
    const followingPosts = [];
  
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((posts) => {
        for (const post of posts) {
          if (followingUserIds.includes(post.userId)) {
            followingPosts.push(post);
          }
        }
        renderFollowing(followingPosts);
      })
      .catch((error) => {
        console.error("Error fetching following posts:", error);
        alert("Failed to fetch following posts. Please try again later.");
    });
}     

// Function to fetch user profile data
function fetchUserProfile() {
    fetch(`https://jsonplaceholder.typicode.com/users/${loggedInUser.id}`)
      .then((response) => response.json())
      .then((user) => {
        renderProfile(user);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        alert("Failed to fetch user profile. Please try again later.");
    });
}



// Event listener for "Following" link
const followingLink = document.querySelector('a[href="#following"]');
followingLink.addEventListener("click", () => {
  fetchFollowingPosts();
  showSection("following");
});

// Event listener for "My Posts" link
const myPostsLink = document.querySelector('a[href="#my-posts"]');
myPostsLink.addEventListener("click", () => {
  fetchMyPosts();
  showSection("my-posts");
});

// Event listener for "Profile" link
const profileLink = document.querySelector('a[href="#profile"]');
profileLink.addEventListener("click", () => {
  fetchUserProfile();
  showSection("profile");
});

// // Set initial state of the application
// let loggedInUser = null;
// showSection("login-section");


// Event listener for login form submission
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", handleLogin);

// Event listener for Logout link
const logoutLink = document.querySelector('a[href="#logout"]');
logoutLink.addEventListener("click", handleLogout);

// Set initial state of the application
let loggedInUser = null;
showSection("login-section");