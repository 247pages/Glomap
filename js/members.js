const profilesContainer = document.getElementById('profiles');

const socialIcons = {
  twitter: 'bi bi-twitter',
  facebook: 'bi bi-facebook',
  instagram: 'bi bi-instagram',
  linkedin: 'bi bi-linkedin',
  github: 'bi bi-github',
  whatsapp: 'bi bi-whatsapp',
  telegram: 'bi bi-telegram',
  discord: 'bi bi-discord',
  default: 'bi bi-link-45deg',
};

const websiteIcon = 'bi bi-globe';

// Load JSON data and render profiles
fetch('/Glomap/json/members.json')
  .then((response) => response.json())
  .then((data) => {
    renderProfiles(data);

    const urlParams = new URLSearchParams(window.location.search);
    const profileId = urlParams.get('id');
    if (profileId) {
      scrollToProfile(profileId);
    }
  })
  .catch((error) => {
    console.error('Error loading member data:', error);
  });

function renderProfiles(members) {
  members.forEach((member) => {
    const profileCard = document.createElement('div');
    profileCard.className = 'profile-card';
    profileCard.id = `profile-${member.id}`;

    const profilePic = document.createElement('img');
    profilePic.src = member.profilePic;
    profilePic.alt = `${member.name}'s profile picture`;
    profilePic.onload = () => profilePic.classList.add('loaded');

    const profileDetails = document.createElement('div');
    profileDetails.className = 'profile-details';

    const name = document.createElement('h2');
    name.textContent = member.name;
    name.style.textAlign = 'center';

    const bio = document.createElement('p');
    bio.textContent = member.bio;

    const roles = document.createElement('p');
    roles.textContent = `Roles: ${member.roles}`;
    roles.className = 'roles';

    const tags = document.createElement('div');
    tags.className = 'profile-tags';
    member.tags?.forEach((tag) => {
      const tagElement = document.createElement('span');
      tagElement.textContent = tag;
      tags.appendChild(tagElement);
    });

    const socialLinksSection = createLinksSection(
      'Social Links',
      member.socialLinks,
      socialIcons
    );

    const projectsLinksSection = createLinksSection(
      'Projects & Work Links',
      member.projectLinks,
      socialIcons
    );

    const websiteLinksSection = createLinksSection(
      'Website Links',
      member.websiteLinks,
      { default: websiteIcon }
    );

    const shareButton = document.createElement('button');
    shareButton.className = 'bi bi-share-fill float-end';
    shareButton.onclick = () => {
      const profileUrl = `${window.location.origin}${window.location.pathname}?id=${member.id}`;
      navigator.share({
        title: `Profile of ${member.name}`,
        url: profileUrl,
      }).catch(console.error);
    };

    profileDetails.append(
      name,
      bio,
      roles,
      tags,
      socialLinksSection,
      projectsLinksSection,
      websiteLinksSection,
      shareButton
    );
    profileCard.append(profilePic, profileDetails);
    profilesContainer.appendChild(profileCard);
  });
}

function createLinksSection(title, links, icons) {
  if (!links || Object.keys(links).length === 0) return ":/";

  const section = document.createElement('div');
  section.className = 'links-section';

  const heading = document.createElement('h5');
  heading.textContent = title;
  section.appendChild(heading);

  const linksContainer = document.createElement('div');
  linksContainer.className = 'links';

  for (const [key, value] of Object.entries(links)) {
    const iconClass = icons[key.toLowerCase()] || icons.default;

    // Check if value is an array
    const urls = Array.isArray(value) ? value : [value];

    urls.forEach((url) => {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.innerHTML = `<i class="${iconClass}"></i>`;
      linksContainer.appendChild(link);
    });
  }

  section.appendChild(linksContainer);
  return section;
}

function scrollToProfile(profileId) {
  const targetProfile = document.getElementById(`profile-${profileId}`);
  if (targetProfile) {
    targetProfile.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
