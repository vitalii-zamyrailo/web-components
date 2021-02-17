const encodePaymentData = (data = {}) => btoa(unescape(encodeURIComponent(JSON.stringify(data))));

export { encodePaymentData };
