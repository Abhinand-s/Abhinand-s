const fs = require('fs');

function movePacman(x, y) {
    // Read the README file
    let readme = fs.readFileSync('README.md', 'utf8');

    // Update the Pacman's position in the README
    readme = readme.replace(/P/g, '.'); // Clear previous Pacman position
    const lines = readme.split('\n');
    const row = lines[y + 1];
    const newRow = row.slice(0, x * 4 + 1) + 'P' + row.slice(x * 4 + 2);
    lines[y + 1] = newRow;
    readme = lines.join('\n');

    // Write the updated README file
    fs.writeFileSync('README.md', readme, 'utf8');
}

// Extract x and y coordinates from the issue title
const title = process.argv[2];
const match = title.match(/\((\d+),\s*(\d+)\)/);
if (match) {
    const x = parseInt(match[1]);
    const y = parseInt(match[2]);
    movePacman(x, y);
}
