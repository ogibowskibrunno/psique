#!/usr/bin/env bash
# Constrói www/ a partir da fonte única (../PSIQUE.html).
# O site e o app compartilham exatamente o mesmo HTML; a única
# diferença é a injeção do native.js (háptica/status bar) no app.
set -euo pipefail
cd "$(dirname "$0")/.."

rm -rf www
mkdir -p www/fonts

# fontes locais (as mesmas do site)
cp ../fonts/*.woff2 www/fonts/

# camada nativa
cp native/native.js www/native.js

# HTML: injeta o script nativo antes de </body>
sed 's|</body>|<script src="native.js"></script>\n</body>|' ../PSIQUE.html > www/index.html

echo "www/ pronto:"
ls www www/fonts
