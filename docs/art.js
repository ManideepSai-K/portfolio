// The room is painted on a low-resolution grid so the scenery stays crisp at every size.
function brushes(canvas) {
  const ctx=canvas.getContext('2d');
  const rect=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))};
  function frame(x,y,w,h,c,fill){rect(x,y,w,h,c);rect(x+1,y+1,w-2,h-2,fill)}
  function poly(points,c){ctx.fillStyle=c;ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fill()}
  function disk(x,y,r,c){for(let j=-r;j<=r;j++){const span=Math.floor(Math.sqrt(r*r-j*j));rect(x-span,y+j,2*span+1,1,c)}}
  return {rect,frame,poly,disk,ctx};
}
function drawSky(seconds=0){
 const {rect:r,disk,poly}=brushes(document.querySelector('#sky'));
 const day=document.documentElement.dataset.theme==='day';
 const bands=day?['#81b8c9','#98c7cf','#afd6d5','#c6dfd7','#dfe8d4','#eee8cc']:['#101322','#14192c','#1a2137','#202a42','#27334b','#303d54'];
 r(0,0,360,150,bands[5]);
 bands.forEach((color,i)=>r(0,i*13,360,14,color));
 for(let i=0;!day&&i<39;i++)r((i*89+18)%360,(i*i*7)%48,1,1,'#d9c8c4');
 disk(251,27,9,(day?'#fae2ba':'#cacfd9'));
 for(let i=0;i<11;i++){
  const x=(i*93+Math.floor(seconds*.6))%410-40,y=14+(i*19)%50;
  r(x,y,18+i%5*4,1,(day?'#c4a2ab':'#364056'));r(x+5,y-2,11,2,(day?'#af92a3':'#2c364e'));
 }
 function ridge(base,amplitude,color,phase){
  const points=[];
  for(let x=0;x<=360;x+=3)points.push([x,Math.floor(base+amplitude*Math.sin(x*.028+phase)+3*Math.sin(x*.07))]);
  poly([...points,[360,100],[0,100]],color);
 }
 ridge(73,9,(day?'#938699':'#344158'),2);ridge(81,8,(day?'#756f83':'#29374a'),1);ridge(88,6,(day?'#576574':'#202e3e'),0);
 for(let x=0;x<360;x+=2){
  const y=85+Math.floor(5*Math.sin(x*.025)),h=2+(x*17)%6;
  poly([[x-2,y],[x,y-h],[x+2,y]],(day?'#536471':'#1c2937'));
 }
 r(0,94,360,56,(day?'#96a2aa':'#26384b'));
 for(let y=95;y<150;y+=2){
  for(let i=0;i<8;i++){
   const x=(i*73+y*43+Math.floor(seconds*(y%3+1)))%380-15;
   r(x,y,3+(y*i)%16,1,Math.abs(x-251)<20+(y-94)/3?(day?'#e4c4ae':'#697b89'):y%4===1?(day?'#acadb1':'#3b4e60'):(day?'#838f9d':'#2c4053'));
  }
 }
 function pine(x,y,h,color){
  r(x-1,y-h,2,h,color);
  for(let tier=0;tier<4;tier++){
   const end=y-h+Math.floor(h*(.37+tier*.2)),w=Math.round(h*(.08+tier*.035));
   poly([[x,end-h*.33],[x-w,end],[x+w,end]],color);
  }
 }
 for(let i=0;i<13;i++){pine(i*5-4,116-i*1.4,55-i*3,(day?'#455b62':'#1d2c34'));pine(362-i*4,124-i*2,68-i*4,(day?'#425963':'#1a2932'))}
 pine(8,149,108,(day?'#34494f':'#131e28'));pine(351,150,93,(day?'#34494f':'#131e28'));
 const bird=Math.floor(seconds*4)%420-18;
 for(let i=0;i<3;i++){const x=bird-i*7,y=50+i*2,wing=Math.floor(seconds*3+i)%2;r(x,y,2,1,'#535466');r(x-2,y-wing,2,1,'#535466');r(x+2,y-wing,2,1,'#535466')}
 r(177,0,4,150,'#493e49');r(181,0,1,150,'#b39691');
}
function drawCat(lift=0){
 const {rect:r,disk,poly}=brushes(document.querySelector('#cat'));
 document.querySelector('#cat').getContext('2d').clearRect(0,0,50,24);
 const fur='#e9b68b',light='#f9d3a9',stripe='#bf836f',ink='#513844';
 // Curled ginger tabby, tail tucked across its nose.
 disk(29,15,8,fur);r(21,10,15,12,fur);r(15,17,24,5,fur);
 poly([[8,14],[9,5],[15,10],[20,9],[24,5],[24,17]],fur);
 r(10,8,2,4,stripe);r(21,9,2,3,stripe);disk(16,16,7,light);r(8,14,16,5,light);
 r(11,15,3,1,ink);r(17,15,3,1,ink);r(14,17,2,1,stripe);
 r(24,8,2,5,stripe);r(29,7,2,5,stripe);r(33,10,2,3,stripe);
 // The tail rests behind the rump, then lifts and curls in a few distinct poses.
 const tail=[[35,19],[38,20],[41,20-lift],[44,19-2*lift],[45,17-3*lift],[44,16-3*lift]];
 tail.forEach(([x,y],i)=>{disk(x,y,i<4?2:1,i===3?stripe:fur)});
 r(19,20,9,3,light);
}
function drawWalls(){
 const room=document.querySelector('#room'),desk=document.querySelector('.desktop'),canvas=document.querySelector('#walls');
 const w=canvas.width=Math.ceil(room.clientWidth/3),h=canvas.height=Math.ceil(room.clientHeight/3);
 const top=Math.round((desk.offsetTop-3)/3),bottom=Math.round((desk.offsetTop+desk.offsetHeight)/3);
 const {rect:r,frame:f,poly}=brushes(canvas);
 r(0,0,w,h,'#34293f');
 for(let y=8;y<top;y+=12){for(let x=-12+(y%24);x<w;x+=31){if((x*13+y*7)%9>3)continue;r(x,y,21,1,'#403146');r(x,y-3,1,3,'#403146')}}
 // Cornice, hanging vine, and the shadow of the cabinet on the back wall.
 // Continuous plaster above the window; panel moulding grounds the desk wall.
 const rail=Math.floor(top*.79);
 r(0,rail,w,top-rail,'#3e3043');r(0,rail,w,1,'#826574');r(0,rail+1,w,2,'#574153');
 for(let x=-15;x<w;x+=42){
  r(x,rail+5,34,1,'#584355');r(x,rail+5,1,Math.max(1,top-rail-11),'#584355');
  r(x+33,rail+5,1,Math.max(1,top-rail-11),'#2f2738');
 }
 for(let i=0;i<15;i++){let x=w-3-Math.round(i*.65),y=8+i*3;r(x,y,1,5,'#736474');r(x+(i%2?-4:1),y,4,2,i%3?'#6d6373':'#939083')}
 r(0,top-6,w,6,'#563d50');r(0,top-6,w,1,'#957484');
 r(0,top,w,bottom-top,'#785662');r(0,top,w,2,'#bd928c');
 for(let i=0;i<160;i++){const x=(i*101)%w,y=top+4+(i*17)%Math.max(1,bottom-top-4);r(x,y,3+(i*3%24),1,i%3?'#70505b':'#865f68')}
 r(0,bottom,w,h-bottom,'#483540');r(0,bottom,w,3,'#b38b85');r(0,bottom+3,w,4,'#322835');
 for(let x=8;x<w;x+=Math.max(53,Math.floor(w/5))){f(x,bottom+11,Math.max(48,Math.floor(w/5)-8),Math.max(21,h-bottom-14),'#624655','#503b46')}
}
drawSky();drawCat();
new ResizeObserver(drawWalls).observe(document.querySelector('#room'));
document.fonts.ready.then(drawWalls);

