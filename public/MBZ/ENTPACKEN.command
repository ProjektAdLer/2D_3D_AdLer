#!/bin/bash

# Wechsel ins Projekt-Root (2 Ebenen höher)
cd "$(dirname "$0")/../.."

clear
echo ""
echo "============================================================"
echo "  AdLer MBZ Extraction Tool"
echo "============================================================"
echo ""
echo "Suche nach MBZ-Dateien..."
echo ""

node scripts/extractLearningWorlds.js

echo ""
echo "============================================================"
echo "  Vorgang abgeschlossen!"
echo "============================================================"
echo ""
echo "Die entpackten Welten befinden sich in:"
echo "  public/LearningWorlds/"
echo ""
read -p "Drücken Sie Enter zum Schließen..."
