// Local repeatable lab sample, not Lighthouse or field Core Web Vitals.
// Run the built fixture server separately; third-party requests are blocked.
import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
const browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH});
const rows=[];
for(const mobile of [true,false]) for(const path of ['/','/services/furnace-heating-repair','/services/boiler-service','/services/commercial-refrigeration','/estimate']) for(let run=1;run<=3;run++) {
 const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1440,height:900},deviceScaleFactor:mobile?2:1,isMobile:mobile});
 await context.route('**/*',route=>new URL(route.request().url()).hostname==='127.0.0.1'?route.continue():route.abort());
 const page=await context.newPage(); const cdp=await context.newCDPSession(page);
 await cdp.send('Network.enable'); await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
 await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:mobile?150:40,downloadThroughput:(mobile?1600:10000)*1024/8,uploadThroughput:750*1024/8});
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:mobile?4:1});
 await page.addInitScript(()=>{
  window.lab={cls:0};new PerformanceObserver(list=>{for(const e of list.getEntries())window.lab.lcp={ms:e.startTime,tag:e.element?.tagName,text:e.element?.textContent?.slice(0,100),url:e.url};}).observe({type:'largest-contentful-paint',buffered:true});
  new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.lab.cls+=e.value;}).observe({type:'layout-shift',buffered:true});
 });
 await page.goto('http://127.0.0.1:4179'+path,{waitUntil:'load'}); await page.waitForTimeout(1800);
 rows.push({path,mobile,run,...await page.evaluate(()=>({...window.lab,resources:performance.getEntriesByType('resource').map(e=>({url:e.name,bytes:e.transferSize,ms:e.duration})),overflow:document.documentElement.scrollWidth>innerWidth}))});
 await context.close();
}
await browser.close();await writeFile(process.argv[2]||'/private/tmp/eternity-performance-before.json',JSON.stringify(rows,null,2));
for(const mobile of [true,false]) for(const path of [...new Set(rows.map(x=>x.path))]) {const group=rows.filter(x=>x.mobile===mobile&&x.path===path);console.log(JSON.stringify({mobile,path,lcp_ms:group.map(x=>x.lcp?.ms),lcp:group[1].lcp,cls:group.map(x=>x.cls),overflow:group.some(x=>x.overflow)}));}
