export default class reportBlock extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
			<div class="block block_report">
				<div class="block__header">
					<div class="block__header-content">
						<span class="block__header-text">Звіти і регіони</span>
					</div>
				</div>
				<div class="report-block">
					<span class="report-block__text">
					 Кожна гривня, яку ви інвестуєте "Демократичній Сокирі", має свій шлях та ціль. І за шлях, і за ціль ми готові детально звітувати. Адже ми не їмо з рук олігархів. Партія створена і працює за гроші звичайних людей.
					 ТУТ ми звітуємо за кожню гривню, яка витрачає "Демократична Сокира". Ми також додали можливість надсилати кошти окремим осередкам "Демократичної Сокири". Їх 13. Тож якщо ви є прихильником роботи будь-якого з них - тисніть тут.
					</span>
				</div>
			</div>
		`;
	}
}

customElements.define('report-block', reportBlock);
