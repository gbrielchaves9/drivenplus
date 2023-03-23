import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { useParams } from "react-router-dom";
export default function Plano() {
    const [plano, setPlano] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setPlano(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [securityNumber, setSecurityNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            cardName,
            cardNumber,
            securityNumber,
            expirationDate,
        };

        console.log(data);
    }
    return (
        <PlanoContainer>
            <p>{plano.name}</p>
            <img src={plano.image} alt="plano" />
            <div>
                <p> R${plano.price}</p>
                <p>Vantagens:</p>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="cardName">Nome do titular do cartão:</label>
                <input
                    type="text"
                    id="cardName"
                    value={cardName}
                    onChange={(event) => setCardName(event.target.value)}
                    required
                />
                <label htmlFor="cardNumber">Número do cartão:</label>
                <input
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(event) => setCardNumber(event.target.value)}
                    required
                />
                <label htmlFor="securityNumber">Código de segurança:</label>
                <input
                    type="number"
                    id="securityNumber"
                    value={securityNumber}
                    onChange={(event) => setSecurityNumber(event.target.value)}
                    required
                />
                <label htmlFor="expirationDate">Data de expiração:</label>
                <input
                    type="text"
                    id="expirationDate"
                    value={expirationDate}
                    onChange={(event) => setExpirationDate(event.target.value)}
                    required
                />
                <button type="submit">Enviar</button>
            </form>

        </PlanoContainer>
    );
}
const PlanoContainer = styled.div`
  background-color:black;
  display:flex;
  flex-direction:column;
  align-items: center;
  p{
    color:white}
`;