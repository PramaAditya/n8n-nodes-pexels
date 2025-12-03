import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

export class Pexels implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Pexels',
		name: 'pexels',
		icon: { light: 'file:pexels.svg', dark: 'file:pexels.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Pexels API',
		defaults: {
			name: 'Pexels',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'pexelsApi',
				required: true,
			},
		],
		properties: [
			// Resource
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Photo',
						value: 'photo',
					},
					{
						name: 'Video',
						value: 'video',
					},
					{
						name: 'Collection',
						value: 'collection',
					},
				],
				default: 'photo',
			},

			// Photo Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['photo'],
					},
				},
				options: [
					{
						name: 'Search',
						value: 'search',
						description: 'Search for photos',
						action: 'Search photos',
					},
					{
						name: 'Get Curated',
						value: 'getCurated',
						description: 'Get curated photos',
						action: 'Get curated photos',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a photo by ID',
						action: 'Get a photo',
					},
				],
				default: 'search',
			},

			// Video Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['video'],
					},
				},
				options: [
					{
						name: 'Search',
						value: 'search',
						description: 'Search for videos',
						action: 'Search videos',
					},
					{
						name: 'Get Popular',
						value: 'getPopular',
						description: 'Get popular videos',
						action: 'Get popular videos',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a video by ID',
						action: 'Get a video',
					},
				],
				default: 'search',
			},

			// Collection Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['collection'],
					},
				},
				options: [
					{
						name: 'Get Featured',
						value: 'getFeatured',
						description: 'Get featured collections',
						action: 'Get featured collections',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many your collections',
						action: 'Get many collections',
					},
					{
						name: 'Get Media',
						value: 'getMedia',
						description: 'Get media from a collection',
						action: 'Get collection media',
					},
				],
				default: 'getFeatured',
			},

			// Photo Search Parameters
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['photo', 'video'],
						operation: ['search'],
					},
				},
				default: '',
				description: 'Search query (e.g., "Nature", "Tigers", "People")',
			},

			// Photo ID
			{
				displayName: 'Photo ID',
				name: 'photoId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['photo'],
						operation: ['get'],
					},
				},
				default: '',
				description: 'The ID of the photo to retrieve',
			},

			// Video ID
			{
				displayName: 'Video ID',
				name: 'videoId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['video'],
						operation: ['get'],
					},
				},
				default: '',
				description: 'The ID of the video to retrieve',
			},

			// Collection ID
			{
				displayName: 'Collection ID',
				name: 'collectionId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['getMedia'],
					},
				},
				default: '',
				description: 'The ID of the collection',
			},

			// Additional Options
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['photo'],
						operation: ['search'],
					},
				},
				options: [
					{
						displayName: 'Color',
						name: 'color',
						type: 'color',
						default: '',
						description: 'Desired photo color (e.g., "red", "blue", "#ffffff")',
					},
					{
						displayName: 'Locale',
						name: 'locale',
						type: 'string',
						default: 'en-US',
						description: 'The locale of the search (e.g., en-US, pt-BR, es-ES)',
					},
					{
						displayName: 'Orientation',
						name: 'orientation',
						type: 'options',
						options: [
							{
								name: 'Landscape',
								value: 'landscape',
							},
							{
								name: 'Portrait',
								value: 'portrait',
							},
							{
								name: 'Square',
								value: 'square',
							},
						],
						default: 'landscape',
						description: 'Desired photo orientation',
					},
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: 1,
						description: 'Page number',
					},
					{
						displayName: 'Per Page',
						name: 'per_page',
						type: 'number',
						typeOptions: {
							minValue: 1,
							maxValue: 80,
						},
						default: 15,
						description: 'Number of results per page (max 80)',
					},
					{
						displayName: 'Size',
						name: 'size',
						type: 'options',
						options: [
							{
								name: 'Large (24MP)',
								value: 'large',
							},
							{
								name: 'Medium (12MP)',
								value: 'medium',
							},
							{
								name: 'Small (4MP)',
								value: 'small',
							},
						],
						default: 'large',
						description: 'Minimum photo size',
					},
				],
			},

			// Video Search Additional Fields
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['video'],
						operation: ['search'],
					},
				},
				options: [
					{
						displayName: 'Locale',
						name: 'locale',
						type: 'string',
						default: 'en-US',
						description: 'The locale of the search (e.g., en-US, pt-BR, es-ES)',
					},
					{
						displayName: 'Orientation',
						name: 'orientation',
						type: 'options',
						options: [
							{
								name: 'Landscape',
								value: 'landscape',
							},
							{
								name: 'Portrait',
								value: 'portrait',
							},
							{
								name: 'Square',
								value: 'square',
							},
						],
						default: 'landscape',
						description: 'Desired video orientation',
					},
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: 1,
						description: 'Page number',
					},
					{
						displayName: 'Per Page',
						name: 'per_page',
						type: 'number',
						typeOptions: {
							minValue: 1,
							maxValue: 80,
						},
						default: 15,
						description: 'Number of results per page (max 80)',
					},
					{
						displayName: 'Size',
						name: 'size',
						type: 'options',
						options: [
							{
								name: 'Large (4K)',
								value: 'large',
							},
							{
								name: 'Medium (Full HD)',
								value: 'medium',
							},
							{
								name: 'Small (HD)',
								value: 'small',
							},
						],
						default: 'large',
						description: 'Minimum video size',
					},
				],
			},

			// Video Popular Additional Fields
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['video'],
						operation: ['getPopular'],
					},
				},
				options: [
					{
						displayName: 'Max Duration',
						name: 'max_duration',
						type: 'number',
						default: 0,
						description: 'Maximum duration in seconds',
					},
					{
						displayName: 'Min Duration',
						name: 'min_duration',
						type: 'number',
						default: 0,
						description: 'Minimum duration in seconds',
					},
					{
						displayName: 'Min Height',
						name: 'min_height',
						type: 'number',
						default: 0,
						description: 'Minimum height in pixels',
					},
					{
						displayName: 'Min Width',
						name: 'min_width',
						type: 'number',
						default: 0,
						description: 'Minimum width in pixels',
					},
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: 1,
						description: 'Page number',
					},
					{
						displayName: 'Per Page',
						name: 'per_page',
						type: 'number',
						typeOptions: {
							minValue: 1,
							maxValue: 80,
						},
						default: 15,
						description: 'Number of results per page (max 80)',
					},
				],
			},

			// Curated Photos Additional Fields
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['photo'],
						operation: ['getCurated'],
					},
				},
				options: [
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: 1,
						description: 'Page number',
					},
					{
						displayName: 'Per Page',
						name: 'per_page',
						type: 'number',
						typeOptions: {
							minValue: 1,
							maxValue: 80,
						},
						default: 15,
						description: 'Number of results per page (max 80)',
					},
				],
			},

			// Collection Additional Fields
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['getFeatured', 'getAll'],
					},
				},
				options: [
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: 1,
						description: 'Page number',
					},
					{
						displayName: 'Per Page',
						name: 'per_page',
						type: 'number',
						typeOptions: {
							minValue: 1,
							maxValue: 80,
						},
						default: 15,
						description: 'Number of results per page (max 80)',
					},
				],
			},

			// Collection Media Additional Fields
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['collection'],
						operation: ['getMedia'],
					},
				},
				options: [
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						options: [
							{
								name: 'All',
								value: '',
							},
							{
								name: 'Photos',
								value: 'photos',
							},
							{
								name: 'Videos',
								value: 'videos',
							},
						],
						default: '',
						description: 'Filter by media type',
					},
					{
						displayName: 'Sort',
						name: 'sort',
						type: 'options',
						options: [
							{
								name: 'Ascending',
								value: 'asc',
							},
							{
								name: 'Descending',
								value: 'desc',
							},
						],
						default: 'asc',
						description: 'Sort order',
					},
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: 1,
						description: 'Page number',
					},
					{
						displayName: 'Per Page',
						name: 'per_page',
						type: 'number',
						typeOptions: {
							minValue: 1,
							maxValue: 80,
						},
						default: 15,
						description: 'Number of results per page (max 80)',
					},
				],
			},
		],
		usableAsTool: true,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let endpoint = '';
				const method = 'GET' as const;
				const qs: IDataObject = {};
				let baseUrl = 'https://api.pexels.com/v1';

				if (resource === 'photo') {
					if (operation === 'search') {
						endpoint = '/search';
						qs.query = this.getNodeParameter('query', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(qs, additionalFields);
					} else if (operation === 'getCurated') {
						endpoint = '/curated';
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(qs, additionalFields);
					} else if (operation === 'get') {
						const photoId = this.getNodeParameter('photoId', i) as string;
						endpoint = `/photos/${photoId}`;
					}
				} else if (resource === 'video') {
					baseUrl = 'https://api.pexels.com/videos';
					if (operation === 'search') {
						endpoint = '/search';
						qs.query = this.getNodeParameter('query', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(qs, additionalFields);
					} else if (operation === 'getPopular') {
						endpoint = '/popular';
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(qs, additionalFields);
					} else if (operation === 'get') {
						const videoId = this.getNodeParameter('videoId', i) as string;
						endpoint = `/videos/${videoId}`;
					}
				} else if (resource === 'collection') {
					if (operation === 'getFeatured') {
						endpoint = '/collections/featured';
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(qs, additionalFields);
					} else if (operation === 'getAll') {
						endpoint = '/collections';
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(qs, additionalFields);
					} else if (operation === 'getMedia') {
						const collectionId = this.getNodeParameter('collectionId', i) as string;
						endpoint = `/collections/${collectionId}`;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(qs, additionalFields);
					}
				}

				const response = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'pexelsApi',
					{
						method,
						url: `${baseUrl}${endpoint}`,
						qs,
						json: true,
					},
				);

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(response as IDataObject),
					{ itemData: { item: i } },
				);

				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: error.message },
						pairedItem: { item: i },
					});
					continue;
				}
				throw new NodeOperationError(this.getNode(), error, {
					itemIndex: i,
				});
			}
		}

		return [returnData];
	}
}