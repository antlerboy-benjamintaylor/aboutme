import { readFileSync, writeFileSync } from 'node:fs';

const path = 'library/manifest.json';
const manifest = JSON.parse(readFileSync(path, 'utf8'));
manifest.updated = '2026-08-31';

const removed = /somerset slt|transduction|joy and work|work and joy/i;
manifest.resources = manifest.resources.filter(resource => !removed.test(resource.title || '') && !/joyandwork\.com|transduction\.systems/i.test(resource.url || ''));

for (const resource of manifest.resources) {
  if (/positive dynamics of differentiation and integration/i.test(resource.title)) {
    resource.url = '/library/files/talks/positive-dynamics-differentiation-and-integration.pdf';
    resource.format = 'PDF';
    resource.description = 'The corrected 2024 ISSS presentation on differentiation, homogenisation, individuation and integration.';
  }
  if (/the prime domino 003/i.test(resource.title)) resource.url = 'https://podcasts.apple.com/gb/podcast/primedomino-003-benjamin-taylor-redquadrant/id974705792?i=1000340913686';
  if (/workshops\.work episode 257/i.test(resource.title)) resource.url = 'https://podcasts.apple.com/us/podcast/257-exploring-the-ethical-lines-between-facilitation/id1456264052?i=1000646218514';
  if (/why service design thinking/i.test(resource.title)) resource.url = 'https://podcasts.apple.com/us/podcast/service-design-in-government-and-public-services/id1104134900?i=1000384105616';
  if (/the ladder of relationality in public service/i.test(resource.title)) resource.description = 'Earlier solo working paper. A substantially updated, co-authored version is available in the preprints collection as Degrees of relationality.';
}

const pages = [
  { slug: 'preprints-and-working-papers', title: 'Preprints and working papers', type: 'collection', description: 'Current substantial manuscripts shared before or outside formal publication.', tags: ['writing', 'preprint'] },
  { slug: 'redquadrant-psta-reference', title: 'RedQuadrant and PSTA reference library', type: 'collection', description: 'Selected public organisational methods, reports and historical reference documents.', tags: ['public-services', 'reference'] },
  { slug: 'chosen-path', title: 'Search Chosen Path', type: 'index', description: 'A keyword catalogue of the public essays and fragments on chosen-path.org.', tags: ['writing', 'index'] },
];
for (const page of pages) {
  const existing = manifest.pages.find(item => item.slug === page.slug);
  if (existing) Object.assign(existing, page);
  else manifest.pages.push(page);
}

