import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { Link } from "react-router-dom";
import UserContext from './UserContext';
export default function Subscriptions() {
    const { user } = useContext(UserContext);
    const [planos, setPlanos] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .get("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setPlanos(response.data);
                console.log(response.data);
            
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSelectPlan = (plano) => {
        localStorage.setItem("planoSelecionado", JSON.stringify(plano));
        
    };

    return (
        <PlanosContainer>
            <p>Escolha seu Plano </p>
            {planos.map((plano) => (
                <Link to={`/subscriptions/${plano.id}`} key={plano.id} onClick={() => handleSelectPlan(plano)}>
                    <Plano>
                        <div>
                            <img src={plano.image} alt="plano" />
                            <p> R${plano.price}</p>
                        </div>
                    </Plano>
                </Link>
            ))}
        </PlanosContainer>
    );
}

const PlanosContainer = styled.div`
  display:flex;
  flex-direction:column;
  align-items: center;

  p{
    color: #fff;
    font-weight: 700;
    font-size: 32px;
    margin: 35px 0;
    }
`;

const Plano = styled.div`
  height: 180px;
  width: 290px;
  border-radius: 12px;
  display:flex;
  margin-top:45px;
  border: 3px solid #7E7E7E;
  & > div {
    display: flex;
  align-items: center;
  p {
    margin-left: 35px;
    font-weight: 700px;
    font-size: 24px;
  }
    img{
    margin-left:15px;
    height: 95px;
    width: 140px;
  }
  }
 
`;
