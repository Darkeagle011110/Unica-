
const toggle = document.getElementById("toggle");
const nav = document.querySelector("nav");

toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
});

    // Smooth scrolling for navbar links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = e.target.getAttribute('href');
            // Allow external navigation if the link is not an in-page anchor
            if (!href.startsWith('#')) return;

            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Dynamic hero text effect
    const heroText = document.querySelector('.hero h1');
    const words = ["Welcome to Unica", "Analyze Trends Like Never Before", "Explore the Future Today"];
    let wordIndex = 0;
    setInterval(() => {
        heroText.textContent = words[wordIndex];
        wordIndex = (wordIndex + 1) % words.length;
    }, 3000);

    // Scroll-to-top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.textContent = '↑';
    scrollTopBtn.classList.add('scroll-top-btn');
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Video Modal
    const demoButton = document.querySelector('.cta'); // The "Demo" button
    const modal = document.getElementById('videoModal'); // The modal for the video
    const video = document.getElementById('video'); // The video element
    const skipBtn = document.getElementById('skipBtn'); // The skip button

    // When "Demo" button is clicked, show the video modal and start the video
    demoButton.addEventListener('click', () => {
        modal.style.display = 'flex';  // Show the modal
        video.play();  // Start the video
        skipBtn.style.display = 'block';  // Show the skip button
    });

    // Function to close the modal and stop the video
    function closeVideo() {
        modal.style.display = 'none';  // Hide the modal
        video.pause();  // Pause the video
        video.currentTime = 0;  // Reset the video to the beginning
    }

    // Attach the closeVideo function to the skip button
    skipBtn.addEventListener('click', closeVideo);

    // Close the modal and stop the video when the video ends
    video.addEventListener('ended', closeVideo);
});

// Smooth scrolling for Fruits, Vegetables, and Products sections
document.addEventListener("DOMContentLoaded", () => {
    const scrollableSections = [
        "fruits-scroll",
        "vegetables-scroll",
        "products-scroll",
    ];

    scrollableSections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);

        section.addEventListener("wheel", (event) => {
            event.preventDefault();
            section.scrollLeft += event.deltaY > 0 ? 100 : -100;
        });
    });
});

// Delivery Share Pie Chart
const deliveryShareCtx = document.getElementById('deliveryShareChart').getContext('2d');
new Chart(deliveryShareCtx, {
    type: 'pie',
    data: {
        labels: ['Freshness Products', 'Manufactured Products'],
        datasets: [{
            data: [60, 40],
            backgroundColor: ['#ffeb3b', '#000']
        }]
    },
    options: { responsive: true }
});

// Freshness Product Selling Bar Chart
const freshnessSellingCtx = document.getElementById('freshnessSellingChart').getContext('2d');
new Chart(freshnessSellingCtx, {
    type: 'bar',
    data: {
        labels: ['Apple', 'Banana', 'Orange', 'Grapes', 'Pineapple'],
        datasets: [{
            data: [50, 30, 20, 15, 10],
            backgroundColor: '#2196f3'
        }]
    },
    options: { scales: { x: { beginAtZero: true } } }
});

// Brands Performance Bar Chart
const brandsPerformanceCtx = document.getElementById('brandsPerformanceChart').getContext('2d');
new Chart(brandsPerformanceCtx, {
    type: 'bar',
    data: {
        labels: ['Brand A', 'Brand B', 'Brand C'],
        datasets: [{
            data: [100, 80, 60],
            backgroundColor: '#9c27b0'
        }]
    },
    options: { scales: { x: { beginAtZero: true } } }
});

// Average Freshness Speedometer
const freshnessSpeedometerCtx = document.getElementById('freshnessSpeedometer').getContext('2d');
new Chart(freshnessSpeedometerCtx, {
    type: 'doughnut',
    data: {
        labels: ['Freshness', 'Remaining'],
        datasets: [{
            data: [75, 25],
            backgroundColor: ['#4caf50', '#e0e0e0'],
            borderWidth: 0
        }]
    },
    options: {
        rotation: -90,
        circumference: 180,
        cutout: '75%',
        plugins: { tooltip: { enabled: false } }
    }
});

// Freshness List
const freshnessList = document.getElementById('freshnessScoreList');
const freshnessData = [
    { name: 'Apple', score: 80 },
    { name: 'Banana', score: 70 },
    { name: 'Orange', score: 90 },
    { name: 'Grapes', score: 85 },
    { name: 'Pineapple', score: 65 }
];

freshnessData.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name}: ${item.score}% Freshness`;
    freshnessList.appendChild(listItem);
});

// Products Tested Per Day
const productsTestedCtx = document.getElementById('productsTestedChart').getContext('2d');
new Chart(productsTestedCtx, {
    type: 'bar',
    data: {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        datasets: [{
            data: [100, 80, 60, 90, 120, 110, 70],
            backgroundColor: ['#ffeb3b', '#ff9800', '#f44336', '#4caf50', '#2196f3', '#9c27b0', '#e91e63']
        }]
    },
    options: { scales: { y: { beginAtZero: true } } }
});

// Manufacturing Categories Pie Chart
const manufacturingCategoriesCtx = document.getElementById('manufacturingCategoriesChart').getContext('2d');
new Chart(manufacturingCategoriesCtx, {
    type: 'pie',
    data: {
        labels: ['Colddrink', 'Skincare', 'Wafers', 'Others'],
        datasets: [{
            data: [30, 20, 25, 25],
            backgroundColor: ['#f44336', '#4caf50', '#2196f3', '#9c27b0']
        }]
    },
    options: { responsive: true }
});

// js of history page 
// function openPopup(id, images, productName, status, result) {
//     document.getElementById('popup-id').textContent = id;

//     const imageColumn = document.getElementById('popup-images');
//     imageColumn.innerHTML = ''; // Clear existing images

//     images.forEach(imageSrc => {
//         const imgBox = document.createElement('div');
//         imgBox.classList.add('image-box');
//         imgBox.innerHTML = `<img src="${imageSrc}" alt="Product Image">`; // Use backticks for template literals
//         imageColumn.appendChild(imgBox);
//     });

//     const summaryTable = document.getElementById('popup-summary').querySelector('tbody');
//     summaryTable.innerHTML = ''; // Clear existing table rows

//     const row = document.createElement('tr');
//     row.innerHTML = `<td>${productName}</td><td>${status}</td><td>${result}</td>`; // Use backticks for template literals
//     summaryTable.appendChild(row);

//     document.getElementById('popup-overlay').style.display = 'block';
//     document.getElementById('popup-box').style.display = 'flex';
// }

// function closePopup() {
//     document.getElementById('popup-overlay').style.display = 'none';
//     document.getElementById('popup-box').style.display = 'none';
// }

// function search() {
//     // Implement search functionality here
//     console.log("Search clicked!");
// }




