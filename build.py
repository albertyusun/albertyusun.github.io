#!/usr/bin/env python3
"""
Build script to generate static HTML from template and YAML data.
Run this script whenever you update data.yaml or the template.
"""
from jinja2 import Environment, FileSystemLoader
import yaml
import os

def build_site():
    # Load data from YAML
    with open('data.yaml', 'r') as f:
        data = yaml.safe_load(f)

    # Set up Jinja2 environment
    env = Environment(loader=FileSystemLoader('templates'))
    template = env.get_template('index_static.html')

    # Render template with data using static paths
    html = template.render(data=data)

    # Write to index.html in root directory
    with open('index.html', 'w') as f:
        f.write(html)

    print("✓ Built index.html successfully!")
    print("  Run: python -m http.server 8000")
    print("  Then visit: http://localhost:8000")

if __name__ == '__main__':
    build_site()
