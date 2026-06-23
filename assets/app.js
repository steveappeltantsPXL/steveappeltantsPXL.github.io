/* Steve Appeltants — Portfolio interactions */
(function () {
  "use strict";

  /* ---- theme --------------------------------------------------- */
  var root = document.documentElement;
  var KEY = "sa-theme";
  function apply(t) {
    root.setAttribute("data-theme", t);
    var lbl = document.querySelector("#theme-label");
    if (lbl) lbl.textContent = t === "dark" ? "Light" : "Dark";
  }
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (!saved) {
    saved = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  apply(saved);
  document.addEventListener("click", function (e) {
    var t = e.target.closest("#theme-toggle");
    if (!t) return;
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    apply(next);
    try { localStorage.setItem(KEY, next); } catch (e2) {}
  });

  /* ---- scroll progress ---------------------------------------- */
  var bar = document.getElementById("progress");
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var p = max > 0 ? (h.scrollTop / max) * 100 : 0;
    if (bar) bar.style.width = p.toFixed(2) + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- reveal on scroll --------------------------------------- */
  var revs = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); ro.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revs.forEach(function (r) { ro.observe(r); });
  } else {
    revs.forEach(function (r) { r.classList.add("in"); });
  }

  /* ---- active nav via section observer ------------------------ */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-links a[data-sec]"));
  var sections = navLinks.map(function (a) { return document.getElementById(a.getAttribute("data-sec")); }).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var id = en.target.id;
          navLinks.forEach(function (a) { a.classList.toggle("active", a.getAttribute("data-sec") === id); });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { so.observe(s); });
  }

  /* ---- year ---------------------------------------------------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---- mobile menu -------------------------------------------- */
  var menuBtn = document.getElementById("menu-toggle");
  var navList = document.getElementById("primary-nav");
  function closeMenu() {
    if (!navList) return;
    navList.classList.remove("open");
    menuBtn.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open menu");
  }
  function openMenu() {
    navList.classList.add("open");
    menuBtn.classList.add("open");
    menuBtn.setAttribute("aria-expanded", "true");
    menuBtn.setAttribute("aria-label", "Close menu");
  }
  if (menuBtn && navList) {
    menuBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (navList.classList.contains("open")) closeMenu(); else openMenu();
    });
    // close when a link is tapped
    navList.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
    // close on tap outside
    document.addEventListener("click", function (e) {
      if (navList.classList.contains("open") && !e.target.closest(".nav") ) closeMenu();
    });
    // close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }
})();
