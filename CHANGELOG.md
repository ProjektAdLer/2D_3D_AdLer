# Changelog

This changelog follows the guidelines of [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) from version 1.1.0 onward.
The AdLer Engine uses [Semantic Versioning](http://semver.org/).

## Unreleased

<details>
<summary> Changes that are not yet included in a release are listed here. Click to expand! </summary>

### Added

-

### Changed

-

### Deprecated

-

### Removed

-

### Fixed

-

### Security

-

</details>

## Version 1.2.0 - 05.08.2023

### Added

- Vertical support for mobile
- Added new avatar animations

### Changed

- Door sound improved.
- Changed the mobile view of the score panel from next to, to on-top of each other
- Scorepanels are now displayed vertically (mobile)
- Font size adjustments in LearningSpaces (mobile)

### Removed

- Removed the modal which forces the user to turn their mnobile devices to landscape mode

### Fixed

- Space now opens when entering a completed space
- Fixed container overflow issues in LearningWorldMenu and LearningSpaceMenu

## Version 1.1.0 - 17.07.2023

### Added

- movement target indicator
- space completion sound feedback (with temporary effect)

### Changed

- H5P Modal Contents are displayed at full width and scrollable
- touch controls to be more usable

### Removed

- space completion modal to make room for better systems to indicate room completion

### Fixed

- unneccessary scrollbars in menus
- missing standin decorations
- broken avatar navigation due to improper scene loading

## Version 1.0.0 - 17.06.2023

- Überarbeitung der 3D Modelle und Texturen im Lernraum (incl. Avatar)
- Räume haben abhängig von Autorentool Informationen verschiedene Grundrisse (L_32X31_10L, R_20x20_6L, R20X30_8L)
- 3D Ansichten haben Umgebungen, Raum schwebt nicht mehr im Nichts
- Räume haben eine Ein- und Ausgangstüre
- Räume haben Fenster
- Navigation zwischen Räumen über die Tür-Modals möglich
- Avatar hat eine festgelegte Spawnposition
- Räume beinhalten Dekorations Objekte
- Verbesserung der Kamera Einstellungen
- Generelles Polishing + Bugfixing

## Version 0.3.0

- Hilfe Button für Anwender in Menü und 3D Ansicht
- Lernweltmenu zum navigieren verschiedener Lernwelten
- Lernraummenu mit Graph Ansicht erweitert
- Verbesserung der Navigation zwischen Menus
- Punkteanzeige in der 3D-Ansicht

## Version 0.2.0

- Avatar kann bewegt werden
- Lernraummenü stellt eine Lernwelt mit ihren Lernräumen dar
- Detailansicht im Lernraummenü stellt Eigenschaften eines spezifischen Lernraums dar
- Es kann via Menu von einem Lernraum zu einem anderen Lernraum der selben Lernwelt navigiert werden
- H5P Lernelemente geben je nach Bearbeitungsstatus volle oder keine Punktzahl
- Nutzer kann zwischen Titelbildschirm, Lernraummenü und Lernraum-Szene navigieren
- Überarbeitete Anordnung der UI in der 3D Ansicht
- Überarbeitung aller Icons

## Version 0.1.0

- Räume können erstellt und angezeigt werden
- Avatar wird in der Mitte des Raums gespawnt
- Lernelemente (Text, Video, Bild, H5P) können erstellt und angezeigt werden
- Es kann mit Lernelementen interagiert werden
- Interaktionen mit Lernelementen öffnen ein 2D Fenster mit dem jeweiligen Lernelement
- Schließen der Lernelement-Fenster schüttet Punkte aus
- Tür des Raums öffnet sich nach Erreichen eines Punkteschwellenwerts
