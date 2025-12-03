import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class PexelsApi implements ICredentialType {
	name = 'pexelsApi';

	displayName = 'Pexels API';

	documentationUrl = 'https://www.pexels.com/api/documentation/';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{$credentials?.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.pexels.com/v1',
			url: '/curated',
			method: 'GET',
			qs: {
				per_page: 1,
			},
		},
	};
}