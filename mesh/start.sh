#!/bin/bash

cd "$(dirname "$0")"

echo "🚀 Avvio Z-GENESIS-OS Mesh..."

nats-server -c ./nats/nats.conf > ./logs/nats.log 2>&1 &

echo "🧠 Avvio Kernel..."
node ./kernel/orchestrator.js > ./logs/kernel.log 2>&1 &

echo "✅ Mesh Viva attivata."
