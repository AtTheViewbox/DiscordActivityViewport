# TemplateStaticCornerstone3DViewport
Refer to [this](https://discord.com/developers/docs/activities/building-an-activity) for setup

Navigate to folder and install dependency
```
cd static-viewport 
npm install
```

Create .env file in static-viewport
```
VITE_DISCORD_CLIENT_ID=YOUR_OAUTH2_CLIENT_ID_HERE
DISCORD_CLIENT_SECRET=YOUR_OAUTH2_CLIENT_SECRET_HERE
```

Navigate to client and run with Vite and proxy
```
cd client 
npm run dev
cloudflared tunnel --url http://localhost:5173
```

Navigate to server and run 
```
cd server 
npm install
npm run dev
```
Change the env variables in server/src/app.ts if necessary
```
      client_id: process.env.VITE_CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
```


Navigate to [discord](https://discord.com/developers/applications) and URl Mapping

Use 
```
Prefix: /, tagert: the proxy link(i.e. korean-troy-bars-canon.trycloudflare.com)
Prefix: /amazon, Target: s3.amazonaws.com
Prefix: /cornerstone, Target: unpkg.com
```
