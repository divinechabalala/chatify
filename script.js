// Dummy data storage
let posts = [];

// Toggle Modals
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

// Sign Up function (mock)
function signUp() {
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    // Store the user data locally (in real case, you'd send this to the server)
    localStorage.setItem('user', JSON.stringify({ username, email, password }));

    alert('Signed up successfully!');
    toggleModal('signupModal');
}

// Login function (mock)
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Retrieve the user data (in real case, this will come from the server)
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.email === email && user.password === password) {
        alert('Logged in successfully!');
        toggleModal('loginModal');
    } else {
        alert('Invalid login credentials.');
    }
}

// Create a new post
function createPost() {
    const content = document.getElementById('postContent').value;
    const mediaFile = document.getElementById('postMedia').files[0];

    if (!content && !mediaFile) {
        alert('Please write something or add a file.');
        return;
    }

    // Create a new post object
    const post = {
        username: 'John Doe', // In real app, this should be dynamic
        content,
        mediaUrl: mediaFile ? URL.createObjectURL(mediaFile) : null
    };

    // Add post to the array
    posts.push(post);

    // Clear the input fields
    document.getElementById('postContent').value = '';
    document.getElementById('postMedia').value = '';

    renderPosts();
}

// Render posts in the feed
function renderPosts() {
    const postsFeed = document.getElementById('postsFeed');
    postsFeed.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';

        postElement.innerHTML = `
            <div class="username">${post.username}</div>
            <div class="content">${post.content}</div>
            ${post.mediaUrl ? `<img src="${post.mediaUrl}" class="post-media">` : ''}
        `;

        postsFeed.appendChild(postElement);
    });
}