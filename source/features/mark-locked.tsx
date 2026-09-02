import React from 'dom-chef';
import LockIcon from 'octicons-plain-react/Lock';

import {$$} from 'select-dom';
import features from '../feature-manager.js';

import './mark-locked.css';

function markLockedIssue(issue: Element): void {
	const title = issue.querySelector('.Link--primary');

	if (!title || issue.querySelector('.rgh-locked-icon')) {
		return;
	}

	title.before(
		<span className="rgh-locked-icon" title="Locked issue">
			<LockIcon />
		</span>,
	);
}

function init(): void {
	for (const issue of $$('.js-issue-row')) {
		if (issue.querySelector('.octicon-lock')) {
			markLockedIssue(issue);
		}
	}
}

features.add(import.meta.url, {
	include: [
		/issues/,
		/pulls/,
	],
	load: init,
});
