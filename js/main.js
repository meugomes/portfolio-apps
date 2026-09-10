// ==========================================================================
// MEUGOMES · App Showcase — interações
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  /* Menu mobile */
 document.addEventListener('click', (e) => {
  const toggleBtn = e.target.closest('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const clickedLink = e.target.closest('a');

  // 1. Alterna o Menu Hambúrguer / X
  if (toggleBtn && navLinks) {
    const isHidden = navLinks.classList.contains('hidden');
    const lineTop = toggleBtn.querySelector('.line-top');
    const lineMid = toggleBtn.querySelector('.line-mid');
    const lineBot = toggleBtn.querySelector('.line-bot');

    if (isHidden) {
      navLinks.classList.remove('hidden');
      navLinks.classList.add('flex');
      toggleBtn.setAttribute('aria-expanded', 'true');

      if (lineTop && lineMid && lineBot) {
        lineTop.setAttribute('x1', '6'); lineTop.setAttribute('y1', '6');
        lineTop.setAttribute('x2', '18'); lineTop.setAttribute('y2', '18');
        lineMid.style.opacity = '0';
        lineBot.setAttribute('x1', '6'); lineBot.setAttribute('y1', '18');
        lineBot.setAttribute('x2', '18'); lineBot.setAttribute('y2', '6');
      }
    } else {
      closeMobileMenu(navLinks, toggleBtn);
    }
    return;
  }

  // 2. Clique num Link (Fecha a gaveta mobile sem bloquear a navegação)
  if (clickedLink && navLinks && !navLinks.classList.contains('hidden')) {
    const btn = document.querySelector('.nav-toggle');
    closeMobileMenu(navLinks, btn);
    return;
  }

  // 3. Clique Fora do Menu
  if (navLinks && !navLinks.classList.contains('hidden')) {
    if (!navLinks.contains(e.target)) {
      const btn = document.querySelector('.nav-toggle');
      closeMobileMenu(navLinks, btn);
    }
  }
});

function closeMobileMenu(navLinks, toggleBtn) {
  if (!navLinks) return;
  navLinks.classList.add('hidden');
  navLinks.classList.remove('flex');

  if (toggleBtn) {
    toggleBtn.setAttribute('aria-expanded', 'false');
    const lineTop = toggleBtn.querySelector('.line-top');
    const lineMid = toggleBtn.querySelector('.line-mid');
    const lineBot = toggleBtn.querySelector('.line-bot');

    if (lineTop && lineMid && lineBot) {
      lineTop.setAttribute('x1', '4'); lineTop.setAttribute('y1', '6');
      lineTop.setAttribute('x2', '20'); lineTop.setAttribute('y2', '6');
      lineMid.style.opacity = '1';
      lineBot.setAttribute('x1', '4'); lineBot.setAttribute('y1', '18');
      lineBot.setAttribute('x2', '20'); lineBot.setAttribute('y2', '18');
    }
  }
}

// Carregamento dinâmico de componentes
fetch('header.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('header-container').innerHTML = data;
    // Re-inicializa o JS do menu após carregar o HTML
    initNavMenu();
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


 // Controlo do botão da Play Store + popup de testadores.
  // Quando o app for publicado de verdade na Play Store:
  //  1. muda PLAY_STORE_LIVE para true
  //  2. coloca o link real em PLAY_STORE_URL
  // A partir daí, o botão passa a abrir a Play Store diretamente e o popup deixa de aparecer.
  const PLAY_STORE_LIVE = false;
  const PLAY_STORE_URL = '#';

  document.addEventListener('DOMContentLoaded', () => {
    const playBtn = document.getElementById('play-store-btn');
    const modal = document.getElementById('play-store-modal');
    const closeBtn = document.getElementById('modal-close');
    const testerForm = document.getElementById('tester-form');
    const testerStatus = document.getElementById('tester-status');

    function openModal() {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
      document.getElementById('tester-email').focus();
    }
    function closeModal() {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    }

    if (playBtn) {
      playBtn.addEventListener('click', () => {
        if (PLAY_STORE_LIVE) {
          window.open(PLAY_STORE_URL, '_blank', 'noopener');
        } else {
          openModal();
        }
      });
    }
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
    });

    if (testerForm) {
      testerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = testerForm.querySelector('button[type="submit"]');
        const email = testerForm.querySelector('#tester-email').value.trim();
        const whatsapp = testerForm.querySelector('#tester-whatsapp').value.trim();

        if (!email || !whatsapp) {
          testerStatus.textContent = 'Preenche o email e o WhatsApp, por favor.';
          testerStatus.className = 'mt-3 text-sm text-danger';
          return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'A enviar...';

        try {
          const response = await fetch(testerForm.action, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(testerForm),
          });
          if (response.ok) {
            testerStatus.textContent = 'Recebido! Vais ser adicionado à lista de testadores em breve.';
            testerStatus.className = 'mt-3 text-sm text-teal';
            testerForm.reset();
            setTimeout(closeModal, 2200);
          } else {
            throw new Error('Falha no envio');
          }
        } catch (err) {
          testerStatus.textContent = 'Não foi possível enviar agora. Tenta novamente em instantes.';
          testerStatus.className = 'mt-3 text-sm text-danger';
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Quero ser testador';
        }
      });
    }
  });


