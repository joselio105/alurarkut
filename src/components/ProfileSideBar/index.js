import Box from "../Box";
import { AlurakutProfileSidebarMenuDefault } from "../../lib/AlurakutCommons";

export default function ProfileSideBar( { githubUser } ){
    return (
        <Box as="aside">
          <img src={`http://github.com/${githubUser}.png`} style={{ borderRadius: '8px' }} />
          <hr />
          
          <a className="boxLink" href={`http://github.com/${githubUser}`} >
            @{githubUser}
          </a>
          <hr />
    
          <AlurakutProfileSidebarMenuDefault />
        </Box>
      );  
}