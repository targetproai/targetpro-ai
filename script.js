// ============================================================
// TARGETPRO AI — script.js
// Автор: Евгений Тузов
// ============================================================

// ===== НАСТРОЙКИ (заменить своими данными) =====
const CONFIG = {
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbx94-GCp-Z1uKpC2_PrfQL3UnE86PYDTrUa_Z70-RHXFMJ0u183pUBr3H97MjMh_oe_/exec',
  TELEGRAM_BOT_TOKEN: 'XXXXXXXXXX:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  TELEGRAM_CHAT_ID: '-100XXXXXXXXXX',
  INSTAGRAM_URL: 'https://instagram.com/XXXXXXXXX',
  GA_ID: 'G-XXXXXXXXXX',
  WHATSAPP: '996XXXXXXXXX',
  SITE_URL: 'https://targetpro.kg',
};

async function postToAppsScript(payload) {
  const response = await fetch(CONFIG.APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  });

  const raw = await response.text();
  let data;

  try {
    data = JSON.parse(raw);
  } catch (err) {
    throw new Error(`Apps Script returned non-JSON response (${response.status}): ${raw.slice(0, 300)}`);
  }

  if (!response.ok || data.success === false) {
    throw new Error(data.error || `Apps Script request failed with HTTP ${response.status}`);
  }

  return data;
}

function extractGeneratedText(data) {
  return data && (data.text || data.result || data.audit || data.html || data.content || '');
}

// ===== ЛОКАЛИЗАЦИЯ =====
const I18N = {
  ru: {
    langToggle: '🇰🇬 KY',
    headerCta: 'Получить аудит',
    heroBadge: '🤖 AI-аудит роста для бизнеса Кыргызстана',
    heroTitle: 'Узнайте, где ваш бизнес<br>теряет клиентов',
    heroSub: 'TARGETPRO AI проанализирует Instagram, рекламу и воронку продаж, а затем покажет точки роста бизнеса в сомах.',
    heroBtn: 'Получить бесплатный AI-аудит',
    heroAuthor: 'Создано Евгением Тузовым',
    stat1: 'аудитов проведено',
    stat2: 'клиентов получили заявки',
    stat3: 'рост конверсии в среднем',
    stepsTitle: 'Как это работает',
    step1t: 'Покажите бизнес и Instagram',
    step1d: 'AI изучает профиль, оффер, контент и путь клиента',
    step2t: 'Получите маркетинговый рейтинг',
    step2d: 'До 100 баллов с детальной расшифровкой',
    step3t: 'Узнайте дополнительный доход в сомах',
    step3d: 'Формула расчёта с учётом заявок, среднего чека и конверсии',
    step4t: 'Получите маркетинговый паспорт',
    step4d: 'HTML-отчёт с планом действий на 30 дней',
    chatTitle: 'Начните AI-аудит прямо сейчас',
    onlineText: 'онлайн',
    servicesTitle: 'Что покажет бесплатный AI-аудит',
    s1t: 'Где теряются клиенты',
    s1d: 'AI находит слабые места в Instagram, рекламе, оффере и воронке продаж.',
    s2t: 'Что мешает заявкам',
    s2d: 'Показывает, где нет доверия, понятного CTA, прогрева или быстрой обработки обращений.',
    s3t: 'Сколько денег можно вернуть',
    s3d: 'Считает потенциальный дополнительный доход в месяц и в год на основе ваших цифр.',
    s4t: 'Что исправить первым',
    s4d: 'Даёт быстрые действия на 24 часа и план роста, который можно внедрять сразу.',
    s5t: 'Что нужно именно вам',
    s5d: 'По итогам аудита станет понятно: нужен таргет, воронка, чат-бот, автоматизация или консультация.',
    s6t: 'Как запустить рост',
    s6d: 'Евгений разберёт рекомендации TARGETPRO AI и предложит самый быстрый путь к заявкам.',
    testimonialsTitle: 'Кейсы и цифры',
    t1: '"RIO: после настройки рекламы получили 39 лидов по $0.32. Заявки пошли уже в первые дни кампании."',
    t2: '"Детский лагерь: собрали поток заявок перед сезоном и быстро поняли, какие объявления дают самые дешёвые обращения."',
    t3: '"Локальный бизнес: после аудита усилили оффер, добавили CTA и получили 47 заявок за месяц."',
    ownerTitle: '👋 Меня зовут Евгений Тузов',
    ownerText: 'Настраиваю таргетированную рекламу, воронки и автоматизацию для бизнеса Кыргызстана. TARGETPRO AI помогает быстро увидеть слабые места, а я помогаю внедрить решения без лишних ошибок.',
    ownerBadge1: 'Таргет Meta Ads',
    ownerBadge2: 'Воронки продаж',
    ownerBadge3: 'Автоматизация заявок',
    ctaTitle: 'Готовы увидеть точки роста бизнеса?',
    ctaSub: 'Получите бесплатный AI-аудит и поймите, что мешает заявкам прямо сейчас.',
    ctaBtn: 'Запустить бесплатный аудит',
    waLink: '💬 WhatsApp',
    floatingWa: '💬 Написать Евгению',
    tgLink: '✈️ Telegram',
    igLink: '📸 Instagram',
    footerText: 'Первый AI-маркетолог для бизнеса в Кыргызстане',
    footerAuthor: '© 2025 Евгений Тузов. Все права защищены.',
    apTitle: 'Режим АВТОПИЛОТ',
    apDesc: 'Поделитесь ссылкой с другом-предпринимателем и получите расширенный аудит, 10 идей для Reels и 7-дневный план действий бесплатно!',
    apBonuses: ['📊 Расширенный аудит профиля', '🎬 10 идей для Reels под вашу нишу', '📅 7-дневный контент-план', '🎯 Рекомендации по воронке и заявкам', '📞 Приоритетная консультация'],
    apShareBtn: '📤 Поделиться ссылкой',
    apConfirmBtn: '✅ Я поделился',
    apSkipBtn: 'Пропустить',
    downloadBtn: '⬇ Скачать паспорт',
    closePassBtn: 'Закрыть',
  },
  ky: {
    langToggle: '🇷🇺 RU',
    headerCta: 'Аудит алуу',
    heroBadge: '🤖 Кыргызстан бизнеси үчүн AI-өсүү аудити',
    heroTitle: 'Бизнесиңиз кардарды<br>кайсы жерден жоготуп жатат?',
    heroSub: 'TARGETPRO AI Instagram, жарнама жана сатуу воронкасын талдап, бизнес өсө турган чекиттерди сом менен көрсөтөт.',
    heroBtn: 'Акысыз AI-аудит алуу',
    heroAuthor: 'Евгений Тузов тарабынан жасалган',
    stat1: 'аудит жүргүзүлдү',
    stat2: 'кардар арыз алды',
    stat3: 'конверсия өстү орточо',
    stepsTitle: 'Кандай иштейт',
    step1t: 'Бизнес жана Instagram көрсөтүңүз',
    step1d: 'AI профиль, оффер, контент жана кардардын жолун талдайт',
    step2t: 'Маркетинг рейтингин алыңыз',
    step2d: '100 балга чейин деталдуу чечмелөө менен',
    step3t: 'Кошумча киреше потенциалын билиңиз',
    step3d: 'Арыз, орточо чек жана конверсия боюнча эсептөө',
    step4t: 'Маркетинг паспортун алыңыз',
    step4d: '30 күндүк иш планы бар HTML-отчет',
    chatTitle: 'AI-аудитти азыр баштаңыз',
    onlineText: 'онлайн',
    servicesTitle: 'Акысыз AI-аудит эмнени көрсөтөт',
    s1t: 'Кардар кайда жоголот',
    s1d: 'AI Instagram, жарнама, оффер жана сатуу воронкасындагы алсыз жерлерди табат.',
    s2t: 'Арызга эмне тоскоол болот',
    s2d: 'Ишеним, CTA, жылытуу же кайрылууларды тез иштетүү кайсы жерде жетишпей жатканын көрсөтөт.',
    s3t: 'Канча акча кайтарса болот',
    s3d: 'Сиздин сандар боюнча айлык жана жылдык кошумча киреше потенциалын эсептейт.',
    s4t: 'Биринчи эмне оңдолот',
    s4d: '24 саатта жасала турган тез кадамдарды жана өсүү планын берет.',
    s5t: 'Сизге эмне керек',
    s5d: 'Аудиттен кийин таргет, воронка, чат-бот, автоматташтыруу же консультация керекпи — түшүнүктүү болот.',
    s6t: 'Өсүүнү кантип баштоо',
    s6d: 'Евгений TARGETPRO AI сунуштарын карап, арызга эң тез жолду сунуштайт.',
    testimonialsTitle: 'Кейстер жана сандар',
    t1: '"RIO: жарнама орнотулгандан кийин 39 лид $0.32 баада алынды. Арыздар кампаниянын биринчи күндөрүндө келди."',
    t2: '"Балдар лагери: сезон алдында арыз агымын чогултуп, кайсы жарнамалар эң арзан кайрылуу берерин аныктадык."',
    t3: '"Локалдык бизнес: аудиттен кийин офферди күчөтүп, CTA коштук жана бир айда 47 арыз алынды."',
    ownerTitle: '👋 Менин атым Евгений Тузов',
    ownerText: 'Кыргызстан бизнеси үчүн таргет жарнама, воронка жана автоматташтыруу орнотом. TARGETPRO AI алсыз жерлерди тез көрсөтөт, мен болсо чечимдерди туура киргизүүгө жардам берем.',
    ownerBadge1: 'Meta Ads таргет',
    ownerBadge2: 'Сатуу воронкалары',
    ownerBadge3: 'Арыздарды автоматташтыруу',
    ctaTitle: 'Бизнесиңиздин өсүү чекиттерин көргүңүз келеби?',
    ctaSub: 'Акысыз AI-аудит алыңыз жана арыздарга эмне тоскоол болуп жатканын түшүнүңүз.',
    ctaBtn: 'Акысыз аудит баштоо',
    waLink: '💬 WhatsApp',
    floatingWa: '💬 Евгенийге жазуу',
    tgLink: '✈️ Telegram',
    igLink: '📸 Instagram',
    footerText: 'Кыргызстандагы бизнес үчүн биринчи AI-маркетолог',
    footerAuthor: '© 2025 Евгений Тузов. Бардык укуктар корголгон.',
    apTitle: 'АВТОПИЛОТ режими',
    apDesc: 'Ишкер досуңузга шилтемени жибериңиз жана кеңейтилген аудит, Reels үчүн 10 идея жана 7 күндүк план акысыз алыңыз!',
    apBonuses: ['📊 Кеңейтилген профиль аудити', '🎬 Нишаңыз үчүн Reels үчүн 10 идея', '📅 7 күндүк мазмун планы', '🎯 Воронка жана арыздар боюнча сунуштар', '📞 Приоритеттик консультация'],
    apShareBtn: '📤 Шилтемени бөлүшүү',
    apConfirmBtn: '✅ Мен бөлүштүм',
    apSkipBtn: 'Өткөрүп жиберүү',
    downloadBtn: '⬇ Паспорт жүктөп алуу',
    closePassBtn: 'Жабуу',
  }
};

