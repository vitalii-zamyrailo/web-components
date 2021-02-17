export default class payRequisites extends HTMLElement {
	constructor() {
		super();
		this.reqs = {
			bank: {
				edr: 42107796,
				account: 26008052708946,
				mfo: 320649,
				iban: 'UA21320649000026008052708946',
				goal: 'Добровільна пожертва на здійснення статутної діяльності.',
			},
			crypto: {
				btc: '1Jjt6rrCrxeoqFofSF4wTS8CffMXgtSaWB',
				eth: '0x5f67ecddfd58ed3f6b9407f123c5a9cb1be93b25',
				dash: 'Xj3fKVy5CFidaBmPkKsyT6Ldq1HBpoDtrq',
				ltc: 'LbDTvMaNhJAxRvvCYuUXtQfm2jxBnNPbJu',
				monero: '843oduRuJ5uD2vZx92eLM3DaMNiAhfFAQYwywV3GCCbehw6JCc5e2KWXZtQxWG6pghjUq1ZFiH4TQ7ih2D1R2ceb8REWfFV',
			},
		};
	}

	connectedCallback() {
		this.innerHTML = `
			<div class="pay-requisites">
				<div class="pay-requisites__block">
					<div class="pay-requisites__block-title">Реквізити для донат через касу банку</div>
					<div class="pay-requisites__list">
						<span class="pay-requisite">ГО "ДЕМОКРАТИЧНА СОКИРА"</span>
						<span class="pay-requisite">Код ЄДРПОУ: ${this.reqs.bank.edr}</span>
						<span class="pay-requisite">Рахунок No: ${this.reqs.bank.account}</span>
						<span class="pay-requisite">МФО банку: ${this.reqs.bank.mfo}</span>
						<span class="pay-requisite">IBAN: ${this.reqs.bank.iban}</span>
						<span class="pay-requisite">Призначення платежу: ${this.reqs.bank.goal}</span>
					</div>
				</div>
				<div class="pay-requisites__block">
					<div class="pay-requisites__block-title">Критпа, сучасній партії сучасний донат</div>
					<span class="pay-requisites__desc">Всі вказані рахунки є транзитними, кошти з них будуть перераховані згідно чинного законодавства на рахунки громадської організації, а згодом партії.</span>
					<div class="pay-requisites__list">
						<span class="pay-requisite">BTC: ${this.reqs.crypto.btc}</span>
						<span class="pay-requisite">ETH: ${this.reqs.crypto.eth}</span>
						<span class="pay-requisite">DASH: ${this.reqs.crypto.dash}</span>
						<span class="pay-requisite">LTC: ${this.reqs.crypto.ltc}</span>
						<span class="pay-requisite">MONERO: ${this.reqs.crypto.monero}</span>
					</div>
				</div>
			</div>
		`;
	}
}

customElements.define('pay-requisites', payRequisites);
