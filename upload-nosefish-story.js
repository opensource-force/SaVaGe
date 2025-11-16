//const fs = require('fs').promises;
//const bdo = require('bdo-js');

import fs from 'fs';
import bdo from 'bdo-js';

const hash = 'nosefish-volcano-story';

bdo.baseURL = 'https://dev.bdo.allyabase.com/';

let keys;
const saveKeys = k => keys = k;
const getKeys = () => keys;

// Function to read SVG file
async function readSVG(filename) {
  return await fs.readFileSync(`wwwroot/templates/${filename}`, 'utf-8');
}

// Function to add a button to an SVG
function addButtonToSVG(svgContent, buttons) {
  // Remove closing </svg> tag
  const svgWithoutClosing = svgContent.replace('</svg>', '');

  // Add button group
  let buttonSVG = '\n  <!-- Navigation Buttons -->\n  <g id="navigationButtons">\n';

  buttons.forEach((button, index) => {
    const x = 200 + (index * 150);
    const y = 15;
    const width = 130;
    const height = 45;

    buttonSVG += `    <!-- ${button.label} Button -->\n`;
    buttonSVG += `    <rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${button.color}" stroke="#2C3E50" stroke-width="3" rx="8" spell="next" spell-components='{"bdoPubKey": "${button.pubKey}"}' style="cursor: pointer;">\n`;
    buttonSVG += `      <animate attributeName="opacity" values="1;0.8;1" dur="1.5s" repeatCount="indefinite"/>\n`;
    buttonSVG += `    </rect>\n`;
    buttonSVG += `    <text x="${x + width/2}" y="${y + height/2 + 5}" text-anchor="middle" fill="white" font-family="Georgia, serif" font-size="18" font-weight="bold" pointer-events="none">${button.label}</text>\n`;
  });

  buttonSVG += '  </g>\n';

  // Add closing tag back
  return svgWithoutClosing + buttonSVG + '</svg>';
}