// ===== СОСТОЯНИЕ =====
let lang = 'ru';
let chatState = 'idle';
let userData = {
  name: '', phone: '', instagram: '', niche: '', city: '',
  goal: '', avgCheck: 0, currentLeads: 0, desiredLeads: 0,
  conversion: 0, rating: 0, profileDesc: '', sharedLink: false,
  source: detectSource(), language: 'ru', comment: '',
};
let chatHistory = [];
let isTyping = false;
let passportData = {};
let auditProgressTimer = null;

// ===== ВОРОНКА — шаги =====
const STEPS = {
  WELCOME: 'welcome',
  SUBSCRIBE: 'subscribe',
  INSTAGRAM: 'instagram',
  NICHE: 'niche',
  CITY: 'city',
  PROFILE_DESC: 'profile_desc',
  GOAL: 'goal',
  MINI_AUDIT: 'mini_audit',
  RATING_SHOW: 'rating_show',
  PROFIT_Q1: 'profit_q1',
  PROFIT_Q2: 'profit_q2',
  PROFIT_Q3: 'profit_q3',
  PROFIT_Q4: 'profit_q4',
  PROFIT_SHOW: 'profit_show',
  BUDGET_SHOW: 'budget_show',
  COLLECT_NAME: 'collect_name',
  COLLECT_PHONE: 'collect_phone',
  PASSPORT_SHOW: 'passport_show',
  AUTOPILOT: 'autopilot',
  DONE: 'done',
};

let currentStep = STEPS.WELCOME;

// ===== КЛЮЧЕВЫЕ ДАННЫЕ ДЛЯ РАСЧЁТОВ =====
const NICHE_BUDGETS = {
  'кафе': { min: 8000, max: 18000, cpl: '150–400', audience: 'Женщины 22–40, Бишкек/Ош, интерес «рестораны, еда»' },
  'салон': { min: 6000, max: 15000, cpl: '200–500', audience: 'Женщины 18–35, интерес «красота, уход»' },
  'магазин': { min: 10000, max: 25000, cpl: '100–300', audience: 'Мужчины и женщины 20–45, по геолокации' },
  'зона отдыха': { min: 12000, max: 30000, cpl: '300–600', audience: 'Семьи, 25–45, интерес «отдых, природа»' },
  'стоматология': { min: 8000, max: 20000, cpl: '400–800', audience: 'Все 25–55, геолокация ±3 км' },
  'курсы': { min: 5000, max: 15000, cpl: '200–500', audience: 'Молодёжь 18–35, интерес «обучение»' },
  'услуги': { min: 6000, max: 15000, cpl: '150–400', audience: 'По нише и геолокации' },
  'автосервис': { min: 8000, max: 20000, cpl: '250–600', audience: 'Мужчины 25–50, интерес «авто»' },
  'default': { min: 6000, max: 15000, cpl: '200–500', audience: 'Целевая аудитория по нише' },
};

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  syncExternalLinks();

  const savedLang = localStorage.getItem('tp_language');
  const savedName = localStorage.getItem('tp_name');

  if (savedLang) {
    // Уже выбирал язык — скрыть оверлей
    document.getElementById('lang-overlay').style.display = 'none';
    lang = savedLang;
    userData.language = lang;
    applyLanguage();
    if (savedName) {
      userData.name = savedName;
      loadFromStorage();
    }
  }
  // Оверлей виден по умолчанию если не было сохранённого языка
});

function syncExternalLinks() {
  const waUrl = `https://wa.me/${CONFIG.WHATSAPP}`;
  const igUrl = CONFIG.INSTAGRAM_URL;

  ['waLink', 'floatingWa'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = waUrl;
  });

  const ig = document.getElementById('igLink');
  if (ig) ig.href = igUrl;
}

function initTheme() {
  const savedTheme = localStorage.getItem('tp_theme');
  const systemPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  const theme = savedTheme || (systemPrefersLight ? 'business' : 'ai');
  applyTheme(theme);
}

function applyTheme(theme) {
  const normalized = theme === 'business' ? 'business' : 'ai';
  document.documentElement.setAttribute('data-theme', normalized);
  localStorage.setItem('tp_theme', normalized);

  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.textContent = normalized === 'business' ? '☀ Business Mode' : '🌙 AI Mode';
    btn.setAttribute('aria-label', normalized === 'business' ? 'Switch to AI Mode' : 'Switch to Business Mode');
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'ai';
  applyTheme(current === 'ai' ? 'business' : 'ai');
  trackEvent('theme_toggled', { theme: document.documentElement.getAttribute('data-theme') });
}

function selectLanguage(l) {
  lang = l;
  userData.language = l;
  localStorage.setItem('tp_language', l);
  document.getElementById('lang-overlay').style.display = 'none';
  applyLanguage();
  trackEvent('language_selected', { language: l });

  const savedName = localStorage.getItem('tp_name');
  if (savedName) {
    userData.name = savedName;
    loadFromStorage();
  }
}

