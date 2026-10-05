(function () {
  var D = window.EUEI;
  var dict = D.dict;
  var state = { menu: false, semester: 1, day: "all", sheet: 0 };
  var page = document.body.getAttribute("data-page") || "home";
  var routes = [
    ["home", "index.html", "navHome"],
    ["bachelor", "bachelor.html", "navBa"],
    ["master", "master.html", "navMa"],
    ["timetable", "timetable.html", "navTime"],
    ["map", "map.html", "navMap"],
    ["apply", "apply.html", "navApply"],
  ];
  var titleKey = {
    home: "titleHome",
    bachelor: "titleBa",
    master: "titleMa",
    timetable: "titleTime",
    map: "titleMap",
    apply: "titleApply",
  };

  function lang() {
    var saved = localStorage.getItem("euei-lang");
    if (saved === "bg" || saved === "fr" || saved === "tr") return saved;
    return "en";
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      if (c === "&") return "&" + "amp;";
      if (c === "<") return "&" + "lt;";
      if (c === ">") return "&" + "gt;";
      return "&" + "quot;";
    });
  }
  function other(course, l) {
    if (l === "bg") return course.en;
    if (l === "en") return course.bg;
    return course.en;
  }

  function shell(t, l, body) {
    var desk = routes
      .map(function (r) {
        var on = r[0] === page || (page === "lecturers" && r[0] === "home");
        return '<a href="' + r[1] + '"' + (on ? ' aria-current="page"' : "") + ">" + esc(t[r[2]]) + "</a>";
      })
      .join("");
    return (
      '<a class="skip" href="#content">' +
      esc(t.skip) +
      "</a>" +
      '<header class="mast"><div class="wrap">' +
      '<div class="bar"><a class="brand" href="index.html"><p class="kicker">' +
      esc(t.faculty) +
      '</p><p class="wordmark">' +
      esc(t.brand) +
      "</p></a>" +
      '<div class="tools"><div class="langs" role="group" aria-label="' +
      esc(t.langLabel) +
      '">' +
      ["en", "bg", "fr", "tr"]
        .map(function (code) {
          return (
            '<button type="button" data-act="lang" data-lang="' +
            code +
            '" aria-pressed="' +
            (l === code) +
            '">' +
            code.toUpperCase() +
            "</button>"
          );
        })
        .join("") +
      "</div>" +
      '<button type="button" class="menu-btn" data-act="menu" aria-expanded="' +
      state.menu +
      '" aria-label="' +
      esc(state.menu ? t.close : t.menu) +
      '">' +
      (state.menu ? "×" : "☰") +
      "</button></div></div>" +
      '<p class="uni-line">' +
      esc(t.uni) +
      '</p><nav class="nav-desk" aria-label="' +
      esc(t.navHome) +
      '">' +
      desk +
      '</nav><nav class="nav-mob' +
      (state.menu ? " open" : "") +
      '" aria-label="' +
      esc(t.navHome) +
      '">' +
      desk +
      "</nav></div></header>" +
      '<main id="content"><div class="wrap">' +
      body +
      "</div></main>" +
      '<footer><div class="wrap foot"><div><p class="wordmark">' +
      esc(t.brand) +
      "</p><p>" +
      esc(t.uni) +
      "</p><p>" +
      esc(t.faculty) +
      "</p><p>" +
      esc(t.adminLine) +
      '</p></div><p class="muted">' +
      esc(t.footer) +
      '</p><div><p><a href="' +
      esc(D.hrefs.su) +
      '" target="_blank" rel="noreferrer">' +
      esc(t.universityLink) +
      '</a></p><p><a href="' +
      esc(D.hrefs.faculty) +
      '" target="_blank" rel="noreferrer">' +
      esc(t.facultyLink) +
      '</a></p><p><a href="apply.html">' +
      esc(t.navApply) +
      "</a></p></div></div></footer>"
    );
  }

  function facts(items) {
    return (
      '<div class="facts">' +
      items
        .map(function (it) {
          return '<div><p class="label">' + esc(it[0]) + "</p><p>" + esc(it[1]) + "</p></div>";
        })
        .join("") +
      "</div>"
    );
  }

  function headerBlock(kicker, title, lede) {
    return '<p class="kicker">' + esc(kicker) + "</p><h1>" + esc(title) + '</h1><p class="lede">' + esc(lede) + "</p>";
  }

  function ext(href, label) {
    return '<a class="textlink" href="' + esc(href) + '" target="_blank" rel="noreferrer">' + esc(label) + "</a>";
  }

  function councilList(t, l) {
    var rows =
      '<li class="who"><span class="label">' +
      esc(t.administrator) +
      '</span><span class="wordmark" style="font-size:1.6rem">' +
      esc(t.adminName) +
      "</span></li>";
    rows += D.council
      .map(function (p) {
        return (
          '<li class="who"><span style="font-family:var(--serif);font-size:1.25rem">' +
          esc(p.name[l]) +
          '</span><span class="muted">' +
          esc(p.faculty[l]) +
          (p.note ? '<span class="fine" style="display:block;margin-top:0.25rem">' + esc(p.note[l]) + "</span>" : "") +
          "</span></li>"
        );
      })
      .join("");
    return '<ul class="list">' + rows + "</ul>";
  }

  function home(t, l) {
    var notes = [
      [t.note1Title, t.note1],
      [t.note2Title, t.note2],
      [t.note3Title, t.note3],
    ];
    function card(index, degree, name, fact, blurb, href, note) {
      return (
        '<article class="card"><p class="idx">' +
        esc(index) +
        " · " +
        esc(degree) +
        "</p><h2>" +
        esc(name) +
        '</h2><dl class="facts-mini">' +
        fact
          .map(function (f) {
            return "<div><dt>" + esc(f[0]) + "</dt><dd>" + esc(f[1]) + "</dd></div>";
          })
          .join("") +
        '</dl><p class="muted">' +
        esc(blurb) +
        "</p>" +
        (note ? "<p>" + esc(note) + "</p>" : "") +
        '<p><a class="solid" href="' +
        href +
        '">' +
        esc(t.read) +
        "</a></p></article>"
      );
    }
    var glance = [
      [t.degree, t.bachelor],
      [t.length, t.sem8],
      [t.language, t.english],
      [t.city, t.sofia],
    ];
    var glanceM = [
      [t.degree, t.master],
      [t.length, t.sem2],
      [t.language, t.english],
      [t.city, t.sofia],
    ];
    return (
      headerBlock(t.homeKicker, t.homeTitle, t.homeLede) +
      '<div class="cards" style="margin-top:2rem">' +
      card(t.indexBa, t.bachelor, t.baName, glance, t.baBlurb, "bachelor.html") +
      card(t.indexMa, t.master, t.maName, glanceM, t.maBlurb, "master.html", t.maStar) +
      "</div>" +
      '<section class="section"><p class="kicker">' +
      esc(t.notesKicker) +
      "</p><h2>" +
      esc(t.notesTitle) +
      '</h2><div class="thirds" style="margin-top:1.2rem">' +
      notes
        .map(function (n, i) {
          return (
            '<article class="card"><p class="idx">0' +
            (i + 1) +
            "</p><h3>" +
            esc(n[0]) +
            '</h3><p class="muted">' +
            esc(n[1]) +
            "</p></article>"
          );
        })
        .join("") +
      "</div></section>" +
      '<section class="section" id="council"><p class="kicker">' +
      esc(t.councilKicker) +
      "</p><h2>" +
      esc(t.councilTitle) +
      '</h2><p class="lede">' +
      esc(t.councilLede) +
      "</p>" +
      councilList(t, l) +
      "</section>"
    );
  }

  function bachelor(t, l) {
    var current = D.semesters.filter(function (s) {
      return s.n === state.semester;
    })[0];
    var buttons = D.semesters
      .map(function (s) {
        var on = s.n === state.semester;
        return (
          '<button type="button" class="chip sq" role="radio" data-act="sem" data-n="' +
          s.n +
          '" aria-checked="' +
          on +
          '">' +
          s.n +
          "</button>"
        );
      })
      .join("");
    var courses = current.courses
      .map(function (c) {
        return '<li class="course"><span>' + esc(c[l]) + '</span><span class="muted">' + esc(other(c, l)) + "</span></li>";
      })
      .join("");
    return (
      headerBlock(t.bachelor, t.baName, t.baLede) +
      facts([
        [t.degree, t.bachelor],
        [t.length, t.sem8],
        [t.language, t.english],
        [t.city, t.sofia],
      ]) +
      '<section class="section"><h2>' +
      esc(t.forYou) +
      "</h2><p>" +
      esc(t.baFor) +
      '</p><p class="note">' +
      esc(t.baEnglish) +
      "</p></section>" +
      '<section class="section"><h2>' +
      esc(t.study) +
      '</h2><div class="pair" style="margin-top:1rem"><div class="card"><p class="label">' +
      esc(t.field) +
      '</p><p class="wordmark" style="font-size:1.4rem">' +
      esc(t.fieldValue) +
      '</p></div><div class="card"><p class="label">' +
      esc(t.qualification) +
      '</p><p class="wordmark" style="font-size:1.4rem">' +
      esc(t.qualValue) +
      "</p></div></div><h3>" +
      esc(t.specTitle) +
      "</h3><ol><li>" +
      esc(t.spec1) +
      "</li><li>" +
      esc(t.spec2) +
      '</li></ol><p class="note">' +
      esc(t.specOld) +
      "</p></section>" +
      '<section class="section"><h2>' +
      esc(t.languages) +
      "</h2><p>" +
      esc(t.langBody) +
      "</p></section>" +
      '<section class="section"><h2>' +
      esc(t.graduation) +
      "</h2><p>" +
      esc(t.gradBody) +
      "</p></section>" +
      '<section class="section"><h2>' +
      esc(t.careers) +
      "</h2><p>" +
      esc(t.careerBody) +
      "</p></section>" +
      '<section class="section" id="curriculum"><h2>' +
      esc(t.curriculum) +
      '</h2><p class="muted">' +
      esc(t.courseNote) +
      '</p><div class="chips" role="radiogroup" aria-label="' +
      esc(t.semester) +
      '" style="margin-top:1rem">' +
      buttons +
      '</div><p class="wordmark" style="font-size:1.6rem">' +
      esc(t.semester) +
      " " +
      current.n +
      ' <span class="muted" style="font-family:var(--sans);font-size:1rem">' +
      current.courses.length +
      " " +
      esc(t.coursesWord) +
      "</span></p><ol class=\"list\">" +
      courses +
      "</ol></section>" +
      '<section class="section"><h2>' +
      esc(t.still) +
      "</h2><p>" +
      esc(t.oldBody) +
      "</p></section>" +
      '<section class="section"><h2>' +
      esc(t.sources) +
      "</h2><ul class=\"list\"><li>" +
      ext(D.hrefs.baEn, t.sourceBa1) +
      "</li><li>" +
      ext(D.hrefs.baBg, t.sourceBa2) +
      "</li><li>" +
      esc(t.sourceBa3) +
      "</li></ul></section>"
    );
  }

  function master(t, l) {
    return (
      headerBlock(t.master, t.maName, t.maLede) +
      facts([
        [t.degree, t.master],
        [t.length, t.sem2],
        [t.language, t.english],
        [t.city, t.sofia],
      ]) +
      '<p class="note">' +
      esc(t.maLength) +
      '</p><div class="pair" style="margin-top:1rem"><div class="card"><p class="label">' +
      esc(t.form) +
      '</p><p class="wordmark" style="font-size:1.4rem">' +
      esc(t.bothForms) +
      '</p></div><div class="card"><p class="label">' +
      esc(t.studyFee) +
      '</p><p class="wordmark" style="font-size:1.4rem">' +
      esc(t.paid) +
      "</p></div></div>" +
      '<section class="section"><h2>' +
      esc(t.forYou) +
      "</h2><p>" +
      esc(t.maFor) +
      '</p><p class="note">' +
      esc(t.maForm) +
      "</p></section>" +
      '<section class="section"><h2>' +
      esc(t.strandTitle) +
      '</h2><div class="pair" style="margin-top:1rem"><article class="card"><h3>' +
      esc(t.strand1) +
      '</h3><p class="muted">' +
      esc(t.strand1b) +
      '</p></article><article class="card"><h3>' +
      esc(t.strand2) +
      '</h3><p class="muted">' +
      esc(t.strand2b) +
      "</p></article></div></section>" +
      '<section class="section"><h2>' +
      esc(t.unpublished) +
      "</h2><p>" +
      esc(t.unpublishedBody) +
      "</p></section>" +
      '<section class="section"><h2>' +
      esc(t.sources) +
      "</h2><ul class=\"list\"><li>" +
      ext(D.hrefs.maEn, t.sourceMa1) +
      "</li><li>" +
      ext(D.hrefs.maBg, t.sourceMa2) +
      "</li><li>" +
      esc(t.sourceMa3) +
      "</li></ul></section>"
    );
  }

  function place(time) {
    var parts = time.split("–");
    function mins(v) {
      var b = v.split(":");
      return Number(b[0]) * 60 + Number(b[1]);
    }
    var from = mins(parts[0]);
    var to = mins(parts[1]);
    return { row: 2 + (from - 9 * 60) / 30, span: (to - from) / 30 };
  }
  function labelHour(index) {
    var total = 9 * 60 + index * 30;
    var h = Math.floor(total / 60);
    var m = total % 60;
    return (h < 10 ? "0" : "") + h + ":" + (m === 0 ? "00" : "30");
  }

  function timetable(t, l) {
    var labels = { all: t.allDays, tue: t.tue, wed: t.wed, thu: t.thu, fri: t.fri };
    var days = ["tue", "wed", "thu", "fri"];
    var col = { tue: 2, wed: 3, thu: 4, fri: 5 };
    var placeName = D.dayPlace;
    var heads =
      '<div style="border-bottom:1px solid var(--line)"></div>' +
      days
        .map(function (id) {
          return (
            '<div class="dayhead"><p class="label" style="color:var(--ink)">' +
            esc(labels[id]) +
            '</p><p class="fine">' +
            esc(placeName[id][l]) +
            "</p></div>"
          );
        })
        .join("");
    var hours = "";
    var cells = "";
    for (var i = 0; i < 18; i++) {
      hours +=
        '<div class="hour" style="grid-column:1;grid-row:' +
        (i + 2) +
        '">' +
        (i % 2 === 0 ? labelHour(i) : "") +
        "</div>";
      days.forEach(function (id) {
        cells += '<div class="cell" style="grid-column:' + col[id] + ";grid-row:" + (i + 2) + '"></div>';
      });
    }
    var blocks = D.slots
      .map(function (slot) {
        var at = place(slot.time);
        return (
          '<div class="slot ' +
          (slot.pending ? "wait" : "ok") +
          '" style="grid-column:' +
          col[slot.day] +
          ";grid-row:" +
          at.row +
          " / span " +
          at.span +
          '"><p>' +
          esc(slot.time) +
          "</p><p>" +
          esc(slot.course[l]) +
          "</p><p>" +
          esc(slot.teacher[l]) +
          "</p><p>" +
          esc(slot.room[l]) +
          "</p></div>"
        );
      })
      .join("");
    var filters = ["all"].concat(days)
      .map(function (id) {
        return (
          '<button type="button" class="chip" role="radio" data-act="day" data-day="' +
          id +
          '" aria-checked="' +
          (state.day === id) +
          '">' +
          esc(labels[id]) +
          "</button>"
        );
      })
      .join("");
    var shown = D.slots.filter(function (s) {
      return state.day === "all" || s.day === state.day;
    });
    var list = shown
      .map(function (slot) {
        return (
          '<li class="who"><div><p class="label">' +
          esc(labels[slot.day]) +
          '</p><p class="wordmark" style="font-size:1.6rem">' +
          esc(slot.time) +
          "</p></div><div><p>" +
          esc(slot.course[l]) +
          '</p><p class="muted">' +
          esc(t.teacher) +
          ": " +
          esc(slot.teacher[l]) +
          '</p><p class="muted">' +
          esc(t.place) +
          ": " +
          esc(slot.room[l]) +
          "</p>" +
          (slot.pending ? '<p class="label">' + esc(t.pending) + "</p>" : "") +
          "</div></li>"
        );
      })
      .join("");
    var rooms = D.rooms
      .map(function (r) {
        return '<li class="card" style="font-family:var(--serif);font-size:1.15rem">' + esc(r[l]) + "</li>";
      })
      .join("");
    return (
      headerBlock(t.timeKicker, t.timeTitle, t.timeLede) +
      '<div class="row-tools"><p class="muted">' +
      esc(t.noMonday) +
      '</p><p><a class="textlink" href="map.html">' +
      esc(t.seeMap) +
      '</a> · <a class="textlink" href="timetable-passport.pdf">' +
      esc(t.passportPdf) +
      "</a></p></div>" +
      '<div class="week" style="grid-template-columns:4.75rem repeat(4,minmax(0,1fr));grid-template-rows:auto repeat(18,1.7rem)">' +
      heads +
      hours +
      cells +
      blocks +
      "</div>" +
      '<div class="chips only-narrow" role="radiogroup" aria-label="' +
      esc(t.allDays) +
      '" style="margin-top:1.2rem">' +
      filters +
      "</div>" +
      "<h2>" +
      esc(t.timeKicker) +
      '</h2><ol class="list">' +
      (list || '<li class="muted">' + esc(t.emptyDay) + "</li>") +
      "</ol>" +
      (function () {
        function block(term, title) {
          return (
            '<div class="section"><h3>' +
            esc(title) +
            '</h3><ul class="list">' +
            D.closedDays
              .filter(function (day) {
                return day.term === term;
              })
              .map(function (day) {
                return (
                  '<li class="who"><span style="font-family:var(--serif);font-size:1.25rem">' +
                  esc(day.when[l]) +
                  '</span><span class="muted">' +
                  esc(day.body[l]) +
                  "</span></li>"
                );
              })
              .join("") +
            "</ul></div>"
          );
        }
        return (
          '<section class="section"><p class="kicker">' +
          esc(t.closedKicker) +
          "</p><h2>" +
          esc(t.closedTitle) +
          '</h2><p class="lede">' +
          esc(t.closedLede) +
          "</p>" +
          block("winter", t.winterTerm) +
          block("summer", t.summerTerm) +
          "</section>"
        );
      })() +
      '<section class="section"><h2>' +
      esc(t.roomIndex) +
      '</h2><ul class="rooms" style="list-style:none;padding:0;margin-top:1rem;display:grid">' +
      rooms +
      '</ul><p class="note">' +
      esc(t.roomNote) +
      "</p></section>" +
      '<section class="section card"><h2>' +
      esc(t.moodleTitle) +
      '</h2><p class="muted">' +
      esc(t.moodleBody) +
      "</p><p>" +
      ext(D.hrefs.moodle, t.moodleLink) +
      "</p></section>"
    );
  }

  function mapPage(t, l) {
    var current = D.floorPlan;
    return (
      headerBlock(t.mapKicker, t.mapTitle, t.mapLede) +
      '<div class="row-tools"><a class="textlink" href="timetable.html">' +
      esc(t.navTime) +
      '</a><a class="textlink" href="maps/rectorate-first-floor.pdf">' +
      esc(t.downloadPlan) +
      '</a></div><figure><img src="' +
      esc(current.src) +
      '" alt="' +
      esc(current.title[l]) +
      '"><figcaption><h2>' +
      esc(current.title[l]) +
      '</h2><p class="muted">' +
      esc(current.body[l]) +
      '</p></figcaption></figure><p class="note">' +
      esc(t.mapNote) +
      "</p>"
    );
  }

  function apply(t, l) {
    var steps = [
      ["01", t.step1, t.step1b],
      ["02", t.step2, t.step2b],
      ["03", t.step3, t.step3b],
      ["04", t.step4, t.step4b],
    ];
    var titles = { programmes: t.groupProgrammes, english: t.groupEnglish, bulgarian: t.groupBulgarian };
    var groups = D.linkGroups
      .map(function (g) {
        return (
          '<section class="section"><h2>' +
          esc(titles[g.id]) +
          '</h2><ul class="list">' +
          g.links
            .map(function (link) {
              return (
                '<li><p class="label">' +
                esc(link.tag) +
                "</p><p>" +
                ext(link.href, link.tag === "BG" ? link.bg : link.en) +
                '</p><p class="fine">' +
                esc(t.opens) +
                "</p></li>"
              );
            })
            .join("") +
          "</ul></section>"
        );
      })
      .join("");
    return (
      headerBlock(t.applyKicker, t.applyTitle, t.applyLede) +
      '<ol class="steps" style="list-style:none;padding:0;margin-top:1.5rem">' +
      steps
        .map(function (s) {
          return (
            '<li class="card"><p class="idx">' +
            s[0] +
            "</p><h2>" +
            esc(s[1]) +
            '</h2><p class="muted">' +
            esc(s[2]) +
            "</p></li>"
          );
        })
        .join("") +
      "</ol>" +
      groups
    );
  }

  function lecturers(t, l) {
    return (
      headerBlock(t.councilKicker, t.councilTitle, t.councilLede) + councilList(t, l)
    );
  }

  var views = {
    home: home,
    bachelor: bachelor,
    master: master,
    timetable: timetable,
    map: mapPage,
    apply: apply,
    lecturers: lecturers,
  };

  function render() {
    var l = lang();
    var t = dict[l];
    document.documentElement.lang = l;
    document.title = titleKey[page] ? t[titleKey[page]] : t.councilTitle;
    document.getElementById("app").innerHTML = shell(t, l, (views[page] || home)(t, l));
  }

  document.getElementById("app").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-act]");
    if (!btn) return;
    var act = btn.getAttribute("data-act");
    if (act === "lang") {
      localStorage.setItem("euei-lang", btn.getAttribute("data-lang"));
      state.menu = false;
      render();
    } else if (act === "menu") {
      state.menu = !state.menu;
      render();
    } else if (act === "sem") {
      state.semester = Number(btn.getAttribute("data-n"));
      render();
    } else if (act === "day") {
      state.day = btn.getAttribute("data-day");
      render();
    } else if (act === "sheet") {
      state.sheet = Number(btn.getAttribute("data-n"));
      render();
    }
  });

  render();
})();
