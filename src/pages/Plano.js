import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { UserContext } from '../App';
import volta from "../assets/volta.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Plano() {
    const navigate = useNavigate();
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
                navigate('/Home');
            })
            .catch((error) => {
                console.log(error);
            });    
    }
    const handleVoltar = () => {
        navigate('/subscriptions');
      };
  


    return (
        <PlanoContainer>
             <BotaoVolta src={volta} onClick={handleVoltar} />

            <Container>  <img src={plano.image} alt="plano" />

                <h1>{plano.name}</h1>

            </Container>
            <Beneficios>

                <h1>Beneficios</h1>
                {plano.perks && (
                    <ul>
                        {plano.perks.map((perk, index) => (
                            <li key={perk.id}>{`${index + 1}. ${perk.title}`}</li>
                        ))}
                    </ul>
                )}
                <h1>Preco:</h1>

                <p>R$ {plano.price} cobrados mensalmente</p>

            </Beneficios>


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
                        <p>Tem certeza que deseja assinar o {plano.name} R$ {plano.price}?</p>
                      
                            <Brosa onClick={handleConfirm}>sim</Brosa>
                            <Bcinza onClick={handleCancel}>Não</Bcinza>
                        
                    </div>
                </Modal>
            )}
        </PlanoContainer>
    );
}
const BotaoVolta = styled.img`
width: 28px;
height:30px;
position: fixed;
top: 20px;
left: 20px;
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
    height: 210px;
width: 248px;
display:flex;
flex-direction: column;
    p {
    font-size: 18px;
    color:black;
  }
  }
`;
const PlanoContainer = styled.div`
 margin: 30px 40px;
  `;

const FormContainer = styled.label`
    display: flex;
    align-items: center;
    margin: 20px 0;
    font-size: 18px;
    flex-direction: column;
    form{
        width: calc(100vw - 60px);
        display:flex;
        align-items: center;
        flex-direction: column;

    }
    button {
        width: calc(100vw - 60px);
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
const Container = styled.div`
    display:flex;
        align-items: center;
        flex-direction: column;
        h1{
            margin-top:12px;
            color:white;
            font-family: Roboto;
font-size: 32px;
font-weight: 700;
        }
        img{height:96px;
width: 139px;
}
  `;

const Beneficios = styled.div`
display:flex;
margin-top:12px;
margin-left:30px;
    flex-direction: column;
    margin-top:12px;
    color:white;
    h1{
        margin-top:12px;
font-size: 16px;
font-weight: 400;
    }
    li{
    color: white;
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

const Brosa = styled.button`
margin-top:100px;
background: #FF4791;
height: 52px;
width: 50%;
left: 86px;
top: 376px;
border-radius: 8px;
cursor: pointer;
`;
const Bcinza = styled.button`
margin-left:30px;
background: #CECECE;
height: 52px;
width: 30%;
left: 86px;
top: 376px;
border-radius: 8px;
cursor: pointer;
`;

