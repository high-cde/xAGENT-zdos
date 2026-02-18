#!/bin/bash

echo "=== Z-GENESIS-OS — SIGILLO DI GENESI ==="

# 1. Creazione struttura
mkdir -p backend worker agents frontend pages

echo ">> Generazione backend..."
cat > backend/server.js << 'EOF'
[BACKEND COMPLETO QUI]
EOF

echo ">> Generazione worker..."
cat > worker/worker.js << 'EOF'
[WORKER COMPLETO QUI]
EOF

echo ">> Configurazione..."
cat > config.json << 'EOF'
{
  "dsn_contract_address": "0xfc90516a1f736FaC557e09D8853dB80dA192c296",
  "world_treasury_address": "0xWORLD_TREASURY_ADDRESS",
  "zsc_per_dsn": 100,
  "min_withdraw_dsn": 1.0
}
EOF

echo ">> Schema DB..."
cat > schema.sql << 'EOF'
[SCHEMA SQL COMPLETO QUI]
EOF

echo ">> Generazione agenti..."
cat > agents/agents.json << 'EOF'
[LISTA COMPLETA DEI 30 AGENTI QUI]
EOF

echo ">> Sala delle Intersezioni..."
cat > pages/index.html << 'EOF'
[FRONTEND COMPLETO QUI]
EOF

echo ">> Installazione dipendenze..."
npm init -y
npm install express pg ethers body-parser cors

echo "=== ATTIVAZIONE COMPLETATA ==="
echo "Avvia backend: node backend/server.js"
echo "Avvia worker: node worker/worker.js"
