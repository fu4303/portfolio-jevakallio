window.addEventListener("DOMContentLoaded", function() {
  var baseHue = +getComputedStyle(document.documentElement).getPropertyValue(
    "--primary-hue"
  );

  window.addEventListener("scroll", function() {
    requestAnimationFrame(function() {
      const progress = window.scrollY; // window.document.body.clientHeight;
      setPrimaryColorBasedOnScrollPosition(progress);
    });
  });

  var intersectionObserver = new IntersectionObserver(
    entries => {
      if (entries.length === 1) {
        const id = entries[0].target.id;
        if (id) {
          const hash = `#${id}`;
          history.replaceState(null, null);
          updateActiveSidebarItem(hash);
        }
      }
    },
    {
      rootMargin: `0px 0px -${window.innerHeight - 130}px 0px`,
      threshold: 1
    }
  );

  document.querySelectorAll("h1, .content h2").forEach(h => {
    intersectionObserver.observe(h);
  });

  window.addEventListener("hashchange", () => {
    updateActiveSidebarItem(window.location.hash);
  });

  function updateActiveSidebarItem(hash) {
    document.querySelectorAll(".toc a").forEach(e => {
      if (hash && e.href.endsWith(hash)) {
        e.classList.add("active");
      } else if (e.classList.contains("active")) {
        e.classList.remove("active");
      }
    });
  }
  function setPrimaryColorBasedOnScrollPosition(progress) {
    document.documentElement.style.setProperty(
      "--primary-hue",
      baseHue + progress / 20
    );
  }
});
