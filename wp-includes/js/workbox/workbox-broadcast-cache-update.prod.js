this.workbox=this.workbox||{},this.workbox.broadcastUpdate=function(e,t){"use strict";try{self["workbox:broadcast-cache-update:4.0.0-beta.2"]&&_()}catch(e){}const s=(e,t,s)=>{return!s.some(s=>e.headers.has(s)&&t.headers.has(s))||s.every(s=>{const n=e.headers.has(s)===t.headers.has(s),a=e.headers.get(s)===t.headers.get(s);return n&&a})},n="workbox",a=1e4,i=["content-length","etag","last-modified"],o=async({channel:e,cacheName:t,url:s})=>{const n={type:"CACHE_UPDATED",meta:"workbox-broadcast-cache-update",payload:{cacheName:t,updatedURL:s}};if(e)e.postMessage(n);else{const e=await clients.matchAll({type:"window"});for(const t of e)t.postMessage(n)}};class c{constructor({headersToCheck:e,channelName:t,deferNoticationTimeout:s}={}){this.e=e||i,this.t=t||n,this.s=s||a,this.n()}notifyIfUpdated({oldResponse:e,newResponse:t,url:n,cacheName:a,event:i}){if(!s(e,t,this.e)){const e=(async()=>{i&&"navigate"===i.request.mode&&await this.a(i),await o({channel:this.i(),cacheName:a,url:n})})();if(i)try{i.waitUntil(e)}catch(e){}return e}}i(){return"BroadcastChannel"in self&&!this.o&&(this.o=new BroadcastChannel(this.t)),this.o}a(e){if(!this.c.has(e)){const s=new t.Deferred;this.c.set(e,s);const n=setTimeout(()=>{s.resolve()},this.s);s.promise.then(()=>clearTimeout(n))}return this.c.get(e).promise}n(){this.c=new Map,self.addEventListener("message",e=>{if("WINDOW_READY"===e.data.type&&"workbox-window"===e.data.meta&&this.c.size>0){for(const e of this.c.values())e.resolve();this.c.clear()}})}}return e.BroadcastCacheUpdate=c,e.Plugin=class{constructor(e){this.h=new c(e)}cacheDidUpdate({cacheName:e,oldResponse:t,newResponse:s,request:n,event:a}){t&&this.h.notifyIfUpdated({cacheName:e,oldResponse:t,newResponse:s,event:a,url:n.url})}},e.broadcastUpdate=o,e.responsesAreSame=s,e}({},workbox.core._private);

//# sourceMappingURL=workbox-broadcast-cache-update.prod.js.map
