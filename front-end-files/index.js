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