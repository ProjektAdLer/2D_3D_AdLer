# 2D_3D_AdLer

[![Coverage Status](https://coveralls.io/repos/github/ProjektAdLer/2D_3D_AdLer/badge.svg?branch=main)](https://coveralls.io/github/ProjektAdLer/2D_3D_AdLer?branch=main)

## Abhängigkeiten

| Engine Version | [Backend Version](https://github.com/projektadler/adlerbackend) |
| -------------- | --------------------------------------------------------------- |
| 2.7.0          | 2.4.2                                                           |
| 2.6.0          | 2.4.0                                                           |
| 2.4.0          | 2.1.0                                                           |
| 2.3.0          | 2.1.0                                                           |
| 2.2.1          | 2.1.0                                                           |
| 2.2.0          | 2.1.0                                                           |
| 2.1.0          | 2.0.0                                                           |

Diese Tabelle wird zu jedem neuen Release von oben aktualisiert.

## Vorbedingungen

- Node Laufzeitumgebung
- `$ npm i` muss ausgeführt werden, um die benötigten Bibliotheken zu installieren
- Für debugging sind einige Umgebungsvraiablen verfügbar. Diese sind in der `.env.development`-File auf dem root level konfiguriert.
  Eigene Einstellungen, wie die Zugangsdaten für den automatischen Login können in einer `.env.local`-File (bzw `.env.development.local`/`.env.production.local`) eingestellt werden.
  - `REACT_APP_IS_DEBUG`=`true` oder `false` (Wenn false, werden alle DEBUG variablem ignoriert)
  - `REACT_APP_DEBUG_USERNAME`=`"Der Moodle Nutzername für einen Amtomatischen Login"`
  - `REACT_APP_DEBUG_PASSWORD`= `"Das Passwort für den Automatischen Login"`
  - `REACT_APP_LOGLEVEL`=`"log"|"warn"|"error"`
  - `REACT_APP_API_SERVER_URL`=`URL zum server` meistens `https://api.cluuub.xyz/`
  - `REACT_APP_USE_AUTOLOGIN`=`true | false`
  - `REACT_APP_USE_FAKEBACKEND`=`true | false`
  - `REACT_APP_AUTO_LOGIN_WITHOUT_SHORTCUT=true`

## Verfügbare Commands

- `$ npm start` startet den Dev-Server
- `$ npm run build` erstellt die HTML-Dateien
- `$ npm run build-showcase` erstellt eine Demo-Version mit Mock-Daten
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

Einzeiler mit API_URL und Port: ` docker run -e API_URL=https://demo.api.projekt-adler.eu/api -p 8043:80 --rm $(docker build -q -f Dockerfile-twostage .)`

Unter Windows (und wsl) muss die Datei `Dockerfile-twostage` genutzt werden, da Windows falsche Lineendings setzt, wodurch der Container nicht startet. Die twostage variante enthält einen Fix hierfür.
