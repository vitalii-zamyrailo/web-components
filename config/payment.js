export const payment = {
	api: {
		version: 3,
		url: 'https://s.izzinine.com/api',
		refs: {
			signature: { method: 'POST', path: '/magic/' },
			paymentResult: { method: 'POST', path: '/form/' },
		},
	},
	publicKey: 'i59295264359',
	currency: 'UAH',
	description: 'Добровільна пожертва на здійснення статутної діяльності ГО "Демократична сокира"',
	lang: 'uk',
	subscribe: {
		flag: 1,
		dateStart: 'now',
		periodicity: 'month',
	},
	widget: {
		lang: 'ru',
		mode: 'popup',
	},
}