function toggleLanguage() {
  lang = lang === 'ru' ? 'ky' : 'ru';
  userData.language = lang;
  localStorage.setItem('tp_language', lang);
  applyLanguage();
}

function applyLanguage() {
  const t = I18N[lang];
  Object.keys(t).forEach(k => {
    const el = document.getElementById(k);
    if (!el) return;
    if (k === 'heroTitle') { el.innerHTML = t[k]; return; }
    if (k === 'apBonuses') {
      el.innerHTML = t[k].map(b => `<div class="bonus-item">${b}</div>`).join('');
      return;
    }
    el.textContent = t[k];
  });
}

// ===== ЗАПУСК ЧАТА =====
function startChat() {
  document.getElementById('chat').scrollIntoView({ behavior: 'smooth' });
  if (chatState === 'idle') {
    chatState = 'active';
    trackEvent('audit_started');
    setTimeout(() => runStep(STEPS.WELCOME), 300);
  }
}

// ===== ОСНОВНАЯ ЛОГИКА ВОРОНКИ =====
function runStep(step) {
  currentStep = step;
  switch (step) {
    case STEPS.WELCOME: stepWelcome(); break;
    case STEPS.SUBSCRIBE: stepSubscribe(); break;
    case STEPS.INSTAGRAM: stepInstagram(); break;
    case STEPS.NICHE: stepNiche(); break;
    case STEPS.CITY: stepCity(); break;
    case STEPS.PROFILE_DESC: stepProfileDesc(); break;
    case STEPS.GOAL: stepGoal(); break;
    case STEPS.MINI_AUDIT: stepMiniAudit(); break;
    case STEPS.RATING_SHOW: stepRatingShow(); break;
    case STEPS.PROFIT_Q1: stepProfitQ1(); break;
    case STEPS.PROFIT_Q2: stepProfitQ2(); break;
    case STEPS.PROFIT_Q3: stepProfitQ3(); break;
    case STEPS.PROFIT_Q4: stepProfitQ4(); break;
    case STEPS.PROFIT_SHOW: stepProfitShow(); break;
    case STEPS.BUDGET_SHOW: stepBudgetShow(); break;
    case STEPS.COLLECT_NAME: stepCollectName(); break;
    case STEPS.COLLECT_PHONE: stepCollectPhone(); break;
    case STEPS.PASSPORT_SHOW: stepPassportShow(); break;
    case STEPS.AUTOPILOT: stepAutopilot(); break;
  }
}

// ===== ШАГИ ВОРОНКИ =====

function stepWelcome() {
  const savedName = localStorage.getItem('tp_name');
  if (savedName) {
    const savedRating = localStorage.getItem('tp_rating');
    const savedDate = localStorage.getItem('tp_audit_date');
    addReturningBanner(savedName, savedRating, savedDate);
  }

  const msgs = {
    ru: `Привет! 👋 Я TARGETPRO AI — AI-маркетолог для бизнеса в Кыргызстане.\n\nЯ проведу бесплатный аудит: посмотрю Instagram, оффер, рекламу и воронку продаж, а затем покажу, где бизнес теряет клиентов и какой доход можно вернуть.\n\nЭто займёт около 5 минут. Начнём?`,
    ky: `Саламатсызбы! 👋 Мен TARGETPRO AI — Кыргызстан бизнеси үчүн AI-маркетологмун.\n\nМен акысыз аудит жүргүзөм: Instagram, оффер, жарнама жана сатуу воронкасын карап, бизнес кайсы жерден кардар жоготуп жатканын жана канча киреше кайтарса болорун көрсөтөм.\n\nБул болжол менен 5 мүнөт алат. Баштайлыбы?`
  };
  botMessage(msgs[lang]);
  addButtons([
    { label: lang === 'ru' ? '✅ Начать аудит' : '✅ Аудит баштоо', action: () => runStep(STEPS.SUBSCRIBE) },
    { label: lang === 'ru' ? '📞 Хочу консультацию' : '📞 Консультация алгым келет', action: () => jumpToConsultation() },
  ]);
}

function stepSubscribe() {
  const msgs = {
    ru: `Отлично! Пока AI готовит анализ, хочу предложить вам кое-что полезное.\n\nЯ подготовлю быстрый AI-аудит. Чтобы не потерять рекомендации и получать новые фишки по рекламе — подпишитесь на Instagram Евгения Тузова 👇`,
    ky: `Жакшы! AI анализди даярдап жатканда, бирдеме пайдалуу сунуштайм.\n\nTARGETPRO AI тез аудит даярдайт. Сунуштарды жоготпоо жана жарнама боюнча жаңы кеңештерди алуу үчүн Евгений Тузовдун Instagram\'ына жазылыңыз 👇`
  };
  botMessage(msgs[lang]);
  addButtons([
    {
      label: lang === 'ru' ? '📸 Подписаться в Instagram и продолжить' : '📸 Instagramга жазылып, улантуу',
      action: () => {
        trackEvent('instagram_subscribe_clicked');
        window.open(CONFIG.INSTAGRAM_URL, '_blank', 'noopener,noreferrer');
        setTimeout(() => runStep(STEPS.INSTAGRAM), 700);
      }
    },
  ]);
}

function stepInstagram() {
  const msgs = {
    ru: 'Введите ссылку на ваш Instagram-аккаунт (например: @my_business или https://instagram.com/my_business):',
    ky: 'Instagram аккаунтуңузга шилтемени жазыңыз (мисалы: @my_business же https://instagram.com/my_business):'
  };
  botMessage(msgs[lang]);
  showInput(lang === 'ru' ? '@ваш_instagram' : '@sizdiktin_instagram', (val) => {
    userData.instagram = val.trim();
    addUserMessage(val);
    runStep(STEPS.NICHE);
  });
}

function stepNiche() {
  const msgs = {
    ru: 'Отлично! Теперь выберите вашу нишу:',
    ky: 'Жакшы! Эми нишаңызды тандаңыз:'
  };
  botMessage(msgs[lang]);
  const niches = lang === 'ru'
    ? ['☕ Кафе/ресторан', '💅 Салон красоты', '🛍 Магазин', '🌿 Зона отдыха', '🦷 Стоматология', '📚 Курсы', '🔧 Автосервис', '🎯 Другие услуги']
    : ['☕ Кафе/ресторан', '💅 Кооздук салону', '🛍 Дүкөн', '🌿 Эс алуу зонасы', '🦷 Стоматология', '📚 Курстар', '🔧 Автосервис', '🎯 Башка кызматтар'];
  addButtons(niches.map(n => ({ label: n, action: () => { userData.niche = n.replace(/^.+?\s/, ''); addUserMessage(n); runStep(STEPS.CITY); } })));
}

function stepCity() {
  const msgs = {
    ru: 'В каком городе находится ваш бизнес?',
    ky: 'Бизнесиңиз кайсы шаарда жайгашкан?'
  };
  botMessage(msgs[lang]);
  const cities = ['🏙 Бишкек', '🌆 Ош', '🏘 Джалал-Абад', '🏛 Нарын', '🌄 Другой город / Башка шаар'];
  addButtons(cities.map(c => ({ label: c, action: () => { userData.city = c.replace(/^.+?\s/, ''); addUserMessage(c); runStep(STEPS.PROFILE_DESC); } })));
}

function stepProfileDesc() {
  const msgs = {
    ru: 'Опишите вкратце ваш бизнес и что вы продаёте (1–2 предложения):',
    ky: 'Бизнесиңизди жана эмне сатаарыңызды кыскача сүрөттөңүз (1–2 сүйлөм):'
  };
  botMessage(msgs[lang]);
  showInput(lang === 'ru' ? 'Например: Продаём детскую одежду в Бишкеке...' : 'Мисалы: Бишкекте балдар кийимин сатабыз...', (val) => {
    userData.profileDesc = val;
    addUserMessage(val);
    runStep(STEPS.GOAL);
  });
}

