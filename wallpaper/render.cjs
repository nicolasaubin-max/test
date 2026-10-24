const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const specs = [
    { name:'fond-ecran-iphone.png', w:1290, h:2796, fs:150, pad:120, offset:'380px' },
    { name:'fond-ecran-ordi.png',   w:3840, h:2160, fs:190, pad:340, offset:'0px' },
  ];
  for (const s of specs) {
    const p = await b.newPage({ viewport:{ width:s.w, height:s.h } });
    await p.goto('file://' + path.resolve('wallpaper.html'));
    await p.evaluate(s => {
      const r = document.documentElement.style;
      r.setProperty('--w', s.w+'px'); r.setProperty('--h', s.h+'px');
      r.setProperty('--fs', s.fs+'px'); r.setProperty('--pad', s.pad+'px');
      r.setProperty('--offset', s.offset);
    }, s);
    if (s.w > s.h) await p.evaluate(() => {
      document.querySelector('.q').innerHTML = "Je fais les plus grosses actions<br>vers mon succès<br><span class='soft'>et c’est ce qui me fait me sentir</span> <span class='hot'>vivant.</span>";
    });
    await p.screenshot({ path: s.name });
    await p.close();
  }
  await b.close();
})();
