const fs = require('fs');
const path = require('path');

// === Settings ===
const allureResultsDir = './allure-results';
const categoriesJsonPath = path.join(allureResultsDir, 'categories.json');

// === Extract exact locator selectors ===
function extractLocators() {
  const locators = {};

  const files = fs.readdirSync(allureResultsDir);
  for (const file of files) {
    if (file.endsWith('.json') && !file.startsWith('categories')) {
      const filePath = path.join(allureResultsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');

      try {
        const data = JSON.parse(content);
        if (data.status === 'failed') {
          const message = data.statusDetails?.message || '';
          const match = message.match(/Locator:\s+locator\('(.*?)'\)/);
          if (match) {
            const locator = match[1];
            if (!locators[locator]) {
              locators[locator] = [];
            }
            locators[locator].push(locator);
          }
        }
      } catch (e) {
        console.warn(`Could not parse JSON in file ${file}:`, e.message);
      }
    }
  }

  return locators;
}

// === Escape regex for JSON usage ===
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// === Generate category objects ===
function createCategoriesJson(groups) {
  return Object.entries(groups).map(([locator, _], i) => {
    const regex = `Locator:\\s+locator\\('${escapeRegex(locator)}'\\)`;

    let name = locator;
    if (name.length > 50) {
      name = name.slice(0, 47) + '...';
    }

    return {
      name: `Locator: ${name}`,
      matchedStatuses: ['failed'],
      messageRegex: ".*" + regex + ".*",
    };
  });
}

// === Main ===
function main() {
  const groups = extractLocators();
  const categories = createCategoriesJson(groups);

  fs.writeFileSync(categoriesJsonPath, JSON.stringify(categories, null, 2));
  console.log(`✅ Wrote ${categories.length} locator-based groups to ${categoriesJsonPath}`);
}

main();
