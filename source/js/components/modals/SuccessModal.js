const innerHtml = `
	<div class="success-modal__content">
		<span class="success-modal__status">Успіх!</span>
		<span class="success-modal__text">Оплата пройшла успішно. Дякуємо вам.<br />Ваша партія.</span>
	</div>
`;

import BaseModal from './BaseModal.js';

export default class SuccessModal extends BaseModal {
	constructor() {
		super();

		this.name = 'SuccessModal';
		this.innerHtml = innerHtml;
	}
}