{
 const canvas=document.querySelector('[data-print="crown"]');
 canvas.width=44;canvas.height=52;
 const {rect:r,frame:f,disk,poly}=brushes(canvas);
 f(0,0,44,52,'#312533','#b59489');f(2,2,40,48,'#d6b6a0','#675166');
  // Gold crown, pink square snout and an ermine-trimmed red cape.
  r(5,5,34,42,'#513751');r(7,7,1,2,'#e4ba80');r(35,12,2,1,'#e4ba80');
  poly([[9,46],[12,32],[18,29],[27,29],[34,34],[37,46]],'#aa4f62');
  r(15,31,15,3,'#f3d9be');r(16,34,3,11,'#ecd0b8');r(28,34,3,11,'#ecd0b8');
  r(11,19,22,13,'#d38a96');r(8,19,5,6,'#e8a0a7');r(31,19,5,6,'#e8a0a7');
  r(15,22,3,2,'#483343');r(26,22,3,2,'#483343');r(18,25,9,5,'#f3adad');r(19,26,2,2,'#9b6473');r(24,26,2,2,'#9b6473');
  r(11,13,22,6,'#e3aa51');r(11,10,4,5,'#f5ce77');r(20,8,4,7,'#f5ce77');r(29,10,4,5,'#f5ce77');r(20,15,4,2,'#91c4bc');

}
{
 const {rect:r,frame:f,poly,disk}=brushes(document.querySelector('#keys'));
 // Keyboard in shallow perspective, coiled mouse cable, two buttons and a scroll wheel.
 poly([[9,9],[104,9],[111,27],[4,27]],'#d5b5ac');
 poly([[4,27],[111,27],[110,30],[5,30]],'#6e5867');
 for(let row=0;row<4;row++)for(let col=0;col<16;col++){
  if(row===3&&col>3&&col<11)continue;
  const x=11+col*5.6-row*.8,y=11+row*3.6;r(x,y,4,3,'#856c7c');r(x,y,4,1,'#b398a1')
 }
 f(30,22,44,3,'#967c8c','#baa0a7');r(92,11,2,1,'#c4eead');
 for(let i=0;i<22;i++)r(117+i,6+Math.round(3*Math.sin(i*.25)),1,1,'#564352');
 r(137,4,1,9,'#564352');disk(137,19,7,'#b69aab');r(131,17,13,8,'#b69aab');r(136,13,1,6,'#68576a');r(136,15,2,3,'#837182');r(132,24,10,2,'#836c80');
}
{
 const {rect:r,disk,poly}=brushes(document.querySelector('#visitor'));
 disk(22,10,8,'#b0c9c3');disk(22,10,6,'#736981');r(18,6,2,5,'#efbd8e');r(24,6,2,5,'#efbd8e');r(18,9,8,5,'#f3cc9f');r(20,10,1,1,'#493b4d');r(24,10,1,1,'#493b4d');
 poly([[3,13],[12,10],[16,13],[30,13],[34,10],[41,14],[33,18],[11,18]],'#b398b2');r(9,15,26,2,'#e7bcb5');for(let x=12;x<33;x+=6)r(x,17,2,1,'#bfe7aa');
}

