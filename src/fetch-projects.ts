import fs from 'fs';

async function run() {
  try {
    console.log('Fetching projects.json...');
    const res = await fetch('https://abdotaher.me/projects.json');
    if (res.ok) {
      const text = await res.text();
      fs.writeFileSync('fetched_projects_json.json', text);
      console.log('Successfully fetched projects.json! Length: ' + text.length);
    } else {
      console.error('Failed to fetch projects.json:', res.statusText);
    }
  } catch (err: any) {
    console.error('Error fetching: ', err.message);
  }
}

run();
