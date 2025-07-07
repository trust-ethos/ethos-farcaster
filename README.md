# Ethos × Farcaster Mini App

A Mini App that brings Ethos credibility scores to the Farcaster ecosystem, helping users understand trust and credibility within the decentralized social network.

## 🚀 Features

- **Credibility Scoring**: View detailed credibility scores for Farcaster users
- **Attestation System**: Peer-to-peer feedback and attestations
- **Network Analysis**: Trust network visualization and analysis
- **Seamless Integration**: Native Farcaster Mini App experience
- **Real-time Updates**: Dynamic credibility score updates

## 🛠️ Tech Stack

- **Runtime**: Deno
- **Framework**: Fresh (Preact-based)
- **Styling**: Twind (Tailwind CSS)
- **SDK**: Farcaster Mini App SDK
- **Authentication**: Quick Auth (Sign In with Farcaster)
- **Deployment**: Deno Deploy

## 📋 Prerequisites

- Node.js 22.11.0 or higher
- Deno 1.40.0 or higher
- A Farcaster account for testing

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ethos-farcaster-miniapp
   ```

2. **Install dependencies**
   ```bash
   deno cache --reload deno.json
   ```

3. **Start the development server**
   ```bash
   deno task start
   ```

4. **Open your browser**
   Navigate to `http://localhost:8000`

## 📁 Project Structure

```
ethos-farcaster-miniapp/
├── routes/
│   ├── _app.tsx           # Main app layout
│   ├── _404.tsx           # 404 error page
│   ├── index.tsx          # Landing page
│   ├── miniapp.tsx        # Mini app main page
│   └── api/
│       └── credibility/
│           └── [fid].ts   # Credibility API endpoint
├── static/
│   ├── sdk-init.js        # SDK initialization
│   └── miniapp-client.js  # Mini app client logic
├── types/
│   └── ethos.ts          # TypeScript type definitions
├── deno.json             # Deno configuration
├── fresh.config.ts       # Fresh framework config
├── twind.config.ts       # Twind (CSS) configuration
├── fresh.gen.ts          # Fresh manifest (auto-generated)
├── dev.ts                # Development server
└── main.ts               # Production server
```

## 🔧 API Endpoints

### Get Credibility Score
```
GET /api/credibility/[fid]
```

Returns credibility data for a specific Farcaster ID (FID).

**Response:**
```json
{
  "fid": 123,
  "score": 92,
  "attestations": 156,
  "networkScore": 88,
  "rank": 42,
  "lastUpdated": "2024-01-15T10:30:00Z",
  "breakdown": {
    "trustworthiness": 95,
    "expertise": 87,
    "reliability": 94,
    "engagement": 92
  }
}
```

## 🎨 Customization

### Colors
The app uses a custom color palette defined in `twind.config.ts`:
- **Ethos**: Primary brand colors
- **Farcaster**: Official Farcaster colors

### Components
- Modify `routes/_app.tsx` for global layout changes
- Update `routes/miniapp.tsx` for mini app UI
- Edit `static/miniapp-client.js` for client-side functionality

## 🚀 Deployment

### Deno Deploy
1. Build the project:
   ```bash
   deno task build
   ```

2. Deploy to Deno Deploy:
   ```bash
   deployctl deploy --project=ethos-farcaster main.ts
   ```

### Environment Variables
Set these in your deployment environment:
- `ETHOS_API_KEY`: Your Ethos API key
- `ETHOS_API_URL`: Ethos API endpoint URL

## 🔗 Integration with Ethos

To integrate with the actual Ethos API:

1. **Update API calls** in `routes/api/credibility/[fid].ts`
2. **Configure authentication** for Ethos API
3. **Map Farcaster FIDs** to Ethos user identifiers

## 📱 Mini App Features

### Current Features
- ✅ User authentication via Farcaster
- ✅ Credibility score display
- ✅ Score breakdown visualization
- ✅ User search functionality

### Planned Features
- 🔄 Real-time attestation submission
- 🔄 Network visualization
- 🔄 Comparative analytics
- 🔄 Reputation history tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
- Create an issue on GitHub
- Join our Discord community
- Email: support@ethos.com

## 🔗 Links

- [Farcaster Mini Apps Documentation](https://miniapps.farcaster.xyz)
- [Ethos Platform](https://ethos.com)
- [Fresh Framework](https://fresh.deno.dev)
- [Deno Deploy](https://deno.com/deploy) 