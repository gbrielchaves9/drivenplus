import React, { useContext } from 'react';
import { UserContext } from '../App';
import styled from 'styled-components';

export default function Home() {
    const { user } = useContext(UserContext);

    return (
        <Container>
            <div>
                {user.membership && (
                    <div>
                        <img src={user.membership.image} alt="Imagem do plano" />
                        <h2>Olá,{user.name}</h2>

                        <div>
                            {user.membership.perks.map(perk => (
                                <Button key={perk.id}>{perk.title}</Button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
}

const Button = styled.button`
 background: #FF4791;
  color: #fff;
  padding: 10px 20px;
  margin-top:8px;
  
  font-size: 16px;
  height: 52px;
width: 299px;

border-radius: 8px;


`;
const Container = styled.div`
  color: white;
  display:flex;
  justify-content: center;
  img{height: 50px;
width: 49px;


  }
`;