import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { UserContext } from '../App';
import volta from "../assets/volta.png";
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
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = (event) => {
        event.preventDefault();
        setShowModal(true);
    };

    const handleConfirm = (event) => {
        event.preventDefault();
        handleSubmit(event);
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

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
            <BotaoVolta>
                <img src={volta} alt={"carregando"} />
            </BotaoVolta>


            <img src={plano.image} alt="plano" />
            <div>
                <p> Vantagens:</p>
                {plano.perks && (
                    <ul>
                        {plano.perks.map((perk, index) => (
                            <li key={perk.id}>{`${index + 1}. ${perk.title}`}</li>
                        ))}
                    </ul>
                )}
            </div>
            <FormContainer onSubmit={handleSubmit}>


                <input placeholder="Nome impresso no cartão"
                    type="text"
                    id="cardName"
                    value={cardName}
                    onChange={(event) => setCardName(event.target.value)}
                    required
                />


                <input placeholder="Digitos do cartão"
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(event) => setCardNumber(event.target.value)}
                    required
                />
                <div>

                    <input placeholder="Código de segurança"
                        type="number"
                        id="securityNumber"
                        value={securityNumber}
                        onChange={(event) => setSecurityNumber(event.target.value)}
                        required
                    />

                    <input placeholder="Validade"
                        type="text"
                        id="expirationDate"
                        value={expirationDate}
                        onChange={(event) => setExpirationDate(event.target.value)}
                        required
                    />
                </div>

                <Button type="submit" onClick={handleOpenModal}>Assinar</Button>
            </FormContainer>
            {showModal && (
                <Modal>
                    <div>
                        <p>Tem certeza que deseja assinar o plano R$ {plano.price}?</p>
                        <button onClick={handleConfirm}>sim</button>
                        <button onClick={handleCancel}>Não</button>
                    </div>
                </Modal>
            )}
        </PlanoContainer>
    );
}

const BotaoVolta = styled.div`
margin-top:22px;
margin-right:22px;

`
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    background-color: #FFFFFF;
    height: 210px;
    width: 248px;
    padding: 20px;
    border-radius: 5px;
    p {
    font-size: 18px;
    color:black;
  }
  }
  button {
    margin: 10px;
    padding: 5px 10px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color:green;
  }
`;


const PlanoContainer = styled.div`
  
   
  li{
    color: white;
  }
    p {
      color: white;
    }
    img{height:96px;
width: 139px;
}
  `;

const FormContainer = styled.label`
   width: calc(100vw - 40px); 
    display: flex;
    align-items: center;
    margin: 20px 0;
    font-size: 18px;
    flex-direction: column;
    form{
        display:flex;
        align-items: center;
        flex-direction: column;

    }
    button {
        display:flex;
        justify-content: center;
        align-self: center;
        background: #FF4791;
        width :100%;
    }
    input {
        width: calc(100vw - 60px);
        height: 45px;
left: 36px;
top: 279px;
border-radius: 5px;
    }
    & > div {
   display:flex;
   width: calc(100vw - 60px);

  }
`


const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    width: 80%;
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
