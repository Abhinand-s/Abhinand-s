const fetch = require('node-fetch');
const fs = require('fs');

async function fetchData() {
  const response = await fetch('https://api.github.com/repos/Abhinand-s/Abhinand-s/issues?state=all');
  const data = await response.json();
  const usernames = data.slice(0, 9).map(issue => issue.user.login);

  const readme = fs.readFileSync('README.md', 'utf8');
  const updatedReadme = readme.replace(/## Recently Played Games[\s\S]*?##/m, `## Recently Played Games\n\n${usernames.map(username => `- Issue by [${username}](https://github.com/${username})`).join('\n')}\n\n##`);

  fs.writeFileSync('README.md', updatedReadme, 'utf8');
}

fetchData().catch(console.error);
