import React, { useState, useEffect } from "react";
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import ProfileSideBar from "../src/components/ProfileSideBar";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons";

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

export default function Home(props) {

  const [ comunidades, setComunidades ] = useState([]);
  const [ seguindo, setSeguindo ] = useState([]);
  const [ seguidores, setSeguidores ] = useState([]);

  const githubUser = props.githubUser;
  const folowersUrl = `https://api.github.com/users/${githubUser}/followers`;
  const followingUrl = `https://api.github.com/users/${githubUser}/following`;

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
    
    fetch(followingUrl)
    .then( response => response.json())
    .then( responseComplete => {
      setSeguindo(responseComplete)
    })

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
            <h1>Bem Vindo(a), {githubUser}</h1>
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
            <h2 className="smallTitle">Seguidores ({seguidores.length})</h2>            
            <ul>
              {
                seguidores.slice(0, 6).map(itemAtual => (
                  <li key={itemAtual.login}>
                    <a href={itemAtual.html_url} target="_blank" >
                      <img src={itemAtual.avatar_url} style={{ borderRadius: '8px' }} />
                      <span>{itemAtual.login}</span>
                    </a>
                  </li>
                ))
              }
            </ul>   
            <a className="boxLink" href="/seguidores">Ver todos</a>         
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Seguindo ({seguindo.length})</h2>            
            <ul>
              {
                seguindo.slice(0, 6).map(itemAtual => (
                  <li key={itemAtual.login}>
                    <a href={itemAtual.html_url} target="_blank" >
                      <img src={itemAtual.avatar_url} style={{ borderRadius: '8px' }} />
                      <span>{itemAtual.login}</span>
                    </a>
                  </li>
                ))
              }
            </ul>    
            <a className="boxLink" href="/seguindo">Ver todos</a>             
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBox title="Comunidades" itens={comunidades.slice(0, 6)} />
        </div>

      </MainGrid>
   </> 
  )
}

export async function getServerSideProps(context){
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  const decodeToken = jwt.decode(token);
  const githubUser = decodeToken?.githubUser;

  if(!githubUser){
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }

  return {
    props: {
      githubUser
    }
  }
}