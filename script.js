const form=document.querySelector('#inquiry');
const confirmation=document.querySelector('#confirmation');
form.addEventListener('submit',event=>{
 event.preventDefault();
 if(!form.reportValidity())return;
 const data=new FormData(form);
 document.querySelector('#summary').textContent=`お名前：${data.get('name')}\nご希望：${data.get('purpose')}\nメールアドレス：${data.get('email')}\nご相談内容：${data.get('message')||'なし'}`;
 confirmation.hidden=false;
 confirmation.scrollIntoView({block:'center',behavior:'smooth'});
});
form.addEventListener('input',()=>{confirmation.hidden=true;});
document.querySelector('#edit-inquiry').addEventListener('click',()=>{confirmation.hidden=true;form.querySelector('[name="name"]').focus();});
// Sending stays disabled until the owner approves the external test.

const sendButton=document.querySelector('#send-inquiry');
sendButton.disabled=false;
sendButton.textContent='送信する';
sendButton.addEventListener('click',()=>{
 if(!form.reportValidity())return;
 sendButton.disabled=true;
 sendButton.textContent='送信中…';
 form.action=form.dataset.sendEndpoint;
 HTMLFormElement.prototype.submit.call(form);
});

const topButton=document.querySelector('.back-to-top');
const updateTopButton=()=>{const visible=window.scrollY>=120;topButton.classList.toggle("is-visible",visible);topButton.tabIndex=visible?0:-1;topButton.setAttribute("aria-hidden",String(!visible));};
window.addEventListener('scroll',updateTopButton,{passive:true});
window.addEventListener('pageshow',updateTopButton);
updateTopButton();

const menuToggle=document.querySelector('.menu-toggle');
const siteMenu=document.querySelector('#site-menu');
function closeMenu(){siteMenu.classList.remove('is-open');menuToggle.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');menuToggle.innerHTML='メニュー <span aria-hidden="true">☰</span>';}
menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';menuToggle.setAttribute('aria-expanded',String(open));siteMenu.classList.toggle('is-open',open);document.body.classList.toggle('menu-open',open);menuToggle.innerHTML=open?'閉じる <span aria-hidden="true">×</span>':'メニュー <span aria-hidden="true">☰</span>';});
siteMenu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&siteMenu.classList.contains('is-open')){closeMenu();menuToggle.focus();}});

// Reveal content once as it enters the viewport; keep it readable without JS.
if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
 const targets=document.querySelectorAll('.intro-grid article, .section-heading, .work-list article, .support, .conditions dl>div, .visit-panels article, .visit>.note, .flow, .visit>.button, .eligibility, .faq details, .contact-intro, #inquiry');
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-revealed');observer.unobserve(entry.target);}});},{threshold:0,rootMargin:'0px 0px -35px 0px'});
 targets.forEach(el=>{if(el.getBoundingClientRect().top>window.innerHeight){el.classList.add('scroll-reveal');observer.observe(el);}});
}
