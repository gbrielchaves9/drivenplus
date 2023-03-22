import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from "styled-components";
//import Branca from "../assets/Branca.png";
//import Verde from "../assets/Verde.png";
//import Amarelo from "../assets/Amarelo.png";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
export default function Subscriptions() {
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
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <PlanosContainer>
               <p>Escolha seu Plano </p>
            {planos.map((plano) => (
                <Plano key={plano.id}>
                    <img src={plano.image} alt="plano" />
                    <div>
                        <p> R${plano.price}</p>
                    </div>
                </Plano>
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
    color:white}
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
