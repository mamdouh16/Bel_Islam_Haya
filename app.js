// logic for بالإسلام حياة (In Islam There is Life) - v3
document.addEventListener('DOMContentLoaded', () => {
  initUIAnimations();
  initResumeReadingBanner();
  initDailyHadiths();
  initQuranReader();
});

/* =========================================================
   0. بطاقة متابعة القراءة في الصفحة الرئيسية (آخر آية توقفت عندها)
   ========================================================= */
function initResumeReadingBanner() {
  const banner = document.getElementById('resume-reading-banner');
  if (!banner) return;

  const titleEl = document.getElementById('resume-title');
  const snippetEl = document.getElementById('resume-snippet');
  const linkBtn = document.getElementById('resume-link-btn');
  const clearBtn = document.getElementById('clear-bookmark-btn');

  function renderBanner() {
    const raw = localStorage.getItem('belIslamHayaBookmark');
    if (!raw) {
      banner.style.display = 'none';
      return;
    }
    try {
      const bm = JSON.parse(raw);
      if (!bm || !bm.surah || !bm.ayah) {
        banner.style.display = 'none';
        return;
      }
      banner.style.display = 'flex';
      titleEl.textContent = `متابعة القراءة: سورة ${bm.surahName} • الآية (${bm.ayah})`;
      snippetEl.textContent = bm.text ? `«${bm.text}»` : `صفحة ${bm.page || 1} • اضغط للمتابعة من حيث توقفت`;
      linkBtn.href = `quran.html?surah=${bm.surah}&ayah=${bm.ayah}`;
    } catch (e) {
      banner.style.display = 'none';
    }
  }

  renderBanner();

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      localStorage.removeItem('belIslamHayaBookmark');
      banner.style.display = 'none';
    });
  }
}

/* =========================================================
   1. قسم الأحاديث النبوية اليومية (صحيح البخاري وصحيح مسلم)
   ========================================================= */
