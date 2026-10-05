# EUEI · CLGEU static prospectus

Replace the document root of https://euei.clgeu.africanstudies.eu with the files in this repository.

Upload the files themselves into the folder that currently holds `index.html` (SiteGround document root for that subdomain). Do not upload them inside an extra subfolder.

These addresses must open, and they share one layout. English and Bulgarian switch on the page and stay on the same address:

- `/` and `/index.html`
- `/bachelor.html` (also `/ba.html`)
- `/master.html` (also `/ma.html`)
- `/timetable.html`
- `/map.html`
- `/apply.html` (also `/official.html`)
- `/lecturers.html`

`/en/` and `/bg/` only set the language and return to those shared pages. Delete the old divergent HTML that used to live there.

The timetable is the winter semester 2026/2027 week grid (Tuesday–Friday). A brass edge means the room passport still marks the room as unconfirmed. The map is four sheets of the Rectorate first-floor plan in `maps/`. The “you are here” pin is a wayfinding mark on the drawing, not the programme office.

Plain HTML, CSS and JavaScript. No build step and no Node server.
