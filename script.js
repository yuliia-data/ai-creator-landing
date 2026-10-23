document.addEventListener('DOMContentLoaded', () => {
  // Keep the two updated anchor targets clear of the fixed header.
  const siteHeader = document.querySelector('.header');
  if (siteHeader) {
    const updateHeaderHeight = () => document.documentElement.style.setProperty('--site-header-height', `${Math.ceil(siteHeader.getBoundingClientRect().height)}px`);
    new ResizeObserver(updateHeaderHeight).observe(siteHeader);
    updateHeaderHeight();
  }
  const modules = {
    1: { title: 'Основи AI', topics: ['Як працює генеративний AI', 'Які AI-інструменти використовувати для різних задач', 'Як правильно ставити завдання AI', 'Промпти: структура, логіка та практика', 'Як отримувати стабільний результат, а не випадкову генерацію', 'AI у роботі: від ідеї до готового результату'] },
    2: { title: 'AI-контент', topics: ['Генерація ідей та контент-планів', 'Тексти для соцмереж та бізнесу', 'Сценарії для Reels, TikTok та YouTube', 'Hooks, CTA та структура контенту', 'Адаптація одного матеріалу під різні формати', 'AI для особистого бренду', 'Створення контент-системи за допомогою AI'] },
    3: { title: 'AI-дизайн', topics: ['Генерація зображень з AI', 'Створення креативів для соцмереж', 'Банери та рекламні матеріали', 'AI-фото та предметна зйомка', 'Ілюстрації та візуальні концепції', 'Робота зі стилем та консистентністю', 'Редагування та покращення AI-зображень', 'Створення готового візуального пакета для бізнесу'] },
    4: { title: 'AI-відео', topics: ['Як створювати відео з AI', 'Image-to-video та text-to-video', 'Сценарій та розкадровка', 'Рух камери та анімація', 'AI-персонажі та consistency', 'Озвучка, музика та sound design', 'Монтаж та фінальна обробка', 'Створення готового рекламного AI-відео'] },
    5: { title: 'Портфоліо', topics: ['Які роботи потрібні AI Creator', 'Як вибрати напрям для портфоліо', 'Створення перших робіт', 'Як оформити кейс', 'Як презентувати свої послуги', 'Портфоліо, яке можна показувати клієнтам'], result: 'Результат модуля: готове портфоліо з роботами, які можна використовувати для презентації своїх послуг.' },
    6: { title: 'Монетизація', topics: ['Які AI-послуги можна продавати', 'Хто замовляє AI-контент', 'Як сформувати свою послугу', 'Як визначити ціну', 'Де шукати перших клієнтів', 'Як презентувати себе та отримати перше замовлення'] }
  };

  const popup = document.querySelector('#program-popup');
  let popupTrigger = null;
  const closePopup = () => {
    if (!popup?.classList.contains('active')) return;
    popup.classList.remove('active');
    document.body.classList.remove('modal-open');
    popupTrigger?.focus({ preventScroll: true });
    popupTrigger = null;
  };
  const openPopup = (id, trigger) => {
    const module = modules[id];
    if (!popup || !module) return;
    popupTrigger = trigger;
    document.querySelector('#program-popup-number').textContent = `${String(id).padStart(2, '0')} — МОДУЛЬ`;
    document.querySelector('#program-popup-title').textContent = module.title;
    document.querySelector('#program-popup-count').textContent = `${module.topics.length} тем`;
    document.querySelector('#program-popup-topics').replaceChildren(...module.topics.map((topic) => {
      const item = document.createElement('li'); item.textContent = topic; return item;
    }));
    const result = document.querySelector('#program-popup-result');
    result.textContent = module.result || '';
    result.hidden = !module.result;
    popup.classList.add('active');
    document.body.classList.add('modal-open');
    popup.querySelector('#program-popup-topics').scrollTop = 0;
    popup.querySelector('.popup-card').scrollTop = 0;
    popup.querySelector('.popup-close').focus();
  };
  document.querySelectorAll('[data-module]').forEach((button) => button.addEventListener('click', () => openPopup(button.dataset.module, button)));
  popup?.querySelector('.popup-close')?.addEventListener('click', closePopup);
  popup?.addEventListener('click', (event) => { if (event.target === popup) closePopup(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closePopup(); });

  const burger = document.querySelector('.burger-btn');
  const menu = document.querySelector('.mobile-menu');
  const menuOverlay = document.querySelector('.mobile-overlay');
  const closeMenu = () => { menu?.classList.remove('active'); menuOverlay?.classList.remove('active'); burger?.classList.remove('active'); };
  burger?.addEventListener('click', () => { menu?.classList.toggle('active'); menuOverlay?.classList.toggle('active'); burger?.classList.toggle('active'); });
  menuOverlay?.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-nav a, .mobile-cta').forEach((link) => link.addEventListener('click', closeMenu));

  document.querySelectorAll('.faq-header-item').forEach((header) => header.addEventListener('click', () => header.closest('.faq-item')?.classList.toggle('active')));

  // Match each FAQ panel to its content while preserving the existing transition.
  const faqHeightObserver = new ResizeObserver((entries) => {
    entries.forEach(({ target }) => {
      const answer = target.closest('.faq-answer');
      answer.style.setProperty('--faq-answer-height', `${Math.ceil(answer.scrollHeight)}px`);
    });
  });
  document.querySelectorAll('#faq .faq-answer').forEach((answer) => {
    answer.style.setProperty('--faq-answer-height', `${Math.ceil(answer.scrollHeight)}px`);
    const content = answer.querySelector('p');
    if (content) faqHeightObserver.observe(content);
  });

  // Tariff panels are independent; desktop always shows their contents.
  const tariffMobile = window.matchMedia('(max-width:767px)');
  document.querySelectorAll('#pricing .tariff-summary').forEach((summary) => {
    const panel = document.getElementById(summary.getAttribute('aria-controls'));
    if (!panel) return;
    const price = summary.querySelector('.tariff-price');
    const access = summary.querySelector('.tariff-access');
    const details = panel.querySelector('.tariff-details');
    const choose = panel.querySelector('.tariff-btn');
    let mobileOpen = summary.getAttribute('aria-expanded') === 'true';
    const syncTariff = () => {
      const expanded = !tariffMobile.matches || mobileOpen;
      if (price && access && details && choose) {
        if (tariffMobile.matches) summary.insertBefore(price, access);
        else details.insertBefore(price, choose);
      }
      summary.disabled = !tariffMobile.matches;
      summary.setAttribute('aria-expanded', String(expanded));
      panel.classList.toggle('is-open', expanded);
      panel.inert = !expanded;
      panel.setAttribute('aria-hidden', String(!expanded));
    };
    summary.addEventListener('click', () => {
      if (!tariffMobile.matches) return;
      mobileOpen = !mobileOpen;
      syncTariff();
    });
    tariffMobile.addEventListener('change', syncTariff);
    syncTariff();
  });

  const stories = document.querySelector('#reviews .reviews-slider');
  const storiesTrack = stories?.querySelector('.reviews-track');
  const storyCards = storiesTrack ? [...storiesTrack.querySelectorAll('.review-card')] : [];
  if (stories && storiesTrack && storyCards.length) {
    let storyIndex = 0;
    const storyCounter = stories.querySelector('.stories-counter');
    const storiesMobile = window.matchMedia('(max-width:767px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion:reduce)');
    const storyLimit = () => {
      const gap = parseFloat(getComputedStyle(storiesTrack).columnGap) || 0;
      const cardWidth = storyCards[0].getBoundingClientRect().width;
      const visible = Math.max(1, Math.round((storiesTrack.clientWidth + gap) / (cardWidth + gap)));
      return Math.max(0, storyCards.length - visible);
    };
    const showStory = (animate = true) => {
      storyIndex = Math.min(storyIndex, storyLimit());
      if (storyCounter) storyCounter.textContent = `${storyIndex + 1} / ${storyCards.length}`;
      storiesTrack.scrollTo({
        left: storyCards[storyIndex].offsetLeft - storyCards[0].offsetLeft,
        behavior: animate && !reducedMotion.matches ? 'smooth' : 'instant'
      });
    };
    const moveStory = (direction) => {
      const limit = storyLimit();
      storyIndex = (storyIndex + direction + limit + 1) % (limit + 1);
      showStory();
    };
    stories.querySelector('.prev')?.addEventListener('click', () => moveStory(-1));
    stories.querySelector('.next')?.addEventListener('click', () => moveStory(1));
    let swipeStart = null;
    storiesTrack.addEventListener('touchstart', (event) => {
      swipeStart = null;
      if (!storiesMobile.matches || event.touches.length !== 1) return;
      const touch = event.touches[0];
      swipeStart = { id: touch.identifier, x: touch.clientX, y: touch.clientY, vertical: false };
    }, { passive: true });
    storiesTrack.addEventListener('touchmove', (event) => {
      if (!swipeStart) return;
      if (event.touches.length !== 1) { swipeStart = null; return; }
      const touch = event.touches[0];
      const dx = Math.abs(touch.clientX - swipeStart.x);
      const dy = Math.abs(touch.clientY - swipeStart.y);
      if (dy > 10 && dy > dx) swipeStart.vertical = true;
    }, { passive: true });
    storiesTrack.addEventListener('touchend', (event) => {
      const start = swipeStart;
      swipeStart = null;
      if (!start || start.vertical || !storiesMobile.matches) return;
      const touch = [...event.changedTouches].find((item) => item.identifier === start.id);
      if (!touch) return;
      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;
      if (Math.abs(dx) >= Math.max(40, storiesTrack.clientWidth * .12) && Math.abs(dx) > Math.abs(dy) * 1.5) {
        moveStory(dx < 0 ? 1 : -1);
      }
    }, { passive: true });
    storiesTrack.addEventListener('touchcancel', () => { swipeStart = null; }, { passive: true });
    storiesTrack.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      moveStory(event.key === 'ArrowLeft' ? -1 : 1);
    });
    new ResizeObserver(() => showStory(false)).observe(storiesTrack);
  }

  // Mobile photo deck keeps one existing gallery card active.
  const worksGallery = document.querySelector('#reviews .works-grid');
  const worksCards = worksGallery ? [...worksGallery.querySelectorAll('.work-card')] : [];
  if (worksGallery && worksCards.length) {
    const mobileDeck = window.matchMedia('(max-width:767px)');
    let activeWork = 0;
    let deckFrame = 0;
    const edgeControls = [];
    const zoomControls = [];
    const hint = document.createElement('p');
    hint.className = 'work-deck-hint';
    hint.textContent = 'Торкнись краю картки, щоб переглянути іншу роботу';
    worksCards.forEach((card, index) => {
      if (!card.id) card.id = `deck-work-${index + 1}`;
      const caption = card.querySelector('p').textContent.trim();
      const control = document.createElement('button');
      control.type = 'button';
      control.className = 'work-deck-control';
      control.setAttribute('aria-label', `Переглянути роботу ${index + 1}: ${caption}`);
      control.setAttribute('aria-controls', card.id);
      control.hidden = true;
      control.addEventListener('click', () => selectWork(index));
      edgeControls.push(control);
      worksGallery.append(control);
      const zoom = document.createElement('button');
      zoom.type = 'button';
      zoom.className = 'work-deck-zoom';
      zoom.setAttribute('aria-label', `Збільшити: ${caption}`);
      zoom.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5M3 3l6 6M21 3l-6 6M3 21l6-6M21 21l-6-6"/></svg>';
      zoom.hidden = true;
      zoom.addEventListener('click', () => card.querySelector('img').click());
      card.append(zoom);
      zoomControls.push(zoom);
    });
    worksGallery.append(hint);
    const layoutDeck = () => {
      worksGallery.classList.toggle('works-deck-ready', mobileDeck.matches);
      const cardHeight = Math.max(...worksCards.map(card => card.getBoundingClientRect().height));
      const activeTop = (worksCards.length - 1) * 30;
      const coveredOrder = worksCards.map((card, index) => index).filter(index => index !== activeWork);
      const deckBottom = cardHeight + (worksCards.length - 1) * 30 + 6;
      worksCards.forEach((card, index) => {
        const active = index === activeWork;
        card.classList.toggle('is-covered', mobileDeck.matches && !active);
        card.inert = mobileDeck.matches && !active;
        const rank = coveredOrder.indexOf(index);
        const top = active ? activeTop : rank * 30;
        card.style.setProperty('--deck-top', `${top}px`);
        card.style.setProperty('--deck-layer', active ? '10' : String(rank + 1));
        edgeControls[index].style.setProperty('--control-top', `${top}px`);
        edgeControls[index].hidden = !mobileDeck.matches || active;
        edgeControls[index].setAttribute('aria-expanded', String(active));
        zoomControls[index].hidden = !mobileDeck.matches || !active;
      });
      hint.style.setProperty('--hint-top', `${deckBottom + 12}px`);
      worksGallery.style.setProperty('--deck-height', `${deckBottom + 52}px`);
    };
    const selectWork = (index) => {
      if (!mobileDeck.matches) return;
      activeWork = index;
      layoutDeck();
      zoomControls[index].focus({ preventScroll: true });
    };
    worksGallery.addEventListener('keydown', (event) => {
      if (!mobileDeck.matches || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      selectWork((activeWork + (event.key === 'ArrowLeft' ? -1 : 1) + worksCards.length) % worksCards.length);
    });
    mobileDeck.addEventListener('change', layoutDeck);
    const deckResize = new ResizeObserver(() => {
      cancelAnimationFrame(deckFrame);
      deckFrame = requestAnimationFrame(layoutDeck);
    });
    worksCards.forEach(card => deckResize.observe(card));
    layoutDeck();
  }

  const lightbox = document.querySelector('#lightbox');
  const lightboxImage = lightbox?.querySelector('img');
  document.querySelectorAll('.work-card img').forEach((image) => image.addEventListener('click', () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = image.currentSrc || image.src; lightboxImage.alt = image.alt;
    lightbox.classList.add('active');
  }));
  lightbox?.addEventListener('click', () => lightbox.classList.remove('active'));

  document.querySelectorAll('.phone-input').forEach((input) => input.addEventListener('input', () => {
    const digits = input.value.replace(/\D/g, '').slice(0, 9);
    input.value = digits.replace(/(\d{2})(\d{0,3})(\d{0,2})(\d{0,2})/, (_, a, b, c, d) => [a, b, c, d].filter(Boolean).join(' '));
  }));
  // One shared notification; demo actions never send or retain form data.
  const demoPopup = document.querySelector('#successPopup');
  const demoClose = demoPopup?.querySelector('.demo-close');
  let demoState = null;
  const openDemo = (trigger) => {
    if (!demoPopup || !demoClose || demoState) return;
    const background = [...document.body.children]
      .filter((node) => node !== demoPopup && !['SCRIPT', 'STYLE', 'LINK'].includes(node.tagName))
      .map((node) => ({ node, inert: node.inert }));
    demoState = {
      trigger, background, x: window.scrollX, y: window.scrollY,
      bodyStyle: document.body.style.cssText
    };
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const padding = parseFloat(getComputedStyle(document.body).paddingRight) || 0;
    Object.assign(document.body.style, {
      position: 'fixed', top: `-${demoState.y}px`, left: `-${demoState.x}px`,
      width: '100%', overflow: 'hidden', paddingRight: `${padding + scrollbar}px`
    });
    background.forEach(({ node }) => { node.inert = true; });
    demoPopup.inert = false;
    demoPopup.setAttribute('aria-hidden', 'false');
    demoPopup.classList.add('show');
    demoClose.focus({ preventScroll: true });
  };
  const closeDemo = () => {
    if (!demoPopup || !demoState) return;
    const state = demoState;
    demoState = null;
    demoPopup.classList.remove('show');
    demoPopup.inert = true;
    demoPopup.setAttribute('aria-hidden', 'true');
    state.background.forEach(({ node, inert }) => { node.inert = inert; });
    document.body.style.cssText = state.bodyStyle;
    window.scrollTo({ left: state.x, top: state.y, behavior: 'instant' });
    if (state.trigger?.isConnected) state.trigger.focus({ preventScroll: true });
  };
  document.querySelectorAll('[data-demo]').forEach((button) => button.addEventListener('click', (event) => {
    event.preventDefault();
    openDemo(button);
  }));
  document.querySelectorAll('.cta-form').forEach((form) => form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Native constraint validation runs before this submit event.
    openDemo(event.submitter || form.querySelector('[type="submit"]'));
  }));
  demoClose?.addEventListener('click', closeDemo);
  demoPopup?.addEventListener('click', (event) => { if (event.target === demoPopup) closeDemo(); });
  document.addEventListener('keydown', (event) => {
    if (!demoState) return;
    if (event.key === 'Escape') { event.preventDefault(); closeDemo(); }
    else if (event.key === 'Tab') { event.preventDefault(); demoClose.focus({ preventScroll: true }); }
  });
  if (window.lucide) window.lucide.createIcons();
});
