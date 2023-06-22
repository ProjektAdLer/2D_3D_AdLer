#!/bin/sh

# IMPORTANT: when modifying this file with windows (even with wsl) expect problems with file permissions and line endings

rm -f /usr/share/nginx/html/env-config.js
echo "window._env_ = {" >> /usr/share/nginx/html/env-config.js
echo "    API_URL: '$API_URL'," >> /usr/share/nginx/html/env-config.js
echo "};" >> /usr/share/nginx/html/env-config.js

