document.addEventListener('DOMContentLoaded', () => {
  const modules = {
    1: { title: 'Основи AI', topics: ['Як працює генеративний AI', 'Які AI-інструменти використовувати для різних задач', 'Як правильно ставити завдання AI', 'Промпти: структура, логіка та практика', 'Як отримувати стабільний результат, а не випадкову генерацію', 'AI у роботі: від ідеї до готового результату'] },
    2: { title: 'AI-контент', topics: ['Генерація ідей та контент-планів', 'Тексти для соцмереж та бізнесу', 'Сценарії для Reels, TikTok та YouTube', 'Hooks, CTA та структура контенту', 'Адаптація одного матеріалу під різні формати', 'AI для особистого бренду', 'Створення контент-системи за допомогою AI'] },
    3: { title: 'AI-дизайн', topics: ['Генерація зображень з AI', 'Створення креативів для соцмереж', 'Банери та рекламні матеріали', 'AI-фото та предметна зйомка', 'Ілюстрації та візуальні концепції', 'Робота зі стилем та консистентністю', 'Редагування та покращення AI-зображень', 'Створення готового візуального пакета для бізнесу'] },
    4: { title: 'AI-відео', topics: ['Як створювати відео з AI', 'Image-to-video та text-to-video', 'Сценарій та розкадровка', 'Рух камери та анімація', 'AI-персонажі та consistency', 'Озвучка, музика та sound design', 'Монтаж та фінальна обробка', 'Створення готового рекламного AI-відео'] },
    5: { title: 'Портфоліо', topics: ['Які роботи потрібні AI Creator', 'Як вибрати напрям для портфоліо', 'Створення перших робіт', 'Як оформити кейс', 'Як презентувати свої послуги', 'Портфоліо, яке можна показувати клієнтам'], result: 'Результат модуля: готове портфоліо з роботами, які можна використовувати для презентації своїх послуг.' },
    6: { title: 'Монетизація', topics: ['Які AI-послуги можна продавати', 'Хто замовляє AI-контент', 'Як сформувати свою послугу', 'Як визначити ціну', 'Де шукати перших клієнтів', 'Як презентувати себе та отримати перше замовлення'] }
  };

  const popup = document.querySelector('#program-popup');
  const closePopup = () => {
    if (!popup) return;
    popup.classList.remove('active');
    document.body.classList.remove('modal-open');
  };
  const openPopup = (id) => {
    const module = modules[id];
    if (!popup || !module) return;
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
    popup.querySelector('.popup-close').focus();
  };
  document.querySelectorAll('[data-module]').forEach((button) => button.addEventListener('click', () => openPopup(button.dataset.module)));
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
  document.querySelectorAll('form').forEach((form) => form.addEventListener('submit', (event) => {
    event.preventDefault();
    document.querySelectorAll('.success-popup').forEach((success) => success.classList.add('show'));
  }));
  document.querySelectorAll('.success-btn').forEach((button) => button.addEventListener('click', () => document.querySelectorAll('.success-popup').forEach((success) => success.classList.remove('show'))));
  if (window.lucide) window.lucide.createIcons();
});