const additions = [
  ['Degrees of relationality', '2026', 'Preprint PDF', '/library/files/preprints/2026-degrees-of-relationality-v12-taylor-boxer.pdf', 'Benjamin P Taylor and Philip Boxer, v12.', ['writing', 'public-services', 'preprint'], ['preprints-and-working-papers', 'relational-public-services']],
  ['The demand side of public services', '2026', 'Preprint PDF', '/library/files/preprints/2026-the-demand-side-of-public-services-v9-boxer-taylor.pdf', 'Philip Boxer and Benjamin P Taylor, v9.', ['writing', 'public-services', 'preprint'], ['preprints-and-working-papers', 'relational-public-services']],
  ['Anxiety, ideology and the evacuation of the public realm', '2026', 'Preprint PDF', '/library/files/preprints/2026-anxiety-ideology-and-the-evacuation-of-the-public-realm-v4-boxer-taylor.pdf', 'Philip Boxer and Benjamin P Taylor, v4.', ['writing', 'public-services', 'preprint'], ['preprints-and-working-papers']],
  ['Service systems, citizen ecosystems, and the politics we deny', '2026', 'Preprint PDF', '/library/files/preprints/2026-service-systems-citizen-ecosystems-and-the-politics-we-deny-v3-taylor.pdf', 'Benjamin P Taylor, v3.', ['writing', 'public-services', 'systems', 'preprint'], ['preprints-and-working-papers']],
  ['What can systems thinking and change learn to become?', '2026', 'Chapter appendix', 'https://chosen-path.org/wp-content/uploads/2026/04/benjamin_taylor_what_can_systems_change_learn_to_become_appendix_from_understanding_systems_to_change_the_world.pdf', 'Appendix to Understanding Systems to Change the World.', ['writing', 'systems'], ['articles-and-essays']],
  ['The situation facing UK public libraries and the need to change the status and approach of interlending', '2011', 'Journal article', 'https://doi.org/10.1108/02641611111164618', 'An early peer-reviewed article, included as a curiosity.', ['writing', 'public-services'], ['articles-and-essays']],
  ['Systemic consulting: rethinking the consultant’s role', '2025', 'SCiO public resource', 'https://www.systemspractice.org/resources/systemic-consulting-rethinking-consultants-role-workshop-sysprac25', 'Workshop at SysPrac25.', ['systems', 'consulting', 'scio'], ['talks-and-sessions', 'facilitation-and-systems-consulting']],
  ['Metaphor', '2021', 'SCiO public resource', 'https://www.systemspractice.org/resources/metaphor-presented-scio-development-event', 'Niki Jobson and Benjamin P Taylor.', ['systems', 'scio'], ['talks-and-sessions', 'facilitation-and-systems-consulting']],
  ['The four quadrants of thinking threats', '2021', 'SCiO public resource', 'https://www.systemspractice.org/resources/four-quadrants-thinking-threats', 'A public SCiO resource.', ['systems', 'scio'], ['talks-and-sessions', 'four-quadrants']],
  ['Systems leadership, change, theory and practice', '2023', 'PDF', '/library/files/talks/systems-leadership-change-theory-and-practice.pdf', 'A substantial public presentation.', ['systems', 'leadership'], ['talks-and-sessions', 'systems-leadership-change-practice']],
  ['Five key questions for transformation', '', 'PDF', '/library/files/talks/five-key-questions-for-transformation.pdf', 'A one-page working prompt.', ['public-services', 'practice'], ['talks-and-sessions', 'public-service-transformation']],
  ['Systems convening and boundary work', '2025', 'PDF', '/library/files/talks/systems-convening-and-boundaries.pdf', 'Core slides on convening across boundaries.', ['systems', 'leadership'], ['talks-and-sessions', 'systems-leadership-change-practice']],
  ['Spaces and leadership stands', '2025', 'PDF', '/library/files/talks/spaces-and-leadership-stands.pdf', 'A short working deck.', ['leadership', 'practice'], ['talks-and-sessions', 'systems-leadership-change-practice']],
  ['Introduction to four dynamics', '2023', 'PDF', '/library/files/talks/introduction-to-four-dynamics.pdf', 'A concise introduction to the four dynamics.', ['systems', 'practice'], ['talks-and-sessions', 'four-dynamics']],
  ['A simplification of the Viable System Model', '2023', 'PDF', '/library/files/talks/simplifying-the-viable-system-model.pdf', 'A four-slide introduction.', ['systems', 'vsm'], ['talks-and-sessions', 'viable-system-model']],
  ['Outcomes are the results of complex adaptive systems', '2025', 'PDF', '/library/files/talks/outcomes-and-complex-adaptive-systems.pdf', 'A public-service outcomes presentation.', ['systems', 'public-services'], ['talks-and-sessions', 'outcomes-and-complexity']],
  ['Viable System Model lecture', '2025', 'PDF', '/library/files/talks/viable-system-model-lecture.pdf', 'A long-form teaching deck.', ['systems', 'vsm'], ['talks-and-sessions', 'viable-system-model']],
  ['Power, systems, and the Viable System Model', '2023', 'PDF', '/library/files/talks/power-systems-and-the-viable-system-model.pdf', 'A Metaphorum presentation.', ['systems', 'vsm'], ['talks-and-sessions', 'viable-system-model', 'four-dynamics']],
  ['Clarity practices', '2024', 'PDF', '/library/files/talks/clarity-practices.pdf', 'An extended teaching deck.', ['leadership', 'practice'], ['talks-and-sessions', 'five-core-practices']],
  ['Large-group processes', '2024', 'PDF', '/library/files/talks/large-group-processes.pdf', 'A detailed SCiO teaching deck.', ['practice', 'scio'], ['talks-and-sessions', 'large-group-processes']],
  ['Better conversations for better realities', '2025', 'PDF', '/library/files/talks/better-conversations-for-better-realities.pdf', 'Learning loops to break the devil’s bargain.', ['practice', 'leadership'], ['talks-and-sessions', 'productive-conversations']],
  ['Drawing systems — a primer', '', 'PDF', '/library/files/reference/drawing-systems-primer.pdf', 'A short RedQuadrant visual primer.', ['systems', 'reference'], ['redquadrant-psta-reference']],
  ['Systems archetypes — a primer', '', 'PDF', '/library/files/reference/systems-archetypes-primer.pdf', 'A compact RedQuadrant primer.', ['systems', 'reference'], ['redquadrant-psta-reference']],
  ['Demand management sampler', '', 'PDF', '/library/files/reference/redquadrant-demand-management-sampler.pdf', 'A RedQuadrant whole-system demand reference.', ['public-services', 'reference'], ['redquadrant-psta-reference']],
  ['Seven ways to save and improve — developed account', '', 'PDF', '/library/files/reference/redquadrant-seven-ways-to-save-and-improve.pdf', 'A developed RedQuadrant account.', ['public-services', 'reference'], ['redquadrant-psta-reference']],
  ['Core systems-change slide set', '2020', 'PDF', '/library/files/reference/redquadrant-systems-change-framework.pdf', 'Historical working reference, not a finished publication.', ['systems', 'reference'], ['redquadrant-psta-reference']],
  ['State of emergency — RedQuadrant shadow report', '2018', 'PDF', '/library/files/reference/2018-state-of-transformation-redquadrant-shadow-report.pdf', 'One of the five principal State of Transformation reports.', ['public-services', 'report'], ['redquadrant-psta-reference', 'state-of-transformation', 'reports-and-surveys']],
];

for (const [title, year, format, url, description, tags, resourcePages] of additions) {
  const existing = manifest.resources.find(resource => resource.url === url);
  if (existing) {
    existing.pages = [...new Set([...(existing.pages || []), ...resourcePages])];
    continue;
  }
  manifest.resources.push({ title, year, format, url, description, tags, pages: resourcePages });
}

writeFileSync(path, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Manifest now contains ${manifest.pages.length} pages and ${manifest.resources.length} resources.`);
