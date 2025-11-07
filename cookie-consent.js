// cookie-consent.js
// Lightweight cookie/consent manager (localStorage-backed).
// Provides a consent banner with granular options: essential, analytics, marketing.
// Persists consent under key "leocyte_consent_v1".
// Exposes window.getConsent() -> { essential: true, analytics: bool, marketing: bool, timestamp: ISO }
// Use window.getConsent() before loading analytics/marketing scripts.
// This banner blocks analytics until analytics consent is true.

(function(){
  if (typeof window === 'undefined') return;
  var LS_KEY = 'leocyte_consent_v1';

  // utility
  function readConsent(){ try { return JSON.parse(localStorage.getItem(LS_KEY)) || null; } catch(e){ return null; } }
  function writeConsent(obj){ localStorage.setItem(LS_KEY, JSON.stringify(obj)); }

  // Default consent object - essential always true
  function defaultConsent(){ return { essential: true, analytics: false, marketing: false, timestamp: new Date().toISOString() }; }

  // Expose getter
  window.getConsent = function(){
    return readConsent() || defaultConsent();
  };

  // If consent already set, don't show banner
  if (readConsent()) return;

  // Create banner DOM
  var banner = document.createElement('div');
  banner.setAttribute('id','leocyte-cookie-banner');
  banner.setAttribute('role','dialog');
  banner.setAttribute('aria-live','polite');
  banner.innerHTML = '\
  <div class="cc-inner">\
    <div class="cc-text">\
      <strong>Leocyte uses cookies</strong>\
      <p>We use essential cookies for site functionality. Choose optional analytics or marketing cookies below. You can change these later.</p>\
    </div>\
    <div class="cc-controls">\
      <form id="leocyte-cc-form" aria-label="Cookie preferences">\
        <label><input type="checkbox" name="essential" checked disabled/> Essential (required)</label>\
        <label><input type="checkbox" name="analytics"/> Analytics (site improvement)</label>\
        <label><input type="checkbox" name="marketing"/> Marketing (optional)</label>\
        <div class="cc-actions">\
          <button type="button" id="cc-save">Save preferences</button>\
          <button type="button" id="cc-accept">Accept all</button>\
        </div>\
      </form>\
    </div>\
  </div>';

  // Basic styles injected to ensure banner visible
  var css = '\
  #leocyte-cookie-banner{position:fixed;left:0;right:0;bottom:0;background:#fff;border-top:1px solid #e6e6e6;padding:12px;box-shadow:0 -6px 30px rgba(0,0,0,0.08);z-index:9999;font-family:system-ui,Segoe UI,Roboto,Arial;}\
  #leocyte-cookie-banner .cc-inner{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;max-width:1100px;margin:0 auto;}\
  #leocyte-cookie-banner .cc-text{flex:1;min-width:200px}\
  #leocyte-cookie-banner .cc-controls{min-width:260px;display:flex;align-items:center}\
  #leocyte-cookie-banner form label{display:block;margin-bottom:6px;font-size:14px;color:#111}\
  #leocyte-cookie-banner .cc-actions{display:flex;gap:8px;margin-top:8px}\
  #leocyte-cookie-banner button{padding:8px 12px;border-radius:6px;border:1px solid var(--accent, #008080);background:var(--accent, #008080);color:#fff;cursor:pointer}\
  #leocyte-cookie-banner button[disabled]{opacity:0.6;cursor:default}\
  @media(max-width:520px){ #leocyte-cookie-banner .cc-inner{flex-direction:column;align-items:flex-start} }\
  ';
  var style = document.createElement('style');
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);

  document.body.appendChild(banner);

  // Hook up actions
  document.getElementById('cc-save').addEventListener('click', function(){
    var form = document.getElementById('leocyte-cc-form');
    var analytics = form.elements['analytics'].checked;
    var marketing = form.elements['marketing'].checked;
    var consent = { essential: true, analytics: !!analytics, marketing: !!marketing, timestamp: new Date().toISOString() };
    writeConsent(consent);
    banner.remove();
    // dispatch event for other scripts
    window.dispatchEvent(new CustomEvent('leocyteConsentChanged', { detail: consent }));
  });

  document.getElementById('cc-accept').addEventListener('click', function(){
    var consent = { essential: true, analytics: true, marketing: true, timestamp: new Date().toISOString() };
    writeConsent(consent);
    banner.remove();
    window.dispatchEvent(new CustomEvent('leocyteConsentChanged', { detail: consent }));
  });

})();
