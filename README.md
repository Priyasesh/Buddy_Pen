# LinguaFlow — Multilingual Translation System Data Flow Explorer

A browser-based interactive visualizer that demonstrates how raw multilingual input data is captured, structured, transformed, and validated across a real-time translation pipeline.

Built as a portfolio project to showcase data flow analysis, real-time API integration, and system design thinking developed during my Master's thesis on multilingual processing systems.

---

## Live Demo

🔗 **[View Live on GitHub Pages](https://yourusername.github.io/linguaflow)**
*(Replace `yourusername` with your actual GitHub username after deploying)*

---

## What It Does

This project simulates and visualizes a 5-stage multilingual data processing pipeline:

| Stage | Name | What Happens |
|-------|------|-------------|
| 1 | Input Capture | Raw text or speech input is captured, encoding is detected, byte size is calculated |
| 2 | Data Structuring | Input is tokenized into words, language is detected, metadata is attached as a structured JSON object |
| 3 | Transformation | NLP processing model is applied, semantic context is resolved, translation payload is queued |
| 4 | Multi-target Render | All selected target languages are translated in parallel using live API calls |
| 5 | Output Validation | Confidence scores are calculated, consistency is checked, outputs are finalized |

---

## Key Features

- **Custom Language Selection** — Search and add any language by name (70+ supported). No presets, fully user-controlled.
- **Live Translation** — Real translations via the MyMemory API. No mock data.
- **Parallel Processing** — All language translations fire simultaneously using `Promise.all`, demonstrating real concurrency principles.
- **Data Transformation Layers** — Three code panels show exactly how raw input becomes a structured object, tokenized output, and a translation payload.
- **Performance Metrics** — Live latency, average confidence score, tokens processed, and language count updated after every run.
- **Inefficiency Analysis** — Six system analysis items appear after each run, identifying bottlenecks and suggesting improvements — directly reflecting the analytical work done in the original research.
- **Light & Dark Mode** — Full theme toggle with system preference detection.
- **Fully Responsive** — Works on desktop, tablet, and mobile.

---

## Skills Demonstrated

- **Hardware/Software Integration Thinking** — The pipeline mirrors real embedded system data flow: capture → structure → process → output → validate
- **Process Automation Concepts** — Parallel API calls, streaming tokenization analysis, caching recommendations
- **Data Structuring** — Raw string input transformed into typed JSON objects with metadata
- **Async JavaScript** — `async/await` and `Promise.all` for non-blocking parallel operations
- **API Integration** — Live HTTP requests with error handling and graceful fallback
- **Separation of Concerns** — Clean architecture: `index.html` (structure), `style.css` (appearance), `app.js` (behavior)
- **Accessibility** — ARIA labels, keyboard navigation, focus management, reduced motion support
- **Responsive Design** — CSS Grid with `auto-fill`, `clamp()` fluid typography, mobile-first layout

---

## Project Structure

```
linguaflow/
├── index.html        # HTML structure only — the skeleton of the page
├── css/
│   └── style.css     # All styling — colors, fonts, layout, animations
├── js/
│   └── app.js        # All behavior — API calls, pipeline logic, DOM updates
└── README.md         # This file
```

**Why this structure?**
Each file has exactly one responsibility. This is called *Separation of Concerns* — a fundamental software engineering principle. If you want to change how the page looks, you only touch `style.css`. If you want to change how it behaves, you only touch `app.js`. This makes the codebase easier to maintain, test, and explain.

---

## How to Run Locally

No installation required. This is a static website — just open the file.

1. Download or clone this repository
2. Open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge)
3. An internet connection is required for live translations

```bash
# Optional: Clone via Git
git clone https://github.com/yourusername/linguaflow.git
cd linguaflow
open index.html
```

---

## API Used

**MyMemory Translation API** — [mymemory.translated.net](https://mymemory.translated.net)

- Free to use, no API key required, no account needed
- Supports 70+ language pairs from English
- Free tier: 5,000 words/day per IP address
- No credit card, no billing

---

## Academic Context

This project was developed as a portfolio visualization of my Master's thesis work in Electrical & Computer Engineering (Electronics) at Toronto Metropolitan University.

**Original research focus:**
- Analyzed multilingual input data to understand processing flow
- Structured raw data into organized formats for better usability
- Identified inefficiencies in data transformation and suggested improvements
- Evaluated system performance in real-time scenarios

**Impact achieved:**
Improved consistency and efficiency in handling multilingual data outputs and enabled more structured processing across translation pipeline stages.

---

## Author

**Vishnupriya Seshadri**
M.Eng. Electrical & Computer Engineering (Electronics)
[LinkedIn](https://linkedin.com/in/yourprofile) · [GitHub](https://github.com/yourusername)

---

## License

This project is open source and available under the [MIT License](LICENSE).
