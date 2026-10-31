(() => {
 const stories=[
  {title:'Coffee', detail:'Big fan of specialty coffee, especially lattes. Coffee Collective and SEY are my favorite roasteries.',src:'coffee.jpg',alt:'Lattes at Coffee Collective',position:'center 78%'},
  {title:'Travel',detail:'I love traveling! My friend Chris and me in Copenhagen, 2026.',src:'travel.jpg',alt:'Albert and Chris in Copenhagen',position:'center 60%'},
  {title:'Powerlifting',detail:'I’m a powerlifter! Here’s my 506 lb squat in a competition back in 2025.',src:'powerlifting.mp4',video:true},
  {title:'Olympic Weightlifting',detail:'I’m also a weightlifter! My 264 lb clean and jerk at USAW Nationals 2026.',src:'weightlifting-trimmed.mp4',video:true},
  {title:'Outdoors',detail:'I enjoy wandering outdoors. Exploring Yosemite with two of my homies.',src:'outdoors.jpeg',alt:'Three friends exploring Yosemite',position:'center 76%'},
  {title:'Baking',detail:'Matcha roll cakes I made with my friend Frank!',src:'baking.jpg',alt:'Homemade matcha roll cakes',position:'center 75%'}
 ];
 const kind=document.body.dataset.vignetteView;
 const photo=document.querySelector('.profile-photo');
 const img=photo.querySelector('img');
 const trigger=document.createElement('button');
 trigger.className='life-trigger';trigger.type='button';trigger.setAttribute('aria-label','Explore life outside research');trigger.setAttribute('aria-expanded','false');trigger.setAttribute('aria-controls','life-panel');
 img.replaceWith(trigger);trigger.append(img);
 const panel=document.createElement(kind==='photo-viewer'?'dialog':'section');
 panel.id='life-panel';panel.className='life-panel';panel.setAttribute('aria-label','Life outside research');
 if(kind!=='photo-viewer') panel.hidden=true;
 panel.innerHTML=`<div class="life-content"><div class="life-media"></div><div class="life-copy"><h2 class="life-title"></h2><p class="life-detail"></p><div class="life-topics" aria-label="Choose a vignette"></div></div></div>`;
 if(kind==='postcard') photo.append(panel);else if(kind==='story-panel') document.querySelector('.profile-header').after(panel);else document.body.append(panel);
 let index=-1,opened=false;
 const media=panel.querySelector('.life-media');
 const topics=panel.querySelector('.life-topics');
 stories.forEach((story,i)=>{const b=document.createElement('button');b.type='button';b.textContent=story.title;b.addEventListener('click',()=>render(i));topics.append(b);});
 function render(i){
  index=(i+stories.length)%stories.length; const story=stories[index];
  const old=media.querySelector('video');if(old)old.pause();
  media.replaceChildren();
  const el=document.createElement(story.video?'video':'img');el.src='static/media/life/'+story.src;
  if(story.video){el.controls=true;el.muted=true;el.defaultMuted=true;el.autoplay=true;el.playsInline=true;el.preload='metadata';el.setAttribute('aria-label',story.detail);el.addEventListener('pointerenter',()=>el.play().catch(()=>{}));}
  else {el.alt=story.alt;el.style.objectPosition=story.position;}
  media.append(el);
  if(story.video)el.play().catch(()=>{});
  panel.querySelector('.life-title').textContent=story.title;
  panel.querySelector('.life-detail').textContent=story.detail;
  [...topics.children].forEach((b,n)=>b.setAttribute('aria-pressed',String(n===index)));
 }
 function open(){if(opened)return;render(index+1);opened=true;trigger.setAttribute('aria-expanded','true');if(kind==='photo-viewer')panel.showModal();else panel.hidden=false;}
 function close(){clearTimeout(leaveTimer);opened=false;trigger.setAttribute('aria-expanded','false');media.querySelector('video')?.pause();if(kind==='photo-viewer')panel.close();else panel.hidden=true;}
 let leaveTimer;
 function cancelLeave(){clearTimeout(leaveTimer);}
 function leave(e){
  if(kind!=='postcard'||e.pointerType!=='mouse')return;
  const next=e.relatedTarget;
  if(next&&(trigger.contains(next)||panel.contains(next)))return;
  cancelLeave();
  // Allow crossing the narrow gap between the portrait and postcard.
  leaveTimer=setTimeout(close,100);
 }
 trigger.addEventListener('pointerenter',e=>{cancelLeave();if(e.pointerType==='mouse')open();});
 trigger.addEventListener('pointerleave',leave);
 panel.addEventListener('pointerenter',cancelLeave);
 panel.addEventListener('pointerleave',leave);
 trigger.addEventListener('click',open);
 panel.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();render(index+1);}if(e.key==='ArrowLeft'){e.preventDefault();render(index-1);}});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&opened)close();});
 panel.addEventListener('cancel',e=>{e.preventDefault();close();});
 document.addEventListener('click',e=>{if(opened&&!panel.contains(e.target)&&!trigger.contains(e.target))close();});
 panel.addEventListener('click',e=>{if(kind==='photo-viewer'&&e.target===panel)close();});
})();
