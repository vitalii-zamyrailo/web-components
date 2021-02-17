export default class appHeader extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<div class="header">
				<div class="header__container">
					<div class="header__logo"></div>
					<ul class="header__list">
						<li class="header__list-item">
							<a href="#payment" class="header__list-link">Допомогти</a>
						</li>
						<li class="header__list-item">
							<a href="#donors" class="header__list-link">Бонуси</a>
						</li>
						<li class="header__list-item">
							<a href="#report" class="header__list-link">Звіти</a>
						</li>
					</ul>
				</div>
			</div>
		`;
	}
}

customElements.define('app-header', appHeader);
