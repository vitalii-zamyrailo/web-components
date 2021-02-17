export default class appFooter extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<div class="footer">
				<div class="footer__container">
					<span class="footer__item">
						ГО "Демократична Сокира"
					</span>
					<span class="footer__item">
						Код ЄДРПОУ 42107796, свідоцтво про реєстрацію від 03.05.2018 року.
					</span>
				</div>
			</div>
		`;
	}
}

customElements.define('app-footer', appFooter);
