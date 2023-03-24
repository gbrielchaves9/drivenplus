import React, { useContext } from 'react';
import { UserContext } from '../App';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
export default function Home() {
    const { user } = useContext(UserContext);

    const handleCancelPlan = () => {
        alert("oi")
    }

    const handleChangePlan = () => {
        alert("oi")
    }
    return (
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
                        <ChangePlanButton onClick={handleChangePlan}>Mudar plano</ChangePlanButton>
                        <CancelButton onClick={handleCancelPlan}>Cancelar plano</CancelButton>
                    </div>
                )}
            </div>
        </Container>
    );
}

const CancelButton = styled.button`
  background-color: #ff6347;
  padding: 10px 20px;
      margin-top: 8px;
      font-size: 16px;
      height: 52px;
      width: 299px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
`;

const ChangePlanButton = styled.button`
  background-color: #1e90ff;
  padding: 10px 20px;
      margin-top: 8px;
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
      color: white;
      display: flex;
      justify-content: center;
    
      img {
        height: 50px;
        width: 49px;
      }
    `;
