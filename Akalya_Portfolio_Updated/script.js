const menuToggle = document.querySelector("#menuToggle");
const siteNav = document.querySelector("#siteNav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const year = document.querySelector("#currentYear");
if (year) year.textContent = new Date().getFullYear();

// Small, local portfolio guide (no external AI service or API key required).
const aiPanel = document.querySelector("#aiPanel");
const aiLauncher = document.querySelector("#aiLauncher");
const aiClose = document.querySelector("#aiClose");
const aiReset = document.querySelector("#aiReset");
const aiForm = document.querySelector("#aiForm");
const aiInput = document.querySelector("#aiInput");
const aiMessages = document.querySelector("#aiMessages");
const aiWelcome = "Hi there! I’m Akalya’s AI assistant 👋\n\nI can tell you about Akalya’s professional journey, skills, projects, education, and certifications. How can I help you today?";

function setChatOpen(open) {
  if (!aiPanel || !aiLauncher) return;
  aiPanel.hidden = !open;
  aiLauncher.hidden = open;
  if (open && aiInput) aiInput.focus();
}
function addChatMessage(text, type) {
  const bubble = document.createElement("div");
  bubble.className = `ai-message ${type === "user" ? "user-message" : "assistant-message"}`;
  bubble.textContent = text;
  const time = document.createElement("small");
  time.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  bubble.appendChild(time);
  aiMessages.appendChild(bubble);
  aiMessages.scrollTop = aiMessages.scrollHeight;
}
function portfolioReply(question) {
  const q = question.toLowerCase();
  if (/yourself|about|who are you|introduc/.test(q)) return "Akalya B is a Computer Science and Engineering graduate (2026) from M. Kumarasamy College of Engineering, Karur. She is interested in software development, web applications, databases, and cloud fundamentals, and enjoys learning by building practical projects.";
  if (/project|hotel/.test(q)) return "Akalya’s featured projects are: Hotel Management System (Java, MySQL, HTML, CSS, JavaScript), Secure Gaze (graphical password authentication), and REHAB 360 (an AI-driven emotion-aware addiction recovery framework). Use the Projects section to open their GitHub repositories.";
  if (/skill|technology|tech stack|program/.test(q)) return "Her toolkit includes Java, Python, JavaScript, HTML, CSS, Spring Boot, MySQL, MongoDB, AWS, Git, GitHub, and VS Code. She is continuing to strengthen her development and problem-solving skills.";
  if (/certif|aws|cloud/.test(q)) return "The portfolio lists a Full-Stack Developer Bootcamp (GeeksforGeeks), Industry 4.0 and Industrial IoT (NPTEL), AWS Certified Cloud Practitioner, and Java Full Stack (Wipro PRP). Open the Certificates section for the supplied certificate links.";
  if (/education|college|cgpa|grade|study/.test(q)) return "Akalya completed B.E. Computer Science and Engineering at M. Kumarasamy College of Engineering, Karur (2022–2026), with a listed CGPA of 8.19/10. Her Higher Secondary score was 90.5% and Secondary score was 82.2%.";
  if (/intern|infosys|wellnest|experience/.test(q)) return "Akalya’s portfolio includes the Infosys Springboard Software Development Internship (remote), with a WellNest AI-based personal health and fitness tracking companion app assignment from November 2025 to January 2026. See the Experience section for the certificate details.";
  if (/paper|publication|ieee|rehab/.test(q)) return "Akalya co-authored/presented the REHAB360 paper at the 2026 IEEE Contemporary Computing Innovations Conference (CCIC 2026). The publication link is available in the Paper section of this portfolio.";
  if (/contact|email|hire|linkedin|github|reach/.test(q)) return "You can reach Akalya at raahulahalya0@gmail.com, connect on LinkedIn at linkedin.com/in/akal2005/, or explore her work at github.com/akal2005. The matching icons at the bottom of the page open those links directly.";
  return "I can help with Akalya’s background, education, skills, projects, internship, certifications, or research paper. Try asking “What projects have you built?” or use the contact links at the bottom to reach her directly.";
}
if (aiLauncher) aiLauncher.addEventListener("click", () => setChatOpen(true));
if (aiClose) aiClose.addEventListener("click", () => setChatOpen(false));
if (aiReset) aiReset.addEventListener("click", () => {
  aiMessages.innerHTML = "";
  addChatMessage(aiWelcome, "assistant");
});
if (aiForm) aiForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = aiInput.value.trim();
  if (!question) return;
  addChatMessage(question, "user");
  addChatMessage(portfolioReply(question), "assistant");
  aiInput.value = "";
  aiInput.focus();
});
document.querySelectorAll(".ai-suggestions button").forEach((button) => {
  button.addEventListener("click", () => {
    const question = button.textContent.trim();
    setChatOpen(true);
    addChatMessage(question, "user");
    addChatMessage(portfolioReply(question), "assistant");
  });
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && aiPanel && !aiPanel.hidden) setChatOpen(false);
});


