// ==========================================================================
// MEUGOMES · App Showcase — interações
// ==========================================================================

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

fetch(headerPath)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro ao carregar header.html: ${response.status}`);
    }
    return response.text();
  })
  .then(data => {
    const headerContainer = document.getElementById('header-container');

    if (!headerContainer) {
      console.error('Elemento #header-container não encontrado.');
      return;
    }

    headerContainer.innerHTML = data;

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

  /* Lazy-load do vídeo do YouTube: só carrega o iframe ao clicar */
  document.querySelectorAll('.video-wrap[data-youtube-id]').forEach(wrap => {
    wrap.addEventListener('click', function handler() {
      const videoId = wrap.getAttribute('data-youtube-id');
      if (!videoId || videoId.startsWith('COLOCAR_')) return; // placeholder ainda não substituído
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
      iframe.title = 'Vídeo de demonstração';
      iframe.className = 'w-full h-full';
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
      iframe.allowFullscreen = true;
      wrap.innerHTML = '';
      wrap.appendChild(iframe);
      wrap.removeEventListener('click', handler);
    });
  });


  document.querySelectorAll('.video-wrap').forEach(videoContainer => {
  videoContainer.addEventListener('click', async function () {
    const youtubeId = this.getAttribute('data-youtube-id');
    const isShort = this.getAttribute('data-is-short') === 'true';

    if (!youtubeId || this.querySelector('iframe')) return;

    // 1. Injeta o iframe do YouTube com autoplay habilitado
    this.innerHTML = `
      <iframe 
        class="w-full h-full absolute inset-0" 
        src="https://www.youtube.com/embed/${youtubeId}?autoplay=1&playsinline=0&rel=0" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen>
      </iframe>
    `;

    // 2. Coloca o contêiner do vídeo em Tela Cheia (Fullscreen)
    try {
      if (this.requestFullscreen) {
        await this.requestFullscreen();
      } else if (this.webkitRequestFullscreen) { /* Safari / iOS */
        await this.webkitRequestFullscreen();
      }

      // 3. Bloqueia a orientação do ecrã dependendo do tipo do vídeo
      if (screen.orientation && screen.orientation.lock) {
        if (isShort) {
          // Se for Short, trava na Vertical
          await screen.orientation.lock('portrait').catch(() => {});
        } else {
          // Se for Vídeo Normal, trava na Horizontal
          await screen.orientation.lock('landscape').catch(() => {});
        }
      }
    } catch (err) {
      console.log("Modo fullscreen ou bloqueio de orientação não suportado neste navegador/dispositivo:", err);
    }
  });
});

// Restaura a orientação automática quando o utilizador sai do Fullscreen
document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement && screen.orientation && screen.orientation.unlock) {
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

      if (!nome || !email || !mensagem) {
        status.textContent = 'Por favor, preenche todos os campos.';
        status.className = 'form-status mt-3 text-sm text-danger';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'A enviar...';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form),
        });

        if (response.ok) {
          status.textContent = 'Mensagem enviada! Vou responder assim que possível.';
          status.className = 'form-status mt-3 text-sm text-teal';
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
    if (!emailInput.value.trim() || !emailInput.checkValidity() || !whatsappInput.value.trim()) {
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
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (!result.ok) throw new Error('Falha ao enviar o formulário.');
      status.textContent = 'Pedido recebido! Entraremos em contacto quando o acesso estiver disponível.';
      status.className = 'mt-3 min-h-5 text-center text-xs text-[#65D6A3]';
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
