/* VGV: tracking anônimo + pop-up de recuperação para o catálogo (injetado pela Cloudflare) */
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
/* popup só em páginas de produto */
if(!/^\/(products|vgv-tools|make-money)/.test(P))return;
var TX={pt:["ESPERA AÍ!","Ganhe 10% de desconto","Deixe seu e-mail e libere o cupom agora.","seu@email.com","Quero meu desconto","Sem spam. Cancele quando quiser.","Seu cupom está liberado 🎉","Use o código no pagamento:","Usar meu desconto"],
es:["¡ESPERA!","Obtén 10% de descuento","Deja tu correo y desbloquea el cupón ahora.","tu@email.com","Quiero mi descuento","Sin spam. Cancela cuando quieras.","Tu cupón está listo 🎉","Usa el código en el pago:","Usar mi descuento"],
en:["WAIT!","Get 10% off","Leave your email to unlock the coupon now.","you@email.com","Get my discount","No spam. Unsubscribe anytime.","Your coupon is unlocked 🎉","Use this code at checkout:","Use my discount"],
fr:["ATTENDEZ !","Profitez de 10% de réduction","Laissez votre e-mail pour débloquer le code.","vous@email.com","Je veux ma réduction","Pas de spam. Désinscription à tout moment.","Votre code est débloqué 🎉","Utilisez ce code au paiement :","Utiliser ma réduction"]}[lang];
var K="vgv.pop."+slug,left=false,shown=false;
function seen(){try{return Date.now()-(+localStorage.getItem(K)||0)<7*864e5||localStorage.getItem("vgv.lead");}catch(e){return false;}}
function buyUrl(){var a=document.querySelector('a[href*="pay.hotmart.com"],a[href*="buy.stripe.com"]');if(!a)return"";var u=a.href;return u+(u.indexOf("?")<0?"?":"&")+(/hotmart/.test(u)?"offDiscount=VOLTA10":"prefilled_promo_code=VOLTA10");}
var css="#vgP{display:none;position:fixed;inset:0;background:rgba(20,16,15,.6);z-index:99999;align-items:center;justify-content:center;padding:18px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif}#vgP .b{background:#fff;color:#1f1a19;border-radius:20px;max-width:400px;width:100%;padding:26px 22px;position:relative;box-shadow:0 20px 60px rgba(0,0,0,.3)}#vgP h3{margin:8px 0;font-size:26px;line-height:1.15}#vgP p{color:#6b625e;margin:0 0 14px}#vgP input{width:100%;box-sizing:border-box;font:inherit;font-size:16px;padding:14px;border:1px solid #ddd;border-radius:12px}#vgP .go{display:block;width:100%;margin-top:10px;background:#C2410C;color:#fff;border:0;border-radius:12px;padding:15px;font:inherit;font-weight:700;text-align:center;text-decoration:none;cursor:pointer}#vgP .x{position:absolute;top:8px;right:14px;border:0;background:none;font-size:26px;color:#888;cursor:pointer}#vgP .k{font-weight:700;color:#C2410C;font-size:13px;letter-spacing:.05em}#vgP .code{font-size:28px;font-weight:800;letter-spacing:.08em;border:2px dashed #C2410C;border-radius:12px;padding:10px;margin:12px 0;color:#C2410C;text-align:center}#vgP small{color:#999}";
var d=document.createElement("div");d.id="vgP";d.innerHTML='<style>'+css+'</style><div class="b"><button class="x" aria-label="close">×</button><div id="vgA"><div class="k">'+TX[0]+'</div><h3>'+TX[1]+'</h3><p>'+TX[2]+'</p><form id="vgF"><input id="vgE" type="email" required placeholder="'+TX[3]+'"><button class="go" id="vgB">'+TX[4]+'</button></form><small>'+TX[5]+'</small></div><div id="vgOk" style="display:none;text-align:center"><h3>'+TX[6]+'</h3><p>'+TX[7]+'</p><div class="code">VOLTA10</div><a class="go" id="vgGo" target="_blank" rel="noopener">'+TX[8]+'</a></div></div>';
function mount(){document.body.appendChild(d);d.querySelector(".x").onclick=function(){d.style.display="none";};d.onclick=function(e){if(e.target===d)d.style.display="none";};
d.querySelector("#vgF").onsubmit=function(e){e.preventDefault();var em=d.querySelector("#vgE").value.trim(),bu=buyUrl();
fetch("/margo/api/lead",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({email:em,lang:lang,page:P,src:"vgv:"+slug,product:(document.querySelector("h1")||{}).textContent||slug,buy:bu})}).catch(function(){});
try{localStorage.setItem("vgv.lead",em);}catch(x){}var g=d.querySelector("#vgGo");if(bu)g.href=bu;else g.style.display="none";d.querySelector("#vgA").style.display="none";d.querySelector("#vgOk").style.display="block";};}
function show(){if(shown||seen())return;shown=true;d.style.display="flex";ev("popup_shown");try{localStorage.setItem(K,Date.now());}catch(e){}}
if(document.body)mount();else addEventListener("DOMContentLoaded",mount);
setTimeout(show,3500);
document.addEventListener("mouseout",function(e){if(!e.relatedTarget&&e.clientY<10)show();});
document.addEventListener("visibilitychange",function(){if(document.visibilityState==="visible"&&left){left=false;setTimeout(show,800);}});
})();
