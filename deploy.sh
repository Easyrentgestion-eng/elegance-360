#!/bin/bash
# Elegance 360 — Déploiement rapide
# Usage : ./deploy.sh "description des modifications"

MSG="${1:-Mise à jour Elegance 360}"

cd "$(dirname "$0")"
git add index.html
git commit -m "$MSG"
git push

echo "✅ Déployé sur https://easyrentgestion-eng.github.io/elegance-360/"
