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
            membershipId: plano.id, // adiciona o ID do plano aqui
        };
    
        const token = localStorage.getItem("token");
        axios
            .post(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
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
const FormContainer = styled.div`
  background-color: #f2f2f2;
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
  width: 100%;
  max-width: 400px;

  h2 {
    margin-top: 0;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  label {
    font-weight: bold;
    margin-bottom: 8px;
  }

  input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
`;

const Button = styled.button`
  background-color: #2e7d32;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #1b5e20;
  }
`;