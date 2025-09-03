// Carrossel
(function initCarousel(rootId = 'carousel') {
  const root     = document.getElementById(rootId);
  const viewport = root.querySelector('.viewport');
  const track    = root.querySelector('.track');
  const prevBtn  = root.querySelector('.prev');
  const nextBtn  = root.querySelector('.next');

  let index = 0;
  const total = track.children.length;

  function measure() {
    const style = getComputedStyle(track);
    const gap = parseFloat(style.gap) || 0;
    const card = track.querySelector('.card-destinations');
    const cardWidth = card.offsetWidth;
    const viewportWidth = viewport.clientWidth;

    const visible = Math.max(1, Math.floor((viewportWidth + gap) / (cardWidth + gap)));
    const slideSize = cardWidth + gap;
    const maxIndex = Math.max(0, total - visible);

    return { gap, cardWidth, viewportWidth, visible, slideSize, maxIndex };
  }

  function apply(index, m) {
    const x =  -index* m.slideSize;
    track.style.transform = `translateX(${x}px)`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === m.maxIndex;
  }

  function clampIndex(i, m) {
    return Math.max(0, Math.min(i, m.maxIndex));
  }

  function update() {
    const m = measure();
    index = clampIndex(index, m);
    apply(index, m);
  }

  prevBtn.addEventListener('click', () => { index--; update(); });
  nextBtn.addEventListener('click', () => { index++; update(); });

  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { index--; update(); }
    if (e.key === 'ArrowRight') { index++; update(); }
  });
  root.tabIndex = 0;

  const ro = new ResizeObserver(update);
  ro.observe(viewport);

  update();
})();


// Troca de cor
window.addEventListener("DOMContentLoaded", () => {
  const text = document.querySelectorAll(".swap-text-black");
  text.forEach((el) => {
    el.style.color = "#fff";
  });
});

window.addEventListener("scroll", () => {
  const text = document.querySelectorAll(".swap-text-black");

  text.forEach((el) => {
    if (window.scrollY < 550) {
      el.style.color = "#fff";
    } else {
      el.style.color = "#000";
    }
  });
});


window.addEventListener("scroll", () => {
  const icons= document.querySelectorAll(".icons")

  icons.forEach((el) => {
    if(window.scrollY > 550) {
      el.style.filter = "invert(1)"
    }else{
      el.style.filter = "invert(0)"
    }
  })
})



const menu = document.querySelector(".menu")
const nav = document.querySelector(".nav-mobile")

menu.addEventListener("click", () => {
  nav.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (nav.classList.contains("active") && !nav.contains(e.target) && e.target !== menu) {
    nav.classList.remove("active");
  }
});


document.addEventListener("scroll", (e) => {
  if (window.scrollY > 10) {
    nav.classList.remove("active");
  }
});