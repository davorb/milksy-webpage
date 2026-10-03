import type { PostHog } from 'posthog-js';

const consentKey = 'milksy-analytics-consent';
const banner = document.querySelector<HTMLElement>('#analytics-consent')!;
const settings = document.querySelector<HTMLButtonElement>('#analytics-settings')!;
let consent: string | null = null;
let posthog: PostHog | undefined;
let loading = false;
let openedFromSettings = false;

try { consent = localStorage.getItem(consentKey); } catch { /* Keep the choice for this page when storage is unavailable. */ }
banner.hidden = consent === 'accepted' || consent === 'declined';
settings.hidden = false;

async function startAnalytics() {
 if (!import.meta.env.PROD || loading || consent !== 'accepted') return;
 if (posthog) {
  posthog.opt_in_capturing({ captureEventName: false });
  return;
 }
 loading = true;
 try {
  const { default: sdk } = await import('posthog-js');
  // Consent may have been withdrawn while the SDK was downloading.
  if (consent !== 'accepted') return;
  posthog = sdk.init('phc_yNqNfxokiMfjH79Js365mSGtXD84gtSJYq66zZAwVfaP', {
   api_host: 'https://eu.i.posthog.com',
   ui_host: 'https://eu.posthog.com',
   defaults: '2026-05-30',
   persistence: 'localStorage',
   cross_subdomain_cookie: false,
   opt_out_capturing_by_default: true,
   opt_out_persistence_by_default: true,
   opt_out_capturing_persistence_type: 'localStorage',
   disable_session_recording: true,
   disable_surveys: true,
   loaded(instance) {
    (instance as PostHog).opt_in_capturing({ captureEventName: false });
   },
  });
 } catch { /* Analytics failures must not interrupt the website. */ }
 finally { loading = false; }
}

function choose(value: string) {
 consent = value;
 try { localStorage.setItem(consentKey, value); } catch { /* The current-page choice still applies. */ }
 banner.hidden = true;
 if (value === 'accepted') void startAnalytics();
 else posthog?.opt_out_capturing();
 if (openedFromSettings) settings.focus();
 openedFromSettings = false;
}

document.querySelectorAll<HTMLButtonElement>('[data-analytics-choice]').forEach(button => {
 button.addEventListener('click', () => choose(button.dataset.analyticsChoice!));
});
settings.addEventListener('click', () => {
 openedFromSettings = true;
 banner.hidden = false;
 banner.querySelector<HTMLButtonElement>('button')?.focus();
});
window.addEventListener('storage', event => {
 if (event.key !== consentKey && event.key !== null) return;
 consent = event.newValue;
 banner.hidden = consent === 'accepted' || consent === 'declined';
 if (consent === 'accepted') void startAnalytics();
 else posthog?.opt_out_capturing();
});
document.addEventListener('click', event => {
 const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[data-cta="app-store"]') : null;
 if (link && consent === 'accepted') {
  posthog?.capture('app_store_clicked', { page_path: location.pathname, link_text: link.getAttribute('aria-label') || link.textContent?.trim() || 'App Store' }, { transport: 'sendBeacon' });
 }
});
void startAnalytics();
