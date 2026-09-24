// Shared marina bits: pixel icons and the smooth radio toggle.
(function(){
  // 12x12 pixel icons. Each letter maps to a palette colour; dots are empty.
  var palette={o:'var(--sun)',s:'var(--sail)',h:'var(--teak)',w:'var(--sea)',k:'var(--ink)',g:'var(--palm)',c:'var(--coral)',r:'var(--rose)'};
  var icons={
    boat:['......o.....','......oo....','.....sooo...','....ss.ooo..','...sss.oooo.','..ssss.ooooo','.sssss......','......h.....','hhhhhhhhhhhh','.hhhhhhhhhh.','..hhhhhhhh..','ww..ww..ww..'],
    record:['...rrrrrr...','..rrrrrrrr..','.rrsrrrrrrr.','rrsrrrrrrrrr','rrrrccccrrrr','rrrrc..crrrr','rrrrc..crrrr','rrrrccccrrrr','rrrrrrrrrsrr','.rrrrrrrsrr.','..rrrrrrrr..','...rrrrrr...'],
    tape:['............','ssssssssssss','sccccccccccs','soooooooooos','sokkkkkkkkos','sok.kkkk.kos','sokkkkkkkkos','soooooooooos','ssss....ssss','sssskkkkssss','............','............'],
    palm:['.gg....gg...','g..g..g..g..','....gggg....','..gggggggg..','.g...hh...g.','.....h......','.....h......','....h.......','....h.......','....h.......','...hh.......','wwwwwwwwwwww'],
    sun:['....oooo....','..oooooooo..','.oooooooooo.','.oooooooooo.','oooooooooooo','............','cccccccccccc','............','..wwwwwwww..','............','....wwww....','............'],
    wheel:['.....hh.....','..h..hh..h..','...hhhhhh...','..hh....hh..','.hh..hh..hh.','hhh.h..h.hhh','hhh.h..h.hhh','.hh..hh..hh.','..hh....hh..','...hhhhhh...','..h..hh..h..','.....hh.....']
  };
  function draw(el){
    var grid=icons[el.dataset.icon];if(!grid)return;
    var rects='';
    grid.forEach(function(row,y){for(var x=0;x<row.length;x++){var c=palette[row[x]];if(c)rects+='<rect x="'+x+'" y="'+y+'" width="1" height="1" fill="'+c+'"/>'}});
    el.innerHTML='<svg viewBox="0 0 12 12" aria-hidden="true" focusable="false">'+rects+'</svg>';
  }
  document.querySelectorAll('.px[data-icon]').forEach(draw);

  // Smooth radio: SomaFM "Left Coast 70s" (mellow album rock). Every state is visible, never silent.
  var button=document.querySelector('[data-radio]');
  if(!button)return;
  var streams=['https://ice1.somafm.com/seventies-128-mp3','https://ice2.somafm.com/seventies-128-mp3','https://ice4.somafm.com/seventies-128-mp3'];
  var audio=new Audio();audio.preload='none';audio.volume=.7;
  var label=button.querySelector('.radio-label'),dot=button.querySelector('.radio-dot'),index=0;
  function set(state,text,glyph){button.dataset.state=state;label.textContent=text;dot.textContent=glyph;button.setAttribute('aria-pressed',String(state==='on'))}
  function tune(i){
    index=i;set('tuning','Tuning in…','…');audio.src=streams[i];
    audio.play().then(function(){set('on','On air','■')}).catch(function(){
      if(i+1<streams.length)tune(i+1);else set('error','No signal · retry','▶');
    });
  }
  audio.addEventListener('error',function(){if(button.dataset.state==='on'||button.dataset.state==='tuning'){if(index+1<streams.length)tune(index+1);else set('error','No signal · retry','▶')}});
  button.addEventListener('click',function(){
    if(button.dataset.state==='on'){audio.pause();audio.removeAttribute('src');audio.load();set('off','Smooth radio','▶');}
    else tune(0);
  });
})();
