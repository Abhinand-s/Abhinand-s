const fetch = require('node-fetch');
const fs = require('fs');

async function fetchData() {
  try {
    const response = await fetch('https://api.github.com/repos/Abhinand-s/Abhinand-s/issues?state=all');
    const data = await response.json();
    const issues = data.slice(0, 9);

    const usernamesAndTitles = issues.map(issue => `- Issue by @${issue.user.login}: ${issue.title}`);

    console.log('Usernames and Titles:', usernamesAndTitles);

    const readme = fs.readFileSync('README.md', 'utf8');
    const updatedReadme = readme.replace(
      /<!-- START_RECENTLY_PLAYED_GAMES -->[\s\S]*?<!-- END_RECENTLY_PLAYED_GAMES -->/m,
      `<!-- START_RECENTLY_PLAYED_GAMES -->\n${usernamesAndTitles.join('\n')}\n<!-- END_RECENTLY_PLAYED_GAMES -->`
    );

    fs.writeFileSync('README.md', updatedReadme, 'utf8');
    console.log('README.md updated successfully!');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();
