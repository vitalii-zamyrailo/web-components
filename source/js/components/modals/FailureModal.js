const innerHtml = `
	<div class="failure-modal__content">
		<span class="failure-modal__status">Помилка</span>
		<span class="failure-modal__text">Під час оплати виникла помилка.<br />Зверніться до нас для її усунення.</span>
	</div>
`;

import BaseModal from './BaseModal.js';

export default class FailureModal extends BaseModal {
	constructor() {
		super();

		this.name = 'FailureModal';
		this.innerHtml = innerHtml;
	}
}
