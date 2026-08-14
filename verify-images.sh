#!/usr/bin/env bash
# Checks whether the production container is actually serving static
# files (images) correctly, or still falling back to the SPA shell.
# Run on the server, from the project root:
#   bash verify-images.sh

set -u
PORT="${1:-8090}"

check() {
  local path="$1"
  local result
  result="$(curl -s -o /dev/null -w "%{http_code} %{content_type}" "http://localhost:${PORT}${path}")"
  echo "$path  ->  $result"
}

echo "=== GET requests (curl -I / HEAD is NOT used here on purpose) ==="
check "/images/heroes/home.jpg"
check "/images/heroes/about.jpg"
check "/images/cert.png"
check "/products"
check "/api/health"
echo "==================================================================="
echo "Expected:"
echo "  /images/heroes/home.jpg   -> 200 image/jpeg"
echo "  /images/heroes/about.jpg  -> 200 image/jpeg"
echo "  /images/cert.png          -> 200 image/png"
echo "  /products                 -> 200 text/html (SPA route, this is correct)"
echo "  /api/health                -> 200 application/json"
