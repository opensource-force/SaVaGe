import fs from 'fs';
import bdo from 'bdo-js';

const hash = 'nosefish-orange-volcano-blueberry-story';

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
  console.log('Starting upload of Nosefish and Orange Volcano story to BDO...\n');

  // Read all SVG files
  const card1SVG = await readSVG('nosefish-orange-volcano-card1.svg');
  const card2SVG = await readSVG('nosefish-orange-volcano-card2.svg');
  const card3SVG = await readSVG('nosefish-orange-volcano-card3.svg');
  const card4SVG = await readSVG('nosefish-orange-volcano-card4.svg');

  console.log('All SVG files read successfully.\n');

  // Upload in reverse order to get pubKeys
  const pubKeys = {};

  // Upload Card 4 (ending - no next button)
  console.log('Uploading Card 4 (The Feast)...');
  keys = null;
  const uuid4 = await bdo.createUser(hash, {}, saveKeys, getKeys);
  const card4JSON = {
    bdo: { svgContent: card4SVG },
    public: true,
    svgContent: card4SVG
  };
  await bdo.updateBDO(uuid4, hash, card4JSON, true);
  pubKeys.card4 = keys.pubKey;
  console.log(`Card 4 uploaded. PubKey: ${pubKeys.card4}\n`);

  // Upload Card 3 (with next button pointing to Card 4)
  console.log('Uploading Card 3 (Blueberry Explosion!)...');
  keys = null;
  const uuid3 = await bdo.createUser(hash, {}, saveKeys, getKeys);
  const card3WithButtons = addButtonToSVG(card3SVG, [
    { label: 'Next', pubKey: pubKeys.card4, color: '#667BC6' }
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
  console.log('Uploading Card 2 (The Hat Offering)...');
  keys = null;
  const uuid2 = await bdo.createUser(hash, {}, saveKeys, getKeys);
  const card2WithButtons = addButtonToSVG(card2SVG, [
    { label: 'Next', pubKey: pubKeys.card3, color: '#9C27B0' }
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
  console.log('Uploading Card 1 (Don\'t Explode!)...');
  keys = null;
  const uuid1 = await bdo.createUser(hash, {}, saveKeys, getKeys);
  const card1WithButtons = addButtonToSVG(card1SVG, [
    { label: 'Begin', pubKey: pubKeys.card2, color: '#FF8C00' }
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
