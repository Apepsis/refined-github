import './mark-locked.css';
import React from 'dom-chef';
import * as pageDetect from 'github-url-detection';
import LockIcon from 'octicons-plain-react/Lock';

import {$} from 'select-dom';

import features from '../feature-manager.js';
import observe from '../helpers/selector-observer.js';

function mark(issueLink: HTMLAnchorElement): void {
	const row = issueLink.closest('.js-issue-row');

	if (!row || row.querySelector('.rgh-locked-icon')) {
		return;
	}

	if (!row.querySelector('.octicon-lock')) {
		return;
	}

	issueLink.before(
		<span className="rgh-locked-icon" title="Locked issue">
			<LockIcon />
		</span>,
	);
}

function init(signal: AbortSignal): void {
	observe(
		'a[data-testid="issue-pr-title-link"]',
		mark,
		{signal},
	);
}

void features.add(import.meta.url, {
	include: [
		pageDetect.isRepoIssueList,
	],
	init,
});

/*

Test URLs:

https://github.com/refined-github/sandbox/issues?q=title

Only for the screenshot: https://github.com/gulpjs/gulp/issues?q=in%3Atitle%20update%20docs%20for%20sort%3Aupdated-asc

*/