function initDailyHadiths() {
  const hadithTextEl = document.getElementById('hadith-text');
  const hadithSourceEl = document.getElementById('hadith-source');
  const hadithNarratorEl = document.getElementById('hadith-narrator');
  const nextHadithBtn = document.getElementById('next-hadith-btn');
  const copyHadithBtn = document.getElementById('copy-hadith-btn');
  const filterBtns = document.querySelectorAll('.hadith-filter-btn');

  if (!hadithTextEl) return;

  // قاعدة بيانات محلية موثقة من الصحيحين (تعمل فوراً وبدون انقطاع وتدعم التحديث)
  const localHadiths = [
    {
      source: "صحيح البخاري",
      book: "bukhari",
      number: "5027",
      narrator: "عن عثمان بن عفان رضي الله عنه",
      text: "قال رسول الله ﷺ: «خَيْرُكُمْ مَنْ تَعَلَّمَ القُرْآنَ وَعَلَّمَهُ»."
    },
    {
      source: "صحيح مسلم",
      book: "muslim",
      number: "804",
      narrator: "عن أبي أمامة الباهلي رضي الله عنه",
      text: "قال رسول الله ﷺ: «اقْرَءُوا القُرْآنَ فإنَّه يَأْتي يَومَ القِيامَةِ شَفِيعًا لأَصْحابِهِ»."
    },
    {
      source: "صحيح البخاري",
      book: "bukhari",
      number: "1",
      narrator: "عن عمر بن الخطاب رضي الله عنه",
      text: "قال رسول الله ﷺ: «إنَّما الأعْمالُ بالنِّيّاتِ، وإنَّما لِكُلِّ امْرِئٍ ما نَوَى، فمَن كانَتْ هِجْرَتُهُ إلى دُنْيا يُصِيبُها، أوْ إلى امْرَأَةٍ يَنْكِحُها، فَهِجْرَتُهُ إلى ما هاجَرَ إلَيْهِ»."
    },
    {
      source: "صحيح مسلم",
      book: "muslim",
      number: "2699",
      narrator: "عن أبي هريرة رضي الله عنه",
      text: "قال رسول الله ﷺ: «مَن سَلَكَ طَرِيقًا يَلْتَمِسُ فيه عِلْمًا، سَهَّلَ اللَّهُ له به طَرِيقًا إلى الجَنَّةِ، وما اجْتَمع قَوْمٌ في بَيْتٍ مِن بُيُوتِ اللهِ، يَتْلُونَ كِتابَ اللهِ، ويَتَدارَسُونَهُ بيْنَهُمْ، إلّا نَزَلَتْ عليهمِ السَّكِينَةُ، وغَشِيَتْهُمُ الرَّحْمَةُ، وحَفَّتْهُمُ المَلائِكَةُ، وذَكَرَهُمُ اللَّهُ فِيمَن عِنْدَهُ»."
    },
    {
      source: "صحيح البخاري",
      book: "bukhari",
      number: "4937",
      narrator: "عن عائشة أم المؤمنين رضي الله عنها",
      text: "قال رسول الله ﷺ: «مَثَلُ الذي يَقْرَأُ القُرْآنَ وهو حافِظٌ له، مع السَّفَرَةِ الكِرامِ البَرَرَةِ، ومَثَلُ الذي يَقْرَأُ وهو يَتَعاهَدُهُ، وهو عليه شَدِيدٌ، فَلَهُ أجْرانِ»."
    },
    {
      source: "صحيح مسلم",
      book: "muslim",
      number: "2564",
      narrator: "عن أبي هريرة رضي الله عنه",
      text: "قال رسول الله ﷺ: «إنَّ اللَّهَ لا يَنْظُرُ إلى صُوَرِكُمْ وأَمْوالِكُمْ، ولَكِنْ يَنْظُرُ إلى قُلُوبِكُمْ وأَعْمالِكُمْ»."
    },
    {
      source: "صحيح البخاري",
      book: "bukhari",
      number: "6407",
      narrator: "عن أبي موسى الأشعري رضي الله عنه",
      text: "قال رسول الله ﷺ: «مَثَلُ الذي يَذْكُرُ رَبَّهُ والذي لا يَذْكُرُ رَبَّهُ، مَثَلُ الحَيِّ والمَيِّتِ»."
    },
    {
      source: "صحيح مسلم",
      book: "muslim",
      number: "55",
      narrator: "عن تميم الداري رضي الله عنه",
      text: "قال رسول الله ﷺ: «الدِّينُ النَّصِيحَةُ» قلنا: لمن؟ قال: «لِلَّهِ ولِكِتابِهِ ولِرَسُولِهِ ولأَئِمَّةِ المُسْلِمِينَ وعامَّتِهِمْ»."
    }
  ];

  let currentFilter = 'all';
  // اختيار حديث اليوم بناءً على تاريخ اليوم
  const todayIndex = new Date().getDate() % localHadiths.length;
  let currentHadith = localHadiths[todayIndex];

  function displayHadith(hadith) {
    currentHadith = hadith;
    hadithTextEl.style.opacity = '0.2';
    setTimeout(() => {
      hadithTextEl.textContent = hadith.text;
      hadithSourceEl.textContent = `${hadith.source} • حديث رقم (${hadith.number})`;
      hadithNarratorEl.textContent = hadith.narrator;
      hadithTextEl.style.opacity = '1';
    }, 180);
  }

  // محاولة جلب حديث حي من API صحيح البخاري ومسلم وتحديث العرض عند توفر الإنترنت
  function fetchLiveHadith(bookType = 'all') {
    const chosenBook = bookType === 'all'
      ? (Math.random() > 0.5 ? 'bukhari' : 'muslim')
      : bookType;

    const maxHadithNum = chosenBook === 'bukhari' ? 7000 : 3000;
    const randomNum = Math.floor(Math.random() * maxHadithNum) + 1;
    const apiUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${chosenBook}/${randomNum}.json`;

    fetch(apiUrl)
      .then(res => {
        if (!res.ok) throw new Error('API fallback');
        return res.json();
      })
      .then(data => {
        if (data && data.hadiths && data.hadiths.length > 0 && data.hadiths[0].text) {
          const rawText = data.hadiths[0].text.trim();
          if (rawText.length > 20 && rawText.length < 650) {
            displayHadith({
              source: chosenBook === 'bukhari' ? 'صحيح البخاري' : 'صحيح مسلم',
              book: chosenBook,
              number: data.hadiths[0].hadithnumber || randomNum,
              narrator: 'رواه ' + (chosenBook === 'bukhari' ? 'الإمام البخاري في صحيحه' : 'الإمام مسلم في صحيحه'),
              text: rawText
            });
            return;
          }
        }
        pickLocalHadith(bookType);
      })
      .catch(() => {
        pickLocalHadith(bookType);
      });
  }

  function pickLocalHadith(bookType) {
    const pool = bookType === 'all'
      ? localHadiths
      : localHadiths.filter(h => h.book === bookType);
    const next = pool[Math.floor(Math.random() * pool.length)];
    displayHadith(next);
  }

  displayHadith(currentHadith);

  if (nextHadithBtn) {
    nextHadithBtn.addEventListener('click', () => {
      fetchLiveHadith(currentFilter);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-book');
      pickLocalHadith(currentFilter);
    });
  });

  if (copyHadithBtn) {
    copyHadithBtn.addEventListener('click', () => {
      const shareText = `${currentHadith.text}
[${currentHadith.source} - رقم ${currentHadith.number}] - منصة بالإسلام حياة`;
      navigator.clipboard.writeText(shareText).then(() => {
        const orig = copyHadithBtn.textContent;
        copyHadithBtn.textContent = '✓ تم نسخ الحديث';
        setTimeout(() => { copyHadithBtn.textContent = orig; }, 2000);
      });
    });
  }
}

/* =========================================================
   2. المصحف الصوتي وتقليب الصفحات ما بين السور ووضع ملء الشاشة
   ========================================================= */
function initQuranReader() {
  const quranBox = document.getElementById('quran-box');
  const surahSelect = document.getElementById('surah-select');
  const reciterSelect = document.getElementById('reciter-select');
  const audio = document.getElementById('quran-audio');
  const ayahsContainer = document.getElementById('ayahs-container');
  const surahTitle = document.getElementById('current-surah-title');
  const surahInfo = document.getElementById('current-surah-info');
  const playingNowInfo = document.getElementById('playing-now-info');

  const mushafBook = document.getElementById('mushaf-book');
  const prevPageBtn = document.getElementById('prev-page-btn');
  const nextPageBtn = document.getElementById('next-page-btn');
  const prevSurahBtn = document.getElementById('prev-surah-btn');
  const nextSurahBtn = document.getElementById('next-surah-btn');
  const pageIndicator = document.getElementById('page-indicator');

  // أزرار ملء الشاشة وإمكانية الوصول
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  const incFontBtn = document.getElementById('font-increase-btn');
  const decFontBtn = document.getElementById('font-decrease-btn');
  const resFontBtn = document.getElementById('font-reset-btn');
  const practiceBtn = document.getElementById('go-to-practice-btn');

  const saveBookmarkBtn = document.getElementById('save-bookmark-btn');
  let loadedAyahsRaw = [];

  function getSavedBookmark() {
    try {
      return JSON.parse(localStorage.getItem('belIslamHayaBookmark') || 'null');
    } catch (e) {
      return null;
    }
  }

  function saveReadingBookmark(ayahIdx0Based, showToast = false) {
    const surahData = ALL_SURAHS.find(s => s.number === currentSurahNumber);
    if (!surahData) return;
    const ayahNum1Based = ayahIdx0Based + 1;
    let verseText = '';
    if (loadedAyahsRaw[ayahIdx0Based] && loadedAyahsRaw[ayahIdx0Based].text) {
      verseText = loadedAyahsRaw[ayahIdx0Based].text.trim();
    }

    const bookmarkObj = {
      surah: currentSurahNumber,
      surahName: surahData.name,
      ayah: ayahNum1Based,
      page: currentPageIndex + 1,
      text: verseText,
      updatedAt: Date.now()
    };
    localStorage.setItem('belIslamHayaBookmark', JSON.stringify(bookmarkObj));
    highlightActiveAyahOnScreen();

    if (showToast && saveBookmarkBtn) {
      const orig = saveBookmarkBtn.innerHTML;
      saveBookmarkBtn.innerHTML = `✅ تم حفظ الآية (${ayahNum1Based})`;
      setTimeout(() => { saveBookmarkBtn.innerHTML = orig; }, 2000);
    }
  }

  if (saveBookmarkBtn) {
    saveBookmarkBtn.addEventListener('click', () => {
      saveReadingBookmark(currentActiveAyahIndex, true);
    });
  }


  // محرك صوت تقليب الورق الهادئ والناعم مع خيار الصامت (Web Audio API)
  // الأوضاع المتاحة: 'soft' (هادئ - الافتراضي)، 'medium' (متوسط)، 'mute' (صامت)
  let pageFlipSoundMode = localStorage.getItem('pageFlipSoundMode') || 'soft';
  const flipSoundBtn = document.getElementById('flip-sound-btn');
  const turningLeaf = document.getElementById('turning-leaf');
  let audioCtx = null;

  function updateSoundBtnUI() {
    if (!flipSoundBtn) return;
    flipSoundBtn.classList.remove('sound-off');
    if (pageFlipSoundMode === 'soft') {
      flipSoundBtn.innerHTML = '🔉 صوت التقليب: هادئ';
    } else if (pageFlipSoundMode === 'medium') {
      flipSoundBtn.innerHTML = '🔊 صوت التقليب: متوسط';
    } else {
      flipSoundBtn.classList.add('sound-off');
      flipSoundBtn.innerHTML = '🔇 صوت التقليب: صامت';
    }
  }
  updateSoundBtnUI();

  if (flipSoundBtn) {
    flipSoundBtn.addEventListener('click', () => {
      // التبديل بين: هادئ -> صامت -> متوسط -> هادئ
      if (pageFlipSoundMode === 'soft') {
        pageFlipSoundMode = 'mute';
      } else if (pageFlipSoundMode === 'mute') {
        pageFlipSoundMode = 'medium';
      } else {
        pageFlipSoundMode = 'soft';
      }
      localStorage.setItem('pageFlipSoundMode', pageFlipSoundMode);
      updateSoundBtnUI();
      if (pageFlipSoundMode !== 'mute') playPageTurnSound();
    });
  }

  function playPageTurnSound() {
    if (pageFlipSoundMode === 'mute') return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioCtx) audioCtx = new AudioContextClass();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const duration = 0.28;
      const sampleRate = audioCtx.sampleRate;
      const bufferSize = Math.floor(sampleRate * duration);
      const noiseBuffer = audioCtx.createBuffer(1, bufferSize, sampleRate);
      const output = noiseBuffer.getChannelData(0);

      // توليد حفيف ورقي ناعم جداً (Pink-like smoothed noise) بعيداً عن الحدة
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99765 * b0 + white * 0.0990460;
        b1 = 0.96300 * b1 + white * 0.2965164;
        b2 = 0.57000 * b2 + white * 1.0526913;
        const softPink = (b0 + b1 + b2 + white * 0.1848) * 0.18;

        const progress = i / bufferSize;
        const envelope = Math.sin(progress * Math.PI) * (1 - progress * 0.4);
        output[i] = softPink * envelope;
      }

      const noiseSource = audioCtx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      // مرشح منخفض التردد لجعل الصوت دافئاً وهادئاً كملامسة الورق الناعم
      const lowpass = audioCtx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(650, audioCtx.currentTime);
      lowpass.frequency.exponentialRampToValueAtTime(1150, audioCtx.currentTime + duration * 0.5);
      lowpass.frequency.exponentialRampToValueAtTime(500, audioCtx.currentTime + duration);

      // مستوى الصوت: هادئ جداً (0.07) أو متوسط (0.16)
      const peakGain = pageFlipSoundMode === 'soft' ? 0.075 : 0.16;

      const gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(peakGain, audioCtx.currentTime + 0.09);
      gainNode.gain.exponentialRampToValueAtTime(0.0008, audioCtx.currentTime + duration);

      noiseSource.connect(lowpass);
      lowpass.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      noiseSource.start(audioCtx.currentTime);
      noiseSource.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // تجاهل قيود المتصفح قبل التفاعل
    }
  }


  if (!surahSelect || typeof ALL_SURAHS === 'undefined') return;

  const recitersList = (typeof ALL_RECITERS !== 'undefined') ? ALL_RECITERS : [
    { id: "afs", name: "الشيخ مشاري راشد العفاسي", style: "مرتل", server: "https://server8.mp3quran.net/afs/" }
  ];

  // تعبئة قائمة القراء تلقائياً من قاعدة البيانات الموسعة
  recitersList.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r.id;
    opt.textContent = `${r.name} (${r.style})`;
    reciterSelect.appendChild(opt);
  });

  ALL_SURAHS.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.number;
    opt.textContent = `${s.number}. سورة ${s.name} (${s.type} - ${s.ayahs} آية)`;
    surahSelect.appendChild(opt);
  });

  const urlParams = new URLSearchParams(window.location.search);
  const surahParam = parseInt(urlParams.get('surah'));
  const ayahParam = parseInt(urlParams.get('ayah'));
  const reciterParam = urlParams.get('reciter');

  let currentSurahNumber = (surahParam >= 1 && surahParam <= 114) ? surahParam : 1;
  let initialTargetAyah0Based = (ayahParam && ayahParam >= 1) ? (ayahParam - 1) : 0;
  surahSelect.value = currentSurahNumber;

  const savedReciter = localStorage.getItem('selectedReciter');
  if (reciterParam && recitersList.some(r => r.id === reciterParam)) {
    reciterSelect.value = reciterParam;
  } else if (savedReciter && recitersList.some(r => r.id === savedReciter)) {
    reciterSelect.value = savedReciter;
  }

  // التحكم بحجم الخط (Accessibility)
  let currentFontSize = parseFloat(localStorage.getItem('mushafFontSize')) || 1.95;
  function applyFontSize() {
    if (ayahsContainer) {
      ayahsContainer.style.fontSize = `${currentFontSize.toFixed(2)}rem`;
      localStorage.setItem('mushafFontSize', currentFontSize.toFixed(2));
    }
  }
  applyFontSize();

  if (incFontBtn) incFontBtn.addEventListener('click', () => {
    if (currentFontSize < 3.0) { currentFontSize += 0.2; applyFontSize(); }
  });
  if (decFontBtn) decFontBtn.addEventListener('click', () => {
    if (currentFontSize > 1.35) { currentFontSize -= 0.2; applyFontSize(); }
  });
  if (resFontBtn) resFontBtn.addEventListener('click', () => {
    currentFontSize = 1.95; applyFontSize();
  });

  // وضع ملء الشاشة مع تواجد الإمكانية الكاملة للصفحة
  if (fullscreenBtn && quranBox) {
    fullscreenBtn.addEventListener('click', () => {
      const isFull = quranBox.classList.toggle('mushaf-fullscreen');
      document.body.style.overflow = isFull ? 'hidden' : '';
      fullscreenBtn.innerHTML = isFull ? '✕ إغلاق ملء الشاشة' : '⛶ ملء الشاشة';

      // استخدام واجهة Fullscreen API للمتصفح أيضاً إن كانت متاحة
      if (isFull && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else if (!isFull && document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    });

    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement && quranBox.classList.contains('mushaf-fullscreen')) {
        quranBox.classList.remove('mushaf-fullscreen');
        document.body.style.overflow = '';
        fullscreenBtn.innerHTML = '⛶ ملء الشاشة';
      }
    });
  }

  let surahPages = [];
  let currentPageIndex = 0;
  let totalAyahsCount = 0;
  let currentActiveAyahIndex = 0; // 0-based index within current surah
  let currentAyahAudioUrls = []; // Direct verified CDN audio URLs per ayah from API
  let audioFallbackStage = 0;
  let isFullSurahFallbackMode = false;

  // حساب رقم الآية العالمي في المصحف (من 1 إلى 6236) بناءً على السورة والآية
  function getGlobalAyahNumber(surahNum, ayahNum1Based) {
    let offset = 0;
    for (let i = 0; i < ALL_SURAHS.length; i++) {
      if (ALL_SURAHS[i].number < surahNum) {
        offset += ALL_SURAHS[i].ayahs;
      } else {
        break;
      }
    }
    return offset + ayahNum1Based;
  }

  // مؤقت الانتظار 2.5 ثانية بين كل آية والتي تليها
  const AYAH_PAUSE_SECONDS = 0.5;
  let pauseTimer = null;
  let countdownInterval = null;
  let isWaitingBetweenAyahs = false;
  const pauseStatusEl = document.getElementById('ayah-pause-status');

  function clearAyahPauseTimers() {
    if (pauseTimer) {
      clearTimeout(pauseTimer);
      pauseTimer = null;
    }
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
    isWaitingBetweenAyahs = false;
  }

  function resetPauseStatusText() {
    if (pauseStatusEl) {
      pauseStatusEl.innerHTML = '⏱️ نظام التلقين والتدبر: وقفة 0.5 ثانية بين كل آية والتي تليها (انقر على أي آية لسماعها)';
    }
  }

  function padZero(num) {
    return num.toString().padStart(3, '0');
  }

  // بناء روابط الصوت الثلاثية لكل آية لضمان عمل جميع الشيوخ بدون انقطاع
  function getCandidateUrlsForAyah(surahNum, ayahIdx0Based) {
    const ayahNum1Based = ayahIdx0Based + 1;
    const globalNum = getGlobalAyahNumber(surahNum, ayahNum1Based);
    const reciterCode = reciterSelect.value;
    const reciterObj = recitersList.find(r => r.id === reciterCode) || recitersList[0];

    const urls = [];
    // المصدر 1: الرابط المباشر من API التلاوة إن توفر
    if (currentAyahAudioUrls[ayahIdx0Based]) {
      urls.push(currentAyahAudioUrls[ayahIdx0Based]);
    }
    // المصدر 2: شبكة Islamic Network CDN السريعة والمستقرة
    const edition = reciterObj.edition || "ar.alafasy";
    const cdn128 = `https://cdn.islamic.network/quran/audio/128/${edition}/${globalNum}.mp3`;
    const cdn64 = `https://cdn.islamic.network/quran/audio/64/${edition}/${globalNum}.mp3`;
    if (!urls.includes(cdn128)) urls.push(cdn128);
    if (!urls.includes(cdn64)) urls.push(cdn64);

    // المصدر 3: خادم EveryAyah الاحتياطي
    if (reciterObj.ayahFolder) {
      urls.push(`https://everyayah.com/data/${reciterObj.ayahFolder}/${padZero(surahNum)}${padZero(ayahNum1Based)}.mp3`);
    }

    // المصدر 4: ملف السورة الكاملة من MP3Quran كخيار أخير
    if (reciterObj.server) {
      urls.push(`${reciterObj.server}${padZero(surahNum)}.mp3`);
    }

    return urls;
  }

  function paginateAyahs(ayahs, surahNum) {
    const pages = [];
    let currentPage = [];
    let charCount = 0;
    const MAX_CHARS_PER_PAGE = 650;

    ayahs.forEach((a, idx) => {
      let text = a.text;
      let hasBismillah = false;

      if (surahNum != 1 && idx === 0 && text.startsWith("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ")) {
        text = text.replace("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", "").trim();
        hasBismillah = true;
      }

      if (charCount > 0 && (charCount + text.length > MAX_CHARS_PER_PAGE)) {
        pages.push(currentPage);
        currentPage = [];
        charCount = 0;
      }

      currentPage.push({
        globalIndex: idx,
        numberInSurah: idx + 1,
        text: text,
        hasBismillah: hasBismillah
      });
      charCount += text.length;
    });

    if (currentPage.length > 0) {
      pages.push(currentPage);
    }
    return pages;
  }

  function updateNavigationControls() {
    const surahData = ALL_SURAHS.find(s => s.number === currentSurahNumber);
    const surahName = surahData ? surahData.name : '';

    if (pageIndicator) {
      pageIndicator.textContent = `سورة ${surahName} • صفحة ${currentPageIndex + 1} من ${surahPages.length}`;
    }

    if (prevPageBtn) {
      const hasPrev = currentPageIndex > 0 || currentSurahNumber > 1;
      prevPageBtn.disabled = !hasPrev;
      if (currentPageIndex === 0 && currentSurahNumber > 1) {
        const prevS = ALL_SURAHS.find(s => s.number === currentSurahNumber - 1);
        prevPageBtn.textContent = `→ السورة السابقة (${prevS.name})`;
      } else {
        prevPageBtn.textContent = '→ الصفحة السابقة';
      }
    }

    if (nextPageBtn) {
      const hasNext = currentPageIndex < surahPages.length - 1 || currentSurahNumber < 114;
      nextPageBtn.disabled = !hasNext;
      if (currentPageIndex === surahPages.length - 1 && currentSurahNumber < 114) {
        const nextS = ALL_SURAHS.find(s => s.number === currentSurahNumber + 1);
        nextPageBtn.textContent = `السورة التالية (${nextS.name}) ←`;
      } else {
        nextPageBtn.textContent = 'الصفحة التالية ←';
      }
    }

    if (prevSurahBtn) prevSurahBtn.disabled = currentSurahNumber <= 1;
    if (nextSurahBtn) nextSurahBtn.disabled = currentSurahNumber >= 114;
  }

  function highlightActiveAyahOnScreen() {
    const bm = getSavedBookmark();
    document.querySelectorAll('.ayah-span').forEach(span => {
      const gIdx = parseInt(span.getAttribute('data-global-idx'));
      span.classList.toggle('active', gIdx === currentActiveAyahIndex);
      const isBookmarked = bm && bm.surah === currentSurahNumber && (bm.ayah - 1) === gIdx;
      span.classList.toggle('bookmarked-ayah', Boolean(isBookmarked));
    });
  }

  function renderBookPage(pageIdx, direction = 'none') {
    if (!surahPages.length) return;
    currentPageIndex = Math.max(0, Math.min(pageIdx, surahPages.length - 1));

    if (mushafBook && direction !== 'none') {
      playPageTurnSound();
      mushafBook.classList.remove('flip-next', 'flip-prev');
      void mushafBook.offsetWidth;
      mushafBook.classList.add(direction === 'next' ? 'flip-next' : 'flip-prev');

      if (turningLeaf) {
        turningLeaf.classList.remove('animate-next', 'animate-prev');
        void turningLeaf.offsetWidth;
        turningLeaf.classList.add(direction === 'next' ? 'animate-next' : 'animate-prev');
      }
      ayahsContainer.style.opacity = '0.25';
    }

    setTimeout(() => {
      const pageAyahs = surahPages[currentPageIndex];
      let html = '';

      pageAyahs.forEach(item => {
        if (item.hasBismillah) {
          html += `<div style="text-align: center; font-size: 2rem; margin-bottom: 1.5rem; color: var(--secondary-color);">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>`;
        }
        const bm = getSavedBookmark();
        const isActive = item.globalIndex === currentActiveAyahIndex ? 'active' : '';
        const isBm = (bm && bm.surah === currentSurahNumber && (bm.ayah - 1) === item.globalIndex) ? 'bookmarked-ayah' : '';
        html += `<span class="ayah-span ${isActive} ${isBm}" data-global-idx="${item.globalIndex}" title="انقر لتشغيل هذه الآية وحفظ موضعها">${item.text} <span class="ayah-num">﴿${item.numberInSurah}﴾</span> </span>`;
      });

      ayahsContainer.innerHTML = html;
      ayahsContainer.style.opacity = '1';
      updateNavigationControls();
    }, direction !== 'none' ? 220 : 0);
  }

  // تشغيل آية محددة (0-based) مع التبديل التلقائي للخوادم البديلة في حال تعطل أي رابط
  function playSpecificAyah(ayahIdx0Based, autoPlay = true) {
    clearAyahPauseTimers();
    resetPauseStatusText();

    if (ayahIdx0Based < 0 || ayahIdx0Based >= totalAyahsCount) return;
    currentActiveAyahIndex = ayahIdx0Based;
    audioFallbackStage = 0;
    isFullSurahFallbackMode = false;

    const surahData = ALL_SURAHS.find(s => s.number === currentSurahNumber);
    const surahName = surahData ? surahData.name : '';

    const targetPageIdx = surahPages.findIndex(page =>
      page.some(item => item.globalIndex === ayahIdx0Based)
    );
    if (targetPageIdx !== -1 && targetPageIdx !== currentPageIndex) {
      const dir = targetPageIdx > currentPageIndex ? 'next' : 'prev';
      renderBookPage(targetPageIdx, dir);
    } else {
      highlightActiveAyahOnScreen();
    }

    playingNowInfo.innerHTML = `
      <span class="equalizer ${autoPlay ? 'playing' : ''}" id="audio-eq"><span></span><span></span><span></span><span></span></span>
      تلاوة سورة ${surahName} • الآية (${ayahIdx0Based + 1} من ${totalAyahsCount}) — ${reciterSelect.options[reciterSelect.selectedIndex].text}
    `;

    saveReadingBookmark(ayahIdx0Based, false);

    const candidates = getCandidateUrlsForAyah(currentSurahNumber, ayahIdx0Based);
    audio.src = candidates[0];
    if (autoPlay) {
      audio.play().catch(() => {});
    }
  }

  // الانتقال التلقائي للخادم البديل عند فشل تحميل ملف الصوت
  audio.addEventListener('error', () => {
    const candidates = getCandidateUrlsForAyah(currentSurahNumber, currentActiveAyahIndex);
    audioFallbackStage += 1;
    if (audioFallbackStage < candidates.length) {
      const nextUrl = candidates[audioFallbackStage];
      // إذا وصلنا للخيار الأخير (ملف السورة الكاملة MP3Quran)
      if (audioFallbackStage === candidates.length - 1) {
        isFullSurahFallbackMode = true;
      }
      audio.src = nextUrl;
      audio.play().catch(() => {});
    }
  });

  // في حال كان المشغل يعمل بوضع السورة الكاملة الاحتياطي، يزامن الآيات حسب الوقت
  audio.addEventListener('timeupdate', () => {
    if (!isFullSurahFallbackMode || totalAyahsCount === 0 || !audio.duration || !surahPages.length) return;
    const progress = audio.currentTime / audio.duration;
    const activeIndex = Math.min(Math.floor(progress * totalAyahsCount), totalAyahsCount - 1);
    if (activeIndex !== currentActiveAyahIndex) {
      currentActiveAyahIndex = activeIndex;
      const targetPageIdx = surahPages.findIndex(page =>
        page.some(item => item.globalIndex === activeIndex)
      );
      if (targetPageIdx !== -1 && targetPageIdx !== currentPageIndex) {
        renderBookPage(targetPageIdx, targetPageIdx > currentPageIndex ? 'next' : 'prev');
      } else {
        highlightActiveAyahOnScreen();
      }
    }
  });

  function loadSurah(surahNum, startAtLastPage = false, flipDir = 'next', autoPlay = false, targetAyah0Based = null) {
    clearAyahPauseTimers();
    resetPauseStatusText();

    currentSurahNumber = parseInt(surahNum);
    surahSelect.value = currentSurahNumber;

    const surahData = ALL_SURAHS.find(s => s.number === currentSurahNumber);
    if (!surahData) return;

    totalAyahsCount = surahData.ayahs;
    currentAyahAudioUrls = [];
    audioFallbackStage = 0;
    isFullSurahFallbackMode = false;

    surahTitle.textContent = `سورة ${surahData.name}`;
    surahInfo.textContent = `${surahData.type} • عدد آياتها ${surahData.ayahs} • ترتيبها في المصحف: ${surahData.number}`;
    
    if (practiceBtn) {
      practiceBtn.href = `practice.html?surah=${currentSurahNumber}`;
    }

    const reciterCode = reciterSelect.value;
    localStorage.setItem('selectedReciter', reciterCode);
    const reciterObj = recitersList.find(r => r.id === reciterCode) || recitersList[0];
    const edition = reciterObj.edition || "ar.alafasy";

    currentActiveAyahIndex = 0;
    playingNowInfo.innerHTML = `
      <span class="equalizer" id="audio-eq"><span></span><span></span><span></span><span></span></span>
      تلاوة سورة ${surahData.name} • الآية (1 من ${surahData.ayahs}) — ${reciterSelect.options[reciterSelect.selectedIndex].text}
    `;

    // تعيين رابط الصوت الموثوق فوراً قبل اكتمال جلب النص
    const initialCandidates = getCandidateUrlsForAyah(currentSurahNumber, 0);
    audio.src = initialCandidates[0];
    if (autoPlay) {
      audio.play().catch(() => {});
    }

    ayahsContainer.innerHTML = '<p style="text-align: center; color: #777;">جاري فتح صفحات السورة الكريمة...</p>';
    
    // جلب نص السورة مع روابط صوت الآيات الموثقة من AlQuran Cloud API
    fetch(`https://api.alquran.cloud/v1/surah/${currentSurahNumber}/${edition}`)
      .then(res => res.json())
      .then(data => {
        if (data.code === 200 && data.data && data.data.ayahs) {
          loadedAyahsRaw = data.data.ayahs;
          totalAyahsCount = data.data.ayahs.length;
          currentAyahAudioUrls = data.data.ayahs.map(a => a.audio || null);
          surahPages = paginateAyahs(data.data.ayahs, currentSurahNumber);

          let targetPage = startAtLastPage ? surahPages.length - 1 : 0;
          if (targetAyah0Based !== null && targetAyah0Based >= 0 && targetAyah0Based < totalAyahsCount) {
            currentActiveAyahIndex = targetAyah0Based;
            const foundPage = surahPages.findIndex(p => p.some(item => item.globalIndex === targetAyah0Based));
            if (foundPage !== -1) targetPage = foundPage;
          } else if (startAtLastPage && surahPages[targetPage]?.length) {
            currentActiveAyahIndex = surahPages[targetPage][0].globalIndex;
          }

          playingNowInfo.innerHTML = `
            <span class="equalizer" id="audio-eq"><span></span><span></span><span></span><span></span></span>
            تلاوة سورة ${surahData.name} • الآية (${currentActiveAyahIndex + 1} من ${totalAyahsCount}) — ${reciterSelect.options[reciterSelect.selectedIndex].text}
          `;

          const updatedCandidates = getCandidateUrlsForAyah(currentSurahNumber, currentActiveAyahIndex);
          if (audio.paused && !autoPlay) {
            audio.src = updatedCandidates[0];
          }
          renderBookPage(targetPage, flipDir);
        } else {
          // محاولة احتياطية لجلب النص فقط
          fetchSimpleTextFallback(surahData, startAtLastPage, flipDir);
        }
      })
      .catch(() => {
        fetchSimpleTextFallback(surahData, startAtLastPage, flipDir);
      });
  }

  function fetchSimpleTextFallback(surahData, startAtLastPage, flipDir) {
    fetch(`https://api.alquran.cloud/v1/surah/${currentSurahNumber}/quran-simple`)
      .then(res => res.json())
      .then(data => {
        if (data.code === 200 && data.data && data.data.ayahs) {
          totalAyahsCount = data.data.ayahs.length;
          surahPages = paginateAyahs(data.data.ayahs, currentSurahNumber);
          const targetPage = startAtLastPage ? surahPages.length - 1 : 0;
          renderBookPage(targetPage, flipDir);
        } else {
          showFallbackText(surahData);
        }
      })
      .catch(() => showFallbackText(surahData));
  }

  function showFallbackText(surahData) {
    surahPages = [];
    ayahsContainer.innerHTML = `
      <div style="text-align:center; padding: 2rem;">
        <p style="font-size: 1.8rem; margin-bottom: 1rem; color: var(--secondary-color);">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        <p style="font-size: 1.5rem; color: var(--primary-color);">تلاوة سورة ${surahData.name} بصوت خاشع وميسر.</p>
        <p style="font-size: 1rem; color: #777; margin-top: 1rem;">يمكنك الاستماع للتلاوة الكاملة مباشرة عبر المشغل الصوتي أدناه.</p>
      </div>
    `;
  }

  function goNextPageOrSurah() {
    if (currentPageIndex < surahPages.length - 1) {
      const nextPageIdx = currentPageIndex + 1;
      const firstAyahInNextPage = surahPages[nextPageIdx][0].globalIndex;
      playSpecificAyah(firstAyahInNextPage, !audio.paused && !isWaitingBetweenAyahs);
    } else if (currentSurahNumber < 114) {
      loadSurah(currentSurahNumber + 1, false, 'next', !audio.paused && !isWaitingBetweenAyahs);
    }
  }

  function goPrevPageOrSurah() {
    if (currentPageIndex > 0) {
      const prevPageIdx = currentPageIndex - 1;
      const firstAyahInPrevPage = surahPages[prevPageIdx][0].globalIndex;
      playSpecificAyah(firstAyahInPrevPage, !audio.paused && !isWaitingBetweenAyahs);
    } else if (currentSurahNumber > 1) {
      loadSurah(currentSurahNumber - 1, true, 'prev', !audio.paused && !isWaitingBetweenAyahs);
    }
  }

  if (nextPageBtn) nextPageBtn.addEventListener('click', goNextPageOrSurah);
  if (prevPageBtn) prevPageBtn.addEventListener('click', goPrevPageOrSurah);

  // النقر على أي آية لتشغيلها مباشرة
  if (ayahsContainer) {
    ayahsContainer.addEventListener('click', (e) => {
      const ayahEl = e.target.closest('.ayah-span');
      if (ayahEl) {
        e.stopPropagation();
        const gIdx = parseInt(ayahEl.getAttribute('data-global-idx'));
        if (!isNaN(gIdx)) {
          playSpecificAyah(gIdx, true);
        }
      }
    });
  }

  // دعم تقليب الصفحات باللمس (Swipe) وبالنقر المباشر على جانبي صفحة المصحف
  if (mushafBook) {
    let touchStartX = 0;
    let touchStartY = 0;

    mushafBook.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    mushafBook.addEventListener('touchend', (e) => {
      if (e.changedTouches.length === 1) {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;

        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) {
          if (dx > 0) {
            goNextPageOrSurah();
          } else {
            goPrevPageOrSurah();
          }
        }
      }
    }, { passive: true });

    mushafBook.addEventListener('click', (e) => {
      if (e.target.closest('.ayah-span')) return;
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) return;

      const rect = mushafBook.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;

      if (clickX < width * 0.45) {
        goNextPageOrSurah();
      } else if (clickX > width * 0.55) {
        goPrevPageOrSurah();
      }
    });
  }

  if (nextSurahBtn) {
    nextSurahBtn.addEventListener('click', () => {
      if (currentSurahNumber < 114) loadSurah(currentSurahNumber + 1, false, 'next', !audio.paused);
    });
  }

  if (prevSurahBtn) {
    prevSurahBtn.addEventListener('click', () => {
      if (currentSurahNumber > 1) loadSurah(currentSurahNumber - 1, false, 'prev', !audio.paused);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
    if (e.key === 'ArrowLeft') {
      goNextPageOrSurah();
    } else if (e.key === 'ArrowRight') {
      goPrevPageOrSurah();
    }
  });

  surahSelect.addEventListener('change', (e) => loadSurah(e.target.value, false, 'next', !audio.paused));
  reciterSelect.addEventListener('change', () => {
    const wasPlaying = !audio.paused || isWaitingBetweenAyahs;
    localStorage.setItem('selectedReciter', reciterSelect.value);
    // تحديث روابط الصوت للقارئ الجديد ثم تشغيل الآية الحالية فوراً
    const reciterObj = recitersList.find(r => r.id === reciterSelect.value) || recitersList[0];
    const edition = reciterObj.edition || "ar.alafasy";
    currentAyahAudioUrls = [];
    playSpecificAyah(currentActiveAyahIndex, wasPlaying);

    fetch(`https://api.alquran.cloud/v1/surah/${currentSurahNumber}/${edition}`)
      .then(res => res.json())
      .then(data => {
        if (data.code === 200 && data.data && data.data.ayahs) {
          currentAyahAudioUrls = data.data.ayahs.map(a => a.audio || null);
        }
      })
      .catch(() => {});
  });

  audio.addEventListener('play', () => {
    clearAyahPauseTimers();
    resetPauseStatusText();
    const eq = document.getElementById('audio-eq');
    if (eq) eq.classList.add('playing');
    highlightActiveAyahOnScreen();
  });

  audio.addEventListener('pause', () => {
    const eq = document.getElementById('audio-eq');
    if (eq) eq.classList.remove('playing');
  });

  // عند انتهاء الآية الحالية: ينتظر القارئ 5 ثوانٍ مع عد تنازلي واضح ثم ينتقل للآية التالية!
  audio.addEventListener('ended', () => {
    const eq = document.getElementById('audio-eq');
    if (eq) eq.classList.remove('playing');

    const nextAyahIdx = currentActiveAyahIndex + 1;

    if (!isFullSurahFallbackMode && nextAyahIdx < totalAyahsCount) {
      isWaitingBetweenAyahs = true;
      let remaining = AYAH_PAUSE_SECONDS;

      if (pauseStatusEl) {
        pauseStatusEl.innerHTML = `<span class="pause-countdown-pill">⏳ وقفة للتدبر: الانتقال للآية (${nextAyahIdx + 1}) خلال ${remaining.toFixed(1)} ثانية...</span>`;
      }

      countdownInterval = setInterval(() => {
        remaining = Math.max(0, remaining - 0.5);
        if (remaining > 0 && pauseStatusEl) {
          pauseStatusEl.innerHTML = `<span class="pause-countdown-pill">⏳ وقفة للتدبر: الانتقال للآية (${nextAyahIdx + 1}) خلال ${remaining.toFixed(1)} ثانية...</span>`;
        }
      }, 500);

      pauseTimer = setTimeout(() => {
        clearAyahPauseTimers();
        playSpecificAyah(nextAyahIdx, true);
      }, AYAH_PAUSE_SECONDS * 1000);

    } else if (currentSurahNumber < 114) {
      isWaitingBetweenAyahs = true;
      let remaining = AYAH_PAUSE_SECONDS;
      const nextS = ALL_SURAHS.find(s => s.number === currentSurahNumber + 1);

      if (pauseStatusEl) {
        pauseStatusEl.innerHTML = `<span class="pause-countdown-pill">⏳ اكتملت السورة • الانتقال لسورة ${nextS.name} خلال ${remaining.toFixed(1)} ثانية...</span>`;
      }

      countdownInterval = setInterval(() => {
        remaining = Math.max(0, remaining - 0.5);
        if (remaining > 0 && pauseStatusEl) {
          pauseStatusEl.innerHTML = `<span class="pause-countdown-pill">⏳ اكتملت السورة • الانتقال لسورة ${nextS.name} خلال ${remaining.toFixed(1)} ثانية...</span>`;
        }
      }, 500);

      pauseTimer = setTimeout(() => {
        clearAyahPauseTimers();
        loadSurah(currentSurahNumber + 1, false, 'next', true);
      }, AYAH_PAUSE_SECONDS * 1000);
    } else {
      resetPauseStatusText();
    }
  });

  loadSurah(currentSurahNumber, false, 'next', false, initialTargetAyah0Based);
}

/* =========================================================
   3. محرك التفاعلات والأنيميشن العام لجميع الصفحات
   ========================================================= */
function initUIAnimations() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress-bar';
  document.body.prepend(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progressBar.style.width = scrollHeight > 0 ? `${(scrollTop / scrollHeight) * 100}%` : '0%';
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, (index % 6) * 50);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

  window.observeRevealElements = function() {
    document.querySelectorAll('.card:not(.reveal-element), .quran-box:not(.reveal-element), .hero:not(.reveal-element), .hadith-section:not(.reveal-element)').forEach(el => {
      el.classList.add('reveal-element');
      observer.observe(el);
    });
  };
  window.observeRevealElements();

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.card-btn, .action-btn, .tool-btn, button');
    if (!btn || btn.disabled) return;

    const circle = document.createElement('span');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const rect = btn.getBoundingClientRect();

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - diameter / 2}px`;
    circle.style.top = `${e.clientY - rect.top - diameter / 2}px`;
    circle.classList.add('ripple-effect');

    const oldRipple = btn.querySelector('.ripple-effect');
    if (oldRipple) oldRipple.remove();
    btn.appendChild(circle);
  });
}
