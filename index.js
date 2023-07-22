// declare variable for loggedin user
let loggedInUser = null;

let blockedPosts = [];
let blockedUsers = [];

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
function handleLike(postId){
  const postElement = document.getElementById(`post-${postId}`);
  const likesElement = postElement.querySelector(".likes");
  const currentLikes = parseInt(likesElement.textContent.split(" ")[0]);
  likesElement.textContent = `${currentLikes + 1} Likes`;
}
// Function to handle post commenting
function handleComment(postId) {
  const postElement = document.getElementById(`post-${postId}`);
  const commentsElement = postElement.querySelector(".comments");
  const currentComments = parseInt(commentsElement.textContent.split(" ")[0]);
  const newCommentCount = currentComments + 1;
  const commentText = newCommentCount === 1 ? "1 Comment" : `${newCommentCount} Comments`;
  commentsElement.textContent = commentText;
}
// Event listener for post commenting
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("comment-button")) {
    const postId = event.target.parentNode.getAttribute("data-post-id");
    handleComment(postId);
  }
});
// Event listener for post liking
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("like-button")) {
    const postId = event.target.parentNode.getAttribute("data-post-id");
    handleLike(postId);
  }
});



// Function to render posts in the "Feed" section
function renderFeed(posts) {
  const feedSection = document.getElementById("feed");
  feedSection.innerHTML = "<h2>Feed</h2>";
  for (const post of posts) {
    // Check if the post is not blocked by the current user
    if (!isPostBlocked(post)) {
      const postElement = document.createElement("div");
      postElement.className = "feed-item";
      postElement.setAttribute("data-post-id", post.id);
      postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>
        <button class="like-button">Like</button>
        <button class="comment-button">Comment</button>
        <p class="likes">0 Likes</p>
        <p class="comments">0 Comments</p>
        <p class="views">0 Views</p>`;

      // Add Block Button
      const blockButton = document.createElement("button");
      blockButton.textContent = "Block This Post";
      blockButton.className = "block-button";
      blockButton.addEventListener("click", () => handleBlockPost(post.id));
      postElement.appendChild(blockButton);

      feedSection.appendChild(postElement);
    }
  }
}

  function isPostBlocked(post) {
    // Check if the post ID is in the blockedPosts array
  return blockedPosts.includes(post.id);
}
// Function to handle post views
  function handleView(postId) {
 
  const postElement = document.getElementById(`post-${postId}`);
  const viewsElement = postElement.querySelector(".views");
  const currentViews = parseInt(viewsElement.textContent.split(" ")[0]);
  viewsElement.textContent = `${currentViews + 1} Views`;
}
// Event listener for post views
document.addEventListener("DOMContentLoaded", () => {
  const postElements = document.querySelectorAll(".feed-item");
  postElements.forEach((postElement) => {
    const postId = postElement.getAttribute("data-post-id");
    handleView(postId);
  });
});

  
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
          showPremiumButton();
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
    
    const blockButton = document.createElement("button");
    blockButton.className = "block-button";
    blockButton.textContent = "Block This Post";
    blockButton.addEventListener("click", () => handleBlockPost(post.id));
    
    postElement.appendChild(blockButton); // Add block button to the post element
    
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

//  Function to fetch user's own posts
function fetchMyPosts() {
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${loggedInUser.id}`)
    .then((response) => response.json())
    .then((posts) => {
      renderMyPosts(posts);
    })
    .catch((error) => {
      console.error("Error fetching user's posts:", error);
      alert("Failed to fetch user's posts. Please try again later.");
  });
}


// Function to fetch user profile data
function fetchUserProfile() {
  fetch(`https://jsonplaceholder.typicode.com/users/${loggedInUser.id}`)
    .then((response) => response.json())
    .then((user) => {
      renderProfile(user); // Render the user details
    })
    .catch((error) => {
      console.error("Error fetching user profile:", error);
      alert("Failed to fetch user profile. Please try again later.");
  });
}



// Function to handle premium membership upgrade (Mock payment)
function handleUpgradeToPremium() {
  // Replace this with actual payment processing logic
  loggedInUser.premium = true;
  showPremiumButton(); // Hide the premium membership button after upgrading
  alert("Congratulations! You are now a premium member.");
}

// Function to toggle the visibility of the premium button based on membership status
function showPremiumButton() {
  const premiumBtn = document.getElementById("premium-btn");
  if (loggedInUser && !loggedInUser.premium) {
    premiumBtn.classList.remove("hidden");
  } else {
    premiumBtn.classList.add("hidden");
  }
}
// Function to handle blocking a post
function handleBlockPost(postId) {
  if (loggedInUser && loggedInUser.premium) {
    blockedPosts.push(postId);
    fetchPosts(); // Re-render the feed to exclude the blocked post
  } else {
    alert("You need to be a premium user to block posts.");
  }
}

// Function to handle blocking a user
function handleBlockUser(userId) {
  if (loggedInUser && loggedInUser.premium) {
    blockedUsers.push(userId);
    fetchFollowingPosts(); // Re-fetch the following posts to exclude the blocked user's posts
  } else {
    alert("You need to be a premium user to block users.");
  }
}
// Event listener for premium membership button
const premiumBtn = document.getElementById("premium-btn");
premiumBtn.addEventListener("click", handleUpgradeToPremium);


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

  // Show the section with block buttons
  // showSection("block-section");
});

// // Event listener for blocking a post
// const blockPostButton = document.getElementById("block-post-button");
// blockPostButton.addEventListener("click", () => {
//   const postIdToBlock = 1; // Replace with the actual post ID to block
//   handleBlockPost(postIdToBlock);
// });
// // Event listener for blocking a user
// const blockUserButton = document.getElementById("block-user-button");
// blockUserButton.addEventListener("click", () => {
//   const userIdToBlock = 2; // Replace with the actual user ID to block
//   handleBlockUser(userIdToBlock);
// });

// Event listener for login form submission
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", handleLogin);

// Event listener for Logout link
const logoutLink = document.querySelector('a[href="#logout"]');
logoutLink.addEventListener("click", handleLogout);

// Set initial state of the application
// let loggedInUser = null;
showSection("login-section");