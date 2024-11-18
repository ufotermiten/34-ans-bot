const fs = require('fs');

/** Function for randomly select a djungelordspråk from a predefined text file
 * 
 * @returns str
 */
function getRandomDjungelordspråk() {
    try {
        const data = fs.readFileSync('djungelordspråk.txt', 'utf-8'); // Read the file synchronously
        const djungelordspråkList = data.split("\r\n");
        djungelordspråkList.pop(); // Remove the last empty element if it exists
        const ordspråk = djungelordspråkList[Math.floor(Math.random() * djungelordspråkList.length)];
        return ordspråk;
    } catch (err) {
        console.error("Error reading file:", err);
    }
}

/** Function for randomly selects a cover for a Dragos issue and gets the image link
 * 
 * @returns str
 */
function getRandomCover() {
    try {
        const data = fs.readFileSync('cover_img_link.txt', 'utf-8'); // Read the file synchronously
        const cover_img_link_list = data.split("\n");
        const cover_img_link = cover_img_link_list[Math.floor(Math.random() * cover_img_link_list.length)];
        return cover_img_link;
    } catch (err) {
        console.error("Error reading file:", err);
    }
}