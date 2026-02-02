# Personal Research Website

A sleek academic profile website built with Flask and HTMX, powered by YAML configuration.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the application:
```bash
python app.py
```

3. Visit `http://localhost:5000` in your browser.

## Configuration

Edit `data.yaml` to update your profile information, including:
- Personal information
- Contact links
- Research news
- Publications
- Previous experiences

## Project Structure

```
personal-website/
├── app.py              # Flask application
├── data.yaml           # Profile data configuration
├── requirements.txt    # Python dependencies
├── templates/
│   └── index.html      # Main template
└── static/
    ├── css/
    │   └── style.css   # Styles
    └── images/
        └── placeholder.jpg  # Profile photo (replace with your own)
```

## Customization

- Replace `static/images/placeholder.jpg` with your own photo
- Update `data.yaml` with your information
- Modify `static/css/style.css` to customize the design
