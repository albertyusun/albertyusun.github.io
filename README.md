# Personal Research Website

A static academic profile website powered by YAML configuration and deployed on GitHub Pages.

## Quick Start

### Making Changes

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Edit your data:**
   Update `data.yaml` with your information (name, role, publications, etc.)

3. **Build the site:**
   ```bash
   python build.py
   ```
   This generates `index.html` from your YAML data.

4. **Preview locally:**
   ```bash
   python -m http.server 8000
   ```
   Visit `http://localhost:8000`

5. **Deploy:**
   ```bash
   git add index.html data.yaml
   git commit -m "Update profile"
   git push
   ```

## GitHub Pages Setup

1. Go to your repository settings on GitHub
2. Navigate to **Pages** (under "Code and automation")
3. Set **Source** to "Deploy from a branch"
4. Select your branch (e.g., `master` or `main`)
5. Save and wait a few minutes
6. Visit `https://albertyusun.github.io`

## Configuration

Edit `data.yaml` to update:
- Personal information (name, role, company, location)
- Contact links (Google Scholar, LinkedIn, etc.)
- Research news
- Publications
- Previous experiences

## Project Structure

```
albertyusun.github.io/
├── build.py                    # Build script (generates static HTML)
├── data.yaml                   # Your profile data (edit this!)
├── index.html                  # Generated static site (committed to git)
├── requirements.txt            # Python dependencies for building
├── templates/
│   └── index_static.html       # Jinja2 template
└── static/
    ├── css/
    │   └── style.css           # Styles
    └── images/
        └── albert.jpeg         # Your profile photo
```

## Development Files (Not Deployed)

These files are used for development but not deployed to GitHub Pages:
- `app.py` - Original Flask application (kept for reference)
- `templates/index.html` - Original Flask template
- `build.py` - Build script
- `templates/index_static.html` - Static template

## Customization

- **Photo:** Replace `static/images/albert.jpeg` with your photo
- **Data:** Update `data.yaml` with your information
- **Styling:** Modify `static/css/style.css`
- **Template:** Edit `templates/index_static.html`

After changes, always run `python build.py` to regenerate `index.html`.
