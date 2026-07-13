/* phone formatter */
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', function(e) {
    let v = e.target.value.replace(/\D/g,'');
    if (v.length <= 3) { e.target.value = v; return; }
    if (v.length <= 6) { e.target.value = '('+v.slice(0,3)+') '+v.slice(3); return; }
    e.target.value = '('+v.slice(0,3)+') '+v.slice(3,6)+'-'+v.slice(6,10);
  });
}

/* scroll reveal */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target); } });
}, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* form submit mockup */
const applyForm = document.getElementById('apply-form');
if (applyForm) {
  applyForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const btn = document.getElementById('submit-btn');
    const toastOk = document.getElementById('toast-ok');
    const toastErr = document.getElementById('toast-err');
    let valid = true;

    /* validate required text fields */
    ['first_name','last_name','phone','age','state'].forEach(id => {
      const el = document.getElementById(id);
      if (el && !el.value.trim()) {
        el.style.borderColor = 'var(--red)';
        el.style.boxShadow = '0 0 0 3px rgba(220,38,38,0.13)';
        valid = false;
      } else if (el) {
        el.style.borderColor = 'var(--border)';
        el.style.boxShadow = 'none';
      }
    });

    const hc = form.querySelector('input[name="has_coverage"]:checked');
    const covGrp = document.getElementById('cov-group');
    if (covGrp) {
      if (!hc) { covGrp.style.outline='2px solid var(--red)'; covGrp.style.borderRadius='8px'; valid=false; }
      else { covGrp.style.outline='none'; }
    }

    if (!valid) {
      window.scrollTo({ top: document.getElementById('apply').offsetTop - 90, behavior: 'smooth' });
      return;
    }

    /* mockup success state */
    btn.classList.add('loading');
    btn.innerHTML = 'Sending...';
    
    setTimeout(() => {
      btn.classList.remove('loading');
      form.style.display = 'none';
      if (toastOk) {
        toastOk.style.display = 'flex';
      }
    }, 1200);
  });
}
