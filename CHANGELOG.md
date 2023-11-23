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

## Version 2.0.1

### Fixed

- bug that prevents h5p element sometimes from scoring in 3d environment

### Changed

- improved styling of close-button of modal
- improved styling of breaktime notification

## Version 2.0.0

### Added

- overview of licenses used

### Fixed

- questions after selecting a hint will be displayed correctly
- fixed styling issues for adaptivity on mobile
- improved 2D display of NPC on mobile

### Changed

- position of back button in adaptivity element now on left side

## Version 2.0.0-rc.3

### Added

- dynamic NPC image matching the 3D model in the space to Adaptivity Element.
- bulletpoint list for learning outcomes in LearningSpaceMenu and LearningSpace.
- Support for Display of Learningelements which are not in the displayed room has been added.
- Learning Goals can now be displayed by clicking the spacescore panel.

### Fixed

- Break Notifications should behave correctly now.
- Fontsizes in Adaptivity elements should be displayed correctly now.

## Version 2.0.0-rc.1

### Added

- Adaptivity Element:

  - specific icon for adaptivity element.
  - 3D representation of NPC.
  - 2D representation of NPC.
  - dialog line.
  - progressmeter.
  - task selection with icons for question status.
  - question selection with adaptive hints.
  - three different diffculties for questions.
  - question answer mask for single and multiple choice.
  - responsive UI.

- Time Spent Element:
  - break notification every 30 minutes.
  - 3 types of break advices for short, medium and long breaks.
  - 13 different break advices.
  - randomized selection of break advice.
  - up to four slides per break notification.
  - responsive UI.

### Fixed

- bug that prevented update of score panel when scoring h5p elements.

## Version 1.3.0 - 08.09.2023

### Added

- There is a new Helpdesk Panel with partially new functionalities (LogExport) and partially new icons.
- A first version of the upcoming Adaptivity Element is now integrated.
- Users are now redirected to Welcome (and login) Page when trying to open a menu or space while not logged in.
- Avatar spawns in front of the entry door.
- support for more Learning Space themes
- trophy models

### Changed

- Improved portrait display of LearningSpace on mobile.
- Changed the direction of menus in portrait mode from side-by-side horizontal view to vertical view.
- Help button displaced to better position.
- Learning Elements and Doors can now be opened via click instead of doubleclick.
- Improved learning element modals to prevent useless scroll bars.

### Removed

- FullscreenButton in SideBar (mobile only).
- Dotted borders in both LearningSpace and LearningWorld menus.
- Default button 'Adler flieg' of selection menus.

### Fixed

- Overlapping AdLerEngine icon on WelcomeScreen.
- ScorePanels are now responsive.

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
