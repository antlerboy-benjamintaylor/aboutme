import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const endpoint = 'https://public-api.wordpress.com/wp/v2/sites/chosenpath.wordpress.com/posts';
const output = resolve(process.argv[2] || 'library/chosen-path/catalogue.json');
const stopwords = new Set(`a an and are as at be been being but by can could did do does for from had has have he her here him his how i if in into is it its may me more most my no not of on one only or other our out over she should so some than that the their them then there these they this those through to too under up us very was we were what when where which who why will with would you your`.split(' '));

const topicRules = [
  ['systems', 'Systems, cybernetics, and complexity', ['system', 'systems', 'cybernetic', 'cybernetics', 'complexity', 'complex']],
  ['public-services', 'Public services', ['public service', 'public services', 'council', 'commissioning', 'government']],
  ['relational', 'Relational practice', ['relational', 'relationship', 'relationships', 'human learning systems']],
  ['leadership', 'Leadership and organisation', ['leadership', 'leader', 'organisation', 'organization', 'management']],
  ['change', 'Change and transformation', ['change', 'transformation', 'reform', 'intervention']],
  ['power', 'Power and politics', ['power', 'politics', 'political', 'ideology']],
  ['practice', 'Practice, consulting, and facilitation', ['practice', 'consulting', 'consultant', 'facilitation', 'workshop']],
];

function decodeEntities(text) {
  const named = { amp: '&', apos: "'", quot: '"', lt: '<', gt: '>', nbsp: ' ', ndash: '–', mdash: '—', hellip: '…', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', rarr: '→' };
  return text.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (_, code) => {
    if (code[0] === '#') {
      const hex = code[1].toLowerCase() === 'x';
      return String.fromCodePoint(Number.parseInt(code.slice(hex ? 2 : 1), hex ? 16 : 10));
    }
    return named[code.toLowerCase()] ?? `&${code};`;
  });
}

function plain(html = '') {
  return decodeEntities(decodeEntities(html))
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokens(text) {
  return [...new Set((text.toLowerCase().match(/[a-z0-9][a-z0-9’'-]{1,}/g) || [])
    .map(token => token.replaceAll('’', "'").replace(/^'+|'+$/g, ''))
    .filter(token => token.length > 1 && !stopwords.has(token)))];
}

async function fetchPosts() {
  const posts = [];
  let page = 1;
  let totalPages = 1;
  do {
    const url = new URL(endpoint);
    url.searchParams.set('per_page', '100');
    url.searchParams.set('page', String(page));
    url.searchParams.set('_fields', 'id,date,link,title,excerpt,content');
    const response = await fetch(url, { headers: { 'user-agent': 'antlerboy-library-catalogue/1.0' } });
    if (!response.ok) throw new Error(`Chosen Path API returned ${response.status} for page ${page}`);
    totalPages = Number(response.headers.get('x-wp-totalpages') || totalPages);
    const batch = await response.json();
    posts.push(...batch);
    if (batch.length < 100) totalPages = page;
    page += 1;
  } while (page <= totalPages);
  return posts;
}

const posts = await fetchPosts();
if (!posts.length) throw new Error('Chosen Path returned no public posts.');

const index = Object.create(null);
const documents = posts.map((post, position) => {
  const title = plain(post.title?.rendered);
  const excerpt = plain(post.excerpt?.rendered).slice(0, 420);
  const content = plain(post.content?.rendered);
  const combined = `${title} ${excerpt} ${content}`;
  const lower = combined.toLowerCase();
  const topics = topicRules.filter(([, , rules]) => rules.some(rule => lower.includes(rule))).map(([key]) => key);
  for (const token of tokens(combined)) (index[token] ||= []).push(position);
  return {
    id: post.id,
    date: post.date.slice(0, 10),
    year: post.date.slice(0, 4),
    title,
    url: post.link,
    excerpt,
    topics,
  };
});

const catalogue = {
  generatedAt: new Date().toISOString(),
  source: 'https://chosen-path.org/',
  documents,
  index,
  years: [...new Set(documents.map(document => document.year))].sort((a, b) => b.localeCompare(a)),
  topics: topicRules.map(([key, label]) => ({ key, label })),
};

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, JSON.stringify(catalogue));
console.log(`Indexed ${documents.length} Chosen Path posts in ${output}`);
