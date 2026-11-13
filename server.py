import os
import json
import mimetypes
from http.server import HTTPServer, SimpleHTTPRequestHandler
import urllib.parse

PORT = 8080
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

class BirthdayHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        # 루트 접속 시 templates/index.html 서빙
        if path == '/' or path == '/index.html':
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.end_headers()
            with open(os.path.join(BASE_DIR, 'templates', 'index.html'), 'rb') as f:
                self.wfile.write(f.read())
            return

        # API: 사진 폴더 자동 스캔 엔드포인트
        if path == '/api/scan-memories':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            memories_dir = os.path.join(BASE_DIR, 'static', 'images', 'memories')
            scanned = []
            if os.path.exists(memories_dir):
                groups = sorted(os.listdir(memories_dir))
                for g in groups:
                    group_path = os.path.join(memories_dir, g)
                    if os.path.isdir(group_path) and not g.startswith('.'):
                        images = [
                            f"static/images/memories/{g}/{f}" 
                            for f in sorted(os.listdir(group_path))
                            if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp'))
                        ]
                        scanned.append({
                            "group": g,
                            "images": images
                        })
            
            self.wfile.write(json.dumps({"status": "ok", "groups": scanned}).encode('utf-8'))
            return

        # 그 외 정적 파일(static/ 등)은 기본 서빙
        return super().do_GET()

def run():
    print(f"✨ [Happy Birthday Server Started]")
    print(f"🎈 접속 주소: http://localhost:{PORT}")
    print(f"🛑 서버 종료는 터미널에서 Ctrl + C를 누르세요.")
    httpd = HTTPServer(('0.0.0.0', PORT), BirthdayHandler)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n👋 서버가 종료되었습니다.")

if __name__ == '__main__':
    run()

