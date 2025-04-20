# Clay Smart Search Monorepo

This is a monorepo containing both the frontend React application and backend Node.js server.

## Project Structure

```
clay-smart-search/
├── apps/
│   ├── frontend/     # React application
│   │   ├── src/
│   │   ├── public/
│   │   └── package.json
│   └── backend/      # Node.js server
│       ├── src/
│       └── package.json
└── package.json      # Root package.json for workspace management
```

## Development

1. Install dependencies:
```bash
npm install
```

2. Start both frontend and backend in development mode:
```bash
npm run dev
```

Or run them separately:
- Frontend only: `npm run frontend`
- Backend only: `npm run backend`

## Deployment on Vercel

This project is set up for deployment on Vercel with the following configuration:

### Frontend Deployment
1. Create a new project in Vercel
2. Set the root directory to `apps/frontend`
3. Build command: `npm run build`
4. Output directory: `build`
5. Install command: `npm install`

### Backend Deployment
1. Create a new project in Vercel
2. Set the root directory to `apps/backend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Install command: `npm install`

### Environment Variables
Make sure to set up the following environment variables in Vercel:

Frontend:
- `REACT_APP_API_URL`: URL of your backend API

Backend:
- `PORT`: Port number (optional, defaults to 3001)

## Notes
- Frontend and backend are deployed as separate projects on Vercel for better scalability and independent deployment cycles
- Each project can have its own custom domain or use Vercel's provided domains
- Make sure to update CORS settings in the backend to allow requests from your frontend domain