function stepGoal() {
  const msgs = {
    ru: 'Какова ваша главная цель прямо сейчас?',
    ky: 'Азыр эң негизги максатыңыз эмне?'
  };
  botMessage(msgs[lang]);
  const goals = lang === 'ru'
    ? ['🚀 Больше заявок из Instagram', '💰 Запустить рекламу', '🤖 Сделать чат-бот', '📊 Разобраться с маркетингом', '🎯 Всё сразу']
    : ['🚀 Instagram\'дан көбүрөөк арыз', '💰 Жарнаманы иштетүү', '🤖 Чат-бот жасоо', '📊 Маркетингди түшүнүү', '🎯 Баарын бир эле учурда'];
  addButtons(goals.map(g => ({ label: g, action: () => { userData.goal = g.replace(/^.+?\s/, ''); addUserMessage(g); runStep(STEPS.MINI_AUDIT); } })));
}

async function stepMiniAudit() {
  trackEvent('mini_audit_completed');
  const msgs = {
    ru: `Принято! Анализирую ваш Instagram ${userData.instagram}...\n\nПодождите несколько секунд, TARGETPRO AI изучает профиль 🔍`,
    ky: `Кабыл алынды! Instagram\'ыңызды ${userData.instagram} талдап жатам...\n\nБирнече секунд күтүңүз, TARGETPRO AI профилди изилдеп жатат 🔍`
  };
  botMessage(msgs[lang]);

  showAuditProgress();

  // Запуск интеллектуального анализа TARGETPRO AI
const auditResult = await generateAuditViaAI();
removeTyping();

  // Парсим рейтинг из результата
  const ratingMatch = auditResult.match(/(?:РЕЙТИНГ|RATING):\s*(?:number from 1 to 100\s*)?(\d+)/i);
  if (ratingMatch) {
    userData.rating = parseInt(ratingMatch[1]);
  } else {
    userData.rating = Math.floor(Math.random() * 20) + 45; // 45–65 если не распарсилось
  }

  localStorage.setItem('tp_rating', userData.rating);
  localStorage.setItem('tp_audit_date', new Date().toLocaleDateString('ru-RU'));

  botMessage(auditResult.replace(/(?:РЕЙТИНГ|RATING):\s*(?:number from 1 to 100\s*)?\d+/i, '').trim());
  runStep(STEPS.RATING_SHOW);
}

