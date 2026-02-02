from flask import Flask, render_template
import yaml

app = Flask(__name__)

def load_data():
    with open('data.yaml', 'r') as f:
        return yaml.safe_load(f)

@app.route('/')
def index():
    data = load_data()
    return render_template('index.html', data=data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