const run = async () => {
  console.log('Starting upload of Nosefish and Volcano story to BDO...\n');

  // Read all SVG files
  const card1SVG = await readSVG('nosefish-volcano-title.svg');
  const card2SVG = await readSVG('nosefish-volcano-card2.svg');
  const card3SVG = await readSVG('nosefish-volcano-card3.svg');
  const card4SVG = await readSVG('nosefish-volcano-card4.svg');
  const card5SVG = await readSVG('nosefish-volcano-card5.svg');
  const card6SVG = await readSVG('nosefish-volcano-card6.svg');

  console.log('All SVG files read successfully.\n');

  // Upload in reverse order to get pubKeys
  const pubKeys = {};

  // Upload Card 6 (ending - no next button)
  console.log('Uploading Card 6 (The Ending)...');
  keys = null;
  const uuid6 = await bdo.createUser(hash, {}, saveKeys, getKeys);
  const card6JSON = {
    bdo: { svgContent: card6SVG },
    public: true,
    svgContent: card6SVG
  };
  await bdo.updateBDO(uuid6, hash, card6JSON, true);
  pubKeys.card6 = keys.pubKey;
  console.log(`Card 6 uploaded. PubKey: ${pubKeys.card6}\n`);

  // Upload Card 5 (with two buttons pointing to Card 6)
  console.log('Uploading Card 5 (The Question)...');
  keys = null;
  const uuid5 = await bdo.createUser(hash, {}, saveKeys, getKeys);
  const card5WithButtons = addButtonToSVG(card5SVG, [
    { label: 'Nosefish', pubKey: pubKeys.card6, color: '#1E90FF' },
    { label: 'Volcano', pubKey: pubKeys.card6, color: '#FF6347' }
  ]);
  const card5JSON = {
    bdo: { svgContent: card5WithButtons },
    public: true,
    svgContent: card5WithButtons
  };
  await bdo.updateBDO(uuid5, hash, card5JSON, true);
  pubKeys.card5 = keys.pubKey;
  console.log(`Card 5 uploaded. PubKey: ${pubKeys.card5}\n`);

  // Upload Card 4 (with next button pointing to Card 5)
  console.log('Uploading Card 4 (Volcano\'s Rebuttal)...');
  keys = null;
  const uuid4 = await bdo.createUser(hash, {}, saveKeys, getKeys);
  const card4WithButtons = addButtonToSVG(card4SVG, [
    { label: 'Next', pubKey: pubKeys.card5, color: '#4A90E2' }
  ]);
  const card4JSON = {
    bdo: { svgContent: card4WithButtons },
    public: true,
    svgContent: card4WithButtons
  };
  await bdo.updateBDO(uuid4, hash, card4JSON, true);
  pubKeys.card4 = keys.pubKey;
  console.log(`Card 4 uploaded. PubKey: ${pubKeys.card4}\n`);

  // Upload Card 3 (with next button pointing to Card 4)
  console.log('Uploading Card 3 (Nosefish\'s Claim)...');
  keys = null;
  const uuid3 = await bdo.createUser(hash, {}, saveKeys, getKeys);
  const card3WithButtons = addButtonToSVG(card3SVG, [
    { label: 'Next', pubKey: pubKeys.card4, color: '#4A90E2' }
  ]);
  const card3JSON = {
    bdo: { svgContent: card3WithButtons },
    public: true,
    svgContent: card3WithButtons
  };
  await bdo.updateBDO(uuid3, hash, card3JSON, true);
  pubKeys.card3 = keys.pubKey;
  console.log(`Card 3 uploaded. PubKey: ${pubKeys.card3}\n`);

  // Upload Card 2 (with next button pointing to Card 3)
  console.log('Uploading Card 2 (The Confrontation)...');
  keys = null;
  const uuid2 = await bdo.createUser(hash, {}, saveKeys, getKeys);
  const card2WithButtons = addButtonToSVG(card2SVG, [
    { label: 'Next', pubKey: pubKeys.card3, color: '#4A90E2' }
  ]);
  const card2JSON = {
    bdo: { svgContent: card2WithButtons },
    public: true,
    svgContent: card2WithButtons
  };
  await bdo.updateBDO(uuid2, hash, card2JSON, true);
  pubKeys.card2 = keys.pubKey;
  console.log(`Card 2 uploaded. PubKey: ${pubKeys.card2}\n`);

  // Upload Card 1 (with next button pointing to Card 2)
  console.log('Uploading Card 1 (Title Card)...');
  keys = null;
  const uuid1 = await bdo.createUser(hash, {}, saveKeys, getKeys);
  const card1WithButtons = addButtonToSVG(card1SVG, [
    { label: 'Begin', pubKey: pubKeys.card2, color: '#4A90E2' }
  ]);
  const card1JSON = {
    bdo: { svgContent: card1WithButtons },
    public: true,
    svgContent: card1WithButtons
  };
  await bdo.updateBDO(uuid1, hash, card1JSON, true);
  pubKeys.card1 = keys.pubKey;
  console.log(`Card 1 uploaded. PubKey: ${pubKeys.card1}\n`);

  console.log('='.repeat(60));
  console.log('All cards uploaded successfully!');
  console.log('='.repeat(60));
  console.log('\nSTART HERE - Card 1 PubKey:');
  console.log(pubKeys.card1);
  console.log('\nAll PubKeys:');
  console.log(JSON.stringify(pubKeys, null, 2));

  // Test retrieval of first card
  console.log('\nTesting retrieval of Card 1...');
  const stack1 = await bdo.getBDO(uuid1, hash, pubKeys.card1);
  console.log('Card 1 retrieved successfully!');

  return pubKeys;
};

run()
  .then(pubKeys => {
    console.log('\n✨ Upload complete! Share this URL to start the story:');
    console.log(`https://dev.bdo.allyabase.com/view/${pubKeys.card1}`);
  })
  .catch(err => {
    console.error('Error during upload:', err);
    process.exit(1);
  });
