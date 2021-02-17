export default class donorsBlock extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<div class="block block_donors">
				<div class="block__header">
					<div class="block__header-content">
						<div class="block__header-logo"></div>
						<span class="block__header-text">Для донорів</span>
					</div>
				</div>
				<div class="donors-block">
					<div class="donors-block__row">
						<div class="donors-block__column">
							<div class="donors-block__cell">
								<div class="donors-block__cell-icon"></div>
								<span class="donors-block__cell-text">Персональні щомісячні звіти у зручному форматі</span>
							</div>
							<div class="donors-block__cell">
								<div class="donors-block__cell-icon"></div>
								<span class="donors-block__cell-text">Закриті зустрічі з міністрами і вождями</span>
							</div>
						</div>
						<div class="donors-block__column">
							<div class="donors-block__cell">
								<div class="donors-block__cell-icon"></div>
								<span class="donors-block__cell-text">Збільшення ваги голосу у мобільному додатку</span>
							</div>
							<div class="donors-block__cell">
								<div class="donors-block__cell-icon"></div>
								<span class="donors-block__cell-text">Спільні свята. Спільні перемоги. Спільні плани на майбутьнє.</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}
}

customElements.define('donors-block', donorsBlock);
