import { sapApi } from '@/libs/axios';
import { IStoreRepository } from '@/repositories/implementations/IStoreRepository';

interface IWatchStoresDatabaseUseCaseResponse {
	message: string;
}

export class WatchStoresDatabaseUseCase {
	constructor(private storeRepository: IStoreRepository) {}

	async execute(): Promise<IWatchStoresDatabaseUseCaseResponse> {
		const { data: sapStores } = await sapApi.get<ISapStores[]>('/get_lojas');

		const { stores } = await this.storeRepository.index({
			search: '',
			page: 1,
			perPage: 9999,
		});

		const differenceBetweenLists = sapStores.filter((sapStore) => {
			return !stores.some((store) => store.ip === sapStore.IP);
		});

		if (differenceBetweenLists.length === 0) {
			return {
				message: `A lista de lojas está atualizada.`,
			};
		}

		const listToCreateStores = differenceBetweenLists.map((store) => {
			return {
				id_loja: Number(store.ID_LOJA),
				name: store.NAME,
				ip: store.IP,
			};
		});

		const result = await this.storeRepository.createMany(listToCreateStores);

		return {
			message: `Foram inserido(s) ${result} registro(s) com sucesso.`,
		};
	}
}

const mockData = [
	{
		id_loja: '100',
		name: 'ESCRITORIO CENTRAL',
		ip: '180.200.1.200',
	},
	{
		id_loja: '101',
		name: 'MATRIZ',
		ip: '172.20.20.200',
	},
	{
		id_loja: '102',
		name: 'ONLINE',
		ip: '180.200.1.200',
	},
	{
		id_loja: '103',
		name: 'AVENIDA',
		ip: '172.20.82.200',
	},
	{
		id_loja: '104',
		name: 'C.D. MANAUS',
		ip: '172.20.1.200',
	},
	{
		id_loja: '105',
		name: 'EDUCANDOS',
		ip: '192.168.105.200',
	},
	{
		id_loja: '106',
		name: 'SHOPPING',
		ip: '172.20.8.200',
	},
	{
		id_loja: '107',
		name: 'BARROSO',
		ip: '192.168.107.200',
	},
	{
		id_loja: '109',
		name: 'GRANDE CIRCULAR',
		ip: '172.20.14.200',
	},
	{
		id_loja: '114',
		name: 'PONTA NEGRA',
		ip: '172.20.24.200',
	},
	{
		id_loja: '115',
		name: 'CIDADE NOVA',
		ip: '192.168.13.200',
	},
	{
		id_loja: '116',
		name: 'STUDIO5',
		ip: '172.20.80.200',
	},
	{
		id_loja: '117',
		name: 'MILLENNIUM',
		ip: '172.20.28.200',
	},
	{
		id_loja: '118',
		name: 'CAMAPUA',
		ip: '172.20.10.200',
	},
	{
		id_loja: '119',
		name: 'MANAUARA',
		ip: '172.20.22.200',
	},
	{
		id_loja: '120',
		name: 'PONTA NEGRA SHOPPING',
		ip: '172.20.26.200',
	},
	{
		id_loja: '121',
		name: 'NOVA CIDADE',
		ip: '172.20.30.200',
	},
	{
		id_loja: '122',
		name: 'TELEVENDAS VAREJO',
		ip: '172.20.160.200',
	},
	{
		id_loja: '144',
		name: 'C.D. MANAUS 2',
		ip: '172.20.1.200',
	},
	{
		id_loja: '170',
		name: 'C.D. PORTO DE MANAUS',
		ip: '172.20.1.200',
	},
	{
		id_loja: '201',
		name: 'PORTO VELHO',
		ip: '172.20.32.200',
	},
	{
		id_loja: '202',
		name: 'PORTO VELHO SHOPPING',
		ip: '192.168.202.200',
	},
	{
		id_loja: '203',
		name: 'C.D. PORTO VELHO',
		ip: '192.168.203.200',
	},
	{
		id_loja: '204',
		name: 'JATUARANA',
		ip: '172.20.84.200',
	},
	{
		id_loja: '205',
		name: 'JI-PARANA',
		ip: '172.20.38.200',
	},
	{
		id_loja: '206',
		name: 'ARIQUEMES',
		ip: '172.20.34.200',
	},
	{
		id_loja: '401',
		name: 'RIO BRANCO',
		ip: '192.168.41.200',
	},
	{
		id_loja: '402',
		name: 'C.D. RIO BRANCO',
		ip: '192.168.42.200',
	},
	{
		id_loja: '404',
		name: 'CRUZEIRO DO SUL',
		ip: '172.20.92.200',
	},
	{
		id_loja: '500',
		name: 'TORQUATO',
		ip: '172.20.0.200',
	},
	{
		id_loja: '510',
		name: 'ITACOATIARA',
		ip: '192.168.51.200',
	},
	{
		id_loja: '520',
		name: 'MANACAPURU',
		ip: '192.168.52.200',
	},
	{
		id_loja: '530',
		name: 'PRESIDENTE FIGUEIRED',
		ip: '172.20.36.200',
	},
	{
		id_loja: '531',
		name: 'AUTAZES',
		ip: '172.20.86.200',
	},
	{
		id_loja: '550',
		name: 'IRANDUBA',
		ip: '172.20.56.200',
	},
	{
		id_loja: '560',
		name: 'RIO PRETO DA EVA',
		ip: '172.20.89.200',
	},
	{
		id_loja: '561',
		name: 'CODAJAS',
		ip: '172.20.90.200',
	},
	{
		id_loja: '570',
		name: 'MANAQUIRI',
		ip: '172.20.50.200',
	},
	{
		id_loja: '580',
		name: 'CAREIRO CASTANHO',
		ip: '172.20.53.200',
	},
	{
		id_loja: '590',
		name: 'PARINTINS',
		ip: '172.20.58.200',
	},
	{
		id_loja: '591',
		name: 'COARI',
		ip: '172.20.60.200',
	},
	{
		id_loja: '600',
		name: 'FARMACIA ONLINE',
		ip: '172.20.0.197',
	},
	{
		id_loja: '601',
		name: 'FARMACIA TORQUATO',
		ip: '172.20.0.199',
	},
	{
		id_loja: '602',
		name: 'FARMACIA CAMAPUA',
		ip: '172.20.10.199',
	},
	{
		id_loja: '603',
		name: 'FARMACIA SHOPPING',
		ip: '172.20.8.199',
	},
	{
		id_loja: '604',
		name: 'FARMACIA G.CIRCULAR',
		ip: '172.20.14.199',
	},
	{
		id_loja: '605',
		name: 'FARMACIA MATRIZ',
		ip: '172.20.20.199',
	},
	{
		id_loja: '606',
		name: 'FARMACIA SHOP.P.NEGR',
		ip: '172.20.26.199',
	},
	{
		id_loja: '607',
		name: 'FARMACIA NOVA CIDADE',
		ip: '172.20.30.199',
	},
	{
		id_loja: '608',
		name: 'FARMACIA MILLENNIUM',
		ip: '172.20.28.199',
	},
	{
		id_loja: '609',
		name: 'FARMACIA PORTO VELHO',
		ip: '172.20.32.199',
	},
	{
		id_loja: '610',
		name: 'FARMACIA BOA VISTA',
		ip: '172.20.12.199',
	},
	{
		id_loja: '611',
		name: 'FARMACIA ITACOATIARA',
		ip: '192.168.51.199',
	},
	{
		id_loja: '612',
		name: 'FARMACIA MANAUARA',
		ip: '172.20.22.199',
	},
	{
		id_loja: '613',
		name: 'FARMACIA ARIQUEMES',
		ip: '172.20.34.199',
	},
	{
		id_loja: '614',
		name: 'FARMACIA P.FIGUEIRED',
		ip: '172.20.36.199',
	},
	{
		id_loja: '615',
		name: 'FARMACIA DJALMA',
		ip: '172.20.40.199',
	},
	{
		id_loja: '616',
		name: 'FARMACIA JI-PARANA',
		ip: '172.20.38.199',
	},
	{
		id_loja: '617',
		name: 'FARMACIA PONTA NEGRA',
		ip: '172.20.24.199',
	},
	{
		id_loja: '618',
		name: 'FARMACIA STUDIO 5',
		ip: '172.20.80.199',
	},
	{
		id_loja: '619',
		name: 'FARMACIA JATUARANA',
		ip: '172.20.84.199',
	},
	{
		id_loja: '620',
		name: 'FARMACIA AVENIDA',
		ip: '172.20.82.199',
	},
	{
		id_loja: '621',
		name: 'FARMACIA CIDADE NOVA',
		ip: '192.168.13.199',
	},
	{
		id_loja: '622',
		name: 'FARMACIA AUTAZES',
		ip: '172.20.86.199',
	},
	{
		id_loja: '623',
		name: 'FARMACIA ATAIDE TEIV',
		ip: '172.20.87.199',
	},
	{
		id_loja: '624',
		name: 'FARMACIA MANACAPURU',
		ip: '192.168.52.199',
	},
	{
		id_loja: '625',
		name: 'FARMACIA RIO BRANCO',
		ip: '192.168.41.199',
	},
	{
		id_loja: '626',
		name: 'FARMACIA RORAINOPOLI',
		ip: '172.20.88.199',
	},
	{
		id_loja: '627',
		name: 'FARMACIA GETULIO VAR',
		ip: '172.20.47.199',
	},
	{
		id_loja: '628',
		name: 'FARMACIA EDUARDO GOM',
		ip: '172.20.46.199',
	},
	{
		id_loja: '629',
		name: 'FARMACIA RIO PRETO D',
		ip: '172.20.89.199',
	},
	{
		id_loja: '630',
		name: 'FARMACIA CODAJAS',
		ip: '172.20.90.199',
	},
	{
		id_loja: '631',
		name: 'FARMACIA SHOPPING PV',
		ip: '192.168.202.199',
	},
	{
		id_loja: '632',
		name: 'FARMACIA CRUZEIRO DO',
		ip: '172.20.92.199',
	},
	{
		id_loja: '633',
		name: 'FARMACIA MANAQUIRI',
		ip: '172.20.50.199',
	},
	{
		id_loja: '634',
		name: 'FARMACIA MAJOR WILLI',
		ip: '172.20.48.199',
	},
	{
		id_loja: '635',
		name: 'FARMACIA CAREIRO',
		ip: '172.20.53.199',
	},
	{
		id_loja: '636',
		name: 'FARMACIA DOM PEDRO',
		ip: '172.20.54.199',
	},
	{
		id_loja: '637',
		name: 'FARMACIA BOULEVARD',
		ip: '172.20.55.199',
	},
	{
		id_loja: '638',
		name: 'FARMACIA IRANDUBA',
		ip: '172.20.56.199',
	},
	{
		id_loja: '639',
		name: 'FARMACIA PARINTINS',
		ip: '172.20.58.199',
	},
	{
		id_loja: '640',
		name: 'FARMACIA COARI',
		ip: '172.20.60.199',
	},
	{
		id_loja: '696',
		name: 'TELEVENDAS FARMA',
		ip: '172.20.160.199',
	},
	{
		id_loja: '701',
		name: 'BOA VISTA',
		ip: '172.20.12.200',
	},
	{
		id_loja: '702',
		name: 'ATAIDE TEIVE',
		ip: '172.20.87.200',
	},
	{
		id_loja: '703',
		name: 'RORAINOPOLIS',
		ip: '172.20.88.200',
	},
	{
		id_loja: '704',
		name: 'C.D. BOA VISTA',
		ip: '172.20.12.200',
	},
	{
		id_loja: '705',
		name: 'BV GETULIO VARGAS',
		ip: '172.20.47.200',
	},
	{
		id_loja: '706',
		name: 'BV MAJOR WILLIAMS',
		ip: '172.20.48.200',
	},
	{
		id_loja: '801',
		name: 'MERCADO CAMAPUA',
		ip: '172.20.10.197',
	},
];
