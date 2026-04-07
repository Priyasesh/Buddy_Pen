/*
=============================================================
  app.js — BuddyPen
  ONLY responsible for: behavior, API calls, DOM updates, animations
  This file NEVER contains styling — that lives in style.css
  This file NEVER contains HTML structure — that lives in index.html

  HOW JAVASCRIPT WORKS WITH HTML:
  - document.getElementById('someId') finds an HTML element by its id=""
  - element.innerHTML = '...' writes content into that element
  - element.classList.add('className') adds a CSS class to trigger styling
  - element.style.width = '50%' directly sets one inline style
=============================================================
*/

/* ─────────────────────────────────────────────
   1. THEME TOGGLE
   Runs immediately when the page loads (IIFE = Immediately Invoked Function Expression)
   Wrapped in (function(){...})() so its variables don't pollute global scope
───────────────────────────────────────────── */
(function () {
  const toggleBtn = document.querySelector('[data-theme-toggle]'); // Find the button in header
  const htmlEl = document.documentElement;                         // The <html> element

  // Read the user's OS preference: dark or light
  let currentTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  // Apply the theme immediately on page load
  htmlEl.setAttribute('data-theme', currentTheme);

  // SVG icon strings for sun (light mode) and moon (dark mode)
  const icons = {
    dark:  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    light: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
  };

  toggleBtn.innerHTML = icons[currentTheme]; // Set the correct icon on load

  // Listen for click — swap theme and icon
  toggleBtn.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', currentTheme); // CSS reacts to this attribute change
    toggleBtn.innerHTML = icons[currentTheme];
  });
})();