// Build an email draft from the contact form; no backend or API key required.
const contactForm = document.querySelector("#contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "Portfolio inquiry").trim() || "Portfolio inquiry";
    const message = String(data.get("message") || "").trim();
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:raahulahalya0@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

// Tap/click the digital profile card to flip between the avatar and profile details.
const digitalProfileCard = document.querySelector("#digitalProfileCard");
if (digitalProfileCard) {
  const flipProfileCard = () => digitalProfileCard.classList.toggle("is-flipped");
  digitalProfileCard.addEventListener("click", (event) => {
    if (event.target.closest("a, button")) return;
    flipProfileCard();
  });
  digitalProfileCard.addEventListener("keydown", (event) => {
    if (event.target.closest("a, button")) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      flipProfileCard();
    }
  });
}


// Gentle interactive parallax: stars shift and the card leans toward the pointer.
// Pointer events support mouse, pen, and touch; keyboard flipping remains available.
const spaceBackdrop = document.querySelector('.space-backdrop');
const heroVisual = document.querySelector('.hero-visual');
if (digitalProfileCard && spaceBackdrop && heroVisual) {
  let resetMotion;
  const moveCosmos = (event) => {
    const rect = digitalProfileCard.getBoundingClientRect();
    const px = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
    const py = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
    spaceBackdrop.style.setProperty('--star-shift-x', `${px * -13}px`);
    spaceBackdrop.style.setProperty('--star-shift-y', `${py * -9}px`);
    if (!digitalProfileCard.classList.contains('is-flipped')) {
      digitalProfileCard.style.setProperty('--card-tilt-x', `${px * 2.8}deg`);
      digitalProfileCard.style.setProperty('--card-tilt-y', `${py * -2.2}deg`);
    }
    if (resetMotion) clearTimeout(resetMotion);
    resetMotion = setTimeout(() => {
      spaceBackdrop.style.setProperty('--star-shift-x', '0px');
      spaceBackdrop.style.setProperty('--star-shift-y', '0px');
      digitalProfileCard.style.setProperty('--card-tilt-x', '0deg');
      digitalProfileCard.style.setProperty('--card-tilt-y', '0deg');
    }, 900);
  };
  digitalProfileCard.addEventListener('pointermove', moveCosmos, { passive: true });
  digitalProfileCard.addEventListener('pointerleave', () => {
    spaceBackdrop.style.setProperty('--star-shift-x', '0px');
    spaceBackdrop.style.setProperty('--star-shift-y', '0px');
    digitalProfileCard.style.setProperty('--card-tilt-x', '0deg');
    digitalProfileCard.style.setProperty('--card-tilt-y', '0deg');
  });
}

