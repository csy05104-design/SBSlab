# Implementation Plan - Automatic Google Scholar Updates

The goal is to automatically update the "Journal Papers" and "Conference Papers" sections of the website once a month based on Seong-Yong Cheon's Google Scholar profile.

## User Review Required
> [!IMPORTANT]
> **Google Scholar Blocking**: Google Scholar aggressively blocks automated scrapers. The proposed solution uses the `scholarly` Python library, but it may occasionally fail if requests are blocked. The GitHub Action is scheduled to run monthly, which minimizes this risk, but it's not guaranteed to work 100% of the time without a proxy.

> [!NOTE]
> **Heuristics for Classification**: Google Scholar doesn't explicitly categorize papers as "Journal" or "Conference" in a structured way. The script will use heuristics (e.g., checking for keywords like "Conference", "Proceedings", "Symposium" in the venue name) to classify them. This might require manual adjustment if misclassifications occur.

## Proposed Changes

### Data Layer
#### [NEW] [publications.json](file:///c:/Users/Seong-Yong%20Cheon/.gemini/antigravity/scratch/research_lab_website/publications.json)
- Create a JSON file to store the source of truth for publications.
- Structure: `{ "journals": [...], "conferences": [...] }`

### Frontend
#### [MODIFY] [index.html](file:///c:/Users/Seong-Yong%20Cheon/.gemini/antigravity/scratch/research_lab_website/index.html)
- Remove hardcoded publication HTML blocks.
- Add empty containers with IDs `journal-list` and `conference-list` (already exist, but need to be cleared).

#### [MODIFY] [script.js](file:///c:/Users/Seong-Yong%20Cheon/.gemini/antigravity/scratch/research_lab_website/script.js)
- Add logic to fetch `publications.json`.
- Add `renderPublications(data)` function to dynamically generate HTML.
- Preserve the "Show More" functionality.

### Automation (Backend)
#### [NEW] [update_publications.py](file:///c:/Users/Seong-Yong%20Cheon/.gemini/antigravity/scratch/research_lab_website/update_publications.py)
- Python script to:
    1. Search for "Seong-Yong Cheon" on Google Scholar.
    2. Fetch all publications.
    3. Sort by year (descending).
    4. Classify into Journals vs Conferences.
    5. Write to `publications.json`.

#### [NEW] [.github/workflows/update_pubs.yml](file:///c:/Users/Seong-Yong%20Cheon/.gemini/antigravity/scratch/research_lab_website/.github/workflows/update_pubs.yml)
- GitHub Action workflow to:
    1. Run on schedule (cron: '0 0 1 * *') - Monthly.
    2. Set up Python.
    3. Install `scholarly`.
    4. Run `update_publications.py`.
    5. Commit and push changes to `publications.json` if there are updates.

## Verification Plan

### Automated Tests
- Run `python update_publications.py` locally to verify it generates `publications.json` correctly.
- Check `publications.json` content for validity.

### Manual Verification
- Open `index.html` in a browser (via `open_browser_url` or manual check) to ensure publications load and display correctly.
- Verify "Show More" buttons work with the dynamic content.
