// public/js/regionfilter.js
(function () {
  function $(id) { return document.getElementById(id); }

  function buildOptions(list, selectedValue) {
    const base = '<option value="">Select Region</option>';
    if (!Array.isArray(list) || list.length === 0) return base;
    return base + list.map(r => {
      const sel = (selectedValue && selectedValue === r) ? ' selected' : '';
      return `<option value="${escapeHtml(r)}"${sel}>${escapeHtml(r)}</option>`;
    }).join('');
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const countryEl = $("country");
    const regionEl = $("region");
    const dataEl = $("slx-region-data");

    // Hard diagnostic: if these are missing, the script cannot work.
    if (!countryEl || !regionEl || !dataEl) {
      console.warn("[SportingLinx] regionfilter: missing elements", {
        countryEl: !!countryEl,
        regionEl: !!regionEl,
        dataEl: !!dataEl
      });
      return;
    }

    let payload;
    try {
      payload = JSON.parse(dataEl.textContent || "{}");
    } catch (e) {
      console.error("[SportingLinx] regionfilter: invalid JSON payload", e);
      return;
    }

    const REGION_MAP = payload.regions || {};
    const initial = payload.initial || {};
    const initialCountry = initial.country || "";
    const initialRegion = initial.region || "";

    function applyCountry(countryCode, regionSelected) {
      const list = REGION_MAP[countryCode] || [];
      regionEl.innerHTML = buildOptions(list, regionSelected || "");
      regionEl.disabled = !countryCode;
    }

    // Set initial state (important for server-loaded query string)
    if (initialCountry) {
      countryEl.value = initialCountry;
      applyCountry(initialCountry, initialRegion);
    } else {
      applyCountry("", "");
    }

    // Change handler
    countryEl.addEventListener("change", () => {
      const code = countryEl.value || "";
      // When country changes, clear region selection
      applyCountry(code, "");
    });
  });
})();