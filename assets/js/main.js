const b=document.getElementById('mobileMenuBtn');const m=document.getElementById('mobileMenu');if(b&&m){b.onclick=()=>m.classList.toggle('hidden');}

// Simple collage carousel (no dependencies)
// Simple collage carousel with crossfade
(function(){
  const el = document.getElementById('collageCarousel');
  if(!el) return;
  const wrap = document.getElementById('collageWrap');
  const prev = el.querySelector('.prev');
  const next = el.querySelector('.next');
  const dots = el.querySelector('.dots');
  const slides = [
  "assets/images/collage/slide-01.jpg",
  "assets/images/collage/slide-02.jpg",
  "assets/images/collage/slide-03.jpg",
  "assets/images/collage/slide-04.jpg",
  "assets/images/collage/slide-05.jpg",
  "assets/images/collage/slide-06.jpg",
  "assets/images/collage/slide-07.jpg",
  "assets/images/collage/slide-08.jpg",
  "assets/images/collage/slide-09.jpg",
  "assets/images/collage/slide-10.jpg"
];
  let i = 0;

  // Two-layer crossfade
  const imgA = document.createElement('img');
  const imgB = document.createElement('img');
  [imgA, imgB].forEach(img => {
    img.className="absolute inset-0 w-full h-full object-contain p-3 md:p-6 transition-opacity duration-1000"; img.style.transition = "opacity 1000ms ease";;
    img.style.opacity = 0;
    wrap.appendChild(img);
  });
  let showingA = true;

  function updateDots() {
    dots.innerHTML = "";
    slides.forEach((_, idx) => {
      const d = document.createElement('button');
      d.className = "h-2 w-2 rounded-full " + (idx===i ? "bg-slate-800" : "bg-slate-400/70");
      d.onclick = () => { clearInterval(t); show(idx); restart(); };
      dots.appendChild(d);
    });
  }

  function show(index) {
    i = (index + slides.length) % slides.length;
    const front = showingA ? imgB : imgA; // fade-in target
    const back  = showingA ? imgA : imgB; // fade-out source
    const src = slides[i];
    // Start crossfade once the new image loads
    const temp = new Image();
    temp.onload = () => {
      front.src = src;
      front.alt = "Elite Rackz product " + (i+1);
      front.style.opacity = 0;
      back.style.opacity = 1;
      requestAnimationFrame(() => {
        back.style.opacity = 0;
        front.style.opacity = 1;
      });
    };
    temp.src = src;
    updateDots();
    showingA = !showingA;
  }

  prev && (prev.onclick = () => { clearInterval(t); show(i-1); restart(); });
  next && (next.onclick = () => { clearInterval(t); show(i+1); restart(); });

  // Initial state (no fade on first image)
  imgA.src = slides[0];
  imgA.alt = "Elite Rackz product 1";
  imgA.style.opacity = 1;
  updateDots();

  // Auto-rotate every 3s
  let t;
  function restart() { t = setInterval(() => show(i+1), 3000); }
  restart();
  el.addEventListener('mouseenter', () => clearInterval(t));
  el.addEventListener('mouseleave', () => restart());
})();
