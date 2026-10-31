// Entrance motion for the portfolio. Progressive enhancement: without this
// script every element is simply visible; with it, .rv elements reveal with a
// short stagger as they enter the viewport. Reduced-motion is honoured.
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = Array.prototype.slice.call(document.querySelectorAll(".rv"));
  if (reduce || !("IntersectionObserver" in window) || items.length === 0) return;
  document.documentElement.classList.add("js");
  var seen = new Map();
  items.forEach(function (el) {
    var p = el.parentNode, n = seen.get(p) || 0;
    seen.set(p, n + 1);
    el.style.setProperty("--d", Math.min(n * 80, 400) + "ms");
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
  items.forEach(function (el) { io.observe(el); });
})();
