#!/usr/bin/env python3
"""
Local static server for this site (GitHub Pages-style HTML).

## Quick start

From the repo root:

    python3 serve_local.py

Then open:

    http://localhost:8000/blog/index.html
    http://localhost:8000/blog/posts/ai-should-review-your-thinking-not-replace-it.html

## Options

- Change port:
    python3 serve_local.py --port 8080

- Serve a specific directory (defaults to the directory containing this script):
    python3 serve_local.py --dir /path/to/aniketsinha.github.io

Stop the server with Ctrl+C.
"""

from __future__ import annotations

import argparse
import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from typing import Optional


def _parse_args(argv: Optional[list[str]] = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Serve this static site locally over HTTP.")
    parser.add_argument("--host", default="127.0.0.1", help="Bind host (default: 127.0.0.1). Use 0.0.0.0 for LAN.")
    parser.add_argument("--port", type=int, default=8000, help="Bind port (default: 8000).")
    parser.add_argument(
        "--dir",
        default=os.path.dirname(os.path.abspath(__file__)),
        help="Directory to serve (default: repo root / this file's directory).",
    )
    return parser.parse_args(argv)


def main(argv: Optional[list[str]] = None) -> int:
    args = _parse_args(argv)
    serve_dir = os.path.abspath(args.dir)

    if not os.path.isdir(serve_dir):
        print(f"Error: --dir is not a directory: {serve_dir}", file=sys.stderr)
        return 2

    handler = lambda *h_args, **h_kwargs: SimpleHTTPRequestHandler(  # noqa: E731
        *h_args, directory=serve_dir, **h_kwargs
    )

    httpd = ThreadingHTTPServer((args.host, args.port), handler)

    print(f"Serving: {serve_dir}")
    print(f"URL:     http://{args.host}:{args.port}/")
    print()
    print("Useful pages:")
    print(f"- Blog index: http://{args.host}:{args.port}/blog/index.html")
    print(
        f"- New post:   http://{args.host}:{args.port}/blog/posts/ai-should-review-your-thinking-not-replace-it.html"
    )
    print()
    print("Press Ctrl+C to stop.")

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping…")
    finally:
        httpd.server_close()

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

