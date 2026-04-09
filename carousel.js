/*
  carousel.js — image carousel with auto-advance
  ─────────────────────────────────────────────────────────────
  AUTO-ADVANCE SPEED: change the number below (milliseconds)
  1500 = 1.5 seconds, 2000 = 2 seconds, 3000 = 3 seconds
*/
var AUTOPLAY_DELAY = 5000;

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

  var current = 0;
  var total = slides.length;
  var autoTimer = null;
  var progressTimer = null;

  /* ── track ── */
  var trackWrap = document.createElement('div');
  trackWrap.className = 'carousel-track-wrap';
  var track = document.createElement('div');
  track.className = 'carousel-track';

  slides.forEach(function(slide) {
    var s = document.createElement('div');
    s.className = 'carousel-slide';
    var img = document.createElement('img');
    img.src = slide.src;
    img.alt = slide.caption || '';
    img.loading = 'lazy';
    img.onerror = function() {
      this.style.display = 'none';
      var fb = document.createElement('div');
      fb.className = 'carousel-placeholder';
      fb.innerHTML = `
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.5" style="opacity:0.35">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <path d="M21 15l-5-5L5 21"/>
        </svg>
        <span>${slide.caption || 'Image not found'}</span>`;
      s.insertBefore(fb, s.firstChild);
    };
    s.appendChild(img);
    if (slide.caption) {
      var cap = document.createElement('div');
      cap.className = 'carousel-caption';
      cap.textContent = slide.caption;
      s.appendChild(cap);
    }
    track.appendChild(s);
  });

  trackWrap.appendChild(track);
  container.appendChild(trackWrap);

  /* ── counter ── */
  var counter = document.createElement('div');
  counter.className = 'carousel-counter';
  counter.textContent = '1 / ' + total;
  container.appendChild(counter);

  /* ── progress bar ── */
  var progressWrap = document.createElement('div');
  progressWrap.className = 'carousel-progress';
  var progressBar = document.createElement('div');
  progressBar.className = 'carousel-progress-bar';
  progressWrap.appendChild(progressBar);
  container.appendChild(progressWrap);

  var dots = [];

  /* ── go to slide ── */
  function goTo(n) {
    current = ((n % total) + total) % total;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    counter.textContent = (current + 1) + ' / ' + total;
    dots.forEach(function(d, i) {
      d.classList.toggle('active', i === current);
    });
    resetProgress();
  }

  /* ── progress bar animation ── */
  function resetProgress() {
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    /* force reflow */
    progressBar.offsetWidth;
    progressBar.style.transition = 'width ' + AUTOPLAY_DELAY + 'ms linear';
    progressBar.style.width = '100%';
  }

  /* ── autoplay ── */
  function startAuto() {
    stopAuto();
    resetProgress();
    autoTimer = setInterval(function() {
      goTo(current + 1);
    }, AUTOPLAY_DELAY);
  }

  function stopAuto() {
    clearInterval(autoTimer);
    clearTimeout(progressTimer);
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
  }

  function resumeAuto() {
    /* restart after manual interaction with short delay */
    progressTimer = setTimeout(function() {
      startAuto();
    }, 800);
  }

  if (total > 1) {
    /* ── prev / next buttons ── */
    var prev = document.createElement('button');
    prev.className = 'carousel-btn prev';
    prev.setAttribute('aria-label', 'Previous');
    prev.innerHTML = '&#8592;';

    var next = document.createElement('button');
    next.className = 'carousel-btn next';
    next.setAttribute('aria-label', 'Next');
    next.innerHTML = '&#8594;';

    container.appendChild(prev);
    container.appendChild(next);

    prev.addEventListener('click', function() {
      stopAuto();
      goTo(current - 1);
      resumeAuto();
    });

    next.addEventListener('click', function() {
      stopAuto();
      goTo(current + 1);
      resumeAuto();
    });

    /* ── dots ── */
    var dotsEl = document.createElement('div');
    dotsEl.className = 'carousel-dots';
    for (var i = 0; i < total; i++) {
      (function(idx) {
        var d = document.createElement('button');
        d.className = 'carousel-dot' + (idx === 0 ? ' active' : '');
        d.setAttribute('aria-label', 'Slide ' + (idx + 1));
        d.addEventListener('click', function() {
          stopAuto();
          goTo(idx);
          resumeAuto();
        });
        dotsEl.appendChild(d);
        dots.push(d);
      })(i);
    }
    container.appendChild(dotsEl);

    /* ── swipe ── */
    var startX = 0;
    container.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
      stopAuto();
    }, { passive: true });
    container.addEventListener('touchend', function(e) {
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(current + (diff > 0 ? 1 : -1));
      resumeAuto();
    }, { passive: true });

    /* ── keyboard ── */
    container.setAttribute('tabindex', '0');
    container.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft')  { stopAuto(); goTo(current - 1); resumeAuto(); }
      if (e.key === 'ArrowRight') { stopAuto(); goTo(current + 1); resumeAuto(); }
    });

    /* ── pause on hover ── */
    container.addEventListener('mouseenter', function() { stopAuto(); });
    container.addEventListener('mouseleave', function() { resumeAuto(); });

    /* ── start autoplay ── */
    startAuto();
  }
}
