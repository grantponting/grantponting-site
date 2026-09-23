import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('hero presents a simple, static, name-led introduction', async () => {
  const hero = await read('src/components/Hero.astro');

  assert.match(hero, /Hello, I’m/);
  assert.match(hero, /<h1>Grant <span>Ponting<\/span><\/h1>/);
  assert.match(hero, /Software Developer & Quality Engineer/);
  assert.match(hero, /maintainable web applications/);
  assert.match(hero, />View Selected Work</);
  assert.match(hero, />Download Résumé</);
  assert.doesNotMatch(hero, /typed-text|typePhrase|erasePhrase|proof-panel|hero-canvas/);
});

test('experience uses concise achievement bullets and explains concurrent work', async () => {
  const component = await read('src/components/Experience.astro');
  const data = JSON.parse(await read('src/data/experience.json'));
  const serialized = JSON.stringify(data);

  assert.match(component, /job\.highlights\.map/);
  assert.match(serialized, /1,000\+/);
  assert.match(serialized, /50%\+/);
  assert.match(serialized, /500\+/);
  assert.match(serialized, /15\+/);
  assert.match(serialized, /Contract/);
  assert.match(serialized, /Full-time/);
});

test('projects lead with current engineering value rather than career-transition framing', async () => {
  const projects = await read('src/data/projects.json');

  assert.match(projects, /CanyonLight Photography/);
  assert.match(projects, /Astro/);
  assert.match(projects, /Cloudflare/);
  assert.doesNotMatch(projects, /transition from manual QA|successful role transition/i);
});

test('skills reflect software development, quality engineering, and delivery experience', async () => {
  const component = await read('src/components/Skills.astro');
  const skills = await read('src/data/skills.json');

  assert.match(component, /Software Development/);
  assert.match(component, /Quality Engineering/);
  assert.match(component, /Cloud & Delivery/);
  for (const skill of ['Cypress', 'Pytest', 'Detox', 'K6', 'Azure DevOps', 'Git', 'htmx', 'MySQL']) {
    assert.match(skills, new RegExp(skill));
  }
});

test('page order prioritizes selected work and experience', async () => {
  const page = await read('src/pages/index.astro');
  const projectIndex = page.indexOf('<Projects />');
  const experienceIndex = page.indexOf('<Experience />');
  const skillsIndex = page.indexOf('<Skills />');
  const aboutIndex = page.indexOf('<About />');

  for (const index of [projectIndex, experienceIndex, skillsIndex, aboutIndex]) {
    assert.ok(index >= 0, 'every section component must be present');
  }
  assert.ok(projectIndex < experienceIndex);
  assert.ok(experienceIndex < skillsIndex);
  assert.ok(skillsIndex < aboutIndex);
});

test('layout has dynamic SEO metadata and no unused HTMX runtime', async () => {
  const layout = await read('src/layouts/Layout.astro');

  assert.match(layout, /<title>\{title\}<\/title>/);
  assert.match(layout, /property="og:title"/);
  assert.match(layout, /property="og:description"/);
  assert.match(layout, /property="og:image"/);
  assert.match(layout, /name="twitter:card"/);
  assert.match(layout, /type="image\/png" href="\/favicon\.png"/);
  await access(new URL('public/og-card.png', root));
  assert.doesNotMatch(layout, /unpkg\.com\/htmx|htmx\.org/);
});

test('every new-window link is protected and announced', async () => {
  const projects = await read('src/components/Projects.astro');
  const contact = await read('src/components/Contact.astro');

  for (const source of [projects, contact]) {
    const blankLinks = source.match(/<a(?:\s|>)[\s\S]*?target="_blank"[\s\S]*?>/g) ?? [];
    assert.ok(blankLinks.length > 0);
    for (const link of blankLinks) {
      assert.match(link, /rel="noopener noreferrer"/);
      assert.match(link, /opens in a new tab/);
    }
  }
});

test('mobile layouts expose navigation and prevent horizontal overflow', async () => {
  const navbar = await read('src/components/Navbar.astro');
  const globalCss = await read('src/styles/global.css');

  assert.match(navbar, /class="mobile-nav"/);
  assert.match(navbar, /<summary/);
  assert.match(globalCss, /@media \(max-width: 600px\)/);
  assert.match(globalCss, /\.projects-grid\s*\{\s*grid-template-columns:\s*1fr/);
  assert.match(globalCss, /\.cta-group\s*\{\s*flex-wrap:\s*wrap/);
});

test('runtime requirements and keyboard bypass navigation are explicit', async () => {
  const packageData = JSON.parse(await read('package.json'));
  const layout = await read('src/layouts/Layout.astro');
  const page = await read('src/pages/index.astro');

  assert.match(packageData.engines.node, />=22\.12\.0/);
  assert.match(layout, /class="skip-link"/);
  assert.match(page, /<main id="main-content">/);
});

test('core content is not hidden behind scroll-trigger opacity states', async () => {
  const files = await Promise.all([
    read('src/components/Projects.astro'),
    read('src/components/Experience.astro'),
    read('src/components/Skills.astro'),
    read('src/components/Contact.astro'),
  ]);

  for (const source of files) {
    assert.doesNotMatch(source, /gsap\.set\([\s\S]*?opacity:\s*0/);
    assert.doesNotMatch(source, /ScrollTrigger/);
  }
});
