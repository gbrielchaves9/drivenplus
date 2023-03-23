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
                console.log(response.data);
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
            membershipId: plano.id,
        };

        const token = localStorage.getItem("token");
        axios
            .post(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response);
                alert("pedido enviado")
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <PlanoContainer>
            <img src={plano.image} alt="plano" />
            <div>
                <p> Vantagens:</p>
                {plano.perks && (
                    <ul>
                        {plano.perks.map((perk) => (
                            <li key={perk.id}>{perk.title}</li>
                        ))}
                    </ul>
                )}
            </div>
            <FormContainer onSubmit={handleSubmit}>
                <InputContainer>
            
                    <input placeholder="Nome impresso no cartão"
                        type="text"
                        id="cardName"
                        value={cardName}
                        onChange={(event) => setCardName(event.target.value)}
                        required
                    />
                </InputContainer>
                <InputContainer>
                   
                    <input placeholder="Digitos do cartão"
                        type="text"
                        id="cardNumber"
                        value={cardNumber}
                        onChange={(event) => setCardNumber(event.target.value)}
                        required
                    />
                </InputContainer>
                <InputContainer>
                
                    <input placeholder="Código de segurança"
                        type="number"
                        id="securityNumber"
                        value={securityNumber}
                        onChange={(event) => setSecurityNumber(event.target.value)}
                        required
                    />
                </InputContainer>
                <InputContainer>
                
                    <input placeholder="Validade"
                        type="text"
                        id="expirationDate"
                        value={expirationDate}
                        onChange={(event) => setExpirationDate(event.target.value)}
                        required
                    />
                </InputContainer>
                <Button type="submit">Assinar</Button>
            </FormContainer>
        </PlanoContainer>
    );
}

const PlanoContainer = styled.div`
    background-color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
  
    p {
      color: white;
    }
    img{height:96px;
width: 139px;
}
  `;

const FormContainer = styled.form`
  background: #0E0E13;

    padding: 16px;
    border-radius: 8px;
    margin-top: 16px;
    width: 100%;
    max-width: 400px;
  
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
    background: #FF4791;
    border: none;
    border-radius: 8px;
    padding: 8px;
    font-size: 16px;
    cursor: pointer;
  `;
