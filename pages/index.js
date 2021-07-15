import React, { useState } from "react";

import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons";

const ProfileSideBar = ( {githubUser} ) => {
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

export default function Home() {

  const [ comunidades, setComunidades ] = useState([]);

  const githubUser = "joselio105";
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ];

  const handleSubmit = event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const comunidade = {
      id: new Date().toISOString,
      title: formData.get('title'),
      image: formData.get('image')
    }

    setComunidades( [...comunidades, comunidade] );
  }

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />

      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={ githubUser } />
        </div>
        
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1>Bem Vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <form onSubmit={ handleSubmit }>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da comunidade?"
                  name="title"
                  type="text"
                  aria-label="Qual vai ser o nome da comunidade?"
                />
              </div>
              <div>
                <input 
                  placeholder="Coloque uma url para usarmos de capa"
                  name="image"
                  type="url"
                  aria-label="Coloque uma url para usarmos de capa"
                />
              </div>
              <button>
                Criar Comunidade
              </button>              
            </form>
          </Box>
        </div>
        
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>            
            <ul>
              {
                comunidades.map(itemAtual => (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`} >
                      <img src={itemAtual.image} style={{ borderRadius: '8px' }} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                ))
              }
            </ul>            
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Pessoas da Comunidade ({pessoasFavoritas.length})</h2>            
            <ul>
              {
                pessoasFavoritas.map(githubUser => (
                  <li key={githubUser}>
                    <a href={`/users/${githubUser}`} >
                      <img src={`http://github.com/${githubUser}.png`} style={{ borderRadius: '8px' }} />
                      <span>{githubUser}</span>
                    </a>
                  </li>
                ))
              }
            </ul>            
          </ProfileRelationsBoxWrapper>
        </div>

      </MainGrid>
   </> 
  )
}
