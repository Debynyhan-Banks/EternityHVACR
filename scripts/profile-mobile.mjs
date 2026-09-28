// Mobile navigation-only lab profile, not field Core Web Vitals or Lighthouse.
// Defaults to local fixture; PROFILE_BASE_URL=https://eternityhvacr.com tests public production.
// Third-party GET resources are included on production; all non-GET/HEAD requests are blocked.
import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
const browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH});
const base=process.env.PROFILE_BASE_URL || 'http://127.0.0.1:4179';
if(!['https://eternityhvacr.com','http://127.0.0.1:4179'].includes(base)) throw new Error('Unexpected profiling origin');
const rows=[];
for(const mobile of [true]) for(const path of ['/','/services/furnace-heating-repair','/services/boiler-service','/services/commercial-refrigeration','/estimate']) for(let run=1;run<=3;run++) {
 const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1440,height:900},deviceScaleFactor:mobile?2:1,isMobile:mobile});
 await context.route('**/*',route=>['GET','HEAD'].includes(route.request().method()) && (base.startsWith('https:') || new URL(route.request().url()).origin===base)?route.continue():route.abort());
 const page=await context.newPage(); const cdp=await context.newCDPSession(page);
 await cdp.send('Network.enable'); await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
 await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:mobile?150:40,downloadThroughput:(mobile?1600:10000)*1024/8,uploadThroughput:750*1024/8});
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:mobile?4:1});
 await page.addInitScript(()=>{
  window.lab={cls:0};new PerformanceObserver(list=>{for(const e of list.getEntries())window.lab.lcp={ms:e.startTime,tag:e.element?.tagName,text:e.element?.textContent?.slice(0,100),url:e.url};}).observe({type:'largest-contentful-paint',buffered:true});
  new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.lab.cls+=e.value;}).observe({type:'layout-shift',buffered:true});
 });
 await page.goto(base+path,{waitUntil:'load'}); await page.waitForTimeout(3000);
 rows.push({path,mobile,run,...await page.evaluate(()=>({...window.lab,navigation:performance.getEntriesByType('navigation')[0].toJSON(),resources:performance.getEntriesByType('resource').map(e=>({url:e.name,bytes:e.transferSize,ms:e.duration,start:e.startTime,end:e.responseEnd,encoded:e.encodedBodySize,decoded:e.decodedBodySize,type:e.initiatorType})),overflow:document.documentElement.scrollWidth>innerWidth}))});
 console.log(path,run,rows.at(-1).lcp?.ms); await context.close();
}
await browser.close();await writeFile(process.argv[2]||'/private/tmp/eternity-performance-before.json',JSON.stringify(rows,null,2));
for(const mobile of [true]) for(const path of [...new Set(rows.map(x=>x.path))]) {const group=rows.filter(x=>x.mobile===mobile&&x.path===path);console.log(JSON.stringify({mobile,path,lcp_ms:group.map(x=>x.lcp?.ms),lcp:group[1].lcp,cls:group.map(x=>x.cls),overflow:group.some(x=>x.overflow)}));}
