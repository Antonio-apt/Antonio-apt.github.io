const { BASE_URL } = import.meta.env;

let resumeData = null;

const t = (field) => {
  if (typeof field === 'string') return field;
  const lang = document.documentElement.lang || 'en';
  return field[lang] || field.en || '';
};

const renderContact = ({ icon, label, value, href }) => `
  <li class="sidebar__contact-item">
    <div class="sidebar__icon-box">
      <ion-icon name="${icon}"></ion-icon>
    </div>
    <div class="sidebar__contact-info">
      <p class="sidebar__contact-title">${t(label)}</p>
      ${href
        ? `<a href="${href}" class="sidebar__contact-link">${value}</a>`
        : `<address>${value}</address>`
      }
    </div>
  </li>`;

const renderSocialLink = ({ icon, href, ariaLabel }) => `
  <li class="sidebar__social-item">
    <a href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${ariaLabel}" class="sidebar__social-link">
      <ion-icon name="${icon}"></ion-icon>
    </a>
  </li>`;

const renderExperienceItem = ({ role, company, companyUrl, date, description }) => `
  <li class="timeline-item">
    <h4 class="h4 timeline-item__title">
      ${role} | <a class="company-name" href="${companyUrl}" target="_blank" rel="noopener noreferrer">${company}</a>
    </h4>
    <span>${t(date)}</span>
    <p class="timeline-item__text">${t(description)}</p>
  </li>`;

const renderBadge = ({ href, title, imgSrc, alt }) => `
  <a class="badge" href="${href}" title="${title}" target="_blank" rel="noopener noreferrer" aria-label="${alt} (Credly)">
    <img class="badge__image" src="${imgSrc}" alt="${alt}" />
  </a>`;

const renderCertItem = ({ title, period, description, badges }) => `
  <li class="timeline-item">
    <h4 class="h4 timeline-item-title">${title}</h4>
    <span>${period}</span>
    <p class="timeline-item__text">
      ${badges ? badges.map(renderBadge).join('') : (description || '')}
    </p>
  </li>`;

const renderEducationItem = ({ institution, period, description }) => `
  <li class="timeline-item">
    <h4 class="h4 timeline-item-title">${institution}</h4>
    <span>${period}</span>
    <p class="timeline-item__text">${t(description)}</p>
  </li>`;

const render = ({ sidebar, experience, certifications, education }) => {
  document.querySelector('.sidebar__name').textContent = sidebar.name;
  document.querySelector('.sidebar__title').textContent = sidebar.title;
  document.querySelector('.sidebar__contacts-list').innerHTML = sidebar.contacts.map(renderContact).join('');
  document.querySelector('.sidebar__social-list').innerHTML = sidebar.social.map(renderSocialLink).join('');
  document.querySelector('#resume-experience').innerHTML = experience.map(renderExperienceItem).join('');
  document.querySelector('#resume-certifications').innerHTML = certifications.map(renderCertItem).join('');
  document.querySelector('#resume-education').innerHTML = education.map(renderEducationItem).join('');
};

export const renderResume = () => {
  if (resumeData) render(resumeData);
};

export default async function initResume() {
  const url = `${BASE_URL || ''}data/resume.json`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load resume: ${res.status}`);
    resumeData = await res.json();
    render(resumeData);
  } catch (err) {
    console.error('resume: could not load data', err);
  }
}
