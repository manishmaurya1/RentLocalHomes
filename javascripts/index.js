function toggleSideNav() {
    const sideNav = document.querySelector('.side-nav');
    sideNav.classList.toggle('active');
}
const navtog = document.querySelector('.navbar-toggler');
navtog.addEventListener('click', ()=>{
toggleSideNav();    
});

// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, ref, onValue, push, set } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js';

// Firebase configuration
const firebaseConfig = {
    // Your Firebase Config
    apiKey: "AIzaSyASG3PPBM7df0b0ZOR1QtJ2YJtT8Gwe3as",
    authDomain: "urban-rentals-6dd93.firebaseapp.com",
    databaseURL: "https://urban-rentals-6dd93-default-rtdb.firebaseio.com",
    projectId: "urban-rentals-6dd93",
    storageBucket: "urban-rentals-6dd93.appspot.com",
    messagingSenderId: "549724965711",
    appId: "1:549724965711:web:065638929879960a82d33a",
    measurementId: "G-3PEDBMZ155"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firebase database
const db = getDatabase();
const open = document.querySelector(".open")
open.addEventListener('click', () => {
    openPopup();
});

// Function to open the popup
function openPopup() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
}
const close = document.querySelector("#cancelBtn")
close.addEventListener('click', () => {
    closePopup();
});
const closee = document.querySelector("#overlay")
closee.addEventListener('click', () => {
    closePopup();
});
// Function to close the popup
function closePopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
}
const adddb = document.querySelector("#addHomeBtn")
adddb.addEventListener('click', () => {
    addHome();
});

// Function to add a new home
function addHome() {
    const price = document.getElementById('price').value;
    const location = document.getElementById('location').value;
    const title = document.getElementById('title').value;
    const area = document.getElementById('area').value;
    const image = document.getElementById('image').value;

    // Validate the input data
    if (!price || !location || !image || !title || !area) {
        alert("Please provide valid input for Price, Location, title, area and Image URL.");
        return;
    }

    // Create a new home object
    const newHome = {
        specifications: {
            price: price,
            title: title,
            area: area,
            // Add other details...
        },
        address: location,
        home_images: image,
        // Add other details...
    };

    // Save the new home to the Firebase Realtime Database
    const newHomeRef = push(ref(db, 'homes'));
    set(newHomeRef, newHome);

    // Close the popup
    closePopup();
}

// Function to display houses and show details
function displayHouses() {
    const housesRef = ref(db, 'homes');

    onValue(housesRef, (snapshot) => {
        const houseList = document.getElementById('houseList');
        houseList.innerHTML = ''; // Clear existing data

        const housesData = snapshot.val();

        if (housesData) {
            for (const [homeId, houseData] of Object.entries(housesData)) {
                const listItem = document.createElement('div');
                listItem.classList.add('house-list-box'); // Add a class for styling

                // Add click event listener to each house element
                listItem.addEventListener('click', () => showDetails(houseData));

                listItem.innerHTML = `
                    <img class="house-image" src="${houseData.home_images}" alt="House Image">
                    <div class="house-details">
                        <div class="price-tag">
                            <p>${houseData.specifications.price} /months</p>
                        </div>
                        <h2 class = "t">${houseData.specifications.title}</h2>
                        <p>${houseData.specifications.area}</p>
                        <p>${houseData.address}</p>
                        <!-- Add more details as needed -->

                        <!-- Book Now button -->
                        <button class="bookNowBtn">Book Now</button>
                    </div>
                `;
                houseList.appendChild(listItem);
            }
        } else {
            console.warn('No data available.');
        }
    });
}

// Function to show details when a house is clicked
function showDetails(houseData) {
    const list = document.querySelector('.list-sec')
    list.classList.add('list')
    const myh = document.querySelector('.show-details')
    myh.classList.add('myh')
    const detailsSection = document.querySelector('.show-details');
    detailsSection.innerHTML = '';

    const detailsItem = document.createElement('div');
    detailsItem.classList.add('custom-details-item'); // Change class name here
    detailsItem.innerHTML = `
        <img class="details-image" src="${houseData.home_images}" alt="House Image">
        <div class="details-info">
            <h2>${houseData.specifications.title}</h2>
            <p>Area: ${houseData.specifications.area}</p>
            <p>location: ${houseData.address}</p>
            <p><b>${houseData.specifications.price}</b> /months</p>
            <!-- Add more details as needed -->
            
            <!-- Book Now button -->
            <button class="bookNowBtnn" onclick="bookNow('${houseData.address}')">Book Now</button>
        </div>
    `;
    detailsSection.appendChild(detailsItem);
}

// Initial display of houses
displayHouses();
