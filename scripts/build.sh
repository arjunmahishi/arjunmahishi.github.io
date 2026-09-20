#!/usr/bin/env bash
# Build the site: Tailwind CSS + Hugo, no Node required.
#
# Usage:
#   ./scripts/build.sh          production build (into public/)
#   ./scripts/build.sh serve   dev server with live reload, drafts visible
set -euo pipefail
cd "$(dirname "$0")/.."

TAILWIND_VERSION=v3.4.17
HUGO_VERSION=0.147.7

mkdir -p .tools

# --- Tailwind standalone CLI (bundles first-party plugins) ---
if [ ! -x .tools/tailwindcss ]; then
  case "$(uname -s)-$(uname -m)" in
    Darwin-arm64)  TW=tailwindcss-macos-arm64 ;;
    Darwin-*)      TW=tailwindcss-macos-x64 ;;
    Linux-x86_64)  TW=tailwindcss-linux-x64 ;;
    Linux-aarch64) TW=tailwindcss-linux-arm64 ;;
    *) echo "unsupported platform: $(uname -s)-$(uname -m)" >&2; exit 1 ;;
  esac
  echo "downloading tailwindcss ${TAILWIND_VERSION}..."
  curl -fsSL "https://github.com/tailwindlabs/tailwindcss/releases/download/${TAILWIND_VERSION}/${TW}" -o .tools/tailwindcss
  chmod +x .tools/tailwindcss
fi

# --- Hugo ---
if [ ! -x .tools/hugo ]; then
  case "$(uname -s)-$(uname -m)" in
    Darwin-*)      HUGO_ASSET="hugo_extended_${HUGO_VERSION}_darwin-universal.tar.gz" ;;
    Linux-x86_64)  HUGO_ASSET="hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz" ;;
    Linux-aarch64) HUGO_ASSET="hugo_extended_${HUGO_VERSION}_Linux-ARM64.tar.gz" ;;
    *) echo "unsupported platform: $(uname -s)-$(uname -m)" >&2; exit 1 ;;
  esac
  echo "downloading hugo ${HUGO_VERSION}..."
  curl -fsSL "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/${HUGO_ASSET}" \
    | tar -xz -C .tools hugo
fi

CACHE_DIR="$PWD/.tools/hugo-cache"

if [ "${1:-}" = "serve" ]; then
  .tools/tailwindcss -c tailwind.config.js -i assets/css/main.css -o static/css/main.css --watch &
  TW_PID=$!
  trap 'kill $TW_PID 2>/dev/null || true' EXIT
  .tools/hugo server -D --renderToMemory --cacheDir "$CACHE_DIR"
else
  # `serve` runs with -D (drafts), which leaks into production builds two ways:
  # its renders land in the build cache (not keyed on buildDrafts), and the
  # server itself writes to public/. Start every production build clean.
  rm -rf "$CACHE_DIR" public
  .tools/tailwindcss -c tailwind.config.js -i assets/css/main.css -o static/css/main.css --minify
  .tools/hugo --gc --minify --destination public --cacheDir "$CACHE_DIR"
fi
