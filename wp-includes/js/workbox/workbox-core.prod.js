this.workbox=this.workbox||{},this.workbox.core=function(e){"use strict";try{self["workbox:core:4.0.0-beta.2"]&&_()}catch(e){}const t=(e,...t)=>{let n=e;return t.length>0&&(n+=` :: ${JSON.stringify(t)}`),n};class n extends Error{constructor(e,n){super(t(e,n)),this.name=e,this.details=n}}const r=new Set;class s{constructor(e,t,{onupgradeneeded:n,onversionchange:r=this.e}={}){this.t=e,this.n=t,this.r=n,this.e=r,this.s=null}get db(){return this.s}async open(){if(!this.s)return this.s=await new Promise((e,t)=>{let n=!1;setTimeout(()=>{n=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const r=indexedDB.open(this.t,this.n);r.onerror=(()=>t(r.error)),r.onupgradeneeded=(e=>{n?(r.transaction.abort(),e.target.result.close()):this.r&&this.r(e)}),r.onsuccess=(({target:t})=>{const r=t.result;n?r.close():(r.onversionchange=this.e,e(r))})}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,n){return await this.getAllMatching(e,{query:t,count:n})}async getAllKeys(e,t,n){return(await this.getAllMatching(e,{query:t,count:n,includeKeys:!0})).map(({key:e})=>e)}async getAllMatching(e,{index:t,query:n=null,direction:r="next",count:s,includeKeys:a}={}){return await this.transaction([e],"readonly",(i,c)=>{const o=i.objectStore(e),l=t?o.index(t):o,u=[];l.openCursor(n,r).onsuccess=(({target:e})=>{const t=e.result;if(t){const{primaryKey:e,key:n,value:r}=t;u.push(a?{primaryKey:e,key:n,value:r}:r),s&&u.length>=s?c(u):t.continue()}else c(u)})})}async transaction(e,t,n){return await this.open(),await new Promise((r,s)=>{const a=this.s.transaction(e,t);a.onabort=(({target:e})=>s(e.error)),a.oncomplete=(()=>r()),n(a,e=>r(e))})}async a(e,t,n,...r){return await this.transaction([t],n,(n,s)=>{n.objectStore(t)[e](...r).onsuccess=(({target:e})=>{s(e.result)})})}e(){this.close()}close(){this.s&&this.s.close()}}s.prototype.OPEN_TIMEOUT=2e3;const a={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(a))for(const n of t)n in IDBObjectStore.prototype&&(s.prototype[n]=async function(t,...r){return await this.a(n,t,e,...r)});const i={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:self.registration.scope},c=e=>[i.prefix,e,i.suffix].filter(e=>e.length>0).join("-"),o={updateDetails:e=>{Object.keys(i).forEach(t=>{void 0!==e[t]&&(i[t]=e[t])})},getGoogleAnalyticsName:e=>e||c(i.googleAnalytics),getPrecacheName:e=>e||c(i.precache),getRuntimeName:e=>e||c(i.runtime)},l="cacheDidUpdate",u="cacheWillUpdate",h="cachedResponseWillBeUsed",w="fetchDidFail",f="fetchDidSucceed",d="requestWillFetch",g=(e,t)=>e.filter(e=>t in e),y=e=>{const t=new URL(e,location);return t.origin===location.origin?t.pathname:t.href},p=async({cacheName:e,request:t,event:n,matchOptions:r,plugins:s=[]})=>{const a=await caches.open(e);let i=await a.match(t,r);for(const a of s)h in a&&(i=await a[h].call(a,{cacheName:e,request:t,event:n,matchOptions:r,cachedResponse:i}));return i},m=async({request:e,response:t,event:n,plugins:r})=>{let s=t,a=!1;for(let t of r)if(u in t&&(a=!0,!(s=await t[u].call(t,{request:e,response:s,event:n}))))break;return a||(s=200===s.status?s:null),s||null},v={put:async({cacheName:e,request:t,response:s,event:a,plugins:i=[]}={})=>{if(!s)throw new n("cache-put-with-no-response",{url:y(t.url)});let c=await m({request:t,response:s,event:a,plugins:i});if(!c)return;const o=await caches.open(e),u=g(i,l);let h=u.length>0?await p({cacheName:e,request:t}):null;try{await o.put(t,c)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of r)await e()}(),e}for(let n of u)await n[l].call(n,{cacheName:e,request:t,event:a,oldResponse:h,newResponse:c})},match:p},q={fetch:async({request:e,fetchOptions:t,event:r,plugins:s=[]})=>{if(r&&r.preloadResponse){const e=await r.preloadResponse;if(e)return e}"string"==typeof e&&(e=new Request(e));const a=g(s,w),i=a.length>0?e.clone():null;try{for(let t of s)d in t&&(e=await t[d].call(t,{request:e.clone(),event:r}))}catch(e){throw new n("plugin-error-request-will-fetch",{thrownError:e})}let c=e.clone();try{let n;n="navigate"===e.mode?await fetch(e):await fetch(e,t);for(const e of s)f in e&&(n=await e[f].call(e,{event:r,request:c,response:n}));return n}catch(e){for(const t of a)await t[w].call(t,{error:e,event:r,originalRequest:i.clone(),request:c.clone()});throw e}}};var b=Object.freeze({DBWrapper:s,deleteDatabase:async e=>{await new Promise((t,n)=>{const r=indexedDB.deleteDatabase(e);r.onerror=(({target:e})=>{n(e.error)}),r.onblocked=(()=>{n(new Error("Delete blocked"))}),r.onsuccess=(()=>{t()})})},migrateDb:(e,t)=>{let{oldVersion:n,newVersion:r}=e;const s=e=>{const n=()=>{++e<=r&&s(e)},a=t[`v${e}`];"function"==typeof a?a(n):n()};s(n)},WorkboxError:n,assert:null,cacheNames:o,cacheWrapper:v,fetchWrapper:q,getFriendlyURL:y,logger:null});const D={get googleAnalytics(){return o.getGoogleAnalyticsName()},get precache(){return o.getPrecacheName()},get runtime(){return o.getRuntimeName()}};try{self.workbox.v=self.workbox.v||{}}catch(e){}return e._private=b,e.clientsClaim=(()=>{addEventListener("activate",()=>clients.claim())}),e.cacheNames=D,e.registerQuotaErrorCallback=function(e){r.add(e)},e.setCacheNameDetails=(e=>{o.updateDetails(e)}),e.skipWaiting=(()=>{addEventListener("install",()=>self.skipWaiting())}),e}({});

//# sourceMappingURL=workbox-core.prod.js.map
