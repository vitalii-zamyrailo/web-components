import { tracking as trackingConfig } from '../../../config/tracking.js';

const setScript = (f,b,e,v,n,t,s) => {
	if(f.fbq)return;n=f.fbq=function(){n.callMethod?
		n.callMethod.apply(n,arguments):n.queue.push(arguments)};
	if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
	n.queue=[];t=b.createElement(e);t.async=!0;
	t.src=v;s=b.getElementsByTagName(e)[0];
	s.parentNode.insertBefore(t,s);
};

setScript(window, document,'script', 'https://connect.facebook.net/en_US/fbevents.js');

const trackInit = () => {
	fbq('init', trackingConfig.facebook.account1);
	fbq('init', trackingConfig.facebook.account2);
};

const trackPageView = () => fbq('track', 'PageView');

const trackFormSubmit = ({ name, value } = {}) => {
	const nameToLabel = (name = '') => ({
		subscribe: 'sub',
		oneTime: 'pay',
	}[name] || name);
	const label = nameToLabel(name);
	const data = {
		content_category: 'ecommerce',
		content_type: label,
		content_name: `Donate ${label}`,
		content_ids: [label],
		contents: [{ id: label, quantity: 1, item_price: value }],
		value,
		currency: 'UAH'
	};

	fbq('trackSingle', trackingConfig.facebook.account1, 'Purchase', data);
	fbq('trackSingle', trackingConfig.facebook.account2, 'Purchase', data);
};

trackPageView();
trackInit();

export { trackFormSubmit };
