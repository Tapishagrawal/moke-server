const fs = require('fs');

// Load the JSON data from the file
fs.readFile('cloth_db.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Merge "menClothes" and "womenClothes" arrays into a new array
    const mergedClothes = [...jsonData.menClothes, ...jsonData.womenClothes];

    // Randomize the order of objects in the merged array
    for (let i = mergedClothes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mergedClothes[i], mergedClothes[j]] = [mergedClothes[j], mergedClothes[i]];
    }

    // Convert the merged and shuffled data back to JSON format
    jsonData.mergedClothes = mergedClothes;

    // Remove the separate "menClothes" and "womenClothes" arrays if needed
    delete jsonData.menClothes;
    delete jsonData.womenClothes;

    // Convert the modified data back to JSON format
    const updatedData = JSON.stringify(jsonData, null, 2);

    // Write the updated data back to the file
    fs.writeFile('cloth_db.json', updatedData, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Merged and shuffled clothes data.');
    });
});
