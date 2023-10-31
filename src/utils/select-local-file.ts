import path from 'node:path';

interface IProps {
	applicationName: string;
	fileName: string;
}

export function selectLocalFile({ applicationName, fileName }: IProps): string | null {
	let localPath: string | null = '';

	switch (applicationName) {
		case 'Caixa': {
			localPath = path.resolve(process.cwd(), 'tmp', 'applications', 'Caixa', fileName);
			return localPath;
		}
		case 'Consist/SIB': {
			localPath = path.resolve(process.cwd(), 'tmp', 'applications', 'Consist', fileName);
			return localPath;
		}
		case 'Etiquetas': {
			localPath = path.resolve(process.cwd(), 'tmp', 'applications', 'Etiqueta', fileName);
			return localPath;
		}
		case 'Gerador NFCe': {
			localPath = path.resolve(process.cwd(), 'tmp', 'applications', 'GeradorNFCe', fileName);
			return localPath;
		}
		case 'Inbound': {
			localPath = path.resolve(process.cwd(), 'tmp', 'applications', 'Inbound', fileName);
			return localPath;
		}
		case 'Monitor': {
			localPath = path.resolve(process.cwd(), 'tmp', 'applications', 'Monitor', fileName);
			return localPath;
		}
		case 'Outbound': {
			localPath = path.resolve(process.cwd(), 'tmp', 'applications', 'Outbound', fileName);
			return localPath;
		}
		case 'PagamentoTEF na Pré-venda': {
			localPath = path.resolve(process.cwd(), 'tmp', 'applications', 'PagamentoTEF', fileName);
			return localPath;
		}
		case 'Pré-venda': {
			localPath = path.resolve(process.cwd(), 'tmp', 'applications', 'Prevenda', fileName);
			return localPath;
		}
		case 'RestServer': {
			localPath = path.resolve(process.cwd(), 'tmp', 'applications', 'RestServer', fileName);
			return localPath;
		}
		case 'SAC': {
			localPath = path.resolve(process.cwd(), 'tmp', 'applications', 'SAC', fileName);
			return localPath;
		}
		case 'srvnfce': {
			localPath = path.resolve(process.cwd(), 'tmp', 'applications', 'srvnfce', fileName);
			return localPath;
		}
		case 'Supervisora': {
			localPath = path.resolve(process.cwd(), 'tmp', 'applications', 'Supervisora', fileName);
			return localPath;
		}

		default:
			localPath = null;
			return localPath;
	}
}
