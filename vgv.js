/* VGV: tracking an\u00f4nimo + pop-up de recupera\u00e7\u00e3o para o cat\u00e1logo (injetado pela Cloudflare) */
(function(){
if(window.__vgv)return;window.__vgv=1;
var P=location.pathname,Q=new URLSearchParams(location.search);
var lang=(Q.get("lang")||document.documentElement.lang||navigator.language||"en").slice(0,2).toLowerCase();if(["pt","es","en","fr"].indexOf(lang)<0)lang="en";
var slug=(P.match(/\/(products|free)\/([^\/]+)/)||[])[2]||(P.replace(/\//g,"")||"home");
/* tracking */
var E=[],t0=Date.now(),sent=false,mx=0;function ev(n){if(E.indexOf(n)<0)E.push(n);}ev("view");
addEventListener("scroll",function(){var d=(scrollY+innerHeight)/document.body.scrollHeight;if(d>mx){mx=d;if(d>.5)ev("scroll50");if(d>.9)ev("scroll90");}},{passive:true});
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a,button");if(!a)return;var h=a.href||"";
if(/pay\.hotmart|buy\.stripe|payhip|gumroad/.test(h)){ev("click_buy");left=true;}else if(/\/free\/|try|app\//i.test(h))ev("click_free");else if(a.id==="vgB")ev("popup_submit");});
function send(){if(sent)return;sent=true;var b=JSON.stringify({ev:E,sec:Math.round((Date.now()-t0)/1000),path:P.slice(0,80),ref:document.referrer.slice(0,120),utm:(Q.get("utm_source")||Q.get("ttclid")&&"tiktok"||Q.get("fbclid")&&"facebook"||"")+"/"+(Q.get("utm_campaign")||""),lang:lang,tz:(Intl.DateTimeFormat().resolvedOptions().timeZone||""),w:innerWidth});
try{navigator.sendBeacon("/margo/api/ev",new Blob([b],{type:"application/json"}));}catch(x){}}
addEventListener("pagehide",send);document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden")send();});
/* popup s\u00f3 em p\u00e1ginas de produto */
if(!/^\/(products|vgv-tools|make-money|margo\/pt\/)/.test(P))return;
var TX={pt:["ESPERA A\u00cd!","Ganhe 10% de desconto","Deixe seu e-mail e libere o cupom agora.","seu@email.com","Quero meu desconto","Sem spam. Cancele quando quiser.","Seu cupom est\u00e1 liberado \ud83c\udf89","Use o c\u00f3digo no pagamento:","Usar meu desconto"],
es:["\u00a1ESPERA!","Obt\u00e9n 10% de descuento","Deja tu correo y desbloquea el cup\u00f3n ahora.","tu@email.com","Quiero mi descuento","Sin spam. Cancela cuando quieras.","Tu cup\u00f3n est\u00e1 listo \ud83c\udf89","Usa el c\u00f3digo en el pago:","Usar mi descuento"],
en:["WAIT!","Get 10% off","Leave your email to unlock the coupon now.","you@email.com","Get my discount","No spam. Unsubscribe anytime.","Your coupon is unlocked \ud83c\udf89","Use this code at checkout:","Use my discount"],
fr:["ATTENDEZ !","Profitez de 10% de r\u00e9duction","Laissez votre e-mail pour d\u00e9bloquer le code.","vous@email.com","Je veux ma r\u00e9duction","Pas de spam. D\u00e9sinscription \u00e0 tout moment.","Votre code est d\u00e9bloqu\u00e9 \ud83c\udf89","Utilisez ce code au paiement :","Utiliser ma r\u00e9duction"]}[lang];
var K="vgv.pop."+slug,left=false,shown=false;
function seen(){try{return Date.now()-(+localStorage.getItem(K)||0)<7*864e5||localStorage.getItem("vgv.lead");}catch(e){return false;}}
function buyUrl(){var a=document.querySelector('a[href*="pay.hotmart.com"],a[href*="buy.stripe.com"]');if(!a)return"";var u=a.href;return u+(u.indexOf("?")<0?"?":"&")+(/hotmart/.test(u)?"offDiscount=VOLTA10":"prefilled_promo_code=VOLTA10");}
var d=document.createElement("div");d.id="vgP";d.innerHTML='<div class="b"><button class="x" aria-label="close">\u00d7</button><div id="vgA"><div class="k">'+TX[0]+'</div><h3>'+TX[1]+'</h3><p>'+TX[2]+'</p><form id="vgF"><input id="vgE" type="email" required placeholder="'+TX[3]+'"><button class="go" id="vgB">'+TX[4]+'</button></form><small>'+TX[5]+'</small></div><div id="vgOk"><h3>'+TX[6]+'</h3><p>'+TX[7]+'</p><div class="code">VOLTA10</div><a class="go" id="vgGo" target="_blank" rel="noopener">'+TX[8]+'</a></div></div>';
d.style.display="none";var lk=document.createElement("link");lk.rel="stylesheet";lk.href="/margo/vgv.css";document.head.appendChild(lk);
function mount(){document.body.appendChild(d);d.querySelector("#vgOk").style.display="none";d.querySelector("#vgOk").style.textAlign="center";d.querySelector(".x").onclick=function(){d.style.display="none";};d.onclick=function(e){if(e.target===d)d.style.display="none";};
d.querySelector("#vgF").onsubmit=function(e){e.preventDefault();var em=d.querySelector("#vgE").value.trim(),bu=buyUrl();
fetch("/margo/api/lead",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({email:em,lang:lang,page:P,src:"vgv:"+slug,product:(document.querySelector("h1")||{}).textContent||slug,buy:bu})}).catch(function(){});
try{localStorage.setItem("vgv.lead",em);}catch(x){}var g=d.querySelector("#vgGo");if(bu)g.href=bu;else g.style.display="none";d.querySelector("#vgA").style.display="none";d.querySelector("#vgOk").style.display="block";};}
function show(){if(shown||seen())return;shown=true;d.style.display="flex";ev("popup_shown");try{localStorage.setItem(K,Date.now());}catch(e){}}
if(document.body)mount();else addEventListener("DOMContentLoaded",mount);
setTimeout(show,3500);
document.addEventListener("mouseout",function(e){if(!e.relatedTarget&&e.clientY<10)show();});
document.addEventListener("visibilitychange",function(){if(document.visibilityState==="visible"&&left){left=false;setTimeout(show,800);}});
})();
