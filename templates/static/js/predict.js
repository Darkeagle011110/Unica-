// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   const firebaseConfig = {
//     apiKey: "AIzaSyAB08F3M-PszKDuYj33U8tXA9GrgcUwMGc",
//     authDomain: "visioniq-ram22.firebaseapp.com",
//     projectId: "visioniq-ram22",
//     storageBucket: "visioniq-ram22.firebasestorage.app",
//     messagingSenderId: "613181488839",
//     appId: "1:613181488839:web:29274f31cb85662ae808e2",
//     measurementId: "G-HBKNKQVQ6S"
//   };
const toggle = document.getElementById("toggle");
const nav = document.querySelector("nav");

toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
});


const uploadPreview = document.getElementById('upload-preview');
const predictButton = document.getElementById('predict-button');
const plusIcon = document.getElementById('plus-icon');
const uploadButton = document.querySelector('.upload-button');
const captureButton = document.querySelector('.capture-button');

// Drag-and-drop functionality
uploadPreview.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadPreview.classList.add('dragover');
});

uploadPreview.addEventListener('dragleave', () => {
    uploadPreview.classList.remove('dragover');
});

uploadPreview.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadPreview.classList.remove('dragover');

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
            uploadPreview.innerHTML = `<img src="${event.target.result}" alt="Uploaded Image Preview" style="max-width: 100%; max-height: 100%;">`;
            predictButton.classList.add('enabled');
            predictButton.disabled = false; // Enable the predict button
            plusIcon.classList.add('enabled');
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please upload a valid image file.');
    }
});

// Upload Image button functionality
uploadButton.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadPreview.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image Preview" style="max-width: 100%; max-height: 100%;">`;
                predictButton.classList.add('enabled');
                predictButton.disabled = false; // Enable the predict button
                plusIcon.classList.add('enabled');
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload a valid image file.');
        }
    });
    input.click();
});

// Capture Image button functionality
captureButton.addEventListener('click', () => {
    const videoElement = document.createElement('video');
    videoElement.autoplay = true;
    videoElement.style.maxWidth = '100%';
    videoElement.style.maxHeight = '100%';

    const captureContainer = document.createElement('div');
    captureContainer.style.position = 'relative';
    captureContainer.style.display = 'flex';
    captureContainer.style.flexDirection = 'column';
    captureContainer.style.alignItems = 'center';

    const captureButton = document.createElement('button');
    captureButton.textContent = 'Capture';
    captureButton.style.marginTop = '10px';

    captureContainer.appendChild(videoElement);
    captureContainer.appendChild(captureButton);

    uploadPreview.innerHTML = '';
    uploadPreview.appendChild(captureContainer);

    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            videoElement.srcObject = stream;

            captureButton.addEventListener('click', () => {
                const canvas = document.createElement('canvas');
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;
                const context = canvas.getContext('2d');
                context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

                // Stop video stream
                stream.getTracks().forEach((track) => track.stop());

                uploadPreview.innerHTML = `<img src="${canvas.toDataURL()}" alt="Captured Image Preview" style="max-width: 100%; max-height: 100%;">`;
                predictButton.classList.add('enabled');
                predictButton.disabled = false; // Enable the predict button
                plusIcon.classList.add('enabled');
            });
        })
        .catch((error) => {
            alert('Unable to access the camera. Please check your permissions.');
        });
});

// Predict button click functionality
predictButton.addEventListener('click', () => {
    if (predictButton.classList.contains('enabled')) {
        alert('Prediction in progress...');
    }
});
