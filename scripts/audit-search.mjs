import { readFile, readdir, writeFile } from 'node:fs/promises';
import worker from '../dist/server/index.js';
const origin = 'https://eternityhvacr.com';
async function pages(dir='app') {
  const result=[];
  for(const item of await readdir(dir,{withFileTypes:true})) {
    if(item.isDirectory() && item.name!=='api') result.push(...await pages(`${dir}/${item.name}`));
    if(item.name==='page.tsx') result.push(dir.slice(3)||'/');
  }
  return result;
}
const sitemap=await readFile('public/sitemap.xml','utf8');
const rows=[];
for(const path of [...await pages(),'/not-a-real-page-audit']) {
 if(path.startsWith('/admin')) { rows.push({path,status:'requires Cloudflare runtime',sitemap:false}); continue; }
 const response=await worker.fetch(new Request(origin+path),{ASSETS:{fetch:async()=>new Response('Not found',{status:404})}},{waitUntil(){},passThroughOnException(){}});
 const html=await response.text();
 const tags=[...html.matchAll(/<(meta|link)\b[^>]*>/g)].map(x=>Object.fromEntries([...x[0].matchAll(/([\w-]+)="([^"]*)"/g)].map(m=>[m[1],m[2]])));
 const value=(key,name)=>tags.find(x=>x[key]===name);
 const canonical=value('rel','canonical')?.href;
 const schemas=[...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(x=>JSON.parse(x[1]));
 rows.push({path,status:response.status,title:html.match(/<title>(.*?)<\/title>/s)?.[1],description:value('name','description')?.content,canonical,robots:value('name','robots')?.content,sitemap:sitemap.includes(`<loc>${origin+path}</loc>`),lastmod:sitemap.match(new RegExp(`<loc>${(origin+path).replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}</loc>\\s*<lastmod>(.*?)</lastmod>`))?.[1],schemaBlocks:schemas.length});
}
await writeFile(process.argv[2]||'/private/tmp/eternity-search-audit.json',JSON.stringify(rows,null,2));
console.log(JSON.stringify(rows.map(({path,status,canonical,robots,sitemap,lastmod})=>({path,status,canonical,robots,sitemap,lastmod})),null,2));
