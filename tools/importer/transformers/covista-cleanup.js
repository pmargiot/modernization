/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Covista site-wide cleanup.
 * Removes non-authorable site chrome. All selectors verified against
 * migration-work/cleaned.html.
 */

const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Cookie / consent bar (cleaned.html line 5: <div id="consent_blackbar">)
    WebImporter.DOMUtils.remove(element, ['#consent_blackbar']);
  }

  if (hookName === TransformHook.afterTransform) {
    // Non-authorable site chrome, verified in cleaned.html:
    //  - a.skip-link           (line 2:  "Skip to main content")
    //  - header.page--header   (line 10: masthead, main/utility/mobile nav, search)
    //  - .region__admin        (line 745: empty Drupal admin region)
    //  - a#main-content        (line 754: empty in-page skip anchor target)
    //  - footer.page--footer   (line 1924: footer nav, social, legal links)
    WebImporter.DOMUtils.remove(element, [
      '.skip-link',
      'header.page--header',
      '.region__admin',
      'a#main-content',
      'footer.page--footer',
    ]);
  }
}
