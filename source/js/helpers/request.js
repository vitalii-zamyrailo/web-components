import { payment as paymentConfig } from '../../../config/payment.js';

const STATUS_OK = 200;

const prepareFormData = (data) => {
	const reqData = new FormData();
	for (let key in data) {
		if ({}.hasOwnProperty.call(data, key)) {
			reqData.append(key, data[key])
		}
	};
	return reqData;
};

const xhr = ({ method, path, reqData } = {}) => {
	const xhr = new XMLHttpRequest();

	xhr.open(method, `${paymentConfig.api.url}${path}`, false);
	xhr.send(reqData);

	if (xhr.status !== STATUS_OK) {
		return null;
	}

	return xhr.responseText;
};

const getSignature = (data = {}) => xhr({
	...paymentConfig.api.refs.signature,
	reqData: prepareFormData(data),
});

const savePaymentResult = (data = {}) => xhr({
	...paymentConfig.api.refs.paymentResult,
	reqData: prepareFormData(data),
});

export { getSignature, savePaymentResult };
