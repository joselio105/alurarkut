import React, { useState, useEffect } from "react";

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

const ProfileRelationsBox = ( { title, itens} ) => (
  <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">{title} ({itens.length})</h2>            
    <ul>
      {
        itens.map(itemAtual => (
          <li key={itemAtual.id}>
            <a href={`/users/${itemAtual.title}`} >
              <img src={itemAtual.imageUrl} style={{ borderRadius: '8px' }} />
              <span>{itemAtual.title}</span>
            </a>
          </li>
        ))
      }
    </ul>            
  </ProfileRelationsBoxWrapper>
);

export default function Home() {

  const [ comunidades, setComunidades ] = useState([]);
  const [ seguidores, setSeguidores ] = useState([]);

  const githubUser = "peas";
  const folowersUrl = `https://api.github.com/users/${githubUser}/followers`;

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
      title: formData.get('title'),
      imageUrl: formData.get('image'),
      creatorSlug: githubUser
    }

    fetch('/api/communities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comunidade)
    }).then(async response => {
      const dados = await response.json();

      setComunidades( [...comunidades, dados.record] )
    })
  }

  useEffect(() => {
    fetch(folowersUrl)
    .then( response => response.json() )
    .then( responseComplete => {
      setSeguidores(responseComplete)
    } ) 

    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '3ea2af486ba0064c4f6eba2bf55049',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id 
          title
          imageUrl
          creatorSlug
        }
      }` })
    })
    .then((response) => response.json()) 
    .then((respostaCompleta) => {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      
      setComunidades(comunidadesVindasDoDato)
    })
  
  }, []);

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

          <ProfileRelationsBox title="Seguidores" itens={seguidores} />

          <ProfileRelationsBox title="Comunidades" itens={comunidades} />
          
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
