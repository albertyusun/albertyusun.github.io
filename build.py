#!/usr/bin/env python3
"""
Build script to generate static HTML from template and YAML data.
Run this script whenever you update data.yaml or the template.
"""
from jinja2 import Environment, FileSystemLoader
import yaml
import os
import base64
from html import escape
from pathlib import Path

def build_experience_images(data):
    # Circular Gallery renders the same role cards as textures; generate them from YAML.
    logos = {
        'Epiq AI Labs': 'epiq.svg', 'Dynamo AI': 'dynamo.svg',
        'Curai Health': 'curai.svg', 'Microsoft Research': 'microsoft.png',
        'Vera Institute of Justice': 'vera-full.svg', 'ACLU': 'aclu-blue.svg',
    }
    output = Path('static/media/experience')
    output.mkdir(parents=True, exist_ok=True)
    for index, role in enumerate(data['previous_experiences']):
        logo = Path('static/images/companies') / logos[role['organization']]
        mime = 'image/svg+xml' if logo.suffix == '.svg' else 'image/png'
        encoded = base64.b64encode(logo.read_bytes()).decode()
        title = escape(role['title'])
        years = escape(role['years'].replace('-', '–'))
        svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 600 600"><rect width="600" height="600" fill="#f7faf7"/><rect x="1" y="1" width="598" height="598" rx="16" fill="none" stroke="#e4ebe5"/><image x="56" y="140" width="380" height="110" preserveAspectRatio="xMinYMid meet" href="data:{mime};base64,{encoded}"/><g font-family="Arial, sans-serif"><text x="56" y="365" font-size="38" fill="#273e33">{title}</text><text x="56" y="420" font-size="32" fill="#607564">{years}</text></g></svg>'''
        (output / f'role-{index}.svg').write_text(svg)


def build_site():
    # Load data from YAML
    with open('data.yaml', 'r') as f:
        data = yaml.safe_load(f)

    build_experience_images(data)

    # Set up Jinja2 environment
    env = Environment(loader=FileSystemLoader('templates'))
    template = env.get_template('index_static.html')

    # Render template with data using static paths
    html = template.render(data=data)
    html = '\n'.join(line.rstrip() for line in html.splitlines()) + '\n'

    # Write to index.html in root directory
    with open('index.html', 'w') as f:
        f.write(html)

    print("✓ Built index.html successfully!")
    print("  Run: python -m http.server 8000")
    print("  Then visit: http://localhost:8000")

if __name__ == '__main__':
    build_site()