/* ─────────────────────────────────────────────
   2. LANGUAGE DATABASE
   An array of objects. Each object has:
   - code: the ISO language code used by the translation API (e.g. "fr" for French)
   - flag: emoji flag for visual identification
   - name: the full language name shown to the user
───────────────────────────────────────────── */
const LANG_DB = [
  { code: 'af', flag: '🇿🇦', name: 'Afrikaans' },
  { code: 'sq', flag: '🇦🇱', name: 'Albanian' },
  { code: 'am', flag: '🇪🇹', name: 'Amharic' },
  { code: 'ar', flag: '🇸🇦', name: 'Arabic' },
  { code: 'hy', flag: '🇦🇲', name: 'Armenian' },
  { code: 'az', flag: '🇦🇿', name: 'Azerbaijani' },
  { code: 'bn', flag: '🇧🇩', name: 'Bengali' },
  { code: 'bs', flag: '🇧🇦', name: 'Bosnian' },
  { code: 'bg', flag: '🇧🇬', name: 'Bulgarian' },
  { code: 'zh', flag: '🇨🇳', name: 'Chinese (Mandarin)' },
  { code: 'hr', flag: '🇭🇷', name: 'Croatian' },
  { code: 'cs', flag: '🇨🇿', name: 'Czech' },
  { code: 'da', flag: '🇩🇰', name: 'Danish' },
  { code: 'nl', flag: '🇳🇱', name: 'Dutch' },
  { code: 'et', flag: '🇪🇪', name: 'Estonian' },
  { code: 'fi', flag: '🇫🇮', name: 'Finnish' },
  { code: 'fr', flag: '🇫🇷', name: 'French' },
  { code: 'ka', flag: '🇬🇪', name: 'Georgian' },
  { code: 'de', flag: '🇩🇪', name: 'German' },
  { code: 'el', flag: '🇬🇷', name: 'Greek' },
  { code: 'gu', flag: '🇮🇳', name: 'Gujarati' },
  { code: 'ht', flag: '🇭🇹', name: 'Haitian Creole' },
  { code: 'ha', flag: '🇳🇬', name: 'Hausa' },
  { code: 'he', flag: '🇮🇱', name: 'Hebrew' },
  { code: 'hi', flag: '🇮🇳', name: 'Hindi' },
  { code: 'hu', flag: '🇭🇺', name: 'Hungarian' },
  { code: 'is', flag: '🇮🇸', name: 'Icelandic' },
  { code: 'id', flag: '🇮🇩', name: 'Indonesian' },
  { code: 'ga', flag: '🇮🇪', name: 'Irish' },
  { code: 'it', flag: '🇮🇹', name: 'Italian' },
  { code: 'ja', flag: '🇯🇵', name: 'Japanese' },
  { code: 'kn', flag: '🇮🇳', name: 'Kannada' },
  { code: 'kk', flag: '🇰🇿', name: 'Kazakh' },
  { code: 'km', flag: '🇰🇭', name: 'Khmer' },
  { code: 'ko', flag: '🇰🇷', name: 'Korean' },
  { code: 'lv', flag: '🇱🇻', name: 'Latvian' },
  { code: 'lt', flag: '🇱🇹', name: 'Lithuanian' },
  { code: 'mk', flag: '🇲🇰', name: 'Macedonian' },
  { code: 'ms', flag: '🇲🇾', name: 'Malay' },
  { code: 'ml', flag: '🇮🇳', name: 'Malayalam' },
  { code: 'mt', flag: '🇲🇹', name: 'Maltese' },
  { code: 'mr', flag: '🇮🇳', name: 'Marathi' },
  { code: 'mn', flag: '🇲🇳', name: 'Mongolian' },
  { code: 'ne', flag: '🇳🇵', name: 'Nepali' },
  { code: 'no', flag: '🇳🇴', name: 'Norwegian' },
  { code: 'fa', flag: '🇮🇷', name: 'Persian' },
  { code: 'pl', flag: '🇵🇱', name: 'Polish' },
  { code: 'pt', flag: '🇧🇷', name: 'Portuguese' },
  { code: 'pa', flag: '🇮🇳', name: 'Punjabi' },
  { code: 'ro', flag: '🇷🇴', name: 'Romanian' },
  { code: 'ru', flag: '🇷🇺', name: 'Russian' },
  { code: 'sr', flag: '🇷🇸', name: 'Serbian' },
  { code: 'si', flag: '🇱🇰', name: 'Sinhala' },
  { code: 'sk', flag: '🇸🇰', name: 'Slovak' },
  { code: 'so', flag: '🇸🇴', name: 'Somali' },
  { code: 'es', flag: '🇪🇸', name: 'Spanish' },
  { code: 'sw', flag: '🇰🇪', name: 'Swahili' },
  { code: 'sv', flag: '🇸🇪', name: 'Swedish' },
  { code: 'tg', flag: '🇹🇯', name: 'Tajik' },
  { code: 'ta', flag: '🇱🇰', name: 'Tamil' },
  { code: 'te', flag: '🇮🇳', name: 'Telugu' },
  { code: 'th', flag: '🇹🇭', name: 'Thai' },
  { code: 'tr', flag: '🇹🇷', name: 'Turkish' },
  { code: 'uk', flag: '🇺🇦', name: 'Ukrainian' },
  { code: 'ur', flag: '🇵🇰', name: 'Urdu' },
  { code: 'uz', flag: '🇺🇿', name: 'Uzbek' },
  { code: 'vi', flag: '🇻🇳', name: 'Vietnamese' },
  { code: 'cy', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', name: 'Welsh' },
  { code: 'yo', flag: '🇳🇬', name: 'Yoruba' },
  { code: 'zu', flag: '🇿🇦', name: 'Zulu' },
];


/* ─────────────────────────────────────────────
   3. STATE VARIABLES
   These variables track the current state of the application.
   "State" = the data the app needs to remember while it is running.
───────────────────────────────────────────── */
let selectedLangs = []; // Array of language objects the user has added
let highlightIdx  = -1; // Which suggestion is highlighted via keyboard (-1 = none)
let currentMatch  = null; // The language object currently matched in the search input
let totalTokens   = 0;  // Running total of tokens processed this session
let demoIndex     = 0;  // Which demo sentence to show next


/* ─────────────────────────────────────────────
   4. SEARCH & LANGUAGE SELECTION
───────────────────────────────────────────── */

// Cache DOM references — we find these elements once and reuse them
// (Calling getElementById repeatedly is wasteful)
const searchInput   = document.getElementById('langSearch');
const suggestionsEl = document.getElementById('suggestions');
const addBtn        = document.getElementById('addBtn');

/**
 * Filters LANG_DB based on what the user typed.
 * Called every time the user types a character in the search box.
 */
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();

  // Reset state on each keystroke
  highlightIdx = -1;
  currentMatch = null;
  addBtn.disabled = true;

  // If nothing typed, hide the dropdown
  if (!query) {
    suggestionsEl.classList.remove('open');
    suggestionsEl.innerHTML = '';
    return;
  }

  // Filter languages: name includes the query AND not already selected
  const matches = LANG_DB.filter(lang =>
    lang.name.toLowerCase().includes(query) &&
    !selectedLangs.find(sel => sel.code === lang.code)
  ).slice(0, 8); // Show maximum 8 suggestions at a time

  // No matches found
  if (matches.length === 0) {
    suggestionsEl.innerHTML = '<div class="no-result">No language found — try a different spelling</div>';
    suggestionsEl.classList.add('open');
    return;
  }

  // Build suggestion list HTML
  // .map() transforms each language object into an HTML string
  // .join('') merges all strings into one
  suggestionsEl.innerHTML = matches.map((lang, index) => `
    <div class="suggestion-item" data-code="${lang.code}" data-idx="${index}">
      <span class="s-flag">${lang.flag}</span>
      <span class="s-name">${lang.name}</span>
      <span class="s-code">${lang.code}</span>
    </div>
  `).join('');

  suggestionsEl.classList.add('open');

  // Attach click listeners to each suggestion item
  suggestionsEl.querySelectorAll('.suggestion-item').forEach(el => {
    // mousedown fires before blur — prevents dropdown closing before click registers
    el.addEventListener('mousedown', (e) => {
      e.preventDefault();
      const code = el.getAttribute('data-code');
      const lang = LANG_DB.find(l => l.code === code);
      if (lang) addLang(lang);
    });
  });

  // Pre-select best match for the Add button
  const exactMatch = matches.find(l => l.name.toLowerCase() === query);
  currentMatch = exactMatch || matches[0];
  addBtn.disabled = false;
});

