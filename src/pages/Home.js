import React, { useContext } from 'react';
import { UserContext } from '../App';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const handleChangePlan = () => {
    alert("escolha um  plano novo !");
    navigate('/subscriptions');
  };


  const handleCancelPlan = () => {
    const deletar = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    };
    const promise = axios.delete(
      'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions',
      deletar
    );
    promise.then(() => {
      alert("seu plano foi deletado , escolha um novo !");
      navigate('/subscriptions');
    });
    promise.catch(() => {
      alert("erro , tente mais tarde !");
    });
  };

  return (
    <>
    <Container>
      <div>
        {user.membership && (
          <div>
            <img src={user.membership.image} alt="Imagem do plano" />
            <h2>Olá, {user.name}</h2>
            <div>
              {user.membership.perks.map(perk => (
                <Button key={perk.id}>
                  <StyledLink to={perk.link}>{perk.title}</StyledLink>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Container>
     <ContainerBotao>
     <ChangePlanButton onClick={handleChangePlan}>Mudar plano</ChangePlanButton>
     <CancelButton onClick={handleCancelPlan}>Cancelar plano</CancelButton>
   </ContainerBotao>
  </>
  );
}

const ContainerBotao = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 10px;
  width: 100%;
`;

const CancelButton = styled.button`
  background-color: #ff6347;
  padding: 10px 20px;
  margin-top: 10px;
      font-size: 16px;
      height: 52px;
      width: 299px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
`;

const ChangePlanButton = styled.button`
  background: #FF4791;
  padding: 10px 20px;
      font-size: 16px;
      height: 52px;
      width: 299px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
    
`;

const Button = styled.button`
      background: #FF4791;
      color: #fff;
      padding: 10px 20px;
      margin-top: 8px;
      font-size: 16px;
      height: 52px;
      width: 299px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
    `;

const StyledLink = styled(Link)`
      text-decoration: none;
      color: #fff;
    `;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items:center;

  h1 {
    text-align: center;
    font-size: 24px;
    font-weight: 700;
  }
  h2 {
    color:white;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    margin-top: 30px;
  }
`