async function generateAuditViaAI() {

  try {

    let instagram = userData.instagram
      .replace('https://www.instagram.com/', '')
      .replace('https://instagram.com/', '')
      .replace('@', '')
      .replace(/\//g, '')
      .trim();

    const data = await postToAppsScript({
      action: 'generateInstagramAudit',
      instagram: instagram,
      niche: userData.niche,
      city: userData.city,
      profileDesc: userData.profileDesc,
      goal: userData.goal,
      language: lang
    });

    const text = extractGeneratedText(data);
    if (text) {
      return text;
    }

    console.error('Instagram Audit empty response:', data);
    return fallbackAudit();

  } catch (e) {

    console.error('Audit error:', e);

    if (isTemporaryAiOverload(e)) {
      return aiOverloadMessage();
    }

    return fallbackAudit();

  }
}

function isTemporaryAiOverload(error) {
  const msg = String((error && error.message) || error || '');
  return (
    msg.includes('503') ||
    msg.includes('429') ||
    msg.includes('UNAVAILABLE') ||
    msg.includes('high demand') ||
    msg.includes('temporarily unavailable')
  );
}

function aiOverloadMessage() {
  if (lang === 'ky') {
    return `Азыр AI сервери көп жүктөлүп, аудитти даярдап үлгүргөн жок.

Сураныч, 1-2 мүнөт күтүп, аудитти кайра баштап көрүңүз. Instagram маалыматтары жеткиликтүү, маселе Gemini серверинин убактылуу жүктөмүндө гана.

RATING: 50`;
  }

  return `Сейчас AI-сервер перегружен и не успел подготовить аудит.

Пожалуйста, подождите 1-2 минуты и запустите аудит ещё раз. Данные Instagram доступны, проблема только во временной нагрузке Gemini.

РЕЙТИНГ: 50`;
}
function fallbackAudit() {
  const niche = userData.niche;
  const city = userData.city;
  if (lang === 'ky') {
    return `⚠️ Эскертүү: азыр AI резервдик талдоо сценарийин колдонду. Сиз баары бир нишаңыз, максатыңыз жана бизнес маалыматыңыз боюнча практикалык сунуштарды аласыз.

✅ Күчтүү жактар (${city} шаарындагы ${niche} үчүн):
• Локалдык аудитория Instagram жана WhatsApp аркылуу тез чечим кабыл алат
• ${niche} нишасында туура оффер болсо суроо-талап бар

❌ Өсүүгө тоскоол болгон типтүү жерлер:
• Профилде конкреттүү сунуш жана пайда так жазылган эмес
• Посттордо жана Stories ичинде аракетке чакыруу жетишсиз
• Арыз келгенден кийин тез жооп берүү системасы жок
• Жылытуу жана кайра байланышуу воронкасы түзүлгөн эмес

⚡ 24 саатта эмне оңдоо керек:
1. Профилге так оффер жана WhatsAppка чакыруу кошуңуз
2. Продукт/кызматты көрсөткөн Reels чыгарыңыз
3. Директ жана WhatsApp үчүн тез жоопторду даярдаңыз

🎯 ${city} үчүн оффер: "Биринчи консультация акысыз — WhatsAppка жазыңыз."

📱 Reels жана Stories идеялары:
• Иш процессиңизди көрсөтүңүз
• Кардардын көйгөйүн жана чечимин түшүндүрүңүз
• Кыска отзыв же натыйжа менен Stories чыгарыңыз

RATING: 52`;
  }

  return `⚠️ Примечание: сейчас AI использовал резервный сценарий анализа. Вы всё равно получили рекомендации на основе вашей ниши, цели и данных о бизнесе.

✅ Сильные стороны (типичные для ${niche} в ${city}):
• Локальная аудитория в ${city} быстро принимает решения через Instagram и WhatsApp
• Ниша ${niche} может хорошо расти, если есть понятный оффер и быстрый ответ на заявки

❌ Что чаще всего мешает заявкам:
• Нет чёткого оффера и понятной выгоды для клиента
• Нет стабильной рекламы или она ведёт на слабую посадку
• CTA отсутствует в постах, Stories и шапке профиля
• Нет быстрого ответа в Direct/WhatsApp и прогрева после первой заявки

⚡ Что исправить за 24 часа:
1. Добавьте в шапку профиля конкретный оффер и WhatsApp-призыв
2. Опубликуйте Reels с демонстрацией продукта/услуги
3. Настройте быстрые ответы в Direct и WhatsApp

🎯 Оффер для ${city}: "Бесплатная консультация/подбор решения — напишите в WhatsApp."

📱 Идеи для Reels и Stories:
• За кулисами: покажите процесс работы
• Разбор ошибки клиента и как вы её исправляете
• Отзыв или результат клиента в Stories

📣 CTA в профиле: "Напишите в WhatsApp — подберём решение за 10 минут"

РЕЙТИНГ: 52`;
}

function stepRatingShow() {
  const r = userData.rating;
  let emoji = r >= 70 ? '🟢' : r >= 50 ? '🟡' : '🔴';
  let comment = '';
  if (lang === 'ru') {
    comment = r >= 70 ? 'Хорошая база, есть куда расти!' : r >= 50 ? 'Средний результат. Есть серьёзные точки роста.' : 'Много упущений. Можно вырасти в 2–3 раза.';
  } else {
    comment = r >= 70 ? 'Жакшы база, өсүү мүмкүнчүлүктөрү бар!' : r >= 50 ? 'Орточо натыйжа. Маанилүү өсүү чекиттери бар.' : 'Көп жоготулгандар. 2–3 эсе өсүүгө болот.';
  }

  const html = `
    <div class="rating-card">
      <div class="rating-card-top">
        <div class="score-ring">${r}</div>
        <div>
          <div class="rating-title">${emoji} ${lang === 'ru' ? 'Рейтинг' : 'Рейтинг'}: ${r}/100</div>
          <div class="score-label">${comment}</div>
        </div>
      </div>
      <div class="rating-bar-wrap">
        <div class="rating-bar-label"><span>${lang === 'ru' ? 'Instagram-профиль' : 'Instagram профиль'}</span><span>25</span></div>
        <div class="rating-bar"><div class="rating-bar-fill" style="width:${Math.round(r*0.25)}%"></div></div>
      </div>
      <div class="rating-bar-wrap">
        <div class="rating-bar-label"><span>${lang === 'ru' ? 'Оффер' : 'Оффер'}</span><span>20</span></div>
        <div class="rating-bar"><div class="rating-bar-fill" style="width:${Math.round(r*0.20)}%"></div></div>
      </div>
      <div class="rating-bar-wrap">
        <div class="rating-bar-label"><span>${lang === 'ru' ? 'Контент' : 'Мазмун'}</span><span>20</span></div>
        <div class="rating-bar"><div class="rating-bar-fill" style="width:${Math.round(r*0.20)}%"></div></div>
      </div>
      <div class="rating-bar-wrap">
        <div class="rating-bar-label"><span>${lang === 'ru' ? 'Воронка' : 'Воронка'}</span><span>20</span></div>
        <div class="rating-bar"><div class="rating-bar-fill" style="width:${Math.round(r*0.20)}%"></div></div>
      </div>
      <div class="rating-bar-wrap">
        <div class="rating-bar-label"><span>${lang === 'ru' ? 'Реклама' : 'Жарнама'}</span><span>15</span></div>
        <div class="rating-bar"><div class="rating-bar-fill" style="width:${Math.round(r*0.15)}%"></div></div>
      </div>
    </div>`;

  botMessageHTML(html);

  const roughLoss = r >= 70 ? 50000 : r >= 50 ? 90000 : 150000;
  const blockers = lang === 'ru'
    ? ['нет сильного оффера', 'нет стабильной рекламы', 'нет прогрева', 'заявки не дожимаются в WhatsApp']
    : ['күчтүү оффер жок', 'туруктуу жарнама жок', 'жылытуу жетишсиз', 'WhatsAppта арыз толук иштетилбейт'];
  const growthHtml = `
    <div class="growth-card">
      <div class="growth-kicker">${lang === 'ru' ? 'Что это значит для денег' : 'Бул акчага кандай таасир берет'}</div>
      <div class="growth-money">${lang === 'ru' ? 'Бизнес может недополучать' : 'Бизнес кошумча ала албай жаткан болушу мүмкүн'}</div>
      <strong>${roughLoss.toLocaleString('ru-RU')} сом ${lang === 'ru' ? 'в месяц' : 'айына'}</strong>
      <div class="growth-blockers">
        ${blockers.map(item => `<span>❌ ${item}</span>`).join('')}
      </div>
    </div>`;

  setTimeout(() => {
    botMessageHTML(growthHtml);
    addButtons([
      { label: lang === 'ru' ? '🔥 Исправить это вместе с Евгением' : '🔥 Муну Евгений менен оңдоо', action: () => runStep(STEPS.PROFIT_Q1) },
      { label: lang === 'ru' ? '📊 Сначала посчитать точнее' : '📊 Алгач так эсептөө', action: () => runStep(STEPS.PROFIT_Q1) },
    ]);
  }, 600);
}

function stepProfitQ1() {
  const msgs = {
    ru: '💰 Теперь рассчитаем потенциальный дополнительный доход.\n\nКакой у вас средний чек? (укажите сумму в сомах)',
    ky: '💰 Эми кошумча киреше потенциалын эсептейли.\n\nОрточо чегиңиз кандай? (сомдо суммасын жазыңыз)'
  };
  botMessage(msgs[lang]);
  showInput(lang === 'ru' ? 'Например: 2500' : 'Мисалы: 2500', (val) => {
    userData.avgCheck = parseInt(val.replace(/\D/g, '')) || 2000;
    addUserMessage(val + ' сом');
    runStep(STEPS.PROFIT_Q2);
  });
}

function stepProfitQ2() {
  const msgs = {
    ru: 'Сколько заявок в месяц вы получаете сейчас?',
    ky: 'Азыр айына канча арыз аласыз?'
  };
  botMessage(msgs[lang]);
  showInput(lang === 'ru' ? 'Например: 10' : 'Мисалы: 10', (val) => {
    userData.currentLeads = parseInt(val.replace(/\D/g, '')) || 10;
    addUserMessage(val);
    runStep(STEPS.PROFIT_Q3);
  });
}

function stepProfitQ3() {
  const msgs = {
    ru: 'Сколько заявок в месяц вы хотели бы получать?',
    ky: 'Айына канча арыз алгыңыз келет?'
  };
  botMessage(msgs[lang]);
  showInput(lang === 'ru' ? 'Например: 40' : 'Мисалы: 40', (val) => {
    userData.desiredLeads = parseInt(val.replace(/\D/g, '')) || 40;
    addUserMessage(val);
    runStep(STEPS.PROFIT_Q4);
  });
}

function stepProfitQ4() {
  const msgs = {
    ru: 'Какой у вас процент конверсии (заявка → продажа)? Если не знаете, напишите 30',
    ky: 'Конверсияңыздын пайызы кандай (арыз → сатуу)? Эгер билбесеңиз, 30 жазыңыз'
  };
  botMessage(msgs[lang]);
  showInput(lang === 'ru' ? 'Например: 30' : 'Мисалы: 30', (val) => {
    userData.conversion = Math.min(100, parseInt(val.replace(/\D/g, '')) || 30);
    addUserMessage(val + '%');
    runStep(STEPS.PROFIT_SHOW);
  });
}

function stepProfitShow() {
  const lostLeads = Math.max(0, userData.desiredLeads - userData.currentLeads);
  const lostProfit = Math.round(lostLeads * userData.avgCheck * (userData.conversion / 100));
  const yearlyProfit = lostProfit * 12;
  const formatted = lostProfit.toLocaleString('ru-RU');
  const formattedYear = yearlyProfit.toLocaleString('ru-RU');

  const label = lang === 'ru' ? 'потенциальный дополнительный доход' : 'кошумча киреше потенциалы';
  const disc = lang === 'ru' ? 'Это ориентировочная маркетинговая оценка.' : 'Бул болжолдуу маркетингдик баа.';
  const html = `
    <div class="profit-box">
      <span class="profit-kicker">${label}</span>
      <span class="profit-amount" data-count="${lostProfit}">0 сом</span>
      <span class="profit-label">${lang === 'ru' ? 'в месяц' : 'айына'}</span>
      <div class="profit-year">${formattedYear} сом ${lang === 'ru' ? 'в год' : 'жылына'}</div>
      <p class="profit-disclaimer">⚠️ ${disc}</p>
    </div>`;

  botMessageHTML(html);
  animateProfitCounters();

  const analysis = lang === 'ru'
    ? `При среднем чеке ${userData.avgCheck.toLocaleString('ru-RU')} сом и текущих ${userData.currentLeads} заявках в месяц у вас есть потенциал получить ещё ${lostLeads} клиентов.\n\nС правильной рекламой и воронкой этот дополнительный доход можно начать возвращать за 30–60 дней.`
    : `${userData.avgCheck.toLocaleString('ru-RU')} сом орточо чек жана айына ${userData.currentLeads} арыз менен дагы ${lostLeads} кардар алуу потенциалы бар.\n\nТуура жарнама жана воронка менен бул кошумча кирешени 30–60 күндө кайтара баштоого болот.`;

  setTimeout(() => {
    botMessage(analysis);
    runStep(STEPS.BUDGET_SHOW);
  }, 600);
}

function stepBudgetShow() {
  const nicheKey = Object.keys(NICHE_BUDGETS).find(k => userData.niche.toLowerCase().includes(k)) || 'default';
  const budget = NICHE_BUDGETS[nicheKey];

  const title = lang === 'ru' ? '📊 Рекламный бюджет для вашей ниши' : '📊 Нишаңыз үчүн жарнама бюджети';
  const html = `
    <div style="margin:8px 0">
      <strong>${title}</strong>
      <table class="budget-table">
        <tr><th>${lang === 'ru' ? 'Параметр' : 'Параметр'}</th><th>${lang === 'ru' ? 'Значение' : 'Маани'}</th></tr>
        <tr><td>${lang === 'ru' ? 'Бюджет/мес.' : 'Бюджет/ай'}</td><td>${budget.min.toLocaleString()}–${budget.max.toLocaleString()} сом</td></tr>
        <tr><td>${lang === 'ru' ? 'Цена заявки' : 'Арыз баасы'}</td><td>${budget.cpl} сом</td></tr>
        <tr><td>${lang === 'ru' ? 'Аудитория' : 'Аудитория'}</td><td>${budget.audience}</td></tr>
        <tr><td>${lang === 'ru' ? 'Прогноз заявок' : 'Арыз болжолу'}</td><td>${Math.round(budget.min/150)}–${Math.round(budget.max/200)} ${lang === 'ru' ? 'в месяц' : 'айына'}</td></tr>
      </table>
    </div>`;

  botMessageHTML(html);

  setTimeout(() => {
    runStep(STEPS.COLLECT_NAME);
  }, 800);
}

function animateProfitCounters() {
  const counters = document.querySelectorAll('.profit-amount[data-count]');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.count, 10) || 0;
    const startTime = performance.now();
    const duration = 900;

    const tick = (now) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      counter.textContent = `${value.toLocaleString('ru-RU')} сом`;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  });
}

