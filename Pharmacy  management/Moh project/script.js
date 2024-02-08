

// JavaScript to handle the click event and toggle the menu
const menuToggle = document.querySelector('.menu-toggle');
const navbarList = document.querySelector('.navbarlist');
const menuItems = document.querySelectorAll('.listitems');

menuToggle.addEventListener('click', function(event) {
  event.stopPropagation(); // Prevent click event from reaching document
  navbarList.classList.toggle('show');
});

// Event listener to hide menu when a menu item is clicked
menuItems.forEach(function(menuItem) {
  menuItem.addEventListener('click', function() {
    navbarList.classList.remove('show');
  });
});

// Event listener to hide menu when anywhere on the screen is clicked except for the menu toggle button and menu items
document.addEventListener('click', function(event) {
  if (!navbarList.contains(event.target) && event.target !== menuToggle) {
    navbarList.classList.remove('show');
  }
});

// function searchMedicine() {
//   const searchInput = document.getElementById('searchMedicineInput');
//   const searchTerm = searchInput.value.trim();

//   if (searchTerm === "") {
//     alert("Please enter a search term");
//     return;
//   }

//   // Update the server URL with the correct port (assuming your server is running on localhost)
//   const serverURL = 'http://localhost:5000';

//   // Make an HTTP request to the server
//   fetch(`${serverURL}/api/medicine/search/${searchTerm}`)
//     .then(response => response.json())
//     .then(data => {
//       const searchResultsContainer = document.getElementById('searchResultsContainer');
//       searchResultsContainer.innerHTML = ''; // Clear previous results

//       if (data.success) {
//         const medicines = data.medicines;

//         if (medicines && Array.isArray(medicines) && medicines.length > 0) {
//           medicines.forEach(medicine => {
//             const resultItem = document.createElement('div');
//             resultItem.classList.add('medicine-container');
//             resultItem.innerHTML = `
//               <p><strong>Medicine Name:</strong> ${medicine.medicineName}</p>
//               <p><strong>Generic Name:</strong> ${medicine.genericName}</p>
//               <p><strong>Price:</strong> ${medicine.price}</p>
//               <hr>
//             `;
//             searchResultsContainer.appendChild(resultItem);
//           });
//         } else {
//           searchResultsContainer.innerHTML = '<p>No medicines found with the given name</p>';
//         }
//       } else {
//         searchResultsContainer.innerHTML = '<p>Error searching for medicines</p>';
//       }
//     })
//     .catch(error => console.error('Error:', error));
// }

function searchMedicine() {
  const searchInput = document.getElementById('searchMedicineInput');
  const searchTerm = searchInput.value.trim();

  if (searchTerm === "") {
    alert("Please enter a search term");
    return;
  }

  // Update the server URL with the correct port (assuming your server is running on localhost)
  const serverURL = 'http://localhost:5000';

  // Make an HTTP request to the server
  fetch(`${serverURL}/api/medicine/search/${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      const searchResultsContainer = document.getElementById('searchResultsContainer');
      searchResultsContainer.innerHTML = ''; // Clear previous results

      if (data.success) {
        const medicines = data.medicines;

        if (medicines && Array.isArray(medicines) && medicines.length > 0) {
          // Create a table
          const table = document.createElement('table');
          table.classList.add('medicine-table');

          // Create table header
          const headerRow = table.insertRow();
          ['Medicine Name', 'Generic Name', 'Price'].forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
          });

          // Populate table with search results
          medicines.forEach(medicine => {
            const row = table.insertRow();
            ['medicineName', 'genericName', 'price'].forEach(prop => {
              const cell = row.insertCell();
              cell.textContent = medicine[prop];
            });
          });

          // Append table to the results container
          searchResultsContainer.appendChild(table);
        } else {
          searchResultsContainer.innerHTML = '<p>No medicines found with the given name</p>';
        }
      } else {
        searchResultsContainer.innerHTML = '<p>Error searching for medicines</p>';
      }
    })
    .catch(error => console.error('Error:', error));
}
