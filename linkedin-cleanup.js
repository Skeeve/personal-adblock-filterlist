// ==UserScript==
// @name         Clean Up Linkedin Posts
// @namespace    https://thevgergroup.com/
// @version      1.3
// @description  Remove posts containing "Suggested" from the feed
// @author       Patrick O'Leary
// @match        https://www.linkedin.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/usernomom/personal-adblock-filterlist/main/clean-up-feed.js
// @downloadURL  https://raw.githubusercontent.com/usernomom/personal-adblock-filterlist/main/clean-up-feed.js
// ==/UserScript==

const HIDE = /^(?:Vorgeschlagen|Suggested|Anzeige)/;

(function() {
    'use strict';

    function hideStuff() {
        hide(
            'section.launchpad-v2', /^(?:Premium kostenlos)/
        );
        hide(
            'div[data-id^="urn:li:activity:"]', /^(?:Vorgeschlagen|Suggested|Anzeige)/
        );
    }
    // Function to hide stuff
    function hide(selector, rex) {
        // Select all divs that have a data-id attribute starting with "urn:li:activity:"
        const feedItems = document.querySelectorAll(selector);

        feedItems.forEach(feedItem => {
            feedItem.querySelectorAll('span').forEach(spanElement => {
                let text = spanElement.textContent.trim();
                if (text.match(rex)) {
                    // Instead of removing, hide the item by setting the display to none
                    feedItem.style.display = 'none';
                }
            })
        });
    }

    // Run the function initially
    hideStuff();

    // Run the function when new posts are loaded (using a MutationObserver)
    const observer = new MutationObserver(hideStuff);
    observer.observe(document.body, { childList: true, subtree: true });

})();
