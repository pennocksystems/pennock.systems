(function () {
  const storageKey = "usi-theme";
  const nightTheme = "night";
  const lightTheme = "light";

  const root = document.documentElement;
  const sunIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>';
  const moonIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.99 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.78 9.79z"></path></svg>';

  function getStoredTheme() {
    try {
      return window.localStorage.getItem(storageKey);
    } catch (_error) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch (_error) {
      /* Storage can be unavailable in private or embedded contexts. */
    }
  }

  function applyTheme(theme) {
    const isNight = theme === nightTheme;

    if (isNight) {
      root.dataset.theme = nightTheme;
    } else {
      delete root.dataset.theme;
    }

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.setAttribute("aria-pressed", String(isNight));
      button.setAttribute("aria-label", isNight ? "Switch to day mode" : "Switch to night mode");
      button.setAttribute("title", isNight ? "Switch to day mode" : "Switch to night mode");

      const text = button.querySelector("[data-theme-toggle-text]");
      if (text) {
        text.textContent = isNight ? "Day mode" : "Night mode";
      }

      const icon = button.querySelector("[data-theme-toggle-icon]");
      if (icon) {
        icon.innerHTML = isNight ? moonIcon : sunIcon;
      }
    });
  }

  const initialTheme = getStoredTheme();
  if (initialTheme === nightTheme) {
    applyTheme(nightTheme);
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(root.dataset.theme === nightTheme ? nightTheme : lightTheme);

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const nextTheme = root.dataset.theme === nightTheme ? lightTheme : nightTheme;
        applyTheme(nextTheme);
        storeTheme(nextTheme);
      });
    });
  });
})();
