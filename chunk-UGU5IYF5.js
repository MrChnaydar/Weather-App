import{a as le}from"./chunk-KCVIFYML.js";import{d as ie,g as ae,p as ce}from"./chunk-LXSQPKHN.js";import{A as Z,E as H,K as ee,N as w,P as p,S as g,U as T,V as u,W as te,Y as re,Z as ne,c as S,f as q,ga as se,m as Y,n as B,qa as oe,r as C,s as A,y as Q}from"./chunk-MIVETWAU.js";var D=class r{APIKEY="14165bbcf9dd417ddc8ee87ecd6fbe32";getKey(){return this.APIKEY}static \u0275fac=function(t){return new(t||r)};static \u0275prov=p({token:r,factory:r.\u0275fac,providedIn:"root"})};var M=class{},x=class{},E=class r{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(e){e?typeof e=="string"?this.lazyInit=()=>{this.headers=new Map,e.split(`
`).forEach(t=>{let n=t.indexOf(":");if(n>0){let s=t.slice(0,n),o=t.slice(n+1).trim();this.addHeaderEntry(s,o)}})}:typeof Headers<"u"&&e instanceof Headers?(this.headers=new Map,e.forEach((t,n)=>{this.addHeaderEntry(n,t)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(e).forEach(([t,n])=>{this.setHeaderEntries(t,n)})}:this.headers=new Map}has(e){return this.init(),this.headers.has(e.toLowerCase())}get(e){this.init();let t=this.headers.get(e.toLowerCase());return t&&t.length>0?t[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(e){return this.init(),this.headers.get(e.toLowerCase())||null}append(e,t){return this.clone({name:e,value:t,op:"a"})}set(e,t){return this.clone({name:e,value:t,op:"s"})}delete(e,t){return this.clone({name:e,value:t,op:"d"})}maybeSetNormalizedName(e,t){this.normalizedNames.has(t)||this.normalizedNames.set(t,e)}init(){this.lazyInit&&(this.lazyInit instanceof r?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(e=>this.applyUpdate(e)),this.lazyUpdate=null))}copyFrom(e){e.init(),Array.from(e.headers.keys()).forEach(t=>{this.headers.set(t,e.headers.get(t)),this.normalizedNames.set(t,e.normalizedNames.get(t))})}clone(e){let t=new r;return t.lazyInit=this.lazyInit&&this.lazyInit instanceof r?this.lazyInit:this,t.lazyUpdate=(this.lazyUpdate||[]).concat([e]),t}applyUpdate(e){let t=e.name.toLowerCase();switch(e.op){case"a":case"s":let n=e.value;if(typeof n=="string"&&(n=[n]),n.length===0)return;this.maybeSetNormalizedName(e.name,t);let s=(e.op==="a"?this.headers.get(t):void 0)||[];s.push(...n),this.headers.set(t,s);break;case"d":let o=e.value;if(!o)this.headers.delete(t),this.normalizedNames.delete(t);else{let i=this.headers.get(t);if(!i)return;i=i.filter(l=>o.indexOf(l)===-1),i.length===0?(this.headers.delete(t),this.normalizedNames.delete(t)):this.headers.set(t,i)}break}}addHeaderEntry(e,t){let n=e.toLowerCase();this.maybeSetNormalizedName(e,n),this.headers.has(n)?this.headers.get(n).push(t):this.headers.set(n,[t])}setHeaderEntries(e,t){let n=(Array.isArray(t)?t:[t]).map(o=>o.toString()),s=e.toLowerCase();this.headers.set(s,n),this.maybeSetNormalizedName(e,s)}forEach(e){this.init(),Array.from(this.normalizedNames.keys()).forEach(t=>e(this.normalizedNames.get(t),this.headers.get(t)))}};var $=class{encodeKey(e){return de(e)}encodeValue(e){return de(e)}decodeKey(e){return decodeURIComponent(e)}decodeValue(e){return decodeURIComponent(e)}};function Ae(r,e){let t=new Map;return r.length>0&&r.replace(/^\?/,"").split("&").forEach(s=>{let o=s.indexOf("="),[i,l]=o==-1?[e.decodeKey(s),""]:[e.decodeKey(s.slice(0,o)),e.decodeValue(s.slice(o+1))],a=t.get(i)||[];a.push(l),t.set(i,a)}),t}var Ie=/%(\d[a-f0-9])/gi,Me={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function de(r){return encodeURIComponent(r).replace(Ie,(e,t)=>Me[t]??e)}function k(r){return`${r}`}var v=class r{map;encoder;updates=null;cloneFrom=null;constructor(e={}){if(this.encoder=e.encoder||new $,e.fromString){if(e.fromObject)throw new w(2805,!1);this.map=Ae(e.fromString,this.encoder)}else e.fromObject?(this.map=new Map,Object.keys(e.fromObject).forEach(t=>{let n=e.fromObject[t],s=Array.isArray(n)?n.map(k):[k(n)];this.map.set(t,s)})):this.map=null}has(e){return this.init(),this.map.has(e)}get(e){this.init();let t=this.map.get(e);return t?t[0]:null}getAll(e){return this.init(),this.map.get(e)||null}keys(){return this.init(),Array.from(this.map.keys())}append(e,t){return this.clone({param:e,value:t,op:"a"})}appendAll(e){let t=[];return Object.keys(e).forEach(n=>{let s=e[n];Array.isArray(s)?s.forEach(o=>{t.push({param:n,value:o,op:"a"})}):t.push({param:n,value:s,op:"a"})}),this.clone(t)}set(e,t){return this.clone({param:e,value:t,op:"s"})}delete(e,t){return this.clone({param:e,value:t,op:"d"})}toString(){return this.init(),this.keys().map(e=>{let t=this.encoder.encodeKey(e);return this.map.get(e).map(n=>t+"="+this.encoder.encodeValue(n)).join("&")}).filter(e=>e!=="").join("&")}clone(e){let t=new r({encoder:this.encoder});return t.cloneFrom=this.cloneFrom||this,t.updates=(this.updates||[]).concat(e),t}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(e=>this.map.set(e,this.cloneFrom.map.get(e))),this.updates.forEach(e=>{switch(e.op){case"a":case"s":let t=(e.op==="a"?this.map.get(e.param):void 0)||[];t.push(k(e.value)),this.map.set(e.param,t);break;case"d":if(e.value!==void 0){let n=this.map.get(e.param)||[],s=n.indexOf(k(e.value));s!==-1&&n.splice(s,1),n.length>0?this.map.set(e.param,n):this.map.delete(e.param)}else{this.map.delete(e.param);break}}}),this.cloneFrom=this.updates=null)}};var X=class{map=new Map;set(e,t){return this.map.set(e,t),this}get(e){return this.map.has(e)||this.map.set(e,e.defaultValue()),this.map.get(e)}delete(e){return this.map.delete(e),this}has(e){return this.map.has(e)}keys(){return this.map.keys()}};function Oe(r){switch(r){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function he(r){return typeof ArrayBuffer<"u"&&r instanceof ArrayBuffer}function ue(r){return typeof Blob<"u"&&r instanceof Blob}function fe(r){return typeof FormData<"u"&&r instanceof FormData}function De(r){return typeof URLSearchParams<"u"&&r instanceof URLSearchParams}var pe="Content-Type",ye="Accept",Te="X-Request-URL",ve="text/plain",we="application/json",ke=`${we}, ${ve}, */*`,I=class r{url;body=null;headers;context;reportProgress=!1;withCredentials=!1;responseType="json";method;params;urlWithParams;transferCache;constructor(e,t,n,s){this.url=t,this.method=e.toUpperCase();let o;if(Oe(this.method)||s?(this.body=n!==void 0?n:null,o=s):o=n,o&&(this.reportProgress=!!o.reportProgress,this.withCredentials=!!o.withCredentials,o.responseType&&(this.responseType=o.responseType),o.headers&&(this.headers=o.headers),o.context&&(this.context=o.context),o.params&&(this.params=o.params),this.transferCache=o.transferCache),this.headers??=new E,this.context??=new X,!this.params)this.params=new v,this.urlWithParams=t;else{let i=this.params.toString();if(i.length===0)this.urlWithParams=t;else{let l=t.indexOf("?"),a=l===-1?"?":l<t.length-1?"&":"";this.urlWithParams=t+a+i}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||he(this.body)||ue(this.body)||fe(this.body)||De(this.body)?this.body:this.body instanceof v?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||fe(this.body)?null:ue(this.body)?this.body.type||null:he(this.body)?null:typeof this.body=="string"?ve:this.body instanceof v?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?we:null}clone(e={}){let t=e.method||this.method,n=e.url||this.url,s=e.responseType||this.responseType,o=e.transferCache??this.transferCache,i=e.body!==void 0?e.body:this.body,l=e.withCredentials??this.withCredentials,a=e.reportProgress??this.reportProgress,f=e.headers||this.headers,b=e.params||this.params,y=e.context??this.context;return e.setHeaders!==void 0&&(f=Object.keys(e.setHeaders).reduce((R,m)=>R.set(m,e.setHeaders[m]),f)),e.setParams&&(b=Object.keys(e.setParams).reduce((R,m)=>R.set(m,e.setParams[m]),b)),new r(t,n,i,{params:b,headers:f,context:y,reportProgress:a,responseType:s,withCredentials:l,transferCache:o})}},N=function(r){return r[r.Sent=0]="Sent",r[r.UploadProgress=1]="UploadProgress",r[r.ResponseHeader=2]="ResponseHeader",r[r.DownloadProgress=3]="DownloadProgress",r[r.Response=4]="Response",r[r.User=5]="User",r}(N||{}),O=class{headers;status;statusText;url;ok;type;constructor(e,t=200,n="OK"){this.headers=e.headers||new E,this.status=e.status!==void 0?e.status:t,this.statusText=e.statusText||n,this.url=e.url||null,this.ok=this.status>=200&&this.status<300}},J=class r extends O{constructor(e={}){super(e)}type=N.ResponseHeader;clone(e={}){return new r({headers:e.headers||this.headers,status:e.status!==void 0?e.status:this.status,statusText:e.statusText||this.statusText,url:e.url||this.url||void 0})}},F=class r extends O{body;constructor(e={}){super(e),this.body=e.body!==void 0?e.body:null}type=N.Response;clone(e={}){return new r({body:e.body!==void 0?e.body:this.body,headers:e.headers||this.headers,status:e.status!==void 0?e.status:this.status,statusText:e.statusText||this.statusText,url:e.url||this.url||void 0})}},L=class extends O{name="HttpErrorResponse";message;error;ok=!1;constructor(e){super(e,0,"Unknown Error"),this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${e.url||"(unknown url)"}`:this.message=`Http failure response for ${e.url||"(unknown url)"}: ${e.status} ${e.statusText}`,this.error=e.error||null}},xe=200,Fe=204;function z(r,e){return{body:e,headers:r.headers,context:r.context,observe:r.observe,params:r.params,reportProgress:r.reportProgress,responseType:r.responseType,withCredentials:r.withCredentials,transferCache:r.transferCache}}var V=(()=>{class r{handler;constructor(t){this.handler=t}request(t,n,s={}){let o;if(t instanceof I)o=t;else{let a;s.headers instanceof E?a=s.headers:a=new E(s.headers);let f;s.params&&(s.params instanceof v?f=s.params:f=new v({fromObject:s.params})),o=new I(t,n,s.body!==void 0?s.body:null,{headers:a,context:s.context,params:f,reportProgress:s.reportProgress,responseType:s.responseType||"json",withCredentials:s.withCredentials,transferCache:s.transferCache})}let i=B(o).pipe(Z(a=>this.handler.handle(a)));if(t instanceof I||s.observe==="events")return i;let l=i.pipe(Q(a=>a instanceof F));switch(s.observe||"body"){case"body":switch(o.responseType){case"arraybuffer":return l.pipe(A(a=>{if(a.body!==null&&!(a.body instanceof ArrayBuffer))throw new w(2806,!1);return a.body}));case"blob":return l.pipe(A(a=>{if(a.body!==null&&!(a.body instanceof Blob))throw new w(2807,!1);return a.body}));case"text":return l.pipe(A(a=>{if(a.body!==null&&typeof a.body!="string")throw new w(2808,!1);return a.body}));case"json":default:return l.pipe(A(a=>a.body))}case"response":return l;default:throw new w(2809,!1)}}delete(t,n={}){return this.request("DELETE",t,n)}get(t,n={}){return this.request("GET",t,n)}head(t,n={}){return this.request("HEAD",t,n)}jsonp(t,n){return this.request("JSONP",t,{params:new v().append(n,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(t,n={}){return this.request("OPTIONS",t,n)}patch(t,n,s={}){return this.request("PATCH",t,z(s,n))}post(t,n,s={}){return this.request("POST",t,z(s,n))}put(t,n,s={}){return this.request("PUT",t,z(s,n))}static \u0275fac=function(n){return new(n||r)(T(M))};static \u0275prov=p({token:r,factory:r.\u0275fac})}return r})();var Le=new g("");function _e(r,e){return e(r)}function je(r,e,t){return(n,s)=>ne(t,()=>e(n,o=>r(o,s)))}var Ee=new g(""),Ue=new g(""),Se=new g("",{providedIn:"root",factory:()=>!0});var me=(()=>{class r extends M{backend;injector;chain=null;pendingTasks=u(se);contributeToStability=u(Se);constructor(t,n){super(),this.backend=t,this.injector=n}handle(t){if(this.chain===null){let n=Array.from(new Set([...this.injector.get(Ee),...this.injector.get(Ue,[])]));this.chain=n.reduceRight((s,o)=>je(s,o,this.injector),_e)}if(this.contributeToStability){let n=this.pendingTasks.add();return this.chain(t,s=>this.backend.handle(s)).pipe(H(()=>this.pendingTasks.remove(n)))}else return this.chain(t,n=>this.backend.handle(n))}static \u0275fac=function(n){return new(n||r)(T(x),T(re))};static \u0275prov=p({token:r,factory:r.\u0275fac})}return r})();var Be=/^\)\]\}',?\n/,Ce=RegExp(`^${Te}:`,"m");function We(r){return"responseURL"in r&&r.responseURL?r.responseURL:Ce.test(r.getAllResponseHeaders())?r.getResponseHeader(Te):null}var ge=(()=>{class r{xhrFactory;constructor(t){this.xhrFactory=t}handle(t){if(t.method==="JSONP")throw new w(-2800,!1);let n=this.xhrFactory;return(n.\u0275loadImpl?Y(n.\u0275loadImpl()):B(null)).pipe(ee(()=>new q(o=>{let i=n.build();if(i.open(t.method,t.urlWithParams),t.withCredentials&&(i.withCredentials=!0),t.headers.forEach((c,d)=>i.setRequestHeader(c,d.join(","))),t.headers.has(ye)||i.setRequestHeader(ye,ke),!t.headers.has(pe)){let c=t.detectContentTypeHeader();c!==null&&i.setRequestHeader(pe,c)}if(t.responseType){let c=t.responseType.toLowerCase();i.responseType=c!=="json"?c:"text"}let l=t.serializeBody(),a=null,f=()=>{if(a!==null)return a;let c=i.statusText||"OK",d=new E(i.getAllResponseHeaders()),P=We(i)||t.url;return a=new J({headers:d,status:i.status,statusText:c,url:P}),a},b=()=>{let{headers:c,status:d,statusText:P,url:G}=f(),h=null;d!==Fe&&(h=typeof i.response>"u"?i.responseText:i.response),d===0&&(d=h?xe:0);let U=d>=200&&d<300;if(t.responseType==="json"&&typeof h=="string"){let Pe=h;h=h.replace(Be,"");try{h=h!==""?JSON.parse(h):null}catch(Ne){h=Pe,U&&(U=!1,h={error:Ne,text:h})}}U?(o.next(new F({body:h,headers:c,status:d,statusText:P,url:G||void 0})),o.complete()):o.error(new L({error:h,headers:c,status:d,statusText:P,url:G||void 0}))},y=c=>{let{url:d}=f(),P=new L({error:c,status:i.status||0,statusText:i.statusText||"Unknown Error",url:d||void 0});o.error(P)},R=!1,m=c=>{R||(o.next(f()),R=!0);let d={type:N.DownloadProgress,loaded:c.loaded};c.lengthComputable&&(d.total=c.total),t.responseType==="text"&&i.responseText&&(d.partialText=i.responseText),o.next(d)},K=c=>{let d={type:N.UploadProgress,loaded:c.loaded};c.lengthComputable&&(d.total=c.total),o.next(d)};return i.addEventListener("load",b),i.addEventListener("error",y),i.addEventListener("timeout",y),i.addEventListener("abort",y),t.reportProgress&&(i.addEventListener("progress",m),l!==null&&i.upload&&i.upload.addEventListener("progress",K)),i.send(l),o.next({type:N.Sent}),()=>{i.removeEventListener("error",y),i.removeEventListener("abort",y),i.removeEventListener("load",b),i.removeEventListener("timeout",y),t.reportProgress&&(i.removeEventListener("progress",m),l!==null&&i.upload&&i.upload.removeEventListener("progress",K)),i.readyState!==i.DONE&&i.abort()}})))}static \u0275fac=function(n){return new(n||r)(T(ce))};static \u0275prov=p({token:r,factory:r.\u0275fac})}return r})(),be=new g(""),ze="XSRF-TOKEN",$e=new g("",{providedIn:"root",factory:()=>ze}),Xe="X-XSRF-TOKEN",Je=new g("",{providedIn:"root",factory:()=>Xe}),_=class{},Ve=(()=>{class r{doc;platform;cookieName;lastCookieString="";lastToken=null;parseCount=0;constructor(t,n,s){this.doc=t,this.platform=n,this.cookieName=s}getToken(){if(this.platform==="server")return null;let t=this.doc.cookie||"";return t!==this.lastCookieString&&(this.parseCount++,this.lastToken=ae(t,this.cookieName),this.lastCookieString=t),this.lastToken}static \u0275fac=function(n){return new(n||r)(T(ie),T(oe),T($e))};static \u0275prov=p({token:r,factory:r.\u0275fac})}return r})();function Ke(r,e){let t=r.url.toLowerCase();if(!u(be)||r.method==="GET"||r.method==="HEAD"||t.startsWith("http://")||t.startsWith("https://"))return e(r);let n=u(_).getToken(),s=u(Je);return n!=null&&!r.headers.has(s)&&(r=r.clone({headers:r.headers.set(s,n)})),e(r)}function Tt(...r){let e=[V,ge,me,{provide:M,useExisting:me},{provide:x,useFactory:()=>u(Le,{optional:!0})??u(ge)},{provide:Ee,useValue:Ke,multi:!0},{provide:be,useValue:!0},{provide:_,useClass:Ve}];for(let t of r)e.push(...t.\u0275providers);return te(e)}var j=class r{http=u(V);getWeatherDataFromApi(e,t,n,s){let o=`https://api.openweathermap.org/data/2.5/weather?q=${t},${n}&appid=${e}&units=${s}`;return console.log(o),this.http.get(o)}getReverseLocationInfo(e,t,n,s){return S(this,null,function*(){let o=`http://api.openweathermap.org/geo/1.0/reverse?lat=${t}&lon=${n}&limit=1&appid=${e}`;console.log(o);let i="",l="",a=yield C(this.http.get(o));return i=a[0]?.name,l=a[0]?.country,C(this.getWeatherDataFromApi(e,i,l,s))})}getLocationInfo(e,t){let n=`http://api.openweathermap.org/geo/1.0/direct?q=${t}&limit=5&appid=${e}`;return this.http.get(n)}getTwoWeeksForcast(e,t,n,s){let o=`https://api.openweathermap.org/data/3.0/onecall?lat=${t}&lon=${n}&exclude=minutely,hourly,alerts&appid=${e}&units=${s}`;return this.http.get(o)}static \u0275fac=function(t){return new(t||r)};static \u0275prov=p({token:r,factory:r.\u0275fac,providedIn:"root"})};var Re=class r{unit=u(le);haveData=!1;apikeyservice=u(D);weatherdata=u(j);data;twoWeeksData;listCities=[];searchLocation;setCurrentWeatherData(e){e.visibility=Math.round(e.visibility/1e3),e.main.feels_like=Math.floor(e.main.feels_like),e.weather[0].icon="https://openweathermap.org/img/wn/"+e.weather[0].icon+"@2x.png",e.main.temp=Math.floor(e.main.temp),e.name=`${e.name}, ${e.sys.country}`,this.data=e,this.haveData=!0}setTwoWeeksData(e){this.twoWeeksData=e}setSearch(e){this.listCities=e}setSearchTerm(e){this.searchLocation=e}getSearchTerm(){return this.searchLocation}clearSearch(){this.listCities=[]}search(e){this.weatherdata.getWeatherDataFromApi(this.apikeyservice.getKey(),e.name,e.country,this.unit.getSettings().units).subscribe(t=>{this.setCurrentWeatherData(t)}),this.weatherdata.getTwoWeeksForcast(this.apikeyservice.getKey(),e.lat,e.lon,this.unit.getSettings().units).subscribe(t=>{this.setTwoWeeksData(t)}),this.clearSearch()}onInputSubmit(e){if(e===""){this.clearSearch();return}this.setSearchTerm(e),this.weatherdata.getLocationInfo(this.apikeyservice.getKey(),this.searchLocation).subscribe(t=>{this.setSearch(t)}),console.log(this.searchLocation)}getCurrentWeather(){return this.data}getTwoWeeks(){return this.twoWeeksData}getListOfCities(){return this.listCities}responseStatus(){return this.haveData?!0:this.haveData}static \u0275fac=function(t){return new(t||r)};static \u0275prov=p({token:r,factory:r.\u0275fac,providedIn:"root"})};export{Tt as a,j as b,Re as c};
