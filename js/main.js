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

// form submission
const fBtn = document.getElementById('f-submit');
const fDone = document.getElementById('form-done');
const fErr = document.getElementById('form-error');
const fFields = document.getElementById('form-fields');

if(fBtn){
  fBtn.addEventListener('click', async () => {
    const name = document.getElementById('f-name').value.trim();
    const email = document.getElementById('f-email').value.trim();
    const phone = document.getElementById('f-phone').value.trim();
    const state = document.getElementById('f-state').value.trim();
    const type = document.getElementById('f-type').value;
    const msg = document.getElementById('f-msg').value.trim();

    document.getElementById('f-name').style.borderColor = '';
    document.getElementById('f-email').style.borderColor = '';
    document.getElementById('f-state').style.borderColor = '';

    if(!name || !email || !state){
      if(!name) document.getElementById('f-name').style.borderColor = 'red';
      if(!email) document.getElementById('f-email').style.borderColor = 'red';
      if(!state) document.getElementById('f-state').style.borderColor = 'red';
      return;
    }

    fBtn.disabled = true;
    fBtn.innerHTML = 'Sending...';

    try {
      const res = await fetch('https://formspree.io/f/placeholder_id', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, phone, state, type, message: msg })
      });
      if(res.ok){
        fFields.style.display = 'none';
        fDone.style.display = 'block';
        fErr.style.display = 'none';
      } else {
        throw new Error('Formspree error');
      }
    } catch(err) {
      fErr.style.display = 'block';
      fBtn.disabled = false;
      fBtn.innerHTML = 'Request consultation <span class="arr">→</span>';
    }
  });
}
