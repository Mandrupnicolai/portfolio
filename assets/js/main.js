/* main.js */

// Hero fade-ups on load
setTimeout(() => {
  document.querySelectorAll('.hero .fade-up').forEach(el => el.classList.add('visible'));
}, 60);

// Scroll reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -24px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Nav scroll state
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 80, behavior: 'smooth' }); }
  });
});

// Project data keyed by skill tag
const PROJECTS = [
  { name: 'QuantForge', desc: 'Production-grade algo-trading backtester. 89 tests, property-based testing, full analytics suite.', tags: ['Python','Pydantic','NumPy','Hypothesis','GitHub Actions','TDD','Property-based testing','mypy','Ruff','CI/CD'], url: 'https://github.com/Mandrupnicolai/quantforge' },
  { name: 'Text-to-SQL Interface', desc: 'Browser-native NL-to-SQL engine with in-memory SQLite, OpenAI integration and CSV export.', tags: ['JavaScript','Node.js','SQLite','REST / OpenAPI'], url: 'https://github.com/Mandrupnicolai/text-to-sql-natural-language-interface' },
  { name: 'Network Vulnerability Scanner', desc: 'LAN device discovery, TCP port scanning, banner grabbing and heuristic risk reporting.', tags: ['Python','JavaScript','REST / OpenAPI'], url: 'https://github.com/Mandrupnicolai/home-network-vulnerability-scanner' },
  { name: 'Hospital Navigation System', desc: 'Multi-tier backend with A* pathfinding for indoor routing. RESTful APIs, CI/CD, containerised deployment.', tags: ['Java','Spring Boot','PostgreSQL','Docker','REST / OpenAPI','CI/CD','Agile / Scrum'], url: 'https://github.com/SW8G3' },
  { name: 'AI Social Media Dashboard', desc: 'Cross-platform mobile app with ML content recognition, real-time data visualisation, JWT auth and Swagger APIs.', tags: ['React Native','React','Flask','Python','PostgreSQL','Docker','GitHub Actions','CI/CD','REST / OpenAPI','Agile / Scrum'], url: 'https://github.com/blobod/Bachelor-Project' },
  { name: 'Garbage Sorting ML Model', desc: 'ML classifier for automated waste sorting. Full data-cleaning pipeline, statistical modelling, Power BI dashboards.', tags: ['Python','Scikit-learn','Pandas','NumPy','SQL'], url: null },
  { name: 'Agent Workflow Automation', desc: 'Automated workflow orchestration using LLM agents demonstrating modern AI integration patterns.', tags: ['Python','REST / OpenAPI'], url: 'https://github.com/Mandrupnicolai/agent-automating-workflow' },
  { name: 'IDA Insurance Dashboards', desc: 'Power BI dashboards for member analytics. Automated reporting pipelines with Excel VBA and Microsoft 365.', tags: ['SQL','VBA','PostgreSQL','Agile / Scrum'], url: null }
];

// Skill pill dropdown
const panel      = document.getElementById('skillPanel');
const panelName  = document.getElementById('skillPanelName');
const panelCount = document.getElementById('skillPanelCount');
const panelCards = document.getElementById('skillPanelCards');
const closeBtn   = document.getElementById('skillPanelClose');
let activeSkill  = null;

function openSkillPanel(skill, btn) {
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  if (activeSkill === skill) { closeSkillPanel(); return; }
  activeSkill = skill;
  btn.classList.add('active');

  const matches = PROJECTS.filter(p => p.tags.includes(skill));
  panelName.textContent  = skill;
  panelCount.textContent = matches.length + ' project' + (matches.length !== 1 ? 's' : '');

  if (matches.length === 0) {
    panelCards.innerHTML = '<p class="sp-no-projects">No projects listed for this skill yet.</p>';
  } else {
    panelCards.innerHTML = matches.map(p => {
      const otherTags = p.tags.filter(t => t !== skill).slice(0, 4).map(t => '<span class="sp-card-tag">' + t + '</span>').join('');
      const inner = '<div class="sp-card-body"><div class="sp-card-title">' + p.name + '</div><div class="sp-card-desc">' + p.desc + '</div><div class="sp-card-tags">' + otherTags + '</div></div>' + (p.url ? '<span class="sp-card-arrow">&#x2197;</span>' : '');
      return p.url
        ? '<a href="' + p.url + '" target="_blank" rel="noopener" class="sp-card">' + inner + '</a>'
        : '<div class="sp-card">' + inner + '</div>';
    }).join('');
  }

  panel.classList.add('open');
  setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
}

function closeSkillPanel() {
  activeSkill = null;
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  panel.classList.remove('open');
}

document.querySelectorAll('.pill[data-skill]').forEach(btn => {
  btn.addEventListener('click', () => openSkillPanel(btn.dataset.skill, btn));
});
closeBtn.addEventListener('click', closeSkillPanel);