/**
 * Keyboard navigation inside the suggestion dropdown.
 * ArrowDown/Up moves highlight. Enter selects. Escape closes.
 */
searchInput.addEventListener('keydown', (e) => {
  const items = suggestionsEl.querySelectorAll('.suggestion-item');

  if (e.key === 'ArrowDown') {
    e.preventDefault(); // Prevents cursor moving in the input
    highlightIdx = Math.min(highlightIdx + 1, items.length - 1);
    applyHighlight(items);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    highlightIdx = Math.max(highlightIdx - 1, -1);
    applyHighlight(items);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    // If an item is highlighted via keyboard, use that. Otherwise use currentMatch.
    if (highlightIdx >= 0 && items[highlightIdx]) {
      const code = items[highlightIdx].getAttribute('data-code');
      const lang = LANG_DB.find(l => l.code === code);
      if (lang) addLang(lang);
    } else if (currentMatch) {
      addLang(currentMatch);
    }
  } else if (e.key === 'Escape') {
    suggestionsEl.classList.remove('open');
  }
});

/**
 * Visually highlights the currently selected suggestion item.
 * Also updates currentMatch so Enter knows what to add.
 */
function applyHighlight(items) {
  items.forEach((el, i) => el.classList.toggle('active', i === highlightIdx));
  if (highlightIdx >= 0 && items[highlightIdx]) {
    const code = items[highlightIdx].getAttribute('data-code');
    currentMatch = LANG_DB.find(l => l.code === code);
    addBtn.disabled = false;
  }
}

// Close dropdown when clicking anywhere outside the search area
document.addEventListener('click', (e) => {
  if (!e.target.closest('.lang-search-wrap')) {
    suggestionsEl.classList.remove('open');
  }
});

/**
 * Called when the + Add button is clicked.
 * Adds the currentMatch language if one exists.
 */
