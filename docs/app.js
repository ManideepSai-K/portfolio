const info=window.portfolio;
const $=selector=>document.querySelector(selector);
const input=$('#cmd'),menu=$('#menu'),output=$('#output');
const homeItems=[['A','About','about'],['P','Projects','projects'],['S','Skills','skills'],['W','Workbench','workbench'],['C','Contact','contact'],['R','Résumé','resume'],['B','Ask '+info.cat,'byte']];
let cursor=0;
let current='home',choices=[],typingTimer,sound=false,audio;
const messages=[];
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
document.documentElement.style.setProperty('--accent',info.accent);
$('.owner').textContent=info.name+' / '+info.role;
$('#catName').textContent=info.cat;
const thoughts=info.thoughts;
let remaining=[],previous='',paused=false;
function nextThought(){
 if(!remaining.length)remaining=[...thoughts];
 const pool=remaining.filter(line=>line!==previous);
 const options=pool.length?pool:remaining;
 previous=options[Math.floor(Math.random()*options.length)];
 remaining.splice(remaining.indexOf(previous),1);
 $('#thought').textContent=previous;
}
nextThought();
setInterval(()=>{if(!paused&&!document.hidden)nextThought()},18000);
$('#pause').onclick=()=>{
 paused=!paused;
 $('#pause').textContent=paused?'▷':'Ⅱ';
 $('#pause').setAttribute('aria-pressed',String(paused));
 $('#pause').setAttribute('aria-label',paused?'Resume Byte’s rotating thoughts':'Pause Byte’s rotating thoughts');
};
document.querySelectorAll('[data-page]').forEach(button=>{
 button.onclick=()=>{beep();navigate(button.dataset.page);revealMonitor()};
});
function revealMonitor(){
 if(matchMedia('(max-width:760px)').matches)$('.computer').scrollIntoView({block:'center',behavior:reduce.matches?'instant':'smooth'});
}
function element(tag,text){const n=document.createElement(tag);n.textContent=text;return n}
function beep(){
 if(!sound||!audio)return;
 if(!reduce.matches){
  document.querySelectorAll('.meter i').forEach((bar,i)=>{
   bar.getAnimations().forEach(a=>a.cancel());
   bar.animate([{transform:'scaleY(.2)'},{transform:'scaleY(1)',offset:.25},{transform:'scaleY(.2)'}],
    {duration:240+40*i,delay:15*i,easing:'steps(4,end)'});
  });
 }
 const oscillator=audio.createOscillator(),gain=audio.createGain(),now=audio.currentTime;
 oscillator.type='sine';oscillator.frequency.value=390;gain.gain.setValueAtTime(.035,now);gain.gain.exponentialRampToValueAtTime(.001,now+.075);oscillator.connect(gain).connect(audio.destination);oscillator.start(now);oscillator.stop(now+.08);
}
$('#sound').onclick=async()=>{
 try{if(!audio)audio=new AudioContext();await audio.resume();sound=!sound;$('#sound').textContent=sound?'♪ Sound on':'♪ Sound off';$('#sound').setAttribute('aria-pressed',String(sound));beep()}catch{$('#notice').textContent='Audio is unavailable in this browser.'}
};
function paragraph(text){output.append(element('p',text))}
function typeLine(text){
 const p=element('p','');output.append(p);
 if(reduce.matches){p.textContent=text;return}
 p.setAttribute('aria-label',text);const span=document.createElement('span');span.setAttribute('aria-hidden','true');p.append(span);let count=0;
 typingTimer=setInterval(()=>{count+=3;span.textContent=text.slice(0,count);if(count>=text.length)clearInterval(typingTimer)},14);
}
function addLink(label,url,download=false){const a=element('a',label);a.href=url;if(download)a.download=url;output.append(a);return a}
function navigate(page){if(location.hash.slice(1)===page)render(page);else location.hash=page}
function backPage(){return current.startsWith('project-')?'projects':'home'}
function focusPrompt(){if(matchMedia('(pointer:fine)').matches)input.focus({preventScroll:true})}
function render(page){
 if(page==='experience'){location.replace('#about');return}
 const item=homeItems.find(x=>x[2]===page),project=info.projects.find((_,i)=>page==='project-'+(i+1));
 if(!item&&!project&&page!=='home'&&page!=='sketchbook'&&page!=='workbench'){navigate('home');return}
 current=page;menu.classList.toggle('project-list',page==='projects');cursor=0;clearInterval(typingTimer);input.value='';$('#notice').textContent='';menu.replaceChildren();output.replaceChildren();
 $('#path').textContent='~/manideep/'+(project?'projects/'+project.name.toLowerCase():page);
 $('#title').textContent=project?project.name:item?item[1]:'Portfolio files';
 input.placeholder=page==='byte'?'Ask a question…':'Shortcut or :open file…';
 choices=[];
 switch(page){
 case 'home':paragraph(info.intro);choices=['projects','resume','contact','about','skills','workbench','byte'].map(page=>homeItems.find(item=>item[2]===page));break;
 case 'workbench':{
  $('#title').textContent='Tinkering notebook';
  paragraph(info.tinkering);
  const demo=element('div','');demo.className='light-demo';
  const circuit=element('canvas','');circuit.width=150;circuit.height=38;circuit.setAttribute('role','img');circuit.setAttribute('aria-label','Light sensor connected to an Arduino Uno and LED');
  const status=element('span','');status.setAttribute('role','status');
  const toggle=element('button','');let covered=false;
  function updateLight(){
   drawLightCircuit(circuit,covered);
   status.textContent=covered?'Sensor shaded · LED on':'Sensor in light · LED off';
   toggle.textContent=covered?'Uncover sensor':'Cover sensor';
  }
  toggle.onclick=()=>{covered=!covered;updateLight()};
  updateLight();demo.append(circuit,status,toggle);output.append(demo);break;
 }
 case 'sketchbook':{
  $('#title').textContent='Inside my notebook';
  const drawing=element('canvas','');drawing.width=90;drawing.height=54;drawing.className='journal-detail';
  drawing.setAttribute('role','img');drawing.setAttribute('aria-label','Hunter License bookmark, straw hat, grass block and volleyball doodles');
  drawNotebook(drawing);output.append(drawing);
  paragraph('A Hunter License for a bookmark. A One Piece straw hat, a Haikyuu!! volleyball, and a Minecraft grass block in the margins.');
  paragraph(info.interests);break;
 }
 case 'about':paragraph(info.about);paragraph(info.training);break;
 case 'projects':choices=info.projects.map((p,i)=>[String(i+1),p.name,'project-'+(i+1)]);break;
 case 'skills':paragraph(info.skills);break;
 
 case 'resume':{paragraph(info.name+' · '+info.role);const a=addLink('Open résumé PDF ↗',info.resume);a.target='_blank';a.rel='noopener';addLink('Download PDF ↓',info.resume,true);break}
 case 'contact':paragraph('Reach me at '+info.email+'.');addLink('Email ↗','mailto:'+info.email);addLink('GitHub ↗',info.github);addLink('LinkedIn ↗',info.linkedin);break;
 case 'byte':renderChat();break;
 default:
  ['Why I built it','How it works','What to know'].forEach((label,i)=>{
   const row=element('p',''),heading=element('strong',label+' · ');
   heading.className='case-label';row.append(heading,document.createTextNode(project.notes[i]));output.append(row);
  });
  paragraph(project.stack);if(project.url)addLink('Open project ↗',project.url)
 }
 if(page!=='home')choices.push(['X','Back',backPage()]);
 choices.forEach(([key,label,target])=>{const b=element('button','');b.append(element('kbd','['+key+'] '),document.createTextNode(label));if(page==='projects'&&target.startsWith('project-')){
  const summary=element('small',info.projects[Number(key)-1].summary);
  summary.className='project-summary';b.append(summary);
 }b.onclick=()=>{beep();navigate(target)};menu.append(b)});
 selectLine(0);
 $('.interior').scrollTop=0;
 focusPrompt();
}
function renderChat(){
 const log=element('div','');log.className='log';log.setAttribute('role','log');
 if(!messages.length)log.append(element('p','/ᐠ • ˕ •マ   '+info.cat+' here. Ask about a project, my human’s skills, or a hardware experiment.'));
 for(const [question,reply] of messages.slice(-1)){const p=element('p','> '+question);p.className='prompt';log.append(p,element('p',reply))}
 output.replaceChildren(log);log.scrollTop=log.scrollHeight;
}
function answer(question){
 const q=question.toLowerCase(),project=info.projects.find(p=>q.includes(p.name.toLowerCase()));if(project)return project.detail+' Built with '+project.stack+'.';
 if(/thinkpad|tinker|reeves|arduino|hardware|trackpoint/.test(q))return info.tinkering;
 if(/anime|hobb|music|minecraft|free time|doodle|hunter/.test(q))return info.interests;
 if(/intern|workshop|training|experience/.test(q))return info.training;
 if(/college|study|education|graduate|who|about/.test(q))return info.about;
 if(/skill|tool|stack|python|language/.test(q))return info.skills;
 if(/contact|reach|hire|email|linkedin|github/.test(q))return 'You can reach '+info.name+' at '+info.email+'. The Contact menu also has his GitHub and LinkedIn.';
 if(/project|built|machine learning|recommend/.test(q))return info.projects.map(p=>p.name+' — '+p.summary).join('\n\n');
 if(/role|job|looking/.test(q))return 'Manideep builds software, experiments with hardware and studies AI and machine learning. Try asking about a project.';
 return 'That detail isn’t in my notes yet. Try a project name, skills, education, hardware, or contact.';
}
function matchChoice(text){
 const q=text.trim().toLowerCase();
 return choices.find(([key,label,target])=>[key,label,target].some(v=>v.toLowerCase()===q));
}
function selectLine(index){
 cursor=index;
 Array.from(menu.children).forEach((button,i)=>button.classList.toggle('selected',i===index));
 $('#position').textContent=choices.length?(index+1)+'/'+choices.length:'';
 $('#editor-mode').textContent=input.value?'COMMAND':'NORMAL';
}
input.oninput=()=>{
 const match=matchChoice(input.value);
 selectLine(match?choices.indexOf(match):cursor);
 $('#notice').textContent='';
};
$('#command').onsubmit=e=>{
 e.preventDefault();
 const text=input.value.trim();
 const q=text.toLowerCase().replace(/^:/,'');
 const choice=text?matchChoice(q):choices[cursor];
 beep();
 if(choice){navigate(choice[2]);return}
 if(!text)return;
 if(q==='q'||q==='quit'){navigate(backPage());return}
 if(q==='ls'||q==='files'){navigate('home');return}
 const open=q.match(/^(?:open|e|cd|cat) +(.+)$/);
 if(open){
  const file=open[1].replace(/^~?\//,'').replace(/\/$/,'');
  const entry=homeItems.find(([,label,path])=>path===file||label.toLowerCase()===file);
  const project=info.projects.findIndex(p=>p.name.toLowerCase()===file);
  if(entry||project>=0){navigate(entry?entry[2]:'project-'+(project+1));return}
 }
 if(q==='home'||q==='help'){navigate('home');return}
 if(q==='back'){navigate(backPage());return}
 if(current==='byte'){messages.push([text,answer(text)]);input.value='';renderChat();return}
 $('#notice').textContent='Unknown command “'+text+'”. Choose a highlighted key, or type help.';input.select();
};
document.addEventListener('keydown',e=>{
 if(document.querySelector('dialog[open]'))return;
 if(e.isComposing||e.metaKey||e.ctrlKey||e.altKey)return;
 if(e.target===input&&current!=='byte'&&!input.value&&['j','k','ArrowDown','ArrowUp'].includes(e.key)){
  e.preventDefault();selectLine((cursor+(['j','ArrowDown'].includes(e.key)?1:-1)+choices.length)%choices.length);
  menu.children[cursor]?.scrollIntoView({block:'nearest'});return;
 }
 if(e.key==='Escape'&&input.value){e.preventDefault();input.value='';selectLine(cursor);return}
 if(e.key==='Escape'&&current!=='home'){e.preventDefault();navigate(backPage());return}
 if(e.target!==input&&e.key.length===1&&e.key!==' '){e.preventDefault();input.focus();input.value=e.key;input.oninput()}
});
$('#pet').onclick=()=>{beep();navigate('byte');revealMonitor()};
window.addEventListener('hashchange',()=>render(location.hash.slice(1)||'home'));
render(location.hash.slice(1)||'home');

$('#peripherals').onclick=()=>{revealMonitor();input.focus({preventScroll:true})};
let visitorTimer;
$('#star').onclick=()=>{
 clearTimeout(visitorTimer);
 const visitor=$('#visitor');
 visitor.hidden=false;
 visitor.getAnimations().forEach(animation=>animation.cancel());
 if(!reduce.matches)visitor.animate([{left:'-24%'},{left:'105%'}],{duration:5800,easing:'linear',fill:'forwards'});
 $('#discovery').textContent='Secret found · Byte in orbit!';
 beep();
 visitorTimer=setTimeout(()=>{visitor.hidden=true;$('#discovery').textContent=''},6000);
};

let pose=0,nextFlick=0,nextGlint=0;
function randomDelay(min,range){return min+Math.random()*range}
setInterval(()=>{
 if(document.hidden)return;

 if(reduce.matches)return;
 const now=performance.now();
 drawSky(now/1000);
 if(now>=nextFlick){
  const poses=[0,1,2,3,2,1,0];
  drawCat(poses[pose]);
  pose=(pose+1)%poses.length;
  nextFlick=now+(pose?160:randomDelay(2600,4400));
 }
 if(now>=nextGlint){
  const glint=$('#glint');
  glint.style.left=randomDelay(22,68)+'%';glint.style.top=randomDelay(8,34)+'%';
  glint.animate([{opacity:0},{opacity:.8},{opacity:0}],{duration:760,easing:'steps(3,end)'});
  nextGlint=now+randomDelay(5000,8000);
 }
},110);
reduce.addEventListener('change',()=>{drawCat();pose=0});

const licenseDialog=$('#license-dialog');
$('#journal').onclick=()=>licenseDialog.showModal();
licenseDialog.onclick=e=>{if(e.target===licenseDialog)licenseDialog.close()};
let shaded=false;
function showSensor(){
 drawLightCircuit($('#sensor'),shaded);
 $('#sensor-state').textContent=shaded?'LED ON · Uncover':'LED OFF · Cover';
 $('#thinkpad').setAttribute('aria-pressed',String(shaded));
 $('#thinkpad').setAttribute('aria-label',(shaded?'Uncover':'Cover')+' the light sensor on the ThinkPad');
}
$('#thinkpad').onclick=()=>{shaded=!shaded;showSensor()};
showSensor();
const song=$('#desk-audio'),loq=$('#loq');
song.src=info.deskTrack.src;song.volume=.45;$('#track').textContent=info.deskTrack.title;
function updateSong(){
 const playing=!song.paused;
 $('#music-status').textContent=playing?'NOW PLAYING':'DESK PLAYER';
 $('#music-action').textContent=playing?'Ⅱ Pause':'▶ Play';
 loq.setAttribute('aria-pressed',String(playing));
 loq.setAttribute('aria-label',(playing?'Pause ':'Play ')+info.deskTrack.title);
}
song.addEventListener('play',updateSong);song.addEventListener('pause',updateSong);
loq.onclick=async()=>{if(!song.paused){song.pause();return}try{await song.play()}catch{$('#music-action').textContent='Playback unavailable'}};
updateSong();

const curtain=$('#curtain');
const deskLamp=$('#lamp');
function updateLamp(){
 const lit=deskLamp.getAttribute('aria-pressed')==='true';
 const reveal=lit&&document.documentElement.dataset.theme==='night';
 const label=lit?'Turn off the desk lamp':'Turn on the desk lamp';
 deskLamp.setAttribute('aria-label',label);deskLamp.title=label;
 $('.lamp-scene').classList.toggle('lit',lit);
 $('#lamp-note').hidden=!reveal;
 $('#lamp-status').textContent=reveal?'A note appears: Just one more epoch. — Me, 4:07 AM':'';
 drawLamp(lit);
}
deskLamp.onclick=()=>{
 deskLamp.setAttribute('aria-pressed',String(deskLamp.getAttribute('aria-pressed')!=='true'));
 updateLamp();
};
function setRoomLight(day){
 document.documentElement.dataset.theme=day?'day':'night';
 const action=day?'Draw curtains for night':'Open curtains for daylight';
 curtain.setAttribute('aria-label',action);curtain.title=action;
 curtain.firstElementChild.textContent=day?'☾':'☀';
 $('#sky').setAttribute('aria-label',(day?'Sunlight':'Moonrise')+' above a pine-lined lake');
 updateLamp();
 drawSky(performance.now()/1000);
}
let savedLight;
try{savedLight=localStorage.getItem('studio-light')}catch{}
setRoomLight(savedLight==='day');
curtain.onclick=()=>{
 const day=document.documentElement.dataset.theme!=='day';
 setRoomLight(day);
 try{localStorage.setItem('studio-light',day?'day':'night')}catch{}
};
$('#war-book').onclick=()=>$('#book-dialog').showModal();
