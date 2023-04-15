# 2D_3D_AdLer

[![Coverage Status](https://coveralls.io/repos/github/ProjektAdLer/2D_3D_AdLer/badge.svg?branch=main)](https://coveralls.io/github/ProjektAdLer/2D_3D_AdLer?branch=main)

## Vorbedingungen

- Node Laufzeitumgebung
- `$ npm i` muss ausgeführt werden, um die benötigten Bibliotheken zu installieren
- Für debugging sind einige Umgebungsvraiablen verfügbar. Diese sind in der `.env.development`-File auf dem root level konfiguriert.
  Eigene Einstellungen, wie die Zugangsdaten für den automatischen Login können in einer `.env.local`-File (bzw `.env.development.local`/`.env.production.local`) eingestellt werden.
  - `VITE_IS_DEBUG`=`true` oder `false` (Wenn false, werden alle DEBUG variablem ignoriert)
  - `VITE_DEBUG_USERNAME`=`"Der Moodle Nutzername für einen Amtomatischen Login"`
  - `VITE_DEBUG_PASSWORD`= `"Das Passwort für den Automatischen Login"`
  - `VITE_LOGLEVEL`=`"log"|"warn"|"error"`
  - `VITE_API_SERVER_URL`=`URL zum server` meistens `https://api.cluuub.xyz/`
  - `VITE_USE_AUTOLOGIN`=`true | false`
  - `VITE_USE_FAKEBACKEND`=`true | false`
  - `VITE_AUTO_LOGIN_WITHOUT_SHORTCUT=true`

## Verfügbare Commands

- `$ npm start` startet den Dev-Server
- `$ npm run build` erstellt die HTML-Dateien
- `$ npm run test` startet die Tests

## Debugging

Wenn die variablen in env.development dementsprechend gesetzt sind, kann mit dem Shortcut "STRG + F1" der Debug Modus aktiviert und der Nutzer autmatisch in Moodle angemeldet werden

## Docker

`Dockerfile` wird für die Pipeline genutzt, `Dockerfile-twostage` ermöglicht einfaches lokales bauen eines Docker containers.
Die folgenden Befehle bauen und starten einen Container:

```
docker build -f Dockerfile-twostage -t 2d3d .
docker run 2d3d
```
