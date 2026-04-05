/*
  carousel.js
  ──────────────────────────────────────────────────────────────
  Usage:  createCarousel(containerEl, slidesArray)

  slidesArray = [
    { src: "images/sae2022/cad.jpg", caption: "CAD model" },
    ...
  ]

  IMAGE FOLDER STRUCTURE TO CREATE:
  ───────────────────────────────────
  images/
    profile/
      photo.jpg               ← your profile photo
    sae2022/
      01-cad-model.jpg
      02-manufactured.jpg
      03-cfd.jpg
      04-ansys.jpg
      05-flight.jpg
    aerothon2022/
      01-uav-specs.jpg
      02-payload-mechanism.jpg
      03-ansys.jpg
      04-prototype.jpg
    aerothon2023/
      01-cad-model.jpg
      02-uav-specs.jpg
      03-mission-profile.jpg
      04-payload.jpg
      05-cfd.jpg
      06-prototype.jpg
    academic/
      axle/
        01-axle-ansys.jpg
        02-campbell-diagram.jpg
        03-bearing-calc.jpg
      cotton-robot/
        01-prototype.jpg
        02-cad-model.jpg
        03-ansys.jpg
        04-detection.jpg
        05-bom.jpg
      nerf/
        01-exploded-view.jpg
        02-2d-draft.jpg
        03-cad-model.jpg
        04-render.jpg
      jig-fixture/
        01-disassembly.jpg
        02-2d-draft.jpg
        03-cad-model.jpg
      cleaning-robot/
        01-prototype.jpg
        02-cad-model.jpg
        03-circuit.jpg
    achievements/
      sae2022/
        01-team.jpg
        02-certificate.jpg
        03-aircraft.jpg
      addc2023/
        01-team.jpg
        02-certificate.jpg
        03-cad-model.jpg
      aerothon2023/
        01-team.jpg
        02-prototype.jpg
        03-certificate.jpg
    certifications/
      nx-essentials.jpg
      nx-advanced.jpg
      cswa.jpg
      cswa-am.jpg
      autocad.jpg
      gdt.jpg
      ansys-topo.jpg
      cfd-iit.jpg
      automotive-iit.jpg
      python.jpg
      aircraft-workshop.jpg
      defence-workshop.jpg
    research/
      presentation.jpg        ← photo of you presenting / paper first page
*/

function createCarousel(container, slides) {
  if (!container) return;

  if (!slides || slides.length === 0) {
    container.innerHTML = `
      <div class="carousel-placeholder">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.5" style="opacity:0.35">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <path d="M21 15l-5-5L5 21"/>
        </svg>
        <span>Add images to this project</span>
      </div>`;
    return;
  }

  let current = 0;
  const total = slides.length;

  /* track */
  const trackWrap = document.createElement('div');
  trackWrap.className = 'carousel-track-wrap';
  const track = document.createElement('div');
  track.className = 'carousel-track';

  slides.forEach(slide => {
    const s = document.createElement('div');
    s.className = 'carousel-slide';
    const img = document.createElement('img');
    img.src = slide.src;
    img.alt = slide.caption || '';
    img.loading = 'lazy';
    /* graceful fallback if image missing */
    img.onerror = function() {
      this.style.display = 'none';
      const fb = document.createElement('div');
      fb.className = 'carousel-placeholder';
      fb.style.height = '250px';
      fb.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="1.5" style="opacity:0.35">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <path d="M21 15l-5-5L5 21"/></svg>
        <span>${slide.caption || 'Image not found'}</span>`;
      s.insertBefore(fb, s.firstChild);
    };
    s.appendChild(img);
    if (slide.caption) {
      const cap = document.createElement('div');
      cap.className = 'carousel-caption';
      cap.textContent = slide.caption;
      s.appendChild(cap);
    }
    track.appendChild(s);
  });

  trackWrap.appendChild(track);
  container.appendChild(trackWrap);

  /* counter */
  const counter = document.createElement('div');
  counter.className = 'carousel-counter';
  counter.textContent = `1 / ${total}`;
  container.appendChild(counter);

  function goTo(n) {
    current = ((n % total) + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    counter.textContent = `${current + 1} / ${total}`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  const dots = [];

  if (total > 1) {
    /* prev / next */
    const prev = document.createElement('button');
    prev.className = 'carousel-btn prev';
    prev.setAttribute('aria-label', 'Previous');
    prev.innerHTML = '&#8592;';
    const next = document.createElement('button');
    next.className = 'carousel-btn next';
    next.setAttribute('aria-label', 'Next');
    next.innerHTML = '&#8594;';
    container.appendChild(prev);
    container.appendChild(next);
    prev.addEventListener('click', () => goTo(current - 1));
    next.addEventListener('click', () => goTo(current + 1));

    /* dots */
    const dotsEl = document.createElement('div');
    dotsEl.className = 'carousel-dots';
    for (let i = 0; i < total; i++) {
      const d = document.createElement('button');
      d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', `Slide ${i + 1}`);
      d.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(d);
      dots.push(d);
    }
    container.appendChild(dotsEl);

    /* swipe */
    let startX = 0;
    container.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    container.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(current + (diff > 0 ? 1 : -1));
    }, { passive: true });

    /* keyboard when focused */
    container.setAttribute('tabindex', '0');
    container.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  goTo(current - 1);
      if (e.key === 'ArrowRight') goTo(current + 1);
    });
  }
}
