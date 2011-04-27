
(function(){var DomReady=window.DomReady={};var userAgent=navigator.userAgent.toLowerCase();var browser={version:(userAgent.match(/.+(?:rv|it|ra|ie)[/: ]([d.]+)/)||[])[1],safari:/webkit/.test(userAgent),opera:/opera/.test(userAgent),msie:(/msie/.test(userAgent))&&(!/opera/.test(userAgent)),mozilla:(/mozilla/.test(userAgent))&&(!/(compatible|webkit)/.test(userAgent))};var readyBound=false;var isReady=false;var readyList=[];function domReady(){if(!isReady){isReady=true;if(readyList){for(var fn=0;fn<readyList.length;fn++){readyList[fn].call(window,[]);}
readyList=[];}}};function addLoadEvent(func){var oldonload=window.onload;if(typeof window.onload!='function'){window.onload=func;}else{window.onload=function(){if(oldonload){oldonload();}
func();}}};function bindReady(){if(readyBound){return;}
readyBound=true;if(document.addEventListener&&!browser.opera){document.addEventListener('DOMContentLoaded',domReady,false);}
if(browser.msie&&window==top)(function(){if(isReady)return;try{document.documentElement.doScroll('left');}catch(error){setTimeout(arguments.callee,0);return;}
domReady();})();if(browser.opera){document.addEventListener('DOMContentLoaded',function(){if(isReady)return;for(var i=0;i<document.styleSheets.length;i++)
if(document.styleSheets[i].disabled){setTimeout(arguments.callee,0);return;}
domReady();},false);}
if(browser.safari){var numStyles;(function(){if(isReady)return;if(document.readyState!='loaded'&&document.readyState!='complete'){setTimeout(arguments.callee,0);return;}
if(numStyles===undefined){var links=document.getElementsByTagName('link');for(var i=0;i<links.length;i++){if(links[i].getAttribute('rel')=='stylesheet'){numStyles++;}}
var styles=document.getElementsByTagName('style');numStyles+=styles.length;}
if(document.styleSheets.length!=numStyles){setTimeout(arguments.callee,0);return;}
domReady();})();}
addLoadEvent(domReady);};DomReady.ready=function(fn,args){bindReady();if(isReady){fn.call(window,[]);}else{readyList.push(function(){return fn.call(window,[]);});}};bindReady();})();


window.tinyMCEPreInit = {
  base : '/js/tiny_mce',
  suffix : '',  
  query : ''
}
window.tinyMCE_GZ = { loaded : true };(function(d){var a=/^\s*|\s*$/g,e,c="B".replace(/A(.)|B/,"$1")==="$1";var b={majorVersion:"3",minorVersion:"4",releaseDate:"2011-03-10",_init:function(){var s=this,q=document,o=navigator,g=o.userAgent,m,f,l,k,j,r;s.isOpera=d.opera&&opera.buildNumber;s.isWebKit=/WebKit/.test(g);s.isIE=!s.isWebKit&&!s.isOpera&&(/MSIE/gi).test(g)&&(/Explorer/gi).test(o.appName);s.isIE6=s.isIE&&/MSIE [56]/.test(g);s.isGecko=!s.isWebKit&&/Gecko/.test(g);s.isMac=g.indexOf("Mac")!=-1;s.isAir=/adobeair/i.test(g);s.isIDevice=/(iPad|iPhone)/.test(g);if(d.tinyMCEPreInit){s.suffix=tinyMCEPreInit.suffix;s.baseURL=tinyMCEPreInit.base;s.query=tinyMCEPreInit.query;return}s.suffix="";f=q.getElementsByTagName("base");for(m=0;m<f.length;m++){if(r=f[m].href){if(/^https?:\/\/[^\/]+$/.test(r)){r+="/"}k=r?r.match(/.*\//)[0]:""}}function h(i){if(i.src&&/tiny_mce(|_gzip|_jquery|_prototype|_full)(_dev|_src)?.js/.test(i.src)){if(/_(src|dev)\.js/g.test(i.src)){s.suffix="_src"}if((j=i.src.indexOf("?"))!=-1){s.query=i.src.substring(j+1)}s.baseURL=i.src.substring(0,i.src.lastIndexOf("/"));if(k&&s.baseURL.indexOf("://")==-1&&s.baseURL.indexOf("/")!==0){s.baseURL=k+s.baseURL}return s.baseURL}return null}f=q.getElementsByTagName("script");for(m=0;m<f.length;m++){if(h(f[m])){return}}l=q.getElementsByTagName("head")[0];if(l){f=l.getElementsByTagName("script");for(m=0;m<f.length;m++){if(h(f[m])){return}}}return},is:function(g,f){if(!f){return g!==e}if(f=="array"&&(g.hasOwnProperty&&g instanceof Array)){return true}return typeof(g)==f},makeMap:function(f,j,h){var g;f=f||[];j=j||",";if(typeof(f)=="string"){f=f.split(j)}h=h||{};g=f.length;while(g--){h[f[g]]={}}return h},each:function(i,f,h){var j,g;if(!i){return 0}h=h||i;if(i.length!==e){for(j=0,g=i.length;j<g;j++){if(f.call(h,i[j],j,i)===false){return 0}}}else{for(j in i){if(i.hasOwnProperty(j)){if(f.call(h,i[j],j,i)===false){return 0}}}}return 1},map:function(g,h){var i=[];b.each(g,function(f){i.push(h(f))});return i},grep:function(g,h){var i=[];b.each(g,function(f){if(!h||h(f)){i.push(f)}});return i},inArray:function(g,h){var j,f;if(g){for(j=0,f=g.length;j<f;j++){if(g[j]===h){return j}}}return -1},extend:function(k,j){var h,g,f=arguments;for(h=1,g=f.length;h<g;h++){j=f[h];b.each(j,function(i,l){if(i!==e){k[l]=i}})}return k},trim:function(f){return(f?""+f:"").replace(a,"")},create:function(o,f,j){var n=this,g,i,k,l,h,m=0;o=/^((static) )?([\w.]+)(:([\w.]+))?/.exec(o);k=o[3].match(/(^|\.)(\w+)$/i)[2];i=n.createNS(o[3].replace(/\.\w+$/,""),j);if(i[k]){return}if(o[2]=="static"){i[k]=f;if(this.onCreate){this.onCreate(o[2],o[3],i[k])}return}if(!f[k]){f[k]=function(){};m=1}i[k]=f[k];n.extend(i[k].prototype,f);if(o[5]){g=n.resolve(o[5]).prototype;l=o[5].match(/\.(\w+)$/i)[1];h=i[k];if(m){i[k]=function(){return g[l].apply(this,arguments)}}else{i[k]=function(){this.parent=g[l];return h.apply(this,arguments)}}i[k].prototype[k]=i[k];n.each(g,function(p,q){i[k].prototype[q]=g[q]});n.each(f,function(p,q){if(g[q]){i[k].prototype[q]=function(){this.parent=g[q];return p.apply(this,arguments)}}else{if(q!=k){i[k].prototype[q]=p}}})}n.each(f["static"],function(p,q){i[k][q]=p});if(this.onCreate){this.onCreate(o[2],o[3],i[k].prototype)}},walk:function(i,h,j,g){g=g||this;if(i){if(j){i=i[j]}b.each(i,function(k,f){if(h.call(g,k,f,j)===false){return false}b.walk(k,h,j,g)})}},createNS:function(j,h){var g,f;h=h||d;j=j.split(".");for(g=0;g<j.length;g++){f=j[g];if(!h[f]){h[f]={}}h=h[f]}return h},resolve:function(j,h){var g,f;h=h||d;j=j.split(".");for(g=0,f=j.length;g<f;g++){h=h[j[g]];if(!h){break}}return h},addUnload:function(j,i){var h=this;j={func:j,scope:i||this};if(!h.unloads){function g(){var f=h.unloads,l,m;if(f){for(m in f){l=f[m];if(l&&l.func){l.func.call(l.scope,1)}}if(d.detachEvent){d.detachEvent("onbeforeunload",k);d.detachEvent("onunload",g)}else{if(d.removeEventListener){d.removeEventListener("unload",g,false)}}h.unloads=l=f=w=g=0;if(d.CollectGarbage){CollectGarbage()}}}function k(){var l=document;if(l.readyState=="interactive"){function f(){l.detachEvent("onstop",f);if(g){g()}l=0}if(l){l.attachEvent("onstop",f)}d.setTimeout(function(){if(l){l.detachEvent("onstop",f)}},0)}}if(d.attachEvent){d.attachEvent("onunload",g);d.attachEvent("onbeforeunload",k)}else{if(d.addEventListener){d.addEventListener("unload",g,false)}}h.unloads=[j]}else{h.unloads.push(j)}return j},removeUnload:function(i){var g=this.unloads,h=null;b.each(g,function(j,f){if(j&&j.func==i){g.splice(f,1);h=i;return false}});return h},explode:function(f,g){return f?b.map(f.split(g||","),b.trim):f},_addVer:function(g){var f;if(!this.query){return g}f=(g.indexOf("?")==-1?"?":"&")+this.query;if(g.indexOf("#")==-1){return g+f}return g.replace("#",f+"#")},_replace:function(h,f,g){if(c){return g.replace(h,function(){var l=f,j=arguments,k;for(k=0;k<j.length-2;k++){if(j[k]===e){l=l.replace(new RegExp("\\$"+k,"g"),"")}else{l=l.replace(new RegExp("\\$"+k,"g"),j[k])}}return l})}return g.replace(h,f)}};b._init();d.tinymce=d.tinyMCE=b})(window);tinymce.create("tinymce.util.Dispatcher",{scope:null,listeners:null,Dispatcher:function(a){this.scope=a||this;this.listeners=[]},add:function(a,b){this.listeners.push({cb:a,scope:b||this.scope});return a},addToTop:function(a,b){this.listeners.unshift({cb:a,scope:b||this.scope});return a},remove:function(a){var b=this.listeners,c=null;tinymce.each(b,function(e,d){if(a==e.cb){c=a;b.splice(d,1);return false}});return c},dispatch:function(){var f,d=arguments,e,b=this.listeners,g;for(e=0;e<b.length;e++){g=b[e];f=g.cb.apply(g.scope,d);if(f===false){break}}return f}});(function(){var a=tinymce.each;tinymce.create("tinymce.util.URI",{URI:function(e,g){var f=this,h,d,c;e=tinymce.trim(e);g=f.settings=g||{};if(/^(mailto|tel|news|javascript|about|data):/i.test(e)||/^\s*#/.test(e)){f.source=e;return}if(e.indexOf("/")===0&&e.indexOf("//")!==0){e=(g.base_uri?g.base_uri.protocol||"http":"http")+"://mce_host"+e}if(!/^\w*:?\/\//.test(e)){e=(g.base_uri.protocol||"http")+"://mce_host"+f.toAbsPath(g.base_uri.path,e)}e=e.replace(/@@/g,"(mce_at)");e=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(e);a(["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],function(b,j){var k=e[j];if(k){k=k.replace(/\(mce_at\)/g,"@@")}f[b]=k});if(c=g.base_uri){if(!f.protocol){f.protocol=c.protocol}if(!f.userInfo){f.userInfo=c.userInfo}if(!f.port&&f.host=="mce_host"){f.port=c.port}if(!f.host||f.host=="mce_host"){f.host=c.host}f.source=""}},setPath:function(c){var b=this;c=/^(.*?)\/?(\w+)?$/.exec(c);b.path=c[0];b.directory=c[1];b.file=c[2];b.source="";b.getURI()},toRelative:function(b){var c=this,d;if(b==="./"){return b}b=new tinymce.util.URI(b,{base_uri:c});if((b.host!="mce_host"&&c.host!=b.host&&b.host)||c.port!=b.port||c.protocol!=b.protocol){return b.getURI()}d=c.toRelPath(c.path,b.path);if(b.query){d+="?"+b.query}if(b.anchor){d+="#"+b.anchor}return d},toAbsolute:function(b,c){var b=new tinymce.util.URI(b,{base_uri:this});return b.getURI(this.host==b.host&&this.protocol==b.protocol?c:0)},toRelPath:function(g,h){var c,f=0,d="",e,b;g=g.substring(0,g.lastIndexOf("/"));g=g.split("/");c=h.split("/");if(g.length>=c.length){for(e=0,b=g.length;e<b;e++){if(e>=c.length||g[e]!=c[e]){f=e+1;break}}}if(g.length<c.length){for(e=0,b=c.length;e<b;e++){if(e>=g.length||g[e]!=c[e]){f=e+1;break}}}if(f==1){return h}for(e=0,b=g.length-(f-1);e<b;e++){d+="../"}for(e=f-1,b=c.length;e<b;e++){if(e!=f-1){d+="/"+c[e]}else{d+=c[e]}}return d},toAbsPath:function(e,f){var c,b=0,h=[],d,g;d=/\/$/.test(f)?"/":"";e=e.split("/");f=f.split("/");a(e,function(i){if(i){h.push(i)}});e=h;for(c=f.length-1,h=[];c>=0;c--){if(f[c].length==0||f[c]=="."){continue}if(f[c]==".."){b++;continue}if(b>0){b--;continue}h.push(f[c])}c=e.length-b;if(c<=0){g=h.reverse().join("/")}else{g=e.slice(0,c).join("/")+"/"+h.reverse().join("/")}if(g.indexOf("/")!==0){g="/"+g}if(d&&g.lastIndexOf("/")!==g.length-1){g+=d}return g},getURI:function(d){var c,b=this;if(!b.source||d){c="";if(!d){if(b.protocol){c+=b.protocol+"://"}if(b.userInfo){c+=b.userInfo+"@"}if(b.host){c+=b.host}if(b.port){c+=":"+b.port}}if(b.path){c+=b.path}if(b.query){c+="?"+b.query}if(b.anchor){c+="#"+b.anchor}b.source=c}return b.source}})})();(function(){var a=tinymce.each;tinymce.create("static tinymce.util.Cookie",{getHash:function(d){var b=this.get(d),c;if(b){a(b.split("&"),function(e){e=e.split("=");c=c||{};c[unescape(e[0])]=unescape(e[1])})}return c},setHash:function(j,b,g,f,i,c){var h="";a(b,function(e,d){h+=(!h?"":"&")+escape(d)+"="+escape(e)});this.set(j,h,g,f,i,c)},get:function(i){var h=document.cookie,g,f=i+"=",d;if(!h){return}d=h.indexOf("; "+f);if(d==-1){d=h.indexOf(f);if(d!=0){return null}}else{d+=2}g=h.indexOf(";",d);if(g==-1){g=h.length}return unescape(h.substring(d+f.length,g))},set:function(i,b,g,f,h,c){document.cookie=i+"="+escape(b)+((g)?"; expires="+g.toGMTString():"")+((f)?"; path="+escape(f):"")+((h)?"; domain="+h:"")+((c)?"; secure":"")},remove:function(e,b){var c=new Date();c.setTime(c.getTime()-1000);this.set(e,"",c,b,c)}})})();(function(){function serialize(o,quote){var i,v,t;quote=quote||'"';if(o==null){return"null"}t=typeof o;if(t=="string"){v="\bb\tt\nn\ff\rr\"\"''\\\\";return quote+o.replace(/([\u0080-\uFFFF\x00-\x1f\"\'])/g,function(a,b){if(quote==='"'&&a==="'"){return a}i=v.indexOf(b);if(i+1){return"\\"+v.charAt(i+1)}a=b.charCodeAt().toString(16);return"\\u"+"0000".substring(a.length)+a})+quote}if(t=="object"){if(o.hasOwnProperty&&o instanceof Array){for(i=0,v="[";i<o.length;i++){v+=(i>0?",":"")+serialize(o[i],quote)}return v+"]"}v="{";for(i in o){v+=typeof o[i]!="function"?(v.length>1?","+quote:quote)+i+quote+":"+serialize(o[i],quote):""}return v+"}"}return""+o}tinymce.util.JSON={serialize:serialize,parse:function(s){try{return eval("("+s+")")}catch(ex){}}}})();tinymce.create("static tinymce.util.XHR",{send:function(g){var a,e,b=window,h=0;g.scope=g.scope||this;g.success_scope=g.success_scope||g.scope;g.error_scope=g.error_scope||g.scope;g.async=g.async===false?false:true;g.data=g.data||"";function d(i){a=0;try{a=new ActiveXObject(i)}catch(c){}return a}a=b.XMLHttpRequest?new XMLHttpRequest():d("Microsoft.XMLHTTP")||d("Msxml2.XMLHTTP");if(a){if(a.overrideMimeType){a.overrideMimeType(g.content_type)}a.open(g.type||(g.data?"POST":"GET"),g.url,g.async);if(g.content_type){a.setRequestHeader("Content-Type",g.content_type)}a.setRequestHeader("X-Requested-With","XMLHttpRequest");a.send(g.data);function f(){if(!g.async||a.readyState==4||h++>10000){if(g.success&&h<10000&&a.status==200){g.success.call(g.success_scope,""+a.responseText,a,g)}else{if(g.error){g.error.call(g.error_scope,h>10000?"TIMED_OUT":"GENERAL",a,g)}}a=null}else{b.setTimeout(f,10)}}if(!g.async){return f()}e=b.setTimeout(f,10)}}});(function(){var c=tinymce.extend,b=tinymce.util.JSON,a=tinymce.util.XHR;tinymce.create("tinymce.util.JSONRequest",{JSONRequest:function(d){this.settings=c({},d);this.count=0},send:function(f){var e=f.error,d=f.success;f=c(this.settings,f);f.success=function(h,g){h=b.parse(h);if(typeof(h)=="undefined"){h={error:"JSON Parse error."}}if(h.error){e.call(f.error_scope||f.scope,h.error,g)}else{d.call(f.success_scope||f.scope,h.result)}};f.error=function(h,g){if(e){e.call(f.error_scope||f.scope,h,g)}};f.data=b.serialize({id:f.id||"c"+(this.count++),method:f.method,params:f.params});f.content_type="application/json";a.send(f)},"static":{sendRPC:function(d){return new tinymce.util.JSONRequest().send(d)}}})}());(function(i){var a,g,d,j=/[&\"\u007E-\uFFFF]/g,b=/[<>&\u007E-\uFFFF]/g,f=/[<>&\"\']/g,c=/&(#)?([\w]+);/g;g={'"':"&quot;","'":"&#39;","<":"&lt;",">":"&gt;","&":"&amp;"};d={"&lt;":"<","&gt;":">","&amp;":"&","&quot;":'"',"&apos;":"'"};function h(k){var l;l=document.createElement("div");l.innerHTML=k;return l.textContent||l.innerText||k}function e(l,o){var m,n,k,p={};if(l){l=l.split(",");o=o||10;for(m=0;m<l.length;m+=2){n=String.fromCharCode(parseInt(l[m],o));if(!g[n]){k="&"+l[m+1]+";";p[n]=k;p[k]=n}}return p}}a=e("50,nbsp,51,iexcl,52,cent,53,pound,54,curren,55,yen,56,brvbar,57,sect,58,uml,59,copy,5a,ordf,5b,laquo,5c,not,5d,shy,5e,reg,5f,macr,5g,deg,5h,plusmn,5i,sup2,5j,sup3,5k,acute,5l,micro,5m,para,5n,middot,5o,cedil,5p,sup1,5q,ordm,5r,raquo,5s,frac14,5t,frac12,5u,frac34,5v,iquest,60,Agrave,61,Aacute,62,Acirc,63,Atilde,64,Auml,65,Aring,66,AElig,67,Ccedil,68,Egrave,69,Eacute,6a,Ecirc,6b,Euml,6c,Igrave,6d,Iacute,6e,Icirc,6f,Iuml,6g,ETH,6h,Ntilde,6i,Ograve,6j,Oacute,6k,Ocirc,6l,Otilde,6m,Ouml,6n,times,6o,Oslash,6p,Ugrave,6q,Uacute,6r,Ucirc,6s,Uuml,6t,Yacute,6u,THORN,6v,szlig,70,agrave,71,aacute,72,acirc,73,atilde,74,auml,75,aring,76,aelig,77,ccedil,78,egrave,79,eacute,7a,ecirc,7b,euml,7c,igrave,7d,iacute,7e,icirc,7f,iuml,7g,eth,7h,ntilde,7i,ograve,7j,oacute,7k,ocirc,7l,otilde,7m,ouml,7n,divide,7o,oslash,7p,ugrave,7q,uacute,7r,ucirc,7s,uuml,7t,yacute,7u,thorn,7v,yuml,ci,fnof,sh,Alpha,si,Beta,sj,Gamma,sk,Delta,sl,Epsilon,sm,Zeta,sn,Eta,so,Theta,sp,Iota,sq,Kappa,sr,Lambda,ss,Mu,st,Nu,su,Xi,sv,Omicron,t0,Pi,t1,Rho,t3,Sigma,t4,Tau,t5,Upsilon,t6,Phi,t7,Chi,t8,Psi,t9,Omega,th,alpha,ti,beta,tj,gamma,tk,delta,tl,epsilon,tm,zeta,tn,eta,to,theta,tp,iota,tq,kappa,tr,lambda,ts,mu,tt,nu,tu,xi,tv,omicron,u0,pi,u1,rho,u2,sigmaf,u3,sigma,u4,tau,u5,upsilon,u6,phi,u7,chi,u8,psi,u9,omega,uh,thetasym,ui,upsih,um,piv,812,bull,816,hellip,81i,prime,81j,Prime,81u,oline,824,frasl,88o,weierp,88h,image,88s,real,892,trade,89l,alefsym,8cg,larr,8ch,uarr,8ci,rarr,8cj,darr,8ck,harr,8dl,crarr,8eg,lArr,8eh,uArr,8ei,rArr,8ej,dArr,8ek,hArr,8g0,forall,8g2,part,8g3,exist,8g5,empty,8g7,nabla,8g8,isin,8g9,notin,8gb,ni,8gf,prod,8gh,sum,8gi,minus,8gn,lowast,8gq,radic,8gt,prop,8gu,infin,8h0,ang,8h7,and,8h8,or,8h9,cap,8ha,cup,8hb,int,8hk,there4,8hs,sim,8i5,cong,8i8,asymp,8j0,ne,8j1,equiv,8j4,le,8j5,ge,8k2,sub,8k3,sup,8k4,nsub,8k6,sube,8k7,supe,8kl,oplus,8kn,otimes,8l5,perp,8m5,sdot,8o8,lceil,8o9,rceil,8oa,lfloor,8ob,rfloor,8p9,lang,8pa,rang,9ea,loz,9j0,spades,9j3,clubs,9j5,hearts,9j6,diams,ai,OElig,aj,oelig,b0,Scaron,b1,scaron,bo,Yuml,m6,circ,ms,tilde,802,ensp,803,emsp,809,thinsp,80c,zwnj,80d,zwj,80e,lrm,80f,rlm,80j,ndash,80k,mdash,80o,lsquo,80p,rsquo,80q,sbquo,80s,ldquo,80t,rdquo,80u,bdquo,810,dagger,811,Dagger,81g,permil,81p,lsaquo,81q,rsaquo,85c,euro",32);i.html=i.html||{};i.html.Entities={encodeRaw:function(l,k){return l.replace(k?j:b,function(m){return g[m]||m})},encodeAllRaw:function(k){return(""+k).replace(f,function(l){return g[l]||l})},encodeNumeric:function(l,k){return l.replace(k?j:b,function(m){return g[m]||"&#"+m.charCodeAt(0)+";"})},encodeNamed:function(m,k,l){l=l||a;return m.replace(k?j:b,function(n){return g[n]||l[n]||n})},getEncodeFunc:function(k,n){var o=i.html.Entities;n=e(n)||a;function l(q,p){return q.replace(p?j:b,function(r){return g[r]||n[r]||"&#"+r.charCodeAt(0)+";"||r})}function m(q,p){return o.encodeNamed(q,p,n)}k=i.makeMap(k.replace(/\+/g,","));if(k.named&&k.numeric){return l}if(k.named){if(n){return m}return o.encodeNamed}if(k.numeric){return o.encodeNumeric}return o.encodeRaw},decode:function(k){return k.replace(c,function(m,l,n){if(l){return String.fromCharCode(n)}return d[m]||a[m]||h(m)})}}})(tinymce);tinymce.html.Styles=function(d,f){var k=/rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)/gi,h=/(?:url(?:(?:\(\s*\"([^\"]+)\"\s*\))|(?:\(\s*\'([^\']+)\'\s*\))|(?:\(\s*([^)\s]+)\s*\))))|(?:\'([^\']+)\')|(?:\"([^\"]+)\")/gi,b=/\s*([^:]+):\s*([^;]+);?/g,l=/\s+$/,m=/rgb/,e,g,a={},j;d=d||{};j="\\\" \\' \\; \\: ; : _".split(" ");for(g=0;g<j.length;g++){a[j[g]]="_"+g;a["_"+g]=j[g]}function c(n,q,p,i){function o(r){r=parseInt(r).toString(16);return r.length>1?r:"0"+r}return"#"+o(q)+o(p)+o(i)}return{toHex:function(i){return i.replace(k,c)},parse:function(r){var y={},p,n,v,q,u=d.url_converter,x=d.url_converter_scope||this;function o(C,F){var E,B,A,D;E=y[C+"-top"+F];if(!E){return}B=y[C+"-right"+F];if(E!=B){return}A=y[C+"-bottom"+F];if(B!=A){return}D=y[C+"-left"+F];if(A!=D){return}y[C+F]=D;delete y[C+"-top"+F];delete y[C+"-right"+F];delete y[C+"-bottom"+F];delete y[C+"-left"+F]}function t(B){var C=y[B],A;if(!C||C.indexOf(" ")<0){return}C=C.split(" ");A=C.length;while(A--){if(C[A]!==C[0]){return false}}y[B]=C[0];return true}function z(C,B,A,D){if(!t(B)){return}if(!t(A)){return}if(!t(D)){return}y[C]=y[B]+" "+y[A]+" "+y[D];delete y[B];delete y[A];delete y[D]}function s(A){q=true;return a[A]}function i(B,A){if(q){B=B.replace(/_[0-9]/g,function(C){return a[C]})}if(!A){B=B.replace(/\\([\'\";:])/g,"$1")}return B}if(r){r=r.replace(/\\[\"\';:_]/g,s).replace(/\"[^\"]+\"|\'[^\']+\'/g,function(A){return A.replace(/[;:]/g,s)});while(p=b.exec(r)){n=p[1].replace(l,"").toLowerCase();v=p[2].replace(l,"");if(n&&v.length>0){if(n==="font-weight"&&v==="700"){v="bold"}else{if(n==="color"||n==="background-color"){v=v.toLowerCase()}}v=v.replace(k,c);v=v.replace(h,function(B,A,E,D,F,C){F=F||C;if(F){F=i(F);return"'"+F.replace(/\'/g,"\\'")+"'"}A=i(A||E||D);if(u){A=u.call(x,A,"style")}return"url('"+A.replace(/\'/g,"\\'")+"')"});y[n]=q?i(v,true):v}b.lastIndex=p.index+p[0].length}o("border","");o("border","-width");o("border","-color");o("border","-style");o("padding","");o("margin","");z("border","border-width","border-style","border-color");if(y.border==="medium none"){delete y.border}}return y},serialize:function(p,r){var o="",n,q;function i(t){var x,u,s,t,v;x=f.styles[t];if(x){for(u=0,s=x.length;u<s;u++){t=x[u];v=p[t];if(v!==e){o+=(o.length>0?" ":"")+t+": "+v+";"}}}}if(r&&f&&f.styles){i("*");i(n)}else{for(n in p){q=p[n];if(q!==e){o+=(o.length>0?" ":"")+n+": "+q+";"}}}return o}}};(function(l){var g={},i,k,f,d,b,e,c=l.makeMap,j=l.each;function h(n,m){return n.split(m||",")}function a(q,p){var n,o={};function m(r){return r.replace(/[A-Z]+/g,function(s){return m(q[s])})}for(n in q){if(q.hasOwnProperty(n)){q[n]=m(q[n])}}m(p).replace(/#/g,"#text").replace(/(\w+)\[([^\]]+)\]\[([^\]]*)\]/g,function(u,s,r,t){r=h(r,"|");o[s]={attributes:c(r),attributesOrder:r,children:c(t,"|",{"#comment":{}})}});return o}k="h1,h2,h3,h4,h5,h6,hr,p,div,address,pre,form,table,tbody,thead,tfoot,th,tr,td,li,ol,ul,caption,blockquote,center,dl,dt,dd,dir,fieldset,noscript,menu,isindex,samp,header,footer,article,section,hgroup";k=c(k,",",c(k.toUpperCase()));g=a({Z:"H|K|N|O|P",Y:"X|form|R|Q",ZG:"E|span|width|align|char|charoff|valign",X:"p|T|div|U|W|isindex|fieldset|table",ZF:"E|align|char|charoff|valign",W:"pre|hr|blockquote|address|center|noframes",ZE:"abbr|axis|headers|scope|rowspan|colspan|align|char|charoff|valign|nowrap|bgcolor|width|height",ZD:"[E][S]",U:"ul|ol|dl|menu|dir",ZC:"p|Y|div|U|W|table|br|span|bdo|object|applet|img|map|K|N|Q",T:"h1|h2|h3|h4|h5|h6",ZB:"X|S|Q",S:"R|P",ZA:"a|G|J|M|O|P",R:"a|H|K|N|O",Q:"noscript|P",P:"ins|del|script",O:"input|select|textarea|label|button",N:"M|L",M:"em|strong|dfn|code|q|samp|kbd|var|cite|abbr|acronym",L:"sub|sup",K:"J|I",J:"tt|i|b|u|s|strike",I:"big|small|font|basefont",H:"G|F",G:"br|span|bdo",F:"object|applet|img|map|iframe",E:"A|B|C",D:"accesskey|tabindex|onfocus|onblur",C:"onclick|ondblclick|onmousedown|onmouseup|onmouseover|onmousemove|onmouseout|onkeypress|onkeydown|onkeyup",B:"lang|xml:lang|dir",A:"id|class|style|title"},"script[id|charset|type|language|src|defer|xml:space][]style[B|id|type|media|title|xml:space][]object[E|declare|classid|codebase|data|type|codetype|archive|standby|width|height|usemap|name|tabindex|align|border|hspace|vspace][#|param|Y]param[id|name|value|valuetype|type][]p[E|align][#|S]a[E|D|charset|type|name|href|hreflang|rel|rev|shape|coords|target][#|Z]br[A|clear][]span[E][#|S]bdo[A|C|B][#|S]applet[A|codebase|archive|code|object|alt|name|width|height|align|hspace|vspace][#|param|Y]h1[E|align][#|S]img[E|src|alt|name|longdesc|width|height|usemap|ismap|align|border|hspace|vspace][]map[B|C|A|name][X|form|Q|area]h2[E|align][#|S]iframe[A|longdesc|name|src|frameborder|marginwidth|marginheight|scrolling|align|width|height][#|Y]h3[E|align][#|S]tt[E][#|S]i[E][#|S]b[E][#|S]u[E][#|S]s[E][#|S]strike[E][#|S]big[E][#|S]small[E][#|S]font[A|B|size|color|face][#|S]basefont[id|size|color|face][]em[E][#|S]strong[E][#|S]dfn[E][#|S]code[E][#|S]q[E|cite][#|S]samp[E][#|S]kbd[E][#|S]var[E][#|S]cite[E][#|S]abbr[E][#|S]acronym[E][#|S]sub[E][#|S]sup[E][#|S]input[E|D|type|name|value|checked|disabled|readonly|size|maxlength|src|alt|usemap|onselect|onchange|accept|align][]select[E|name|size|multiple|disabled|tabindex|onfocus|onblur|onchange][optgroup|option]optgroup[E|disabled|label][option]option[E|selected|disabled|label|value][]textarea[E|D|name|rows|cols|disabled|readonly|onselect|onchange][]label[E|for|accesskey|onfocus|onblur][#|S]button[E|D|name|value|type|disabled][#|p|T|div|U|W|table|G|object|applet|img|map|K|N|Q]h4[E|align][#|S]ins[E|cite|datetime][#|Y]h5[E|align][#|S]del[E|cite|datetime][#|Y]h6[E|align][#|S]div[E|align][#|Y]ul[E|type|compact][li]li[E|type|value][#|Y]ol[E|type|compact|start][li]dl[E|compact][dt|dd]dt[E][#|S]dd[E][#|Y]menu[E|compact][li]dir[E|compact][li]pre[E|width|xml:space][#|ZA]hr[E|align|noshade|size|width][]blockquote[E|cite][#|Y]address[E][#|S|p]center[E][#|Y]noframes[E][#|Y]isindex[A|B|prompt][]fieldset[E][#|legend|Y]legend[E|accesskey|align][#|S]table[E|summary|width|border|frame|rules|cellspacing|cellpadding|align|bgcolor][caption|col|colgroup|thead|tfoot|tbody|tr]caption[E|align][#|S]col[ZG][]colgroup[ZG][col]thead[ZF][tr]tr[ZF|bgcolor][th|td]th[E|ZE][#|Y]form[E|action|method|name|enctype|onsubmit|onreset|accept|accept-charset|target][#|X|R|Q]noscript[E][#|Y]td[E|ZE][#|Y]tfoot[ZF][tr]tbody[ZF][tr]area[E|D|shape|coords|href|nohref|alt|target][]base[id|href|target][]body[E|onload|onunload|background|bgcolor|text|link|vlink|alink][#|Y]");i=c("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected,preload,autoplay,loop,controls");f=c("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,source");d=l.extend(c("td,th,iframe,video,object"),f);b=c("pre,script,style");e=c("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");l.html.Schema=function(p){var x=this,m={},n={},u=[],o;p=p||{};if(p.verify_html===false){p.valid_elements="*[*]"}if(p.valid_styles){o={};j(p.valid_styles,function(z,y){o[y]=l.explode(z)})}function v(y){return new RegExp("^"+y.replace(/([?+*])/g,".$1")+"$")}function r(F){var E,A,T,P,U,z,C,O,R,K,S,W,I,D,Q,y,M,B,V,X,J,N,H=/^([#+-])?([^\[\/]+)(?:\/([^\[]+))?(?:\[([^\]]+)\])?$/,L=/^([!\-])?(\w+::\w+|[^=:<]+)?(?:([=:<])(.*))?$/,G=/[*?+]/;if(F){F=h(F);if(m["@"]){M=m["@"].attributes;B=m["@"].attributesOrder}for(E=0,A=F.length;E<A;E++){z=H.exec(F[E]);if(z){Q=z[1];K=z[2];y=z[3];R=z[4];I={};D=[];C={attributes:I,attributesOrder:D};if(Q==="#"){C.paddEmpty=true}if(Q==="-"){C.removeEmpty=true}if(M){for(X in M){I[X]=M[X]}D.push.apply(D,B)}if(R){R=h(R,"|");for(T=0,P=R.length;T<P;T++){z=L.exec(R[T]);if(z){O={};W=z[1];S=z[2].replace(/::/g,":");Q=z[3];N=z[4];if(W==="!"){C.attributesRequired=C.attributesRequired||[];C.attributesRequired.push(S);O.required=true}if(W==="-"){delete I[S];D.splice(l.inArray(D,S),1);continue}if(Q){if(Q==="="){C.attributesDefault=C.attributesDefault||[];C.attributesDefault.push({name:S,value:N});O.defaultValue=N}if(Q===":"){C.attributesForced=C.attributesForced||[];C.attributesForced.push({name:S,value:N});O.forcedValue=N}if(Q==="<"){O.validValues=c(N,"?")}}if(G.test(S)){C.attributePatterns=C.attributePatterns||[];O.pattern=v(S);C.attributePatterns.push(O)}else{if(!I[S]){D.push(S)}I[S]=O}}}}if(!M&&K=="@"){M=I;B=D}if(y){C.outputName=K;m[y]=C}if(G.test(K)){C.pattern=v(K);u.push(C)}else{m[K]=C}}}}}function t(y){m={};u=[];r(y);j(g,function(A,z){n[z]=A.children})}function q(z){var y=/^(~)?(.+)$/;if(z){j(h(z),function(C){var B=y.exec(C),D=B[1]==="~"?"span":"div",A=B[2];n[A]=n[D];j(n,function(E,F){if(E[D]){E[A]=E[D]}})})}}function s(z){var y=/^([+\-]?)(\w+)\[([^\]]+)\]$/;if(z){j(h(z),function(D){var C=y.exec(D),A,B;if(C){B=C[1];if(B){A=n[C[2]]}else{A=n[C[2]]={"#comment":{}}}A=n[C[2]];j(h(C[3],"|"),function(E){if(B==="-"){delete A[E]}else{A[E]={}}})}})}}if(!p.valid_elements){j(g,function(z,y){m[y]={attributes:z.attributes,attributesOrder:z.attributesOrder};n[y]=z.children});j(h("strong/b,em/i"),function(y){y=h(y,"/");m[y[1]].outputName=y[0]});m.img.attributesDefault=[{name:"alt",value:""}];j(h("ol,ul,li,sub,sup,blockquote,tr,div,span,font,a,table,tbody"),function(y){m[y].removeEmpty=true});j(h("p,h1,h2,h3,h4,h5,h6,th,td,pre,div,address,caption"),function(y){m[y].paddEmpty=true})}else{t(p.valid_elements)}q(p.custom_elements);s(p.valid_children);r(p.extended_valid_elements);s("+ol[ul|ol],+ul[ul|ol]");if(p.invalid_elements){l.each(l.explode(p.invalid_elements),function(y){if(m[y]){delete m[y]}})}x.children=n;x.styles=o;x.getBoolAttrs=function(){return i};x.getBlockElements=function(){return k};x.getShortEndedElements=function(){return f};x.getSelfClosingElements=function(){return e};x.getNonEmptyElements=function(){return d};x.getWhiteSpaceElements=function(){return b};x.isValidChild=function(y,A){var z=n[y];return !!(z&&z[A])};x.getElementRule=function(y){var A=m[y],z;if(A){return A}z=u.length;while(z--){A=u[z];if(A.pattern.test(y)){return A}}};x.addValidElements=r;x.setValidElements=t;x.addCustomElements=q;x.addValidChildren=s};l.html.Schema.boolAttrMap=i;l.html.Schema.blockElementsMap=k})(tinymce);(function(a){a.html.SaxParser=function(c,e){var b=this,d=function(){};c=c||{};b.schema=e=e||new a.html.Schema();if(c.fix_self_closing!==false){c.fix_self_closing=true}a.each("comment cdata text start end pi doctype".split(" "),function(f){if(f){b[f]=c[f]||d}});b.parse=function(q){var A=this,f,m=0,G,j,l=[],B,K,t,N,F,k,p,x,I,r,E,o,J,n,H,M,L,z,D,h,g,u,s=0,v=a.html.Entities.decode,y;function C(O){var Q,P;Q=l.length;while(Q--){if(l[Q].name===O){break}}if(Q>=0){for(P=l.length-1;P>=Q;P--){O=l[P];if(O.valid){A.end(O.name)}}l.length=Q}}D=new RegExp("<(?:(?:!--([\\w\\W]*?)-->)|(?:!\\[CDATA\\[([\\w\\W]*?)\\]\\]>)|(?:!DOCTYPE([\\w\\W]*?)>)|(?:\\?([^\\s\\/<>]+) ?([\\w\\W]*?)[?/]>)|(?:\\/([^>]+)>)|(?:([^\\s\\/<>]+)\\s*((?:[^\"'>]+(?:(?:\"[^\"]*\")|(?:'[^']*')|[^>]*))*)>))","g");h=/([\w:\-]+)(?:\s*=\s*(?:(?:\"((?:\\.|[^\"])*)\")|(?:\'((?:\\.|[^\'])*)\')|([^>\s]+)))?/g;g={script:/<\/script[^>]*>/gi,style:/<\/style[^>]*>/gi,noscript:/<\/noscript[^>]*>/gi};F=e.getShortEndedElements();z=e.getSelfClosingElements();k=e.getBoolAttrs();x=c.validate;y=c.fix_self_closing;while(f=D.exec(q)){if(m<f.index){A.text(v(q.substr(m,f.index-m)))}if(G=f[6]){C(G.toLowerCase())}else{if(G=f[7]){G=G.toLowerCase();p=G in F;if(y&&z[G]&&l.length>0&&l[l.length-1].name===G){C(G)}if(!x||(I=e.getElementRule(G))){r=true;if(x){J=I.attributes;n=I.attributePatterns}if(o=f[8]){B=[];B.map={};o.replace(h,function(P,O,T,S,R){var U,Q;O=O.toLowerCase();T=O in k?O:v(T||S||R||"");if(x&&O.indexOf("data-")!==0){U=J[O];if(!U&&n){Q=n.length;while(Q--){U=n[Q];if(U.pattern.test(O)){break}}if(Q===-1){U=null}}if(!U){return}if(U.validValues&&!(T in U.validValues)){return}}B.map[O]=T;B.push({name:O,value:T})})}else{B=[];B.map={}}if(x){H=I.attributesRequired;M=I.attributesDefault;L=I.attributesForced;if(L){K=L.length;while(K--){E=L[K];N=E.name;u=E.value;if(u==="{$uid}"){u="mce_"+s++}B.map[N]=u;B.push({name:N,value:u})}}if(M){K=M.length;while(K--){E=M[K];N=E.name;if(!(N in B.map)){u=E.value;if(u==="{$uid}"){u="mce_"+s++}B.map[N]=u;B.push({name:N,value:u})}}}if(H){K=H.length;while(K--){if(H[K] in B.map){break}}if(K===-1){r=false}}if(B.map["data-mce-bogus"]){r=false}}if(r){A.start(G,B,p)}}else{r=false}if(j=g[G]){j.lastIndex=m=f.index+f[0].length;if(f=j.exec(q)){if(r){t=q.substr(m,f.index-m)}m=f.index+f[0].length}else{t=q.substr(m);m=q.length}if(r&&t.length>0){A.text(t,true)}if(r){A.end(G)}D.lastIndex=m;continue}if(!p){if(!o||o.indexOf("/")!=o.length-1){l.push({name:G,valid:r})}else{if(r){A.end(G)}}}}else{if(G=f[1]){A.comment(G)}else{if(G=f[2]){A.cdata(G)}else{if(G=f[3]){A.doctype(G)}else{if(G=f[4]){A.pi(G,f[5])}}}}}}m=f.index+f[0].length}if(m<q.length){A.text(v(q.substr(m)))}for(K=l.length-1;K>=0;K--){G=l[K];if(G.valid){A.end(G.name)}}}}})(tinymce);(function(d){var c=/^[ \t\r\n]*$/,e={"#text":3,"#comment":8,"#cdata":4,"#pi":7,"#doctype":10,"#document-fragment":11};function a(k,l,j){var i,h,f=j?"lastChild":"firstChild",g=j?"prev":"next";if(k[f]){return k[f]}if(k!==l){i=k[g];if(i){return i}for(h=k.parent;h&&h!==l;h=h.parent){i=h[g];if(i){return i}}}}function b(f,g){this.name=f;this.type=g;if(g===1){this.attributes=[];this.attributes.map={}}}d.extend(b.prototype,{replace:function(g){var f=this;if(g.parent){g.remove()}f.insert(g,f);f.remove();return f},attr:function(h,l){var f=this,g,j,k;if(typeof h!=="string"){for(j in h){f.attr(j,h[j])}return f}if(g=f.attributes){if(l!==k){if(l===null){if(h in g.map){delete g.map[h];j=g.length;while(j--){if(g[j].name===h){g=g.splice(j,1);return f}}}return f}if(h in g.map){j=g.length;while(j--){if(g[j].name===h){g[j].value=l;break}}}else{g.push({name:h,value:l})}g.map[h]=l;return f}else{return g.map[h]}}},clone:function(){var g=this,n=new b(g.name,g.type),h,f,m,j,k;if(m=g.attributes){k=[];k.map={};for(h=0,f=m.length;h<f;h++){j=m[h];if(j.name!=="id"){k[k.length]={name:j.name,value:j.value};k.map[j.name]=j.value}}n.attributes=k}n.value=g.value;n.shortEnded=g.shortEnded;return n},wrap:function(g){var f=this;f.parent.insert(g,f);g.append(f);return f},unwrap:function(){var f=this,h,g;for(h=f.firstChild;h;){g=h.next;f.insert(h,f,true);h=g}f.remove()},remove:function(){var f=this,h=f.parent,g=f.next,i=f.prev;if(h){if(h.firstChild===f){h.firstChild=g;if(g){g.prev=null}}else{i.next=g}if(h.lastChild===f){h.lastChild=i;if(i){i.next=null}}else{g.prev=i}f.parent=f.next=f.prev=null}return f},append:function(h){var f=this,g;if(h.parent){h.remove()}g=f.lastChild;if(g){g.next=h;h.prev=g;f.lastChild=h}else{f.lastChild=f.firstChild=h}h.parent=f;return h},insert:function(h,f,i){var g;if(h.parent){h.remove()}g=f.parent||this;if(i){if(f===g.firstChild){g.firstChild=h}else{f.prev.next=h}h.prev=f.prev;h.next=f;f.prev=h}else{if(f===g.lastChild){g.lastChild=h}else{f.next.prev=h}h.next=f.next;h.prev=f;f.next=h}h.parent=g;return h},getAll:function(g){var f=this,h,i=[];for(h=f.firstChild;h;h=a(h,f)){if(h.name===g){i.push(h)}}return i},empty:function(){var g=this,f,h,j;if(g.firstChild){f=[];for(j=g.firstChild;j;j=a(j,g)){f.push(j)}h=f.length;while(h--){j=f[h];j.parent=j.firstChild=j.lastChild=j.next=j.prev=null}}g.firstChild=g.lastChild=null;return g},isEmpty:function(j){var f=this,h=f.firstChild,g;if(h){do{if(h.type===1){if(h.attributes.map["data-mce-bogus"]){continue}if(j[h.name]){return false}g=h.attributes.length;while(g--){if(h.attributes[g].name.indexOf("data-")===0){return false}}}if((h.type===3&&!c.test(h.value))){return false}}while(h=a(h,f))}return true}});d.extend(b,{create:function(g,f){var i,h;i=new b(g,e[g]||1);if(f){for(h in f){i.attr(h,f[h])}}return i}});d.html.Node=b})(tinymce);(function(b){var a=b.html.Node;b.html.DomParser=function(f,g){var e=this,d={},c=[];f=f||{};f.root_name=f.root_name||"body";e.schema=g=g||new b.html.Schema();function h(l){var n,o,v,u,y,m,p,k,s,t,j,r,x,q;r=b.makeMap("tr,td,th,tbody,thead,tfoot,table");j=g.getNonEmptyElements();for(n=0;n<l.length;n++){o=l[n];if(!o.parent){continue}u=[o];for(v=o.parent;v&&!g.isValidChild(v.name,o.name)&&!r[v.name];v=v.parent){u.push(v)}if(v&&u.length>1){u.reverse();y=m=u[0].clone();for(s=0;s<u.length-1;s++){if(g.isValidChild(m.name,u[s].name)){p=u[s].clone();m.append(p)}else{p=m}for(k=u[s].firstChild;k&&k!=u[s+1];){q=k.next;p.append(k);k=q}m=p}if(!y.isEmpty(j)){v.insert(y,u[0],true);v.insert(o,y)}else{v.insert(o,u[0],true)}if(u[0].isEmpty(j)){u[0].empty().remove()}}else{if(o.parent){if(o.name==="li"){x=o.prev;if(x&&(x.name==="ul"||x.name==="ul")){x.append(o);continue}x=o.next;if(x&&(x.name==="ul"||x.name==="ul")){x.insert(o,x.firstChild,true);continue}o.wrap(new a("ul",1));continue}if(g.isValidChild(o.parent.name,"div")&&g.isValidChild("div",o.name)){o.wrap(new a("div",1))}else{if(o.name==="style"||o.name==="script"){o.empty().remove()}else{o.unwrap()}}}}}}e.addNodeFilter=function(i,j){b.each(b.explode(i),function(k){var l=d[k];if(!l){d[k]=l=[]}l.push(j)})};e.addAttributeFilter=function(i,j){b.each(b.explode(i),function(k){var l;for(l=0;l<c.length;l++){if(c[l].name===k){c[l].callbacks.push(j);return}}c.push({name:k,callbacks:[j]})})};e.parse=function(v,m){var n,E,z,y,k={},p={},B,A,x,r,D,H,o,C,G=[],t,j,s,q,u;m=m||{};o=b.extend(b.makeMap("script,style,head,title,meta,param"),g.getBlockElements());u=g.getNonEmptyElements();q=g.children;s=g.getWhiteSpaceElements();C=/^[ \t\r\n]+/;t=/[ \t\r\n]+$/;j=/[ \t\r\n]+/g;function F(i,l){var I=new a(i,l),J;if(i in d){J=k[i];if(J){J.push(I)}else{k[i]=[I]}}return I}n=new b.html.SaxParser({validate:f.validate,fix_self_closing:false,cdata:function(i){z.append(F("#cdata",4)).value=i},text:function(I,i){var l;if(!s[z.name]){I=I.replace(j," ");if(z.lastChild&&o[z.lastChild.name]){I=I.replace(C,"")}}if(I.length!==0){l=F("#text",3);l.raw=!!i;z.append(l).value=I}},comment:function(i){z.append(F("#comment",8)).value=i},pi:function(i,l){z.append(F(i,7)).value=l},doctype:function(i){z.append(F("#doctype",10)).value=i},start:function(i,P,I){var N,K,J,l,L,Q,O,M;J=g.getElementRule(i);if(J){N=F(J.outputName||i,1);N.attributes=P;N.shortEnded=I;z.append(N);M=q[z.name];if(M&&q[N.name]&&!M[N.name]){G.push(N)}K=c.length;while(K--){L=c[K].name;if(L in P.map){D=p[L];if(D){D.push(N)}else{p[L]=[N]}}}if(o[i]){for(l=N.prev;l&&l.type===3;){Q=l.value.replace(t,"");if(Q.length>0){l.value=Q;l=l.prev}else{O=l.prev;l.remove();l=O}}}if(!I){z=N}}},end:function(i){var L,I,K,l,J;I=g.getElementRule(i);if(I){if(o[i]){if(!s[z.name]){for(L=z.firstChild;L&&L.type===3;){K=L.value.replace(C,"");if(K.length>0){L.value=K;L=L.next}else{l=L.next;L.remove();L=l}}for(L=z.lastChild;L&&L.type===3;){K=L.value.replace(t,"");if(K.length>0){L.value=K;L=L.prev}else{l=L.prev;L.remove();L=l}}}L=z.prev;if(L&&L.type===3){K=L.value.replace(C,"");if(K.length>0){L.value=K}else{L.remove()}}}if(I.removeEmpty||I.paddEmpty){if(z.isEmpty(u)){if(I.paddEmpty){z.empty().append(new a("#text","3")).value="\u00a0"}else{if(!z.attributes.map.name){J=z.parent;z.empty().remove();z=J;return}}}}z=z.parent}}},g);E=z=new a(f.root_name,11);n.parse(v);h(G);for(H in k){D=d[H];y=k[H];x=y.length;while(x--){if(!y[x].parent){y.splice(x,1)}}for(B=0,A=D.length;B<A;B++){D[B](y,H,m)}}for(B=0,A=c.length;B<A;B++){D=c[B];if(D.name in p){y=p[D.name];x=y.length;while(x--){if(!y[x].parent){y.splice(x,1)}}for(x=0,r=D.callbacks.length;x<r;x++){D.callbacks[x](y,D.name,m)}}}return E};if(f.remove_trailing_brs){e.addNodeFilter("br",function(m,k){var q,p=m.length,n,t=g.getBlockElements(),j=g.getNonEmptyElements(),r,o,s;for(q=0;q<p;q++){n=m[q];r=n.parent;if(t[n.parent.name]&&n===r.lastChild){o=n.prev;while(o){s=o.name;if(s!=="span"||o.attr("data-mce-type")!=="bookmark"){if(s!=="br"){break}if(s==="br"){n=null;break}}o=o.prev}if(n){n.remove();if(r.isEmpty(j)){elementRule=g.getElementRule(r.name);if(elementRule.removeEmpty){r.remove()}else{if(elementRule.paddEmpty){r.empty().append(new b.html.Node("#text",3)).value="\u00a0"}}}}}}})}}})(tinymce);tinymce.html.Writer=function(e){var c=[],a,b,d,f,g;e=e||{};a=e.indent;b=tinymce.makeMap(e.indent_before||"");d=tinymce.makeMap(e.indent_after||"");f=tinymce.html.Entities.getEncodeFunc(e.entity_encoding||"raw",e.entities);g=e.element_format=="html";return{start:function(m,k,p){var n,j,h,o;if(a&&b[m]&&c.length>0){o=c[c.length-1];if(o.length>0&&o!=="\n"){c.push("\n")}}c.push("<",m);if(k){for(n=0,j=k.length;n<j;n++){h=k[n];c.push(" ",h.name,'="',f(h.value,true),'"')}}if(!p||g){c[c.length]=">"}else{c[c.length]=" />"}},end:function(h){var i;c.push("</",h,">");if(a&&d[h]&&c.length>0){i=c[c.length-1];if(i.length>0&&i!=="\n"){c.push("\n")}}},text:function(i,h){if(i.length>0){c[c.length]=h?i:f(i)}},cdata:function(h){c.push("<![CDATA[",h,"]]>")},comment:function(h){c.push("<!--",h,"-->")},pi:function(h,i){if(i){c.push("<?",h," ",i,"?>")}else{c.push("<?",h,"?>")}},doctype:function(h){c.push("<!DOCTYPE",h,">")},reset:function(){c.length=0},getContent:function(){return c.join("").replace(/\n$/,"")}}};(function(a){a.html.Serializer=function(c,d){var b=this,e=new a.html.Writer(c);c=c||{};c.validate="validate" in c?c.validate:true;b.schema=d=d||new a.html.Schema();b.writer=e;b.serialize=function(h){var g,i;i=c.validate;g={3:function(k,j){e.text(k.value,k.raw)},8:function(j){e.comment(j.value)},7:function(j){e.pi(j.name,j.value)},10:function(j){e.doctype(j.value)},4:function(j){e.cdata(j.value)},11:function(j){if((j=j.firstChild)){do{f(j)}while(j=j.next)}}};e.reset();function f(k){var t=g[k.type],j,o,s,r,p,u,n,m,q;if(!t){j=k.name;o=k.shortEnded;s=k.attributes;if(i&&s&&s.length>1){u=[];u.map={};q=d.getElementRule(k.name);for(n=0,m=q.attributesOrder.length;n<m;n++){r=q.attributesOrder[n];if(r in s.map){p=s.map[r];u.map[r]=p;u.push({name:r,value:p})}}for(n=0,m=s.length;n<m;n++){r=s[n].name;if(!(r in u.map)){p=s.map[r];u.map[r]=p;u.push({name:r,value:p})}}s=u}e.start(k.name,s,o);if(!o){if((k=k.firstChild)){do{f(k)}while(k=k.next)}e.end(j)}}else{t(k)}}if(h.type==1&&!c.inner){f(h)}else{g[11](h)}return e.getContent()}}})(tinymce);(function(d){var f=d.each,c=d.is,e=d.isWebKit,a=d.isIE,h=d.html.Entities,b=/^([a-z0-9],?)+$/i,g=d.html.Schema.blockElementsMap;d.create("tinymce.dom.DOMUtils",{doc:null,root:null,files:null,pixelStyles:/^(top|left|bottom|right|width|height|borderWidth)$/,props:{"for":"htmlFor","class":"className",className:"className",checked:"checked",disabled:"disabled",maxlength:"maxLength",readonly:"readOnly",selected:"selected",value:"value",id:"id",name:"name",type:"type"},DOMUtils:function(m,k){var j=this,i;j.doc=m;j.win=window;j.files={};j.cssFlicker=false;j.counter=0;j.stdMode=!d.isIE||m.documentMode>=8;j.boxModel=!d.isIE||m.compatMode=="CSS1Compat"||j.stdMode;j.hasOuterHTML="outerHTML" in m.createElement("a");j.settings=k=d.extend({keep_values:false,hex_colors:1},k);j.styles=new d.html.Styles({url_converter:k.url_converter,url_converter_scope:k.url_converter_scope},k.schema);if(d.isIE6){try{m.execCommand("BackgroundImageCache",false,true)}catch(l){j.cssFlicker=true}}if(a){("abbr article aside audio canvas details figcaption figure footer header hgroup mark menu meter nav output progress section summary time video").replace(/\w+/g,function(n){m.createElement(n)})}d.addUnload(j.destroy,j)},getRoot:function(){var i=this,j=i.settings;return(j&&i.get(j.root_element))||i.doc.body},getViewPort:function(j){var k,i;j=!j?this.win:j;k=j.document;i=this.boxModel?k.documentElement:k.body;return{x:j.pageXOffset||i.scrollLeft,y:j.pageYOffset||i.scrollTop,w:j.innerWidth||i.clientWidth,h:j.innerHeight||i.clientHeight}},getRect:function(l){var k,i=this,j;l=i.get(l);k=i.getPos(l);j=i.getSize(l);return{x:k.x,y:k.y,w:j.w,h:j.h}},getSize:function(l){var j=this,i,k;l=j.get(l);i=j.getStyle(l,"width");k=j.getStyle(l,"height");if(i.indexOf("px")===-1){i=0}if(k.indexOf("px")===-1){k=0}return{w:parseInt(i)||l.offsetWidth||l.clientWidth,h:parseInt(k)||l.offsetHeight||l.clientHeight}},getParent:function(k,j,i){return this.getParents(k,j,i,false)},getParents:function(s,m,k,q){var j=this,i,l=j.settings,p=[];s=j.get(s);q=q===undefined;if(l.strict_root){k=k||j.getRoot()}if(c(m,"string")){i=m;if(m==="*"){m=function(o){return o.nodeType==1}}else{m=function(o){return j.is(o,i)}}}while(s){if(s==k||!s.nodeType||s.nodeType===9){break}if(!m||m(s)){if(q){p.push(s)}else{return s}}s=s.parentNode}return q?p:null},get:function(i){var j;if(i&&this.doc&&typeof(i)=="string"){j=i;i=this.doc.getElementById(i);if(i&&i.id!==j){return this.doc.getElementsByName(j)[1]}}return i},getNext:function(j,i){return this._findSib(j,i,"nextSibling")},getPrev:function(j,i){return this._findSib(j,i,"previousSibling")},select:function(k,j){var i=this;return d.dom.Sizzle(k,i.get(j)||i.get(i.settings.root_element)||i.doc,[])},is:function(l,j){var k;if(l.length===undefined){if(j==="*"){return l.nodeType==1}if(b.test(j)){j=j.toLowerCase().split(/,/);l=l.nodeName.toLowerCase();for(k=j.length-1;k>=0;k--){if(j[k]==l){return true}}return false}}return d.dom.Sizzle.matches(j,l.nodeType?[l]:l).length>0},add:function(l,o,i,k,m){var j=this;return this.run(l,function(r){var q,n;q=c(o,"string")?j.doc.createElement(o):o;j.setAttribs(q,i);if(k){if(k.nodeType){q.appendChild(k)}else{j.setHTML(q,k)}}return !m?r.appendChild(q):q})},create:function(k,i,j){return this.add(this.doc.createElement(k),k,i,j,1)},createHTML:function(q,i,m){var p="",l=this,j;p+="<"+q;for(j in i){if(i.hasOwnProperty(j)){p+=" "+j+'="'+l.encode(i[j])+'"'}}if(typeof(m)!="undefined"){return p+">"+m+"</"+q+">"}return p+" />"},remove:function(i,j){return this.run(i,function(l){var k,m;k=l.parentNode;if(!k){return null}if(j){while(m=l.firstChild){if(!d.isIE||m.nodeType!==3||m.nodeValue){k.insertBefore(m,l)}else{l.removeChild(m)}}}return k.removeChild(l)})},setStyle:function(l,i,j){var k=this;return k.run(l,function(o){var n,m;n=o.style;i=i.replace(/-(\D)/g,function(q,p){return p.toUpperCase()});if(k.pixelStyles.test(i)&&(d.is(j,"number")||/^[\-0-9\.]+$/.test(j))){j+="px"}switch(i){case"opacity":if(a){n.filter=j===""?"":"alpha(opacity="+(j*100)+")";if(!l.currentStyle||!l.currentStyle.hasLayout){n.display="inline-block"}}n[i]=n["-moz-opacity"]=n["-khtml-opacity"]=j||"";break;case"float":a?n.styleFloat=j:n.cssFloat=j;break;default:n[i]=j||""}if(k.settings.update_styles){k.setAttrib(o,"data-mce-style")}})},getStyle:function(l,i,k){l=this.get(l);if(!l){return false}if(this.doc.defaultView&&k){i=i.replace(/[A-Z]/g,function(m){return"-"+m});try{return this.doc.defaultView.getComputedStyle(l,null).getPropertyValue(i)}catch(j){return null}}i=i.replace(/-(\D)/g,function(n,m){return m.toUpperCase()});if(i=="float"){i=a?"styleFloat":"cssFloat"}if(l.currentStyle&&k){return l.currentStyle[i]}return l.style[i]},setStyles:function(l,m){var j=this,k=j.settings,i;i=k.update_styles;k.update_styles=0;f(m,function(o,p){j.setStyle(l,p,o)});k.update_styles=i;if(k.update_styles){j.setAttrib(l,k.cssText)}},removeAllAttribs:function(i){return this.run(i,function(l){var j=l.attributes;for(var k=j.length-1;k>=0;k--){l.removeAttributeNode(j.item(k))}})},setAttrib:function(k,l,i){var j=this;if(!k||!l){return}if(j.settings.strict){l=l.toLowerCase()}return this.run(k,function(n){var m=j.settings;switch(l){case"style":if(!c(i,"string")){f(i,function(o,p){j.setStyle(n,p,o)});return}if(m.keep_values){if(i&&!j._isRes(i)){n.setAttribute("data-mce-style",i,2)}else{n.removeAttribute("data-mce-style",2)}}n.style.cssText=i;break;case"class":n.className=i||"";break;case"src":case"href":if(m.keep_values){if(m.url_converter){i=m.url_converter.call(m.url_converter_scope||j,i,l,n)}j.setAttrib(n,"data-mce-"+l,i,2)}break;case"shape":n.setAttribute("data-mce-style",i);break}if(c(i)&&i!==null&&i.length!==0){n.setAttribute(l,""+i,2)}else{n.removeAttribute(l,2)}})},setAttribs:function(j,k){var i=this;return this.run(j,function(l){f(k,function(m,o){i.setAttrib(l,o,m)})})},getAttrib:function(l,m,k){var i,j=this;l=j.get(l);if(!l||l.nodeType!==1){return false}if(!c(k)){k=""}if(/^(src|href|style|coords|shape)$/.test(m)){i=l.getAttribute("data-mce-"+m);if(i){return i}}if(a&&j.props[m]){i=l[j.props[m]];i=i&&i.nodeValue?i.nodeValue:i}if(!i){i=l.getAttribute(m,2)}if(/^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noshade|nowrap|readonly|selected)$/.test(m)){if(l[j.props[m]]===true&&i===""){return m}return i?m:""}if(l.nodeName==="FORM"&&l.getAttributeNode(m)){return l.getAttributeNode(m).nodeValue}if(m==="style"){i=i||l.style.cssText;if(i){i=j.serializeStyle(j.parseStyle(i),l.nodeName);if(j.settings.keep_values&&!j._isRes(i)){l.setAttribute("data-mce-style",i)}}}if(e&&m==="class"&&i){i=i.replace(/(apple|webkit)\-[a-z\-]+/gi,"")}if(a){switch(m){case"rowspan":case"colspan":if(i===1){i=""}break;case"size":if(i==="+0"||i===20||i===0){i=""}break;case"width":case"height":case"vspace":case"checked":case"disabled":case"readonly":if(i===0){i=""}break;case"hspace":if(i===-1){i=""}break;case"maxlength":case"tabindex":if(i===32768||i===2147483647||i==="32768"){i=""}break;case"multiple":case"compact":case"noshade":case"nowrap":if(i===65535){return m}return k;case"shape":i=i.toLowerCase();break;default:if(m.indexOf("on")===0&&i){i=d._replace(/^function\s+\w+\(\)\s+\{\s+(.*)\s+\}$/,"$1",""+i)}}}return(i!==undefined&&i!==null&&i!=="")?""+i:k},getPos:function(q,l){var j=this,i=0,p=0,m,o=j.doc,k;q=j.get(q);l=l||o.body;if(q){if(a&&!j.stdMode){q=q.getBoundingClientRect();m=j.boxModel?o.documentElement:o.body;i=j.getStyle(j.select("html")[0],"borderWidth");i=(i=="medium"||j.boxModel&&!j.isIE6)&&2||i;return{x:q.left+m.scrollLeft-i,y:q.top+m.scrollTop-i}}k=q;while(k&&k!=l&&k.nodeType){i+=k.offsetLeft||0;p+=k.offsetTop||0;k=k.offsetParent}k=q.parentNode;while(k&&k!=l&&k.nodeType){i-=k.scrollLeft||0;p-=k.scrollTop||0;k=k.parentNode}}return{x:i,y:p}},parseStyle:function(i){return this.styles.parse(i)},serializeStyle:function(j,i){return this.styles.serialize(j,i)},loadCSS:function(i){var k=this,l=k.doc,j;if(!i){i=""}j=k.select("head")[0];f(i.split(","),function(m){var n;if(k.files[m]){return}k.files[m]=true;n=k.create("link",{rel:"stylesheet",href:d._addVer(m)});if(a&&l.documentMode&&l.recalc){n.onload=function(){if(l.recalc){l.recalc()}n.onload=null}}j.appendChild(n)})},addClass:function(i,j){return this.run(i,function(k){var l;if(!j){return 0}if(this.hasClass(k,j)){return k.className}l=this.removeClass(k,j);return k.className=(l!=""?(l+" "):"")+j})},removeClass:function(k,l){var i=this,j;return i.run(k,function(n){var m;if(i.hasClass(n,l)){if(!j){j=new RegExp("(^|\\s+)"+l+"(\\s+|$)","g")}m=n.className.replace(j," ");m=d.trim(m!=" "?m:"");n.className=m;if(!m){n.removeAttribute("class");n.removeAttribute("className")}return m}return n.className})},hasClass:function(j,i){j=this.get(j);if(!j||!i){return false}return(" "+j.className+" ").indexOf(" "+i+" ")!==-1},show:function(i){return this.setStyle(i,"display","block")},hide:function(i){return this.setStyle(i,"display","none")},isHidden:function(i){i=this.get(i);return !i||i.style.display=="none"||this.getStyle(i,"display")=="none"},uniqueId:function(i){return(!i?"mce_":i)+(this.counter++)},setHTML:function(k,j){var i=this;return i.run(k,function(m){if(a){while(m.firstChild){m.removeChild(m.firstChild)}try{m.innerHTML="<br />"+j;m.removeChild(m.firstChild)}catch(l){m=i.create("div");m.innerHTML="<br />"+j;f(m.childNodes,function(o,n){if(n){m.appendChild(o)}})}}else{m.innerHTML=j}return j})},getOuterHTML:function(k){var j,i=this;k=i.get(k);if(!k){return null}if(k.nodeType===1&&i.hasOuterHTML){return k.outerHTML}j=(k.ownerDocument||i.doc).createElement("body");j.appendChild(k.cloneNode(true));return j.innerHTML},setOuterHTML:function(l,j,m){var i=this;function k(p,o,r){var s,q;q=r.createElement("body");q.innerHTML=o;s=q.lastChild;while(s){i.insertAfter(s.cloneNode(true),p);s=s.previousSibling}i.remove(p)}return this.run(l,function(o){o=i.get(o);if(o.nodeType==1){m=m||o.ownerDocument||i.doc;if(a){try{if(a&&o.nodeType==1){o.outerHTML=j}else{k(o,j,m)}}catch(n){k(o,j,m)}}else{k(o,j,m)}}})},decode:h.decode,encode:h.encodeAllRaw,insertAfter:function(i,j){j=this.get(j);return this.run(i,function(l){var k,m;k=j.parentNode;m=j.nextSibling;if(m){k.insertBefore(l,m)}else{k.appendChild(l)}return l})},isBlock:function(j){var i=j.nodeType;if(i){return !!(i===1&&g[j.nodeName])}return !!g[j]},replace:function(m,l,i){var j=this;if(c(l,"array")){m=m.cloneNode(true)}return j.run(l,function(k){if(i){f(d.grep(k.childNodes),function(n){m.appendChild(n)})}return k.parentNode.replaceChild(m,k)})},rename:function(l,i){var k=this,j;if(l.nodeName!=i.toUpperCase()){j=k.create(i);f(k.getAttribs(l),function(m){k.setAttrib(j,m.nodeName,k.getAttrib(l,m.nodeName))});k.replace(j,l,1)}return j||l},findCommonAncestor:function(k,i){var l=k,j;while(l){j=i;while(j&&l!=j){j=j.parentNode}if(l==j){break}l=l.parentNode}if(!l&&k.ownerDocument){return k.ownerDocument.documentElement}return l},toHex:function(i){var k=/^\s*rgb\s*?\(\s*?([0-9]+)\s*?,\s*?([0-9]+)\s*?,\s*?([0-9]+)\s*?\)\s*$/i.exec(i);function j(l){l=parseInt(l).toString(16);return l.length>1?l:"0"+l}if(k){i="#"+j(k[1])+j(k[2])+j(k[3]);return i}return i},getClasses:function(){var n=this,j=[],m,o={},p=n.settings.class_filter,l;if(n.classes){return n.classes}function q(i){f(i.imports,function(s){q(s)});f(i.cssRules||i.rules,function(s){switch(s.type||1){case 1:if(s.selectorText){f(s.selectorText.split(","),function(r){r=r.replace(/^\s*|\s*$|^\s\./g,"");if(/\.mce/.test(r)||!/\.[\w\-]+$/.test(r)){return}l=r;r=d._replace(/.*\.([a-z0-9_\-]+).*/i,"$1",r);if(p&&!(r=p(r,l))){return}if(!o[r]){j.push({"class":r});o[r]=1}})}break;case 3:q(s.styleSheet);break}})}try{f(n.doc.styleSheets,q)}catch(k){}if(j.length>0){n.classes=j}return j},run:function(l,k,j){var i=this,m;if(i.doc&&typeof(l)==="string"){l=i.get(l)}if(!l){return false}j=j||this;if(!l.nodeType&&(l.length||l.length===0)){m=[];f(l,function(o,n){if(o){if(typeof(o)=="string"){o=i.doc.getElementById(o)}m.push(k.call(j,o,n))}});return m}return k.call(j,l)},getAttribs:function(j){var i;j=this.get(j);if(!j){return[]}if(a){i=[];if(j.nodeName=="OBJECT"){return j.attributes}if(j.nodeName==="OPTION"&&this.getAttrib(j,"selected")){i.push({specified:1,nodeName:"selected"})}j.cloneNode(false).outerHTML.replace(/<\/?[\w:\-]+ ?|=[\"][^\"]+\"|=\'[^\']+\'|=[\w\-]+|>/gi,"").replace(/[\w:\-]+/gi,function(k){i.push({specified:1,nodeName:k})});return i}return j.attributes},destroy:function(j){var i=this;if(i.events){i.events.destroy()}i.win=i.doc=i.root=i.events=null;if(!j){d.removeUnload(i.destroy)}},createRng:function(){var i=this.doc;return i.createRange?i.createRange():new d.dom.Range(this)},nodeIndex:function(n,o){var i=0,l,m,k,j;if(n){for(l=n.nodeType,n=n.previousSibling,m=n;n;n=n.previousSibling){k=n.nodeType;if(o&&k==3){j=false;try{j==n.nodeValue.length}catch(p){}if(k==l||!j){continue}}i++;l=k}}return i},split:function(m,l,p){var q=this,i=q.createRng(),n,k,o;function j(t){var s,r=t.childNodes;if(t.nodeType==1&&t.getAttribute("data-mce-type")=="bookmark"){return}for(s=r.length-1;s>=0;s--){j(r[s])}if(t.nodeType!=9){if(t.nodeType==3&&t.nodeValue.length>0){if(!q.isBlock(t.parentNode)||d.trim(t.nodeValue).length>0){return}}if(t.nodeType==1){r=t.childNodes;if(r.length==1&&r[0]&&r[0].nodeType==1&&r[0].getAttribute("data-mce-type")=="bookmark"){t.parentNode.insertBefore(r[0],t)}if(r.length||/^(br|hr|input|img)$/i.test(t.nodeName)){return}}q.remove(t)}return t}if(m&&l){i.setStart(m.parentNode,q.nodeIndex(m));i.setEnd(l.parentNode,q.nodeIndex(l));n=i.extractContents();i=q.createRng();i.setStart(l.parentNode,q.nodeIndex(l)+1);i.setEnd(m.parentNode,q.nodeIndex(m)+1);k=i.extractContents();o=m.parentNode;o.insertBefore(j(n),m);if(p){o.replaceChild(p,l)}else{o.insertBefore(l,m)}o.insertBefore(j(k),m);q.remove(m);return p||l}},bind:function(m,i,l,k){var j=this;if(!j.events){j.events=new d.dom.EventUtils()}return j.events.add(m,i,l,k||this)},unbind:function(l,i,k){var j=this;if(!j.events){j.events=new d.dom.EventUtils()}return j.events.remove(l,i,k)},_findSib:function(l,i,j){var k=this,m=i;if(l){if(c(m,"string")){m=function(n){return k.is(n,i)}}for(l=l[j];l;l=l[j]){if(m(l)){return l}}}return null},_isRes:function(i){return/^(top|left|bottom|right|width|height)/i.test(i)||/;\s*(top|left|bottom|right|width|height)/i.test(i)}});d.DOM=new d.dom.DOMUtils(document,{process_html:0})})(tinymce);(function(a){function b(c){var N=this,e=c.doc,S=0,E=1,j=2,D=true,R=false,U="startOffset",h="startContainer",P="endContainer",z="endOffset",k=tinymce.extend,n=c.nodeIndex;k(N,{startContainer:e,startOffset:0,endContainer:e,endOffset:0,collapsed:D,commonAncestorContainer:e,START_TO_START:0,START_TO_END:1,END_TO_END:2,END_TO_START:3,setStart:q,setEnd:s,setStartBefore:g,setStartAfter:I,setEndBefore:J,setEndAfter:u,collapse:A,selectNode:x,selectNodeContents:F,compareBoundaryPoints:v,deleteContents:p,extractContents:H,cloneContents:d,insertNode:C,surroundContents:M,cloneRange:K});function q(V,t){B(D,V,t)}function s(V,t){B(R,V,t)}function g(t){q(t.parentNode,n(t))}function I(t){q(t.parentNode,n(t)+1)}function J(t){s(t.parentNode,n(t))}function u(t){s(t.parentNode,n(t)+1)}function A(t){if(t){N[P]=N[h];N[z]=N[U]}else{N[h]=N[P];N[U]=N[z]}N.collapsed=D}function x(t){g(t);u(t)}function F(t){q(t,0);s(t,t.nodeType===1?t.childNodes.length:t.nodeValue.length)}function v(Y,t){var ab=N[h],W=N[U],aa=N[P],V=N[z],Z=t.startContainer,ad=t.startOffset,X=t.endContainer,ac=t.endOffset;if(Y===0){return G(ab,W,Z,ad)}if(Y===1){return G(aa,V,Z,ad)}if(Y===2){return G(aa,V,X,ac)}if(Y===3){return G(ab,W,X,ac)}}function p(){m(j)}function H(){return m(S)}function d(){return m(E)}function C(Y){var V=this[h],t=this[U],X,W;if((V.nodeType===3||V.nodeType===4)&&V.nodeValue){if(!t){V.parentNode.insertBefore(Y,V)}else{if(t>=V.nodeValue.length){c.insertAfter(Y,V)}else{X=V.splitText(t);V.parentNode.insertBefore(Y,X)}}}else{if(V.childNodes.length>0){W=V.childNodes[t]}if(W){V.insertBefore(Y,W)}else{V.appendChild(Y)}}}function M(V){var t=N.extractContents();N.insertNode(V);V.appendChild(t);N.selectNode(V)}function K(){return k(new b(c),{startContainer:N[h],startOffset:N[U],endContainer:N[P],endOffset:N[z],collapsed:N.collapsed,commonAncestorContainer:N.commonAncestorContainer})}function O(t,V){var W;if(t.nodeType==3){return t}if(V<0){return t}W=t.firstChild;while(W&&V>0){--V;W=W.nextSibling}if(W){return W}return t}function l(){return(N[h]==N[P]&&N[U]==N[z])}function G(X,Z,V,Y){var aa,W,t,ab,ad,ac;if(X==V){if(Z==Y){return 0}if(Z<Y){return -1}return 1}aa=V;while(aa&&aa.parentNode!=X){aa=aa.parentNode}if(aa){W=0;t=X.firstChild;while(t!=aa&&W<Z){W++;t=t.nextSibling}if(Z<=W){return -1}return 1}aa=X;while(aa&&aa.parentNode!=V){aa=aa.parentNode}if(aa){W=0;t=V.firstChild;while(t!=aa&&W<Y){W++;t=t.nextSibling}if(W<Y){return -1}return 1}ab=c.findCommonAncestor(X,V);ad=X;while(ad&&ad.parentNode!=ab){ad=ad.parentNode}if(!ad){ad=ab}ac=V;while(ac&&ac.parentNode!=ab){ac=ac.parentNode}if(!ac){ac=ab}if(ad==ac){return 0}t=ab.firstChild;while(t){if(t==ad){return -1}if(t==ac){return 1}t=t.nextSibling}}function B(V,Y,X){var t,W;if(V){N[h]=Y;N[U]=X}else{N[P]=Y;N[z]=X}t=N[P];while(t.parentNode){t=t.parentNode}W=N[h];while(W.parentNode){W=W.parentNode}if(W==t){if(G(N[h],N[U],N[P],N[z])>0){N.collapse(V)}}else{N.collapse(V)}N.collapsed=l();N.commonAncestorContainer=c.findCommonAncestor(N[h],N[P])}function m(ab){var aa,X=0,ad=0,V,Z,W,Y,t,ac;if(N[h]==N[P]){return f(ab)}for(aa=N[P],V=aa.parentNode;V;aa=V,V=V.parentNode){if(V==N[h]){return r(aa,ab)}++X}for(aa=N[h],V=aa.parentNode;V;aa=V,V=V.parentNode){if(V==N[P]){return T(aa,ab)}++ad}Z=ad-X;W=N[h];while(Z>0){W=W.parentNode;Z--}Y=N[P];while(Z<0){Y=Y.parentNode;Z++}for(t=W.parentNode,ac=Y.parentNode;t!=ac;t=t.parentNode,ac=ac.parentNode){W=t;Y=ac}return o(W,Y,ab)}function f(Z){var ab,Y,X,aa,t,W,V;if(Z!=j){ab=e.createDocumentFragment()}if(N[U]==N[z]){return ab}if(N[h].nodeType==3){Y=N[h].nodeValue;X=Y.substring(N[U],N[z]);if(Z!=E){N[h].deleteData(N[U],N[z]-N[U]);N.collapse(D)}if(Z==j){return}ab.appendChild(e.createTextNode(X));return ab}aa=O(N[h],N[U]);t=N[z]-N[U];while(t>0){W=aa.nextSibling;V=y(aa,Z);if(ab){ab.appendChild(V)}--t;aa=W}if(Z!=E){N.collapse(D)}return ab}function r(ab,Y){var aa,Z,V,t,X,W;if(Y!=j){aa=e.createDocumentFragment()}Z=i(ab,Y);if(aa){aa.appendChild(Z)}V=n(ab);t=V-N[U];if(t<=0){if(Y!=E){N.setEndBefore(ab);N.collapse(R)}return aa}Z=ab.previousSibling;while(t>0){X=Z.previousSibling;W=y(Z,Y);if(aa){aa.insertBefore(W,aa.firstChild)}--t;Z=X}if(Y!=E){N.setEndBefore(ab);N.collapse(R)}return aa}function T(Z,Y){var ab,V,aa,t,X,W;if(Y!=j){ab=e.createDocumentFragment()}aa=Q(Z,Y);if(ab){ab.appendChild(aa)}V=n(Z);++V;t=N[z]-V;aa=Z.nextSibling;while(t>0){X=aa.nextSibling;W=y(aa,Y);if(ab){ab.appendChild(W)}--t;aa=X}if(Y!=E){N.setStartAfter(Z);N.collapse(D)}return ab}function o(Z,t,ac){var W,ae,Y,aa,ab,V,ad,X;if(ac!=j){ae=e.createDocumentFragment()}W=Q(Z,ac);if(ae){ae.appendChild(W)}Y=Z.parentNode;aa=n(Z);ab=n(t);++aa;V=ab-aa;ad=Z.nextSibling;while(V>0){X=ad.nextSibling;W=y(ad,ac);if(ae){ae.appendChild(W)}ad=X;--V}W=i(t,ac);if(ae){ae.appendChild(W)}if(ac!=E){N.setStartAfter(Z);N.collapse(D)}return ae}function i(aa,ab){var W=O(N[P],N[z]-1),ac,Z,Y,t,V,X=W!=N[P];if(W==aa){return L(W,X,R,ab)}ac=W.parentNode;Z=L(ac,R,R,ab);while(ac){while(W){Y=W.previousSibling;t=L(W,X,R,ab);if(ab!=j){Z.insertBefore(t,Z.firstChild)}X=D;W=Y}if(ac==aa){return Z}W=ac.previousSibling;ac=ac.parentNode;V=L(ac,R,R,ab);if(ab!=j){V.appendChild(Z)}Z=V}}function Q(aa,ab){var X=O(N[h],N[U]),Y=X!=N[h],ac,Z,W,t,V;if(X==aa){return L(X,Y,D,ab)}ac=X.parentNode;Z=L(ac,R,D,ab);while(ac){while(X){W=X.nextSibling;t=L(X,Y,D,ab);if(ab!=j){Z.appendChild(t)}Y=D;X=W}if(ac==aa){return Z}X=ac.nextSibling;ac=ac.parentNode;V=L(ac,R,D,ab);if(ab!=j){V.appendChild(Z)}Z=V}}function L(t,Y,ab,ac){var X,W,Z,V,aa;if(Y){return y(t,ac)}if(t.nodeType==3){X=t.nodeValue;if(ab){V=N[U];W=X.substring(V);Z=X.substring(0,V)}else{V=N[z];W=X.substring(0,V);Z=X.substring(V)}if(ac!=E){t.nodeValue=Z}if(ac==j){return}aa=t.cloneNode(R);aa.nodeValue=W;return aa}if(ac==j){return}return t.cloneNode(R)}function y(V,t){if(t!=j){return t==E?V.cloneNode(D):V}V.parentNode.removeChild(V)}}a.Range=b})(tinymce.dom);(function(){function a(g){var i=this,j="\uFEFF",e,h,d=g.dom,c=true,f=false;function b(){var n=g.getRng(),k=d.createRng(),m,o;m=n.item?n.item(0):n.parentElement();if(m.ownerDocument!=d.doc){return k}o=g.isCollapsed();if(n.item||!m.hasChildNodes()){if(o){k.setStart(m,0);k.setEnd(m,0)}else{k.setStart(m.parentNode,d.nodeIndex(m));k.setEnd(k.startContainer,k.startOffset+1)}return k}function l(s){var u,q,t,p,A=0,x,y,z,r,v;r=n.duplicate();r.collapse(s);u=d.create("a");z=r.parentElement();if(!z.hasChildNodes()){k[s?"setStart":"setEnd"](z,0);return}z.appendChild(u);r.moveToElementText(u);v=n.compareEndPoints(s?"StartToStart":"EndToEnd",r);if(v>0){k[s?"setStartAfter":"setEndAfter"](z);d.remove(u);return}p=tinymce.grep(z.childNodes);x=p.length-1;while(A<=x){y=Math.floor((A+x)/2);z.insertBefore(u,p[y]);r.moveToElementText(u);v=n.compareEndPoints(s?"StartToStart":"EndToEnd",r);if(v>0){A=y+1}else{if(v<0){x=y-1}else{found=true;break}}}q=v>0||y==0?u.nextSibling:u.previousSibling;if(q.nodeType==1){d.remove(u);t=d.nodeIndex(q);q=q.parentNode;if(!s||y>0){t++}}else{if(v>0||y==0){r.setEndPoint(s?"StartToStart":"EndToEnd",n);t=r.text.length}else{r.setEndPoint(s?"StartToStart":"EndToEnd",n);t=q.nodeValue.length-r.text.length}d.remove(u)}k[s?"setStart":"setEnd"](q,t)}l(true);if(!o){l()}return k}this.addRange=function(k){var p,n,m,r,u,s,t=g.dom.doc,o=t.body;function l(B){var x,A,v,z,y;v=d.create("a");x=B?m:u;A=B?r:s;z=p.duplicate();if(x==t||x==t.documentElement){x=o;A=0}if(x.nodeType==3){x.parentNode.insertBefore(v,x);z.moveToElementText(v);z.moveStart("character",A);d.remove(v);p.setEndPoint(B?"StartToStart":"EndToEnd",z)}else{y=x.childNodes;if(y.length){if(A>=y.length){d.insertAfter(v,y[y.length-1])}else{x.insertBefore(v,y[A])}z.moveToElementText(v)}else{v=t.createTextNode(j);x.appendChild(v);z.moveToElementText(v.parentNode);z.collapse(c)}p.setEndPoint(B?"StartToStart":"EndToEnd",z);d.remove(v)}}this.destroy();m=k.startContainer;r=k.startOffset;u=k.endContainer;s=k.endOffset;p=o.createTextRange();if(m==u&&m.nodeType==1&&r==s-1){if(r==s-1){try{n=o.createControlRange();n.addElement(m.childNodes[r]);n.select();return}catch(q){}}}l(true);l();p.select()};this.getRangeAt=function(){if(!e||!tinymce.dom.RangeUtils.compareRanges(h,g.getRng())){e=b();h=g.getRng()}try{e.startContainer.nextSibling}catch(k){e=b();h=null}return e};this.destroy=function(){h=e=null}}tinymce.dom.TridentSelection=a})();(function(){var p=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,j=0,d=Object.prototype.toString,o=false,i=true;[0,0].sort(function(){i=false;return 0});var b=function(v,e,z,A){z=z||[];e=e||document;var C=e;if(e.nodeType!==1&&e.nodeType!==9){return[]}if(!v||typeof v!=="string"){return z}var x=[],s,E,H,r,u=true,t=b.isXML(e),B=v,D,G,F,y;do{p.exec("");s=p.exec(B);if(s){B=s[3];x.push(s[1]);if(s[2]){r=s[3];break}}}while(s);if(x.length>1&&k.exec(v)){if(x.length===2&&f.relative[x[0]]){E=h(x[0]+x[1],e)}else{E=f.relative[x[0]]?[e]:b(x.shift(),e);while(x.length){v=x.shift();if(f.relative[v]){v+=x.shift()}E=h(v,E)}}}else{if(!A&&x.length>1&&e.nodeType===9&&!t&&f.match.ID.test(x[0])&&!f.match.ID.test(x[x.length-1])){D=b.find(x.shift(),e,t);e=D.expr?b.filter(D.expr,D.set)[0]:D.set[0]}if(e){D=A?{expr:x.pop(),set:a(A)}:b.find(x.pop(),x.length===1&&(x[0]==="~"||x[0]==="+")&&e.parentNode?e.parentNode:e,t);E=D.expr?b.filter(D.expr,D.set):D.set;if(x.length>0){H=a(E)}else{u=false}while(x.length){G=x.pop();F=G;if(!f.relative[G]){G=""}else{F=x.pop()}if(F==null){F=e}f.relative[G](H,F,t)}}else{H=x=[]}}if(!H){H=E}if(!H){b.error(G||v)}if(d.call(H)==="[object Array]"){if(!u){z.push.apply(z,H)}else{if(e&&e.nodeType===1){for(y=0;H[y]!=null;y++){if(H[y]&&(H[y]===true||H[y].nodeType===1&&b.contains(e,H[y]))){z.push(E[y])}}}else{for(y=0;H[y]!=null;y++){if(H[y]&&H[y].nodeType===1){z.push(E[y])}}}}}else{a(H,z)}if(r){b(r,C,z,A);b.uniqueSort(z)}return z};b.uniqueSort=function(r){if(c){o=i;r.sort(c);if(o){for(var e=1;e<r.length;e++){if(r[e]===r[e-1]){r.splice(e--,1)}}}}return r};b.matches=function(e,r){return b(e,null,null,r)};b.find=function(y,e,z){var x;if(!y){return[]}for(var t=0,s=f.order.length;t<s;t++){var v=f.order[t],u;if((u=f.leftMatch[v].exec(y))){var r=u[1];u.splice(1,1);if(r.substr(r.length-1)!=="\\"){u[1]=(u[1]||"").replace(/\\/g,"");x=f.find[v](u,e,z);if(x!=null){y=y.replace(f.match[v],"");break}}}}if(!x){x=e.getElementsByTagName("*")}return{set:x,expr:y}};b.filter=function(C,B,F,u){var s=C,H=[],z=B,x,e,y=B&&B[0]&&b.isXML(B[0]);while(C&&B.length){for(var A in f.filter){if((x=f.leftMatch[A].exec(C))!=null&&x[2]){var r=f.filter[A],G,E,t=x[1];e=false;x.splice(1,1);if(t.substr(t.length-1)==="\\"){continue}if(z===H){H=[]}if(f.preFilter[A]){x=f.preFilter[A](x,z,F,H,u,y);if(!x){e=G=true}else{if(x===true){continue}}}if(x){for(var v=0;(E=z[v])!=null;v++){if(E){G=r(E,x,v,z);var D=u^!!G;if(F&&G!=null){if(D){e=true}else{z[v]=false}}else{if(D){H.push(E);e=true}}}}}if(G!==undefined){if(!F){z=H}C=C.replace(f.match[A],"");if(!e){return[]}break}}}if(C===s){if(e==null){b.error(C)}else{break}}s=C}return z};b.error=function(e){throw"Syntax error, unrecognized expression: "+e};var f=b.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(e){return e.getAttribute("href")}},relative:{"+":function(x,r){var t=typeof r==="string",v=t&&!/\W/.test(r),y=t&&!v;if(v){r=r.toLowerCase()}for(var s=0,e=x.length,u;s<e;s++){if((u=x[s])){while((u=u.previousSibling)&&u.nodeType!==1){}x[s]=y||u&&u.nodeName.toLowerCase()===r?u||false:u===r}}if(y){b.filter(r,x,true)}},">":function(x,r){var u=typeof r==="string",v,s=0,e=x.length;if(u&&!/\W/.test(r)){r=r.toLowerCase();for(;s<e;s++){v=x[s];if(v){var t=v.parentNode;x[s]=t.nodeName.toLowerCase()===r?t:false}}}else{for(;s<e;s++){v=x[s];if(v){x[s]=u?v.parentNode:v.parentNode===r}}if(u){b.filter(r,x,true)}}},"":function(t,r,v){var s=j++,e=q,u;if(typeof r==="string"&&!/\W/.test(r)){r=r.toLowerCase();u=r;e=n}e("parentNode",r,s,t,u,v)},"~":function(t,r,v){var s=j++,e=q,u;if(typeof r==="string"&&!/\W/.test(r)){r=r.toLowerCase();u=r;e=n}e("previousSibling",r,s,t,u,v)}},find:{ID:function(r,s,t){if(typeof s.getElementById!=="undefined"&&!t){var e=s.getElementById(r[1]);return e?[e]:[]}},NAME:function(s,v){if(typeof v.getElementsByName!=="undefined"){var r=[],u=v.getElementsByName(s[1]);for(var t=0,e=u.length;t<e;t++){if(u[t].getAttribute("name")===s[1]){r.push(u[t])}}return r.length===0?null:r}},TAG:function(e,r){return r.getElementsByTagName(e[1])}},preFilter:{CLASS:function(t,r,s,e,x,y){t=" "+t[1].replace(/\\/g,"")+" ";if(y){return t}for(var u=0,v;(v=r[u])!=null;u++){if(v){if(x^(v.className&&(" "+v.className+" ").replace(/[\t\n]/g," ").indexOf(t)>=0)){if(!s){e.push(v)}}else{if(s){r[u]=false}}}}return false},ID:function(e){return e[1].replace(/\\/g,"")},TAG:function(r,e){return r[1].toLowerCase()},CHILD:function(e){if(e[1]==="nth"){var r=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(e[2]==="even"&&"2n"||e[2]==="odd"&&"2n+1"||!/\D/.test(e[2])&&"0n+"+e[2]||e[2]);e[2]=(r[1]+(r[2]||1))-0;e[3]=r[3]-0}e[0]=j++;return e},ATTR:function(u,r,s,e,v,x){var t=u[1].replace(/\\/g,"");if(!x&&f.attrMap[t]){u[1]=f.attrMap[t]}if(u[2]==="~="){u[4]=" "+u[4]+" "}return u},PSEUDO:function(u,r,s,e,v){if(u[1]==="not"){if((p.exec(u[3])||"").length>1||/^\w/.test(u[3])){u[3]=b(u[3],null,null,r)}else{var t=b.filter(u[3],r,s,true^v);if(!s){e.push.apply(e,t)}return false}}else{if(f.match.POS.test(u[0])||f.match.CHILD.test(u[0])){return true}}return u},POS:function(e){e.unshift(true);return e}},filters:{enabled:function(e){return e.disabled===false&&e.type!=="hidden"},disabled:function(e){return e.disabled===true},checked:function(e){return e.checked===true},selected:function(e){e.parentNode.selectedIndex;return e.selected===true},parent:function(e){return !!e.firstChild},empty:function(e){return !e.firstChild},has:function(s,r,e){return !!b(e[3],s).length},header:function(e){return(/h\d/i).test(e.nodeName)},text:function(e){return"text"===e.type},radio:function(e){return"radio"===e.type},checkbox:function(e){return"checkbox"===e.type},file:function(e){return"file"===e.type},password:function(e){return"password"===e.type},submit:function(e){return"submit"===e.type},image:function(e){return"image"===e.type},reset:function(e){return"reset"===e.type},button:function(e){return"button"===e.type||e.nodeName.toLowerCase()==="button"},input:function(e){return(/input|select|textarea|button/i).test(e.nodeName)}},setFilters:{first:function(r,e){return e===0},last:function(s,r,e,t){return r===t.length-1},even:function(r,e){return e%2===0},odd:function(r,e){return e%2===1},lt:function(s,r,e){return r<e[3]-0},gt:function(s,r,e){return r>e[3]-0},nth:function(s,r,e){return e[3]-0===r},eq:function(s,r,e){return e[3]-0===r}},filter:{PSEUDO:function(s,y,x,z){var e=y[1],r=f.filters[e];if(r){return r(s,x,y,z)}else{if(e==="contains"){return(s.textContent||s.innerText||b.getText([s])||"").indexOf(y[3])>=0}else{if(e==="not"){var t=y[3];for(var v=0,u=t.length;v<u;v++){if(t[v]===s){return false}}return true}else{b.error("Syntax error, unrecognized expression: "+e)}}}},CHILD:function(e,t){var x=t[1],r=e;switch(x){case"only":case"first":while((r=r.previousSibling)){if(r.nodeType===1){return false}}if(x==="first"){return true}r=e;case"last":while((r=r.nextSibling)){if(r.nodeType===1){return false}}return true;case"nth":var s=t[2],A=t[3];if(s===1&&A===0){return true}var v=t[0],z=e.parentNode;if(z&&(z.sizcache!==v||!e.nodeIndex)){var u=0;for(r=z.firstChild;r;r=r.nextSibling){if(r.nodeType===1){r.nodeIndex=++u}}z.sizcache=v}var y=e.nodeIndex-A;if(s===0){return y===0}else{return(y%s===0&&y/s>=0)}}},ID:function(r,e){return r.nodeType===1&&r.getAttribute("id")===e},TAG:function(r,e){return(e==="*"&&r.nodeType===1)||r.nodeName.toLowerCase()===e},CLASS:function(r,e){return(" "+(r.className||r.getAttribute("class"))+" ").indexOf(e)>-1},ATTR:function(v,t){var s=t[1],e=f.attrHandle[s]?f.attrHandle[s](v):v[s]!=null?v[s]:v.getAttribute(s),x=e+"",u=t[2],r=t[4];return e==null?u==="!=":u==="="?x===r:u==="*="?x.indexOf(r)>=0:u==="~="?(" "+x+" ").indexOf(r)>=0:!r?x&&e!==false:u==="!="?x!==r:u==="^="?x.indexOf(r)===0:u==="$="?x.substr(x.length-r.length)===r:u==="|="?x===r||x.substr(0,r.length+1)===r+"-":false},POS:function(u,r,s,v){var e=r[2],t=f.setFilters[e];if(t){return t(u,s,r,v)}}}};var k=f.match.POS,g=function(r,e){return"\\"+(e-0+1)};for(var m in f.match){f.match[m]=new RegExp(f.match[m].source+(/(?![^\[]*\])(?![^\(]*\))/.source));f.leftMatch[m]=new RegExp(/(^(?:.|\r|\n)*?)/.source+f.match[m].source.replace(/\\(\d+)/g,g))}var a=function(r,e){r=Array.prototype.slice.call(r,0);if(e){e.push.apply(e,r);return e}return r};try{Array.prototype.slice.call(document.documentElement.childNodes,0)[0].nodeType}catch(l){a=function(u,t){var r=t||[],s=0;if(d.call(u)==="[object Array]"){Array.prototype.push.apply(r,u)}else{if(typeof u.length==="number"){for(var e=u.length;s<e;s++){r.push(u[s])}}else{for(;u[s];s++){r.push(u[s])}}}return r}}var c;if(document.documentElement.compareDocumentPosition){c=function(r,e){if(!r.compareDocumentPosition||!e.compareDocumentPosition){if(r==e){o=true}return r.compareDocumentPosition?-1:1}var s=r.compareDocumentPosition(e)&4?-1:r===e?0:1;if(s===0){o=true}return s}}else{if("sourceIndex" in document.documentElement){c=function(r,e){if(!r.sourceIndex||!e.sourceIndex){if(r==e){o=true}return r.sourceIndex?-1:1}var s=r.sourceIndex-e.sourceIndex;if(s===0){o=true}return s}}else{if(document.createRange){c=function(t,r){if(!t.ownerDocument||!r.ownerDocument){if(t==r){o=true}return t.ownerDocument?-1:1}var s=t.ownerDocument.createRange(),e=r.ownerDocument.createRange();s.setStart(t,0);s.setEnd(t,0);e.setStart(r,0);e.setEnd(r,0);var u=s.compareBoundaryPoints(Range.START_TO_END,e);if(u===0){o=true}return u}}}}b.getText=function(e){var r="",t;for(var s=0;e[s];s++){t=e[s];if(t.nodeType===3||t.nodeType===4){r+=t.nodeValue}else{if(t.nodeType!==8){r+=b.getText(t.childNodes)}}}return r};(function(){var r=document.createElement("div"),s="script"+(new Date()).getTime();r.innerHTML="<a name='"+s+"'/>";var e=document.documentElement;e.insertBefore(r,e.firstChild);if(document.getElementById(s)){f.find.ID=function(u,v,x){if(typeof v.getElementById!=="undefined"&&!x){var t=v.getElementById(u[1]);return t?t.id===u[1]||typeof t.getAttributeNode!=="undefined"&&t.getAttributeNode("id").nodeValue===u[1]?[t]:undefined:[]}};f.filter.ID=function(v,t){var u=typeof v.getAttributeNode!=="undefined"&&v.getAttributeNode("id");return v.nodeType===1&&u&&u.nodeValue===t}}e.removeChild(r);e=r=null})();(function(){var e=document.createElement("div");e.appendChild(document.createComment(""));if(e.getElementsByTagName("*").length>0){f.find.TAG=function(r,v){var u=v.getElementsByTagName(r[1]);if(r[1]==="*"){var t=[];for(var s=0;u[s];s++){if(u[s].nodeType===1){t.push(u[s])}}u=t}return u}}e.innerHTML="<a href='#'></a>";if(e.firstChild&&typeof e.firstChild.getAttribute!=="undefined"&&e.firstChild.getAttribute("href")!=="#"){f.attrHandle.href=function(r){return r.getAttribute("href",2)}}e=null})();if(document.querySelectorAll){(function(){var e=b,s=document.createElement("div");s.innerHTML="<p class='TEST'></p>";if(s.querySelectorAll&&s.querySelectorAll(".TEST").length===0){return}b=function(x,v,t,u){v=v||document;if(!u&&v.nodeType===9&&!b.isXML(v)){try{return a(v.querySelectorAll(x),t)}catch(y){}}return e(x,v,t,u)};for(var r in e){b[r]=e[r]}s=null})()}(function(){var e=document.createElement("div");e.innerHTML="<div class='test e'></div><div class='test'></div>";if(!e.getElementsByClassName||e.getElementsByClassName("e").length===0){return}e.lastChild.className="e";if(e.getElementsByClassName("e").length===1){return}f.order.splice(1,0,"CLASS");f.find.CLASS=function(r,s,t){if(typeof s.getElementsByClassName!=="undefined"&&!t){return s.getElementsByClassName(r[1])}};e=null})();function n(r,x,v,A,y,z){for(var t=0,s=A.length;t<s;t++){var e=A[t];if(e){e=e[r];var u=false;while(e){if(e.sizcache===v){u=A[e.sizset];break}if(e.nodeType===1&&!z){e.sizcache=v;e.sizset=t}if(e.nodeName.toLowerCase()===x){u=e;break}e=e[r]}A[t]=u}}}function q(r,x,v,A,y,z){for(var t=0,s=A.length;t<s;t++){var e=A[t];if(e){e=e[r];var u=false;while(e){if(e.sizcache===v){u=A[e.sizset];break}if(e.nodeType===1){if(!z){e.sizcache=v;e.sizset=t}if(typeof x!=="string"){if(e===x){u=true;break}}else{if(b.filter(x,[e]).length>0){u=e;break}}}e=e[r]}A[t]=u}}}b.contains=document.compareDocumentPosition?function(r,e){return !!(r.compareDocumentPosition(e)&16)}:function(r,e){return r!==e&&(r.contains?r.contains(e):true)};b.isXML=function(e){var r=(e?e.ownerDocument||e:0).documentElement;return r?r.nodeName!=="HTML":false};var h=function(e,y){var t=[],u="",v,s=y.nodeType?[y]:y;while((v=f.match.PSEUDO.exec(e))){u+=v[0];e=e.replace(f.match.PSEUDO,"")}e=f.relative[e]?e+"*":e;for(var x=0,r=s.length;x<r;x++){b(e,s[x],t)}return b.filter(u,t)};window.tinymce.dom.Sizzle=b})();(function(d){var f=d.each,c=d.DOM,b=d.isIE,e=d.isWebKit,a;d.create("tinymce.dom.EventUtils",{EventUtils:function(){this.inits=[];this.events=[]},add:function(m,p,l,j){var g,h=this,i=h.events,k;if(p instanceof Array){k=[];f(p,function(o){k.push(h.add(m,o,l,j))});return k}if(m&&m.hasOwnProperty&&m instanceof Array){k=[];f(m,function(n){n=c.get(n);k.push(h.add(n,p,l,j))});return k}m=c.get(m);if(!m){return}g=function(n){if(h.disabled){return}n=n||window.event;if(n&&b){if(!n.target){n.target=n.srcElement}d.extend(n,h._stoppers)}if(!j){return l(n)}return l.call(j,n)};if(p=="unload"){d.unloads.unshift({func:g});return g}if(p=="init"){if(h.domLoaded){g()}else{h.inits.push(g)}return g}i.push({obj:m,name:p,func:l,cfunc:g,scope:j});h._add(m,p,g);return l},remove:function(l,m,k){var h=this,g=h.events,i=false,j;if(l&&l.hasOwnProperty&&l instanceof Array){j=[];f(l,function(n){n=c.get(n);j.push(h.remove(n,m,k))});return j}l=c.get(l);f(g,function(o,n){if(o.obj==l&&o.name==m&&(!k||(o.func==k||o.cfunc==k))){g.splice(n,1);h._remove(l,m,o.cfunc);i=true;return false}});return i},clear:function(l){var j=this,g=j.events,h,k;if(l){l=c.get(l);for(h=g.length-1;h>=0;h--){k=g[h];if(k.obj===l){j._remove(k.obj,k.name,k.cfunc);k.obj=k.cfunc=null;g.splice(h,1)}}}},cancel:function(g){if(!g){return false}this.stop(g);return this.prevent(g)},stop:function(g){if(g.stopPropagation){g.stopPropagation()}else{g.cancelBubble=true}return false},prevent:function(g){if(g.preventDefault){g.preventDefault()}else{g.returnValue=false}return false},destroy:function(){var g=this;f(g.events,function(j,h){g._remove(j.obj,j.name,j.cfunc);j.obj=j.cfunc=null});g.events=[];g=null},_add:function(h,i,g){if(h.attachEvent){h.attachEvent("on"+i,g)}else{if(h.addEventListener){h.addEventListener(i,g,false)}else{h["on"+i]=g}}},_remove:function(i,j,h){if(i){try{if(i.detachEvent){i.detachEvent("on"+j,h)}else{if(i.removeEventListener){i.removeEventListener(j,h,false)}else{i["on"+j]=null}}}catch(g){}}},_pageInit:function(h){var g=this;if(g.domLoaded){return}g.domLoaded=true;f(g.inits,function(i){i()});g.inits=[]},_wait:function(i){var g=this,h=i.document;if(i.tinyMCE_GZ&&tinyMCE_GZ.loaded){g.domLoaded=1;return}if(h.attachEvent){h.attachEvent("onreadystatechange",function(){if(h.readyState==="complete"){h.detachEvent("onreadystatechange",arguments.callee);g._pageInit(i)}});if(h.documentElement.doScroll&&i==i.top){(function(){if(g.domLoaded){return}try{h.documentElement.doScroll("left")}catch(j){setTimeout(arguments.callee,0);return}g._pageInit(i)})()}}else{if(h.addEventListener){g._add(i,"DOMContentLoaded",function(){g._pageInit(i)})}}g._add(i,"load",function(){g._pageInit(i)})},_stoppers:{preventDefault:function(){this.returnValue=false},stopPropagation:function(){this.cancelBubble=true}}});a=d.dom.Event=new d.dom.EventUtils();a._wait(window);d.addUnload(function(){a.destroy()})})(tinymce);(function(a){a.dom.Element=function(f,d){var b=this,e,c;b.settings=d=d||{};b.id=f;b.dom=e=d.dom||a.DOM;if(!a.isIE){c=e.get(b.id)}a.each(("getPos,getRect,getParent,add,setStyle,getStyle,setStyles,setAttrib,setAttribs,getAttrib,addClass,removeClass,hasClass,getOuterHTML,setOuterHTML,remove,show,hide,isHidden,setHTML,get").split(/,/),function(g){b[g]=function(){var h=[f],j;for(j=0;j<arguments.length;j++){h.push(arguments[j])}h=e[g].apply(e,h);b.update(g);return h}});a.extend(b,{on:function(i,h,g){return a.dom.Event.add(b.id,i,h,g)},getXY:function(){return{x:parseInt(b.getStyle("left")),y:parseInt(b.getStyle("top"))}},getSize:function(){var g=e.get(b.id);return{w:parseInt(b.getStyle("width")||g.clientWidth),h:parseInt(b.getStyle("height")||g.clientHeight)}},moveTo:function(g,h){b.setStyles({left:g,top:h})},moveBy:function(g,i){var h=b.getXY();b.moveTo(h.x+g,h.y+i)},resizeTo:function(g,i){b.setStyles({width:g,height:i})},resizeBy:function(g,j){var i=b.getSize();b.resizeTo(i.w+g,i.h+j)},update:function(h){var g;if(a.isIE6&&d.blocker){h=h||"";if(h.indexOf("get")===0||h.indexOf("has")===0||h.indexOf("is")===0){return}if(h=="remove"){e.remove(b.blocker);return}if(!b.blocker){b.blocker=e.uniqueId();g=e.add(d.container||e.getRoot(),"iframe",{id:b.blocker,style:"position:absolute;",frameBorder:0,src:'javascript:""'});e.setStyle(g,"opacity",0)}else{g=e.get(b.blocker)}e.setStyles(g,{left:b.getStyle("left",1),top:b.getStyle("top",1),width:b.getStyle("width",1),height:b.getStyle("height",1),display:b.getStyle("display",1),zIndex:parseInt(b.getStyle("zIndex",1)||0)-1})}}})}})(tinymce);(function(c){function e(f){return f.replace(/[\n\r]+/g,"")}var b=c.is,a=c.isIE,d=c.each;c.create("tinymce.dom.Selection",{Selection:function(i,h,g){var f=this;f.dom=i;f.win=h;f.serializer=g;d(["onBeforeSetContent","onBeforeGetContent","onSetContent","onGetContent"],function(j){f[j]=new c.util.Dispatcher(f)});if(!f.win.getSelection){f.tridentSel=new c.dom.TridentSelection(f)}if(c.isIE&&i.boxModel){this._fixIESelection()}c.addUnload(f.destroy,f)},getContent:function(g){var f=this,h=f.getRng(),l=f.dom.create("body"),j=f.getSel(),i,k,m;g=g||{};i=k="";g.get=true;g.format=g.format||"html";f.onBeforeGetContent.dispatch(f,g);if(g.format=="text"){return f.isCollapsed()?"":(h.text||(j.toString?j.toString():""))}if(h.cloneContents){m=h.cloneContents();if(m){l.appendChild(m)}}else{if(b(h.item)||b(h.htmlText)){l.innerHTML=h.item?h.item(0).outerHTML:h.htmlText}else{l.innerHTML=h.toString()}}if(/^\s/.test(l.innerHTML)){i=" "}if(/\s+$/.test(l.innerHTML)){k=" "}g.getInner=true;g.content=f.isCollapsed()?"":i+f.serializer.serialize(l,g)+k;f.onGetContent.dispatch(f,g);return g.content},setContent:function(k,j){var h=this,f=h.getRng(),i,l=h.win.document,m,g;j=j||{format:"html"};j.set=true;k=j.content=k;if(!j.no_events){h.onBeforeSetContent.dispatch(h,j)}k=j.content;if(f.insertNode){k+='<span id="__caret">_</span>';if(f.startContainer==l&&f.endContainer==l){l.body.innerHTML=k}else{f.deleteContents();if(l.body.childNodes.length==0){l.body.innerHTML=k}else{if(f.createContextualFragment){f.insertNode(f.createContextualFragment(k))}else{m=l.createDocumentFragment();g=l.createElement("div");m.appendChild(g);g.outerHTML=k;f.insertNode(m)}}}i=h.dom.get("__caret");f=l.createRange();f.setStartBefore(i);f.setEndBefore(i);h.setRng(f);h.dom.remove("__caret");h.setRng(f)}else{if(f.item){l.execCommand("Delete",false,null);f=h.getRng()}f.pasteHTML(k)}if(!j.no_events){h.onSetContent.dispatch(h,j)}},getStart:function(){var g=this.getRng(),h,f,j,i;if(g.duplicate||g.item){if(g.item){return g.item(0)}j=g.duplicate();j.collapse(1);h=j.parentElement();f=i=g.parentElement();while(i=i.parentNode){if(i==h){h=f;break}}return h}else{h=g.startContainer;if(h.nodeType==1&&h.hasChildNodes()){h=h.childNodes[Math.min(h.childNodes.length-1,g.startOffset)]}if(h&&h.nodeType==3){return h.parentNode}return h}},getEnd:function(){var g=this,h=g.getRng(),i,f;if(h.duplicate||h.item){if(h.item){return h.item(0)}h=h.duplicate();h.collapse(0);i=h.parentElement();if(i&&i.nodeName=="BODY"){return i.lastChild||i}return i}else{i=h.endContainer;f=h.endOffset;if(i.nodeType==1&&i.hasChildNodes()){i=i.childNodes[f>0?f-1:f]}if(i&&i.nodeType==3){return i.parentNode}return i}},getBookmark:function(r,s){var v=this,m=v.dom,g,j,i,n,h,o,p,l="\uFEFF",u;function f(x,y){var t=0;d(m.select(x),function(A,z){if(A==y){t=z}});return t}if(r==2){function k(){var x=v.getRng(true),t=m.getRoot(),y={};function z(C,H){var B=C[H?"startContainer":"endContainer"],G=C[H?"startOffset":"endOffset"],A=[],D,F,E=0;if(B.nodeType==3){if(s){for(D=B.previousSibling;D&&D.nodeType==3;D=D.previousSibling){G+=D.nodeValue.length}}A.push(G)}else{F=B.childNodes;if(G>=F.length&&F.length){E=1;G=Math.max(0,F.length-1)}A.push(v.dom.nodeIndex(F[G],s)+E)}for(;B&&B!=t;B=B.parentNode){A.push(v.dom.nodeIndex(B,s))}return A}y.start=z(x,true);if(!v.isCollapsed()){y.end=z(x)}return y}return k()}if(r){return{rng:v.getRng()}}g=v.getRng();i=m.uniqueId();n=tinyMCE.activeEditor.selection.isCollapsed();u="overflow:hidden;line-height:0px";if(g.duplicate||g.item){if(!g.item){j=g.duplicate();try{g.collapse();g.pasteHTML('<span data-mce-type="bookmark" id="'+i+'_start" style="'+u+'">'+l+"</span>");if(!n){j.collapse(false);j.pasteHTML('<span data-mce-type="bookmark" id="'+i+'_end" style="'+u+'">'+l+"</span>")}}catch(q){return null}}else{o=g.item(0);h=o.nodeName;return{name:h,index:f(h,o)}}}else{o=v.getNode();h=o.nodeName;if(h=="IMG"){return{name:h,index:f(h,o)}}j=g.cloneRange();if(!n){j.collapse(false);j.insertNode(m.create("span",{"data-mce-type":"bookmark",id:i+"_end",style:u},l))}g.collapse(true);g.insertNode(m.create("span",{"data-mce-type":"bookmark",id:i+"_start",style:u},l))}v.moveToBookmark({id:i,keep:1});return{id:i}},moveToBookmark:function(n){var r=this,l=r.dom,i,h,f,q,j,s,o,p;if(r.tridentSel){r.tridentSel.destroy()}if(n){if(n.start){f=l.createRng();q=l.getRoot();function g(z){var t=n[z?"start":"end"],v,x,y,u;if(t){for(x=q,v=t.length-1;v>=1;v--){u=x.childNodes;if(u.length){x=u[t[v]];if(!x){return}}}if(x.nodeType===3&&t[0]>x.nodeValue.length-1){return}else{if(x.nodeType===1&&t[0]>x.childNodes.length){return}}if(z){f.setStart(x,t[0])}else{f.setEnd(x,t[0])}}return true}if(g(true)&&g()){r.setRng(f)}}else{if(n.id){function k(A){var u=l.get(n.id+"_"+A),z,t,x,y,v=n.keep;if(u){z=u.parentNode;if(A=="start"){if(!v){t=l.nodeIndex(u)}else{z=u.firstChild;t=1}j=s=z;o=p=t}else{if(!v){t=l.nodeIndex(u)}else{z=u.firstChild;t=1}s=z;p=t}if(!v){y=u.previousSibling;x=u.nextSibling;d(c.grep(u.childNodes),function(B){if(B.nodeType==3){B.nodeValue=B.nodeValue.replace(/\uFEFF/g,"")}});while(u=l.get(n.id+"_"+A)){l.remove(u,1)}if(y&&x&&y.nodeType==x.nodeType&&y.nodeType==3&&!c.isOpera){t=y.nodeValue.length;y.appendData(x.nodeValue);l.remove(x);if(A=="start"){j=s=y;o=p=t}else{s=y;p=t}}}}}function m(t){if(l.isBlock(t)&&!t.innerHTML){t.innerHTML=!a?'<br data-mce-bogus="1" />':" "}return t}k("start");k("end");if(j){f=l.createRng();f.setStart(m(j),o);f.setEnd(m(s),p);r.setRng(f)}}else{if(n.name){r.select(l.select(n.name)[n.index])}else{if(n.rng){r.setRng(n.rng)}}}}}},select:function(k,j){var i=this,l=i.dom,g=l.createRng(),f;if(k){f=l.nodeIndex(k);g.setStart(k.parentNode,f);g.setEnd(k.parentNode,f+1);if(j){function h(m,o){var n=new c.dom.TreeWalker(m,m);do{if(m.nodeType==3&&c.trim(m.nodeValue).length!=0){if(o){g.setStart(m,0)}else{g.setEnd(m,m.nodeValue.length)}return}if(m.nodeName=="BR"){if(o){g.setStartBefore(m)}else{g.setEndBefore(m)}return}}while(m=(o?n.next():n.prev()))}h(k,1);h(k)}i.setRng(g)}return k},isCollapsed:function(){var f=this,h=f.getRng(),g=f.getSel();if(!h||h.item){return false}if(h.compareEndPoints){return h.compareEndPoints("StartToEnd",h)===0}return !g||h.collapsed},collapse:function(f){var h=this,g=h.getRng(),i;if(g.item){i=g.item(0);g=h.win.document.body.createTextRange();g.moveToElementText(i)}g.collapse(!!f);h.setRng(g)},getSel:function(){var g=this,f=this.win;return f.getSelection?f.getSelection():f.document.selection},getRng:function(l){var g=this,h,i,k,j=g.win.document;if(l&&g.tridentSel){return g.tridentSel.getRangeAt(0)}try{if(h=g.getSel()){i=h.rangeCount>0?h.getRangeAt(0):(h.createRange?h.createRange():j.createRange())}}catch(f){}if(c.isIE&&i.setStart&&j.selection.createRange().item){k=j.selection.createRange().item(0);i=j.createRange();i.setStartBefore(k);i.setEndAfter(k)}if(!i){i=j.createRange?j.createRange():j.body.createTextRange()}if(g.selectedRange&&g.explicitRange){if(i.compareBoundaryPoints(i.START_TO_START,g.selectedRange)===0&&i.compareBoundaryPoints(i.END_TO_END,g.selectedRange)===0){i=g.explicitRange}else{g.selectedRange=null;g.explicitRange=null}}return i},setRng:function(i){var h,g=this;if(!g.tridentSel){h=g.getSel();if(h){g.explicitRange=i;h.removeAllRanges();h.addRange(i);g.selectedRange=h.getRangeAt(0)}}else{if(i.cloneRange){g.tridentSel.addRange(i);return}try{i.select()}catch(f){}}},setNode:function(g){var f=this;f.setContent(f.dom.getOuterHTML(g));return g},getNode:function(){var h=this,g=h.getRng(),i=h.getSel(),l,k=g.startContainer,f=g.endContainer;if(!g){return h.dom.getRoot()}if(g.setStart){l=g.commonAncestorContainer;if(!g.collapsed){if(g.startContainer==g.endContainer){if(g.endOffset-g.startOffset<2){if(g.startContainer.hasChildNodes()){l=g.startContainer.childNodes[g.startOffset]}}}if(k.nodeType===3&&f.nodeType===3){function j(p,m){var o=p;while(p&&p.nodeType===3&&p.length===0){p=m?p.nextSibling:p.previousSibling}return p||o}if(k.length===g.startOffset){k=j(k.nextSibling,true)}else{k=k.parentNode}if(g.endOffset===0){f=j(f.previousSibling,false)}else{f=f.parentNode}if(k&&k===f){return k}}}if(l&&l.nodeType==3){return l.parentNode}return l}return g.item?g.item(0):g.parentElement()},getSelectedBlocks:function(g,f){var i=this,j=i.dom,m,h,l,k=[];m=j.getParent(g||i.getStart(),j.isBlock);h=j.getParent(f||i.getEnd(),j.isBlock);if(m){k.push(m)}if(m&&h&&m!=h){l=m;while((l=l.nextSibling)&&l!=h){if(j.isBlock(l)){k.push(l)}}}if(h&&m!=h){k.push(h)}return k},destroy:function(g){var f=this;f.win=null;if(f.tridentSel){f.tridentSel.destroy()}if(!g){c.removeUnload(f.destroy)}},_fixIESelection:function(){var g=this.dom,m=g.doc,h=m.body,j,n,f;m.documentElement.unselectable=true;function i(o,r){var p=h.createTextRange();try{p.moveToPoint(o,r)}catch(q){p=null}return p}function l(p){var o;if(p.button){o=i(p.x,p.y);if(o){if(o.compareEndPoints("StartToStart",n)>0){o.setEndPoint("StartToStart",n)}else{o.setEndPoint("EndToEnd",n)}o.select()}}else{k()}}function k(){var o=m.selection.createRange();if(n&&!o.item&&o.compareEndPoints("StartToEnd",o)===0){n.select()}g.unbind(m,"mouseup",k);g.unbind(m,"mousemove",l);n=j=0}g.bind(m,["mousedown","contextmenu"],function(o){if(o.target.nodeName==="HTML"){if(j){k()}f=m.documentElement;if(f.scrollHeight>f.clientHeight){return}j=1;n=i(o.x,o.y);if(n){g.bind(m,"mouseup",k);g.bind(m,"mousemove",l);g.win.focus();n.select()}}})}})})(tinymce);(function(a){a.dom.Serializer=function(e,i,f){var h,b,d=a.isIE,g=a.each,c;if(!e.apply_source_formatting){e.indent=false}e.remove_trailing_brs=true;i=i||a.DOM;f=f||new a.html.Schema(e);e.entity_encoding=e.entity_encoding||"named";h=new a.util.Dispatcher(self);b=new a.util.Dispatcher(self);c=new a.html.DomParser(e,f);c.addAttributeFilter("src,href,style",function(k,j){var o=k.length,l,q,n="data-mce-"+j,p=e.url_converter,r=e.url_converter_scope,m;while(o--){l=k[o];q=l.attributes.map[n];if(q!==m){l.attr(j,q.length>0?q:null);l.attr(n,null)}else{q=l.attributes.map[j];if(j==="style"){q=i.serializeStyle(i.parseStyle(q),l.name)}else{if(p){q=p.call(r,q,j,l.name)}}l.attr(j,q.length>0?q:null)}}});c.addAttributeFilter("class",function(j,k){var l=j.length,m,n;while(l--){m=j[l];n=m.attr("class").replace(/\s*mceItem\w+\s*/g,"");m.attr("class",n.length>0?n:null)}});c.addAttributeFilter("data-mce-type",function(j,l,k){var m=j.length,n;while(m--){n=j[m];if(n.attributes.map["data-mce-type"]==="bookmark"&&!k.cleanup){n.remove()}}});c.addNodeFilter("script,style",function(k,l){var m=k.length,n,o;function j(p){return p.replace(/(<!--\[CDATA\[|\]\]-->)/g,"\n").replace(/^[\r\n]*|[\r\n]*$/g,"").replace(/^\s*(\/\/\s*<!--|\/\/\s*<!\[CDATA\[|<!--|<!\[CDATA\[)[\r\n]*/g,"").replace(/\s*(\/\/\s*\]\]>|\/\/\s*-->|\]\]>|-->|\]\]-->)\s*$/g,"")}while(m--){n=k[m];o=n.firstChild?n.firstChild.value:"";if(l==="script"){n.attr("type",(n.attr("type")||"text/javascript").replace(/^mce\-/,""));if(o.length>0){n.firstChild.value="// <![CDATA[\n"+j(o)+"\n// ]]>"}}else{if(o.length>0){n.firstChild.value="<!--\n"+j(o)+"\n-->"}}}});c.addNodeFilter("#comment",function(j,k){var l=j.length,m;while(l--){m=j[l];if(m.value.indexOf("[CDATA[")===0){m.name="#cdata";m.type=4;m.value=m.value.replace(/^\[CDATA\[|\]\]$/g,"")}else{if(m.value.indexOf("mce:protected ")===0){m.name="#text";m.type=3;m.raw=true;m.value=unescape(m.value).substr(14)}}}});c.addNodeFilter("xml:namespace,input",function(j,k){var l=j.length,m;while(l--){m=j[l];if(m.type===7){m.remove()}else{if(m.type===1){if(k==="input"&&!("type" in m.attributes.map)){m.attr("type","text")}}}}});if(e.fix_list_elements){c.addNodeFilter("ul,ol",function(k,l){var m=k.length,n,j;while(m--){n=k[m];j=n.parent;if(j.name==="ul"||j.name==="ol"){if(n.prev&&n.prev.name==="li"){n.prev.append(n)}}}})}c.addAttributeFilter("data-mce-src,data-mce-href,data-mce-style",function(j,k){var l=j.length;while(l--){j[l].attr(k,null)}});return{schema:f,addNodeFilter:c.addNodeFilter,addAttributeFilter:c.addAttributeFilter,onPreProcess:h,onPostProcess:b,serialize:function(o,m){var l,p,k,j,n;if(d&&i.select("script,style,select").length>0){n=o.innerHTML;o=o.cloneNode(false);i.setHTML(o,n)}else{o=o.cloneNode(true)}l=o.ownerDocument.implementation;if(l.createHTMLDocument){p=l.createHTMLDocument("");g(o.nodeName=="BODY"?o.childNodes:[o],function(q){p.body.appendChild(p.importNode(q,true))});if(o.nodeName!="BODY"){o=p.body.firstChild}else{o=p.body}k=i.doc;i.doc=p}m=m||{};m.format=m.format||"html";if(!m.no_events){m.node=o;h.dispatch(self,m)}j=new a.html.Serializer(e,f);m.content=j.serialize(c.parse(m.getInner?o.innerHTML:a.trim(i.getOuterHTML(o),m),m));if(!m.no_events){b.dispatch(self,m)}if(k){i.doc=k}m.node=null;return m.content},addRules:function(j){f.addValidElements(j)},setRules:function(j){f.setValidElements(j)}}}})(tinymce);(function(a){a.dom.ScriptLoader=function(h){var c=0,k=1,i=2,l={},j=[],f={},d=[],g=0,e;function b(m,u){var v=this,q=a.DOM,s,o,r,n;function p(){q.remove(n);if(s){s.onreadystatechange=s.onload=s=null}u()}n=q.uniqueId();if(a.isIE6){o=new a.util.URI(m);r=location;if(o.host==r.hostname&&o.port==r.port&&(o.protocol+":")==r.protocol){a.util.XHR.send({url:a._addVer(o.getURI()),success:function(x){var t=q.create("script",{type:"text/javascript"});t.text=x;document.getElementsByTagName("head")[0].appendChild(t);q.remove(t);p()}});return}}s=q.create("script",{id:n,type:"text/javascript",src:a._addVer(m)});if(!a.isIE){s.onload=p}if(!a.isOpera){s.onreadystatechange=function(){var t=s.readyState;if(t=="complete"||t=="loaded"){p()}}}(document.getElementsByTagName("head")[0]||document.body).appendChild(s)}this.isDone=function(m){return l[m]==i};this.markDone=function(m){l[m]=i};this.add=this.load=function(m,q,n){var o,p=l[m];if(p==e){j.push(m);l[m]=c}if(q){if(!f[m]){f[m]=[]}f[m].push({func:q,scope:n||this})}};this.loadQueue=function(n,m){this.loadScripts(j,n,m)};this.loadScripts=function(m,q,p){var o;function n(r){a.each(f[r],function(s){s.func.call(s.scope)});f[r]=e}d.push({func:q,scope:p||this});o=function(){var r=a.grep(m);m.length=0;a.each(r,function(s){if(l[s]==i){n(s);return}if(l[s]!=k){l[s]=k;g++;b(s,function(){l[s]=i;g--;n(s);o()})}});if(!g){a.each(d,function(s){s.func.call(s.scope)});d.length=0}};o()}};a.ScriptLoader=new a.dom.ScriptLoader()})(tinymce);tinymce.dom.TreeWalker=function(a,c){var b=a;function d(i,f,e,j){var h,g;if(i){if(!j&&i[f]){return i[f]}if(i!=c){h=i[e];if(h){return h}for(g=i.parentNode;g&&g!=c;g=g.parentNode){h=g[e];if(h){return h}}}}}this.current=function(){return b};this.next=function(e){return(b=d(b,"firstChild","nextSibling",e))};this.prev=function(e){return(b=d(b,"lastChild","previousSibling",e))}};(function(a){a.dom.RangeUtils=function(c){var b="\uFEFF";this.walk=function(d,r){var h=d.startContainer,k=d.startOffset,s=d.endContainer,l=d.endOffset,i,f,n,g,q,p,e;e=c.select("td.mceSelected,th.mceSelected");if(e.length>0){a.each(e,function(t){r([t])});return}function o(v,u,t){var x=[];for(;v&&v!=t;v=v[u]){x.push(v)}return x}function m(u,t){do{if(u.parentNode==t){return u}u=u.parentNode}while(u)}function j(v,u,x){var t=x?"nextSibling":"previousSibling";for(g=v,q=g.parentNode;g&&g!=u;g=q){q=g.parentNode;p=o(g==v?g:g[t],t);if(p.length){if(!x){p.reverse()}r(p)}}}if(h.nodeType==1&&h.hasChildNodes()){h=h.childNodes[k]}if(s.nodeType==1&&s.hasChildNodes()){s=s.childNodes[Math.min(l-1,s.childNodes.length-1)]}i=c.findCommonAncestor(h,s);if(h==s){return r([h])}for(g=h;g;g=g.parentNode){if(g==s){return j(h,i,true)}if(g==i){break}}for(g=s;g;g=g.parentNode){if(g==h){return j(s,i)}if(g==i){break}}f=m(h,i)||h;n=m(s,i)||s;j(h,f,true);p=o(f==h?f:f.nextSibling,"nextSibling",n==s?n.nextSibling:n);if(p.length){r(p)}j(s,n)}};a.dom.RangeUtils.compareRanges=function(c,b){if(c&&b){if(c.item||c.duplicate){if(c.item&&b.item&&c.item(0)===b.item(0)){return true}if(c.isEqual&&b.isEqual&&b.isEqual(c)){return true}}else{return c.startContainer==b.startContainer&&c.startOffset==b.startOffset}}return false}})(tinymce);(function(b){var a=b.dom.Event,c=b.each;b.create("tinymce.ui.KeyboardNavigation",{KeyboardNavigation:function(e,f){var p=this,m=e.root,l=e.items,n=e.enableUpDown,i=e.enableLeftRight||!e.enableUpDown,k=e.excludeFromTabOrder,j,h,o,d,g;f=f||b.DOM;j=function(q){g=q.target.id};h=function(q){f.setAttrib(q.target.id,"tabindex","-1")};d=function(q){var r=f.get(g);f.setAttrib(r,"tabindex","0");r.focus()};p.focus=function(){f.get(g).focus()};p.destroy=function(){c(l,function(q){f.unbind(f.get(q.id),"focus",j);f.unbind(f.get(q.id),"blur",h)});f.unbind(f.get(m),"focus",d);f.unbind(f.get(m),"keydown",o);l=f=m=p.focus=j=h=o=d=null;p.destroy=function(){}};p.moveFocus=function(u,r){var q=-1,t=p.controls,s;if(!g){return}c(l,function(x,v){if(x.id===g){q=v;return false}});q+=u;if(q<0){q=l.length-1}else{if(q>=l.length){q=0}}s=l[q];f.setAttrib(g,"tabindex","-1");f.setAttrib(s.id,"tabindex","0");f.get(s.id).focus();if(e.actOnFocus){e.onAction(s.id)}if(r){a.cancel(r)}};o=function(y){var u=37,t=39,x=38,z=40,q=27,s=14,r=13,v=32;switch(y.keyCode){case u:if(i){p.moveFocus(-1)}break;case t:if(i){p.moveFocus(1)}break;case x:if(n){p.moveFocus(-1)}break;case z:if(n){p.moveFocus(1)}break;case q:if(e.onCancel){e.onCancel();a.cancel(y)}break;case s:case r:case v:if(e.onAction){e.onAction(g);a.cancel(y)}break}};c(l,function(s,q){var r;if(!s.id){s.id=f.uniqueId("_mce_item_")}if(k){f.bind(s.id,"blur",h);r="-1"}else{r=(q===0?"0":"-1")}f.setAttrib(s.id,"tabindex",r);f.bind(f.get(s.id),"focus",j)});if(l[0]){g=l[0].id}f.setAttrib(m,"tabindex","-1");f.bind(f.get(m),"focus",d);f.bind(f.get(m),"keydown",o)}})})(tinymce);(function(c){var b=c.DOM,a=c.is;c.create("tinymce.ui.Control",{Control:function(f,e,d){this.id=f;this.settings=e=e||{};this.rendered=false;this.onRender=new c.util.Dispatcher(this);this.classPrefix="";this.scope=e.scope||this;this.disabled=0;this.active=0;this.editor=d},setAriaProperty:function(f,e){var d=b.get(this.id+"_aria")||b.get(this.id);if(d){b.setAttrib(d,"aria-"+f,!!e)}},focus:function(){b.get(this.id).focus()},setDisabled:function(d){if(d!=this.disabled){this.setAriaProperty("disabled",d);this.setState("Disabled",d);this.setState("Enabled",!d);this.disabled=d}},isDisabled:function(){return this.disabled},setActive:function(d){if(d!=this.active){this.setState("Active",d);this.active=d;this.setAriaProperty("pressed",d)}},isActive:function(){return this.active},setState:function(f,d){var e=b.get(this.id);f=this.classPrefix+f;if(d){b.addClass(e,f)}else{b.removeClass(e,f)}},isRendered:function(){return this.rendered},renderHTML:function(){},renderTo:function(d){b.setHTML(d,this.renderHTML())},postRender:function(){var e=this,d;if(a(e.disabled)){d=e.disabled;e.disabled=-1;e.setDisabled(d)}if(a(e.active)){d=e.active;e.active=-1;e.setActive(d)}},remove:function(){b.remove(this.id);this.destroy()},destroy:function(){c.dom.Event.clear(this.id)}})})(tinymce);tinymce.create("tinymce.ui.Container:tinymce.ui.Control",{Container:function(c,b,a){this.parent(c,b,a);this.controls=[];this.lookup={}},add:function(a){this.lookup[a.id]=a;this.controls.push(a);return a},get:function(a){return this.lookup[a]}});tinymce.create("tinymce.ui.Separator:tinymce.ui.Control",{Separator:function(b,a){this.parent(b,a);this.classPrefix="mceSeparator";this.setDisabled(true)},renderHTML:function(){return tinymce.DOM.createHTML("span",{"class":this.classPrefix,role:"separator","aria-orientation":"vertical",tabindex:"-1"})}});(function(d){var c=d.is,b=d.DOM,e=d.each,a=d.walk;d.create("tinymce.ui.MenuItem:tinymce.ui.Control",{MenuItem:function(g,f){this.parent(g,f);this.classPrefix="mceMenuItem"},setSelected:function(f){this.setState("Selected",f);this.setAriaProperty("checked",!!f);this.selected=f},isSelected:function(){return this.selected},postRender:function(){var f=this;f.parent();if(c(f.selected)){f.setSelected(f.selected)}}})})(tinymce);(function(d){var c=d.is,b=d.DOM,e=d.each,a=d.walk;d.create("tinymce.ui.Menu:tinymce.ui.MenuItem",{Menu:function(h,g){var f=this;f.parent(h,g);f.items={};f.collapsed=false;f.menuCount=0;f.onAddItem=new d.util.Dispatcher(this)},expand:function(g){var f=this;if(g){a(f,function(h){if(h.expand){h.expand()}},"items",f)}f.collapsed=false},collapse:function(g){var f=this;if(g){a(f,function(h){if(h.collapse){h.collapse()}},"items",f)}f.collapsed=true},isCollapsed:function(){return this.collapsed},add:function(f){if(!f.settings){f=new d.ui.MenuItem(f.id||b.uniqueId(),f)}this.onAddItem.dispatch(this,f);return this.items[f.id]=f},addSeparator:function(){return this.add({separator:true})},addMenu:function(f){if(!f.collapse){f=this.createMenu(f)}this.menuCount++;return this.add(f)},hasMenus:function(){return this.menuCount!==0},remove:function(f){delete this.items[f.id]},removeAll:function(){var f=this;a(f,function(g){if(g.removeAll){g.removeAll()}else{g.remove()}g.destroy()},"items",f);f.items={}},createMenu:function(g){var f=new d.ui.Menu(g.id||b.uniqueId(),g);f.onAddItem.add(this.onAddItem.dispatch,this.onAddItem);return f}})})(tinymce);(function(e){var d=e.is,c=e.DOM,f=e.each,a=e.dom.Event,b=e.dom.Element;e.create("tinymce.ui.DropMenu:tinymce.ui.Menu",{DropMenu:function(h,g){g=g||{};g.container=g.container||c.doc.body;g.offset_x=g.offset_x||0;g.offset_y=g.offset_y||0;g.vp_offset_x=g.vp_offset_x||0;g.vp_offset_y=g.vp_offset_y||0;if(d(g.icons)&&!g.icons){g["class"]+=" mceNoIcons"}this.parent(h,g);this.onShowMenu=new e.util.Dispatcher(this);this.onHideMenu=new e.util.Dispatcher(this);this.classPrefix="mceMenu"},createMenu:function(j){var h=this,i=h.settings,g;j.container=j.container||i.container;j.parent=h;j.constrain=j.constrain||i.constrain;j["class"]=j["class"]||i["class"];j.vp_offset_x=j.vp_offset_x||i.vp_offset_x;j.vp_offset_y=j.vp_offset_y||i.vp_offset_y;j.keyboard_focus=i.keyboard_focus;g=new e.ui.DropMenu(j.id||c.uniqueId(),j);g.onAddItem.add(h.onAddItem.dispatch,h.onAddItem);return g},focus:function(){var g=this;if(g.keyboardNav){g.keyboardNav.focus()}},update:function(){var i=this,j=i.settings,g=c.get("menu_"+i.id+"_tbl"),l=c.get("menu_"+i.id+"_co"),h,k;h=j.max_width?Math.min(g.clientWidth,j.max_width):g.clientWidth;k=j.max_height?Math.min(g.clientHeight,j.max_height):g.clientHeight;if(!c.boxModel){i.element.setStyles({width:h+2,height:k+2})}else{i.element.setStyles({width:h,height:k})}if(j.max_width){c.setStyle(l,"width",h)}if(j.max_height){c.setStyle(l,"height",k);if(g.clientHeight<j.max_height){c.setStyle(l,"overflow","hidden")}}},showMenu:function(p,n,r){var z=this,A=z.settings,o,g=c.getViewPort(),u,l,v,q,i=2,k,j,m=z.classPrefix;z.collapse(1);if(z.isMenuVisible){return}if(!z.rendered){o=c.add(z.settings.container,z.renderNode());f(z.items,function(h){h.postRender()});z.element=new b("menu_"+z.id,{blocker:1,container:A.container})}else{o=c.get("menu_"+z.id)}if(!e.isOpera){c.setStyles(o,{left:-65535,top:-65535})}c.show(o);z.update();p+=A.offset_x||0;n+=A.offset_y||0;g.w-=4;g.h-=4;if(A.constrain){u=o.clientWidth-i;l=o.clientHeight-i;v=g.x+g.w;q=g.y+g.h;if((p+A.vp_offset_x+u)>v){p=r?r-u:Math.max(0,(v-A.vp_offset_x)-u)}if((n+A.vp_offset_y+l)>q){n=Math.max(0,(q-A.vp_offset_y)-l)}}c.setStyles(o,{left:p,top:n});z.element.update();z.isMenuVisible=1;z.mouseClickFunc=a.add(o,"click",function(s){var h;s=s.target;if(s&&(s=c.getParent(s,"tr"))&&!c.hasClass(s,m+"ItemSub")){h=z.items[s.id];if(h.isDisabled()){return}k=z;while(k){if(k.hideMenu){k.hideMenu()}k=k.settings.parent}if(h.settings.onclick){h.settings.onclick(s)}return a.cancel(s)}});if(z.hasMenus()){z.mouseOverFunc=a.add(o,"mouseover",function(x){var h,t,s;x=x.target;if(x&&(x=c.getParent(x,"tr"))){h=z.items[x.id];if(z.lastMenu){z.lastMenu.collapse(1)}if(h.isDisabled()){return}if(x&&c.hasClass(x,m+"ItemSub")){t=c.getRect(x);h.showMenu((t.x+t.w-i),t.y-i,t.x);z.lastMenu=h;c.addClass(c.get(h.id).firstChild,m+"ItemActive")}}})}a.add(o,"keydown",z._keyHandler,z);z.onShowMenu.dispatch(z);if(A.keyboard_focus){z._setupKeyboardNav()}},hideMenu:function(j){var g=this,i=c.get("menu_"+g.id),h;if(!g.isMenuVisible){return}if(g.keyboardNav){g.keyboardNav.destroy()}a.remove(i,"mouseover",g.mouseOverFunc);a.remove(i,"click",g.mouseClickFunc);a.remove(i,"keydown",g._keyHandler);c.hide(i);g.isMenuVisible=0;if(!j){g.collapse(1)}if(g.element){g.element.hide()}if(h=c.get(g.id)){c.removeClass(h.firstChild,g.classPrefix+"ItemActive")}g.onHideMenu.dispatch(g)},add:function(i){var g=this,h;i=g.parent(i);if(g.isRendered&&(h=c.get("menu_"+g.id))){g._add(c.select("tbody",h)[0],i)}return i},collapse:function(g){this.parent(g);this.hideMenu(1)},remove:function(g){c.remove(g.id);this.destroy();return this.parent(g)},destroy:function(){var g=this,h=c.get("menu_"+g.id);if(g.keyboardNav){g.keyboardNav.destroy()}a.remove(h,"mouseover",g.mouseOverFunc);a.remove(c.select("a",h),"focus",g.mouseOverFunc);a.remove(h,"click",g.mouseClickFunc);a.remove(h,"keydown",g._keyHandler);if(g.element){g.element.remove()}c.remove(h)},renderNode:function(){var i=this,j=i.settings,l,h,k,g;g=c.create("div",{role:"listbox",id:"menu_"+i.id,"class":j["class"],style:"position:absolute;left:0;top:0;z-index:200000;outline:0"});if(i.settings.parent){c.setAttrib(g,"aria-parent","menu_"+i.settings.parent.id)}k=c.add(g,"div",{role:"presentation",id:"menu_"+i.id+"_co","class":i.classPrefix+(j["class"]?" "+j["class"]:"")});i.element=new b("menu_"+i.id,{blocker:1,container:j.container});if(j.menu_line){c.add(k,"span",{"class":i.classPrefix+"Line"})}l=c.add(k,"table",{role:"presentation",id:"menu_"+i.id+"_tbl",border:0,cellPadding:0,cellSpacing:0});h=c.add(l,"tbody");f(i.items,function(m){i._add(h,m)});i.rendered=true;return g},_setupKeyboardNav:function(){var i,h,g=this;i=c.select("#menu_"+g.id)[0];h=c.select("a[role=option]","menu_"+g.id);h.splice(0,0,i);g.keyboardNav=new e.ui.KeyboardNavigation({root:"menu_"+g.id,items:h,onCancel:function(){g.hideMenu()},enableUpDown:true});i.focus()},_keyHandler:function(g){var h=this,i;switch(g.keyCode){case 37:if(h.settings.parent){h.hideMenu();h.settings.parent.focus();a.cancel(g)}break;case 39:if(h.mouseOverFunc){h.mouseOverFunc(g)}break}},_add:function(j,h){var i,q=h.settings,p,l,k,m=this.classPrefix,g;if(q.separator){l=c.add(j,"tr",{id:h.id,"class":m+"ItemSeparator"});c.add(l,"td",{"class":m+"ItemSeparator"});if(i=l.previousSibling){c.addClass(i,"mceLast")}return}i=l=c.add(j,"tr",{id:h.id,"class":m+"Item "+m+"ItemEnabled"});i=k=c.add(i,q.titleItem?"th":"td");i=p=c.add(i,"a",{id:h.id+"_aria",role:q.titleItem?"presentation":"option",href:"javascript:;",onclick:"return false;",onmousedown:"return false;"});if(q.parent){c.setAttrib(p,"aria-haspopup","true");c.setAttrib(p,"aria-owns","menu_"+h.id)}c.addClass(k,q["class"]);g=c.add(i,"span",{"class":"mceIcon"+(q.icon?" mce_"+q.icon:"")});if(q.icon_src){c.add(g,"img",{src:q.icon_src})}i=c.add(i,q.element||"span",{"class":"mceText",title:h.settings.title},h.settings.title);if(h.settings.style){c.setAttrib(i,"style",h.settings.style)}if(j.childNodes.length==1){c.addClass(l,"mceFirst")}if((i=l.previousSibling)&&c.hasClass(i,m+"ItemSeparator")){c.addClass(l,"mceFirst")}if(h.collapse){c.addClass(l,m+"ItemSub")}if(i=l.previousSibling){c.removeClass(i,"mceLast")}c.addClass(l,"mceLast")}})})(tinymce);(function(b){var a=b.DOM;b.create("tinymce.ui.Button:tinymce.ui.Control",{Button:function(e,d,c){this.parent(e,d,c);this.classPrefix="mceButton"},renderHTML:function(){var f=this.classPrefix,e=this.settings,d,c;c=a.encode(e.label||"");d='<a role="button" id="'+this.id+'" href="javascript:;" class="'+f+" "+f+"Enabled "+e["class"]+(c?" "+f+"Labeled":"")+'" onmousedown="return false;" onclick="return false;" aria-labelledby="'+this.id+'_voice" title="'+a.encode(e.title)+'">';if(e.image){d+='<img class="mceIcon" src="'+e.image+'" alt="'+a.encode(e.title)+'" />'+c}else{d+='<span class="mceIcon '+e["class"]+'"></span>'+(c?'<span class="'+f+'Label">'+c+"</span>":"")}d+='<span class="mceVoiceLabel mceIconOnly" style="display: none;" id="'+this.id+'_voice">'+e.title+"</span>";d+="</a>";return d},postRender:function(){var c=this,d=c.settings;b.dom.Event.add(c.id,"click",function(f){if(!c.isDisabled()){return d.onclick.call(d.scope,f)}})}})})(tinymce);(function(d){var c=d.DOM,b=d.dom.Event,e=d.each,a=d.util.Dispatcher;d.create("tinymce.ui.ListBox:tinymce.ui.Control",{ListBox:function(i,h,f){var g=this;g.parent(i,h,f);g.items=[];g.onChange=new a(g);g.onPostRender=new a(g);g.onAdd=new a(g);g.onRenderMenu=new d.util.Dispatcher(this);g.classPrefix="mceListBox"},select:function(h){var g=this,j,i;if(h==undefined){return g.selectByIndex(-1)}if(h&&h.call){i=h}else{i=function(f){return f==h}}if(h!=g.selectedValue){e(g.items,function(k,f){if(i(k.value)){j=1;g.selectByIndex(f);return false}});if(!j){g.selectByIndex(-1)}}},selectByIndex:function(f){var g=this,h,i;if(f!=g.selectedIndex){h=c.get(g.id+"_text");i=g.items[f];if(i){g.selectedValue=i.value;g.selectedIndex=f;c.setHTML(h,c.encode(i.title));c.removeClass(h,"mceTitle");c.setAttrib(g.id,"aria-valuenow",i.title)}else{c.setHTML(h,c.encode(g.settings.title));c.addClass(h,"mceTitle");g.selectedValue=g.selectedIndex=null;c.setAttrib(g.id,"aria-valuenow",g.settings.title)}h=0}},add:function(i,f,h){var g=this;h=h||{};h=d.extend(h,{title:i,value:f});g.items.push(h);g.onAdd.dispatch(g,h)},getLength:function(){return this.items.length},renderHTML:function(){var i="",f=this,g=f.settings,j=f.classPrefix;i='<span role="button" aria-haspopup="true" aria-labelledby="'+f.id+'_text" aria-describedby="'+f.id+'_voiceDesc"><table role="presentation" tabindex="0" id="'+f.id+'" cellpadding="0" cellspacing="0" class="'+j+" "+j+"Enabled"+(g["class"]?(" "+g["class"]):"")+'"><tbody><tr>';i+="<td>"+c.createHTML("span",{id:f.id+"_voiceDesc","class":"voiceLabel",style:"display:none;"},f.settings.title);i+=c.createHTML("a",{id:f.id+"_text",tabindex:-1,href:"javascript:;","class":"mceText",onclick:"return false;",onmousedown:"return false;"},c.encode(f.settings.title))+"</td>";i+="<td>"+c.createHTML("a",{id:f.id+"_open",tabindex:-1,href:"javascript:;","class":"mceOpen",onclick:"return false;",onmousedown:"return false;"},'<span><span style="display:none;" class="mceIconOnly" aria-hidden="true">\u25BC</span></span>')+"</td>";i+="</tr></tbody></table></span>";return i},showMenu:function(){var g=this,j,i,h=c.get(this.id),f;if(g.isDisabled()||g.items.length==0){return}if(g.menu&&g.menu.isMenuVisible){return g.hideMenu()}if(!g.isMenuRendered){g.renderMenu();g.isMenuRendered=true}j=c.getPos(this.settings.menu_container);i=c.getPos(h);f=g.menu;f.settings.offset_x=i.x;f.settings.offset_y=i.y;f.settings.keyboard_focus=!d.isOpera;if(g.oldID){f.items[g.oldID].setSelected(0)}e(g.items,function(k){if(k.value===g.selectedValue){f.items[k.id].setSelected(1);g.oldID=k.id}});f.showMenu(0,h.clientHeight);b.add(c.doc,"mousedown",g.hideMenu,g);c.addClass(g.id,g.classPrefix+"Selected")},hideMenu:function(g){var f=this;if(f.menu&&f.menu.isMenuVisible){c.removeClass(f.id,f.classPrefix+"Selected");if(g&&g.type=="mousedown"&&(g.target.id==f.id+"_text"||g.target.id==f.id+"_open")){return}if(!g||!c.getParent(g.target,".mceMenu")){c.removeClass(f.id,f.classPrefix+"Selected");b.remove(c.doc,"mousedown",f.hideMenu,f);f.menu.hideMenu()}}},renderMenu:function(){var g=this,f;f=g.settings.control_manager.createDropMenu(g.id+"_menu",{menu_line:1,"class":g.classPrefix+"Menu mceNoIcons",max_width:150,max_height:150});f.onHideMenu.add(function(){g.hideMenu();g.focus()});f.add({title:g.settings.title,"class":"mceMenuItemTitle",onclick:function(){if(g.settings.onselect("")!==false){g.select("")}}});e(g.items,function(h){if(h.value===undefined){f.add({title:h.title,"class":"mceMenuItemTitle",onclick:function(){if(g.settings.onselect("")!==false){g.select("")}}})}else{h.id=c.uniqueId();h.onclick=function(){if(g.settings.onselect(h.value)!==false){g.select(h.value)}};f.add(h)}});g.onRenderMenu.dispatch(g,f);g.menu=f},postRender:function(){var f=this,g=f.classPrefix;b.add(f.id,"click",f.showMenu,f);b.add(f.id,"keydown",function(h){if(h.keyCode==32){f.showMenu(h);b.cancel(h)}});b.add(f.id,"focus",function(){if(!f._focused){f.keyDownHandler=b.add(f.id,"keydown",function(h){if(h.keyCode==40){f.showMenu();b.cancel(h)}});f.keyPressHandler=b.add(f.id,"keypress",function(i){var h;if(i.keyCode==13){h=f.selectedValue;f.selectedValue=null;b.cancel(i);f.settings.onselect(h)}})}f._focused=1});b.add(f.id,"blur",function(){b.remove(f.id,"keydown",f.keyDownHandler);b.remove(f.id,"keypress",f.keyPressHandler);f._focused=0});if(d.isIE6||!c.boxModel){b.add(f.id,"mouseover",function(){if(!c.hasClass(f.id,g+"Disabled")){c.addClass(f.id,g+"Hover")}});b.add(f.id,"mouseout",function(){if(!c.hasClass(f.id,g+"Disabled")){c.removeClass(f.id,g+"Hover")}})}f.onPostRender.dispatch(f,c.get(f.id))},destroy:function(){this.parent();b.clear(this.id+"_text");b.clear(this.id+"_open")}})})(tinymce);(function(d){var c=d.DOM,b=d.dom.Event,e=d.each,a=d.util.Dispatcher;d.create("tinymce.ui.NativeListBox:tinymce.ui.ListBox",{NativeListBox:function(g,f){this.parent(g,f);this.classPrefix="mceNativeListBox"},setDisabled:function(f){c.get(this.id).disabled=f;this.setAriaProperty("disabled",f)},isDisabled:function(){return c.get(this.id).disabled},select:function(h){var g=this,j,i;if(h==undefined){return g.selectByIndex(-1)}if(h&&h.call){i=h}else{i=function(f){return f==h}}if(h!=g.selectedValue){e(g.items,function(k,f){if(i(k.value)){j=1;g.selectByIndex(f);return false}});if(!j){g.selectByIndex(-1)}}},selectByIndex:function(f){c.get(this.id).selectedIndex=f+1;this.selectedValue=this.items[f]?this.items[f].value:null},add:function(j,g,f){var i,h=this;f=f||{};f.value=g;if(h.isRendered()){c.add(c.get(this.id),"option",f,j)}i={title:j,value:g,attribs:f};h.items.push(i);h.onAdd.dispatch(h,i)},getLength:function(){return this.items.length},renderHTML:function(){var g,f=this;g=c.createHTML("option",{value:""},"-- "+f.settings.title+" --");e(f.items,function(h){g+=c.createHTML("option",{value:h.value},h.title)});g=c.createHTML("select",{id:f.id,"class":"mceNativeListBox","aria-labelledby":f.id+"_aria"},g);g+=c.createHTML("span",{id:f.id+"_aria",style:"display: none"},f.settings.title);return g},postRender:function(){var g=this,h,i=true;g.rendered=true;function f(k){var j=g.items[k.target.selectedIndex-1];if(j&&(j=j.value)){g.onChange.dispatch(g,j);if(g.settings.onselect){g.settings.onselect(j)}}}b.add(g.id,"change",f);b.add(g.id,"keydown",function(k){var j;b.remove(g.id,"change",h);i=false;j=b.add(g.id,"blur",function(){if(i){return}i=true;b.add(g.id,"change",f);b.remove(g.id,"blur",j)});if(k.keyCode==13||k.keyCode==32){f(k);return b.cancel(k)}});g.onPostRender.dispatch(g,c.get(g.id))}})})(tinymce);(function(c){var b=c.DOM,a=c.dom.Event,d=c.each;c.create("tinymce.ui.MenuButton:tinymce.ui.Button",{MenuButton:function(g,f,e){this.parent(g,f,e);this.onRenderMenu=new c.util.Dispatcher(this);f.menu_container=f.menu_container||b.doc.body},showMenu:function(){var g=this,j,i,h=b.get(g.id),f;if(g.isDisabled()){return}if(!g.isMenuRendered){g.renderMenu();g.isMenuRendered=true}if(g.isMenuVisible){return g.hideMenu()}j=b.getPos(g.settings.menu_container);i=b.getPos(h);f=g.menu;f.settings.offset_x=i.x;f.settings.offset_y=i.y;f.settings.vp_offset_x=i.x;f.settings.vp_offset_y=i.y;f.settings.keyboard_focus=g._focused;f.showMenu(0,h.clientHeight);a.add(b.doc,"mousedown",g.hideMenu,g);g.setState("Selected",1);g.isMenuVisible=1},renderMenu:function(){var f=this,e;e=f.settings.control_manager.createDropMenu(f.id+"_menu",{menu_line:1,"class":this.classPrefix+"Menu",icons:f.settings.icons});e.onHideMenu.add(function(){f.hideMenu();f.focus()});f.onRenderMenu.dispatch(f,e);f.menu=e},hideMenu:function(g){var f=this;if(g&&g.type=="mousedown"&&b.getParent(g.target,function(h){return h.id===f.id||h.id===f.id+"_open"})){return}if(!g||!b.getParent(g.target,".mceMenu")){f.setState("Selected",0);a.remove(b.doc,"mousedown",f.hideMenu,f);if(f.menu){f.menu.hideMenu()}}f.isMenuVisible=0},postRender:function(){var e=this,f=e.settings;a.add(e.id,"click",function(){if(!e.isDisabled()){if(f.onclick){f.onclick(e.value)}e.showMenu()}})}})})(tinymce);(function(c){var b=c.DOM,a=c.dom.Event,d=c.each;c.create("tinymce.ui.SplitButton:tinymce.ui.MenuButton",{SplitButton:function(g,f,e){this.parent(g,f,e);this.classPrefix="mceSplitButton"},renderHTML:function(){var i,f=this,g=f.settings,e;i="<tbody><tr>";if(g.image){e=b.createHTML("img ",{src:g.image,role:"presentation","class":"mceAction "+g["class"]})}else{e=b.createHTML("span",{"class":"mceAction "+g["class"]},"")}e+=b.createHTML("span",{"class":"mceVoiceLabel mceIconOnly",id:f.id+"_voice",style:"display:none;"},g.title);i+="<td >"+b.createHTML("a",{role:"button",id:f.id+"_action",tabindex:"-1",href:"javascript:;","class":"mceAction "+g["class"],onclick:"return false;",onmousedown:"return false;",title:g.title},e)+"</td>";e=b.createHTML("span",{"class":"mceOpen "+g["class"]},'<span style="display:none;" class="mceIconOnly" aria-hidden="true">\u25BC</span>');i+="<td >"+b.createHTML("a",{role:"button",id:f.id+"_open",tabindex:"-1",href:"javascript:;","class":"mceOpen "+g["class"],onclick:"return false;",onmousedown:"return false;",title:g.title},e)+"</td>";i+="</tr></tbody>";i=b.createHTML("table",{id:f.id,role:"presentation",tabindex:"0","class":"mceSplitButton mceSplitButtonEnabled "+g["class"],cellpadding:"0",cellspacing:"0",title:g.title},i);return b.createHTML("span",{role:"button","aria-labelledby":f.id+"_voice","aria-haspopup":"true"},i)},postRender:function(){var e=this,g=e.settings,f;if(g.onclick){f=function(h){if(!e.isDisabled()){g.onclick(e.value);a.cancel(h)}};a.add(e.id+"_action","click",f);a.add(e.id,["click","keydown"],function(h){var k=32,m=14,i=13,j=38,l=40;if((h.keyCode===32||h.keyCode===13||h.keyCode===14)&&!h.altKey&&!h.ctrlKey&&!h.metaKey){f();a.cancel(h)}else{if(h.type==="click"||h.keyCode===l){e.showMenu();a.cancel(h)}}})}a.add(e.id+"_open","click",function(h){e.showMenu();a.cancel(h)});a.add([e.id,e.id+"_open"],"focus",function(){e._focused=1});a.add([e.id,e.id+"_open"],"blur",function(){e._focused=0});if(c.isIE6||!b.boxModel){a.add(e.id,"mouseover",function(){if(!b.hasClass(e.id,"mceSplitButtonDisabled")){b.addClass(e.id,"mceSplitButtonHover")}});a.add(e.id,"mouseout",function(){if(!b.hasClass(e.id,"mceSplitButtonDisabled")){b.removeClass(e.id,"mceSplitButtonHover")}})}},destroy:function(){this.parent();a.clear(this.id+"_action");a.clear(this.id+"_open");a.clear(this.id)}})})(tinymce);(function(d){var c=d.DOM,a=d.dom.Event,b=d.is,e=d.each;d.create("tinymce.ui.ColorSplitButton:tinymce.ui.SplitButton",{ColorSplitButton:function(i,h,f){var g=this;g.parent(i,h,f);g.settings=h=d.extend({colors:"000000,993300,333300,003300,003366,000080,333399,333333,800000,FF6600,808000,008000,008080,0000FF,666699,808080,FF0000,FF9900,99CC00,339966,33CCCC,3366FF,800080,999999,FF00FF,FFCC00,FFFF00,00FF00,00FFFF,00CCFF,993366,C0C0C0,FF99CC,FFCC99,FFFF99,CCFFCC,CCFFFF,99CCFF,CC99FF,FFFFFF",grid_width:8,default_color:"#888888"},g.settings);g.onShowMenu=new d.util.Dispatcher(g);g.onHideMenu=new d.util.Dispatcher(g);g.value=h.default_color},showMenu:function(){var f=this,g,j,i,h;if(f.isDisabled()){return}if(!f.isMenuRendered){f.renderMenu();f.isMenuRendered=true}if(f.isMenuVisible){return f.hideMenu()}i=c.get(f.id);c.show(f.id+"_menu");c.addClass(i,"mceSplitButtonSelected");h=c.getPos(i);c.setStyles(f.id+"_menu",{left:h.x,top:h.y+i.clientHeight,zIndex:200000});i=0;a.add(c.doc,"mousedown",f.hideMenu,f);f.onShowMenu.dispatch(f);if(f._focused){f._keyHandler=a.add(f.id+"_menu","keydown",function(k){if(k.keyCode==27){f.hideMenu()}});c.select("a",f.id+"_menu")[0].focus()}f.isMenuVisible=1},hideMenu:function(g){var f=this;if(g&&g.type=="mousedown"&&c.getParent(g.target,function(h){return h.id===f.id+"_open"})){return}if(!g||!c.getParent(g.target,".mceSplitButtonMenu")){c.removeClass(f.id,"mceSplitButtonSelected");a.remove(c.doc,"mousedown",f.hideMenu,f);a.remove(f.id+"_menu","keydown",f._keyHandler);c.hide(f.id+"_menu")}f.onHideMenu.dispatch(f);f.isMenuVisible=0;f.editor.focus()},renderMenu:function(){var p=this,h,k=0,q=p.settings,g,j,l,o,f;o=c.add(q.menu_container,"div",{role:"listbox",id:p.id+"_menu","class":q.menu_class+" "+q["class"],style:"position:absolute;left:0;top:-1000px;"});h=c.add(o,"div",{"class":q["class"]+" mceSplitButtonMenu"});c.add(h,"span",{"class":"mceMenuLine"});g=c.add(h,"table",{role:"presentation","class":"mceColorSplitMenu"});j=c.add(g,"tbody");k=0;e(b(q.colors,"array")?q.colors:q.colors.split(","),function(i){i=i.replace(/^#/,"");if(!k--){l=c.add(j,"tr");k=q.grid_width-1}g=c.add(l,"td");g=c.add(g,"a",{role:"option",href:"javascript:;",style:{backgroundColor:"#"+i},title:p.editor.getLang("colors."+i,i),"data-mce-color":"#"+i});if(p.editor.forcedHighContrastMode){g=c.add(g,"canvas",{width:16,height:16,"aria-hidden":"true"});if(g.getContext&&(f=g.getContext("2d"))){f.fillStyle="#"+i;f.fillRect(0,0,16,16)}else{c.remove(g)}}});if(q.more_colors_func){g=c.add(j,"tr");g=c.add(g,"td",{colspan:q.grid_width,"class":"mceMoreColors"});g=c.add(g,"a",{role:"option",id:p.id+"_more",href:"javascript:;",onclick:"return false;","class":"mceMoreColors"},q.more_colors_title);a.add(g,"click",function(i){q.more_colors_func.call(q.more_colors_scope||this);return a.cancel(i)})}c.addClass(h,"mceColorSplitMenu");new d.ui.KeyboardNavigation({root:p.id+"_menu",items:c.select("a",p.id+"_menu"),onCancel:function(){p.hideMenu();p.focus()}});a.add(p.id+"_menu","mousedown",function(i){return a.cancel(i)});a.add(p.id+"_menu","click",function(i){var m;i=c.getParent(i.target,"a",j);if(i&&i.nodeName.toLowerCase()=="a"&&(m=i.getAttribute("data-mce-color"))){p.setColor(m)}return a.cancel(i)});return o},setColor:function(f){this.displayColor(f);this.hideMenu();this.settings.onselect(f)},displayColor:function(g){var f=this;c.setStyle(f.id+"_preview","backgroundColor",g);f.value=g},postRender:function(){var f=this,g=f.id;f.parent();c.add(g+"_action","div",{id:g+"_preview","class":"mceColorPreview"});c.setStyle(f.id+"_preview","backgroundColor",f.value)},destroy:function(){this.parent();a.clear(this.id+"_menu");a.clear(this.id+"_more");c.remove(this.id+"_menu")}})})(tinymce);(function(b){var d=b.DOM,c=b.each,a=b.dom.Event;b.create("tinymce.ui.ToolbarGroup:tinymce.ui.Container",{renderHTML:function(){var f=this,i=[],e=f.controls,j=b.each,g=f.settings;i.push('<div id="'+f.id+'" role="group" aria-labelledby="'+f.id+'_voice">');i.push("<span role='application'>");i.push('<span id="'+f.id+'_voice" class="mceVoiceLabel" style="display:none;">'+d.encode(g.name)+"</span>");j(e,function(h){i.push(h.renderHTML())});i.push("</span>");i.push("</div>");return i.join("")},focus:function(){this.keyNav.focus()},postRender:function(){var f=this,e=[];c(f.controls,function(g){c(g.controls,function(h){if(h.id){e.push(h)}})});f.keyNav=new b.ui.KeyboardNavigation({root:f.id,items:e,onCancel:function(){f.editor.focus()},excludeFromTabOrder:!f.settings.tab_focus_toolbar})},destroy:function(){var e=this;e.parent();e.keyNav.destroy();a.clear(e.id)}})})(tinymce);(function(a){var c=a.DOM,b=a.each;a.create("tinymce.ui.Toolbar:tinymce.ui.Container",{renderHTML:function(){var m=this,f="",j,k,n=m.settings,e,d,g,l;l=m.controls;for(e=0;e<l.length;e++){k=l[e];d=l[e-1];g=l[e+1];if(e===0){j="mceToolbarStart";if(k.Button){j+=" mceToolbarStartButton"}else{if(k.SplitButton){j+=" mceToolbarStartSplitButton"}else{if(k.ListBox){j+=" mceToolbarStartListBox"}}}f+=c.createHTML("td",{"class":j},c.createHTML("span",null,"<!-- IE -->"))}if(d&&k.ListBox){if(d.Button||d.SplitButton){f+=c.createHTML("td",{"class":"mceToolbarEnd"},c.createHTML("span",null,"<!-- IE -->"))}}if(c.stdMode){f+='<td style="position: relative">'+k.renderHTML()+"</td>"}else{f+="<td>"+k.renderHTML()+"</td>"}if(g&&k.ListBox){if(g.Button||g.SplitButton){f+=c.createHTML("td",{"class":"mceToolbarStart"},c.createHTML("span",null,"<!-- IE -->"))}}}j="mceToolbarEnd";if(k.Button){j+=" mceToolbarEndButton"}else{if(k.SplitButton){j+=" mceToolbarEndSplitButton"}else{if(k.ListBox){j+=" mceToolbarEndListBox"}}}f+=c.createHTML("td",{"class":j},c.createHTML("span",null,"<!-- IE -->"));return c.createHTML("table",{id:m.id,"class":"mceToolbar"+(n["class"]?" "+n["class"]:""),cellpadding:"0",cellspacing:"0",align:m.settings.align||"",role:"presentation",tabindex:"-1"},"<tbody><tr>"+f+"</tr></tbody>")}})})(tinymce);(function(b){var a=b.util.Dispatcher,c=b.each;b.create("tinymce.AddOnManager",{AddOnManager:function(){var d=this;d.items=[];d.urls={};d.lookup={};d.onAdd=new a(d)},get:function(d){return this.lookup[d]},requireLangPack:function(e){var d=b.settings;if(d&&d.language&&d.language_load!==false){b.ScriptLoader.add(this.urls[e]+"/langs/"+d.language+".js")}},add:function(e,d){this.items.push(d);this.lookup[e]=d;this.onAdd.dispatch(this,e,d);return d},load:function(h,e,d,g){var f=this;if(f.urls[h]){return}if(e.indexOf("/")!=0&&e.indexOf("://")==-1){e=b.baseURL+"/"+e}f.urls[h]=e.substring(0,e.lastIndexOf("/"));if(!f.lookup[h]){b.ScriptLoader.add(e,d,g)}}});b.PluginManager=new b.AddOnManager();b.ThemeManager=new b.AddOnManager()}(tinymce));(function(j){var g=j.each,d=j.extend,k=j.DOM,i=j.dom.Event,f=j.ThemeManager,b=j.PluginManager,e=j.explode,h=j.util.Dispatcher,a,c=0;j.documentBaseURL=window.location.href.replace(/[\?#].*$/,"").replace(/[\/\\][^\/]+$/,"");if(!/[\/\\]$/.test(j.documentBaseURL)){j.documentBaseURL+="/"}j.baseURL=new j.util.URI(j.documentBaseURL).toAbsolute(j.baseURL);j.baseURI=new j.util.URI(j.baseURL);j.onBeforeUnload=new h(j);i.add(window,"beforeunload",function(l){j.onBeforeUnload.dispatch(j,l)});j.onAddEditor=new h(j);j.onRemoveEditor=new h(j);j.EditorManager=d(j,{editors:[],i18n:{},activeEditor:null,init:function(q){var n=this,p,l=j.ScriptLoader,u,o=[],m;function r(x,y,t){var v=x[y];if(!v){return}if(j.is(v,"string")){t=v.replace(/\.\w+$/,"");t=t?j.resolve(t):0;v=j.resolve(v)}return v.apply(t||this,Array.prototype.slice.call(arguments,2))}q=d({theme:"simple",language:"en"},q);n.settings=q;i.add(document,"init",function(){var s,v;r(q,"onpageload");switch(q.mode){case"exact":s=q.elements||"";if(s.length>0){g(e(s),function(x){if(k.get(x)){m=new j.Editor(x,q);o.push(m);m.render(1)}else{g(document.forms,function(y){g(y.elements,function(z){if(z.name===x){x="mce_editor_"+c++;k.setAttrib(z,"id",x);m=new j.Editor(x,q);o.push(m);m.render(1)}})})}})}break;case"textareas":case"specific_textareas":function t(y,x){return x.constructor===RegExp?x.test(y.className):k.hasClass(y,x)}g(k.select("textarea"),function(x){if(q.editor_deselector&&t(x,q.editor_deselector)){return}if(!q.editor_selector||t(x,q.editor_selector)){u=k.get(x.name);if(!x.id&&!u){x.id=x.name}if(!x.id||n.get(x.id)){x.id=k.uniqueId()}m=new j.Editor(x.id,q);o.push(m);m.render(1)}});break}if(q.oninit){s=v=0;g(o,function(x){v++;if(!x.initialized){x.onInit.add(function(){s++;if(s==v){r(q,"oninit")}})}else{s++}if(s==v){r(q,"oninit")}})}})},get:function(l){if(l===a){return this.editors}return this.editors[l]},getInstanceById:function(l){return this.get(l)},add:function(m){var l=this,n=l.editors;n[m.id]=m;n.push(m);l._setActive(m);l.onAddEditor.dispatch(l,m);return m},remove:function(n){var m=this,l,o=m.editors;if(!o[n.id]){return null}delete o[n.id];for(l=0;l<o.length;l++){if(o[l]==n){o.splice(l,1);break}}if(m.activeEditor==n){m._setActive(o[0])}n.destroy();m.onRemoveEditor.dispatch(m,n);return n},execCommand:function(r,p,o){var q=this,n=q.get(o),l;switch(r){case"mceFocus":n.focus();return true;case"mceAddEditor":case"mceAddControl":if(!q.get(o)){new j.Editor(o,q.settings).render()}return true;case"mceAddFrameControl":l=o.window;l.tinyMCE=tinyMCE;l.tinymce=j;j.DOM.doc=l.document;j.DOM.win=l;n=new j.Editor(o.element_id,o);n.render();if(j.isIE){function m(){n.destroy();l.detachEvent("onunload",m);l=l.tinyMCE=l.tinymce=null}l.attachEvent("onunload",m)}o.page_window=null;return true;case"mceRemoveEditor":case"mceRemoveControl":if(n){n.remove()}return true;case"mceToggleEditor":if(!n){q.execCommand("mceAddControl",0,o);return true}if(n.isHidden()){n.show()}else{n.hide()}return true}if(q.activeEditor){return q.activeEditor.execCommand(r,p,o)}return false},execInstanceCommand:function(p,o,n,m){var l=this.get(p);if(l){return l.execCommand(o,n,m)}return false},triggerSave:function(){g(this.editors,function(l){l.save()})},addI18n:function(n,q){var l,m=this.i18n;if(!j.is(n,"string")){g(n,function(r,p){g(r,function(t,s){g(t,function(v,u){if(s==="common"){m[p+"."+u]=v}else{m[p+"."+s+"."+u]=v}})})})}else{g(q,function(r,p){m[n+"."+p]=r})}},_setActive:function(l){this.selectedInstance=this.activeEditor=l}})})(tinymce);(function(m){var n=m.DOM,j=m.dom.Event,f=m.extend,k=m.util.Dispatcher,i=m.each,a=m.isGecko,b=m.isIE,e=m.isWebKit,d=m.is,h=m.ThemeManager,c=m.PluginManager,o=m.inArray,l=m.grep,g=m.explode;m.create("tinymce.Editor",{Editor:function(r,q){var p=this;p.id=p.editorId=r;p.execCommands={};p.queryStateCommands={};p.queryValueCommands={};p.isNotDirty=false;p.plugins={};i(["onPreInit","onBeforeRenderUI","onPostRender","onInit","onRemove","onActivate","onDeactivate","onClick","onEvent","onMouseUp","onMouseDown","onDblClick","onKeyDown","onKeyUp","onKeyPress","onContextMenu","onSubmit","onReset","onPaste","onPreProcess","onPostProcess","onBeforeSetContent","onBeforeGetContent","onSetContent","onGetContent","onLoadContent","onSaveContent","onNodeChange","onChange","onBeforeExecCommand","onExecCommand","onUndo","onRedo","onVisualAid","onSetProgressState"],function(s){p[s]=new k(p)});p.settings=q=f({id:r,language:"en",docs_language:"en",theme:"simple",skin:"default",delta_width:0,delta_height:0,popup_css:"",plugins:"",document_base_url:m.documentBaseURL,add_form_submit_trigger:1,submit_patch:1,add_unload_trigger:1,convert_urls:1,relative_urls:1,remove_script_host:1,table_inline_editing:0,object_resizing:1,cleanup:1,accessibility_focus:1,custom_shortcuts:1,custom_undo_redo_keyboard_shortcuts:1,custom_undo_redo_restore_selection:1,custom_undo_redo:1,doctype:m.isIE6?'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">':"<!DOCTYPE>",visual_table_class:"mceItemTable",visual:1,font_size_style_values:"xx-small,x-small,small,medium,large,x-large,xx-large",apply_source_formatting:1,directionality:"ltr",forced_root_block:"p",hidden_input:1,padd_empty_editor:1,render_ui:1,init_theme:1,force_p_newlines:1,indentation:"30px",keep_styles:1,fix_table_elements:1,inline_styles:1,convert_fonts_to_spans:true,indent:"simple",indent_before:"p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,ul,li,area,table,thead,tfoot,tbody,tr",indent_after:"p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,ul,li,area,table,thead,tfoot,tbody,tr",validate:true,entity_encoding:"named",url_converter:p.convertURL,url_converter_scope:p,ie7_compat:true},q);p.documentBaseURI=new m.util.URI(q.document_base_url||m.documentBaseURL,{base_uri:tinyMCE.baseURI});p.baseURI=m.baseURI;p.contentCSS=[];p.execCallback("setup",p)},render:function(r){var u=this,v=u.settings,x=u.id,p=m.ScriptLoader;if(!j.domLoaded){j.add(document,"init",function(){u.render()});return}tinyMCE.settings=v;if(!u.getElement()){return}if(m.isIDevice){return}if(!/TEXTAREA|INPUT/i.test(u.getElement().nodeName)&&v.hidden_input&&n.getParent(x,"form")){n.insertAfter(n.create("input",{type:"hidden",name:x}),x)}if(m.WindowManager){u.windowManager=new m.WindowManager(u)}if(v.encoding=="xml"){u.onGetContent.add(function(s,t){if(t.save){t.content=n.encode(t.content)}})}if(v.add_form_submit_trigger){u.onSubmit.addToTop(function(){if(u.initialized){u.save();u.isNotDirty=1}})}if(v.add_unload_trigger){u._beforeUnload=tinyMCE.onBeforeUnload.add(function(){if(u.initialized&&!u.destroyed&&!u.isHidden()){u.save({format:"raw",no_events:true})}})}m.addUnload(u.destroy,u);if(v.submit_patch){u.onBeforeRenderUI.add(function(){var s=u.getElement().form;if(!s){return}if(s._mceOldSubmit){return}if(!s.submit.nodeType&&!s.submit.length){u.formElement=s;s._mceOldSubmit=s.submit;s.submit=function(){m.triggerSave();u.isNotDirty=1;return u.formElement._mceOldSubmit(u.formElement)}}s=null})}function q(){if(v.language&&v.language_load!==false){p.add(m.baseURL+"/langs/"+v.language+".js")}if(v.theme&&v.theme.charAt(0)!="-"&&!h.urls[v.theme]){h.load(v.theme,"themes/"+v.theme+"/editor_template"+m.suffix+".js")}i(g(v.plugins),function(s){if(s&&s.charAt(0)!="-"&&!c.urls[s]){if(s=="safari"){return}c.load(s,"plugins/"+s+"/editor_plugin"+m.suffix+".js")}});p.loadQueue(function(){if(!u.removed){u.init()}})}q()},init:function(){var r,F=this,G=F.settings,C,z,B=F.getElement(),q,p,D,x,A,E,y;m.add(F);G.aria_label=G.aria_label||n.getAttrib(B,"aria-label",F.getLang("aria.rich_text_area"));if(G.theme){G.theme=G.theme.replace(/-/,"");q=h.get(G.theme);F.theme=new q();if(F.theme.init&&G.init_theme){F.theme.init(F,h.urls[G.theme]||m.documentBaseURL.replace(/\/$/,""))}}i(g(G.plugins.replace(/\-/g,"")),function(H){var I=c.get(H),t=c.urls[H]||m.documentBaseURL.replace(/\/$/,""),s;if(I){s=new I(F,t);F.plugins[H]=s;if(s.init){s.init(F,t)}}});if(G.popup_css!==false){if(G.popup_css){G.popup_css=F.documentBaseURI.toAbsolute(G.popup_css)}else{G.popup_css=F.baseURI.toAbsolute("themes/"+G.theme+"/skins/"+G.skin+"/dialog.css")}}if(G.popup_css_add){G.popup_css+=","+F.documentBaseURI.toAbsolute(G.popup_css_add)}F.controlManager=new m.ControlManager(F);if(G.custom_undo_redo){F.onExecCommand.add(function(t,H,u,I,s){if(H!="Undo"&&H!="Redo"&&H!="mceRepaint"&&(!s||!s.skip_undo)){F.undoManager.add()}})}F.onExecCommand.add(function(s,t){if(!/^(FontName|FontSize)$/.test(t)){F.nodeChanged()}});if(a){function v(s,t){if(!t||!t.initial){F.execCommand("mceRepaint")}}F.onUndo.add(v);F.onRedo.add(v);F.onSetContent.add(v)}F.onBeforeRenderUI.dispatch(F,F.controlManager);if(G.render_ui){C=G.width||B.style.width||B.offsetWidth;z=G.height||B.style.height||B.offsetHeight;F.orgDisplay=B.style.display;E=/^[0-9\.]+(|px)$/i;if(E.test(""+C)){C=Math.max(parseInt(C)+(q.deltaWidth||0),100)}if(E.test(""+z)){z=Math.max(parseInt(z)+(q.deltaHeight||0),100)}q=F.theme.renderUI({targetNode:B,width:C,height:z,deltaWidth:G.delta_width,deltaHeight:G.delta_height});F.editorContainer=q.editorContainer}if(document.domain&&location.hostname!=document.domain){m.relaxedDomain=document.domain}n.setStyles(q.sizeContainer||q.editorContainer,{width:C,height:z});if(G.content_css){m.each(g(G.content_css),function(s){F.contentCSS.push(F.documentBaseURI.toAbsolute(s))})}z=(q.iframeHeight||z)+(typeof(z)=="number"?(q.deltaHeight||0):"");if(z<100){z=100}F.iframeHTML=G.doctype+'<html><head xmlns="http://www.w3.org/1999/xhtml">';if(G.document_base_url!=m.documentBaseURL){F.iframeHTML+='<base href="'+F.documentBaseURI.getURI()+'" />'}if(G.ie7_compat){F.iframeHTML+='<meta http-equiv="X-UA-Compatible" content="IE=7" />'}else{F.iframeHTML+='<meta http-equiv="X-UA-Compatible" content="IE=edge" />'}F.iframeHTML+='<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />';if(!a||!/Firefox\/2/.test(navigator.userAgent)){for(y=0;y<F.contentCSS.length;y++){F.iframeHTML+='<link type="text/css" rel="stylesheet" href="'+F.contentCSS[y]+'" />'}F.contentCSS=[]}x=G.body_id||"tinymce";if(x.indexOf("=")!=-1){x=F.getParam("body_id","","hash");x=x[F.id]||x}A=G.body_class||"";if(A.indexOf("=")!=-1){A=F.getParam("body_class","","hash");A=A[F.id]||""}F.iframeHTML+='</head><body id="'+x+'" class="mceContentBody '+A+'"></body></html>';if(m.relaxedDomain&&(b||(m.isOpera&&parseFloat(opera.version())<11))){D='javascript:(function(){document.open();document.domain="'+document.domain+'";var ed = window.parent.tinyMCE.get("'+F.id+'");document.write(ed.iframeHTML);document.close();ed.setupIframe();})()'}r=n.add(q.iframeContainer,"iframe",{id:F.id+"_ifr",src:D||'javascript:""',frameBorder:"0",title:G.aria_label,style:{width:"100%",height:z}});F.contentAreaContainer=q.iframeContainer;n.get(q.editorContainer).style.display=F.orgDisplay;n.get(F.id).style.display="none";n.setAttrib(F.id,"aria-hidden",true);if(!m.relaxedDomain||!D){F.setupIframe()}B=r=q=null},setupIframe:function(){var r=this,x=r.settings,y=n.get(r.id),z=r.getDoc(),v,p;if(!b||!m.relaxedDomain){z.open();z.write(r.iframeHTML);z.close();if(m.relaxedDomain){z.domain=m.relaxedDomain}}if(!b){try{if(!x.readonly){z.designMode="On"}}catch(q){}}if(b){p=r.getBody();n.hide(p);if(!x.readonly){p.contentEditable=true}n.show(p)}r.schema=new m.html.Schema(x);r.dom=new m.dom.DOMUtils(r.getDoc(),{keep_values:true,url_converter:r.convertURL,url_converter_scope:r,hex_colors:x.force_hex_style_colors,class_filter:x.class_filter,update_styles:1,fix_ie_paragraphs:1,schema:r.schema});r.parser=new m.html.DomParser(x,r.schema);r.parser.addAttributeFilter("name",function(s,t){var B=s.length,D,A,C,E;while(B--){E=s[B];if(E.name==="a"&&E.firstChild){C=E.parent;D=E.lastChild;do{A=D.prev;C.insert(D,E);D=A}while(D)}}});r.parser.addAttributeFilter("src,href,style",function(s,t){var A=s.length,B,D=r.dom,C;while(A--){B=s[A];C=B.attr(t);if(t==="style"){B.attr("data-mce-style",D.serializeStyle(D.parseStyle(C),B.name))}else{B.attr("data-mce-"+t,r.convertURL(C,t,B.name))}}});r.parser.addNodeFilter("script",function(s,t){var A=s.length;while(A--){s[A].attr("type","mce-text/javascript")}});r.parser.addNodeFilter("#cdata",function(s,t){var A=s.length,B;while(A--){B=s[A];B.type=8;B.name="#comment";B.value="[CDATA["+B.value+"]]"}});r.parser.addNodeFilter("p,h1,h2,h3,h4,h5,h6,div",function(t,A){var B=t.length,C,s=r.schema.getNonEmptyElements();while(B--){C=t[B];if(C.isEmpty(s)){C.empty().append(new m.html.Node("br",1)).shortEnded=true}}});r.serializer=new m.dom.Serializer(x,r.dom,r.schema);r.selection=new m.dom.Selection(r.dom,r.getWin(),r.serializer);r.formatter=new m.Formatter(this);r.formatter.register({alignleft:[{selector:"p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li",styles:{textAlign:"left"}},{selector:"img,table",collapsed:false,styles:{"float":"left"}}],aligncenter:[{selector:"p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li",styles:{textAlign:"center"}},{selector:"img",collapsed:false,styles:{display:"block",marginLeft:"auto",marginRight:"auto"}},{selector:"table",collapsed:false,styles:{marginLeft:"auto",marginRight:"auto"}}],alignright:[{selector:"p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li",styles:{textAlign:"right"}},{selector:"img,table",collapsed:false,styles:{"float":"right"}}],alignfull:[{selector:"p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li",styles:{textAlign:"justify"}}],bold:[{inline:"strong",remove:"all"},{inline:"span",styles:{fontWeight:"bold"}},{inline:"b",remove:"all"}],italic:[{inline:"em",remove:"all"},{inline:"span",styles:{fontStyle:"italic"}},{inline:"i",remove:"all"}],underline:[{inline:"span",styles:{textDecoration:"underline"},exact:true},{inline:"u",remove:"all"}],strikethrough:[{inline:"span",styles:{textDecoration:"line-through"},exact:true},{inline:"strike",remove:"all"}],forecolor:{inline:"span",styles:{color:"%value"},wrap_links:false},hilitecolor:{inline:"span",styles:{backgroundColor:"%value"},wrap_links:false},fontname:{inline:"span",styles:{fontFamily:"%value"}},fontsize:{inline:"span",styles:{fontSize:"%value"}},fontsize_class:{inline:"span",attributes:{"class":"%value"}},blockquote:{block:"blockquote",wrapper:1,remove:"all"},removeformat:[{selector:"b,strong,em,i,font,u,strike",remove:"all",split:true,expand:false,block_expand:true,deep:true},{selector:"span",attributes:["style","class"],remove:"empty",split:true,expand:false,deep:true},{selector:"*",attributes:["style","class"],split:false,expand:false,deep:true}]});i("p h1 h2 h3 h4 h5 h6 div address pre div code dt dd samp".split(/\s/),function(s){r.formatter.register(s,{block:s,remove:"all"})});r.formatter.register(r.settings.formats);r.undoManager=new m.UndoManager(r);r.undoManager.onAdd.add(function(t,s){if(!s.initial){return r.onChange.dispatch(r,s,t)}});r.undoManager.onUndo.add(function(t,s){return r.onUndo.dispatch(r,s,t)});r.undoManager.onRedo.add(function(t,s){return r.onRedo.dispatch(r,s,t)});r.forceBlocks=new m.ForceBlocks(r,{forced_root_block:x.forced_root_block});r.editorCommands=new m.EditorCommands(r);r.serializer.onPreProcess.add(function(s,t){return r.onPreProcess.dispatch(r,t,s)});r.serializer.onPostProcess.add(function(s,t){return r.onPostProcess.dispatch(r,t,s)});r.onPreInit.dispatch(r);if(!x.gecko_spellcheck){r.getBody().spellcheck=0}if(!x.readonly){r._addEvents()}r.controlManager.onPostRender.dispatch(r,r.controlManager);r.onPostRender.dispatch(r);if(x.directionality){r.getBody().dir=x.directionality}if(x.nowrap){r.getBody().style.whiteSpace="nowrap"}if(x.handle_node_change_callback){r.onNodeChange.add(function(t,s,A){r.execCallback("handle_node_change_callback",r.id,A,-1,-1,true,r.selection.isCollapsed())})}if(x.save_callback){r.onSaveContent.add(function(s,A){var t=r.execCallback("save_callback",r.id,A.content,r.getBody());if(t){A.content=t}})}if(x.onchange_callback){r.onChange.add(function(t,s){r.execCallback("onchange_callback",r,s)})}if(x.protect){r.onBeforeSetContent.add(function(s,t){if(x.protect){i(x.protect,function(A){t.content=t.content.replace(A,function(B){return"<!--mce:protected "+escape(B)+"-->"})})}})}if(x.convert_newlines_to_brs){r.onBeforeSetContent.add(function(s,t){if(t.initial){t.content=t.content.replace(/\r?\n/g,"<br />")}})}if(x.preformatted){r.onPostProcess.add(function(s,t){t.content=t.content.replace(/^\s*<pre.*?>/,"");t.content=t.content.replace(/<\/pre>\s*$/,"");if(t.set){t.content='<pre class="mceItemHidden">'+t.content+"</pre>"}})}if(x.verify_css_classes){r.serializer.attribValueFilter=function(C,A){var B,t;if(C=="class"){if(!r.classesRE){t=r.dom.getClasses();if(t.length>0){B="";i(t,function(s){B+=(B?"|":"")+s["class"]});r.classesRE=new RegExp("("+B+")","gi")}}return !r.classesRE||/(\bmceItem\w+\b|\bmceTemp\w+\b)/g.test(A)||r.classesRE.test(A)?A:""}return A}}if(x.cleanup_callback){r.onBeforeSetContent.add(function(s,t){t.content=r.execCallback("cleanup_callback","insert_to_editor",t.content,t)});r.onPreProcess.add(function(s,t){if(t.set){r.execCallback("cleanup_callback","insert_to_editor_dom",t.node,t)}if(t.get){r.execCallback("cleanup_callback","get_from_editor_dom",t.node,t)}});r.onPostProcess.add(function(s,t){if(t.set){t.content=r.execCallback("cleanup_callback","insert_to_editor",t.content,t)}if(t.get){t.content=r.execCallback("cleanup_callback","get_from_editor",t.content,t)}})}if(x.save_callback){r.onGetContent.add(function(s,t){if(t.save){t.content=r.execCallback("save_callback",r.id,t.content,r.getBody())}})}if(x.handle_event_callback){r.onEvent.add(function(s,t,A){if(r.execCallback("handle_event_callback",t,s,A)===false){j.cancel(t)}})}r.onSetContent.add(function(){r.addVisual(r.getBody())});if(x.padd_empty_editor){r.onPostProcess.add(function(s,t){t.content=t.content.replace(/^(<p[^>]*>(&nbsp;|&#160;|\s|\u00a0|)<\/p>[\r\n]*|<br \/>[\r\n]*)$/,"")})}if(a){function u(s,t){i(s.dom.select("a"),function(B){var A=B.parentNode;if(s.dom.isBlock(A)&&A.lastChild===B){s.dom.add(A,"br",{"data-mce-bogus":1})}})}r.onExecCommand.add(function(s,t){if(t==="CreateLink"){u(s)}});r.onSetContent.add(r.selection.onSetContent.add(u));if(!x.readonly){try{z.designMode="Off";z.designMode="On"}catch(q){}}}setTimeout(function(){if(r.removed){return}r.load({initial:true,format:"html"});r.startContent=r.getContent({format:"raw"});r.undoManager.add();r.initialized=true;r.onInit.dispatch(r);r.execCallback("setupcontent_callback",r.id,r.getBody(),r.getDoc());r.execCallback("init_instance_callback",r);r.focus(true);r.nodeChanged({initial:1});i(r.contentCSS,function(s){r.dom.loadCSS(s)});if(x.auto_focus){setTimeout(function(){var s=m.get(x.auto_focus);s.selection.select(s.getBody(),1);s.selection.collapse(1);s.getWin().focus()},100)}},1);y=null},focus:function(s){var x,q=this,v=q.settings.content_editable,r,p,u=q.getDoc();if(!s){r=q.selection.getRng();if(r.item){p=r.item(0)}if(!v){q.getWin().focus()}if(p&&p.ownerDocument==u){r=u.body.createControlRange();r.addElement(p);r.select()}}if(m.activeEditor!=q){if((x=m.activeEditor)!=null){x.onDeactivate.dispatch(x,q)}q.onActivate.dispatch(q,x)}m._setActive(q)},execCallback:function(u){var p=this,r=p.settings[u],q;if(!r){return}if(p.callbackLookup&&(q=p.callbackLookup[u])){r=q.func;q=q.scope}if(d(r,"string")){q=r.replace(/\.\w+$/,"");q=q?m.resolve(q):0;r=m.resolve(r);p.callbackLookup=p.callbackLookup||{};p.callbackLookup[u]={func:r,scope:q}}return r.apply(q||p,Array.prototype.slice.call(arguments,1))},translate:function(p){var r=this.settings.language||"en",q=m.i18n;if(!p){return""}return q[r+"."+p]||p.replace(/{\#([^}]+)\}/g,function(t,s){return q[r+"."+s]||"{#"+s+"}"})},getLang:function(q,p){return m.i18n[(this.settings.language||"en")+"."+q]||(d(p)?p:"{#"+q+"}")},getParam:function(u,r,p){var s=m.trim,q=d(this.settings[u])?this.settings[u]:r,t;if(p==="hash"){t={};if(d(q,"string")){i(q.indexOf("=")>0?q.split(/[;,](?![^=;,]*(?:[;,]|$))/):q.split(","),function(x){x=x.split("=");if(x.length>1){t[s(x[0])]=s(x[1])}else{t[s(x[0])]=s(x)}})}else{t=q}return t}return q},nodeChanged:function(r){var p=this,q=p.selection,u=(b?q.getNode():q.getStart())||p.getBody();if(p.initialized){r=r||{};u=b&&u.ownerDocument!=p.getDoc()?p.getBody():u;r.parents=[];p.dom.getParent(u,function(s){if(s.nodeName=="BODY"){return true}r.parents.push(s)});p.onNodeChange.dispatch(p,r?r.controlManager||p.controlManager:p.controlManager,u,q.isCollapsed(),r)}},addButton:function(r,q){var p=this;p.buttons=p.buttons||{};p.buttons[r]=q},addCommand:function(p,r,q){this.execCommands[p]={func:r,scope:q||this}},addQueryStateHandler:function(p,r,q){this.queryStateCommands[p]={func:r,scope:q||this}},addQueryValueHandler:function(p,r,q){this.queryValueCommands[p]={func:r,scope:q||this}},addShortcut:function(r,u,p,s){var q=this,v;if(!q.settings.custom_shortcuts){return false}q.shortcuts=q.shortcuts||{};if(d(p,"string")){v=p;p=function(){q.execCommand(v,false,null)}}if(d(p,"object")){v=p;p=function(){q.execCommand(v[0],v[1],v[2])}}i(g(r),function(t){var x={func:p,scope:s||this,desc:u,alt:false,ctrl:false,shift:false};i(g(t,"+"),function(y){switch(y){case"alt":case"ctrl":case"shift":x[y]=true;break;default:x.charCode=y.charCodeAt(0);x.keyCode=y.toUpperCase().charCodeAt(0)}});q.shortcuts[(x.ctrl?"ctrl":"")+","+(x.alt?"alt":"")+","+(x.shift?"shift":"")+","+x.keyCode]=x});return true},execCommand:function(x,v,z,p){var r=this,u=0,y,q;if(!/^(mceAddUndoLevel|mceEndUndoLevel|mceBeginUndoLevel|mceRepaint|SelectAll)$/.test(x)&&(!p||!p.skip_focus)){r.focus()}y={};r.onBeforeExecCommand.dispatch(r,x,v,z,y);if(y.terminate){return false}if(r.execCallback("execcommand_callback",r.id,r.selection.getNode(),x,v,z)){r.onExecCommand.dispatch(r,x,v,z,p);return true}if(y=r.execCommands[x]){q=y.func.call(y.scope,v,z);if(q!==true){r.onExecCommand.dispatch(r,x,v,z,p);return q}}i(r.plugins,function(s){if(s.execCommand&&s.execCommand(x,v,z)){r.onExecCommand.dispatch(r,x,v,z,p);u=1;return false}});if(u){return true}if(r.theme&&r.theme.execCommand&&r.theme.execCommand(x,v,z)){r.onExecCommand.dispatch(r,x,v,z,p);return true}if(r.editorCommands.execCommand(x,v,z)){r.onExecCommand.dispatch(r,x,v,z,p);return true}r.getDoc().execCommand(x,v,z);r.onExecCommand.dispatch(r,x,v,z,p)},queryCommandState:function(u){var q=this,v,r;if(q._isHidden()){return}if(v=q.queryStateCommands[u]){r=v.func.call(v.scope);if(r!==true){return r}}v=q.editorCommands.queryCommandState(u);if(v!==-1){return v}try{return this.getDoc().queryCommandState(u)}catch(p){}},queryCommandValue:function(v){var q=this,u,r;if(q._isHidden()){return}if(u=q.queryValueCommands[v]){r=u.func.call(u.scope);if(r!==true){return r}}u=q.editorCommands.queryCommandValue(v);if(d(u)){return u}try{return this.getDoc().queryCommandValue(v)}catch(p){}},show:function(){var p=this;n.show(p.getContainer());n.hide(p.id);p.load()},hide:function(){var p=this,q=p.getDoc();if(b&&q){q.execCommand("SelectAll")}p.save();n.hide(p.getContainer());n.setStyle(p.id,"display",p.orgDisplay)},isHidden:function(){return !n.isHidden(this.id)},setProgressState:function(p,q,r){this.onSetProgressState.dispatch(this,p,q,r);return p},load:function(s){var p=this,r=p.getElement(),q;if(r){s=s||{};s.load=true;q=p.setContent(d(r.value)?r.value:r.innerHTML,s);s.element=r;if(!s.no_events){p.onLoadContent.dispatch(p,s)}s.element=r=null;return q}},save:function(u){var p=this,s=p.getElement(),q,r;if(!s||!p.initialized){return}u=u||{};u.save=true;if(!u.no_events){p.undoManager.typing=false;p.undoManager.add()}u.element=s;q=u.content=p.getContent(u);if(!u.no_events){p.onSaveContent.dispatch(p,u)}q=u.content;if(!/TEXTAREA|INPUT/i.test(s.nodeName)){s.innerHTML=q;if(r=n.getParent(p.id,"form")){i(r.elements,function(t){if(t.name==p.id){t.value=q;return false}})}}else{s.value=q}u.element=s=null;return q},setContent:function(t,s){var r=this,q,p=r.getBody();s=s||{};s.format=s.format||"html";s.set=true;s.content=t;if(!s.no_events){r.onBeforeSetContent.dispatch(r,s)}if(!m.isIE&&(t.length===0||/^\s+$/.test(t))){p.innerHTML='<br data-mce-bogus="1" />';return}if(s.format!=="raw"){s.content=new m.html.Serializer({},r.schema).serialize(r.parser.parse(s.content))}p.innerHTML=m.trim(s.content);if(!s.no_events){r.onSetContent.dispatch(r,s)}return s.content},getContent:function(q){var p=this,r;q=q||{};q.format=q.format||"html";q.get=true;if(!q.no_events){p.onBeforeGetContent.dispatch(p,q)}if(q.format=="raw"){r=p.getBody().innerHTML}else{r=p.serializer.serialize(p.getBody(),q)}q.content=m.trim(r);if(!q.no_events){p.onGetContent.dispatch(p,q)}return q.content},isDirty:function(){var p=this;return m.trim(p.startContent)!=m.trim(p.getContent({format:"raw",no_events:1}))&&!p.isNotDirty},getContainer:function(){var p=this;if(!p.container){p.container=n.get(p.editorContainer||p.id+"_parent")}return p.container},getContentAreaContainer:function(){return this.contentAreaContainer},getElement:function(){return n.get(this.settings.content_element||this.id)},getWin:function(){var p=this,q;if(!p.contentWindow){q=n.get(p.id+"_ifr");if(q){p.contentWindow=q.contentWindow}}return p.contentWindow},getDoc:function(){var q=this,p;if(!q.contentDocument){p=q.getWin();if(p){q.contentDocument=p.document}}return q.contentDocument},getBody:function(){return this.bodyElement||this.getDoc().body},convertURL:function(p,x,v){var q=this,r=q.settings;if(r.urlconverter_callback){return q.execCallback("urlconverter_callback",p,v,true,x)}if(!r.convert_urls||(v&&v.nodeName=="LINK")||p.indexOf("file:")===0){return p}if(r.relative_urls){return q.documentBaseURI.toRelative(p)}p=q.documentBaseURI.toAbsolute(p,r.remove_script_host);return p},addVisual:function(r){var p=this,q=p.settings;r=r||p.getBody();if(!d(p.hasVisual)){p.hasVisual=q.visual}i(p.dom.select("table,a",r),function(t){var s;switch(t.nodeName){case"TABLE":s=p.dom.getAttrib(t,"border");if(!s||s=="0"){if(p.hasVisual){p.dom.addClass(t,q.visual_table_class)}else{p.dom.removeClass(t,q.visual_table_class)}}return;case"A":s=p.dom.getAttrib(t,"name");if(s){if(p.hasVisual){p.dom.addClass(t,"mceItemAnchor")}else{p.dom.removeClass(t,"mceItemAnchor")}}return}});p.onVisualAid.dispatch(p,r,p.hasVisual)},remove:function(){var p=this,q=p.getContainer();p.removed=1;p.hide();p.execCallback("remove_instance_callback",p);p.onRemove.dispatch(p);p.onExecCommand.listeners=[];m.remove(p);n.remove(q)},destroy:function(q){var p=this;if(p.destroyed){return}if(!q){m.removeUnload(p.destroy);tinyMCE.onBeforeUnload.remove(p._beforeUnload);if(p.theme&&p.theme.destroy){p.theme.destroy()}p.controlManager.destroy();p.selection.destroy();p.dom.destroy();if(!p.settings.content_editable){j.clear(p.getWin());j.clear(p.getDoc())}j.clear(p.getBody());j.clear(p.formElement)}if(p.formElement){p.formElement.submit=p.formElement._mceOldSubmit;p.formElement._mceOldSubmit=null}p.contentAreaContainer=p.formElement=p.container=p.settings.content_element=p.bodyElement=p.contentDocument=p.contentWindow=null;if(p.selection){p.selection=p.selection.win=p.selection.dom=p.selection.dom.doc=null}p.destroyed=1},_addEvents:function(){var B=this,r,C=B.settings,q=B.dom,x={mouseup:"onMouseUp",mousedown:"onMouseDown",click:"onClick",keyup:"onKeyUp",keydown:"onKeyDown",keypress:"onKeyPress",submit:"onSubmit",reset:"onReset",contextmenu:"onContextMenu",dblclick:"onDblClick",paste:"onPaste"};function p(t,D){var s=t.type;if(B.removed){return}if(B.onEvent.dispatch(B,t,D)!==false){B[x[t.fakeType||t.type]].dispatch(B,t,D)}}i(x,function(t,s){switch(s){case"contextmenu":q.bind(B.getDoc(),s,p);break;case"paste":q.bind(B.getBody(),s,function(D){p(D)});break;case"submit":case"reset":q.bind(B.getElement().form||n.getParent(B.id,"form"),s,p);break;default:q.bind(C.content_editable?B.getBody():B.getDoc(),s,p)}});q.bind(C.content_editable?B.getBody():(a?B.getDoc():B.getWin()),"focus",function(s){B.focus(true)});if(m.isGecko){q.bind(B.getDoc(),"DOMNodeInserted",function(t){var s;t=t.target;if(t.nodeType===1&&t.nodeName==="IMG"&&(s=t.getAttribute("data-mce-src"))){t.src=B.documentBaseURI.toAbsolute(s)}})}if(a){function u(){var E=this,G=E.getDoc(),F=E.settings;if(a&&!F.readonly){if(E._isHidden()){try{if(!F.content_editable){G.designMode="On"}}catch(D){}}try{G.execCommand("styleWithCSS",0,false)}catch(D){if(!E._isHidden()){try{G.execCommand("useCSS",0,true)}catch(D){}}}if(!F.table_inline_editing){try{G.execCommand("enableInlineTableEditing",false,false)}catch(D){}}if(!F.object_resizing){try{G.execCommand("enableObjectResizing",false,false)}catch(D){}}}}B.onBeforeExecCommand.add(u);B.onMouseDown.add(u)}if(m.isWebKit){B.onClick.add(function(s,t){t=t.target;if(t.nodeName=="IMG"||(t.nodeName=="A"&&q.hasClass(t,"mceItemAnchor"))){B.selection.getSel().setBaseAndExtent(t,0,t,1);B.nodeChanged()}})}B.onMouseUp.add(B.nodeChanged);B.onKeyUp.add(function(s,t){var D=t.keyCode;if((D>=33&&D<=36)||(D>=37&&D<=40)||D==13||D==45||D==46||D==8||(m.isMac&&(D==91||D==93))||t.ctrlKey){B.nodeChanged()}});B.onReset.add(function(){B.setContent(B.startContent,{format:"raw"})});if(C.custom_shortcuts){if(C.custom_undo_redo_keyboard_shortcuts){B.addShortcut("ctrl+z",B.getLang("undo_desc"),"Undo");B.addShortcut("ctrl+y",B.getLang("redo_desc"),"Redo")}B.addShortcut("ctrl+b",B.getLang("bold_desc"),"Bold");B.addShortcut("ctrl+i",B.getLang("italic_desc"),"Italic");B.addShortcut("ctrl+u",B.getLang("underline_desc"),"Underline");for(r=1;r<=6;r++){B.addShortcut("ctrl+"+r,"",["FormatBlock",false,"h"+r])}B.addShortcut("ctrl+7","",["FormatBlock",false,"<p>"]);B.addShortcut("ctrl+8","",["FormatBlock",false,"<div>"]);B.addShortcut("ctrl+9","",["FormatBlock",false,"<address>"]);function v(t){var s=null;if(!t.altKey&&!t.ctrlKey&&!t.metaKey){return s}i(B.shortcuts,function(D){if(m.isMac&&D.ctrl!=t.metaKey){return}else{if(!m.isMac&&D.ctrl!=t.ctrlKey){return}}if(D.alt!=t.altKey){return}if(D.shift!=t.shiftKey){return}if(t.keyCode==D.keyCode||(t.charCode&&t.charCode==D.charCode)){s=D;return false}});return s}B.onKeyUp.add(function(s,t){var D=v(t);if(D){return j.cancel(t)}});B.onKeyPress.add(function(s,t){var D=v(t);if(D){return j.cancel(t)}});B.onKeyDown.add(function(s,t){var D=v(t);if(D){D.func.call(D.scope);return j.cancel(t)}})}if(m.isIE){q.bind(B.getDoc(),"controlselect",function(D){var t=B.resizeInfo,s;D=D.target;if(D.nodeName!=="IMG"){return}if(t){q.unbind(t.node,t.ev,t.cb)}if(!q.hasClass(D,"mceItemNoResize")){ev="resizeend";s=q.bind(D,ev,function(F){var E;F=F.target;if(E=q.getStyle(F,"width")){q.setAttrib(F,"width",E.replace(/[^0-9%]+/g,""));q.setStyle(F,"width","")}if(E=q.getStyle(F,"height")){q.setAttrib(F,"height",E.replace(/[^0-9%]+/g,""));q.setStyle(F,"height","")}})}else{ev="resizestart";s=q.bind(D,"resizestart",j.cancel,j)}t=B.resizeInfo={node:D,ev:ev,cb:s}});B.onKeyDown.add(function(s,D){var t;switch(D.keyCode){case 8:t=B.getDoc().selection;if(t.createRange&&t.createRange().item){s.dom.remove(t.createRange().item(0));return j.cancel(D)}}})}if(m.isOpera){B.onClick.add(function(s,t){j.prevent(t)})}if(C.custom_undo_redo){function y(){B.undoManager.typing=false;B.undoManager.add()}q.bind(B.getDoc(),"focusout",function(s){if(!B.removed&&B.undoManager.typing){y()}});B.onKeyUp.add(function(t,F){var s,E,D;if(b&&F.keyCode==8){s=B.selection.getRng();if(s.parentElement){E=s.parentElement();D=B.selection.getBookmark();E.innerHTML=E.innerHTML;B.selection.moveToBookmark(D)}}if((F.keyCode>=33&&F.keyCode<=36)||(F.keyCode>=37&&F.keyCode<=40)||F.keyCode==13||F.keyCode==45||F.ctrlKey){y()}});B.onKeyDown.add(function(t,G){var s,F,E;if(b&&G.keyCode==46){s=B.selection.getRng();if(s.parentElement){F=s.parentElement();if(G.ctrlKey){s.moveEnd("word",1);s.select()}B.selection.getSel().clear();if(s.parentElement()==F){E=B.selection.getBookmark();try{F.innerHTML=F.innerHTML}catch(D){}B.selection.moveToBookmark(E)}G.preventDefault();return}}if((G.keyCode>=33&&G.keyCode<=36)||(G.keyCode>=37&&G.keyCode<=40)||G.keyCode==13||G.keyCode==45){if(B.undoManager.typing){y()}return}if(!B.undoManager.typing){B.undoManager.add();B.undoManager.typing=true}});B.onMouseDown.add(function(){if(B.undoManager.typing){y()}})}if(m.isGecko){function A(){B.undoManager.typing=false;B.undoManager.add();var s=B.dom.getAttribs(B.selection.getStart().cloneNode(false));return function(){var t=B.selection.getStart();B.dom.removeAllAttribs(t);i(s,function(D){t.setAttributeNode(D.cloneNode(true))});B.undoManager.typing=false;B.undoManager.add()}}function z(){var t=B.selection;return !t.isCollapsed()&&t.getStart()!=t.getEnd()}B.onKeyPress.add(function(s,D){if((D.keyCode==8||D.keyCode==46)&&z()){var t=A();B.getDoc().execCommand("delete",false,null);t();return j.cancel(D)}});B.dom.bind(B.getDoc(),"cut",function(t){if(z()){var s=A();B.onKeyUp.addToTop(j.cancel,j);setTimeout(function(){s();B.onKeyUp.remove(j.cancel,j)},0)}})}},_isHidden:function(){var p;if(!a){return 0}p=this.selection.getSel();return(!p||!p.rangeCount||p.rangeCount==0)}})})(tinymce);(function(c){var d=c.each,e,a=true,b=false;c.EditorCommands=function(n){var l=n.dom,p=n.selection,j={state:{},exec:{},value:{}},k=n.settings,o;function q(y,x,v){var u;y=y.toLowerCase();if(u=j.exec[y]){u(y,x,v);return a}return b}function m(v){var u;v=v.toLowerCase();if(u=j.state[v]){return u(v)}return -1}function h(v){var u;v=v.toLowerCase();if(u=j.value[v]){return u(v)}return b}function t(u,v){v=v||"exec";d(u,function(y,x){d(x.toLowerCase().split(","),function(z){j[v][z]=y})})}c.extend(this,{execCommand:q,queryCommandState:m,queryCommandValue:h,addCommands:t});function f(x,v,u){if(v===e){v=b}if(u===e){u=null}return n.getDoc().execCommand(x,v,u)}function s(u){return n.formatter.match(u)}function r(u,v){n.formatter.toggle(u,v?{value:v}:e)}function i(u){o=p.getBookmark(u)}function g(){p.moveToBookmark(o)}t({"mceResetDesignMode,mceBeginUndoLevel":function(){},"mceEndUndoLevel,mceAddUndoLevel":function(){n.undoManager.add()},"Cut,Copy,Paste":function(y){var x=n.getDoc(),u;try{f(y)}catch(v){u=a}if(u||!x.queryCommandSupported(y)){if(c.isGecko){n.windowManager.confirm(n.getLang("clipboard_msg"),function(z){if(z){open("http://www.mozilla.org/editor/midasdemo/securityprefs.html","_blank")}})}else{n.windowManager.alert(n.getLang("clipboard_no_support"))}}},unlink:function(u){if(p.isCollapsed()){p.select(p.getNode())}f(u);p.collapse(b)},"JustifyLeft,JustifyCenter,JustifyRight,JustifyFull":function(u){var v=u.substring(7);d("left,center,right,full".split(","),function(x){if(v!=x){n.formatter.remove("align"+x)}});r("align"+v);q("mceRepaint")},"InsertUnorderedList,InsertOrderedList":function(x){var u,v;f(x);u=l.getParent(p.getNode(),"ol,ul");if(u){v=u.parentNode;if(/^(H[1-6]|P|ADDRESS|PRE)$/.test(v.nodeName)){i();l.split(v,u);g()}}},"Bold,Italic,Underline,Strikethrough":function(u){r(u)},"ForeColor,HiliteColor,FontName":function(x,v,u){r(x,u)},FontSize:function(y,x,v){var u,z;if(v>=1&&v<=7){z=c.explode(k.font_size_style_values);u=c.explode(k.font_size_classes);if(u){v=u[v-1]||v}else{v=z[v-1]||v}}r(y,v)},RemoveFormat:function(u){n.formatter.remove(u)},mceBlockQuote:function(u){r("blockquote")},FormatBlock:function(x,v,u){return r(u||"p")},mceCleanup:function(){var u=p.getBookmark();n.setContent(n.getContent({cleanup:a}),{cleanup:a});p.moveToBookmark(u)},mceRemoveNode:function(y,x,v){var u=v||p.getNode();if(u!=n.getBody()){i();n.dom.remove(u,a);g()}},mceSelectNodeDepth:function(y,x,v){var u=0;l.getParent(p.getNode(),function(z){if(z.nodeType==1&&u++==v){p.select(z);return b}},n.getBody())},mceSelectNode:function(x,v,u){p.select(u)},mceInsertContent:function(z,D,E){var C,u,x,F,y,u,A,G,B;function v(H,J){var I,K=new c.dom.TreeWalker(H,J);while((I=K.current())){if((I.nodeType==3&&c.trim(I.nodeValue).length)||I.nodeName=="BR"||I.nodeName=="IMG"){return I}K.prev()}}B={content:E,format:"html"};p.onBeforeSetContent.dispatch(p,B);E=B.content;if(E.indexOf("{$caret}")==-1){E+="{$caret}"}p.setContent('<span id="__mce">\uFEFF</span>',{no_events:false});l.setOuterHTML("__mce",E.replace(/\{\$caret\}/,'<span data-mce-type="bookmark" id="__mce">\uFEFF</span>'));C=l.select("#__mce")[0];x=l.getRoot();if(C.previousSibling&&l.isBlock(C.previousSibling)||C.parentNode==x){y=v(C.previousSibling,x);if(y){if(y.nodeName=="BR"){y.parentNode.insertBefore(C,y)}else{l.insertAfter(C,y)}}}while(C){if(C===x){l.setOuterHTML(F,new c.html.Serializer({},n.schema).serialize(new c.html.DomParser({remove_trailing_brs:true},n.schema).parse(l.getOuterHTML(F))));break}F=C;C=C.parentNode}C=l.select("#__mce")[0];if(C){y=v(C.previousSibling,x);l.remove(C);if(y){u=l.createRng();if(y.nodeType==3){u.setStart(y,y.length);u.setEnd(y,y.length)}else{if(y.nodeName=="BR"){u.setStartBefore(y);u.setEndBefore(y)}else{u.setStartAfter(y);u.setEndAfter(y)}}p.setRng(u);if(!c.isIE){y=l.create("span",null,"\u00a0");u.insertNode(y);A=l.getRect(y);G=l.getViewPort(n.getWin());if((A.y>G.y+G.h||A.y<G.y)||(A.x>G.x+G.w||A.x<G.x)){n.getBody().scrollLeft=A.x;n.getBody().scrollTop=A.y}l.remove(y)}}}p.onSetContent.dispatch(p,B);n.addVisual()},mceInsertRawHTML:function(x,v,u){p.setContent("tiny_mce_marker");n.setContent(n.getContent().replace(/tiny_mce_marker/g,function(){return u}))},mceSetContent:function(x,v,u){n.setContent(u)},"Indent,Outdent":function(y){var v,u,x;v=k.indentation;u=/[a-z%]+$/i.exec(v);v=parseInt(v);if(!m("InsertUnorderedList")&&!m("InsertOrderedList")){d(p.getSelectedBlocks(),function(z){if(y=="outdent"){x=Math.max(0,parseInt(z.style.paddingLeft||0)-v);l.setStyle(z,"paddingLeft",x?x+u:"")}else{l.setStyle(z,"paddingLeft",(parseInt(z.style.paddingLeft||0)+v)+u)}})}else{f(y)}},mceRepaint:function(){var v;if(c.isGecko){try{i(a);if(p.getSel()){p.getSel().selectAllChildren(n.getBody())}p.collapse(a);g()}catch(u){}}},mceToggleFormat:function(x,v,u){n.formatter.toggle(u)},InsertHorizontalRule:function(){p.setContent("<hr />")},mceToggleVisualAid:function(){n.hasVisual=!n.hasVisual;n.addVisual()},mceReplaceContent:function(x,v,u){n.execCommand("mceInsertContent",false,p.setContent(u.replace(/\{\$selection\}/g,p.getContent({format:"text"}))))},mceInsertLink:function(A,z,y){var x=l.getParent(p.getNode(),"a"),v,u;if(c.is(y,"string")){y={href:y}}y.href=y.href.replace(" ","%20");if(!x){if(c.isWebKit){v=l.getParent(p.getNode(),"img");if(v){u=v.style.cssFloat;v.style.cssFloat=null}}f("CreateLink",b,"javascript:mctmp(0);");if(u){v.style.cssFloat=u}d(l.select("a[href='javascript:mctmp(0);']"),function(B){l.setAttribs(B,y)})}else{if(y.href){l.setAttribs(x,y)}else{n.dom.remove(x,a)}}},selectAll:function(){var v=l.getRoot(),u=l.createRng();u.setStart(v,0);u.setEnd(v,v.childNodes.length);n.selection.setRng(u)}});t({"JustifyLeft,JustifyCenter,JustifyRight,JustifyFull":function(u){return s("align"+u.substring(7))},"Bold,Italic,Underline,Strikethrough":function(u){return s(u)},mceBlockQuote:function(){return s("blockquote")},Outdent:function(){var u;if(k.inline_styles){if((u=l.getParent(p.getStart(),l.isBlock))&&parseInt(u.style.paddingLeft)>0){return a}if((u=l.getParent(p.getEnd(),l.isBlock))&&parseInt(u.style.paddingLeft)>0){return a}}return m("InsertUnorderedList")||m("InsertOrderedList")||(!k.inline_styles&&!!l.getParent(p.getNode(),"BLOCKQUOTE"))},"InsertUnorderedList,InsertOrderedList":function(u){return l.getParent(p.getNode(),u=="insertunorderedlist"?"UL":"OL")}},"state");t({"FontSize,FontName":function(x){var v=0,u;if(u=l.getParent(p.getNode(),"span")){if(x=="fontsize"){v=u.style.fontSize}else{v=u.style.fontFamily.replace(/, /g,",").replace(/[\'\"]/g,"").toLowerCase()}}return v}},"value");if(k.custom_undo_redo){t({Undo:function(){n.undoManager.undo()},Redo:function(){n.undoManager.redo()}})}}})(tinymce);(function(b){var a=b.util.Dispatcher;b.UndoManager=function(e){var c,d=0,g=[];function f(){return b.trim(e.getContent({format:"raw",no_events:1}))}return c={typing:false,onAdd:new a(c),onUndo:new a(c),onRedo:new a(c),add:function(l){var h,j=e.settings,k;l=l||{};l.content=f();k=g[d];if(k&&k.content==l.content){if(d>0||g.length==1){return null}}if(j.custom_undo_redo_levels){if(g.length>j.custom_undo_redo_levels){for(h=0;h<g.length-1;h++){g[h]=g[h+1]}g.length--;d=g.length}}l.bookmark=e.selection.getBookmark(2,true);if(d<g.length-1){g.length=d+1}g.push(l);d=g.length-1;c.onAdd.dispatch(c,l);e.isNotDirty=0;return l},undo:function(){var j,h;if(c.typing){c.add();c.typing=false}if(d>0){j=g[--d];e.setContent(j.content,{format:"raw"});e.selection.moveToBookmark(j.bookmark);c.onUndo.dispatch(c,j)}return j},redo:function(){var h;if(d<g.length-1){h=g[++d];e.setContent(h.content,{format:"raw"});e.selection.moveToBookmark(h.bookmark);c.onRedo.dispatch(c,h)}return h},clear:function(){g=[];d=0;c.typing=false},hasUndo:function(){return d>0||c.typing},hasRedo:function(){return d<g.length-1}}}})(tinymce);(function(m){var k=m.dom.Event,c=m.isIE,a=m.isGecko,b=m.isOpera,j=m.each,i=m.extend,d=true,h=false;function l(p){var q,o,n;do{if(/^(SPAN|STRONG|B|EM|I|FONT|STRIKE|U)$/.test(p.nodeName)){if(q){o=p.cloneNode(false);o.appendChild(q);q=o}else{q=n=p.cloneNode(false)}q.removeAttribute("id")}}while(p=p.parentNode);if(q){return{wrapper:q,inner:n}}}function g(o,p){var n=p.ownerDocument.createRange();n.setStart(o.endContainer,o.endOffset);n.setEndAfter(p);return n.cloneContents().textContent.length==0}function f(o){o=o.innerHTML;o=o.replace(/<(img|hr|table|input|select|textarea)[ \>]/gi,"-");o=o.replace(/<[^>]+>/g,"");return o.replace(/[ \u00a0\t\r\n]+/g,"")==""}function e(p,r,n){var o,q;if(f(n)){o=r.getParent(n,"ul,ol");if(!r.getParent(o.parentNode,"ul,ol")){r.split(o,n);q=r.create("p",0,'<br data-mce-bogus="1" />');r.replace(q,n);p.select(q,1)}return h}return d}m.create("tinymce.ForceBlocks",{ForceBlocks:function(n){var o=this,p=n.settings,q;o.editor=n;o.dom=n.dom;q=(p.forced_root_block||"p").toLowerCase();p.element=q.toUpperCase();n.onPreInit.add(o.setup,o);if(p.forced_root_block){n.onInit.add(o.forceRoots,o);n.onSetContent.add(o.forceRoots,o);n.onBeforeGetContent.add(o.forceRoots,o);n.onExecCommand.add(function(r,s){if(s=="mceInsertContent"){o.forceRoots();r.nodeChanged()}})}},setup:function(){var o=this,n=o.editor,q=n.settings,u=n.dom,p=n.selection;if(q.forced_root_block){n.onBeforeExecCommand.add(o.forceRoots,o);n.onKeyUp.add(o.forceRoots,o);n.onPreProcess.add(o.forceRoots,o)}if(q.force_br_newlines){if(c){n.onKeyPress.add(function(s,t){var v;if(t.keyCode==13&&p.getNode().nodeName!="LI"){p.setContent('<br id="__" /> ',{format:"raw"});v=u.get("__");v.removeAttribute("id");p.select(v);p.collapse();return k.cancel(t)}})}}if(q.force_p_newlines){if(!c){n.onKeyPress.add(function(s,t){if(t.keyCode==13&&!t.shiftKey&&!o.insertPara(t)){k.cancel(t)}})}else{m.addUnload(function(){o._previousFormats=0});n.onKeyPress.add(function(s,t){o._previousFormats=0;if(t.keyCode==13&&!t.shiftKey&&s.selection.isCollapsed()&&q.keep_styles){o._previousFormats=l(s.selection.getStart())}});n.onKeyUp.add(function(t,x){if(x.keyCode==13&&!x.shiftKey){var v=t.selection.getStart(),s=o._previousFormats;if(!v.hasChildNodes()&&s){v=u.getParent(v,u.isBlock);if(v&&v.nodeName!="LI"){v.innerHTML="";if(o._previousFormats){v.appendChild(s.wrapper);s.inner.innerHTML="\uFEFF"}else{v.innerHTML="\uFEFF"}p.select(v,1);p.collapse(true);t.getDoc().execCommand("Delete",false,null);o._previousFormats=0}}}})}if(a){n.onKeyDown.add(function(s,t){if((t.keyCode==8||t.keyCode==46)&&!t.shiftKey){o.backspaceDelete(t,t.keyCode==8)}})}}if(m.isWebKit){function r(t){var s=p.getRng(),v,z=u.create("div",null," "),y,x=u.getViewPort(t.getWin()).h;s.insertNode(v=u.create("br"));s.setStartAfter(v);s.setEndAfter(v);p.setRng(s);if(p.getSel().focusNode==v.previousSibling){p.select(u.insertAfter(u.doc.createTextNode("\u00a0"),v));p.collapse(d)}u.insertAfter(z,v);y=u.getPos(z).y;u.remove(z);if(y>x){t.getWin().scrollTo(0,y)}}n.onKeyPress.add(function(s,t){if(t.keyCode==13&&(t.shiftKey||(q.force_br_newlines&&!u.getParent(p.getNode(),"h1,h2,h3,h4,h5,h6,ol,ul")))){r(s);k.cancel(t)}})}if(c){if(q.element!="P"){n.onKeyPress.add(function(s,t){o.lastElm=p.getNode().nodeName});n.onKeyUp.add(function(t,v){var y,x=p.getNode(),s=t.getBody();if(s.childNodes.length===1&&x.nodeName=="P"){x=u.rename(x,q.element);p.select(x);p.collapse();t.nodeChanged()}else{if(v.keyCode==13&&!v.shiftKey&&o.lastElm!="P"){y=u.getParent(x,"p");if(y){u.rename(y,q.element);t.nodeChanged()}}}})}}},find:function(v,q,r){var p=this.editor,o=p.getDoc().createTreeWalker(v,4,null,h),u=-1;while(v=o.nextNode()){u++;if(q==0&&v==r){return u}if(q==1&&u==r){return v}}return -1},forceRoots:function(x,I){var z=this,x=z.editor,M=x.getBody(),J=x.getDoc(),P=x.selection,A=P.getSel(),B=P.getRng(),N=-2,v,G,o,p,K=-16777215;var L,q,O,F,C,u=M.childNodes,E,D,y;for(E=u.length-1;E>=0;E--){L=u[E];if(L.nodeType===1&&L.getAttribute("data-mce-type")){q=null;continue}if(L.nodeType===3||(!z.dom.isBlock(L)&&L.nodeType!==8&&!/^(script|mce:script|style|mce:style)$/i.test(L.nodeName))){if(!q){if(L.nodeType!=3||/[^\s]/g.test(L.nodeValue)){if(N==-2&&B){if(!c||B.setStart){if(B.startContainer.nodeType==1&&(D=B.startContainer.childNodes[B.startOffset])&&D.nodeType==1){y=D.getAttribute("id");D.setAttribute("id","__mce")}else{if(x.dom.getParent(B.startContainer,function(n){return n===M})){G=B.startOffset;o=B.endOffset;N=z.find(M,0,B.startContainer);v=z.find(M,0,B.endContainer)}}}else{if(B.item){p=J.body.createTextRange();p.moveToElementText(B.item(0));B=p}p=J.body.createTextRange();p.moveToElementText(M);p.collapse(1);O=p.move("character",K)*-1;p=B.duplicate();p.collapse(1);F=p.move("character",K)*-1;p=B.duplicate();p.collapse(0);C=(p.move("character",K)*-1)-F;N=F-O;v=C}}q=x.dom.create(x.settings.forced_root_block);L.parentNode.replaceChild(q,L);q.appendChild(L)}}else{if(q.hasChildNodes()){q.insertBefore(L,q.firstChild)}else{q.appendChild(L)}}}else{q=null}}if(N!=-2){if(!c||B.setStart){q=M.getElementsByTagName(x.settings.element)[0];B=J.createRange();if(N!=-1){B.setStart(z.find(M,1,N),G)}else{B.setStart(q,0)}if(v!=-1){B.setEnd(z.find(M,1,v),o)}else{B.setEnd(q,0)}if(A){A.removeAllRanges();A.addRange(B)}}else{try{B=A.createRange();B.moveToElementText(M);B.collapse(1);B.moveStart("character",N);B.moveEnd("character",v);B.select()}catch(H){}}}else{if((!c||B.setStart)&&(D=x.dom.get("__mce"))){if(y){D.setAttribute("id",y)}else{D.removeAttribute("id")}B=J.createRange();B.setStartBefore(D);B.setEndBefore(D);P.setRng(B)}}},getParentBlock:function(p){var o=this.dom;return o.getParent(p,o.isBlock)},insertPara:function(S){var G=this,x=G.editor,O=x.dom,T=x.getDoc(),X=x.settings,H=x.selection.getSel(),I=H.getRangeAt(0),W=T.body;var L,M,J,Q,P,u,p,v,A,o,E,V,q,z,K,N=O.getViewPort(x.getWin()),D,F,C;L=T.createRange();L.setStart(H.anchorNode,H.anchorOffset);L.collapse(d);M=T.createRange();M.setStart(H.focusNode,H.focusOffset);M.collapse(d);J=L.compareBoundaryPoints(L.START_TO_END,M)<0;Q=J?H.anchorNode:H.focusNode;P=J?H.anchorOffset:H.focusOffset;u=J?H.focusNode:H.anchorNode;p=J?H.focusOffset:H.anchorOffset;if(Q===u&&/^(TD|TH)$/.test(Q.nodeName)){if(Q.firstChild.nodeName=="BR"){O.remove(Q.firstChild)}if(Q.childNodes.length==0){x.dom.add(Q,X.element,null,"<br />");V=x.dom.add(Q,X.element,null,"<br />")}else{K=Q.innerHTML;Q.innerHTML="";x.dom.add(Q,X.element,null,K);V=x.dom.add(Q,X.element,null,"<br />")}I=T.createRange();I.selectNodeContents(V);I.collapse(1);x.selection.setRng(I);return h}if(Q==W&&u==W&&W.firstChild&&x.dom.isBlock(W.firstChild)){Q=u=Q.firstChild;P=p=0;L=T.createRange();L.setStart(Q,0);M=T.createRange();M.setStart(u,0)}Q=Q.nodeName=="HTML"?T.body:Q;Q=Q.nodeName=="BODY"?Q.firstChild:Q;u=u.nodeName=="HTML"?T.body:u;u=u.nodeName=="BODY"?u.firstChild:u;v=G.getParentBlock(Q);A=G.getParentBlock(u);o=v?v.nodeName:X.element;if(K=G.dom.getParent(v,"li,pre")){if(K.nodeName=="LI"){return e(x.selection,G.dom,K)}return d}if(v&&(v.nodeName=="CAPTION"||/absolute|relative|fixed/gi.test(O.getStyle(v,"position",1)))){o=X.element;v=null}if(A&&(A.nodeName=="CAPTION"||/absolute|relative|fixed/gi.test(O.getStyle(v,"position",1)))){o=X.element;A=null}if(/(TD|TABLE|TH|CAPTION)/.test(o)||(v&&o=="DIV"&&/left|right/gi.test(O.getStyle(v,"float",1)))){o=X.element;v=A=null}E=(v&&v.nodeName==o)?v.cloneNode(0):x.dom.create(o);V=(A&&A.nodeName==o)?A.cloneNode(0):x.dom.create(o);V.removeAttribute("id");if(/^(H[1-6])$/.test(o)&&g(I,v)){V=x.dom.create(X.element)}K=q=Q;do{if(K==W||K.nodeType==9||G.dom.isBlock(K)||/(TD|TABLE|TH|CAPTION)/.test(K.nodeName)){break}q=K}while((K=K.previousSibling?K.previousSibling:K.parentNode));K=z=u;do{if(K==W||K.nodeType==9||G.dom.isBlock(K)||/(TD|TABLE|TH|CAPTION)/.test(K.nodeName)){break}z=K}while((K=K.nextSibling?K.nextSibling:K.parentNode));if(q.nodeName==o){L.setStart(q,0)}else{L.setStartBefore(q)}L.setEnd(Q,P);E.appendChild(L.cloneContents()||T.createTextNode(""));try{M.setEndAfter(z)}catch(R){}M.setStart(u,p);V.appendChild(M.cloneContents()||T.createTextNode(""));I=T.createRange();if(!q.previousSibling&&q.parentNode.nodeName==o){I.setStartBefore(q.parentNode)}else{if(L.startContainer.nodeName==o&&L.startOffset==0){I.setStartBefore(L.startContainer)}else{I.setStart(L.startContainer,L.startOffset)}}if(!z.nextSibling&&z.parentNode.nodeName==o){I.setEndAfter(z.parentNode)}else{I.setEnd(M.endContainer,M.endOffset)}I.deleteContents();if(b){x.getWin().scrollTo(0,N.y)}if(E.firstChild&&E.firstChild.nodeName==o){E.innerHTML=E.firstChild.innerHTML}if(V.firstChild&&V.firstChild.nodeName==o){V.innerHTML=V.firstChild.innerHTML}if(f(E)){E.innerHTML="<br />"}function U(y,s){var r=[],Z,Y,t;y.innerHTML="";if(X.keep_styles){Y=s;do{if(/^(SPAN|STRONG|B|EM|I|FONT|STRIKE|U)$/.test(Y.nodeName)){Z=Y.cloneNode(h);O.setAttrib(Z,"id","");r.push(Z)}}while(Y=Y.parentNode)}if(r.length>0){for(t=r.length-1,Z=y;t>=0;t--){Z=Z.appendChild(r[t])}r[0].innerHTML=b?"\u00a0":"<br />";return r[0]}else{y.innerHTML=b?"\u00a0":"<br />"}}if(f(V)){C=U(V,u)}if(b&&parseFloat(opera.version())<9.5){I.insertNode(E);I.insertNode(V)}else{I.insertNode(V);I.insertNode(E)}V.normalize();E.normalize();function B(r){return T.createTreeWalker(r,NodeFilter.SHOW_TEXT,null,h).nextNode()||r}I=T.createRange();I.selectNodeContents(a?B(C||V):C||V);I.collapse(1);H.removeAllRanges();H.addRange(I);D=x.dom.getPos(V).y;if(D<N.y||D+25>N.y+N.h){x.getWin().scrollTo(0,D<N.y?D:D-N.h+25)}return h},backspaceDelete:function(v,C){var D=this,u=D.editor,z=u.getBody(),s=u.dom,q,x=u.selection,p=x.getRng(),y=p.startContainer,q,A,B,o;if(!C&&p.collapsed&&y.nodeType==1&&p.startOffset==y.childNodes.length){o=new m.dom.TreeWalker(y.lastChild,y);for(q=y.lastChild;q;q=o.prev()){if(q.nodeType==3){p.setStart(q,q.nodeValue.length);p.collapse(true);x.setRng(p);return}}}if(y&&u.dom.isBlock(y)&&!/^(TD|TH)$/.test(y.nodeName)&&C){if(y.childNodes.length==0||(y.childNodes.length==1&&y.firstChild.nodeName=="BR")){q=y;while((q=q.previousSibling)&&!u.dom.isBlock(q)){}if(q){if(y!=z.firstChild){A=u.dom.doc.createTreeWalker(q,NodeFilter.SHOW_TEXT,null,h);while(B=A.nextNode()){q=B}p=u.getDoc().createRange();p.setStart(q,q.nodeValue?q.nodeValue.length:0);p.setEnd(q,q.nodeValue?q.nodeValue.length:0);x.setRng(p);u.dom.remove(y)}return k.cancel(v)}}}}})})(tinymce);(function(c){var b=c.DOM,a=c.dom.Event,d=c.each,e=c.extend;c.create("tinymce.ControlManager",{ControlManager:function(f,j){var h=this,g;j=j||{};h.editor=f;h.controls={};h.onAdd=new c.util.Dispatcher(h);h.onPostRender=new c.util.Dispatcher(h);h.prefix=j.prefix||f.id+"_";h._cls={};h.onPostRender.add(function(){d(h.controls,function(i){i.postRender()})})},get:function(f){return this.controls[this.prefix+f]||this.controls[f]},setActive:function(h,f){var g=null;if(g=this.get(h)){g.setActive(f)}return g},setDisabled:function(h,f){var g=null;if(g=this.get(h)){g.setDisabled(f)}return g},add:function(g){var f=this;if(g){f.controls[g.id]=g;f.onAdd.dispatch(g,f)}return g},createControl:function(i){var h,g=this,f=g.editor;d(f.plugins,function(j){if(j.createControl){h=j.createControl(i,g);if(h){return false}}});switch(i){case"|":case"separator":return g.createSeparator()}if(!h&&f.buttons&&(h=f.buttons[i])){return g.createButton(i,h)}return g.add(h)},createDropMenu:function(f,n,h){var m=this,i=m.editor,j,g,k,l;n=e({"class":"mceDropDown",constrain:i.settings.constrain_menus},n);n["class"]=n["class"]+" "+i.getParam("skin")+"Skin";if(k=i.getParam("skin_variant")){n["class"]+=" "+i.getParam("skin")+"Skin"+k.substring(0,1).toUpperCase()+k.substring(1)}f=m.prefix+f;l=h||m._cls.dropmenu||c.ui.DropMenu;j=m.controls[f]=new l(f,n);j.onAddItem.add(function(r,q){var p=q.settings;p.title=i.getLang(p.title,p.title);if(!p.onclick){p.onclick=function(o){if(p.cmd){i.execCommand(p.cmd,p.ui||false,p.value)}}}});i.onRemove.add(function(){j.destroy()});if(c.isIE){j.onShowMenu.add(function(){i.focus();g=i.selection.getBookmark(1)});j.onHideMenu.add(function(){if(g){i.selection.moveToBookmark(g);g=0}})}return m.add(j)},createListBox:function(m,i,l){var h=this,g=h.editor,j,k,f;if(h.get(m)){return null}i.title=g.translate(i.title);i.scope=i.scope||g;if(!i.onselect){i.onselect=function(n){g.execCommand(i.cmd,i.ui||false,n||i.value)}}i=e({title:i.title,"class":"mce_"+m,scope:i.scope,control_manager:h},i);m=h.prefix+m;if(g.settings.use_native_selects){k=new c.ui.NativeListBox(m,i)}else{f=l||h._cls.listbox||c.ui.ListBox;k=new f(m,i,g)}h.controls[m]=k;if(c.isWebKit){k.onPostRender.add(function(p,o){a.add(o,"mousedown",function(){g.bookmark=g.selection.getBookmark(1)});a.add(o,"focus",function(){g.selection.moveToBookmark(g.bookmark);g.bookmark=null})})}if(k.hideMenu){g.onMouseDown.add(k.hideMenu,k)}return h.add(k)},createButton:function(m,i,l){var h=this,g=h.editor,j,k,f;if(h.get(m)){return null}i.title=g.translate(i.title);i.label=g.translate(i.label);i.scope=i.scope||g;if(!i.onclick&&!i.menu_button){i.onclick=function(){g.execCommand(i.cmd,i.ui||false,i.value)}}i=e({title:i.title,"class":"mce_"+m,unavailable_prefix:g.getLang("unavailable",""),scope:i.scope,control_manager:h},i);m=h.prefix+m;if(i.menu_button){f=l||h._cls.menubutton||c.ui.MenuButton;k=new f(m,i,g);g.onMouseDown.add(k.hideMenu,k)}else{f=h._cls.button||c.ui.Button;k=new f(m,i)}return h.add(k)},createMenuButton:function(h,f,g){f=f||{};f.menu_button=1;return this.createButton(h,f,g)},createSplitButton:function(m,i,l){var h=this,g=h.editor,j,k,f;if(h.get(m)){return null}i.title=g.translate(i.title);i.scope=i.scope||g;if(!i.onclick){i.onclick=function(n){g.execCommand(i.cmd,i.ui||false,n||i.value)}}if(!i.onselect){i.onselect=function(n){g.execCommand(i.cmd,i.ui||false,n||i.value)}}i=e({title:i.title,"class":"mce_"+m,scope:i.scope,control_manager:h},i);m=h.prefix+m;f=l||h._cls.splitbutton||c.ui.SplitButton;k=h.add(new f(m,i,g));g.onMouseDown.add(k.hideMenu,k);return k},createColorSplitButton:function(f,n,h){var l=this,j=l.editor,i,k,m,g;if(l.get(f)){return null}n.title=j.translate(n.title);n.scope=n.scope||j;if(!n.onclick){n.onclick=function(o){if(c.isIE){g=j.selection.getBookmark(1)}j.execCommand(n.cmd,n.ui||false,o||n.value)}}if(!n.onselect){n.onselect=function(o){j.execCommand(n.cmd,n.ui||false,o||n.value)}}n=e({title:n.title,"class":"mce_"+f,menu_class:j.getParam("skin")+"Skin",scope:n.scope,more_colors_title:j.getLang("more_colors")},n);f=l.prefix+f;m=h||l._cls.colorsplitbutton||c.ui.ColorSplitButton;k=new m(f,n,j);j.onMouseDown.add(k.hideMenu,k);j.onRemove.add(function(){k.destroy()});if(c.isIE){k.onShowMenu.add(function(){j.focus();g=j.selection.getBookmark(1)});k.onHideMenu.add(function(){if(g){j.selection.moveToBookmark(g);g=0}})}return l.add(k)},createToolbar:function(k,h,j){var i,g=this,f;k=g.prefix+k;f=j||g._cls.toolbar||c.ui.Toolbar;i=new f(k,h,g.editor);if(g.get(k)){return null}return g.add(i)},createToolbarGroup:function(k,h,j){var i,g=this,f;k=g.prefix+k;f=j||this._cls.toolbarGroup||c.ui.ToolbarGroup;i=new f(k,h,g.editor);if(g.get(k)){return null}return g.add(i)},createSeparator:function(g){var f=g||this._cls.separator||c.ui.Separator;return new f()},setControlType:function(g,f){return this._cls[g.toLowerCase()]=f},destroy:function(){d(this.controls,function(f){f.destroy()});this.controls=null}})})(tinymce);(function(d){var a=d.util.Dispatcher,e=d.each,c=d.isIE,b=d.isOpera;d.create("tinymce.WindowManager",{WindowManager:function(f){var g=this;g.editor=f;g.onOpen=new a(g);g.onClose=new a(g);g.params={};g.features={}},open:function(z,h){var v=this,k="",n,m,i=v.editor.settings.dialog_type=="modal",q,o,j,g=d.DOM.getViewPort(),r;z=z||{};h=h||{};o=b?g.w:screen.width;j=b?g.h:screen.height;z.name=z.name||"mc_"+new Date().getTime();z.width=parseInt(z.width||320);z.height=parseInt(z.height||240);z.resizable=true;z.left=z.left||parseInt(o/2)-(z.width/2);z.top=z.top||parseInt(j/2)-(z.height/2);h.inline=false;h.mce_width=z.width;h.mce_height=z.height;h.mce_auto_focus=z.auto_focus;if(i){if(c){z.center=true;z.help=false;z.dialogWidth=z.width+"px";z.dialogHeight=z.height+"px";z.scroll=z.scrollbars||false}}e(z,function(p,f){if(d.is(p,"boolean")){p=p?"yes":"no"}if(!/^(name|url)$/.test(f)){if(c&&i){k+=(k?";":"")+f+":"+p}else{k+=(k?",":"")+f+"="+p}}});v.features=z;v.params=h;v.onOpen.dispatch(v,z,h);r=z.url||z.file;r=d._addVer(r);try{if(c&&i){q=1;window.showModalDialog(r,window,k)}else{q=window.open(r,z.name,k)}}catch(l){}if(!q){alert(v.editor.getLang("popup_blocked"))}},close:function(f){f.close();this.onClose.dispatch(this)},createInstance:function(i,h,g,m,l,k){var j=d.resolve(i);return new j(h,g,m,l,k)},confirm:function(h,f,i,g){g=g||window;f.call(i||this,g.confirm(this._decode(this.editor.getLang(h,h))))},alert:function(h,f,j,g){var i=this;g=g||window;g.alert(i._decode(i.editor.getLang(h,h)));if(f){f.call(j||i)}},resizeBy:function(f,g,h){h.resizeBy(f,g)},_decode:function(f){return d.DOM.decode(f).replace(/\\n/g,"\n")}})}(tinymce));(function(a){a.Formatter=function(T){var K={},M=a.each,c=T.dom,p=T.selection,s=a.dom.TreeWalker,I=new a.dom.RangeUtils(c),d=T.schema.isValidChild,E=c.isBlock,k=T.settings.forced_root_block,r=c.nodeIndex,D="\uFEFF",e=/^(src|href|style)$/,Q=false,A=true,o,N={apply:[],remove:[]};function y(U){return U instanceof Array}function l(V,U){return c.getParents(V,U,c.getRoot())}function b(U){return U.nodeType===1&&(U.face==="mceinline"||U.style.fontFamily==="mceinline")}function P(U){return U?K[U]:K}function j(U,V){if(U){if(typeof(U)!=="string"){M(U,function(X,W){j(W,X)})}else{V=V.length?V:[V];M(V,function(W){if(W.deep===o){W.deep=!W.selector}if(W.split===o){W.split=!W.selector||W.inline}if(W.remove===o&&W.selector&&!W.inline){W.remove="none"}if(W.selector&&W.inline){W.mixed=true;W.block_expand=true}if(typeof(W.classes)==="string"){W.classes=W.classes.split(/\s+/)}});K[U]=V}}}function R(W,ad,Y){var Z=P(W),ae=Z[0],ac,V,ab,aa=p.isCollapsed();function X(ah){var ag=ah.startContainer,ak=ah.startOffset,aj,ai;if(ag.nodeType==1||ag.nodeValue===""){ag=ag.nodeType==1?ag.childNodes[ak]:ag;if(ag){aj=new s(ag,ag.parentNode);for(ai=aj.current();ai;ai=aj.next()){if(ai.nodeType==3&&!f(ai)){ah.setStart(ai,0);break}}}}return ah}function U(ah,ag){ag=ag||ae;if(ah){M(ag.styles,function(aj,ai){c.setStyle(ah,ai,q(aj,ad))});M(ag.attributes,function(aj,ai){c.setAttrib(ah,ai,q(aj,ad))});M(ag.classes,function(ai){ai=q(ai,ad);if(!c.hasClass(ah,ai)){c.addClass(ah,ai)}})}}function af(ah){var ag=[],aj,ai;aj=ae.inline||ae.block;ai=c.create(aj);U(ai);I.walk(ah,function(ak){var al;function am(an){var aq=an.nodeName.toLowerCase(),ap=an.parentNode.nodeName.toLowerCase(),ao;if(g(aq,"br")){al=0;if(ae.block){c.remove(an)}return}if(ae.wrapper&&v(an,W,ad)){al=0;return}if(ae.block&&!ae.wrapper&&F(aq)){an=c.rename(an,aj);U(an);ag.push(an);al=0;return}if(ae.selector){M(Z,function(ar){if("collapsed" in ar&&ar.collapsed!==aa){return}if(c.is(an,ar.selector)&&!b(an)){U(an,ar);ao=true}});if(!ae.inline||ao){al=0;return}}if(d(aj,aq)&&d(ap,aj)&&!(an.nodeType===3&&an.nodeValue.length===1&&an.nodeValue.charCodeAt(0)===65279)){if(!al){al=ai.cloneNode(Q);an.parentNode.insertBefore(al,an);ag.push(al)}al.appendChild(an)}else{al=0;M(a.grep(an.childNodes),am);al=0}}M(ak,am)});if(ae.wrap_links===false){M(ag,function(ak){function al(ap){var ao,an,am;if(ap.nodeName==="A"){an=ai.cloneNode(Q);ag.push(an);am=a.grep(ap.childNodes);for(ao=0;ao<am.length;ao++){an.appendChild(am[ao])}ap.appendChild(an)}M(a.grep(ap.childNodes),al)}al(ak)})}M(ag,function(am){var ak;function an(ap){var ao=0;M(ap.childNodes,function(aq){if(!f(aq)&&!G(aq)){ao++}});return ao}function al(ao){var aq,ap;M(ao.childNodes,function(ar){if(ar.nodeType==1&&!G(ar)&&!b(ar)){aq=ar;return Q}});if(aq&&h(aq,ae)){ap=aq.cloneNode(Q);U(ap);c.replace(ap,ao,A);c.remove(aq,1)}return ap||ao}ak=an(am);if((ag.length>1||!E(am))&&ak===0){c.remove(am,1);return}if(ae.inline||ae.wrapper){if(!ae.exact&&ak===1){am=al(am)}M(Z,function(ao){M(c.select(ao.inline,am),function(aq){var ap;if(ao.wrap_links===false){ap=aq.parentNode;do{if(ap.nodeName==="A"){return}}while(ap=ap.parentNode)}S(ao,ad,aq,ao.exact?aq:null)})});if(v(am.parentNode,W,ad)){c.remove(am,1);am=0;return A}if(ae.merge_with_parents){c.getParent(am.parentNode,function(ao){if(v(ao,W,ad)){c.remove(am,1);am=0;return A}})}if(am){am=t(B(am),am);am=t(am,B(am,A))}}})}if(ae){if(Y){V=c.createRng();V.setStartBefore(Y);V.setEndAfter(Y);af(n(V,Z))}else{if(!aa||!ae.inline||c.select("td.mceSelected,th.mceSelected").length){ac=p.getBookmark();af(n(p.getRng(A),Z));p.moveToBookmark(ac);p.setRng(X(p.getRng(A)));T.nodeChanged()}else{O("apply",W,ad)}}}}function z(W,af,Z){var aa=P(W),ah=aa[0],ae,ad,V;function Y(ak){var aj=ak.startContainer,ap=ak.startOffset,ao,an,al,am;if(aj.nodeType==3&&ap>=aj.nodeValue.length-1){aj=aj.parentNode;ap=r(aj)+1}if(aj.nodeType==1){al=aj.childNodes;aj=al[Math.min(ap,al.length-1)];ao=new s(aj);if(ap>al.length-1){ao.next()}for(an=ao.current();an;an=ao.next()){if(an.nodeType==3&&!f(an)){am=c.create("a",null,D);an.parentNode.insertBefore(am,an);ak.setStart(an,0);p.setRng(ak);c.remove(am);return}}}}function X(am){var al,ak,aj;al=a.grep(am.childNodes);for(ak=0,aj=aa.length;ak<aj;ak++){if(S(aa[ak],af,am,am)){break}}if(ah.deep){for(ak=0,aj=al.length;ak<aj;ak++){X(al[ak])}}}function ab(aj){var ak;M(l(aj.parentNode).reverse(),function(al){var am;if(!ak&&al.id!="_start"&&al.id!="_end"){am=v(al,W,af);if(am&&am.split!==false){ak=al}}});return ak}function U(am,aj,ao,ar){var at,aq,ap,al,an,ak;if(am){ak=am.parentNode;for(at=aj.parentNode;at&&at!=ak;at=at.parentNode){aq=at.cloneNode(Q);for(an=0;an<aa.length;an++){if(S(aa[an],af,aq,aq)){aq=0;break}}if(aq){if(ap){aq.appendChild(ap)}if(!al){al=aq}ap=aq}}if(ar&&(!ah.mixed||!E(am))){aj=c.split(am,aj)}if(ap){ao.parentNode.insertBefore(ap,ao);al.appendChild(ao)}}return aj}function ag(aj){return U(ab(aj),aj,aj,true)}function ac(al){var ak=c.get(al?"_start":"_end"),aj=ak[al?"firstChild":"lastChild"];if(G(aj)){aj=aj[al?"firstChild":"lastChild"]}c.remove(ak,true);return aj}function ai(aj){var ak,al;aj=n(aj,aa,A);if(ah.split){ak=H(aj,A);al=H(aj);if(ak!=al){ak=L(ak,"span",{id:"_start","data-mce-type":"bookmark"});al=L(al,"span",{id:"_end","data-mce-type":"bookmark"});ag(ak);ag(al);ak=ac(A);al=ac()}else{ak=al=ag(ak)}aj.startContainer=ak.parentNode;aj.startOffset=r(ak);aj.endContainer=al.parentNode;aj.endOffset=r(al)+1}I.walk(aj,function(am){M(am,function(an){X(an)})})}if(Z){V=c.createRng();V.setStartBefore(Z);V.setEndAfter(Z);ai(V);return}if(!p.isCollapsed()||!ah.inline||c.select("td.mceSelected,th.mceSelected").length){ae=p.getBookmark();ai(p.getRng(A));p.moveToBookmark(ae);if(i(W,af,p.getStart())){Y(p.getRng(true))}T.nodeChanged()}else{O("remove",W,af)}}function C(U,W,V){if(i(U,W,V)){z(U,W,V)}else{R(U,W,V)}}function v(V,U,aa,Y){var W=P(U),ab,Z,X;function ac(ag,ai,aj){var af,ah,ad=ai[aj],ae;if(ad){if(ad.length===o){for(af in ad){if(ad.hasOwnProperty(af)){if(aj==="attributes"){ah=c.getAttrib(ag,af)}else{ah=J(ag,af)}if(Y&&!ah&&!ai.exact){return}if((!Y||ai.exact)&&!g(ah,q(ad[af],aa))){return}}}}else{for(ae=0;ae<ad.length;ae++){if(aj==="attributes"?c.getAttrib(ag,ad[ae]):J(ag,ad[ae])){return ai}}}}return ai}if(W&&V){for(Z=0;Z<W.length;Z++){ab=W[Z];if(h(V,ab)&&ac(V,ab,"attributes")&&ac(V,ab,"styles")){if(X=ab.classes){for(Z=0;Z<X.length;Z++){if(!c.hasClass(V,X[Z])){return}}}return ab}}}}function i(W,Z,Y){var V,X;function U(aa){aa=c.getParent(aa,function(ab){return !!v(ab,W,Z,true)});return v(aa,W,Z)}if(Y){return U(Y)}if(p.isCollapsed()){for(X=N.apply.length-1;X>=0;X--){if(N.apply[X].name==W){return true}}for(X=N.remove.length-1;X>=0;X--){if(N.remove[X].name==W){return false}}return U(p.getNode())}Y=p.getNode();if(U(Y)){return A}V=p.getStart();if(V!=Y){if(U(V)){return A}}return Q}function u(ab,aa){var Y,Z=[],X={},W,V,U;if(p.isCollapsed()){for(V=0;V<ab.length;V++){for(W=N.remove.length-1;W>=0;W--){U=ab[V];if(N.remove[W].name==U){X[U]=true;break}}}for(W=N.apply.length-1;W>=0;W--){for(V=0;V<ab.length;V++){U=ab[V];if(!X[U]&&N.apply[W].name==U){X[U]=true;Z.push(U)}}}}Y=p.getStart();c.getParent(Y,function(ae){var ad,ac;for(ad=0;ad<ab.length;ad++){ac=ab[ad];if(!X[ac]&&v(ae,ac,aa)){X[ac]=true;Z.push(ac)}}});return Z}function x(Y){var aa=P(Y),X,W,Z,V,U;if(aa){X=p.getStart();W=l(X);for(V=aa.length-1;V>=0;V--){U=aa[V].selector;if(!U){return A}for(Z=W.length-1;Z>=0;Z--){if(c.is(W[Z],U)){return A}}}}return Q}a.extend(this,{get:P,register:j,apply:R,remove:z,toggle:C,match:i,matchAll:u,matchNode:v,canApply:x});function h(U,V){if(g(U,V.inline)){return A}if(g(U,V.block)){return A}if(V.selector){return c.is(U,V.selector)}}function g(V,U){V=V||"";U=U||"";V=""+(V.nodeName||V);U=""+(U.nodeName||U);return V.toLowerCase()==U.toLowerCase()}function J(V,U){var W=c.getStyle(V,U);if(U=="color"||U=="backgroundColor"){W=c.toHex(W)}if(U=="fontWeight"&&W==700){W="bold"}return""+W}function q(U,V){if(typeof(U)!="string"){U=U(V)}else{if(V){U=U.replace(/%(\w+)/g,function(X,W){return V[W]||X})}}return U}function f(U){return U&&U.nodeType===3&&/^([\s\r\n]+|)$/.test(U.nodeValue)}function L(W,V,U){var X=c.create(V,U);W.parentNode.insertBefore(X,W);X.appendChild(W);return X}function n(U,ac,X){var W=U.startContainer,Z=U.startOffset,af=U.endContainer,aa=U.endOffset,ae,ab;function ad(ai,aj,ag,ah){var ak,al;ah=ah||c.getRoot();for(;;){ak=ai.parentNode;if(ak==ah||(!ac[0].block_expand&&E(ak))){return ai}for(ae=ak[aj];ae&&ae!=ai;ae=ae[ag]){if(ae.nodeType==1&&!G(ae)){return ai}if(ae.nodeType==3&&!f(ae)){return ai}}ai=ai.parentNode}return ai}if(W.nodeType==1&&W.hasChildNodes()){ab=W.childNodes.length-1;W=W.childNodes[Z>ab?ab:Z];if(W.nodeType==3){Z=0}}if(af.nodeType==1&&af.hasChildNodes()){ab=af.childNodes.length-1;af=af.childNodes[aa>ab?ab:aa-1];if(af.nodeType==3){aa=af.nodeValue.length}}if(G(W.parentNode)){W=W.parentNode}if(G(W)){W=W.nextSibling||W}if(G(af.parentNode)){af=af.parentNode}if(G(af)){af=af.previousSibling||af}if(ac[0].inline||ac[0].block_expand){W=ad(W,"firstChild","nextSibling");af=ad(af,"lastChild","previousSibling")}if(ac[0].selector&&ac[0].expand!==Q&&!ac[0].inline){function Y(ah,ag){var ai,aj,al,ak;if(ah.nodeType==3&&ah.nodeValue.length==0&&ah[ag]){ah=ah[ag]}ai=l(ah);for(aj=0;aj<ai.length;aj++){for(al=0;al<ac.length;al++){ak=ac[al];if("collapsed" in ak&&ak.collapsed!==U.collapsed){continue}if(c.is(ai[aj],ak.selector)){return ai[aj]}}}return ah}W=Y(W,"previousSibling");af=Y(af,"nextSibling")}if(ac[0].block||ac[0].selector){function V(ah,ag,aj){var ai;if(!ac[0].wrapper){ai=c.getParent(ah,ac[0].block)}if(!ai){ai=c.getParent(ah.nodeType==3?ah.parentNode:ah,E)}if(ai&&ac[0].wrapper){ai=l(ai,"ul,ol").reverse()[0]||ai}if(!ai){ai=ah;while(ai[ag]&&!E(ai[ag])){ai=ai[ag];if(g(ai,"br")){break}}}return ai||ah}W=V(W,"previousSibling");af=V(af,"nextSibling");if(ac[0].block){if(!E(W)){W=ad(W,"firstChild","nextSibling")}if(!E(af)){af=ad(af,"lastChild","previousSibling")}}}if(W.nodeType==1){Z=r(W);W=W.parentNode}if(af.nodeType==1){aa=r(af)+1;af=af.parentNode}return{startContainer:W,startOffset:Z,endContainer:af,endOffset:aa}}function S(aa,Z,X,U){var W,V,Y;if(!h(X,aa)){return Q}if(aa.remove!="all"){M(aa.styles,function(ac,ab){ac=q(ac,Z);if(typeof(ab)==="number"){ab=ac;U=0}if(!U||g(J(U,ab),ac)){c.setStyle(X,ab,"")}Y=1});if(Y&&c.getAttrib(X,"style")==""){X.removeAttribute("style");X.removeAttribute("data-mce-style")}M(aa.attributes,function(ad,ab){var ac;ad=q(ad,Z);if(typeof(ab)==="number"){ab=ad;U=0}if(!U||g(c.getAttrib(U,ab),ad)){if(ab=="class"){ad=c.getAttrib(X,ab);if(ad){ac="";M(ad.split(/\s+/),function(ae){if(/mce\w+/.test(ae)){ac+=(ac?" ":"")+ae}});if(ac){c.setAttrib(X,ab,ac);return}}}if(ab=="class"){X.removeAttribute("className")}if(e.test(ab)){X.removeAttribute("data-mce-"+ab)}X.removeAttribute(ab)}});M(aa.classes,function(ab){ab=q(ab,Z);if(!U||c.hasClass(U,ab)){c.removeClass(X,ab)}});V=c.getAttribs(X);for(W=0;W<V.length;W++){if(V[W].nodeName.indexOf("_")!==0){return Q}}}if(aa.remove!="none"){m(X,aa);return A}}function m(W,X){var U=W.parentNode,V;if(X.block){if(!k){function Y(aa,Z,ab){aa=B(aa,Z,ab);return !aa||(aa.nodeName=="BR"||E(aa))}if(E(W)&&!E(U)){if(!Y(W,Q)&&!Y(W.firstChild,A,1)){W.insertBefore(c.create("br"),W.firstChild)}if(!Y(W,A)&&!Y(W.lastChild,Q,1)){W.appendChild(c.create("br"))}}}else{if(U==c.getRoot()){if(!X.list_block||!g(W,X.list_block)){M(a.grep(W.childNodes),function(Z){if(d(k,Z.nodeName.toLowerCase())){if(!V){V=L(Z,k)}else{V.appendChild(Z)}}else{V=0}})}}}}if(X.selector&&X.inline&&!g(X.inline,W)){return}c.remove(W,1)}function B(V,U,W){if(V){U=U?"nextSibling":"previousSibling";for(V=W?V:V[U];V;V=V[U]){if(V.nodeType==1||!f(V)){return V}}}}function G(U){return U&&U.nodeType==1&&U.getAttribute("data-mce-type")=="bookmark"}function t(Y,X){var U,W,V;function aa(ad,ac){if(ad.nodeName!=ac.nodeName){return Q}function ab(af){var ag={};M(c.getAttribs(af),function(ah){var ai=ah.nodeName.toLowerCase();if(ai.indexOf("_")!==0&&ai!=="style"){ag[ai]=c.getAttrib(af,ai)}});return ag}function ae(ai,ah){var ag,af;for(af in ai){if(ai.hasOwnProperty(af)){ag=ah[af];if(ag===o){return Q}if(ai[af]!=ag){return Q}delete ah[af]}}for(af in ah){if(ah.hasOwnProperty(af)){return Q}}return A}if(!ae(ab(ad),ab(ac))){return Q}if(!ae(c.parseStyle(c.getAttrib(ad,"style")),c.parseStyle(c.getAttrib(ac,"style")))){return Q}return A}if(Y&&X){function Z(ac,ab){for(W=ac;W;W=W[ab]){if(W.nodeType==3&&W.nodeValue.length!==0){return ac}if(W.nodeType==1&&!G(W)){return W}}return ac}Y=Z(Y,"previousSibling");X=Z(X,"nextSibling");if(aa(Y,X)){for(W=Y.nextSibling;W&&W!=X;){V=W;W=W.nextSibling;Y.appendChild(V)}c.remove(X);M(a.grep(X.childNodes),function(ab){Y.appendChild(ab)});return Y}}return X}function F(U){return/^(h[1-6]|p|div|pre|address|dl|dt|dd)$/.test(U)}function H(V,Y){var U,X,W;U=V[Y?"startContainer":"endContainer"];X=V[Y?"startOffset":"endOffset"];if(U.nodeType==1){W=U.childNodes.length-1;if(!Y&&X){X--}U=U.childNodes[X>W?W:X]}return U}function O(Z,V,Y){var W,U=N[Z],aa=N[Z=="apply"?"remove":"apply"];function ab(){return N.apply.length||N.remove.length}function X(){N.apply=[];N.remove=[]}function ac(ad){M(N.apply.reverse(),function(ae){R(ae.name,ae.vars,ad)});M(N.remove.reverse(),function(ae){z(ae.name,ae.vars,ad)});c.remove(ad,1);X()}for(W=U.length-1;W>=0;W--){if(U[W].name==V){return}}U.push({name:V,vars:Y});for(W=aa.length-1;W>=0;W--){if(aa[W].name==V){aa.splice(W,1)}}if(ab()){T.getDoc().execCommand("FontName",false,"mceinline");N.lastRng=p.getRng();M(c.select("font,span"),function(ae){var ad;if(b(ae)){ad=p.getBookmark();ac(ae);p.moveToBookmark(ad);T.nodeChanged()}});if(!N.isListening&&ab()){N.isListening=true;M("onKeyDown,onKeyUp,onKeyPress,onMouseUp".split(","),function(ad){T[ad].addToTop(function(ae,af){if(ab()&&!a.dom.RangeUtils.compareRanges(N.lastRng,p.getRng())){M(c.select("font,span"),function(ah){var ai,ag;if(b(ah)){ai=ah.firstChild;if(ai){ac(ah);ag=c.createRng();ag.setStart(ai,ai.nodeValue.length);ag.setEnd(ai,ai.nodeValue.length);p.setRng(ag);ae.nodeChanged()}else{c.remove(ah)}}});if(af.type=="keyup"||af.type=="mouseup"){X()}}})})}}}}})(tinymce);tinymce.onAddEditor.add(function(e,a){var d,h,g,c=a.settings;if(c.inline_styles){h=e.explode(c.font_size_style_values);function b(j,i){e.each(i,function(l,k){if(l){g.setStyle(j,k,l)}});g.rename(j,"span")}d={font:function(j,i){b(i,{backgroundColor:i.style.backgroundColor,color:i.color,fontFamily:i.face,fontSize:h[parseInt(i.size)-1]})},u:function(j,i){b(i,{textDecoration:"underline"})},strike:function(j,i){b(i,{textDecoration:"line-through"})}};function f(i,j){g=i.dom;if(c.convert_fonts_to_spans){e.each(g.select("font,u,strike",j.node),function(k){d[k.nodeName.toLowerCase()](a.dom,k)})}}a.onPreProcess.add(f);a.onSetContent.add(f);a.onInit.add(function(){a.selection.onSetContent.add(f)})}});tinyMCE.addI18n({en:{
common:{
edit_confirm:"Do you want to use the WYSIWYG mode for this textarea?",
apply:"Apply",
insert:"Insert",
update:"Update",
cancel:"Cancel",
close:"Close",
browse:"Browse",
class_name:"Class",
not_set:"-- Not set --",
clipboard_msg:"Copy/Cut/Paste is not available in Mozilla and Firefox.\nDo you want more information about this issue?",
clipboard_no_support:"Currently not supported by your browser, use keyboard shortcuts instead.",
popup_blocked:"Sorry, but we have noticed that your popup-blocker has disabled a window that provides application functionality. You will need to disable popup blocking on this site in order to fully utilize this tool.",
invalid_data:"{#field} is invalid",
invalid_data_number:"{#field} must be a number",
invalid_data_min:"{#field} must be a number greater than {#min}",
invalid_data_size:"{#field} must be a number or percentage",
more_colors:"More colors"
},
colors:{
'000000':'Black',
'993300':'Burnt orange',
'333300':'Dark olive',
'003300':'Dark green',
'003366':'Dark azure',
'000080':'Navy Blue',
'333399':'Indigo',
'333333':'Very dark gray',
'800000':'Maroon',
'FF6600':'Orange',
'808000':'Olive',
'008000':'Green',
'008080':'Teal',
'0000FF':'Blue',
'666699':'Grayish blue',
'808080':'Gray',
'FF0000':'Red',
'FF9900':'Amber',
'99CC00':'Yellow green',
'339966':'Sea green',
'33CCCC':'Turquoise',
'3366FF':'Royal blue',
'800080':'Purple',
'999999':'Medium gray',
'FF00FF':'Magenta',
'FFCC00':'Gold',
'FFFF00':'Yellow',
'00FF00':'Lime',
'00FFFF':'Aqua',
'00CCFF':'Sky blue',
'993366':'Brown',
'C0C0C0':'Silver',
'FF99CC':'Pink',
'FFCC99':'Peach',
'FFFF99':'Light yellow',
'CCFFCC':'Pale green',
'CCFFFF':'Pale cyan',
'99CCFF':'Light sky blue',
'CC99FF':'Plum',
'FFFFFF':'White'
},
contextmenu:{
align:"Alignment",
left:"Left",
center:"Center",
right:"Right",
full:"Full"
},
insertdatetime:{
date_fmt:"%Y-%m-%d",
time_fmt:"%H:%M:%S",
insertdate_desc:"Insert date",
inserttime_desc:"Insert time",
months_long:"January,February,March,April,May,June,July,August,September,October,November,December",
months_short:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec",
day_long:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday",
day_short:"Sun,Mon,Tue,Wed,Thu,Fri,Sat,Sun"
},
print:{
print_desc:"Print"
},
preview:{
preview_desc:"Preview"
},
directionality:{
ltr_desc:"Direction left to right",
rtl_desc:"Direction right to left"
},
layer:{
insertlayer_desc:"Insert new layer",
forward_desc:"Move forward",
backward_desc:"Move backward",
absolute_desc:"Toggle absolute positioning",
content:"New layer..."
},
save:{
save_desc:"Save",
cancel_desc:"Cancel all changes"
},
nonbreaking:{
nonbreaking_desc:"Insert non-breaking space character"
},
iespell:{
iespell_desc:"Run spell checking",
download:"ieSpell not detected. Do you want to install it now?"
},
advhr:{
advhr_desc:"Horizontal rule"
},
emotions:{
emotions_desc:"Emotions"
},
searchreplace:{
search_desc:"Find",
replace_desc:"Find/Replace"
},
advimage:{
image_desc:"Insert/edit image"
},
advlink:{
link_desc:"Insert/edit link"
},
xhtmlxtras:{
cite_desc:"Citation",
abbr_desc:"Abbreviation",
acronym_desc:"Acronym",
del_desc:"Deletion",
ins_desc:"Insertion",
attribs_desc:"Insert/Edit Attributes"
},
style:{
desc:"Edit CSS Style"
},
paste:{
paste_text_desc:"Paste as Plain Text",
paste_word_desc:"Paste from Word",
selectall_desc:"Select All",
plaintext_mode_sticky:"Paste is now in plain text mode. Click again to toggle back to regular paste mode. After you paste something you will be returned to regular paste mode.",
plaintext_mode:"Paste is now in plain text mode. Click again to toggle back to regular paste mode."
},
paste_dlg:{
text_title:"Use CTRL+V on your keyboard to paste the text into the window.",
text_linebreaks:"Keep linebreaks",
word_title:"Use CTRL+V on your keyboard to paste the text into the window."
},
table:{
desc:"Inserts a new table",
row_before_desc:"Insert row before",
row_after_desc:"Insert row after",
delete_row_desc:"Delete row",
col_before_desc:"Insert column before",
col_after_desc:"Insert column after",
delete_col_desc:"Remove column",
split_cells_desc:"Split merged table cells",
merge_cells_desc:"Merge table cells",
row_desc:"Table row properties",
cell_desc:"Table cell properties",
props_desc:"Table properties",
paste_row_before_desc:"Paste table row before",
paste_row_after_desc:"Paste table row after",
cut_row_desc:"Cut table row",
copy_row_desc:"Copy table row",
del:"Delete table",
row:"Row",
col:"Column",
cell:"Cell"
},
autosave:{
unload_msg:"The changes you made will be lost if you navigate away from this page.",
restore_content:"Restore auto-saved content.",
warning_message:"If you restore the saved content, you will lose all the content that is currently in the editor.\n\nAre you sure you want to restore the saved content?."
},
fullscreen:{
desc:"Toggle fullscreen mode"
},
media:{
desc:"Insert / edit embedded media",
edit:"Edit embedded media"
},
fullpage:{
desc:"Document properties"
},
template:{
desc:"Insert predefined template content"
},
visualchars:{
desc:"Visual control characters on/off."
},
spellchecker:{
desc:"Toggle spellchecker",
menu:"Spellchecker settings",
ignore_word:"Ignore word",
ignore_words:"Ignore all",
langs:"Languages",
wait:"Please wait...",
sug:"Suggestions",
no_sug:"No suggestions",
no_mpell:"No misspellings found."
},
pagebreak:{
desc:"Insert page break."
},
advlist:{
types:"Types",
def:"Default",
lower_alpha:"Lower alpha",
lower_greek:"Lower greek",
lower_roman:"Lower roman",
upper_alpha:"Upper alpha",
upper_roman:"Upper roman",
circle:"Circle",
disc:"Disc",
square:"Square"
},
aria:{
rich_text_area:"Rich Text Area"
},
wordcount:{
words: 'Words: '
}
}});/**
 * editor_template_src.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */

(function(tinymce) {
	var DOM = tinymce.DOM, Event = tinymce.dom.Event, extend = tinymce.extend, each = tinymce.each, Cookie = tinymce.util.Cookie, lastExtID, explode = tinymce.explode;

	// Tell it to load theme specific language pack(s)
	tinymce.ThemeManager.requireLangPack('advanced');

	tinymce.create('tinymce.themes.AdvancedTheme', {
		sizes : [8, 10, 12, 14, 18, 24, 36],

		// Control name lookup, format: title, command
		controls : {
			bold : ['bold_desc', 'Bold'],
			italic : ['italic_desc', 'Italic'],
			underline : ['underline_desc', 'Underline'],
			strikethrough : ['striketrough_desc', 'Strikethrough'],
			justifyleft : ['justifyleft_desc', 'JustifyLeft'],
			justifycenter : ['justifycenter_desc', 'JustifyCenter'],
			justifyright : ['justifyright_desc', 'JustifyRight'],
			justifyfull : ['justifyfull_desc', 'JustifyFull'],
			bullist : ['bullist_desc', 'InsertUnorderedList'],
			numlist : ['numlist_desc', 'InsertOrderedList'],
			outdent : ['outdent_desc', 'Outdent'],
			indent : ['indent_desc', 'Indent'],
			cut : ['cut_desc', 'Cut'],
			copy : ['copy_desc', 'Copy'],
			paste : ['paste_desc', 'Paste'],
			undo : ['undo_desc', 'Undo'],
			redo : ['redo_desc', 'Redo'],
			link : ['link_desc', 'mceLink'],
			unlink : ['unlink_desc', 'unlink'],
			image : ['image_desc', 'mceImage'],
			cleanup : ['cleanup_desc', 'mceCleanup'],
			help : ['help_desc', 'mceHelp'],
			code : ['code_desc', 'mceCodeEditor'],
			hr : ['hr_desc', 'InsertHorizontalRule'],
			removeformat : ['removeformat_desc', 'RemoveFormat'],
			sub : ['sub_desc', 'subscript'],
			sup : ['sup_desc', 'superscript'],
			forecolor : ['forecolor_desc', 'ForeColor'],
			forecolorpicker : ['forecolor_desc', 'mceForeColor'],
			backcolor : ['backcolor_desc', 'HiliteColor'],
			backcolorpicker : ['backcolor_desc', 'mceBackColor'],
			charmap : ['charmap_desc', 'mceCharMap'],
			visualaid : ['visualaid_desc', 'mceToggleVisualAid'],
			anchor : ['anchor_desc', 'mceInsertAnchor'],
			newdocument : ['newdocument_desc', 'mceNewDocument'],
			blockquote : ['blockquote_desc', 'mceBlockQuote']
		},

		stateControls : ['bold', 'italic', 'underline', 'strikethrough', 'bullist', 'numlist', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'sub', 'sup', 'blockquote'],

		init : function(ed, url) {
			var t = this, s, v, o;
	
			t.editor = ed;
			t.url = url;
			t.onResolveName = new tinymce.util.Dispatcher(this);

			ed.forcedHighContrastMode = ed.settings.detect_highcontrast && t._isHighContrast();
			ed.settings.skin = ed.forcedHighContrastMode ? 'highcontrast' : ed.settings.skin;

			// Default settings
			t.settings = s = extend({
				theme_advanced_path : true,
				theme_advanced_toolbar_location : 'bottom',
				theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect",
				theme_advanced_buttons2 : "bullist,numlist,|,outdent,indent,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code",
				theme_advanced_buttons3 : "hr,removeformat,visualaid,|,sub,sup,|,charmap",
				theme_advanced_blockformats : "p,address,pre,h1,h2,h3,h4,h5,h6",
				theme_advanced_toolbar_align : "center",
				theme_advanced_fonts : "Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats",
				theme_advanced_more_colors : 1,
				theme_advanced_row_height : 23,
				theme_advanced_resize_horizontal : 1,
				theme_advanced_resizing_use_cookie : 1,
				theme_advanced_font_sizes : "1,2,3,4,5,6,7",
				theme_advanced_font_selector : "span",
				readonly : ed.settings.readonly
			}, ed.settings);

			// Setup default font_size_style_values
			if (!s.font_size_style_values)
				s.font_size_style_values = "8pt,10pt,12pt,14pt,18pt,24pt,36pt";

			if (tinymce.is(s.theme_advanced_font_sizes, 'string')) {
				s.font_size_style_values = tinymce.explode(s.font_size_style_values);
				s.font_size_classes = tinymce.explode(s.font_size_classes || '');

				// Parse string value
				o = {};
				ed.settings.theme_advanced_font_sizes = s.theme_advanced_font_sizes;
				each(ed.getParam('theme_advanced_font_sizes', '', 'hash'), function(v, k) {
					var cl;

					if (k == v && v >= 1 && v <= 7) {
						k = v + ' (' + t.sizes[v - 1] + 'pt)';
						cl = s.font_size_classes[v - 1];
						v = s.font_size_style_values[v - 1] || (t.sizes[v - 1] + 'pt');
					}

					if (/^\s*\./.test(v))
						cl = v.replace(/\./g, '');

					o[k] = cl ? {'class' : cl} : {fontSize : v};
				});

				s.theme_advanced_font_sizes = o;
			}

			if ((v = s.theme_advanced_path_location) && v != 'none')
				s.theme_advanced_statusbar_location = s.theme_advanced_path_location;

			if (s.theme_advanced_statusbar_location == 'none')
				s.theme_advanced_statusbar_location = 0;

			if (ed.settings.content_css !== false)
				ed.contentCSS.push(ed.baseURI.toAbsolute(url + "/skins/" + ed.settings.skin + "/content.css"));

			// Init editor
			ed.onInit.add(function() {
				if (!ed.settings.readonly) {
					ed.onNodeChange.add(t._nodeChanged, t);
					ed.onKeyUp.add(t._updateUndoStatus, t);
					ed.onMouseUp.add(t._updateUndoStatus, t);
					ed.dom.bind(ed.dom.getRoot(), 'dragend', function() {
						t._updateUndoStatus(ed);
					});
				}
			});

			ed.onSetProgressState.add(function(ed, b, ti) {
				var co, id = ed.id, tb;

				if (b) {
					t.progressTimer = setTimeout(function() {
						co = ed.getContainer();
						co = co.insertBefore(DOM.create('DIV', {style : 'position:relative'}), co.firstChild);
						tb = DOM.get(ed.id + '_tbl');

						DOM.add(co, 'div', {id : id + '_blocker', 'class' : 'mceBlocker', style : {width : tb.clientWidth + 2, height : tb.clientHeight + 2}});
						DOM.add(co, 'div', {id : id + '_progress', 'class' : 'mceProgress', style : {left : tb.clientWidth / 2, top : tb.clientHeight / 2}});
					}, ti || 0);
				} else {
					DOM.remove(id + '_blocker');
					DOM.remove(id + '_progress');
					clearTimeout(t.progressTimer);
				}
			});

			DOM.loadCSS(s.editor_css ? ed.documentBaseURI.toAbsolute(s.editor_css) : url + "/skins/" + ed.settings.skin + "/ui.css");

			if (s.skin_variant)
				DOM.loadCSS(url + "/skins/" + ed.settings.skin + "/ui_" + s.skin_variant + ".css");
		},

		_isHighContrast : function() {
			var actualColor, div = DOM.add(DOM.getRoot(), 'div', {'style': 'background-color: rgb(171,239,86);'});

			actualColor = (DOM.getStyle(div, 'background-color', true) + '').toLowerCase().replace(/ /g, '');
			DOM.remove(div);

			return actualColor != 'rgb(171,239,86)' && actualColor != '#abef56';
		},

		createControl : function(n, cf) {
			var cd, c;

			if (c = cf.createControl(n))
				return c;

			switch (n) {
				case "styleselect":
					return this._createStyleSelect();

				case "formatselect":
					return this._createBlockFormats();

				case "fontselect":
					return this._createFontSelect();

				case "fontsizeselect":
					return this._createFontSizeSelect();

				case "forecolor":
					return this._createForeColorMenu();

				case "backcolor":
					return this._createBackColorMenu();
			}

			if ((cd = this.controls[n]))
				return cf.createButton(n, {title : "advanced." + cd[0], cmd : cd[1], ui : cd[2], value : cd[3]});
		},

		execCommand : function(cmd, ui, val) {
			var f = this['_' + cmd];

			if (f) {
				f.call(this, ui, val);
				return true;
			}

			return false;
		},

		_importClasses : function(e) {
			var ed = this.editor, ctrl = ed.controlManager.get('styleselect');

			if (ctrl.getLength() == 0) {
				each(ed.dom.getClasses(), function(o, idx) {
					var name = 'style_' + idx;

					ed.formatter.register(name, {
						inline : 'span',
						attributes : {'class' : o['class']},
						selector : '*'
					});

					ctrl.add(o['class'], name);
				});
			}
		},

		_createStyleSelect : function(n) {
			var t = this, ed = t.editor, ctrlMan = ed.controlManager, ctrl;

			// Setup style select box
			ctrl = ctrlMan.createListBox('styleselect', {
				title : 'advanced.style_select',
				onselect : function(name) {
					var matches, formatNames = [];

					each(ctrl.items, function(item) {
						formatNames.push(item.value);
					});

					ed.focus();
					ed.undoManager.add();

					// Toggle off the current format
					matches = ed.formatter.matchAll(formatNames);
					if (!name || matches[0] == name) {
						if (matches[0]) 
							ed.formatter.remove(matches[0]);
					} else
						ed.formatter.apply(name);

					ed.undoManager.add();
					ed.nodeChanged();

					return false; // No auto select
				}
			});

			// Handle specified format
			ed.onInit.add(function() {
				var counter = 0, formats = ed.getParam('style_formats');

				if (formats) {
					each(formats, function(fmt) {
						var name, keys = 0;

						each(fmt, function() {keys++;});

						if (keys > 1) {
							name = fmt.name = fmt.name || 'style_' + (counter++);
							ed.formatter.register(name, fmt);
							ctrl.add(fmt.title, name);
						} else
							ctrl.add(fmt.title);
					});
				} else {
					each(ed.getParam('theme_advanced_styles', '', 'hash'), function(val, key) {
						var name;

						if (val) {
							name = 'style_' + (counter++);

							ed.formatter.register(name, {
								inline : 'span',
								classes : val,
								selector : '*'
							});

							ctrl.add(t.editor.translate(key), name);
						}
					});
				}
			});

			// Auto import classes if the ctrl box is empty
			if (ctrl.getLength() == 0) {
				ctrl.onPostRender.add(function(ed, n) {
					if (!ctrl.NativeListBox) {
						Event.add(n.id + '_text', 'focus', t._importClasses, t);
						Event.add(n.id + '_text', 'mousedown', t._importClasses, t);
						Event.add(n.id + '_open', 'focus', t._importClasses, t);
						Event.add(n.id + '_open', 'mousedown', t._importClasses, t);
					} else
						Event.add(n.id, 'focus', t._importClasses, t);
				});
			}

			return ctrl;
		},

		_createFontSelect : function() {
			var c, t = this, ed = t.editor;

			c = ed.controlManager.createListBox('fontselect', {
				title : 'advanced.fontdefault',
				onselect : function(v) {
					var cur = c.items[c.selectedIndex];

					if (!v && cur) {
						ed.execCommand('FontName', false, cur.value);
						return;
					}

					ed.execCommand('FontName', false, v);

					// Fake selection, execCommand will fire a nodeChange and update the selection
					c.select(function(sv) {
						return v == sv;
					});

					return false; // No auto select
				}
			});

			if (c) {
				each(ed.getParam('theme_advanced_fonts', t.settings.theme_advanced_fonts, 'hash'), function(v, k) {
					c.add(ed.translate(k), v, {style : v.indexOf('dings') == -1 ? 'font-family:' + v : ''});
				});
			}

			return c;
		},

		_createFontSizeSelect : function() {
			var t = this, ed = t.editor, c, i = 0, cl = [];

			c = ed.controlManager.createListBox('fontsizeselect', {title : 'advanced.font_size', onselect : function(v) {
				var cur = c.items[c.selectedIndex];

				if (!v && cur) {
					cur = cur.value;

					if (cur['class']) {
						ed.formatter.toggle('fontsize_class', {value : cur['class']});
						ed.undoManager.add();
						ed.nodeChanged();
					} else {
						ed.execCommand('FontSize', false, cur.fontSize);
					}

					return;
				}

				if (v['class']) {
					ed.focus();
					ed.undoManager.add();
					ed.formatter.toggle('fontsize_class', {value : v['class']});
					ed.undoManager.add();
					ed.nodeChanged();
				} else
					ed.execCommand('FontSize', false, v.fontSize);

				// Fake selection, execCommand will fire a nodeChange and update the selection
				c.select(function(sv) {
					return v == sv;
				});

				return false; // No auto select
			}});

			if (c) {
				each(t.settings.theme_advanced_font_sizes, function(v, k) {
					var fz = v.fontSize;

					if (fz >= 1 && fz <= 7)
						fz = t.sizes[parseInt(fz) - 1] + 'pt';

					c.add(k, v, {'style' : 'font-size:' + fz, 'class' : 'mceFontSize' + (i++) + (' ' + (v['class'] || ''))});
				});
			}

			return c;
		},

		_createBlockFormats : function() {
			var c, fmts = {
				p : 'advanced.paragraph',
				address : 'advanced.address',
				pre : 'advanced.pre',
				h1 : 'advanced.h1',
				h2 : 'advanced.h2',
				h3 : 'advanced.h3',
				h4 : 'advanced.h4',
				h5 : 'advanced.h5',
				h6 : 'advanced.h6',
				div : 'advanced.div',
				blockquote : 'advanced.blockquote',
				code : 'advanced.code',
				dt : 'advanced.dt',
				dd : 'advanced.dd',
				samp : 'advanced.samp'
			}, t = this;

			c = t.editor.controlManager.createListBox('formatselect', {title : 'advanced.block', cmd : 'FormatBlock'});
			if (c) {
				each(t.editor.getParam('theme_advanced_blockformats', t.settings.theme_advanced_blockformats, 'hash'), function(v, k) {
					c.add(t.editor.translate(k != v ? k : fmts[v]), v, {'class' : 'mce_formatPreview mce_' + v});
				});
			}

			return c;
		},

		_createForeColorMenu : function() {
			var c, t = this, s = t.settings, o = {}, v;

			if (s.theme_advanced_more_colors) {
				o.more_colors_func = function() {
					t._mceColorPicker(0, {
						color : c.value,
						func : function(co) {
							c.setColor(co);
						}
					});
				};
			}

			if (v = s.theme_advanced_text_colors)
				o.colors = v;

			if (s.theme_advanced_default_foreground_color)
				o.default_color = s.theme_advanced_default_foreground_color;

			o.title = 'advanced.forecolor_desc';
			o.cmd = 'ForeColor';
			o.scope = this;

			c = t.editor.controlManager.createColorSplitButton('forecolor', o);

			return c;
		},

		_createBackColorMenu : function() {
			var c, t = this, s = t.settings, o = {}, v;

			if (s.theme_advanced_more_colors) {
				o.more_colors_func = function() {
					t._mceColorPicker(0, {
						color : c.value,
						func : function(co) {
							c.setColor(co);
						}
					});
				};
			}

			if (v = s.theme_advanced_background_colors)
				o.colors = v;

			if (s.theme_advanced_default_background_color)
				o.default_color = s.theme_advanced_default_background_color;

			o.title = 'advanced.backcolor_desc';
			o.cmd = 'HiliteColor';
			o.scope = this;

			c = t.editor.controlManager.createColorSplitButton('backcolor', o);

			return c;
		},

		renderUI : function(o) {
			var n, ic, tb, t = this, ed = t.editor, s = t.settings, sc, p, nl;

			if (ed.settings) {
				ed.settings.aria_label = s.aria_label + ed.getLang('advanced.help_shortcut');
			}

			// TODO: ACC Should have an aria-describedby attribute which is user-configurable to describe what this field is actually for.
			// Maybe actually inherit it from the original textara?
			n = p = DOM.create('span', {role : 'application', 'aria-labelledby' : ed.id + '_voice', id : ed.id + '_parent', 'class' : 'mceEditor ' + ed.settings.skin + 'Skin' + (s.skin_variant ? ' ' + ed.settings.skin + 'Skin' + t._ufirst(s.skin_variant) : '')});
			DOM.add(n, 'span', {'class': 'mceVoiceLabel', 'style': 'display:none;', id: ed.id + '_voice'}, s.aria_label);

			if (!DOM.boxModel)
				n = DOM.add(n, 'div', {'class' : 'mceOldBoxModel'});

			n = sc = DOM.add(n, 'table', {role : "presentation", id : ed.id + '_tbl', 'class' : 'mceLayout', cellSpacing : 0, cellPadding : 0});
			n = tb = DOM.add(n, 'tbody');

			switch ((s.theme_advanced_layout_manager || '').toLowerCase()) {
				case "rowlayout":
					ic = t._rowLayout(s, tb, o);
					break;

				case "customlayout":
					ic = ed.execCallback("theme_advanced_custom_layout", s, tb, o, p);
					break;

				default:
					ic = t._simpleLayout(s, tb, o, p);
			}

			n = o.targetNode;

			// Add classes to first and last TRs
			nl = sc.rows;
			DOM.addClass(nl[0], 'mceFirst');
			DOM.addClass(nl[nl.length - 1], 'mceLast');

			// Add classes to first and last TDs
			each(DOM.select('tr', tb), function(n) {
				DOM.addClass(n.firstChild, 'mceFirst');
				DOM.addClass(n.childNodes[n.childNodes.length - 1], 'mceLast');
			});

			if (DOM.get(s.theme_advanced_toolbar_container))
				DOM.get(s.theme_advanced_toolbar_container).appendChild(p);
			else
				DOM.insertAfter(p, n);

			Event.add(ed.id + '_path_row', 'click', function(e) {
				e = e.target;

				if (e.nodeName == 'A') {
					t._sel(e.className.replace(/^.*mcePath_([0-9]+).*$/, '$1'));

					return Event.cancel(e);
				}
			});
/*
			if (DOM.get(ed.id + '_path_row')) {
				Event.add(ed.id + '_tbl', 'mouseover', function(e) {
					var re;
	
					e = e.target;

					if (e.nodeName == 'SPAN' && DOM.hasClass(e.parentNode, 'mceButton')) {
						re = DOM.get(ed.id + '_path_row');
						t.lastPath = re.innerHTML;
						DOM.setHTML(re, e.parentNode.title);
					}
				});

				Event.add(ed.id + '_tbl', 'mouseout', function(e) {
					if (t.lastPath) {
						DOM.setHTML(ed.id + '_path_row', t.lastPath);
						t.lastPath = 0;
					}
				});
			}
*/

			if (!ed.getParam('accessibility_focus'))
				Event.add(DOM.add(p, 'a', {href : '#'}, '<!-- IE -->'), 'focus', function() {tinyMCE.get(ed.id).focus();});

            if (s.theme_advanced_toolbar_location == 'external' 
                || s.theme_advanced_toolbar_location == 'docked') {
				o.deltaHeight = 0;
            }

			t.deltaHeight = o.deltaHeight;
			o.targetNode = null;

			ed.onKeyDown.add(function(ed, evt) {
				var DOM_VK_F10 = 121, DOM_VK_F11 = 122;

				if (evt.altKey) {
		 			if (evt.keyCode === DOM_VK_F10) {
						t.toolbarGroup.focus();
						return Event.cancel(evt);
					} else if (evt.keyCode === DOM_VK_F11) {
						DOM.get(ed.id + '_path_row').focus();
						return Event.cancel(evt);
					}
				}
			});

			// alt+0 is the UK recommended shortcut for accessing the list of access controls.
			ed.addShortcut('alt+0', '', 'mceShortcuts', t);

			return {
				iframeContainer : ic,
				editorContainer : ed.id + '_parent',
				sizeContainer : sc,
				deltaHeight : o.deltaHeight
			};
		},

		getInfo : function() {
			return {
				longname : 'Advanced theme',
				author : 'Moxiecode Systems AB',
				authorurl : 'http://tinymce.moxiecode.com',
				version : tinymce.majorVersion + "." + tinymce.minorVersion
			}
		},

		resizeBy : function(dw, dh) {
			var e = DOM.get(this.editor.id + '_ifr');

			this.resizeTo(e.clientWidth + dw, e.clientHeight + dh);
		},

		resizeTo : function(w, h, store) {
			var ed = this.editor, s = this.settings, e = DOM.get(ed.id + '_tbl'), ifr = DOM.get(ed.id + '_ifr');

			// Boundery fix box
			w = Math.max(s.theme_advanced_resizing_min_width || 100, w);
			h = Math.max(s.theme_advanced_resizing_min_height || 100, h);
			w = Math.min(s.theme_advanced_resizing_max_width || 0xFFFF, w);
			h = Math.min(s.theme_advanced_resizing_max_height || 0xFFFF, h);

			// Resize iframe and container
			DOM.setStyle(e, 'height', '');
			DOM.setStyle(ifr, 'height', h);

			if (s.theme_advanced_resize_horizontal) {
				DOM.setStyle(e, 'width', '');
				DOM.setStyle(ifr, 'width', w);

				// Make sure that the size is never smaller than the over all ui
				if (w < e.clientWidth) {
					w = e.clientWidth;
					DOM.setStyle(ifr, 'width', e.clientWidth);
				}
			}

			// Store away the size
			if (store && s.theme_advanced_resizing_use_cookie) {
				Cookie.setHash("TinyMCE_" + ed.id + "_size", {
					cw : w,
					ch : h
				});
			}
		},

		destroy : function() {
			var id = this.editor.id;

			Event.clear(id + '_resize');
			Event.clear(id + '_path_row');
			Event.clear(id + '_external_close');
		},

		// Internal functions

		_simpleLayout : function(s, tb, o, p) {
			var t = this, ed = t.editor, lo = s.theme_advanced_toolbar_location, sl = s.theme_advanced_statusbar_location, n, ic, etb, c;

			if (s.readonly) {
				n = DOM.add(tb, 'tr');
				n = ic = DOM.add(n, 'td', {'class' : 'mceIframeContainer'});
				return ic;
			}

			// Create toolbar container at top
			if (lo == 'top') {
				t._addToolbars(tb, o);
            }
            // Create docked toolbar 
            if (lo == 'docked') {
                n = c = DOM.create('div', {
                    style: 'position:relative'
                });
                n = DOM.add(n, 'div', {
                    id: ed.id + '_external'
                });
                n = DOM.add(n, 'table', {
                    id: ed.id + '_tblext',
                    cellSpacing: 0,
                    cellPadding: 0
                });
                etb = DOM.add(n, 'tbody');
                var el = document.getElementById(s.theme_penzu_toolbar_location_docked_element_id);
                if (el != null) {
                    el.className = "mceEditor " + ed.settings.skin + "Skin";
                    el.appendChild(c);
                }
                t._addToolbars(etb, o);
            }
			// Create external toolbar
			if (lo == 'external') {
				n = c = DOM.create('div', {style : 'position:relative'});
				n = DOM.add(n, 'div', {id : ed.id + '_external', 'class' : 'mceExternalToolbar'});
				DOM.add(n, 'a', {id : ed.id + '_external_close', href : 'javascript:;', 'class' : 'mceExternalClose'});
				n = DOM.add(n, 'table', {id : ed.id + '_tblext', cellSpacing : 0, cellPadding : 0});
				etb = DOM.add(n, 'tbody');

				if (p.firstChild.className == 'mceOldBoxModel')
					p.firstChild.appendChild(c);
				else
					p.insertBefore(c, p.firstChild);

				t._addToolbars(etb, o);

				ed.onMouseUp.add(function() {
					var e = DOM.get(ed.id + '_external');
					DOM.show(e);

					DOM.hide(lastExtID);

					var f = Event.add(ed.id + '_external_close', 'click', function() {
						DOM.hide(ed.id + '_external');
						Event.remove(ed.id + '_external_close', 'click', f);
					});

					DOM.show(e);
					DOM.setStyle(e, 'top', 0 - DOM.getRect(ed.id + '_tblext').h - 1);

					// Fixes IE rendering bug
					DOM.hide(e);
					DOM.show(e);
					e.style.filter = '';

					lastExtID = ed.id + '_external';

					e = null;
				});
			}

			if (sl == 'top')
				t._addStatusBar(tb, o);

			// Create iframe container
			if (!s.theme_advanced_toolbar_container) {
				n = DOM.add(tb, 'tr');
				n = ic = DOM.add(n, 'td', {'class' : 'mceIframeContainer'});
			}

			// Create toolbar container at bottom
			if (lo == 'bottom')
				t._addToolbars(tb, o);

			if (sl == 'bottom')
				t._addStatusBar(tb, o);

			return ic;
		},

		_rowLayout : function(s, tb, o) {
			var t = this, ed = t.editor, dc, da, cf = ed.controlManager, n, ic, to, a;

			dc = s.theme_advanced_containers_default_class || '';
			da = s.theme_advanced_containers_default_align || 'center';

			each(explode(s.theme_advanced_containers || ''), function(c, i) {
				var v = s['theme_advanced_container_' + c] || '';

				switch (v.toLowerCase()) {
					case 'mceeditor':
						n = DOM.add(tb, 'tr');
						n = ic = DOM.add(n, 'td', {'class' : 'mceIframeContainer'});
						break;

					case 'mceelementpath':
						t._addStatusBar(tb, o);
						break;

					default:
						a = (s['theme_advanced_container_' + c + '_align'] || da).toLowerCase();
						a = 'mce' + t._ufirst(a);

						n = DOM.add(DOM.add(tb, 'tr'), 'td', {
							'class' : 'mceToolbar ' + (s['theme_advanced_container_' + c + '_class'] || dc) + ' ' + a || da
						});

						to = cf.createToolbar("toolbar" + i);
						t._addControls(v, to);
						DOM.setHTML(n, to.renderHTML());
						o.deltaHeight -= s.theme_advanced_row_height;
				}
			});

			return ic;
		},

		_addControls : function(v, tb) {
			var t = this, s = t.settings, di, cf = t.editor.controlManager;

			if (s.theme_advanced_disable && !t._disabled) {
				di = {};

				each(explode(s.theme_advanced_disable), function(v) {
					di[v] = 1;
				});

				t._disabled = di;
			} else
				di = t._disabled;

			each(explode(v), function(n) {
				var c;

				if (di && di[n])
					return;

				// Compatiblity with 2.x
				if (n == 'tablecontrols') {
					each(["table","|","row_props","cell_props","|","row_before","row_after","delete_row","|","col_before","col_after","delete_col","|","split_cells","merge_cells"], function(n) {
						n = t.createControl(n, cf);

						if (n)
							tb.add(n);
					});

					return;
				}

				c = t.createControl(n, cf);

				if (c)
					tb.add(c);
			});
		},

		_addToolbars : function(c, o) {
			var t = this, i, tb, ed = t.editor, s = t.settings, v, cf = ed.controlManager, di, n, h = [], a, toolbarGroup;

			toolbarGroup = cf.createToolbarGroup('toolbargroup', {
				'name': ed.getLang('advanced.toolbar'),
				'tab_focus_toolbar':ed.getParam('theme_advanced_tab_focus_toolbar')
			});

			t.toolbarGroup = toolbarGroup;

			a = s.theme_advanced_toolbar_align.toLowerCase();
			a = 'mce' + t._ufirst(a);

			n = DOM.add(DOM.add(c, 'tr', {role: 'presentation'}), 'td', {'class' : 'mceToolbar ' + a, "role":"presentation"});

			// Create toolbar and add the controls
			for (i=1; (v = s['theme_advanced_buttons' + i]); i++) {
				tb = cf.createToolbar("toolbar" + i, {'class' : 'mceToolbarRow' + i});

				if (s['theme_advanced_buttons' + i + '_add'])
					v += ',' + s['theme_advanced_buttons' + i + '_add'];

				if (s['theme_advanced_buttons' + i + '_add_before'])
					v = s['theme_advanced_buttons' + i + '_add_before'] + ',' + v;

				t._addControls(v, tb);
				toolbarGroup.add(tb);

				o.deltaHeight -= s.theme_advanced_row_height;
			}
			h.push(toolbarGroup.renderHTML());
			h.push(DOM.createHTML('a', {href : '#', accesskey : 'z', title : ed.getLang("advanced.toolbar_focus"), onfocus : 'tinyMCE.getInstanceById(\'' + ed.id + '\').focus();'}, '<!-- IE -->'));
			DOM.setHTML(n, h.join(''));
		},

		_addStatusBar : function(tb, o) {
			var n, t = this, ed = t.editor, s = t.settings, r, mf, me, td;

			n = DOM.add(tb, 'tr');
			n = td = DOM.add(n, 'td', {'class' : 'mceStatusbar'}); 
			n = DOM.add(n, 'div', {id : ed.id + '_path_row', 'role': 'group', 'aria-labelledby': ed.id + '_path_voice'});
			if (s.theme_advanced_path) {
				DOM.add(n, 'span', {id: ed.id + '_path_voice'}, ed.translate('advanced.path'));
				DOM.add(n, 'span', {}, ': ');
			} else {
				DOM.add(n, 'span', {}, '&#160;');
			}
			

			if (s.theme_advanced_resizing) {
				DOM.add(td, 'a', {id : ed.id + '_resize', href : 'javascript:;', onclick : "return false;", 'class' : 'mceResize'});

				if (s.theme_advanced_resizing_use_cookie) {
					ed.onPostRender.add(function() {
						var o = Cookie.getHash("TinyMCE_" + ed.id + "_size"), c = DOM.get(ed.id + '_tbl');

						if (!o)
							return;

						t.resizeTo(o.cw, o.ch);
					});
				}

				ed.onPostRender.add(function() {
					Event.add(ed.id + '_resize', 'click', function(e) {
						e.preventDefault();
					});

					Event.add(ed.id + '_resize', 'mousedown', function(e) {
						var mouseMoveHandler1, mouseMoveHandler2,
							mouseUpHandler1, mouseUpHandler2,
							startX, startY, startWidth, startHeight, width, height, ifrElm;

						function resizeOnMove(e) {
							e.preventDefault();

							width = startWidth + (e.screenX - startX);
							height = startHeight + (e.screenY - startY);

							t.resizeTo(width, height);
						};

						function endResize(e) {
							// Stop listening
							Event.remove(DOM.doc, 'mousemove', mouseMoveHandler1);
							Event.remove(ed.getDoc(), 'mousemove', mouseMoveHandler2);
							Event.remove(DOM.doc, 'mouseup', mouseUpHandler1);
							Event.remove(ed.getDoc(), 'mouseup', mouseUpHandler2);

							width = startWidth + (e.screenX - startX);
							height = startHeight + (e.screenY - startY);
							t.resizeTo(width, height, true);
						};

						e.preventDefault();

						// Get the current rect size
						startX = e.screenX;
						startY = e.screenY;
						ifrElm = DOM.get(t.editor.id + '_ifr');
						startWidth = width = ifrElm.clientWidth;
						startHeight = height = ifrElm.clientHeight;

						// Register envent handlers
						mouseMoveHandler1 = Event.add(DOM.doc, 'mousemove', resizeOnMove);
						mouseMoveHandler2 = Event.add(ed.getDoc(), 'mousemove', resizeOnMove);
						mouseUpHandler1 = Event.add(DOM.doc, 'mouseup', endResize);
						mouseUpHandler2 = Event.add(ed.getDoc(), 'mouseup', endResize);
					});
				});
			}

			o.deltaHeight -= 21;
			n = tb = null;
		},

		_updateUndoStatus : function(ed) {
			var cm = ed.controlManager;

			cm.setDisabled('undo', !ed.undoManager.hasUndo() && !ed.typing);
			cm.setDisabled('redo', !ed.undoManager.hasRedo());
		},

		_nodeChanged : function(ed, cm, n, co, ob) {
			var t = this, p, de = 0, v, c, s = t.settings, cl, fz, fn, formatNames, matches;

			tinymce.each(t.stateControls, function(c) {
				cm.setActive(c, ed.queryCommandState(t.controls[c][1]));
			});

			function getParent(name) {
				var i, parents = ob.parents, func = name;

				if (typeof(name) == 'string') {
					func = function(node) {
						return node.nodeName == name;
					};
				}

				for (i = 0; i < parents.length; i++) {
					if (func(parents[i]))
						return parents[i];
				}
			};

			cm.setActive('visualaid', ed.hasVisual);
			cm.setDisabled('undo', !ed.undoManager.hasUndo() && !ed.typing);
			cm.setDisabled('redo', !ed.undoManager.hasRedo());
			cm.setDisabled('outdent', !ed.queryCommandState('Outdent'));

			p = getParent('A');
			if (c = cm.get('link')) {
				if (!p || !p.name) {
					c.setDisabled(!p && co);
					c.setActive(!!p);
				}
			}

			if (c = cm.get('unlink')) {
				c.setDisabled(!p && co);
				c.setActive(!!p && !p.name);
			}

			if (c = cm.get('anchor')) {
				c.setActive(!co && !!p && p.name);
			}

			p = getParent('IMG');
			if (c = cm.get('image'))
				c.setActive(!co && !!p && n.className.indexOf('mceItem') == -1);

			if (c = cm.get('styleselect')) {
				t._importClasses();

				formatNames = [];
				each(c.items, function(item) {
					formatNames.push(item.value);
				});

				matches = ed.formatter.matchAll(formatNames);
				c.select(matches[0]);
			}

			if (c = cm.get('formatselect')) {
				p = getParent(DOM.isBlock);

				if (p)
					c.select(p.nodeName.toLowerCase());
			}

			// Find out current fontSize, fontFamily and fontClass
			getParent(function(n) {
				if (n.nodeName === 'SPAN') {
					if (!cl && n.className)
						cl = n.className;
				}

				if (ed.dom.is(n, s.theme_advanced_font_selector)) {
					if (!fz && n.style.fontSize)
						fz = n.style.fontSize;

					if (!fn && n.style.fontFamily)
						fn = n.style.fontFamily.replace(/[\"\']+/g, '').replace(/^([^,]+).*/, '$1').toLowerCase();
				}

				return false;
			});

			if (c = cm.get('fontselect')) {
				c.select(function(v) {
					return v.replace(/^([^,]+).*/, '$1').toLowerCase() == fn;
				});
			}

			// Select font size
			if (c = cm.get('fontsizeselect')) {
				// Use computed style
				if (s.theme_advanced_runtime_fontsize && !fz && !cl)
					fz = ed.dom.getStyle(n, 'fontSize', true);

				c.select(function(v) {
					if (v.fontSize && v.fontSize === fz)
						return true;

					if (v['class'] && v['class'] === cl)
						return true;
				});
			}

			if (s.theme_advanced_show_current_color) {
				function updateColor(controlId, color) {
					if (c = cm.get(controlId)) {
						if (!color)
							color = c.settings.default_color;
						if (color !== c.value) {
							c.displayColor(color);
						}
					}
				};

				updateColor('forecolor', fc);
				updateColor('backcolor', bc);
			}

			if (s.theme_advanced_path && s.theme_advanced_statusbar_location) {
				p = DOM.get(ed.id + '_path') || DOM.add(ed.id + '_path_row', 'span', {id : ed.id + '_path'});

				if (t.statusKeyboardNavigation) {
					t.statusKeyboardNavigation.destroy();
					t.statusKeyboardNavigation = null;
				}

				DOM.setHTML(p, '');

				getParent(function(n) {
					var na = n.nodeName.toLowerCase(), u, pi, ti = '';

					if (n.getAttribute('data-mce-bogus'))
						return;

					// Ignore non element and hidden elements
					if (n.nodeType != 1 || n.nodeName === 'BR' || (DOM.hasClass(n, 'mceItemHidden') || DOM.hasClass(n, 'mceItemRemoved')))
						return;

					// Handle prefix
					if (tinymce.isIE && n.scopeName !== 'HTML')
						na = n.scopeName + ':' + na;

					// Remove internal prefix
					na = na.replace(/mce\:/g, '');

					// Handle node name
					switch (na) {
						case 'b':
							na = 'strong';
							break;

						case 'i':
							na = 'em';
							break;

						case 'img':
							if (v = DOM.getAttrib(n, 'src'))
								ti += 'src: ' + v + ' ';

							break;

						case 'a':
							if (v = DOM.getAttrib(n, 'name')) {
								ti += 'name: ' + v + ' ';
								na += '#' + v;
							}

							if (v = DOM.getAttrib(n, 'href'))
								ti += 'href: ' + v + ' ';

							break;

						case 'font':
							if (v = DOM.getAttrib(n, 'face'))
								ti += 'font: ' + v + ' ';

							if (v = DOM.getAttrib(n, 'size'))
								ti += 'size: ' + v + ' ';

							if (v = DOM.getAttrib(n, 'color'))
								ti += 'color: ' + v + ' ';

							break;

						case 'span':
							if (v = DOM.getAttrib(n, 'style'))
								ti += 'style: ' + v + ' ';

							break;
					}

					if (v = DOM.getAttrib(n, 'id'))
						ti += 'id: ' + v + ' ';

					if (v = n.className) {
						v = v.replace(/\b\s*(webkit|mce|Apple-)\w+\s*\b/g, '')

						if (v) {
							ti += 'class: ' + v + ' ';

							if (DOM.isBlock(n) || na == 'img' || na == 'span')
								na += '.' + v;
						}
					}

					na = na.replace(/(html:)/g, '');
					na = {name : na, node : n, title : ti};
					t.onResolveName.dispatch(t, na);
					ti = na.title;
					na = na.name;

					//u = "javascript:tinymce.EditorManager.get('" + ed.id + "').theme._sel('" + (de++) + "');";
					pi = DOM.create('a', {'href' : "javascript:;", role: 'button', onmousedown : "return false;", title : ti, 'class' : 'mcePath_' + (de++)}, na);

					if (p.hasChildNodes()) {
						p.insertBefore(DOM.create('span', {'aria-hidden': 'true'}, '\u00a0\u00bb '), p.firstChild);
						p.insertBefore(pi, p.firstChild);
					} else
						p.appendChild(pi);
				}, ed.getBody());

				if (DOM.select('a', p).length > 0) {
					t.statusKeyboardNavigation = new tinymce.ui.KeyboardNavigation({
						root: ed.id + "_path_row",
						items: DOM.select('a', p),
						excludeFromTabOrder: true,
						onCancel: function() {
							ed.focus();
						}
					}, DOM);
				}
			}
		},

		// Commands gets called by execCommand

		_sel : function(v) {
			this.editor.execCommand('mceSelectNodeDepth', false, v);
		},

		_mceInsertAnchor : function(ui, v) {
			var ed = this.editor;

			ed.windowManager.open({
				url : this.url + '/anchor.htm',
				width : 320 + parseInt(ed.getLang('advanced.anchor_delta_width', 0)),
				height : 90 + parseInt(ed.getLang('advanced.anchor_delta_height', 0)),
				inline : true
			}, {
				theme_url : this.url
			});
		},

		_mceCharMap : function() {
			var ed = this.editor;

			ed.windowManager.open({
				url : this.url + '/charmap.htm',
				width : 550 + parseInt(ed.getLang('advanced.charmap_delta_width', 0)),
				height : 250 + parseInt(ed.getLang('advanced.charmap_delta_height', 0)),
				inline : true
			}, {
				theme_url : this.url
			});
		},

		_mceHelp : function() {
			var ed = this.editor;

			ed.windowManager.open({
				url : this.url + '/about.htm',
				width : 480,
				height : 380,
				inline : true
			}, {
				theme_url : this.url
			});
		},

		_mceShortcuts : function() {
			var ed = this.editor;
			ed.windowManager.open({
				url: this.url + '/shortcuts.htm',
				width: 480,
				height: 380,
				inline: true
			}, {
				theme_url: this.url
			});
		},

		_mceColorPicker : function(u, v) {
			var ed = this.editor;

			v = v || {};

			ed.windowManager.open({
				url : this.url + '/color_picker.htm',
				width : 375 + parseInt(ed.getLang('advanced.colorpicker_delta_width', 0)),
				height : 250 + parseInt(ed.getLang('advanced.colorpicker_delta_height', 0)),
				close_previous : false,
				inline : true
			}, {
				input_color : v.color,
				func : v.func,
				theme_url : this.url
			});
		},

		_mceCodeEditor : function(ui, val) {
			var ed = this.editor;

			ed.windowManager.open({
				url : this.url + '/source_editor.htm',
				width : parseInt(ed.getParam("theme_advanced_source_editor_width", 720)),
				height : parseInt(ed.getParam("theme_advanced_source_editor_height", 580)),
				inline : true,
				resizable : true,
				maximizable : true
			}, {
				theme_url : this.url
			});
		},

		_mceImage : function(ui, val) {
			var ed = this.editor;

			// Internal image object like a flash placeholder
			if (ed.dom.getAttrib(ed.selection.getNode(), 'class').indexOf('mceItem') != -1)
				return;

			ed.windowManager.open({
				url : this.url + '/image.htm',
				width : 355 + parseInt(ed.getLang('advanced.image_delta_width', 0)),
				height : 275 + parseInt(ed.getLang('advanced.image_delta_height', 0)),
				inline : true
			}, {
				theme_url : this.url
			});
		},

		_mceLink : function(ui, val) {
			var ed = this.editor;

			ed.windowManager.open({
				url : this.url + '/link.htm',
				width : 310 + parseInt(ed.getLang('advanced.link_delta_width', 0)),
				height : 200 + parseInt(ed.getLang('advanced.link_delta_height', 0)),
				inline : true
			}, {
				theme_url : this.url
			});
		},

		_mceNewDocument : function() {
			var ed = this.editor;

			ed.windowManager.confirm('advanced.newdocument', function(s) {
				if (s)
					ed.execCommand('mceSetContent', false, '');
			});
		},

		_mceForeColor : function() {
			var t = this;

			this._mceColorPicker(0, {
				color: t.fgColor,
				func : function(co) {
					t.fgColor = co;
					t.editor.execCommand('ForeColor', false, co);
				}
			});
		},

		_mceBackColor : function() {
			var t = this;

			this._mceColorPicker(0, {
				color: t.bgColor,
				func : function(co) {
					t.bgColor = co;
					t.editor.execCommand('HiliteColor', false, co);
				}
			});
		},

		_ufirst : function(s) {
			return s.substring(0, 1).toUpperCase() + s.substring(1);
		}
	});

	tinymce.ThemeManager.add('advanced', tinymce.themes.AdvancedTheme);
}(tinymce));
tinyMCE.addI18n('en.advanced',{
style_select:"Styles",
font_size:"Font size",
fontdefault:"Font family",
block:"Format",
paragraph:"Paragraph",
div:"Div",
address:"Address",
pre:"Preformatted",
h1:"Heading 1",
h2:"Heading 2",
h3:"Heading 3",
h4:"Heading 4",
h5:"Heading 5",
h6:"Heading 6",
blockquote:"Blockquote",
code:"Code",
samp:"Code sample",
dt:"Definition term ",
dd:"Definition description",
bold_desc:"Bold (Ctrl+B)",
italic_desc:"Italic (Ctrl+I)",
underline_desc:"Underline (Ctrl+U)",
striketrough_desc:"Strikethrough",
justifyleft_desc:"Align left",
justifycenter_desc:"Align center",
justifyright_desc:"Align right",
justifyfull_desc:"Align full",
bullist_desc:"Unordered list",
numlist_desc:"Ordered list",
outdent_desc:"Outdent",
indent_desc:"Indent",
undo_desc:"Undo (Ctrl+Z)",
redo_desc:"Redo (Ctrl+Y)",
link_desc:"Insert/edit link",
unlink_desc:"Unlink",
image_desc:"Insert/edit image",
cleanup_desc:"Cleanup messy code",
code_desc:"Edit HTML Source",
sub_desc:"Subscript",
sup_desc:"Superscript",
hr_desc:"Insert horizontal ruler",
removeformat_desc:"Remove formatting",
custom1_desc:"Your custom description here",
forecolor_desc:"Select text color",
backcolor_desc:"Select background color",
charmap_desc:"Insert custom character",
visualaid_desc:"Toggle guidelines/invisible elements",
anchor_desc:"Insert/edit anchor",
cut_desc:"Cut",
copy_desc:"Copy",
paste_desc:"Paste",
image_props_desc:"Image properties",
newdocument_desc:"New document",
help_desc:"Help",
blockquote_desc:"Blockquote",
clipboard_msg:"Copy/Cut/Paste is not available in Mozilla and Firefox.\r\nDo you want more information about this issue?",
path:"Path",
newdocument:"Are you sure you want clear all contents?",
toolbar_focus:"Jump to tool buttons - Alt+Q, Jump to editor - Alt-Z, Jump to element path - Alt-X",
more_colors:"More colors",

// Accessibility Strings
shortcuts_desc:'Accessibility Help',
help_shortcut:'. Press ALT F10 for toolbar. Press ALT 0 for help.',
rich_text_area:"Rich Text Area",
toolbar:"Toolbar"
});
(function(){var c=tinymce.each,a={paste_auto_cleanup_on_paste:true,paste_block_drop:false,paste_retain_style_properties:"none",paste_strip_class_attributes:"mso",paste_remove_spans:false,paste_remove_styles:false,paste_remove_styles_if_webkit:true,paste_convert_middot_lists:true,paste_convert_headers_to_strong:false,paste_dialog_width:"450",paste_dialog_height:"400",paste_text_use_dialog:false,paste_text_sticky:false,paste_text_notifyalways:false,paste_text_linebreaktype:"p",paste_text_replacements:[[/\u2026/g,"..."],[/[\x93\x94\u201c\u201d]/g,'"'],[/[\x60\x91\x92\u2018\u2019]/g,"'"]]};function b(d,e){return d.getParam(e,a[e])}tinymce.create("tinymce.plugins.PastePlugin",{init:function(d,e){var f=this;f.editor=d;f.url=e;f.onPreProcess=new tinymce.util.Dispatcher(f);f.onPostProcess=new tinymce.util.Dispatcher(f);f.onPreProcess.add(f._preProcess);f.onPostProcess.add(f._postProcess);f.onPreProcess.add(function(i,j){d.execCallback("paste_preprocess",i,j)});f.onPostProcess.add(function(i,j){d.execCallback("paste_postprocess",i,j)});d.pasteAsPlainText=false;function h(m,k){var l=d.dom,i,j;f.onPreProcess.dispatch(f,m);m.node=l.create("div",0,m.content);if(tinymce.isGecko){i=d.selection.getRng(true);if(i.startContainer==i.endContainer&&i.startContainer.nodeType==3){j=l.select("p,h1,h2,h3,h4,h5,h6,pre",m.node);if(j.length==1){l.remove(j.reverse(),true)}}}f.onPostProcess.dispatch(f,m);m.content=d.serializer.serialize(m.node,{getInner:1});if((!k)&&(d.pasteAsPlainText)){f._insertPlainText(d,l,m.content);if(!b(d,"paste_text_sticky")){d.pasteAsPlainText=false;d.controlManager.setActive("pastetext",false)}}else{f._insert(m.content)}}d.addCommand("mceInsertClipboardContent",function(i,j){h(j,true)});if(!b(d,"paste_text_use_dialog")){d.addCommand("mcePasteText",function(j,i){var k=tinymce.util.Cookie;d.pasteAsPlainText=!d.pasteAsPlainText;d.controlManager.setActive("pastetext",d.pasteAsPlainText);if((d.pasteAsPlainText)&&(!k.get("tinymcePasteText"))){if(b(d,"paste_text_sticky")){d.windowManager.alert(d.translate("paste.plaintext_mode_sticky"))}else{d.windowManager.alert(d.translate("paste.plaintext_mode_sticky"))}if(!b(d,"paste_text_notifyalways")){k.set("tinymcePasteText","1",new Date(new Date().getFullYear()+1,12,31))}}})}d.addButton("pastetext",{title:"paste.paste_text_desc",cmd:"mcePasteText"});d.addButton("selectall",{title:"paste.selectall_desc",cmd:"selectall"});function g(s){var l,p,j,k=d.selection,o=d.dom,q=d.getBody(),i,r;if(s.clipboardData||o.doc.dataTransfer){r=(s.clipboardData||o.doc.dataTransfer).getData("Text");if(d.pasteAsPlainText){s.preventDefault();h({content:r.replace(/\r?\n/g,"<br />")});return}}if(o.get("_mcePaste")){return}l=o.add(q,"div",{id:"_mcePaste","class":"mcePaste","data-mce-bogus":"1"},'\uFEFF<br data-mce-bogus="1">');if(q!=d.getDoc().body){i=o.getPos(d.selection.getStart(),q).y}else{i=q.scrollTop+o.getViewPort().y}o.setStyles(l,{position:"absolute",left:-10000,top:i,width:1,height:1,overflow:"hidden"});if(tinymce.isIE){j=o.doc.body.createTextRange();j.moveToElementText(l);j.execCommand("Paste");o.remove(l);if(l.innerHTML==="\uFEFF"){d.execCommand("mcePasteWord");s.preventDefault();return}h({content:l.innerHTML});return tinymce.dom.Event.cancel(s)}else{function m(n){n.preventDefault()}o.bind(d.getDoc(),"mousedown",m);o.bind(d.getDoc(),"keydown",m);p=d.selection.getRng();l=l.firstChild;j=d.getDoc().createRange();j.setStart(l,0);j.setEnd(l,1);k.setRng(j);window.setTimeout(function(){var t="",n;if(!o.select("div.mcePaste > div.mcePaste").length){n=o.select("div.mcePaste");c(n,function(v){var u=v.firstChild;if(u&&u.nodeName=="DIV"&&u.style.marginTop&&u.style.backgroundColor){o.remove(u,1)}c(o.select("span.Apple-style-span",v),function(w){o.remove(w,1)});c(o.select("br[data-mce-bogus]",v),function(w){o.remove(w)});if(v.parentNode.className!="mcePaste"){t+=v.innerHTML}})}else{t="<pre>"+o.encode(r).replace(/\r?\n/g,"<br />")+"</pre>"}c(o.select("div.mcePaste"),function(u){o.remove(u)});if(p){k.setRng(p)}h({content:t});o.unbind(d.getDoc(),"mousedown",m);o.unbind(d.getDoc(),"keydown",m)},0)}}if(b(d,"paste_auto_cleanup_on_paste")){if(tinymce.isOpera||/Firefox\/2/.test(navigator.userAgent)){d.onKeyDown.add(function(i,j){if(((tinymce.isMac?j.metaKey:j.ctrlKey)&&j.keyCode==86)||(j.shiftKey&&j.keyCode==45)){g(j)}})}else{d.onPaste.addToTop(function(i,j){return g(j)})}}if(b(d,"paste_block_drop")){d.onInit.add(function(){d.dom.bind(d.getBody(),["dragend","dragover","draggesture","dragdrop","drop","drag"],function(i){i.preventDefault();i.stopPropagation();return false})})}f._legacySupport()},getInfo:function(){return{longname:"Paste text/word",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/paste",version:tinymce.majorVersion+"."+tinymce.minorVersion}},_preProcess:function(g,e){var k=this.editor,j=e.content,p=tinymce.grep,n=tinymce.explode,f=tinymce.trim,l,i;function d(h){c(h,function(o){if(o.constructor==RegExp){j=j.replace(o,"")}else{j=j.replace(o[0],o[1])}})}if(/class="?Mso|style="[^"]*\bmso-|w:WordDocument/i.test(j)||e.wordContent){e.wordContent=true;d([/^\s*(&nbsp;)+/gi,/(&nbsp;|<br[^>]*>)+\s*$/gi]);if(b(k,"paste_convert_headers_to_strong")){j=j.replace(/<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi,"<p><strong>$1</strong></p>")}if(b(k,"paste_convert_middot_lists")){d([[/<!--\[if !supportLists\]-->/gi,"$&__MCE_ITEM__"],[/(<span[^>]+(?:mso-list:|:\s*symbol)[^>]+>)/gi,"$1__MCE_ITEM__"],[/(<p[^>]+(?:MsoListParagraph)[^>]+>)/gi,"$1__MCE_ITEM__"]])}d([/<!--[\s\S]+?-->/gi,/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|img|meta|link|style|\w:\w+)(?=[\s\/>]))[^>]*>/gi,[/<(\/?)s>/gi,"<$1strike>"],[/&nbsp;/gi,"\u00a0"]]);do{l=j.length;j=j.replace(/(<[a-z][^>]*\s)(?:id|name|language|type|on\w+|\w+:\w+)=(?:"[^"]*"|\w+)\s?/gi,"$1")}while(l!=j.length);if(b(k,"paste_retain_style_properties").replace(/^none$/i,"").length==0){j=j.replace(/<\/?span[^>]*>/gi,"")}else{d([[/<span\s+style\s*=\s*"\s*mso-spacerun\s*:\s*yes\s*;?\s*"\s*>([\s\u00a0]*)<\/span>/gi,function(o,h){return(h.length>0)?h.replace(/./," ").slice(Math.floor(h.length/2)).split("").join("\u00a0"):""}],[/(<[a-z][^>]*)\sstyle="([^"]*)"/gi,function(t,h,r){var u=[],o=0,q=n(f(r).replace(/&quot;/gi,"'"),";");c(q,function(s){var w,y,z=n(s,":");function x(A){return A+((A!=="0")&&(/\d$/.test(A)))?"px":""}if(z.length==2){w=z[0].toLowerCase();y=z[1].toLowerCase();switch(w){case"mso-padding-alt":case"mso-padding-top-alt":case"mso-padding-right-alt":case"mso-padding-bottom-alt":case"mso-padding-left-alt":case"mso-margin-alt":case"mso-margin-top-alt":case"mso-margin-right-alt":case"mso-margin-bottom-alt":case"mso-margin-left-alt":case"mso-table-layout-alt":case"mso-height":case"mso-width":case"mso-vertical-align-alt":u[o++]=w.replace(/^mso-|-alt$/g,"")+":"+x(y);return;case"horiz-align":u[o++]="text-align:"+y;return;case"vert-align":u[o++]="vertical-align:"+y;return;case"font-color":case"mso-foreground":u[o++]="color:"+y;return;case"mso-background":case"mso-highlight":u[o++]="background:"+y;return;case"mso-default-height":u[o++]="min-height:"+x(y);return;case"mso-default-width":u[o++]="min-width:"+x(y);return;case"mso-padding-between-alt":u[o++]="border-collapse:separate;border-spacing:"+x(y);return;case"text-line-through":if((y=="single")||(y=="double")){u[o++]="text-decoration:line-through"}return;case"mso-zero-height":if(y=="yes"){u[o++]="display:none"}return}if(/^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?!align|decor|indent|trans)|top-bar|version|vnd|word-break)/.test(w)){return}u[o++]=w+":"+z[1]}});if(o>0){return h+' style="'+u.join(";")+'"'}else{return h}}]])}}if(b(k,"paste_convert_headers_to_strong")){d([[/<h[1-6][^>]*>/gi,"<p><strong>"],[/<\/h[1-6][^>]*>/gi,"</strong></p>"]])}d([[/Version:[\d.]+\nStartHTML:\d+\nEndHTML:\d+\nStartFragment:\d+\nEndFragment:\d+/gi,""]]);i=b(k,"paste_strip_class_attributes");if(i!=="none"){function m(q,o){if(i==="all"){return""}var h=p(n(o.replace(/^(["'])(.*)\1$/,"$2")," "),function(r){return(/^(?!mso)/i.test(r))});return h.length?' class="'+h.join(" ")+'"':""}j=j.replace(/ class="([^"]+)"/gi,m);j=j.replace(/ class=([\-\w]+)/gi,m)}if(b(k,"paste_remove_spans")){j=j.replace(/<\/?span[^>]*>/gi,"")}e.content=j},_postProcess:function(g,i){var f=this,e=f.editor,h=e.dom,d;if(i.wordContent){c(h.select("a",i.node),function(j){if(!j.href||j.href.indexOf("#_Toc")!=-1){h.remove(j,1)}});if(b(e,"paste_convert_middot_lists")){f._convertLists(g,i)}d=b(e,"paste_retain_style_properties");if((tinymce.is(d,"string"))&&(d!=="all")&&(d!=="*")){d=tinymce.explode(d.replace(/^none$/i,""));c(h.select("*",i.node),function(m){var n={},k=0,l,o,j;if(d){for(l=0;l<d.length;l++){o=d[l];j=h.getStyle(m,o);if(j){n[o]=j;k++}}}h.setAttrib(m,"style","");if(d&&k>0){h.setStyles(m,n)}else{if(m.nodeName=="SPAN"&&!m.className){h.remove(m,true)}}})}}if(b(e,"paste_remove_styles")||(b(e,"paste_remove_styles_if_webkit")&&tinymce.isWebKit)){c(h.select("*[style]",i.node),function(j){j.removeAttribute("style");j.removeAttribute("data-mce-style")})}else{if(tinymce.isWebKit){c(h.select("*",i.node),function(j){j.removeAttribute("data-mce-style")})}}},_convertLists:function(g,e){var i=g.editor.dom,h,l,d=-1,f,m=[],k,j;c(i.select("p",e.node),function(t){var q,u="",s,r,n,o;for(q=t.firstChild;q&&q.nodeType==3;q=q.nextSibling){u+=q.nodeValue}u=t.innerHTML.replace(/<\/?\w+[^>]*>/gi,"").replace(/&nbsp;/g,"\u00a0");if(/^(__MCE_ITEM__)+[\u2022\u00b7\u00a7\u00d8o]\s*\u00a0*/.test(u)){s="ul"}if(/^__MCE_ITEM__\s*\w+\.\s*\u00a0+/.test(u)){s="ol"}if(s){f=parseFloat(t.style.marginLeft||0);if(f>d){m.push(f)}if(!h||s!=k){h=i.create(s);i.insertAfter(h,t)}else{if(f>d){h=l.appendChild(i.create(s))}else{if(f<d){n=tinymce.inArray(m,f);o=i.getParents(h.parentNode,s);h=o[o.length-1-n]||h}}}c(i.select("span",t),function(v){var p=v.innerHTML.replace(/<\/?\w+[^>]*>/gi,"");if(s=="ul"&&/^[\u2022\u00b7\u00a7\u00d8o]/.test(p)){i.remove(v)}else{if(/^[\s\S]*\w+\.(&nbsp;|\u00a0)*\s*/.test(p)){i.remove(v)}}});r=t.innerHTML;if(s=="ul"){r=t.innerHTML.replace(/__MCE_ITEM__/g,"").replace(/^[\u2022\u00b7\u00a7\u00d8o]\s*(&nbsp;|\u00a0)+\s*/,"")}else{r=t.innerHTML.replace(/__MCE_ITEM__/g,"").replace(/^\s*\w+\.(&nbsp;|\u00a0)+\s*/,"")}l=h.appendChild(i.create("li",0,r));i.remove(t);d=f;k=s}else{h=d=0}});j=e.node.innerHTML;if(j.indexOf("__MCE_ITEM__")!=-1){e.node.innerHTML=j.replace(/__MCE_ITEM__/g,"")}},_insert:function(f,d){var e=this.editor,g=e.selection.getRng();if(!e.selection.isCollapsed()&&g.startContainer!=g.endContainer){e.getDoc().execCommand("Delete",false,null)}e.execCommand("mceInsertContent",false,f,{skip_undo:d})},_insertPlainText:function(j,x,v){var t,u,l,k,r,e,p,f,n=j.getWin(),z=j.getDoc(),s=j.selection,m=tinymce.is,y=tinymce.inArray,g=b(j,"paste_text_linebreaktype"),o=b(j,"paste_text_replacements");function q(d){c(d,function(h){if(h.constructor==RegExp){v=v.replace(h,"")}else{v=v.replace(h[0],h[1])}})}if((typeof(v)==="string")&&(v.length>0)){if(/<(?:p|br|h[1-6]|ul|ol|dl|table|t[rdh]|div|blockquote|fieldset|pre|address|center)[^>]*>/i.test(v)){q([/[\n\r]+/g])}else{q([/\r+/g])}q([[/<\/(?:p|h[1-6]|ul|ol|dl|table|div|blockquote|fieldset|pre|address|center)>/gi,"\n\n"],[/<br[^>]*>|<\/tr>/gi,"\n"],[/<\/t[dh]>\s*<t[dh][^>]*>/gi,"\t"],/<[a-z!\/?][^>]*>/gi,[/&nbsp;/gi," "],[/(?:(?!\n)\s)*(\n+)(?:(?!\n)\s)*/gi,"$1"],[/\n{3,}/g,"\n\n"],/^\s+|\s+$/g]);v=x.decode(tinymce.html.Entities.encodeRaw(v));if(!s.isCollapsed()){z.execCommand("Delete",false,null)}if(m(o,"array")||(m(o,"array"))){q(o)}else{if(m(o,"string")){q(new RegExp(o,"gi"))}}if(g=="none"){q([[/\n+/g," "]])}else{if(g=="br"){q([[/\n/g,"<br />"]])}else{q([/^\s+|\s+$/g,[/\n\n/g,"</p><p>"],[/\n/g,"<br />"]])}}if((l=v.indexOf("</p><p>"))!=-1){k=v.lastIndexOf("</p><p>");r=s.getNode();e=[];do{if(r.nodeType==1){if(r.nodeName=="TD"||r.nodeName=="BODY"){break}e[e.length]=r}}while(r=r.parentNode);if(e.length>0){p=v.substring(0,l);f="";for(t=0,u=e.length;t<u;t++){p+="</"+e[t].nodeName.toLowerCase()+">";f+="<"+e[e.length-t-1].nodeName.toLowerCase()+">"}if(l==k){v=p+f+v.substring(l+7)}else{v=p+v.substring(l+4,k+4)+f+v.substring(k+7)}}}j.execCommand("mceInsertRawHTML",false,v+'<span id="_plain_text_marker">&nbsp;</span>');window.setTimeout(function(){var d=x.get("_plain_text_marker"),A,h,w,i;s.select(d,false);z.execCommand("Delete",false,null);d=null;A=s.getStart();h=x.getViewPort(n);w=x.getPos(A).y;i=A.clientHeight;if((w<h.y)||(w+i>h.y+h.h)){z.body.scrollTop=w<h.y?w:w-h.h+25}},0)}},_legacySupport:function(){var e=this,d=e.editor;d.addCommand("mcePasteWord",function(){d.windowManager.open({file:e.url+"/pasteword.htm",width:parseInt(b(d,"paste_dialog_width")),height:parseInt(b(d,"paste_dialog_height")),inline:1})});if(b(d,"paste_text_use_dialog")){d.addCommand("mcePasteText",function(){d.windowManager.open({file:e.url+"/pastetext.htm",width:parseInt(b(d,"paste_dialog_width")),height:parseInt(b(d,"paste_dialog_height")),inline:1})})}d.addButton("pasteword",{title:"paste.paste_word_desc",cmd:"mcePasteWord"})}});tinymce.PluginManager.add("paste",tinymce.plugins.PastePlugin)})();(function(){var d=tinymce.DOM,b=tinymce.dom.Element,a=tinymce.dom.Event,e=tinymce.each,c=tinymce.is;tinymce.create("tinymce.plugins.InlinePopups",{init:function(f,g){f.onBeforeRenderUI.add(function(){f.windowManager=new tinymce.InlineWindowManager(f);d.loadCSS(g+"/skins/"+(f.settings.inlinepopups_skin||"clearlooks2")+"/window.css")})},getInfo:function(){return{longname:"InlinePopups",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/inlinepopups",version:tinymce.majorVersion+"."+tinymce.minorVersion}}});tinymce.create("tinymce.InlineWindowManager:tinymce.WindowManager",{InlineWindowManager:function(f){var g=this;g.parent(f);g.zIndex=300000;g.count=0;g.windows={}},open:function(s,j){var z=this,i,k="",r=z.editor,g=0,v=0,h,m,o,q,l,x,y,n;s=s||{};j=j||{};if(!s.inline){return z.parent(s,j)}n=z._frontWindow();if(n&&d.get(n.id+"_ifr")){n.focussedElement=d.get(n.id+"_ifr").contentWindow.document.activeElement}if(!s.type){z.bookmark=r.selection.getBookmark(1)}i=d.uniqueId();h=d.getViewPort();s.width=parseInt(s.width||320);s.height=parseInt(s.height||240)+(tinymce.isIE?8:0);s.min_width=parseInt(s.min_width||150);s.min_height=parseInt(s.min_height||100);s.max_width=parseInt(s.max_width||2000);s.max_height=parseInt(s.max_height||2000);s.left=s.left||Math.round(Math.max(h.x,h.x+(h.w/2)-(s.width/2)));s.top=s.top||Math.round(Math.max(h.y,h.y+(h.h/2)-(s.height/2)));s.movable=s.resizable=true;j.mce_width=s.width;j.mce_height=s.height;j.mce_inline=true;j.mce_window_id=i;j.mce_auto_focus=s.auto_focus;z.features=s;z.params=j;z.onOpen.dispatch(z,s,j);if(s.type){k+=" mceModal";if(s.type){k+=" mce"+s.type.substring(0,1).toUpperCase()+s.type.substring(1)}s.resizable=false}if(s.statusbar){k+=" mceStatusbar"}if(s.resizable){k+=" mceResizable"}if(s.minimizable){k+=" mceMinimizable"}if(s.maximizable){k+=" mceMaximizable"}if(s.movable){k+=" mceMovable"}z._addAll(d.doc.body,["div",{id:i,role:"dialog","aria-labelledby":s.type?i+"_content":i+"_title","class":(r.settings.inlinepopups_skin||"clearlooks2")+(tinymce.isIE&&window.getSelection?" ie9":""),style:"width:100px;height:100px"},["div",{id:i+"_wrapper","class":"mceWrapper"+k},["div",{id:i+"_top","class":"mceTop"},["div",{"class":"mceLeft"}],["div",{"class":"mceCenter"}],["div",{"class":"mceRight"}],["span",{id:i+"_title"},s.title||""]],["div",{id:i+"_middle","class":"mceMiddle"},["div",{id:i+"_left","class":"mceLeft",tabindex:"0"}],["span",{id:i+"_content"}],["div",{id:i+"_right","class":"mceRight",tabindex:"0"}]],["div",{id:i+"_bottom","class":"mceBottom"},["div",{"class":"mceLeft"}],["div",{"class":"mceCenter"}],["div",{"class":"mceRight"}],["span",{id:i+"_status"},"Content"]],["a",{"class":"mceMove",tabindex:"-1",href:"javascript:;"}],["a",{"class":"mceMin",tabindex:"-1",href:"javascript:;",onmousedown:"return false;"}],["a",{"class":"mceMax",tabindex:"-1",href:"javascript:;",onmousedown:"return false;"}],["a",{"class":"mceMed",tabindex:"-1",href:"javascript:;",onmousedown:"return false;"}],["a",{"class":"mceClose",tabindex:"-1",href:"javascript:;",onmousedown:"return false;"}],["a",{id:i+"_resize_n","class":"mceResize mceResizeN",tabindex:"-1",href:"javascript:;"}],["a",{id:i+"_resize_s","class":"mceResize mceResizeS",tabindex:"-1",href:"javascript:;"}],["a",{id:i+"_resize_w","class":"mceResize mceResizeW",tabindex:"-1",href:"javascript:;"}],["a",{id:i+"_resize_e","class":"mceResize mceResizeE",tabindex:"-1",href:"javascript:;"}],["a",{id:i+"_resize_nw","class":"mceResize mceResizeNW",tabindex:"-1",href:"javascript:;"}],["a",{id:i+"_resize_ne","class":"mceResize mceResizeNE",tabindex:"-1",href:"javascript:;"}],["a",{id:i+"_resize_sw","class":"mceResize mceResizeSW",tabindex:"-1",href:"javascript:;"}],["a",{id:i+"_resize_se","class":"mceResize mceResizeSE",tabindex:"-1",href:"javascript:;"}]]]);d.setStyles(i,{top:-10000,left:-10000});if(tinymce.isGecko){d.setStyle(i,"overflow","auto")}if(!s.type){g+=d.get(i+"_left").clientWidth;g+=d.get(i+"_right").clientWidth;v+=d.get(i+"_top").clientHeight;v+=d.get(i+"_bottom").clientHeight}d.setStyles(i,{top:s.top,left:s.left,width:s.width+g,height:s.height+v});y=s.url||s.file;if(y){if(tinymce.relaxedDomain){y+=(y.indexOf("?")==-1?"?":"&")+"mce_rdomain="+tinymce.relaxedDomain}y=tinymce._addVer(y)}if(!s.type){d.add(i+"_content","iframe",{id:i+"_ifr",src:'javascript:""',frameBorder:0,style:"border:0;width:10px;height:10px"});d.setStyles(i+"_ifr",{width:s.width,height:s.height});d.setAttrib(i+"_ifr","src",y)}else{d.add(i+"_wrapper","a",{id:i+"_ok","class":"mceButton mceOk",href:"javascript:;",onmousedown:"return false;"},"Ok");if(s.type=="confirm"){d.add(i+"_wrapper","a",{"class":"mceButton mceCancel",href:"javascript:;",onmousedown:"return false;"},"Cancel")}d.add(i+"_middle","div",{"class":"mceIcon"});d.setHTML(i+"_content",s.content.replace("\n","<br />"));a.add(i,"keyup",function(f){var p=27;if(f.keyCode===p){s.button_func(false);return a.cancel(f)}});a.add(i,"keydown",function(f){var t,p=9;if(f.keyCode===p){t=d.select("a.mceCancel",i+"_wrapper")[0];if(t&&t!==f.target){t.focus()}else{d.get(i+"_ok").focus()}return a.cancel(f)}})}o=a.add(i,"mousedown",function(t){var u=t.target,f,p;f=z.windows[i];z.focus(i);if(u.nodeName=="A"||u.nodeName=="a"){if(u.className=="mceMax"){f.oldPos=f.element.getXY();f.oldSize=f.element.getSize();p=d.getViewPort();p.w-=2;p.h-=2;f.element.moveTo(p.x,p.y);f.element.resizeTo(p.w,p.h);d.setStyles(i+"_ifr",{width:p.w-f.deltaWidth,height:p.h-f.deltaHeight});d.addClass(i+"_wrapper","mceMaximized")}else{if(u.className=="mceMed"){f.element.moveTo(f.oldPos.x,f.oldPos.y);f.element.resizeTo(f.oldSize.w,f.oldSize.h);f.iframeElement.resizeTo(f.oldSize.w-f.deltaWidth,f.oldSize.h-f.deltaHeight);d.removeClass(i+"_wrapper","mceMaximized")}else{if(u.className=="mceMove"){return z._startDrag(i,t,u.className)}else{if(d.hasClass(u,"mceResize")){return z._startDrag(i,t,u.className.substring(13))}}}}}});q=a.add(i,"click",function(f){var p=f.target;z.focus(i);if(p.nodeName=="A"||p.nodeName=="a"){switch(p.className){case"mceClose":z.close(null,i);return a.cancel(f);case"mceButton mceOk":case"mceButton mceCancel":s.button_func(p.className=="mceButton mceOk");return a.cancel(f)}}});a.add([i+"_left",i+"_right"],"focus",function(p){var t=d.get(i+"_ifr");if(t){var f=t.contentWindow.document.body;var u=d.select(":input:enabled,*[tabindex=0]",f);if(p.target.id===(i+"_left")){u[u.length-1].focus()}else{u[0].focus()}}else{d.get(i+"_ok").focus()}});x=z.windows[i]={id:i,mousedown_func:o,click_func:q,element:new b(i,{blocker:1,container:r.getContainer()}),iframeElement:new b(i+"_ifr"),features:s,deltaWidth:g,deltaHeight:v};x.iframeElement.on("focus",function(){z.focus(i)});if(z.count==0&&z.editor.getParam("dialog_type","modal")=="modal"){d.add(d.doc.body,"div",{id:"mceModalBlocker","class":(z.editor.settings.inlinepopups_skin||"clearlooks2")+"_modalBlocker",style:{zIndex:z.zIndex-1}});d.show("mceModalBlocker");d.setAttrib(d.doc.body,"aria-hidden","true")}else{d.setStyle("mceModalBlocker","z-index",z.zIndex-1)}if(tinymce.isIE6||/Firefox\/2\./.test(navigator.userAgent)||(tinymce.isIE&&!d.boxModel)){d.setStyles("mceModalBlocker",{position:"absolute",left:h.x,top:h.y,width:h.w-2,height:h.h-2})}d.setAttrib(i,"aria-hidden","false");z.focus(i);z._fixIELayout(i,1);if(d.get(i+"_ok")){d.get(i+"_ok").focus()}z.count++;return x},focus:function(h){var g=this,f;if(f=g.windows[h]){f.zIndex=this.zIndex++;f.element.setStyle("zIndex",f.zIndex);f.element.update();h=h+"_wrapper";d.removeClass(g.lastId,"mceFocus");d.addClass(h,"mceFocus");g.lastId=h;if(f.focussedElement){f.focussedElement.focus()}else{if(d.get(h+"_ok")){d.get(f.id+"_ok").focus()}else{if(d.get(f.id+"_ifr")){d.get(f.id+"_ifr").focus()}}}}},_addAll:function(k,h){var g,l,f=this,j=tinymce.DOM;if(c(h,"string")){k.appendChild(j.doc.createTextNode(h))}else{if(h.length){k=k.appendChild(j.create(h[0],h[1]));for(g=2;g<h.length;g++){f._addAll(k,h[g])}}}},_startDrag:function(v,G,E){var o=this,u,z,C=d.doc,f,l=o.windows[v],h=l.element,y=h.getXY(),x,q,F,g,A,s,r,j,i,m,k,n,B;g={x:0,y:0};A=d.getViewPort();A.w-=2;A.h-=2;j=G.screenX;i=G.screenY;m=k=n=B=0;u=a.add(C,"mouseup",function(p){a.remove(C,"mouseup",u);a.remove(C,"mousemove",z);if(f){f.remove()}h.moveBy(m,k);h.resizeBy(n,B);q=h.getSize();d.setStyles(v+"_ifr",{width:q.w-l.deltaWidth,height:q.h-l.deltaHeight});o._fixIELayout(v,1);return a.cancel(p)});if(E!="Move"){D()}function D(){if(f){return}o._fixIELayout(v,0);d.add(C.body,"div",{id:"mceEventBlocker","class":"mceEventBlocker "+(o.editor.settings.inlinepopups_skin||"clearlooks2"),style:{zIndex:o.zIndex+1}});if(tinymce.isIE6||(tinymce.isIE&&!d.boxModel)){d.setStyles("mceEventBlocker",{position:"absolute",left:A.x,top:A.y,width:A.w-2,height:A.h-2})}f=new b("mceEventBlocker");f.update();x=h.getXY();q=h.getSize();s=g.x+x.x-A.x;r=g.y+x.y-A.y;d.add(f.get(),"div",{id:"mcePlaceHolder","class":"mcePlaceHolder",style:{left:s,top:r,width:q.w,height:q.h}});F=new b("mcePlaceHolder")}z=a.add(C,"mousemove",function(w){var p,H,t;D();p=w.screenX-j;H=w.screenY-i;switch(E){case"ResizeW":m=p;n=0-p;break;case"ResizeE":n=p;break;case"ResizeN":case"ResizeNW":case"ResizeNE":if(E=="ResizeNW"){m=p;n=0-p}else{if(E=="ResizeNE"){n=p}}k=H;B=0-H;break;case"ResizeS":case"ResizeSW":case"ResizeSE":if(E=="ResizeSW"){m=p;n=0-p}else{if(E=="ResizeSE"){n=p}}B=H;break;case"mceMove":m=p;k=H;break}if(n<(t=l.features.min_width-q.w)){if(m!==0){m+=n-t}n=t}if(B<(t=l.features.min_height-q.h)){if(k!==0){k+=B-t}B=t}n=Math.min(n,l.features.max_width-q.w);B=Math.min(B,l.features.max_height-q.h);m=Math.max(m,A.x-(s+A.x));k=Math.max(k,A.y-(r+A.y));m=Math.min(m,(A.w+A.x)-(s+q.w+A.x));k=Math.min(k,(A.h+A.y)-(r+q.h+A.y));if(m+k!==0){if(s+m<0){m=0}if(r+k<0){k=0}F.moveTo(s+m,r+k)}if(n+B!==0){F.resizeTo(q.w+n,q.h+B)}return a.cancel(w)});return a.cancel(G)},resizeBy:function(g,h,i){var f=this.windows[i];if(f){f.element.resizeBy(g,h);f.iframeElement.resizeBy(g,h)}},close:function(i,k){var g=this,f,j=d.doc,h,k;k=g._findId(k||i);if(!g.windows[k]){g.parent(i);return}g.count--;if(g.count==0){d.remove("mceModalBlocker");d.setAttrib(d.doc.body,"aria-hidden","false");g.editor.focus()}if(f=g.windows[k]){g.onClose.dispatch(g);a.remove(j,"mousedown",f.mousedownFunc);a.remove(j,"click",f.clickFunc);a.clear(k);a.clear(k+"_ifr");d.setAttrib(k+"_ifr","src",'javascript:""');f.element.remove();delete g.windows[k];h=g._frontWindow();if(h){g.focus(h.id)}}},_frontWindow:function(){var g,f=0;e(this.windows,function(h){if(h.zIndex>f){g=h;f=h.zIndex}});return g},setTitle:function(f,g){var h;f=this._findId(f);if(h=d.get(f+"_title")){h.innerHTML=d.encode(g)}},alert:function(g,f,j){var i=this,h;h=i.open({title:i,type:"alert",button_func:function(k){if(f){f.call(k||i,k)}i.close(null,h.id)},content:d.encode(i.editor.getLang(g,g)),inline:1,width:400,height:130})},confirm:function(g,f,j){var i=this,h;h=i.open({title:i,type:"confirm",button_func:function(k){if(f){f.call(k||i,k)}i.close(null,h.id)},content:d.encode(i.editor.getLang(g,g)),inline:1,width:400,height:130})},_findId:function(f){var g=this;if(typeof(f)=="string"){return f}e(g.windows,function(h){var i=d.get(h.id+"_ifr");if(i&&f==i.contentWindow){f=h.id;return false}});return f},_fixIELayout:function(i,h){var f,g;if(!tinymce.isIE6){return}e(["n","s","w","e","nw","ne","sw","se"],function(j){var k=d.get(i+"_resize_"+j);d.setStyles(k,{width:h?k.clientWidth:"",height:h?k.clientHeight:"",cursor:d.getStyle(k,"cursor",1)});d.setStyle(i+"_bottom","bottom","-1px");k=0});if(f=this.windows[i]){f.element.hide();f.element.show();e(d.select("div,a",i),function(k,j){if(k.currentStyle.backgroundImage!="none"){g=new Image();g.src=k.currentStyle.backgroundImage.replace(/url\(\"(.+)\"\)/,"$1")}});d.get(i).style.filter=""}}});tinymce.PluginManager.add("inlinepopups",tinymce.plugins.InlinePopups)})();tinymce.ScriptLoader.markDone(tinyMCE.baseURI.toAbsolute('/js/tiny_mce/langs/en.js'));
tinymce.ScriptLoader.markDone(tinyMCE.baseURI.toAbsolute('/js/tiny_mce/themes/advanced/editor_template.js'));
tinymce.ScriptLoader.markDone(tinyMCE.baseURI.toAbsolute('/js/tiny_mce/themes/advanced/langs/en.js'));
tinymce.ScriptLoader.markDone(tinyMCE.baseURI.toAbsolute('/js/tiny_mce/plugins/paste/editor_plugin.js'));
tinymce.ScriptLoader.markDone(tinyMCE.baseURI.toAbsolute('/js/tiny_mce/plugins/inlinepopups/editor_plugin.js'));