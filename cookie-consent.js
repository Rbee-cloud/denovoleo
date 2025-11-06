/**
 * Leocyte Cookie Consent Manager
 * Granular consent management for GDPR, LGPD, CCPA compliance
 * Version 1.0
 */

class CookieConsent {
    constructor() {
        this.consent = {
            essential: true, // Always true, cannot be disabled
            analytics: false,
            marketing: false
        };
        this.banner = null;
        this.storageKey = 'leocyte_cookie_consent';
        this.init();
    }

    init() {
        // Load existing consent
        this.loadConsent();
        
        // Show banner if no consent decision
        if (!this.hasConsentDecision()) {
            this.showBanner();
        }
        
        // Apply consent to analytics
        this.applyConsent();
    }

    loadConsent() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                this.consent = { ...this.consent, ...JSON.parse(stored) };
            }
        } catch (e) {
            console.warn('Failed to load cookie consent:', e);
        }
    }

    saveConsent() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.consent));
        } catch (e) {
            console.warn('Failed to save cookie consent:', e);
        }
    }

    hasConsentDecision() {
        return localStorage.getItem(this.storageKey) !== null;
    }

    showBanner() {
        // Create banner element
        this.banner = document.createElement('div');
        this.banner.className = 'cookie-banner';
        this.banner.setAttribute('role', 'dialog');
        this.banner.setAttribute('aria-label', 'Cookie consent');
        
        this.banner.innerHTML = `
            <div class="cookie-banner__content">
                <h3>We Value Your Privacy</h3>
                <p>Leocyte uses cookies and similar technologies to enhance your experience, analyze site usage, and support our marketing efforts. You can choose to accept all, reject non-essential, or customize your preferences.</p>
                
                <div class="cookie-options">
                    <div class="cookie-option">
                        <label class="cookie-toggle">
                            <input type="checkbox" disabled checked>
                            <span class="cookie-toggle__slider"></span>
                        </label>
                        <div class="cookie-option__text">
                            <strong>Essential</strong>
                            <span>Required for site functionality</span>
                        </div>
                    </div>
                    
                    <div class="cookie-option">
                        <label class="cookie-toggle">
                            <input type="checkbox" id="analytics-consent">
                            <span class="cookie-toggle__slider"></span>
                        </label>
                        <div class="cookie-option__text">
                            <strong>Analytics</strong>
                            <span>Help us improve our website</span>
                        </div>
                    </div>
                    
                    <div class="cookie-option">
                        <label class="cookie-toggle">
                            <input type="checkbox" id="marketing-consent">
                            <span class="cookie-toggle__slider"></span>
                        </label>
                        <div class="cookie-option__text">
                            <strong>Marketing</strong>
                            <span>Personalized content and ads</span>
                        </div>
                    </div>
                </div>
                
                <div class="cookie-banner__actions">
                    <button class="button button--small" id="accept-all">Accept All</button>
                    <button class="button button--small button--outline" id="save-preferences">Save Preferences</button>
                    <button class="button button--small button--text" id="reject-all">Reject Non-Essential</button>
                </div>
            </div>
        `;

        // Add styles
        this.addStyles();
        
        // Add to page
        document.body.appendChild(this.banner);
        
        // Add event listeners
        this.attachEventListeners();
    }

    attachEventListeners() {
        // Accept all
        document.getElementById('accept-all').addEventListener('click', () => {
            this.consent.analytics = true;
            this.consent.marketing = true;
            this.saveConsent();
            this.hideBanner();
            this.applyConsent();
        });

        // Save preferences
        document.getElementById('save-preferences').addEventListener('click', () => {
            this.consent.analytics = document.getElementById('analytics-consent').checked;
            this.consent.marketing = document.getElementById('marketing-consent').checked;
            this.saveConsent();
            this.hideBanner();
            this.applyConsent();
        });

        // Reject non-essential
        document.getElementById('reject-all').addEventListener('click', () => {
            this.consent.analytics = false;
            this.consent.marketing = false;
            this.saveConsent();
            this.hideBanner();
            this.applyConsent();
        });

        // Set initial checkbox states
        document.getElementById('analytics-consent').checked = this.consent.analytics;
        document.getElementById('marketing-consent').checked = this.consent.marketing;
    }

    hideBanner() {
        if (this.banner) {
            this.banner.style.display = 'none';
            this.banner.remove();
            this.banner = null;
        }
    }

    applyConsent() {
        // Apply analytics consent
        if (this.consent.analytics) {
            this.loadAnalytics();
        } else {
            this.blockAnalytics();
        }

        // Apply marketing consent
        if (this.consent.marketing) {
            this.loadMarketing();
        } else {
            this.blockMarketing();
        }
    }

    loadAnalytics() {
        // Example: Load privacy-friendly analytics
        // Replace with your preferred analytics provider (Plausible, Matomo, etc.)
        console.log('Loading analytics - implement your preferred privacy-friendly analytics here');
        
        /* Example Plausible implementation:
        <script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
        */
        
        /* Example Matomo implementation:
        var _paq = window._paq = window._paq || [];
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
            var u="//your-matomo-instance/";
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            _paq.push(['setSiteId', '1']);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
        })();
        */
    }

    blockAnalytics() {
        // Block analytics scripts
        console.log('Analytics blocked based on user consent');
    }

    loadMarketing() {
        // Load marketing scripts if consented
        console.log('Loading marketing scripts - implement your marketing tools here');
    }

    blockMarketing() {
        // Block marketing scripts
        console.log('Marketing scripts blocked based on user consent');
    }

    addStyles() {
        const styles = `
            .cookie-banner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: white;
                border-top: 1px solid #e0e0e0;
                padding: 1.5rem;
                box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
                z-index: 1000;
            }
            
            .cookie-banner__content {
                max-width: 1200px;
                margin: 0 auto;
            }
            
            .cookie-banner h3 {
                margin: 0 0 0.5rem 0;
                color: var(--text-dark);
            }
            
            .cookie-banner p {
                margin: 0 0 1rem 0;
                color: var(--text-light);
                line-height: 1.5;
            }
            
            .cookie-options {
                display: grid;
                gap: 1rem;
                margin: 1.5rem 0;
            }
            
            .cookie-option {
                display: flex;
                align-items: flex-start;
                gap: 1rem;
            }
            
            .cookie-toggle {
                position: relative;
                display: inline-block;
                width: 50px;
                height: 24px;
                flex-shrink: 0;
            }
            
            .cookie-toggle input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            
            .cookie-toggle__slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                transition: .4s;
                border-radius: 24px;
            }
            
            .cookie-toggle__slider:before {
                position: absolute;
                content: "";
                height: 16px;
                width: 16px;
                left: 4px;
                bottom: 4px;
                background-color: white;
                transition: .4s;
                border-radius: 50%;
            }
            
            .cookie-toggle input:checked + .cookie-toggle__slider {
                background-color: var(--accent);
            }
            
            .cookie-toggle input:checked + .cookie-toggle__slider:before {
                transform: translateX(26px);
            }
            
            .cookie-toggle input:disabled + .cookie-toggle__slider {
                background-color: #666;
                cursor: not-allowed;
            }
            
            .cookie-option__text {
                flex: 1;
            }
            
            .cookie-option__text strong {
                display: block;
                margin-bottom: 0.25rem;
            }
            
            .cookie-option__text span {
                font-size: 0.875rem;
                color: var(--text-light);
            }
            
            .cookie-banner__actions {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
            }
            
            @media (max-width: 768px) {
                .cookie-banner {
                    padding: 1rem;
                }
                
                .cookie-banner__actions {
                    flex-direction: column;
                }
                
                .cookie-banner__actions .button {
                    flex: 1;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    // Public method to get current consent
    getConsent() {
        return { ...this.consent };
    }

    // Public method to reset consent
    resetConsent() {
        localStorage.removeItem(this.storageKey);
        this.consent = {
            essential: true,
            analytics: false,
            marketing: false
        };
        this.showBanner();
    }
}

// Initialize cookie consent
const leocyteCookieConsent = new CookieConsent();

// Expose to window for other scripts
window.getConsent = () => leocyteCookieConsent.getConsent();
window.resetCookieConsent = () => leocyteCookieConsent.resetConsent();

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CookieConsent;
}
