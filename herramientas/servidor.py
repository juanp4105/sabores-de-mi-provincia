"""Servidor local para ver el sitio mientras se construye.

Uso (desde la carpeta del proyecto):
    python herramientas/servidor.py            -> solo en este computador: http://localhost:8080
    python herramientas/servidor.py --red      -> también visible desde el teléfono en la misma red Wi-Fi
    python herramientas/servidor.py --puerto 9000

Por qué no basta con abrir index.html con doble clic: el navegador bloquea la carga de los
archivos JSON cuando la página se abre como archivo. Este servidor los entrega correctamente.
También pide al navegador que no guarde copias viejas (así siempre se ve el último cambio).
"""
import argparse
import http.server
import os
import socket
import socketserver

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class Manejador(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        ".js": "text/javascript",
        ".mjs": "text/javascript",
        ".json": "application/json; charset=utf-8",
        ".svg": "image/svg+xml",
        ".css": "text/css; charset=utf-8",
        ".html": "text/html; charset=utf-8",
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=RAIZ, **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def direccion_en_la_red():
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("10.255.255.255", 1))
            return s.getsockname()[0]
    except OSError:
        return None


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--puerto", type=int, default=8080)
    parser.add_argument("--red", action="store_true", help="permitir ver el sitio desde otros dispositivos de la misma red")
    args = parser.parse_args()

    socketserver.TCPServer.allow_reuse_address = True
    host = "0.0.0.0" if args.red else "127.0.0.1"
    with socketserver.ThreadingTCPServer((host, args.puerto), Manejador) as servidor:
        print(f"Sitio disponible en:  http://localhost:{args.puerto}")
        if args.red:
            ip = direccion_en_la_red()
            if ip:
                print(f"Desde el teléfono (misma red Wi-Fi):  http://{ip}:{args.puerto}")
        print("Para detener el servidor: Ctrl + C")
        try:
            servidor.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor detenido.")


if __name__ == "__main__":
    main()