// Interactive developer terminal: local, safe commands with no backend required.
const terminalForm = document.querySelector('#terminalForm');
const terminalInput = document.querySelector('#terminalInput');
const terminalOutput = document.querySelector('#terminalOutput');
const terminalClear = document.querySelector('#terminalClear');
const terminalCommands = {
  help: 'Available commands: about, skills, projects, education, paper, contact, resume, clear. You can also use the shortcut chips below.',
  about: 'Akalya B is a 2026 Computer Science and Engineering graduate from M. Kumarasamy College of Engineering, Karur, interested in software development and practical web applications.',
  skills: 'Java · Python · JavaScript · HTML · CSS · Node.js · MySQL · MongoDB · AWS · Git · GitHub · VS Code.',
  education: 'B.E. CSE at M. Kumarasamy College of Engineering (2022–2026), CGPA 8.19/10. Higher Secondary: 90.5%. Secondary: 82.2%.',
  contact: 'Email: raahulahalya0@gmail.com · LinkedIn: linkedin.com/in/akal2005/ · GitHub: github.com/akal2005.' ,
  resume: 'Your résumé is available at assets/resume.pdf. Use the résumé download button in Get in Touch or open it here: '
};
function terminalLine(text, isCommand=false) {
  if (!terminalOutput) return;
  const line = document.createElement('p');
  if (isCommand) { const prompt = document.createElement('span'); prompt.className='terminal-prompt'; prompt.textContent='➜'; line.append(prompt, document.createTextNode(' ')); }
  line.append(document.createTextNode(text));
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}
function runTerminalCommand(raw) {
  const command = String(raw || '').trim().toLowerCase();
  if (!command || !terminalOutput) return;
  if (command === 'clear') { terminalOutput.replaceChildren(); terminalInput?.focus(); return; }
  terminalLine(command, true);
  if (command === 'projects') {
    terminalLine('Featured projects:');
    const list = document.createElement('p');
    [['Hotel Management System','https://github.com/akal2005/Hotel-Management-Project-Java'],['Secure Gaze','https://github.com/akal2005/Secure-gaze-project'],['REHAB 360','https://github.com/akal2005/REHAB-360']].forEach(([label,url],i)=>{ if(i) list.append(document.createTextNode(' · ')); const a=document.createElement('a'); a.href=url; a.target='_blank'; a.rel='noopener noreferrer'; a.textContent=label; list.append(a); });
    terminalOutput.appendChild(list); terminalOutput.scrollTop=terminalOutput.scrollHeight; return;
  }
  if (command === 'paper') {
    terminalLine('REHAB360 · AI-Driven Emotion-Aware and Predictive Addiction Recovery Framework · IEEE CCIC 2026.');
    const a=document.createElement('a'); a.href='https://ieeexplore.ieee.org/document/11486023'; a.target='_blank'; a.rel='noopener noreferrer'; a.textContent='Open paper on IEEE Xplore ↗'; terminalOutput.appendChild(a); terminalOutput.scrollTop=terminalOutput.scrollHeight; return;
  }
  if (command === 'resume') {
    terminalLine(terminalCommands.resume);
    const a=document.createElement('a'); a.href='assets/resume.pdf'; a.target='_blank'; a.rel='noopener noreferrer'; a.textContent='Open résumé PDF ↗'; terminalOutput.appendChild(a); terminalOutput.scrollTop=terminalOutput.scrollHeight; return;
  }
  terminalLine(terminalCommands[command] || (command === 'clear' ? '' : `Command not found: ${command}. Type help to see available commands.`));
  if (command === 'contact') { const a=document.createElement('a'); a.href='mailto:raahulahalya0@gmail.com'; a.textContent='Email Akalya ↗'; terminalOutput.appendChild(a); }
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}
if (terminalForm && terminalInput) terminalForm.addEventListener('submit', event => { event.preventDefault(); runTerminalCommand(terminalInput.value); terminalInput.value=''; });
document.querySelectorAll('[data-command]').forEach(button => button.addEventListener('click', () => { runTerminalCommand(button.dataset.command); if (terminalInput) terminalInput.value=''; }));
if (terminalClear) terminalClear.addEventListener('click', () => { if (terminalOutput) terminalOutput.replaceChildren(); terminalInput?.focus(); });


// Quick action: copy email, with a graceful fallback for local preview environments.
const copyEmailButton = document.querySelector('#copyEmailButton');
const copyEmailStatus = document.querySelector('#copyEmailStatus');
if (copyEmailButton) copyEmailButton.addEventListener('click', async () => {
  const email = copyEmailButton.dataset.email || 'raahulahalya0@gmail.com';
  try {
    if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(email);
    else { const temp = document.createElement('textarea'); temp.value=email; temp.style.position='fixed'; temp.style.opacity='0'; document.body.appendChild(temp); temp.select(); const copied=document.execCommand('copy'); temp.remove(); if(!copied) throw new Error('Copy unavailable'); }
    if (copyEmailStatus) copyEmailStatus.textContent = 'Email copied to clipboard!';
  } catch { if (copyEmailStatus) copyEmailStatus.textContent = `Email: ${email}`; }
});
