// Dummy data storage

let posts = [];

let uploadedImageUrl = '';

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

// Cloudinary Upload Widget

var myWidget = cloudinary.createUploadWidget({

    cloudName: 'dargzsjbh', // Your Cloudinary Cloud Name

    uploadPreset: 'your-upload-preset' // Replace with your actual upload preset

}, (error, result) => {

    if (!error && result && result.event === "success") {

        console.log('Image uploaded successfully: ', result.info.secure_url);

        uploadedImageUrl = result.info.secure_url; // Save the uploaded image URL

        alert('Image uploaded successfully!');

    }

});

document.getElementById("upload_widget").addEventListener("click", function() {

    myWidget.open();

}, false);

// Create a new post

function createPost() {

    const content = document.getElementById('postContent').value;

    if (!content && !uploadedImageUrl) {

        alert('Please write something or upload an image.');

        return;

    }

    // Create a new post object

    const post = {

        username: 'John Doe', // In real app, this should be dynamic

        content,

        imageUrl: uploadedImageUrl

    };

    // Add post to the array

    posts.push(post);

    // Clear the input fields

    document.getElementById('postContent').value = '';

    uploadedImageUrl = ''; // Reset uploaded image URL

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

            ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Uploaded Image">` : ''}

        `;

        postsFeed.appendChild(postElement);

    });

}