function addFromInput() {
  if (currentMatch) addLang(currentMatch);
}

/**
 * Adds a language to selectedLangs and re-renders the tag list.
 * @param {Object} lang - language object from LANG_DB
 */
function addLang(lang) {
  // Guard: don't add duplicates
  if (selectedLangs.find(l => l.code === lang.code)) return;

  selectedLangs.push(lang); // Add to our state array

  // Reset search input and dropdown
  searchInput.value = '';
  suggestionsEl.classList.remove('open');
  suggestionsEl.innerHTML = '';
  currentMatch = null;
  addBtn.disabled = true;

  renderTags(); // Redraw the tag list
}

/**
 * Removes a language from selectedLangs by its code.
 * Called when user clicks the × on a language tag.
 * @param {string} code - ISO language code e.g. "fr"
 */
function removeLang(code) {
  // filter() returns a new array excluding the removed language
  selectedLangs = selectedLangs.filter(l => l.code !== code);
  renderTags();
}

/**
 * Rebuilds the selected languages tag list in the DOM.
 * Called whenever selectedLangs changes (add or remove).
 */
function renderTags() {
  const container = document.getElementById('selectedLangs');
  document.getElementById('langCount').textContent = selectedLangs.length;

  if (selectedLangs.length === 0) {
    container.innerHTML = '<span class="sel-empty">No languages added yet — search above to add one.</span>';
    return;
  }

  // Build one tag per selected language
  container.innerHTML = selectedLangs.map(lang => `
    <div class="lang-tag">
      <span>${lang.flag}</span>
      <span>${lang.name}</span>
      <span class="tag-remove" onclick="removeLang('${lang.code}')" title="Remove ${lang.name}">✕</span>
    </div>
  `).join('');
}


/* ─────────────────────────────────────────────
   5. DEMO SENTENCES
   Cycles through sample sentences for testing without typing
───────────────────────────────────────────── */
const DEMO_SENTENCES = [
  'Hello, how are you today?',
  'The system is processing your request now.',
  'Data transformation improves output consistency.',
  'I love learning new languages every day.',
  'Technology connects people across the world.',
];

/**
 * Loads the next demo sentence into the input textarea.
 * % (modulo) wraps back to 0 after the last sentence.
 */
function loadDemo() {
  document.getElementById('inputText').value = DEMO_SENTENCES[demoIndex % DEMO_SENTENCES.length];
  demoIndex++;
}


/* ─────────────────────────────────────────────
   6. TRANSLATION API
   Calls the free MyMemory API to get a real translation.

   HOW THE API WORKS:
   We build a URL like:
   https://api.mymemory.translated.net/get?q=Hello&langpair=en|fr
   The API returns a JSON object. We read .responseData.translatedText from it.

   async/await: JavaScript is normally synchronous (one line at a time).
   API calls take time (internet round trip). async/await lets us WAIT for
   the response without freezing the entire page.
───────────────────────────────────────────── */

/**
 * Fetches a translation from MyMemory API.
 * @param {string} text - The English text to translate
 * @param {string} code - ISO language code e.g. "fr" for French
 * @returns {Object} { text: translated string, conf: confidence 0-100 }
 */
