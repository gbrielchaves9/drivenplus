import React, { useState } from 'react';
import axios from 'axios';
import Branca from "../assets/Branca.png";
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import Verde from "../assets/Verde.png";
import Amarelo from "../assets/Amarelo.png";


export default function Home() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    function handleLogin(user) {
        setUser(user);
    }



    return (
        <PageContainer>
            <p>Escolha seu Plano </p>
            <Planos>
                <img src={Branca} alt={"carregando"} />
                <p>R$ 39,99</p>
            </Planos>
            <Planos>
               
                <img src={Amarelo} alt={"carregando"} />
                <p>R$ 69,99</p>
            </Planos>
            <Planos>
               
                <img src={Verde} alt={"carregando"} />
                <p>R$ 99,99</p>
            </Planos>


        </PageContainer>
    )
}

const PageContainer = styled.div`
background-color:black;
display:flex;
flex-direction:column;
align-items: center;
p{
    color:white}
`
const Planos = styled.div`
height: 180px;
width: 290px;
border-radius: 12px;
display:flex;
margin-top:91px;
background-color:blue;
border-color:#7E7E7E;
img{height: 95px;
width: 140px;
}
`

