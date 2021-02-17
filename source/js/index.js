import './components/app-header.js';
import './components/app-footer.js';
import './components/main-banner.js';
import './components/donors-block.js';
import './components/report-block.js';
import './components/pay-requisites.js';
import './components/donate-widget.js';

import './tracking/googleTagManager.js';

window.addEventListener('load', () =>
	document.querySelector('.wrapper').classList.remove('hidden'));
