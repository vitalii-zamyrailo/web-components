import { tracking as trackingConfig } from '../../../config/tracking.js';

window.dataLayer = window.dataLayer || [];

const pushGtm = (...args) => dataLayer.push(args);

const initJsTime = () => pushGtm('js', new Date());

const initGaAccount = () => pushGtm('config', trackingConfig.gtm.gaAccount);

const initGuAccount = () => pushGtm('config', trackingConfig.gtm.guAccount);

const trackSuccessPurchase = response => trackPurchase('purchase', response);

const trackPurchaseError = response => trackPurchase('haserror', response);

const trackPurchase = (status, response = {}) => pushGtm('event', status, {
	transaction_id: response.transaction_id,
	event_category: 'ecommerce',
	event_label: `${response.status} ${response.amount}`,
	value: response.amount,
});

const trackFormSubmit = ({ name, value } = {}) => {
	const nameToLabel = (name = '') => ({
		subscribe: 'sub',
		oneTime: 'pay',
	}[name] || name);

	pushGtm('event', 'begin_checkout', {
		event_category: 'ecommerce',
		event_label: `Donate ${nameToLabel(name)}${value}`,
		value,
	});
};

initJsTime();
initGaAccount();
initGuAccount();

export { trackSuccessPurchase, trackPurchaseError, trackFormSubmit };
