// ==========================================================================
// MEUGOMES · App Showcase — interações
// ==========================================================================

// Substituir pelo Measurement ID real do GA4 (formato G-XXXXXXXXXX).
// Enquanto permanecer como placeholder, nenhuma ligação ao Google Analytics será iniciada.
const MEUGOMES_GA4_ID = 'G-D6KH081EY8';

document.addEventListener('DOMContentLoaded', () => {

  /* Menu mobile: painel flutuante, backdrop, acessibilidade e fecho automático. */
  function initNavMenu() {
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav-links');
    const backdrop = document.getElementById('nav-backdrop');
    if (!toggle || !nav || toggle.dataset.initialized === 'true') return;
    toggle.dataset.initialized = 'true';

    const openMenu = () => {
      nav.classList.add('is-open');
      backdrop?.classList.add('is-open');
      toggle.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Fechar menu');
      document.body.style.overflow = 'hidden';
    };
    const closeMenu = () => {
      nav.classList.remove('is-open');
      backdrop?.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
      document.body.style.overflow = '';
    };

    toggle.addEventListener('click', () => {
      toggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
    });
    backdrop?.addEventListener('click', closeMenu);
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        toggle.focus();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) closeMenu();
    });
  }

  document.addEventListener('click', event => {
    const nav = document.getElementById('nav-links');
    const toggle = document.getElementById('nav-toggle');
    if (!nav || !toggle || toggle.getAttribute('aria-expanded') !== 'true') return;
    if (!nav.contains(event.target) && !toggle.contains(event.target) && !event.target.closest('#nav-backdrop')) {
      nav.classList.remove('is-open');
      document.getElementById('nav-backdrop')?.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
      document.body.style.overflow = '';
    }
  });

// Carregamento dinâmico do cabeçalho
const isAppPage = window.location.pathname.includes('/app_page/');
const headerPath = isAppPage ? '../header.html' : './header.html';
const headerContainer = document.getElementById('header-container');

