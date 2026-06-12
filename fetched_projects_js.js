function c(e){return String(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#039;")}function _(e){return{name:e.name||e.title||e.project||"",image:e.image||e.image_url||e.img||"",altAr:e.altAr||e.alt_ar||e.altar||"",altEn:e.altEn||e.alt_en||e.alten||"",descAr:e.descAr||e.desc_ar||e.description_ar||"",descEn:e.descEn||e.desc_en||e.description_en||"",tags:e.tags||e.stack||"",link:e.link||e.url||e.href||""}}function u(e){return String(e||"").split(/[|,\/•]/g).map(t=>t.trim()).filter(Boolean)}function I(e,t){const s=document.getElementById("projects-summary");if(!s)return;const a=e.filter(r=>r.link).length,l=new Set(e.flatMap(r=>u(r.tags))).size,n=window.siteI18n?.t?.("projects.summary_projects",t==="en"?"Projects":"مشروع")||(t==="en"?"Projects":"مشروع"),d=window.siteI18n?.t?.("projects.summary_links",t==="en"?"Live Links":"روابط مباشرة")||(t==="en"?"Live Links":"روابط مباشرة"),i=window.siteI18n?.t?.("projects.summary_tech",t==="en"?"Technologies":"تقنيات")||(t==="en"?"Technologies":"تقنيات");s.innerHTML=[`<span class="summary-pill">${e.length} ${n}</span>`,`<span class="summary-pill">${a} ${d}</span>`,`<span class="summary-pill">${l} ${i}</span>`].join("")}function h(e){const t=document.getElementById("projects-grid"),s=document.getElementById("projects-state");if(!t||!s)return;const a=window.siteI18n?.getLang?.()||(document.body.classList.contains("lang-en")?"en":"ar"),l=e.filter(n=>n&&n.name);if(!l.length){s.classList.add("error"),s.textContent=window.siteI18n?.t?.("projects.empty",a==="en"?"No projects available right now.":"لا توجد مشاريع متاحة حاليًا.")||(a==="en"?"No projects available right now.":"لا توجد مشاريع متاحة حاليًا.");return}s.style.display="none",I(l,a),t.innerHTML=l.map((n,d)=>{const i=c(n.name),r=c(n.image),f=a==="en"?n.altEn||n.altAr||n.name:n.altAr||n.altEn||n.name,w=a==="en"?n.descEn||n.descAr||"":n.descAr||n.descEn||"",y=c(f),$=c(w),g=u(n.tags).slice(0,4),k=(g.length?g:[a==="en"?"Backend":"Back-End"]).map(A=>`<span class="project-tag">${c(A)}</span>`).join(""),L=c(n.link||"#"),m=!!n.link,b=a==="en"?"View Project":"عرض المشروع",p=a==="en"?"Contact":"تواصل",v=a==="en"?"Request Access":"اطلب التفاصيل",E=a==="en"?"Scalable software project with production-focused architecture and delivery.":"مشروع قابل للتوسع مع تنفيذ هندسي يركز على الجاهزية للإنتاج.";return`
          <article class="project-card ${d===0?"featured":""}" role="listitem" itemscope itemtype="https://schema.org/SoftwareApplication">
            <div class="project-image ${n.image?"":"is-placeholder"}">
              ${n.image?`<img src="${r}" alt="${y}" width="640" height="360" loading="lazy" decoding="async" itemprop="image" />`:`<span>${a==="en"?"Project Preview":"معاينة المشروع"}</span>`}
            </div>
            <div class="project-body">
              <h2 class="project-title" title="${i}">
                <span itemprop="name">${i}</span>
              </h2>
              <p class="project-desc" itemprop="description">${$||E}</p>
              <div class="project-stack">${k}</div>
              <div class="project-actions">
                <a class="project-action primary" href="${m?L:"/#contact"}" ${m?'target="_blank" rel="noopener noreferrer"':""} aria-label="${i}">
                  <span>${m?b:v}</span>
                </a>
                <a class="project-action ghost" href="/#contact" aria-label="${p}: ${i}">
                  <span>${p}</span>
                </a>
              </div>
            </div>
          </article>`}).join("")}let o=[];fetch("/projects.json",{cache:"no-cache"}).then(e=>{if(!e.ok)throw new Error("Failed to fetch projects.json");return e.json()}).then(e=>{o=(e||[]).map(_),h(o)}).catch(()=>{const e=document.getElementById("projects-state");if(e){e.classList.add("error");const t=document.body.classList.contains("lang-en")?"Could not load projects data. Please try again later.":"تعذر تحميل بيانات المشاريع الآن. حاول مرة أخرى لاحقًا.";e.textContent=window.siteI18n?.t?.("projects.fetch_error",t)||t}});window.addEventListener("site:lang-change",()=>{o.length&&h(o)});
