# @prama13/n8n-nodes-pexels

[![npm version](https://img.shields.io/npm/v/@prama13/n8n-nodes-pexels.svg?style=flat-square)](https://www.npmjs.com/package/@prama13/n8n-nodes-pexels)
[![npm downloads](https://img.shields.io/npm/dm/@prama13/n8n-nodes-pexels.svg?style=flat-square)](https://www.npmjs.com/package/@prama13/n8n-nodes-pexels)
[![License](https://img.shields.io/npm/l/@prama13/n8n-nodes-pexels.svg?style=flat-square)](https://github.com/PramaAditya/n8n-nodes-pexels/blob/master/LICENSE.md)
[![n8n community node](https://img.shields.io/badge/n8n-community--node-EA4AAA.svg?style=flat-square)](https://docs.n8n.io/integrations/community-nodes/)

An elegant n8n community node that integrates with the Pexels API, allowing your automation workflows to seamlessly search, curate, and retrieve free high-resolution stock photos and videos.

## Hero Demo

```text
[ n8n Workflow Integration ]
┌────────────────┐      ┌─────────────────────────┐      ┌────────────────────────┐
│  Event / Cron  │ ───> │  Pexels Community Node  │ ───> │   HTTP / File Node     │
│  "Every Morning"│      │  • Resource: Photo      │      │  • Download image src  │
│  Trigger       │      │  • Operation: Search    │      │  • Post to Social Media│
└────────────────┘      └─────────────────────────┘      └────────────────────────┘
                                     │
                                     ▼
                          [ Response JSON Payload ]
                          {
                            "id": 2014422,
                            "width": 3024,
                            "height": 4032,
                            "url": "https://www.pexels.com/photo/...",
                            "photographer": "Pexels Creator",
                            "src": {
                              "original": "https://images.pexels.com/...",
                              "large": "https://images.pexels.com/..."
                            }
                          }
```

## Operations

This node supports the following resources and operations:

### ⚙️ Photo Resources
- **Search**: Query photos with options for color, orientation, size, locale, and pagination.
- **Get Curated**: Retrieve hand-picked photos curated by the Pexels team.
- **Get**: Get details of a specific photo using its ID.

### ⚙️ Video Resources
- **Search**: Search for videos matching a text query with orientation, size, locale, and pagination.
- **Get Popular**: Retrieve trending and popular videos with filters for duration and resolution.
- **Get**: Fetch details of a specific video by ID.

### ⚙️ Collection Resources
- **Get Featured**: Fetch Pexels' featured collections.
- **Get Many**: Retrieve a list of your own Pexels collections.
- **Get Media**: Extract and filter photos or videos contained within a specific collection.

## Installation

### Community Nodes UI (Recommended)
1. In your n8n instance, go to **Settings > Community Nodes**.
2. Click **Install a Node**.
3. Enter `@prama13/n8n-nodes-pexels` in the NPM Package Name field.
4. Agree to the terms and click **Install**.

### Command Line / Docker
If running a self-hosted or custom Docker setup, install the package in your n8n installation directory (typically `~/.n8n/nodes/`):
```bash
npm install @prama13/n8n-nodes-pexels
```

## Credentials Setup

To use the Pexels API, you need an API key:
1. Sign up or log in at the [Pexels Developer Portal](https://www.pexels.com/api/).
2. Request an API Key. Note the key shown in your dashboard.
3. In n8n, create a new **Pexels API** credential.
4. Paste your **API Key** into the credential fields and save.

## 📖 Minimum Viable Knowledge

- **Download Images/Videos**: The Pexels node outputs metadata containing direct URLs under `src` (for photos) or `video_files` (for videos). To download the actual file, pipe the URL into a standard n8n **HTTP Request** node and set the response format to **File/Binary**.
- **Pagination**: Pexels uses cursor-based/page pagination. Adjust `Page` and `Per Page` under `Additional Fields` to control your fetch payload size (maximum 80 items per request).
- **Rate Limits**: The Pexels API enforces a standard rate limit of 20,000 requests per month. Ensure your workflows do not call the node inside high-frequency loops.

## Structure

```text
.
├── credentials/
│   └── PexelsApi.credentials.ts  # Handles authentication details
├── nodes/
│   └── Pexels/
│       ├── Pexels.node.ts        # Node execution parameters & API routing
│       ├── pexels.svg            # Custom node icon (light mode)
│       └── pexels.dark.svg       # Custom node icon (dark mode)
└── package.json                  # Node metadata and dependencies
```

## License

[MIT License](LICENSE.md)
