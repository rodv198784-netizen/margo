/* VGV: tracking an\u00f4nimo + pop-up de recupera\u00e7\u00e3o para o cat\u00e1logo (injetado pela Cloudflare) */
(function(){
if(window.__vgv)return;window.__vgv=1;
var P=location.pathname,Q=new URLSearchParams(location.search);
var pm=P.match(/\/(pt|es|en|fr)(\/|$)/);var lang=(Q.get("lang")||(pm&&pm[1])||document.documentElement.lang||navigator.language||"en").slice(0,2).toLowerCase();if(["pt","es","en","fr"].indexOf(lang)<0)lang="en";
var slug=(P.match(/\/(products|free)\/([^\/]+)/)||[])[2]||(P.replace(/\//g,"")||"home");
/* tracking */
var E=[],t0=Date.now(),sent=false,mx=0;function ev(n){if(E.indexOf(n)<0)E.push(n);}ev("view");
addEventListener("scroll",function(){var d=(scrollY+innerHeight)/document.body.scrollHeight;if(d>mx){mx=d;if(d>.5)ev("scroll50");if(d>.9)ev("scroll90");}},{passive:true});
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a,button");if(!a)return;var h=a.href||"";
if(/pay\.hotmart|buy\.stripe|payhip|gumroad/.test(h)){ev("click_buy");left=true;}else if(/\/free\/|try|app\//i.test(h))ev("click_free");else if(a.id==="vgB")ev("popup_submit");});
function send(){if(sent)return;sent=true;var b=JSON.stringify({ev:E,sec:Math.round((Date.now()-t0)/1000),path:P.slice(0,80),ref:document.referrer.slice(0,120),utm:(Q.get("utm_source")||Q.get("ttclid")&&"tiktok"||Q.get("fbclid")&&"facebook"||"")+"/"+(Q.get("utm_campaign")||""),lang:lang,tz:(Intl.DateTimeFormat().resolvedOptions().timeZone||""),w:innerWidth});
try{navigator.sendBeacon("/margo/api/ev",new Blob([b],{type:"application/json"}));}catch(x){}}
addEventListener("pagehide",send);document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden")send();});
/* precos em reais nas paginas em portugues com oferta Brasil */
var OFF={J108256050E:["tzrycbr9","9","R$ 49,90"],L108260967I:["z7lb1dnv","7","R$ 38,90"],M108260909U:["6iue6f8b","9","R$ 49,90"],D108260992T:["xxwcsslb","5","R$ 27,90"],X108260811L:["gh3mnzot","12","R$ 66,90"],C108259394A:["qb4pg4tn","9","R$ 49,90"]};
if(lang==="pt"){var fixp=function(){var ids={};document.querySelectorAll('a[href*="pay.hotmart.com/"]').forEach(function(a){var m=a.href.match(/pay\.hotmart\.com\/([A-Z0-9]+)/);if(!m||!OFF[m[1]])return;ids[m[1]]=1;if(!/[?&]off=/.test(a.href)){var u=a.href.split("?");a.href=u[0]+"?off="+OFF[m[1]][0]+(u[1]?"&"+u[1]:"");}});
var k=Object.keys(ids);if(k.length!==1)return;var o=OFF[k[0]],re=new RegExp("(USD|US\\$)\\s?"+o[1]+"(?![\\d.,])","g");
var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),n;while(n=w.nextNode()){if(re.test(n.nodeValue)){re.lastIndex=0;n.nodeValue=n.nodeValue.replace(re,o[2]);}re.lastIndex=0;}};
if(document.body)fixp();addEventListener("DOMContentLoaded",fixp);addEventListener("load",fixp);try{new MutationObserver(function(){clearTimeout(window.__vgvT);window.__vgvT=setTimeout(fixp,50);}).observe(document.documentElement,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:["href"]});}catch(e){}}
/* popup s\u00f3 em p\u00e1ginas de produto */
if(!/^\/(products|vgv-tools|make-money|margo\/pt\/)/.test(P))return;
var TX={pt:["BLACK FRIDAY \u00b7 10% OFF","Chegou, ganhou: 10% de desconto","Deixe seu e-mail e libere o cupom agora.","seu@email.com","Quero meu desconto","Sem spam. Cancele quando quiser.","Seu cupom est\u00e1 liberado \ud83c\udf89","Use o c\u00f3digo no pagamento:","Ir direto para o pagamento","Copiar c\u00f3digo","Copiado!","Continuar vendo o produto","Cupom BLACK10 ativado: 10% off j\u00e1 aplicado no pagamento"],
es:["BLACK FRIDAY \u00b7 10% OFF","Llegaste, ganaste: 10% de descuento","Deja tu correo y desbloquea el cup\u00f3n ahora.","tu@email.com","Quiero mi descuento","Sin spam. Cancela cuando quieras.","Tu cup\u00f3n est\u00e1 listo \ud83c\udf89","Usa el c\u00f3digo en el pago:","Ir directo al pago","Copiar c\u00f3digo","\u00a1Copiado!","Seguir viendo el producto","Cup\u00f3n BLACK10 activado: 10% off aplicado en el pago"],
en:["BLACK FRIDAY \u00b7 10% OFF","Welcome gift: 10% off","Leave your email to unlock the coupon now.","you@email.com","Get my discount","No spam. Unsubscribe anytime.","Your coupon is unlocked \ud83c\udf89","Use this code at checkout:","Go straight to checkout","Copy code","Copied!","Keep exploring the product","BLACK10 activated: 10% off applied at checkout"],
fr:["BLACK FRIDAY \u00b7 10% OFF","Cadeau de bienvenue : 10% de r\u00e9duction","Laissez votre e-mail pour d\u00e9bloquer le code.","vous@email.com","Je veux ma r\u00e9duction","Pas de spam. D\u00e9sinscription \u00e0 tout moment.","Votre code est d\u00e9bloqu\u00e9 \ud83c\udf89","Utilisez ce code au paiement :","Aller directement au paiement","Copier le code","Copi\u00e9 !","Continuer \u00e0 d\u00e9couvrir le produit","Code BLACK10 activ\u00e9 : -10% appliqu\u00e9 au paiement"]}[lang];
var K="vgv.pop."+slug,left=false,shown=false;
function seen(){if(Q.has("popup"))return false;try{return Date.now()-(+localStorage.getItem(K)||0)<7*864e5||localStorage.getItem("vgv.lead");}catch(e){return false;}}
function buyUrl(){var a=document.querySelector('a[href*="pay.hotmart.com"],a[href*="buy.stripe.com"]');if(!a)return"";var u=a.href;return u+(u.indexOf("?")<0?"?":"&")+(/hotmart/.test(u)?"offDiscount=BLACK10":"prefilled_promo_code=BLACK10");}
var d=document.createElement("div");d.id="vgP";d.innerHTML='<div class="b"><button class="x" aria-label="close">\u00d7</button><div id="vgA"><div class="k">'+TX[0]+'</div><h3>'+TX[1]+'</h3><p>'+TX[2]+'</p><form id="vgF"><input id="vgE" type="email" required placeholder="'+TX[3]+'"><button class="go" id="vgB">'+TX[4]+'</button></form><small>'+TX[5]+'</small></div><div id="vgOk"><h3>'+TX[6]+'</h3><p>'+TX[7]+'</p><div class="code">BLACK10</div><button class="go" id="vgCp" type="button">'+TX[TX.length-4]+'</button><button class="go2" id="vgCt" type="button">'+TX[TX.length-2]+'</button><a class="lnk" id="vgGo">'+TX[TX.length-5]+'</a></div></div>';
d.style.display="none";var lk=document.createElement("link");lk.rel="stylesheet";lk.href="/margo/vgv.css";document.head.appendChild(lk);
function mount(){document.body.appendChild(d);d.querySelector("#vgOk").style.display="none";d.querySelector("#vgOk").style.textAlign="center";d.querySelector(".x").onclick=function(){d.style.display="none";};d.onclick=function(e){if(e.target===d)d.style.display="none";};
d.querySelector("#vgCt").onclick=function(){d.style.display="none";};
d.querySelector("#vgCp").onclick=function(){var b=this;try{navigator.clipboard.writeText("BLACK10");}catch(e){}b.textContent=TX[TX.length-3];setTimeout(function(){d.style.display="none";},900);};
d.querySelector("#vgF").onsubmit=function(e){e.preventDefault();var em=d.querySelector("#vgE").value.trim(),bu=buyUrl();
fetch("/margo/api/lead",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({email:em,lang:lang,page:P,src:"vgv:"+slug,product:(document.querySelector("h1")||{}).textContent||slug,buy:bu})}).catch(function(){});
try{localStorage.setItem("vgv.lead",em);}catch(x){}var g=d.querySelector("#vgGo");if(bu)g.href=bu;else g.style.display="none";activate();d.querySelector("#vgA").style.display="none";d.querySelector("#vgOk").style.display="block";};}
function activate(){if(window.__vgvAct)return;window.__vgvAct=1;
var bar=document.createElement("div");bar.id="vgBar";bar.textContent="\ud83c\udf89 "+TX[TX.length-1];document.body.appendChild(bar);
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[href]");if(!a)return;var h=a.href;
if(/pay\.hotmart\.com/.test(h)&&!/offDiscount=/.test(h))a.href=h+(h.indexOf("?")<0?"?":"&")+"offDiscount=BLACK10";
else if(/buy\.stripe\.com/.test(h)&&!/prefilled_promo_code=/.test(h))a.href=h+(h.indexOf("?")<0?"?":"&")+"prefilled_promo_code=BLACK10";},true);}
try{if(localStorage.getItem("vgv.lead"))addEventListener("load",activate);}catch(e){}
function show(){if(shown||seen())return;shown=true;d.style.display="flex";ev("popup_shown");try{localStorage.setItem(K,Date.now());}catch(e){}}
if(document.body)mount();else addEventListener("DOMContentLoaded",mount);
setTimeout(show,3500);
document.addEventListener("mouseout",function(e){if(!e.relatedTarget&&e.clientY<10)show();});
document.addEventListener("visibilitychange",function(){if(document.visibilityState==="visible"&&left){left=false;setTimeout(show,800);}});
})();
