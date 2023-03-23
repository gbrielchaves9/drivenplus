import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

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
  background-color:black;
  display:flex;
  flex-direction:column;
  align-items: center;
  p{
    font-size: 32px;
    color: white;}
`;

const Plano = styled.div`
  height: 180px;
  width: 290px;
  border-radius: 12px;
  display:flex;
  
  margin-top:91px;
  border: 3px solid #7E7E7E;
  img{
    height: 95px;
    width: 140px;
  }
  
`;
