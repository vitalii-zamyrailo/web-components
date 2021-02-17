export default class mainBanner extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<div class="main-banner">
				<div class="main-banner__text-holder">
					<span class="main-banner__text">Разом ми<br />зможемо<br />все!</span>
				</span>
			</div>
		`;
	}
}

customElements.define('main-banner', mainBanner);
