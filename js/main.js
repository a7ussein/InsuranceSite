// carrier marquee: clone the set for a seamless loop
const track=document.getElementById('marquee-track');
if(track){const half=track.querySelector('.half');track.appendChild(half.cloneNode(true));}

// nav state
const nav=document.getElementById('nav');
const onScroll=()=>{nav.classList.toggle('scrolled',window.scrollY>40)};
onScroll();window.addEventListener('scroll',onScroll,{passive:true});

// reveals
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced && 'IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>{
    es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.15});
  document.querySelectorAll('.rv:not(.in)').forEach(el=>io.observe(el));
}else{
  document.querySelectorAll('.rv').forEach(el=>el.classList.add('in'));
}

// stat counters
function animateCount(el){
  const to=+el.dataset.to, dur=1400, t0=performance.now();
  const step=t=>{
    const p=Math.min((t-t0)/dur,1), eased=1-Math.pow(1-p,3);
    el.textContent=Math.round(to*eased);
    if(p<1)requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
if(!reduced && 'IntersectionObserver' in window){
  const cio=new IntersectionObserver(es=>{
    es.forEach(e=>{if(e.isIntersecting){animateCount(e.target);cio.unobserve(e.target);}});
  },{threshold:.5});
  document.querySelectorAll('.count').forEach(el=>cio.observe(el));
}else{
  document.querySelectorAll('.count').forEach(el=>el.textContent=el.dataset.to);
}

// testimonial rotation
const slides=[...document.querySelectorAll('.t-slide')];
const dots=[...document.querySelectorAll('.t-dot')];
let ti=0,timer;
function show(i){
  ti=i;
  slides.forEach((s,k)=>s.classList.toggle('active',k===i));
  dots.forEach((d,k)=>{d.classList.toggle('active',k===i);d.setAttribute('aria-selected',k===i);});
}
function auto(){timer=setInterval(()=>show((ti+1)%slides.length),7000)}
dots.forEach((d,k)=>d.addEventListener('click',()=>{clearInterval(timer);show(k);if(!reduced)auto();}));
if(!reduced)auto();

// faq single-open
document.querySelectorAll('.faq details').forEach(d=>{
  d.addEventListener('toggle',()=>{
    if(d.open)document.querySelectorAll('.faq details[open]').forEach(o=>{if(o!==d)o.open=false;});
  });
});

// Calendly is now used for scheduling, no custom JS form submission needed.
