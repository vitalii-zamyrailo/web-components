const frame = `
	<div class="modal__container">
		<div class="modal__background"></div>
		<div class="modal">
			<div class="modal__header">
				<div class="modal__close _close"></div>
			</div>
			<div class="modal__content _content"></div>
		</div>
	</div>
`;

export default class Modal {
	constructor() {
		this.name = 'BaseModal';
		this.innerHtml = '';
	}

	render() {
		const template = document.createElement('div');
		template.id = this.name;
		template.innerHTML = frame;

		if (this.innerHtml) {
			const content = document.createElement('div');
			content.innerHTML = this.innerHtml;
			template.querySelector('._content').appendChild(content);
		}

		document.body.appendChild(template);
	}

	setListeners() {
		document.querySelector(`#${this.name} ._close`).addEventListener('click', this.close.bind(this))
	}

	show() {
		this.render();
		this.setListeners();
	}

	close() {
		document.querySelector(`#${this.name}`).remove();
	}
}
