const fs = require('fs');

// Array of possible brand names
const sizes = [["S","M","L","XL","XXL"],["S","M","XL"],["L","XL","XXL"],["S","M","L","XXL"],["S","L","XL","XXL"],["S","M","L","XL"],["S","M","XL","XXL"]];

// Load the JSON data from the file
fs.readFile('cloth_db.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Add the "brand" field with a random brand name to each object
    jsonData.womenClothes.forEach(item => {
        item.sizes = sizes[Math.floor(Math.random() * sizes.length)];
    });

    // Convert the modified data back to JSON format
    const updatedData = JSON.stringify(jsonData, null, 2);

    // Write the updated data back to the file
    fs.writeFile('cloth_db.json', updatedData, 'utf8', err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Random sizes added to all objects.');
    });
});
