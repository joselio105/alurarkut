import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons";

const ProfileSideBar = ( {githubUser} ) => {
  return (
    <Box>
      <img src={`http://github.com/${githubUser}.png`} style={{ borderRadius: '8px' }} />
    </Box>
  );
  
}

export default function Home() {

  const githubUser = "joselio105";
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ];

  return (
    <>
      <AlurakutMenu />

      <MainGrid>
        <div className="profileAra" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={ githubUser } />
        </div>
        
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1>Bem Vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>
        </div>
        
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Pessoas da Comunidade ({pessoasFavoritas.length})</h2>
            
            <ul>
              {
                pessoasFavoritas.map(githubUser => (
                  <li>
                    <a href={`/users/${githubUser}`} key={githubUser} >
                      <img src={`http://github.com/${githubUser}.png`} style={{ borderRadius: '8px' }} />
                      <span>{githubUser}</span>
                    </a>
                  </li>
                ))
              }
            </ul>
            
          </ProfileRelationsBoxWrapper>

          <Box>
            Comunidade
          </Box>
        </div>

      </MainGrid>
   </> 
  )
}
