import { payment as paymentConfig } from '../../../config/payment.js';
import { encodePaymentData } from '../helpers/payment.js';
import * as request from '../helpers/request.js';
import * as gtm from '../tracking/googleTagManager.js';
import * as facebook from '../tracking/facebook.js';
import SuccessModal from './modals/SuccessModal.js';
import FailureModal from './modals/FailureModal.js';

const actionByPaymentName = {
	subscribe: 'subscribe',
	oneTime: 'paydonate',
};

const typeByPaymentName = {
	subscribe: 'buy',
	oneTime: 'donate',
};

const preparePaymentParams = (payment) => {
	const params = {
		version: paymentConfig.api.version,
		action: actionByPaymentName[payment.name],
		public_key: paymentConfig.publicKey,
		amount: payment.value,
		currency: paymentConfig.currency,
		description: paymentConfig.description,
		type: typeByPaymentName[payment.name],
		language: paymentConfig.lang,
	};

	if (payment.name === 'subscribe') {
		Object.assign(params, {
			subscribe: paymentConfig.subscribe.flag,
			subscribe_date_start: paymentConfig.subscribe.dateStart,
			subscribe_periodicity: paymentConfig.subscribe.periodicity,
		});
	}

	return params;
};

const SUCCESS_STATUSES = ['subscribed', 'success'];
const FAILURE_STATUSES = ['error', 'failure'];

const buttonsGroup = `
	<div class="donate-widget">
		<div class="donate-widget__row">
			<div class="donate-widget__cell donate-widget__cell_blocks">
				<div class="donate-blocks">
					<div class="donate-block">
						<span class="donate-block__header _header checked" name="subscribe">Регулярний платіж</span>
						<div class="donate-block__values">
							<label class="donate-block__value">
								<input class="donate-input _radio" type="radio" name="subscribe" value="100">
								<span class="donate-input-text">100</span>
							</label>
							<label class="donate-block__value">
								<input class="donate-input _radio" type="radio" name="subscribe" value="200">
								<span class="donate-input-text">200</span>
							</label>
							<label class="donate-block__value">
								<input class="donate-input _radio" type="radio" name="subscribe" value="450" checked>
								<span class="donate-input-text">450</span>
							</label>
							<label class="donate-block__value">
								<input class="donate-input _radio" type="radio" name="subscribe" value="1500">
								<span class="donate-input-text">1500</span>
							</label>
							<label class="donate-block__value">
								<input class="donate-input donate-input_other _radio" type="radio" name="subscribe" value="other">
								<span class="donate-input-text">Інша сумма</span>
								<input type="text" class="donate-other__input _other" name="subscribe" value="2000">
							</label>
						</div>
					</div>
					<div class="donate-block">
						<span class="donate-block__header _header" name="oneTime">Разова допомога</span>
						<div class="donate-block__values">
							<label class="donate-block__value">
								<input class="donate-input _radio" type="radio" name="oneTime" value="300">
								<span class="donate-input-text">300</span>
							</label>
							<label class="donate-block__value">
								<input class="donate-input _radio" type="radio" name="oneTime" value="750">
								<span class="donate-input-text">750</span>
							</label>
							<label class="donate-block__value">
								<input class="donate-input _radio" type="radio" name="oneTime" value="2500">
								<span class="donate-input-text">2500</span>
							</label>
							<label class="donate-block__value">
								<input class="donate-input _radio" type="radio" name="oneTime" value="5000">
								<span class="donate-input-text">5000</span>
							</label>
							<label class="donate-block__value">
								<input class="donate-input donate-input_other _radio" type="radio" name="oneTime" value="other">
								<span class="donate-input-text">Інша сумма</span>
								<input type="text" class="donate-other__input _other" name="oneTime" value="10000">
							</label>
						</div>
					</div>
				</div>
			</div>
			<div class="donate-widget__cell">
				<form id="donate-user-form" class="donate-user-form disabled _form">
					<div class="donate-user-field">
						<input type="text" class="donate-user-input _input" placeholder="Ім'я та прізвище" name="name" minlength="5" required>
						<span class="donate-user-input__error _error"></span>
					</div>
					<div class="donate-user-field">
						<input type="email" class="donate-user-input _input" placeholder="E-mail" name="email" autocomplete="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$">
						<span class="donate-user-input__error _error"></span>
					</div>
					<div class="donate-user-field">
						<input type="tel" class="donate-user-input _input" placeholder="Номер" name="tel" autocomplete="tel" pattern="(\\+?\\d[- .]*){7,13}" required>
						<span class="donate-user-input__error _error"></span>
					</div>
				</form>
				<label class="donate-anonym">
					<input type="checkbox" class="donate-anonym__checkbox _anonym" checked>
					<span class="donate-anonym__checkbox-legend"></span>
					<span class="donate-anonym__text">Бажаю лишитися анонімним</span>
				</label>
			</div>
		</div>
		<div class="donate-widget__row">
			<div class="donate-widget__cell">
				<div class="donate-widget__submit-block">
					<button class="donate-submit _submit">Продовжити</button>
				</div>
			</div>
		</div>
	</div>
`;

export default class donateWidget extends HTMLElement {
	connectedCallback() {
		this.innerHTML = buttonsGroup;
		this.setListeners();
	}

