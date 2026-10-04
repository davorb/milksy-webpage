import posthog from 'posthog-js';

if (import.meta.env.PROD) {
 posthog.init('phc_yNqNfxokiMfjH79Js365mSGtXD84gtSJYq66zZAwVfaP', {
  api_host: 'https://eu.i.posthog.com',
  ui_host: 'https://eu.posthog.com',
  defaults: '2026-05-30',
  persistence: 'localStorage',
  cross_subdomain_cookie: false,
  opt_out_capturing_persistence_type: 'localStorage',
  disable_session_recording: true,
  disable_surveys: true,
  loaded(instance) {
   // Clear the former SDK opt-out so existing visitors use the new configuration.
   (instance as typeof posthog).opt_in_capturing({ captureEventName: false });
  },
 });

 document.addEventListener('click', event => {
  const link = event.target instanceof Element
   ? event.target.closest<HTMLAnchorElement>('a[data-cta="app-store"]')
   : null;
  if (link) {
   posthog.capture('app_store_clicked', {
    page_path: location.pathname,
    link_text: link.getAttribute('aria-label') || link.textContent?.trim() || 'App Store',
   }, { transport: 'sendBeacon' });
  }
 });
}
