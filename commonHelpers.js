import{S as i,i as u}from"./assets/vendor-46aac873.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const p=document.querySelector(".form"),d=document.querySelector(".gallery"),c=document.querySelector(".loader"),f="https://pixabay.com/api/?",m="41732338-ca5909782120305119b6393dc",l={key:m,q:"",image_type:"photo",orientation:"horizontal",safesearch:!0},y=new i(".gallery a",{captionsData:"alt",captionDelay:250,close:!0,enableKeyboard:!0,docClose:!0});p.addEventListener("submit",s=>{s.preventDefault(),c.style.display="block",l.q=s.target.elements.search.value;const t=new URLSearchParams(l);g(t),s.currentTarget.reset()});const g=s=>fetch(f+`${s}`).then(t=>{if(!t.ok)throw new Error("Something went wrong. Please try again later.");return t.json()}).then(({hits:t})=>{t.length===0?u.error({position:"topRight",messageColor:"#FFFFFF",backgroundColor:"#EF4040",titleSize:"8px",closeOnEscape:!0,message:"Sorry, there are no images matching your search query. Please try again!"}):(d.innerHTML=t.reduce((a,o)=>a+`
                    <li class="gallery-item">
                        <a href=${o.largeImageURL}> 
                            <img class="gallery-img" src=${o.webformatURL} alt=${o.tags}/>
                        </a>
                        <div class="gallery-text-box">
                            <p>Likes: <span class="text-value">${o.likes}</span></p>
                            <p>Views: <span class="text-value">${o.views}</span></p>
                            <p>Comments: <span class="text-value">${o.comments}</span></p>
                            <p>Downloads: <span class="text-value">${o.downloads}</span></p>
                        </div>
                    </li>
                `,""),y.refresh())}).catch(t=>{console.error(t.message)}).finally(()=>{c.style.display="none"});
//# sourceMappingURL=commonHelpers.js.map