	setListeners() {
		this.querySelector('._anonym').addEventListener('change', e => this.handleAnonymChange(e));
		this.querySelector('._submit').addEventListener('click', e => this.handleSubmit(e));
		this.querySelectorAll('._radio')
			.forEach(radio => radio.addEventListener('input', e => this.handleRadioChange(e)));
		this.querySelectorAll('._header')
			.forEach(header => header.addEventListener('click', e => this.handleHeaderClick(e)));
		this.querySelectorAll('._form ._input').forEach(input => {
			input.addEventListener('invalid', e => this.handleFormInputInvalid(e));
			input.addEventListener('focus', e => this.handleFormInputFocus(e));
			input.addEventListener('blur', e => this.handleFormInputBlur(e));
		});

	}

	handleAnonymChange(e) {
		this.querySelector('._form').classList.toggle('disabled', e.target.checked);
		this.resetFormValidation();
	}

	handleHeaderClick(e) {
		const type = e.target.getAttribute('name');
		this.setHeaderSelection(type);
		this.clearButtonSelectionExclude(type);
		this.setDefaultButtonByType(type);
	}

	handleFormInputBlur(e) {
		e.target.checkValidity();
	}

	handleFormInputFocus(e) {
		this.resetInputValidation(e.target);
	}

	handleFormInputInvalid(e) {
		const errMessageByName = {
			name: 'Заповніть це поле',
			email: 'Введіть коректний email',
			tel: 'Заповніть це поле',
		};
		const input = e.target;
		input.nextElementSibling.innerHTML = errMessageByName[input.name];
	}

	resetInputValidation(input) {
		input.nextElementSibling.innerHTML = '';
	}

	resetFormValidation() {
		this.querySelectorAll('._form ._input:invalid').forEach(input => this.resetInputValidation(input));
	}

	canSubmit() {
		return this.querySelector('._anonym').checked || this.querySelector('._form').checkValidity();
	}

	handleSubmit() {
		if (!this.canSubmit()) {
			return;
		}

		let selectedPayment = this.querySelector(`._radio:checked`);

		if (selectedPayment) {
			if (selectedPayment.value === 'other') {
				selectedPayment = this.querySelector(`._other[name=${selectedPayment.name}]`);
			}

			this.initWidget(selectedPayment);

			const trackParams = { name: selectedPayment.name, value: selectedPayment.value };
			gtm.trackFormSubmit(trackParams);
			facebook.trackFormSubmit(trackParams);
		}
	}

	handleRadioChange(e) {
		const type = e.target.name;

		this.setHeaderSelection(type);
		this.clearButtonSelectionExclude(type);
	}

	setHeaderSelection(type) {
		this.querySelector('._header.checked').classList.remove('checked');
		this.querySelector(`._header[name=${type}]`).classList.add('checked');
	}

	setDefaultButtonByType(type) {
		const defaultValueByType = {
			subscribe: 450,
			oneTime: 2500,
		};
		const button = this.querySelector(`._radio[name="${type}"][value="${defaultValueByType[type]}"]`);
		if (button) button.checked = true;
	}

	clearButtonSelectionExclude(type) {
		const button = this.querySelector(`._radio:checked:not([name=${type}])`);
		if (button) button.checked = false;
	}

	getFormData() {
		const form = document.getElementById('donate-user-form');

		return {
			name: form.elements.name.value,
			email: form.elements.email.value,
			phone: form.elements.tel.value,
		};
	}

	getSignature(data = {}) {
		return request.getSignature({ data });
	}

	savePaymentResult({ result, form } = {}) {
		const data = {
			name: form.name,
			email: form.email,
			phone: form.phone,
			status: result.status,
			value: result.amount,
			tx_id: result.transaction_id,
		};
		request.savePaymentResult(data);
	}

	initWidget(payment) {
		if (!window.LiqPayCheckout) {
			return;
		}

		const params = preparePaymentParams(payment);
		const data = encodePaymentData(params);
		const signature = this.getSignature(data);

		if (!signature) {
			return;
		}

		window.LiqPayCheckout.init({
			data,
			signature,
			language: paymentConfig.widget.lang,
			mode: paymentConfig.widget.mode ,
		})

		this.setWidgetCallbacks();
	}

	setWidgetCallbacks() {
		if (this.callbacksReady) {
			return;
		}

		window.LiqPayCheckout
			.on('liqpay.callback', response => this.handleLiqpayCallback(response))
			.on('liqpay.ready', data => this.handleLiqpayReady(data))
			.on('liqpay.close', data => this.handleLiqpayClose(data));

		this.callbacksReady = true;
	}

	handleLiqpayCallback(response) {
		if (!response) {
			return;
		}

		this.paymentResult = { ...response };
		this.savePaymentResult({ result: this.paymentResult, form: this.getFormData() });
	}

	handleLiqpayReady() {
		this.paymentResult = null;
	}

	handleLiqpayClose() {
		if (!this.paymentResult) {
			return;
		}

		if (SUCCESS_STATUSES.indexOf(this.paymentResult.status) !== -1) {
			new SuccessModal().show();
			gtm.trackSuccessPurchase(this.paymentResult);
		} else if (FAILURE_STATUSES.indexOf(this.paymentResult.status) !== -1) {
			new FailureModal().show();
			gtm.trackPurchaseError(this.paymentResult);
		}
	}
}

customElements.define('donate-widget', donateWidget);
