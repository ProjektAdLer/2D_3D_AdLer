# Changelog

This changelog follows the guidelines of [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) from version 1.1.0 onward.
The AdLer Engine uses [Semantic Versioning](http://semver.org/).

<!-- DO NOT FORGET TO UPDATE VERSION NUMBER IN CONFIG.TS!!!!!! ~FK-->

## Unreleased

<details>
<summary> Changes that are not yet included in a release are listed here. Click to expand! </summary>

### Added

- custom icons for save button in avatar editor and avatar preview controls
- xp bar
- icon for xp
- added randomize avatar feature
- new npc glbs
- new npc emotion renderings
- Version number added to sidebar
- level-up window

### Changed

### Removed

- wrongly displayed second "front-camera" in SideBar smartphone view on mobile-landscape

### Fixed

- SideBar smartphone view on mobile-landscape
- sketchy NarrativeFramework styling
- WelcomeScreen responsive styling
- WorldCompletionModal responsiv styling
- logout not deleting player progress data
- first items of face category not shown in 3D avatar preview
- inconsistent naming of npc files
- cut header bar texts in menus

### Deprecated

### Security

</details>

## Version 2.7.0 - 05.02.25

### Added

- added avatar editor to customize player character
- new icons for avatar creator categories
- added completion button in modal for h5p elements
- added translated tooltips on avatarEditor thumbnails
- added button to remove selection in avatarEditor
- added accordion menu to avatar editor

### Changed

- SideBarMenu is now a smartphone for better, more immersive implementation of future game-based learning concepts

### Removed

### Fixed

- fixed only showing short break time content
- fixed mobile portrait view in avatar editor

## Version 2.6.0 - 17.12.24

### Added

- new icons for door icons in 2d
- new 3d icons for doors
- new 2d & 3d icon for previously known h5p element
- more robust error messaging
- additional buttons for changing break notification slides
- adaptivity element legend is minimized after closing the dialog window
- title tooltips to buttons in space selection

### Changed

- streamlined various different close buttons across the program with a new icon
- new header in WelcomePage - now in nice 3D type

### Fixed

- fixed incorrect display of story element text on space transition
- incorrect locations on 3d icons
- issue where a single reload of the browser page set the application to an invalid state

## Version 2.5.1 - 20.09.24

### Fixed

- adaptivity element characters should not be running infinitely on their spot anymore

## Version 2.5.0 - 19.09.24

### Added

- controls explanation to learning space display are now shown in the loading screen
- new character models have been added
- welcome screen now has a new button to directly open the associated moodle

### Changed

- break time notification now closes instead of minimizing from big modal
- hover color for buttons to meet accesibility expectations
- rearranged SideBarMenu into a more logical order
- background color in learningElementsGoalPanel
- refactored ui icons
- BottomTooltip now behaves like a button when hovered with mouse, to be clear that it can be clicked

### Removed

- deprecated and unused icons have been deleted

### Fixed

- wrong space icon in SideBar now depicts correct spaceMenuIcon
- avatar spawn rotation is now being applied
- intro story NPC now spawn during cutscene after entering a new learning space
- fixed several button placement inconsistencies

## Version 2.4.0 - 02.09.24

### Added

- Updated adaptivity element functionality to now display already given correct answers for completed tasks.
- Made Avatar Camera rotatable

### Changed

- Learning Element icon rotation for better readability
- Decreased closest walkable distance to obstacles in the learning space

### Fixed

- vanishing Story-NPC, when they start in random movement mode after loading a learning space
- fixed crash in learning space in production-environment
- appearance of intro and outro selection button in Story-NPC when story has only intro or outro

## Version 2.3.0 - 26.08.24

### Added

- close-icon-nobg.svg
- added informing modal if user is not registered in any courses
- "submit" button to storyelement

### Changed

- new icon to Modal Close Buttons
- move trigger of potential outro cutscene of story and learning element to closing respective modal
- size of Break Time Notofication close button
- increased pointer movement threshold of avatar
- updated H5P standalone library

### Removed

- Typo "x" in Modal Close Buttons
- removed displaying space goal panel from space score panel

### Fixed

- fixed unlocking of outro cutscene text in story element dialog menu
- fixed crash if story element accesses non-existing text-element
- fixed layout issues on mobile with goal panel and points
- fixed some jittery avatar animation transitions
- fixed story npc not stopping movement in dialog menu
- fixed memory leak in spacedisplay
- fixed 3d placements of walls on non 90° angles on rooms.

## Version 2.2.1 - 14.06.24

### Fixed

- fixed multiple outro story triggers when answering adaptivity element questions
- fixed incorrectly displayed adaptivity hint

## Version 2.2.0 - 06.03.2024

### Added

- added story element
- added learning space decoration according to theme
- added T-shaped layout as learning space
- added D-shaped layout as learning space
- added campus theme variants for Aschaffenburg and Kempten campi
- added button for learning outcomes (goals) next to space and world progress
- added new robot NPC as default model for adaptivity element

### Changed

- changed hint of adaptivity element to open learning element if learning element and player are in same learning space
- improved adaptivity element icon key
- improved presentation of learning goal in learning space view
- improved navigation of avatar and NPCs in learning space

### Removed

- removed highlighting of learning element if hint of adaptivity element was referencing learning element in same learning space

### Fixed

- fixed order of question in adaptivity element by difficulty
- fixed display of incorrect hint in adaptivity element
- fixed avatar getting stuck in animations
- fixed break time notification timings
- fixed inconsistent navigation options within adaptivity elements
- fixed answering a harder question than required within adaptivity elements not counting towards progression of said element

## Version 2.1.1

### Fixed

- Joined meshes of TH Aschaffenburg 3D environment to optimize performance

## Version 2.1.0

### Added

- background-color to SideBar.
- Logout from Moodle.
- loading screen to learningworld menu to load data and preventing UI pop-in.
- error message and advice if server timeout in login context is reached.
- Campus TH Aschaffenburg as 3D environment

### Changed

- responsive styling of LoadingScreen.
- BreakNotification message is now not a complete button. This gives better read- and usability.
- refactored styling of WelcomePage and added new button for future functionality.
- displaying moodle symbol on welcome screen only after successful login.

### Deprecated

-

### Removed

- fullscreen functionality in UI of h5p element to prevent bug that breaks h5p display.

### Fixed

- Learningworld completed - Modal now only shows once per session.
- Loading Screen readies before space is ready.
- Bottom Tooltip does not show over elements anymore.

## Version 2.0.1

### Fixed

- bug that prevents h5p element sometimes from scoring in 3d environment.

### Changed

- improved styling of close-button of modal.
- improved styling of breaktime notification.

## Version 2.0.0

### Added

- overview of licenses used.

### Fixed

- questions after selecting a hint will be displayed correctly.
- fixed styling issues for adaptivity on mobile.
- improved 2D display of NPC on mobile.

### Changed

- position of back button in adaptivity element now on left side.

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
