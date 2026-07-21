/* ══════════════════════════════════════════════════════════════
   SEASHELL — main.js
   Preloader · nav · reveal · counters · parallax · particles ·
   hero typewriter · marquee · contact→WhatsApp
═══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── WhatsApp placeholder number ─────────────────────────────
     TODO(cliente): reemplazar por el número real de WhatsApp de
     Seashell en cuanto se proporcione. Formato: 52 + 10 dígitos. */
  var WHATSAPP_NUMBER = '520000000000';

  /* ══════════════════════════════════════
     PRELOADER
  ══════════════════════════════════════ */
  function initLoader(){
    var loader = document.getElementById('loader');
    if(!loader) return;
    document.body.classList.add('is-loading');

    runLoaderPercent();

    var minTime = new Promise(function(res){ setTimeout(res, reduceMotion ? 400 : 2800); });
    var winLoad = new Promise(function(res){
      if(document.readyState === 'complete') return res();
      window.addEventListener('load', res, { once:true });
    });

    Promise.all([minTime, winLoad]).then(function(){
      loader.classList.add('is-exiting');
      document.body.classList.remove('is-loading');
      document.body.classList.add('site-revealed');
      setTimeout(function(){
        loader.setAttribute('aria-hidden','true');
        loader.style.display = 'none';
      }, 1400);
      runHeroTypewriter();
    });
  }

  function runLoaderPercent(){
    var el = document.getElementById('loader-percent');
    if(!el) return;
    if(reduceMotion){ el.textContent = '100%'; return; }
    setTimeout(function(){
      var start = null, dur = 2100;
      function step(ts){
        if(!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        el.textContent = Math.floor(p * 100) + '%';
        if(p < 1) requestAnimationFrame(step);
        else el.textContent = '100%';
      }
      requestAnimationFrame(step);
    }, 100);
  }

  /* ══════════════════════════════════════
     NAVBAR + MOBILE MENU
  ══════════════════════════════════════ */
  function initNav(){
    var navbar = document.getElementById('navbar');
    var onScroll = function(){
      if(window.scrollY > 30) navbar.classList.add('is-scrolled');
      else navbar.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive:true });
    onScroll();

    var burger = document.getElementById('hamburger');
    var mob = document.getElementById('mob-menu');
    var backdrop = document.getElementById('mob-menu-backdrop');
    function closeMenu(){
      burger.setAttribute('aria-expanded','false');
      mob.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
    }
    function openMenu(){
      burger.setAttribute('aria-expanded','true');
      mob.classList.add('is-open');
      backdrop.classList.add('is-open');
      document.body.classList.add('no-scroll');
    }
    burger.addEventListener('click', function(){
      var open = burger.getAttribute('aria-expanded') === 'true';
      open ? closeMenu() : openMenu();
    });
    backdrop.addEventListener('click', closeMenu);
    mob.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });

    /* Active-link highlight on scroll */
    var links = document.querySelectorAll('.nav-links a[href^="#"]');
    var sections = [];
    links.forEach(function(l){
      var sec = document.querySelector(l.getAttribute('href'));
      if(sec) sections.push({ link:l, sec:sec });
    });
    if('IntersectionObserver' in window && sections.length){
      var obs = new IntersectionObserver(function(entries){
        entries.forEach(function(en){
          var match = sections.find(function(s){ return s.sec === en.target; });
          if(!match) return;
          if(en.isIntersecting){
            sections.forEach(function(s){ s.link.style.color = ''; });
            match.link.style.color = 'var(--gold)';
          }
        });
      }, { rootMargin:'-40% 0px -50% 0px' });
      sections.forEach(function(s){ obs.observe(s.sec); });
    }
  }

  /* ══════════════════════════════════════
     SCROLL REVEAL (.reveal + title words)
  ══════════════════════════════════════ */
  function initReveal(){
    var els = document.querySelectorAll('.reveal');
    if(!('IntersectionObserver' in window) || reduceMotion){
      els.forEach(function(el){ el.classList.add('is-visible'); });
    } else {
      var obs = new IntersectionObserver(function(entries){
        entries.forEach(function(en){
          if(en.isIntersecting){
            en.target.classList.add('is-visible');
            obs.unobserve(en.target);
          }
        });
      }, { threshold:.15, rootMargin:'0px 0px -60px 0px' });
      els.forEach(function(el){ obs.observe(el); });
    }

    /* Split section titles into interactive words */
    var titles = document.querySelectorAll('[data-split-title]');
    titles.forEach(function(t){
      var html = t.innerHTML.trim();
      var frag = document.createElement('div');
      frag.innerHTML = html;
      var walker = document.createTreeWalker(frag, NodeFilter.SHOW_TEXT, null);
      var textNodes = [];
      var n;
      while((n = walker.nextNode())) textNodes.push(n);
      textNodes.forEach(function(node){
        var words = node.textContent.split(/(\s+)/);
        var span = document.createDocumentFragment();
        words.forEach(function(w){
          if(w.trim() === ''){ span.appendChild(document.createTextNode(w)); return; }
          var s = document.createElement('span');
          s.className = 'title-word';
          s.textContent = w;
          span.appendChild(s);
        });
        node.parentNode.replaceChild(span, node);
      });
      t.innerHTML = frag.innerHTML;

      var wordEls = t.querySelectorAll('.title-word');
      if(reduceMotion){
        wordEls.forEach(function(w){ w.classList.add('is-visible'); });
      } else if('IntersectionObserver' in window){
        var to = new IntersectionObserver(function(entries){
          entries.forEach(function(en){
            if(en.isIntersecting){
              wordEls.forEach(function(w,i){
                setTimeout(function(){ w.classList.add('is-visible'); }, i*45);
              });
              to.unobserve(en.target);
            }
          });
        }, { threshold:.4 });
        to.observe(t);
      }
    });
  }

  /* ══════════════════════════════════════
     HERO TYPEWRITER + accent
  ══════════════════════════════════════ */
  function runHeroTypewriter(){
    if(reduceMotion) return;
    var accent = document.querySelector('.hero-title .accent');
    if(!accent || accent.dataset.typed) return;
    accent.dataset.typed = '1';
    var full = accent.textContent;
    accent.textContent = '';
    var caret = document.createElement('span');
    caret.className = 'hero-caret';
    accent.parentNode.appendChild(caret);

    var i = 0;
    function type(){
      if(i <= full.length){
        accent.textContent = full.slice(0, i);
        i++;
        setTimeout(type, 55);
      } else {
        setTimeout(function(){ caret.remove(); }, 1400);
      }
    }
    setTimeout(type, 1250);
  }

  /* ══════════════════════════════════════
     COUNTERS
  ══════════════════════════════════════ */
  function initCounters(){
    var nums = document.querySelectorAll('.stat-num[data-count]');
    if(!nums.length) return;
    function animate(el){
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      var dur = 1900, start = null;
      function step(ts){
        if(!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = Math.floor(eased * target);
        el.textContent = val.toLocaleString('es-MX') + suffix;
        if(p < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString('es-MX') + suffix;
      }
      requestAnimationFrame(step);
    }
    if(reduceMotion){
      nums.forEach(function(el){
        el.textContent = el.getAttribute('data-count') + (el.getAttribute('data-suffix')||'');
      });
      return;
    }
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ animate(en.target); obs.unobserve(en.target); }
      });
    }, { threshold:.6 });
    nums.forEach(function(el){ obs.observe(el); });
  }

  /* ══════════════════════════════════════
     PARALLAX (scroll-linked translateY, GPU-cheap)
  ══════════════════════════════════════ */
  function initParallax(){
    if(reduceMotion) return;
    var els = document.querySelectorAll('[data-parallax]');
    if(!els.length) return;
    var ticking = false;
    function update(){
      var vh = window.innerHeight;
      els.forEach(function(el){
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.15;
        var rect = el.closest('section').getBoundingClientRect();
        var center = rect.top + rect.height/2 - vh/2;
        var y = Math.max(-60, Math.min(60, center * -speed * 0.12));
        el.style.setProperty('--parallax-y', y.toFixed(1) + 'px');
      });
      ticking = false;
    }
    window.addEventListener('scroll', function(){
      if(!ticking){ requestAnimationFrame(update); ticking = true; }
    }, { passive:true });
    update();
  }

  /* ══════════════════════════════════════
     PARTICLES — lightweight drifting dots
  ══════════════════════════════════════ */
  function ParticleField(canvas, opts){
    opts = opts || {};
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var particles = [];
    var count = opts.count || 46;
    var colors = opts.colors || ['201,169,106', '199,201,204', '31,138,148'];
    var running = false;
    var rafId = null;

    function resize(){
      var rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr,0,0,dpr,0,0);
    }
    function spawn(){
      particles = [];
      var rect = canvas.getBoundingClientRect();
      for(var i=0;i<count;i++){
        particles.push({
          x: Math.random()*rect.width,
          y: Math.random()*rect.height,
          r: Math.random()*1.6 + .5,
          vx: (Math.random()-.5)*0.12,
          vy: -Math.random()*0.16 - 0.03,
          c: colors[Math.floor(Math.random()*colors.length)],
          a: Math.random()*.5 + .15,
          tw: Math.random()*Math.PI*2
        });
      }
    }
    function tick(){
      if(!running) return;
      var rect = canvas.getBoundingClientRect();
      ctx.clearRect(0,0,rect.width,rect.height);
      particles.forEach(function(p){
        p.x += p.vx; p.y += p.vy; p.tw += 0.02;
        if(p.y < -10) p.y = rect.height + 10;
        if(p.x < -10) p.x = rect.width + 10;
        if(p.x > rect.width+10) p.x = -10;
        var flicker = (Math.sin(p.tw)+1)/2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(' + p.c + ',' + (p.a*(.5+flicker*.5)).toFixed(2) + ')';
        ctx.fill();
      });
      rafId = requestAnimationFrame(tick);
    }
    function start(){
      if(running || reduceMotion) return;
      running = true;
      resize(); spawn();
      rafId = requestAnimationFrame(tick);
    }
    function stop(){
      running = false;
      if(rafId) cancelAnimationFrame(rafId);
      var rect = canvas.getBoundingClientRect();
      ctx.clearRect(0,0,rect.width,rect.height);
    }
    window.addEventListener('resize', function(){ if(running){ resize(); spawn(); } });
    return { start:start, stop:stop };
  }

  function initParticles(){
    var canvases = document.querySelectorAll('canvas[data-particles]');
    if(!canvases.length || reduceMotion) return;
    canvases.forEach(function(cv){
      var field = ParticleField(cv, {
        count: parseInt(cv.getAttribute('data-particles'),10) || 40,
        colors: ['201,169,106','199,201,204','31,138,148']
      });
      var obs = new IntersectionObserver(function(entries){
        entries.forEach(function(en){
          en.isIntersecting ? field.start() : field.stop();
        });
      }, { threshold:.05 });
      obs.observe(cv);
    });
  }

  /* ══════════════════════════════════════
     MARQUEE
  ══════════════════════════════════════ */
  function initMarquee(){
    var track = document.getElementById('marquee');
    if(!track) return;
    var items = [
      'Plata 925', 'Acero con Chapa de Oro', 'Oro Laminado', 'Bandas de Boda',
      'Bolsos & Carteras', 'Perfumes', 'Cinturones', 'Gorras', 'Peluches',
      'Menudeo y Mayoreo'
    ];
    function buildSet(){
      var wrap = document.createDocumentFragment();
      items.forEach(function(txt){
        var span = document.createElement('span');
        span.className = 'marquee-item';
        span.innerHTML = '<i class="fa-solid fa-gem"></i>' + txt;
        wrap.appendChild(span);
      });
      return wrap;
    }
    track.appendChild(buildSet());
    track.appendChild(buildSet());
  }

  /* ══════════════════════════════════════
     CONTACT FORM → WHATSAPP
  ══════════════════════════════════════ */
  function initContactForm(){
    var form = document.getElementById('wa-form');
    if(!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = document.getElementById('f-name').value.trim();
      var interest = document.getElementById('f-interest').value;
      var msg = document.getElementById('f-msg').value.trim();

      if(!name || !msg){
        form.reportValidity ? form.reportValidity() : alert('Completa los campos requeridos.');
        return;
      }

      var text = 'Hola, soy ' + name + '. Me interesa: ' + interest + '.';
      if(msg) text += ' Detalle: ' + msg;

      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
      window.open(url, '_blank', 'noopener,noreferrer');
      form.reset();
    });
  }

  /* ══════════════════════════════════════
     FOOTER YEAR
  ══════════════════════════════════════ */
  function initYear(){
    var y = document.getElementById('year');
    if(y) y.textContent = new Date().getFullYear();
  }

  /* ══════════════════════════════════════
     INIT
  ══════════════════════════════════════ */
  document.addEventListener('DOMContentLoaded', function(){
    initLoader();
    initNav();
    initReveal();
    initCounters();
    initParallax();
    initParticles();
    initMarquee();
    initContactForm();
    initYear();
  });
})();
