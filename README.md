# 2D_3D_AdLer

## Vorbedingungen

- Node Laufzeitumgebung
- `$ npm i` muss ausgeführt werden, um die benötigten Bibliotheken zu installieren
- Für debugging sind einige Umgebungsvraiablen verfügbar. dafür muss auf dem root level das `.env.development`-File existieren.
  - `REACT_APP_IS_DEBUG`=`true` oder `false` (Wenn false, werden alle DEBUG variablem ignoriert)
  - `REACT_APP_DEBUG_USERNAME`=`"Der Moodle Nutzername für einen Amtomatischen Login"`
  - `REACT_APP_DEBUG_PASSWORD`= `"Das Passwort für den Automatischen Login"`
  - `REACT_APP_LOGLEVEL`=`"log"|"warn"|"error"`
  - `REACT_APP_API_SERVER_URL`=`URL zum server` meinstens `https://api.cluuub.xyz/`

## Verfügbare Commands

- `$ npm start` startet den Dev-Server
- `$ npm run build` erstellt die HTML-Dateien
- `$ npm run test` startet die Tests

## Debugging
Wenn die variablen in env.development dementsprechend gesetzt sind, kann mit dem Shortcut "STRG + F1" der Debug Modus aktiviert und der Nutzer autmatisch in Moodle angemeldet werden
