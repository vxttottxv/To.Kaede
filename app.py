import os
from flask import Flask, render_template, send_from_directory, jsonify

app = Flask(__name__, template_folder='templates', static_folder='static')
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/scan-memories')
def scan_memories():
    memories_dir = os.path.join(BASE_DIR, 'static', 'images', 'memories')
    scanned = []
    if os.path.exists(memories_dir):
        groups = sorted(os.listdir(memories_dir))
        for g in groups:
            group_path = os.path.join(memories_dir, g)
            if os.path.isdir(group_path) and not g.startswith('.'):
                images = [
                    f"/static/images/memories/{g}/{f}" 
                    for f in sorted(os.listdir(group_path))
                    if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp'))
                ]
                scanned.append({
                    "group": g,
                    "images": images
                })
    return jsonify({"status": "ok", "groups": scanned})

if __name__ == '__main__':
    print("✨ Flask 생일 축하 서버 실행 중: http://localhost:8080")
    app.run(host='0.0.0.0', port=8080, debug=True)

