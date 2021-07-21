import React, { useState, useEffect } from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

import MainGrid from "../src/components/MainGrid";
import ProfileSideBar from '../src/components/ProfileSideBar';
import Box from '../src/components/Box';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { AlurakutMenu } from "../src/lib/AlurakutCommons";

export default function listUsers(props){

    const githubUser = props.githubUser;
    const folowersUrl = `https://api.github.com/users/${githubUser}/following`;

    const [ seguidores, setSeguidores ] = useState([]);

    useEffect(()=>{
        fetch(folowersUrl)
        .then( response => response.json() )
        .then( responseComplete => {
        setSeguidores(responseComplete)
        } )
    }, []);

    return(
        <>
        <AlurakutMenu githubUser={githubUser} />
        <MainGrid>
            <div className="profileArea" style={{ gridArea: 'profileArea' }}>
                <ProfileSideBar githubUser={ githubUser } />
            </div>
            <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
                <Box>
                    <h1>Seguindo ({seguidores.length})</h1>
                    <ProfileRelationsBoxWrapper>
                        <ul>
                        {
                            seguidores.map(itemAtual => (
                            <li key={itemAtual.login}>
                                <a href={itemAtual.html_url} target="_blank" >
                                <img src={itemAtual.avatar_url} style={{ borderRadius: '8px' }} />
                                <span>{itemAtual.login}</span>
                                </a>
                            </li>
                            ))
                        }
                        </ul>    
                    </ProfileRelationsBoxWrapper>
                </Box>
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