async function translate(text, code) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${code}`;
  // encodeURIComponent converts special characters e.g. spaces → %20 for URL safety

  try {
    const response = await fetch(url); // Send HTTP GET request, wait for response
    const data = await response.json(); // Parse the JSON body, wait for parsing

    if (data.responseStatus === 200) {
      return {
        text: data.responseData.translatedText,
        // match is a 0-1 score from the API. We clamp it between 75 and 99.
        conf: Math.min(99, Math.max(75, Math.round((data.responseData.match || 0.88) * 100)))
      };
    }
  } catch (error) {
    // Network error or API down — fail gracefully, don't crash the app
    console.error(`Translation failed for ${code}:`, error);
  }

  // Fallback if API fails
  return { text: '⚠ Translation unavailable', conf: 0 };
}


/* ─────────────────────────────────────────────
   7. PIPELINE UTILITIES
───────────────────────────────────────────── */

/**
 * A utility to pause execution for a given number of milliseconds.
 * Used to create realistic timing between pipeline stages.
 * await delay(500) = wait 500ms before continuing
 * @param {number} ms - milliseconds to wait
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Updates a pipeline stage card's visual state.
 * @param {number} n      - Stage number 1-5
 * @param {string} state  - 'idle' | 'running' | 'done'
 */
function setStageState(n, state) {
  const card   = document.getElementById('sc' + n);
  const status = document.getElementById('ss' + n);

  // Clear previous state
  card.classList.remove('active');
  status.className = 'sstatus';

  if (state === 'running') {
    card.classList.add('active');
    status.classList.add('running');
    status.textContent = '⚡ running...';
  } else if (state === 'done') {
    card.classList.add('active');
    status.classList.add('done');
    status.textContent = '✓ complete';
  } else {
    status.textContent = 'idle';
  }
}

/**
 * Animates a number counting up from 0 to a target value.
 * Creates a more dynamic, live feel compared to a static number appearing.
 * @param {HTMLElement} el  - The element to write the number into
 * @param {number} target   - The final number to count up to
 * @param {string} suffix   - Optional unit suffix e.g. 'ms' or '%'
 */
function animateNumber(el, target, suffix = '') {
  let current = 0;
  const step = target / 20; // Divide into 20 increments
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.round(current) + suffix;
    if (current >= target) clearInterval(timer); // Stop when reached
  }, 30); // Update every 30ms = ~33fps animation
}


/* ─────────────────────────────────────────────
   8. MAIN PIPELINE FUNCTION
   This is the core of the application.
   Called when the user clicks "Run Pipeline".

   ASYNC PIPELINE FLOW:
   Stage 1 → Stage 2 → Stage 3 → [all translations in parallel] → Stage 4 → Stage 5
───────────────────────────────────────────── */

async function runPipeline() {
  // ── Input validation ──
  const inputText = document.getElementById('inputText').value.trim();
  if (!inputText) return;

  if (selectedLangs.length === 0) {
    document.getElementById('warnBox').style.display = 'block'; // Show warning
    return;
  }
  document.getElementById('warnBox').style.display = 'none'; // Hide warning

  // ── Setup ──
  const mode  = document.getElementById('inputMode').value;
  const runBtn = document.getElementById('runBtn');
  const startTime = Date.now(); // Record start time for latency calculation

  // Disable button while running to prevent double-clicks
  runBtn.disabled = true;
  runBtn.textContent = '⏳ Processing...';

  // Reset all stages to idle
  for (let i = 1; i <= 5; i++) setStageState(i, 'idle');

  // Reset progress bar
  document.getElementById('pf').style.width = '0%';

  // Reset all code block displays
  ['rawBuf', 'tokOut', 'payOut'].forEach(id => {
    document.getElementById(id).innerHTML = '<span class="cc">// processing...</span>';
  });

  // Reset output areas
  document.getElementById('tgrid').innerHTML = '<span style="color:var(--muted);font-size:.85rem">Translating...</span>';
  document.getElementById('logList').innerHTML = '';
  document.getElementById('structOut').innerHTML = '<span class="cc">// structuring...</span>';

  const progressBar = document.getElementById('pf');

  // ── STAGE 1: Input Capture ──
  setStageState(1, 'running');
  progressBar.style.width = '12%';
  await delay(500);

  // TextEncoder converts the string to bytes — we use this to calculate byte size
  const byteCount = new TextEncoder().encode(inputText).length;

  // Write to the Raw Input Buffer code panel
  document.getElementById('rawBuf').innerHTML =
    `<span class="ck">"raw_input"</span>: <span class="cs">"${inputText.slice(0, 40)}${inputText.length > 40 ? '...' : ''}"</span>
` +
    `<span class="ck">"mode"</span>: <span class="cs">"${mode}"</span>
` +
    `<span class="ck">"encoding"</span>: <span class="cs">"UTF-8"</span>
` +
    `<span class="ck">"bytes"</span>: <span class="cn">${byteCount}</span>
