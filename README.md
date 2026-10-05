# EUEI · CLGEU static prospectus

Replace the document root of https://euei.clgeu.africanstudies.eu with the files in this repository.

Upload the files themselves into the folder that currently holds `index.html` (SiteGround document root for that subdomain). Do not upload them inside an extra subfolder.

These addresses must open, and they share one layout. English, Bulgarian, French and Turkish share the same pages. The language switch stays on the address.

The timetable is the winter semester 2026/2027 for the 3rd year only (Tuesday–Friday). The 1st year and the master’s timetable are not in this copy yet. A brass edge means the room passport still marks the room as unconfirmed.

The map is one drawing of the Rectorate first floor, in `maps/floor.jpg`. The “you are here” pin is a wayfinding mark on the drawing, not the programme office.

- `/` and `/index.html`
- `/bachelor.html` (also `/ba.html`)
- `/master.html` (also `/ma.html`)
- `/timetable.html`
- `/map.html`
- `/apply.html` (also `/official.html`)
- `/lecturers.html`

`/en/`, `/bg/`, `/fr/` and `/tr/` only set the language and return to those shared pages. Delete the old divergent HTML that used to live under `en/` and `bg/`.

Plain HTML, CSS and JavaScript. No build step and no Node server.