function drawNotebook(canvas){
 const {rect:r,frame:f,poly,disk}=brushes(canvas);
 const ink='#574655',paper='#e6cdad',sage='#9eb4a1',rose='#ae797c';
 // Page block, binding and ruled paper.
 poly([[8,16],[43,13],[47,16],[81,13],[86,46],[49,49],[44,48],[9,50]],ink);
 poly([[8,14],[41,11],[46,14],[79,11],[84,43],[49,47],[44,45],[8,48]],'#a18d91');
 poly([[9,12],[41,10],[45,13],[45,43],[10,46]],paper);
 poly([[46,13],[79,10],[83,41],[48,45]],'#f3dcb9');
 for(let y=21;y<=38;y+=5){r(12,y,29,1,'#cec0aa');r(50,y-1,27,1,'#d8c3a7')}
 // Landmarks in the margins: a grass block, a red-banded straw hat and a volleyball.
 poly([[14,32],[21,29],[28,31],[21,35]],sage);poly([[14,33],[21,35],[21,40],[14,37]],'#9c775d');poly([[21,35],[28,32],[28,37],[21,41]],'#765e50');
 r(53,27,17,2,ink);r(56,23,11,4,'#d1a85e');r(58,20,7,4,'#deba70');r(56,25,11,2,'#b96a67');
 disk(72,34,5,'#97795c');disk(72,34,4,'#ebcda0');r(71,30,1,6,ink);r(72,35,4,1,ink);r(69,34,2,1,ink);
 // The green-striped card protrudes from the upper edge of the book.
 f(19,2,27,17,ink,'#eee2bc');r(20,4,25,2,'#799d8b');r(20,15,25,2,'#799d8b');
 for(const x of [22,29]){r(x,7,2,6,ink);r(x+4,7,2,6,ink);r(x,9,5,2,rose)}
 r(37,7,6,6,'#b5a280');r(39,8,2,3,ink);r(38,11,4,1,ink);
}
drawNotebook(document.querySelector('#notebook'));
function drawLightCircuit(canvas,covered){
 const {rect:r,frame:f,disk}=brushes(canvas);
 r(0,0,150,38,'#302b3e');r(19,18,29,2,'#ba97ac');r(100,18,30,2,'#ba97ac');
 disk(17,19,7,covered?'#806d74':'#dab37e');
 for(let i=0;i<3;i++)r(13+i*3,16,1,6,'#755c56');
 f(48,6,53,26,'#a0b8a7','#547f7f');r(51,11,8,10,'#cac4b5');r(67,14,20,7,'#353645');
 for(let i=0;i<10;i++){r(58+i*3,8,2,2,'#343742');r(58+i*3,27,2,2,'#343742')}
 if(covered)disk(131,17,9,'#706b47');
 disk(131,17,5,covered?'#d9f894':'#88797e');r(126,21,11,2,covered?'#a5c875':'#746974');
}