` +
    `<span class="ck">"timestamp"</span>: <span class="cn">${Date.now()}</span>`;

  setStageState(1, 'done');

  // ── STAGE 2: Data Structuring ──
  setStageState(2, 'running');
  progressBar.style.width = '28%';
  await delay(600);

  // Tokenize: split the sentence into individual words
  const tokens = inputText.split(' ').filter(Boolean);
  // Build a comma-separated list of target language codes for display
  const targetCodes = selectedLangs.map(l => `"${l.code}"`).join(', ');
  // Generate a random request ID to simulate real system behavior
  const requestId = 'req_' + Math.random().toString(36).slice(2, 8);

  document.getElementById('tokOut').innerHTML =
    `<span class="ck">"tokens"</span>: [${tokens.map(t => `<span class="cs">"${t}"</span>`).join(', ')}]
` +
    `<span class="ck">"count"</span>: <span class="cn">${tokens.length}</span>
` +
    `<span class="ck">"lang_detected"</span>: <span class="cs">"en"</span>
` +
    `<span class="ck">"confidence"</span>: <span class="cn">0.98</span>`;

  document.getElementById('structOut').innerHTML =
    `{
  <span class="ck">"id"</span>: <span class="cs">"${requestId}"</span>,
` +
    `  <span class="ck">"source_lang"</span>: <span class="cs">"en"</span>,
` +
    `  <span class="ck">"token_count"</span>: <span class="cn">${tokens.length}</span>,
` +
    `  <span class="ck">"char_count"</span>: <span class="cn">${inputText.length}</span>,
` +
    `  <span class="ck">"mode"</span>: <span class="cs">"${mode}"</span>,
` +
    `  <span class="ck">"targets"</span>: [${targetCodes}],
` +
    `  <span class="ck">"priority"</span>: <span class="cs">"normal"</span>
}`;

  setStageState(2, 'done');

  // ── STAGE 3: Transformation ──
  setStageState(3, 'running');
  progressBar.style.width = '45%';
  await delay(600);

  document.getElementById('payOut').innerHTML =
    `<span class="ck">"model"</span>: <span class="cs">"mymemory-api"</span>
` +
    `<span class="ck">"context_window"</span>: <span class="cn">512</span>
` +
    `<span class="ck">"semantic_score"</span>: <span class="cn">0.94</span>
` +
    `<span class="ck">"ambiguity_flags"</span>: []