if (headerContainer) fetch(headerPath)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro ao carregar header.html: ${response.status}`);
    }
    return response.text();
  })
  .then(data => {
    headerContainer.innerHTML = data;

     // Corrigir automaticamente os caminhos das imagens do cabeçalho
    headerContainer.querySelectorAll("img").forEach((img) => {
      const src = img.getAttribute("src");

      if (!src) return;

      // Caminho correcto conforme a localização da página
      if (isAppPage) {
        img.src = "../" + src.replace(/^(\.\.\/)+/, "").replace(/^\//, "");
      } else {
        img.src = src.replace(/^(\.\.\/)+/, "").replace(/^\//, "");
      }
    });

    // Caminho para o index.html principal
    const currentUrl = new URL(window.location.href);
    const pathParts = currentUrl.pathname.split('/');
    const appPagePosition = pathParts.indexOf('app_page');

    if (appPagePosition !== -1) {
      pathParts.splice(appPagePosition);
    } else {
      pathParts.pop();
    }

    const rootPath = pathParts.join('/') + '/';
    const indexUrl = `${currentUrl.origin}${rootPath}index.html`;

    // Corrigir os links do cabeçalho
    headerContainer.querySelectorAll('a').forEach(link => {
      const href = link.getAttribute('href');

      if (!href) return;

      const match = href.match(/^(?:\.\.\/)?index\.html(?:#(.*))?$/);

      if (match) {
        link.href = match[1]
          ? `${indexUrl}#${match[1]}`
          : indexUrl;
      }
    });

    // Re-inicializar o menu
    initNavMenu();
  })
  .catch(error => {
    console.error('Erro no carregamento do cabeçalho:', error);
  });

  /* Reveal on scroll — troca opacity-0/translate-y-4 por opacity-100/translate-y-0 */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-4');
          entry.target.classList.add('opacity-100', 'translate-y-0');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => {
      el.classList.remove('opacity-0', 'translate-y-4');
      el.classList.add('opacity-100', 'translate-y-0');
    });
  }

  /* Vídeos: validar o ID e carregar o player apenas após interação. */
  document.querySelectorAll('.video-wrap[data-youtube-id]').forEach(wrap => {
    wrap.addEventListener('click', async function () {
      if (wrap.querySelector('iframe')) return;
      const videoId = (wrap.dataset.youtubeId || '').trim();
      if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) return;

      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&playsinline=1&rel=0`;
      iframe.title = 'Vídeo de demonstração';
      iframe.className = 'absolute inset-0 w-full h-full';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-presentation');
      wrap.replaceChildren(iframe);

      try {
        if (wrap.requestFullscreen) await wrap.requestFullscreen();
        if (screen.orientation?.lock) {
          const isShort = wrap.dataset.isShort === 'true';
          await screen.orientation.lock(isShort ? 'portrait' : 'landscape').catch(() => {});
        }
      } catch (err) {
        // Fullscreen/orientation are optional browser capabilities.
      }
    }, { once: true });
  });

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && screen.orientation?.unlock) {
      screen.orientation.unlock();
    }
  });

  /* Formulário de contacto — envia por email via FormSubmit (sem backend próprio).
     FormSubmit.co entrega diretamente na caixa de entrada configurada no atributo
     "action" do formulário. Na primeira submissão real, a FormSubmit manda um
     email de confirmação/ativação para esse endereço — é preciso clicar uma vez
     para ativar o envio automático a partir daí. */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = document.getElementById('form-status');
      const submitBtn = form.querySelector('button[type="submit"]');
      const nome = form.querySelector('#nome').value.trim();
      const email = form.querySelector('#email').value.trim();
      const mensagem = form.querySelector('#mensagem').value.trim();

      if (!nome || !email || !mensagem || !form.checkValidity()) {
        form.reportValidity();
        status.textContent = 'Por favor, preenche todos os campos.';
        status.className = 'form-status mt-3 text-sm text-danger';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'A enviar...';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
        });

        const result = await response.json();
        if (response.ok && (result?.success === 'true' || result?.success === true)) {
          status.textContent = 'Mensagem enviada! Vou responder assim que possível.';
          status.className = 'form-status mt-3 text-sm text-teal';
          window.meugomesTrack?.('contact_form_submit', { form_name: 'contact' });
          form.reset();
        } else {
          throw new Error('Falha no envio');
        }
      } catch (err) {
        status.textContent = 'Não foi possível enviar agora. Tenta novamente ou usa o WhatsApp.';
        status.className = 'form-status mt-3 text-sm text-danger';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar mensagem';
      }
    });
  }

});



/* Botões Google Play e modal partilhado para testes fechados. */
document.addEventListener('DOMContentLoaded', async () => {
  const playButtons = [...document.querySelectorAll('.play-store-btn, #play-store-btn')];
  if (!playButtons.length) return;

  const isAppPage = window.location.pathname.includes('/app_page/');
  const modalPath = isAppPage ? 'play-store-modal.html' : 'app_page/play-store-modal.html';
  try {
    const response = await fetch(modalPath);
    if (!response.ok) throw new Error(`Não foi possível carregar o modal (${response.status}).`);
    const markup = await response.text();
    document.body.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    console.error('Erro ao carregar o formulário de testadores:', error);
    return;
  }

  const modal = document.getElementById('play-store-modal');
  const closeButton = document.getElementById('modal-close');
  const form = document.getElementById('tester-form');
  const status = document.getElementById('tester-status');
  const emailInput = document.getElementById('tester-email');
  const whatsappInput = document.getElementById('tester-whatsapp');
  const appInput = document.getElementById('tester-app-name');
  const subjectInput = document.getElementById('tester-subject');
  let lastTrigger = null;

  const openModal = (trigger) => {
    lastTrigger = trigger;
    const appName = trigger.dataset.appName || document.title.replace(/· MEUGOMES/i, '').trim();
    appInput.value = appName;
    subjectInput.value = `Pedido de acesso ao teste fechado — ${appName}`;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => emailInput.focus(), 80);
  };
  const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
    lastTrigger?.focus();
  };

  playButtons.forEach(button => {
    button.addEventListener('click', () => {
      const storeUrl = (button.dataset.playStoreUrl || '').trim();
      const releaseStatus = (button.dataset.releaseStatus || 'testing').toLowerCase();
      if (releaseStatus === 'live' && /^https:\/\//i.test(storeUrl)) {
        window.open(storeUrl, '_blank', 'noopener,noreferrer');
      } else {
        openModal(button);
      }
    });
  });

  closeButton?.addEventListener('click', closeModal);
  modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
  });

  form?.addEventListener('submit', async event => {
    event.preventDefault();
    status.textContent = '';
    if (!emailInput.value.trim() || !emailInput.checkValidity() || !whatsappInput.value.trim() || !form.checkValidity()) {
      form.reportValidity();
      status.textContent = 'Confirma o email Google e o número de WhatsApp.';
      status.className = 'mt-3 min-h-5 text-center text-xs text-danger';
      (!emailInput.value.trim() || !emailInput.checkValidity() ? emailInput : whatsappInput).focus();
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.querySelector('span').textContent = 'A enviar pedido...';
    try {
      const result = await fetch(form.action, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });
      const payload = await result.json();
      if (!result.ok || !(payload?.success === 'true' || payload?.success === true)) {
        throw new Error('Falha ao enviar o formulário.');
      }
      status.textContent = 'Pedido recebido! Entraremos em contacto quando o acesso estiver disponível.';
      status.className = 'mt-3 min-h-5 text-center text-xs text-[#65D6A3]';
      window.meugomesTrack?.('test_signup', { app_name: appInput.value.trim() || 'Aplicação não identificada' });
      form.reset();
      window.setTimeout(closeModal, 2600);
    } catch (error) {
      status.textContent = 'Não foi possível enviar. Tenta novamente dentro de instantes.';
      status.className = 'mt-3 min-h-5 text-center text-xs text-danger';
    } finally {
      submitButton.disabled = false;
      submitButton.querySelector('span').textContent = 'Solicitar acesso ao teste';
    }
  });
});


// ============================================================================
 // MEUGOMES · Google Analytics 4 — consentimento prévio (modo básico)
 // Não carrega a Google tag nem envia eventos antes da aceitação do visitante.
 // Nunca enviar nomes, emails, telefones ou conteúdo dos formulários ao GA4.
 // ============================================================================
(() => {
  const measurementId = (MEUGOMES_GA4_ID || '').trim();
  const consentKey = 'meugomes_analytics_consent_v1';
  const validMeasurementId = /^G-[A-Z0-9]+$/.test(measurementId) && measurementId !== 'G-XXXXXXXXXX';
  let analyticsActive = false;
  let tagLoaded = false;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted'
  });

  const loadAnalytics = () => {
    if (!validMeasurementId) return;
    analyticsActive = true;
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    if (tagLoaded) return;
    tagLoaded = true;
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      send_page_view: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    if (window.location.pathname.includes('/app_page/')) {
      const appName = document.querySelector('main h1')?.textContent?.trim()
        || document.title.replace(/·\s*MEUGOMES/i, '').trim();
      window.meugomesTrack('app_view', { app_name: appName });
    }

    const tag = document.createElement('script');
    tag.async = true;
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    tag.onerror = () => {
      analyticsActive = false;
      tagLoaded = false;
      console.error('[MEUGOMES Analytics] Não foi possível carregar a Google tag.');
    };
    document.head.appendChild(tag);
  };

  window.meugomesTrack = (eventName, parameters = {}) => {
    if (!analyticsActive || typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, parameters);
  };

  const readConsent = () => {
    try { return window.localStorage.getItem(consentKey); }
    catch { return null; }
  };
  const saveConsent = value => {
    try { window.localStorage.setItem(consentKey, value); }
    catch { /* Se storage estiver indisponível, a escolha vale apenas nesta visita. */ }
  };

  const buildConsentUI = () => {
    if (!document.body || document.getElementById('meugomes-consent-banner')) return;

    const style = document.createElement('style');
    style.textContent = `
      #meugomes-consent-banner{position:fixed;z-index:9999;left:16px;right:16px;bottom:16px;max-width:760px;margin:auto;padding:20px;border:1px solid #29415e;border-radius:16px;background:#101b2a;color:#f4f7fb;box-shadow:0 16px 50px #0008;font:14px/1.55 system-ui,sans-serif}
      #meugomes-consent-banner p{margin:0 0 12px;color:#c2ccda}
      #meugomes-consent-banner a{color:#80b7ff;text-decoration:underline}
      #meugomes-consent-banner .consent-actions{display:flex;flex-wrap:wrap;gap:9px}
      #meugomes-consent-banner button,#meugomes-privacy-settings{min-height:42px;padding:9px 15px;border-radius:10px;border:1px solid #45617f;font:600 13px system-ui,sans-serif;cursor:pointer}
      #meugomes-consent-banner button:focus-visible,#meugomes-privacy-settings:focus-visible{outline:3px solid #80b7ff;outline-offset:3px}
      #meugomes-consent-accept{background:#056cf2;color:#fff;border-color:#056cf2}
      #meugomes-consent-reject{background:#17283d;color:#fff}
      #meugomes-privacy-settings{position:fixed;z-index:9998;right:12px;bottom:12px;background:#101b2a;color:#fff;box-shadow:0 4px 18px #0005}
      @media(max-width:480px){#meugomes-consent-banner{left:10px;right:10px;bottom:10px;padding:16px}.consent-actions{display:grid;grid-template-columns:1fr}#meugomes-privacy-settings{right:8px;bottom:8px}}
    `;
    document.head.appendChild(style);

    const banner = document.createElement('section');
    banner.id = 'meugomes-consent-banner';
    banner.hidden = Boolean(readConsent());
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'false');
    banner.setAttribute('aria-labelledby', 'meugomes-consent-title');

    const title = document.createElement('strong');
    title.id = 'meugomes-consent-title';
    title.textContent = 'Privacidade e cookies';
    const description = document.createElement('p');
    description.textContent = 'Utilizamos o Google Analytics 4 apenas se autorizares, para compreender a utilização do site e melhorar as páginas. A escolha fica guardada neste navegador e podes alterá-la a qualquer momento.';
    const policy = document.createElement('a');
    const nestedPage = /\/(app_page|page_terms_privacy)\//.test(window.location.pathname);
    policy.href = `${nestedPage ? '../' : ''}page_terms_privacy/politica-privacidade-site.html`;
    policy.textContent = 'Consultar a política de privacidade';
    policy.target = '_blank';
    policy.rel = 'noopener noreferrer';
    const actions = document.createElement('div');
    actions.className = 'consent-actions';

    const accept = document.createElement('button');
    accept.id = 'meugomes-consent-accept';
    accept.type = 'button';
    accept.textContent = 'Aceitar análise';
    const reject = document.createElement('button');
    reject.id = 'meugomes-consent-reject';
    reject.type = 'button';
    reject.textContent = 'Rejeitar análise';
    actions.append(accept, reject);
    banner.append(title, description, policy, actions);
    document.body.appendChild(banner);

    const closeBanner = () => { banner.hidden = true; };
    accept.addEventListener('click', () => {
      saveConsent('accepted');
      loadAnalytics();
      closeBanner();
    });
    reject.addEventListener('click', () => {
      saveConsent('rejected');
      analyticsActive = false;
      if (tagLoaded) {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied'
        });
      }
      closeBanner();
    });

    const settings = document.createElement('button');
    settings.id = 'meugomes-privacy-settings';
    settings.type = 'button';
    settings.textContent = 'Privacidade';
    settings.setAttribute('aria-label', 'Alterar preferências de privacidade');
    settings.addEventListener('click', () => {
      banner.hidden = false;
      if (!banner.isConnected) document.body.appendChild(banner);
      accept.focus();
    });
    document.body.appendChild(settings);
  };

  document.addEventListener('DOMContentLoaded', () => {
    const choice = readConsent();
    if (choice === 'accepted') loadAnalytics();
    buildConsentUI();
  });

  // Instrumentação sem recolha de dados pessoais.
  document.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target : event.target?.parentElement;
    if (!target) return;

    const playButton = target.closest('.play-store-btn, #play-store-btn');
    if (playButton) {
      window.meugomesTrack('play_store_click', {
        app_name: playButton.dataset.appName || document.querySelector('main h1')?.textContent?.trim() || 'Aplicação',
        release_status: playButton.dataset.releaseStatus || 'unknown'
      });
      return;
    }

    const link = target.closest('a[href]');
    if (!link) return;
    let destination;
    try { destination = new URL(link.href, window.location.href); } catch { return; }

    if (destination.hostname === 'wa.me' || destination.hostname.endsWith('.whatsapp.com') || destination.hostname === 'whatsapp.com') {
      window.meugomesTrack('whatsapp_click', { link_url: destination.origin + destination.pathname });
      return;
    }

    const isApk = link.hasAttribute('download') || /\.apk$/i.test(destination.pathname) || link.classList.contains('apk-download');
    if (isApk) {
      window.meugomesTrack('apk_download', {
        file_name: destination.pathname.split('/').pop() || 'ficheiro-apk',
        app_name: document.querySelector('main h1')?.textContent?.trim() || 'Aplicação'
      });
    }
  }, true);

})();
