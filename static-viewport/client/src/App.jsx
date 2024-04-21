import './App.css';
import Layout from './layout/layout';
import { DataProvider } from './context/DataContext';
import { useEffect,useState } from 'react';
import { DiscordSDK,patchUrlMappings } from "@discord/embedded-app-sdk";
import { getUserAvatarUrl } from './utils/getUserAvatarUrl';


function App() {
  //const discordSdk = new DiscordSDK(process.env.VITE_DISCORD_CLIENT_ID);
  const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);

  patchUrlMappings([{prefix: '/c', target: 'unpkg.com'},
  {prefix: '/a', target: "s3.amazonaws.com"},
]);
  const [username, setUsername] = useState("placeholder")
  const [avatarSrc, setAvatarSrc] = useState(`https://cdn.discordapp.com/embed/avatars/${1}.png`)
  useEffect(() => {
    console.log("App loaded")
    const setupDiscordSdk = async()=> {
  
      await discordSdk.ready();
      const {enabled} = await discordSdk.commands.encourageHardwareAcceleration();
      console.log(`Hardware Acceleration is ${enabled === true ? 'enabled' : 'disabled'}`);
      
      const {code}  = await discordSdk.commands.authorize({
        client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
        response_type: "code",
        state: "",
        prompt: "none",
        scope: [
          "identify",
          "guilds",
        ],
      }); 
      console.log(code)
      const response = await fetch("api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
        }),
      });
      console.log("response",response)
      const {access_token}  = await response.json();
      console.log("token",access_token)
      // Authenticate with Discord client (using the access_token)
      const newAuth = await discordSdk.commands.authenticate({
        access_token,
      });
    
      if (newAuth == null) {
       console.log("failed")
      }    
      

      //const avatarURI = getUserAvatarUrl({guildMember:null,user:newAuth.user})

      setUsername(newAuth.user.username)
    }
    setupDiscordSdk();
    
  }, []);


  return (
    <div className="App">
      <DataProvider>
 
        <p style={{ color: 'white' }}>{username}</p>
        <Layout />
      </DataProvider>
    </div>
  );
}

export default App;
