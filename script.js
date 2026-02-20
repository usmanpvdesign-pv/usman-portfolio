AOS.init({duration:1000, once:true});
window.addEventListener("scroll",function(){
  const navbar=document.querySelector(".navbar");
  navbar.classList.toggle("scrolled",window.scrollY>50);
});

/* PARTICLES CONFIG */
if (window.particlesJS) {
  particlesJS('particles-js', {
    "particles":{
      "number":{"value":85,"density":{"enable":true,"value_area":950}},
      "color":{"value":"#ffffff"},
      "opacity":{"value":0.24,"random":true},
      "size":{"value":2.1,"random":true},
      "line_linked":{"enable":false},
      "move":{"enable":true,"speed":0.55,"direction":"none","random":true,"straight":false,"out_mode":"out"}
    },
    "interactivity":{
      "detect_on":"canvas",
      "events":{"onhover":{"enable":false},"onclick":{"enable":false},"resize":true}
    },
    "retina_detect": true
  });
}

/* HERO MICRO PARTICLES */
const heroParticles = document.getElementById('heroParticles');
if (heroParticles) {
  const count = window.innerWidth < 768 ? 26 : 44;
  for (let i = 0; i < count; i += 1) {
    const dot = document.createElement('span');
    dot.className = 'hero-particle';
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    const size = (Math.random() * 2.2) + 1.2;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.opacity = `${(Math.random() * 0.45) + 0.15}`;
    dot.style.animationDuration = `${(Math.random() * 9) + 8}s`;
    dot.style.animationDelay = `${Math.random() * 6}s`;
    heroParticles.appendChild(dot);
  }
}

/* SCROLL PROJECT IMAGE CHANGE */
const projectDetails = document.querySelectorAll('.project-detail');
const projectImage = document.getElementById('projectImage');
const projectCounter = document.getElementById('projectCounter');
const projectVisual = document.getElementById('projectVisual');

const options = {root:document.querySelector('.project-right'), threshold:0.6};

if (projectDetails.length && projectImage) {
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        projectImage.style.opacity = "0.5";
        const img = entry.target.getAttribute('data-img');
        projectImage.src = img;
        const bg = entry.target.getAttribute('data-bg');
        if (projectVisual) {
          const hasSolidBg = Boolean(bg);
          projectVisual.classList.toggle('solid-bg', hasSolidBg);
          projectVisual.style.background = hasSolidBg ? bg : '';
        }
        const index = entry.target.getAttribute('data-index');
        if (projectCounter) {
          const total = String(projectDetails.length).padStart(2, '0');
          const current = String(index).padStart(2, '0');
          projectCounter.innerHTML = `${current} <span>/ ${total}</span>`;
        }
        setTimeout(()=>{ projectImage.style.opacity = "1"; }, 120);
      }
    });
  }, options);

  projectDetails.forEach(detail=>{
    observer.observe(detail);
  });
}

/* EXPERIENCE TIMELINE ACTIVE STATE */
const timelineItems = document.querySelectorAll('.timeline-item');
if (timelineItems.length) {
  const timelineObserver = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
      if (entry.isIntersecting) {
        timelineItems.forEach((item)=>item.classList.remove('is-active'));
        entry.target.classList.add('is-active');
      }
    });
  }, { threshold: 0.45 });

  timelineItems.forEach((item)=>timelineObserver.observe(item));
}

/* INTERACTIVE HOVER TILT */
if (window.matchMedia('(hover: hover)').matches) {
  const cards = document.querySelectorAll('.interactive-card');
  cards.forEach((card)=>{
    card.addEventListener('mousemove', (event)=>{
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 6;
      const rotateX = ((y / rect.height) - 0.5) * -6;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', ()=>{
      card.style.transform = '';
    });
  });
}

/* OLDER EXPERIENCE TOGGLE */
const expToggleBtn = document.getElementById('expToggleBtn');
const olderExp = document.getElementById('olderExp');
if (expToggleBtn && olderExp) {
  expToggleBtn.addEventListener('click', ()=>{
    expToggleBtn.setAttribute('aria-expanded', 'true');
    olderExp.style.maxHeight = `${olderExp.scrollHeight}px`;
    setTimeout(()=>{ expToggleBtn.classList.add('is-hidden'); }, 260);
  });
  window.addEventListener('resize', ()=>{
    if (expToggleBtn.getAttribute('aria-expanded') === 'true') {
      olderExp.style.maxHeight = `${olderExp.scrollHeight}px`;
    }
  });
}
