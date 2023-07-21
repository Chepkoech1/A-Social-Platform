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