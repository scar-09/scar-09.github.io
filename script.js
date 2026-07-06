document.addEventListener('DOMContentLoaded', function () {

  /* ───────── Nav Scroll ───────── */

  var nav = document.getElementById('nav');
  var ticking = false;

  function updateNav() {
    if (window.scrollY > 30) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  });

  /* ───────── Hero Browser Card Parallax ───────── */

  var heroVisual = document.getElementById('heroVisual');
  var cards = heroVisual ? heroVisual.querySelectorAll('.browser-card') : [];

  if (cards.length > 0) {
    function updateCards(e) {
      var rect = heroVisual.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var deltaX = (e.clientX - cx) / rect.width;
      var deltaY = (e.clientY - cy) / rect.height;

      cards.forEach(function (card, i) {
        var depth = 5 + i * 3;
        var moveX = deltaX * depth;
        var moveY = deltaY * depth * 0.5;
        var rot = i === 0 ? -4 : i === 1 ? 2.5 : -1.5;
        var rotOffset = deltaX * 0.8;
        card.style.transform = 'rotate(' + (rot + rotOffset) + 'deg) translate(' + moveX.toFixed(1) + 'px, ' + moveY.toFixed(1) + 'px)';
      });
    }

    function resetCards() {
      cards.forEach(function (card, i) {
        var rot = i === 0 ? -4 : i === 1 ? 2.5 : -1.5;
        card.style.transform = 'rotate(' + rot + 'deg) translate(0, 0)';
      });
    }

    heroVisual.addEventListener('mousemove', updateCards);
    heroVisual.addEventListener('mouseleave', resetCards);
  }

  /* ───────── Magnetic Buttons ───────── */

  var magneticBtns = document.querySelectorAll('[data-magnetic]');

  magneticBtns.forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var rect = btn.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = 'translate(' + (x * 0.15).toFixed(1) + 'px, ' + (y * 0.15).toFixed(1) + 'px)';
    });

    btn.addEventListener('mouseleave', function () {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  /* ───────── Mobile Nav Toggle ───────── */

  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.getElementById('navMobile');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
      });
    });

    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
      }
    });
  }

  /* ───────── IntersectionObserver Reveal ───────── */

  var revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ───────── Smooth Nav Links ───────── */

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 80;
        var pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    });
  });

});