function stepCollectName() {
  const msgs = {
    ru: '🎯 Отлично! Я подготовлю ваш персональный маркетинговый паспорт.\n\nКак вас зовут?',
    ky: '🎯 Жакшы! Мен жеке маркетинг паспортуңузду даярдайм.\n\nСиздин атыңыз ким?'
  };
  botMessage(msgs[lang]);
  showInput(lang === 'ru' ? 'Ваше имя' : 'Сиздин атыңыз', (val) => {
    userData.name = val.trim();
    addUserMessage(val);
    localStorage.setItem('tp_name', userData.name);
    localStorage.setItem('tp_instagram', userData.instagram);
    localStorage.setItem('tp_niche', userData.niche);
    localStorage.setItem('tp_city', userData.city);
    runStep(STEPS.COLLECT_PHONE);
  });
}

function stepCollectPhone() {
  const msgs = {
    ru: `Приятно познакомиться, ${userData.name}! 👋\n\nОставьте номер телефона, чтобы Евгений мог связаться с вами и обсудить план роста:`,
    ky: `Таанышканыма кубандым, ${userData.name}! 👋\n\nЕвгений сиз менен байланышып, өсүү планын талкуулай алышы үчүн телефон номериңизди жазыңыз:`
  };
  botMessage(msgs[lang]);
  showInput(lang === 'ru' ? '+996 XXX XXX XXX' : '+996 XXX XXX XXX', async (val) => {
    userData.phone = val.trim();
    addUserMessage(val);
    trackEvent('phone_submitted');

    // НЕМЕДЛЕННО отправить данные
    await sendLeadData();

    runStep(STEPS.PASSPORT_SHOW);
  });
}

async function stepPassportShow() {
  trackEvent('passport_generated');
  const msgs = {
    ru: '📄 Генерирую ваш маркетинговый паспорт...',
    ky: '📄 Маркетинг паспортуңузду даярдап жатам...'
  };
  botMessage(msgs[lang]);
  showTyping();

  const passportHTML = await generatePassportViaAI();
  removeTyping();

  document.getElementById('passportContent').innerHTML = passportHTML;
  document.getElementById('passportModal').style.display = 'flex';

  const done = lang === 'ru'
    ? `✅ Готово, ${userData.name}! Ваш маркетинговый паспорт открылся в окне выше.\n\nЕвгений Тузов свяжется с вами в ближайшее время для обсуждения деталей.`
    : `✅ Даяр, ${userData.name}! Маркетинг паспортуңуз жогорудагы терезеде ачылды.\n\nЕвгений Тузов сиз менен жакын арада байланышат.`;
  botMessage(done);

  setTimeout(() => runStep(STEPS.AUTOPILOT), 1000);
}

async function generatePassportViaAI() {
  const prompt = `Создай HTML-маркетинговый паспорт для бизнеса. Используй ТОЛЬКО inline-стили. Язык: ${lang === 'ru' ? 'русский' : 'кыргызский'}.

Данные:
- Имя: ${userData.name}
- Instagram: ${userData.instagram}
- Ниша: ${userData.niche}
- Город: ${userData.city}
- Описание: ${userData.profileDesc}
- Цель: ${userData.goal}
- Рейтинг: ${userData.rating}/100
- Средний чек: ${userData.avgCheck} сом
- Текущих заявок: ${userData.currentLeads}/мес
- Желаемых заявок: ${userData.desiredLeads}/мес

Создай HTML-отчёт со следующими разделами (все с inline-стилями, тёмный фон #0f1120, текст #e8eaf6, акцент #4f8eff):
1. Шапка с логотипом TARGETPRO AI и именем клиента
2. Маркетинговый рейтинг (большая цифра)
3. Анализ профиля (ошибки и сильные стороны)
4. Быстрые улучшения (3 действия на 24 часа)
5. 5 идей для Reels под нишу ${userData.niche}
6. 3 оффера для ${userData.city}
7. Прогноз рекламы в сомах
8. Рекомендуемый следующий шаг
9. Футер: "Подготовлено системой TARGETPRO AI | Автор: Евгений Тузов"

Только HTML, никаких markdown. Компактно, но информативно.`;

try {
  const data = await postToAppsScript({
    action: 'generateAudit',
    prompt: prompt
  });

  const text = extractGeneratedText(data);
  if (isValidPassportHTML(text)) {
    return text;
  }

  console.error('Passport empty response:', data);
  return fallbackPassport();

} catch (e) {
  console.error('Passport error:', e);
  return fallbackPassport();
}
}