function drawDeskLaptop(id, isThinkPad){
 const {rect:r,frame:f,poly}=brushes(document.querySelector(id));
 const body=isThinkPad?'#302f38':'#424653',rim=isThinkPad?'#625b67':'#838591';
 f(8,1,112,65,rim,body);r(10,3,108,61,'#292934');r(62,2,2,1,'#aaa3a6');
 r(91,64,9,1,'#ad9e9e');r(100,63,1,1,isThinkPad?'#f27772':'#a8b4c3');
 poly([[8,66],[120,66],[127,81],[1,81]],rim);poly([[10,67],[118,67],[123,80],[5,80]],body);
 for(let row=0;row<4;row++)for(let col=0;col<18;col++)r(13-row+col*5.8,68+row*2,4,1,isThinkPad?'#79707c':'#8795a6');
 if(isThinkPad)r(60,71,2,2,'#fb6563');
 f(48,76,25,4,rim,body);r(1,81,126,2,body);
}
drawDeskLaptop('#laptop',true);drawDeskLaptop('#gaming',false);

function drawLamp(lit){
 const canvas=document.querySelector('#lamp-art');
 canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);
 const {rect:r,poly,disk}=brushes(canvas);
 // A slim graphite task light with a cantilever LED bar.
 r(48,115,31,2,'#302d36');r(47,111,31,4,'#484956');
 r(50,109,25,3,'#767781');r(58,106,9,4,'#515361');
 poly([[60,108],[64,108],[71,48],[67,47]],'#424552');
 poly([[60,106],[62,106],[69,48],[67,48]],'#878895');
 poly([[67,49],[71,47],[60,12],[56,14]],'#646977');
 r(56,12,4,5,'#969ba2');disk(69,47,4,'#454953');disk(69,47,2,'#95959c');
 poly([[6,19],[7,15],[56,8],[62,10],[61,14],[12,22]],'#464a58');
 poly([[8,16],[55,9],[60,10],[11,18]],'#979ba4');
 poly([[9,20],[58,12],[58,14],[11,22]],lit?'#fff0c2':'#949797');
 r(68,110,4,1,lit?'#f2cd9b':'#96939a');
}