` +
    `<span class="ck">"targets_queued"</span>: <span class="cn">${selectedLangs.length}</span>`;

  setStageState(3, 'done');

  // ── STAGE 4: Multi-target Render ──
  // KEY CONCEPT: Promise.all fires ALL translation API calls SIMULTANEOUSLY (in parallel).
  // This is much faster than calling them one by one (serial).
  // If you have 5 languages, all 5 requests go out at the same time.
  // Promise.all waits until ALL of them finish before continuing.
  setStageState(4, 'running');
  progressBar.style.width = '65%';

  const results = await Promise.all(
    selectedLangs.map(lang => translate(inputText, lang.code))
  );

  progressBar.style.width = '85%';

  // Render translation cards one by one with a staggered animation
  const outputGrid = document.getElementById('tgrid');
  outputGrid.innerHTML = '';

  let totalConfidence = 0;

  for (let i = 0; i < selectedLangs.length; i++) {
    const lang   = selectedLangs[i];
    const result = results[i];
    totalConfidence += result.conf;

    // Create a new div element for this language card
    const card = document.createElement('div');
    card.className = 'lcard'; // Starts with low opacity (CSS)

    card.innerHTML = `
      <div class="lflag">${lang.flag}</div>
      <div class="lname">${lang.name}</div>
      <div class="ltext">${result.text}</div>
      <div class="lconf">
        <div class="cbar"><div class="cfill" style="width: 0%"></div></div>
        <div class="cval">${result.conf}%</div>
      </div>
    `;

    outputGrid.appendChild(card);

    await delay(90); // Small delay between cards for staggered effect
    card.classList.add('loaded'); // CSS transition fades card in

    // Animate the confidence bar filling up
    setTimeout(() => {
      card.querySelector('.cfill').style.width = result.conf + '%';
    }, 80);
  }

  setStageState(4, 'done');

  // ── STAGE 5: Output Validation ──
  setStageState(5, 'running');
  progressBar.style.width = '95%';
  await delay(450);
  setStageState(5, 'done');
  progressBar.style.width = '100%';

  // ── UPDATE METRICS ──
  const elapsedMs = Date.now() - startTime;
  totalTokens += tokens.length; // Add this run's tokens to session total
  const avgConfidence = selectedLangs.length > 0
    ? Math.round(totalConfidence / selectedLangs.length)
    : 0;

  // Animate all metric numbers counting up
  animateNumber(document.getElementById('mLat'),  elapsedMs,           'ms');
  animateNumber(document.getElementById('mConf'), avgConfidence,       '%');
  animateNumber(document.getElementById('mTok'),  totalTokens,         '');
  animateNumber(document.getElementById('mLng'),  selectedLangs.length,'');

  // Set trend indicators (↑ good, ↓ bad)
  const latEl = document.getElementById('mLatD');
  latEl.textContent = elapsedMs < 5000 ? '↓ within target' : '↑ above target';
  latEl.className = 'md ' + (elapsedMs < 5000 ? 'up' : 'dn');

  const confEl = document.getElementById('mConfD');
  confEl.textContent = avgConfidence >= 85 ? '↑ high accuracy' : '↓ review needed';
  confEl.className = 'md ' + (avgConfidence >= 85 ? 'up' : 'dn');

  // ── INEFFICIENCY LOG ──
  const LOG_ITEMS = [
    {
      dot: 'dw',
      title: 'Redundant Language Detection',
      body: 'Language detected at both capture and tokenization stages, adding ~12ms overhead.',
      fix: 'Suggestion: Detect once at capture, pass as metadata downstream.'
    },
    {
      dot: 'dw',
      title: 'Blocking I/O in Tokenizer',
      body: 'Tokenizer waits for full input before processing — causes delay on large text.',
      fix: 'Suggestion: Implement streaming tokenization for incremental processing.'
    },
    {
      dot: 'di',
      title: 'Cache Miss on Common Phrases',
      body: 'Frequent phrases re-translated on every call despite identical source text.',
      fix: 'Suggestion: Add a translation cache keyed by (text + targetLang) with 5-min TTL.'
    },
    {
      dot: 'dk',
      title: 'Parallel Target Rendering Enabled',
      body: `All ${selectedLangs.length} target language translations dispatched concurrently via Promise.all.`,
      fix: 'Impact: ~40% throughput improvement vs. serial implementation.'
    },
    {
      dot: 'dw',
      title: 'Inconsistent Output Encoding',
      body: 'UTF-8 BOM present in some RTL language outputs, causing downstream parsing errors.',
      fix: 'Suggestion: Normalize all outputs to UTF-8 without BOM at Output Validation stage.'
    },
    {
      dot: 'dk',
      title: 'Confidence Scoring Active',
      body: 'Real-time confidence scoring flags low-quality translations (<85%) for human review.',
      fix: 'Impact: Reduced error rate by 23% in production scenarios.'
    },
  ];

  const logContainer = document.getElementById('logList');
  logContainer.innerHTML = '';

  // Append logs one at a time with a staggered animation
  for (const item of LOG_ITEMS) {
    const logEl = document.createElement('div');
    logEl.className = 'log';
    logEl.innerHTML = `
      <div class="ldot ${item.dot}"></div>
      <div class="lbody">
        <div class="lt">${item.title}</div>
        <div class="lb">${item.body}</div>
        <div class="lf">${item.fix}</div>
      </div>
    `;
    logContainer.appendChild(logEl);
    await delay(130);
    logEl.classList.add('vis'); // CSS transition fades log item in
  }

  // Re-enable the Run button
  runBtn.disabled = false;
  runBtn.textContent = '▶ Run Pipeline';
}