function isValidPassportHTML(html) {
  const text = String(html || '').trim();
  if (text.length < 100) return false;
  if (/^https?:\/\//i.test(text)) return false;
  return /<\s*(div|section|article|h1|h2|h3|p|ul|li|table)\b/i.test(text);
}

function fallbackPassport() {
  const r = userData.rating;
  return `
    <div class="passport-header">
      <div class="passport-logo">TARGETPRO <span>AI</span></div>
      <div class="passport-title">Маркетинговый паспорт · ${new Date().toLocaleDateString('ru-RU')}</div>
    </div>
    <div class="passport-score">
      <div class="score-ring">${r}</div>
      <div class="score-label">Маркетинговый рейтинг из 100</div>
    </div>
    <div class="passport-row">
      <span class="passport-chip">👤 ${userData.name}</span>
      <span class="passport-chip">📱 ${userData.instagram}</span>
      <span class="passport-chip">🏢 ${userData.niche}</span>
      <span class="passport-chip">🏙 ${userData.city}</span>
    </div>
    <div class="passport-grid">
      <div class="passport-card"><span>⭐</span><strong>${r}/100</strong><small>${lang === 'ru' ? 'Рейтинг профиля' : 'Профиль рейтинги'}</small></div>
      <div class="passport-card"><span>💰</span><strong>${Math.max(0, (userData.desiredLeads - userData.currentLeads) * userData.avgCheck * (userData.conversion / 100)).toLocaleString('ru-RU')} сом</strong><small>${lang === 'ru' ? 'Потенциал в месяц' : 'Айлык потенциал'}</small></div>
      <div class="passport-card"><span>📈</span><strong>3</strong><small>${lang === 'ru' ? 'Главные точки роста' : 'Негизги өсүү чекити'}</small></div>
      <div class="passport-card"><span>🎯</span><strong>24 ч</strong><small>${lang === 'ru' ? 'Первый быстрый шаг' : 'Биринчи тез кадам'}</small></div>
    </div>
    <div class="passport-section">
      <h3>⚡ Быстрые улучшения (24 часа)</h3>
      <ul>
        <li>Добавьте конкретный оффер в шапку профиля с кнопкой действия</li>
        <li>Опубликуйте Reels с демонстрацией продукта или процесса работы</li>
        <li>Настройте быстрые ответы в Директ на частые вопросы</li>
      </ul>
    </div>
    <div class="passport-section">
      <h3>🎬 5 идей для Reels (${userData.niche})</h3>
      <ul>
        <li>«За кулисами» — покажите процесс работы</li>
        <li>«До/после» — трансформация результата</li>
        <li>«Топ-3 ошибки клиентов» — экспертный контент</li>
        <li>«День из жизни бизнеса» — Stories + Reels</li>
        <li>«Отзыв довольного клиента» — социальное доказательство</li>
      </ul>
    </div>
    <div class="passport-section">
      <h3>🎯 3 оффера для ${userData.city}</h3>
      <ul>
        <li>«Первый визит/заказ — скидка 20%»</li>
        <li>«Бесплатная консультация при записи онлайн»</li>
        <li>«Приведи друга — получи подарок»</li>
      </ul>
    </div>
    <div class="passport-section">
      <h3>📊 Прогноз рекламы</h3>
      <p>Бюджет: 8 000–15 000 сом/мес · Заявок: 30–60/мес · Цена заявки: 150–400 сом</p>
    </div>
    <div class="passport-section">
      <h3>🚀 Следующий шаг</h3>
      <p>Запишитесь на консультацию с Евгением Тузовым. Он разберёт ваш профиль лично и составит индивидуальный план за 60 минут.</p>
    </div>
    <div class="passport-footer">
      Подготовлено системой TARGETPRO AI<br>
      Автор: Евгений Тузов · ${CONFIG.SITE_URL}
    </div>`;
}

function stepAutopilot() {
  const msgs = {
    ru: '🚀 Последний шаг! Хотите получить ещё больше бонусов?',
    ky: '🚀 Акыркы кадам! Көбүрөөк бонус алгыңыз барбы?'
  };
  botMessage(msgs[lang]);
  addButtons([
    { label: lang === 'ru' ? '🎁 Получить бонусы' : '🎁 Бонустарды алуу', action: () => openAutopilotModal() },
    { label: lang === 'ru' ? 'Пропустить' : 'Өткөрүп жиберүү', action: () => stepDone() },
  ]);
}

function openAutopilotModal() {
  trackEvent('autopilot_opened');
  document.getElementById('autopilotModal').style.display = 'flex';
  // Показать кнопку подтверждения
  document.getElementById('apConfirmBtn').style.display = 'none';
}

function stepDone() {
  const waUrl = `https://wa.me/${CONFIG.WHATSAPP}`;
  const html = lang === 'ru'
    ? `
      <div class="final-card">
        <div class="final-icon">🚀</div>
        <h3>Отлично, ${userData.name || 'готово'}!</h3>
        <p><strong>Ваш персональный аудит сохранён.</strong></p>
        <p>${userData.name || 'Ваш бизнес'} уже может получать больше клиентов. Вы получили персональный план действий — следующий шаг внедрить его.</p>
        <p>Евгений изучит рекомендации TARGETPRO AI и предложит наиболее быстрый путь роста именно для вашего бизнеса.</p>
        <p><strong>В этом месяце беру ограниченное число проектов, чтобы вести каждый лично.</strong></p>
        <p>Если хотите ускорить процесс — напишите прямо сейчас.</p>
        <a class="whatsapp-cta" href="${waUrl}" target="_blank" rel="noopener">💬 Написать в WhatsApp</a>
      </div>`
    : `
      <div class="final-card">
        <div class="final-icon">🚀</div>
        <h3>Сонун, ${userData.name || 'даяр'}!</h3>
        <p><strong>Жеке аудитиңиз сакталды.</strong></p>
        <p>${userData.name || 'Бизнесиңиз'} көбүрөөк кардар ала алат. Сиз жеке аракет планын алдыңыз — эми аны туура киргизүү керек.</p>
        <p>Евгений TARGETPRO AI сунуштарын карап чыгып, бизнесиңиз үчүн эң тез өсүү жолун сунуштайт.</p>
        <p><strong>Бул айда ар бир долбоорду жеке алып баруу үчүн чектелген гана орун алам.</strong></p>
        <p>Процессти тездетүүнү кааласаңыз, азыр WhatsApp аркылуу жазыңыз.</p>
        <a class="whatsapp-cta" href="${waUrl}" target="_blank" rel="noopener">💬 WhatsAppка жазуу</a>
      </div>`;

  botMessageHTML(html);
  localStorage.setItem('tp_last_status', 'completed');
  localStorage.setItem('tp_audit_date', new Date().toISOString());

  // Скрыть поле ввода
  document.getElementById('chatInput').disabled = true;
  document.getElementById('sendBtn').disabled = true;
}

// ===== КОНСУЛЬТАЦИЯ (быстрый переход) =====
function jumpToConsultation() {
  trackEvent('consultation_requested');
  const msg = lang === 'ru'
    ? 'Отлично! Чтобы записаться на консультацию с Евгением Тузовым, мне нужно несколько данных.\n\nКак вас зовут?'
    : 'Жакшы! Евгений Тузов менен консультацияга жазылуу үчүн бир нече маалымат керек.\n\nСиздин атыңыз ким?';
  botMessage(msg);
  currentStep = STEPS.COLLECT_NAME;
  showInput(lang === 'ru' ? 'Ваше имя' : 'Сиздин атыңыз', (val) => {
    userData.name = val.trim();
    addUserMessage(val);
    localStorage.setItem('tp_name', userData.name);
    userData.goal = 'Консультация';
    runStep(STEPS.COLLECT_PHONE);
  });
}

// ===== АВТОПИЛОТ =====
function shareLink() {
  const url = CONFIG.SITE_URL;
  const text = lang === 'ru'
    ? `Получил бесплатный AI-аудит бизнеса в TARGETPRO AI! Советую попробовать → ${url}`
    : `TARGETPRO AI\'да бизнес үчүн акысыз AI-аудит алдым! Сынап көрүүнү сунуштайм → ${url}`;

  if (navigator.share) {
    navigator.share({ title: 'TARGETPRO AI', text: text, url: url })
      .then(() => {
        document.getElementById('apConfirmBtn').style.display = 'block';
        document.getElementById('apShareBtn').style.display = 'none';
      })
      .catch(() => copyShareLink(url));
  } else {
    copyShareLink(url);
  }
}

function copyShareLink(url) {
  navigator.clipboard.writeText(url).then(() => {
    alert(lang === 'ru' ? 'Ссылка скопирована! Отправьте другу в мессенджере.' : 'Шилтеме көчүрүлдү! Досуңузга жөнөтүңүз.');
    document.getElementById('apConfirmBtn').style.display = 'block';
    document.getElementById('apShareBtn').style.display = 'none';
  });
}

function confirmShare() {
  userData.sharedLink = true;
  localStorage.setItem('tp_shared', 'true');
  document.getElementById('autopilotModal').style.display = 'none';

  // Обновить в Sheets
  sendLeadData();

  const msg = lang === 'ru'
    ? '🎉 Режим АВТОПИЛОТ активирован!\n\nЯ подготовлю для вас расширенный аудит с 10 идеями для Reels и 7-дневным планом. Евгений свяжется с вами приоритетно!'
    : '🎉 АВТОПИЛОТ режими иштетилди!\n\n10 Reels идеясы жана 7 күндүк план менен кеңейтилген аудит даярдайм. Евгений сиз менен артыкчылыктуу байланышат!';
  botMessage(msg);
  stepDone();
}

function skipAutopilot() {
  document.getElementById('autopilotModal').style.display = 'none';
  stepDone();
}

// ===== ПАСПОРТ =====
function closePassport() {
  document.getElementById('passportModal').style.display = 'none';
}

function downloadPassport() {
  const content = document.getElementById('passportContent').innerHTML;
  const safeContent = isValidPassportHTML(content) ? content : fallbackPassport();
  const html = `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>TARGETPRO AI - Marketing Passport</title><style>body{margin:0;background:#0f1120;color:#e8eaf6;font-family:Arial,sans-serif;padding:24px;line-height:1.6}.passport-header{display:flex;justify-content:space-between;gap:16px;align-items:center;border-bottom:1px solid #2a315f;padding-bottom:18px;margin-bottom:22px}.passport-logo{font-size:24px;font-weight:800}.passport-logo span{color:#7c5cff}.passport-title{color:#aeb6df;font-size:13px}.passport-score{text-align:center;margin:22px 0}.score-ring{display:inline-flex;width:96px;height:96px;border-radius:50%;align-items:center;justify-content:center;background:#4f8eff;color:white;font-size:36px;font-weight:800}.score-label{margin-top:10px;color:#aeb6df}.passport-row{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0}.passport-chip{border:1px solid #2a315f;border-radius:999px;padding:8px 12px;background:#171b33}.passport-section{margin:22px 0;padding:16px;border:1px solid #25305f;border-radius:12px;background:#15192f}.passport-section h3{margin-top:0;color:#ffffff}.passport-section ul{padding-left:20px}.passport-footer{margin-top:24px;color:#aeb6df;font-size:13px;text-align:center}</style></head><body>${safeContent}</body></html>`;
  const blob = new Blob([html], { type: 'text/html' });
  const a = document.createElement('a');
  const url = URL.createObjectURL(blob);
  a.href = url;
  a.download = `targetpro_passport_${userData.name || 'audit'}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

// ===== ОТПРАВКА ДАННЫХ =====
async function sendLeadData() {
  const status = userData.avgCheck > 5000 ? '🔥 Горячий' : userData.desiredLeads > 30 ? '🟡 Тёплый' : '🔵 Холодный';
  const payload = {
    action: 'addLead',
    date: new Date().toLocaleDateString('ru-RU'),
    time: new Date().toLocaleTimeString('ru-RU'),
    name: userData.name,
    phone: userData.phone,
    instagram: userData.instagram,
    niche: userData.niche,
    city: userData.city,
    goal: userData.goal,
    avgCheck: userData.avgCheck,
    source: userData.source,
    language: lang,
    rating: userData.rating,
    request: userData.goal,
    status: status,
    sharedLink: userData.sharedLink ? 'Да' : 'Нет',
    comment: userData.comment,
    lastTouch: new Date().toLocaleDateString('ru-RU'),
    nextTouch: new Date(Date.now() + 3 * 86400000).toLocaleDateString('ru-RU'),
    followUpStatus: 'Новый',
  };

  // Отправить в Google Sheets
  try {
    await postToAppsScript(payload);
  } catch (e) { console.error('Sheets error:', e); }

  // Отправить в Telegram
  const tgText = `🔥 Новый лид — TARGETPRO AI

👤 Имя: ${payload.name}
📱 Телефон: ${payload.phone}
📸 Instagram: ${payload.instagram}
🏢 Ниша: ${payload.niche}
🏙 Город: ${payload.city}
🎯 Цель: ${payload.goal}
🌐 Язык: ${lang === 'ru' ? 'Русский' : 'Кыргызча'}
⭐ Рейтинг: ${payload.rating}/100
💰 Средний чек: ${payload.avgCheck} сом
📊 Статус: ${status}
🔗 Источник: ${payload.source}
📤 Поделился: ${payload.sharedLink}`;

  try {
    await fetch(`https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CONFIG.TELEGRAM_CHAT_ID,
        text: tgText,
        parse_mode: 'HTML',
      })
    });
  } catch (e) { console.error('Telegram error:', e); }
}

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ЧАТА =====
function botMessage(text) {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'msg msg-bot';
  div.innerHTML = text.replace(/\n/g, '<br>');
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function botMessageHTML(html) {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'msg msg-bot';
  div.innerHTML = html;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function addUserMessage(text) {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'msg msg-user';
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function addButtons(buttons) {
  const msgs = document.getElementById('chatMessages');
  const wrap = document.createElement('div');
  wrap.className = 'chat-buttons';
  buttons.forEach(b => {
    const btn = document.createElement('button');
    btn.className = 'chat-btn';
    btn.textContent = b.label;
    btn.onclick = () => {
      // Удалить все кнопки после нажатия
      wrap.remove();
      b.action();
    };
    wrap.appendChild(btn);
  });
  msgs.appendChild(wrap);
  msgs.scrollTop = msgs.scrollHeight;
}

function showInput(placeholder, callback) {
  const input = document.getElementById('chatInput');
  const btn = document.getElementById('sendBtn');
  input.placeholder = placeholder;
  input.disabled = false;
  input.value = '';
  input.focus();

  const handler = () => {
    const val = input.value.trim();
    if (!val) return;
    input.removeEventListener('keydown', keyHandler);
    btn.onclick = null;
    callback(val);
    input.value = '';
  };
  const keyHandler = (e) => { if (e.key === 'Enter') handler(); };
  input.addEventListener('keydown', keyHandler);
  btn.onclick = handler;
}

function sendUserMessage() {
  // Запасной вызов — основная логика в showInput
}

function showAuditProgress() {
  const msgs = document.getElementById('chatMessages');

  removeTyping();

  const steps = lang === 'ru'
    ? [
        'Подключаюсь к Instagram и получаю данные профиля...',
        'Анализирую шапку профиля, описание и ссылку...',
        'Проверяю последние посты, Reels и вовлечённость...',
        'Произвожу оценку контента и оффера...',
        'Формирую рекомендации и 7-дневный план роста...',
        'Почти готово, собираю аудит в понятный отчёт...'
      ]
    : [
        'Instagram профилинен маалымат алып жатам...',
        'Профилдин сүрөттөмөсүн жана шилтемесин талдап жатам...',
        'Акыркы постторду, Reels жана активдүүлүктү текшерип жатам...',
        'Контентти жана офферди баалап жатам...',
        'Сунуштарды жана 7 күндүк өсүү планын даярдап жатам...',
        'Дээрлик даяр, аудитти түшүнүктүү отчетко чогултуп жатам...'
      ];

  let stepIndex = 0;

  const div = document.createElement('div');
  div.className = 'msg msg-bot msg-typing';
  div.id = 'typingIndicator';
  div.innerHTML = `
    <div class="typing-status" id="typingStatusText">${steps[stepIndex]}</div>
    <div>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>
  `;

  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;

  auditProgressTimer = setInterval(() => {
    stepIndex = Math.min(stepIndex + 1, steps.length - 1);
    const text = document.getElementById('typingStatusText');
    if (text) text.textContent = steps[stepIndex];
    msgs.scrollTop = msgs.scrollHeight;
  }, 6000);
}

function showTyping() {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'msg msg-bot msg-typing';
  div.id = 'typingIndicator';
  div.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function removeTyping() {
  if (auditProgressTimer) {
    clearInterval(auditProgressTimer);
    auditProgressTimer = null;
  }

  const t = document.getElementById('typingIndicator');
  if (t) t.remove();
}

function addReturningBanner(name, rating, date) {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'returning-banner';
  div.innerHTML = lang === 'ru'
    ? `Рады видеть вас снова, <strong>${name}</strong>! 👋<br>Ваш последний аудит: ${date || 'ранее'} · Рейтинг: ${rating || '?'}/100`
    : `Кайра кош келдиңиз, <strong>${name}</strong>! 👋<br>Акыркы аудит: ${date || 'мурун'} · Рейтинг: ${rating || '?'}/100`;
  msgs.appendChild(div);
}

// ===== LOCALSTORAGE =====
function loadFromStorage() {
  userData.instagram = localStorage.getItem('tp_instagram') || '';
  userData.niche = localStorage.getItem('tp_niche') || '';
  userData.city = localStorage.getItem('tp_city') || '';
  userData.sharedLink = localStorage.getItem('tp_shared') === 'true';
}

// ===== GA4 =====
function trackEvent(name, params = {}) {
  if (typeof gtag !== 'undefined') {
    gtag('event', name, params);
  }
}

// ===== ИСТОЧНИК =====
function detectSource() {
  const p = new URLSearchParams(window.location.search);
  if (p.get('utm_source')) return p.get('utm_source');
  const ref = document.referrer;
  if (ref.includes('instagram')) return 'instagram_profile';
  if (ref.includes('t.me') || ref.includes('telegram')) return 'telegram';
  if (ref.includes('wa.me') || ref.includes('whatsapp')) return 'whatsapp';
  return 'site';
}
