import React, { useState } from 'react';
import axios from 'axios';
import logo from "../assets/logo.png";
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useContext } from "react";
//import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import UserContext from './UserContext';

export default function Primeira() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    
    

    function enviaDados(e) {
        e.preventDefault();
        const dadosConta = { email: email, password: password };
        axios
            .post('https://mock-api.driven.com.br/api/v4/driven-plus/auth/login', dadosConta)
            .then(res => {
                const token = res.data.token;
                const membership = res.data.membership;
                setUser({
                    token: token,
                    name: res.data.name,
                    cpf: res.data.cpf,
                    email: res.data.email,
                    membership: membership
                });
                console.log(res.data);
                localStorage.setItem('token', token);
                console.log(setUser)
                navigate(membership ? "/home" : "/subscriptions");
            })
            .catch(err => {
                alert('Erro');
                console.log(err.data);
            });
    }

    return (
        <PageContainer>
            <img src={logo} alt={"carregando"} />

            <ListContainer>
                <form onSubmit={enviaDados}>
                    <input type="email" placeholder="E-mail"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input type="password" placeholder="senha"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button type="submit">Entrar</button>
                </form>
            </ListContainer>
            <Link to={`/cadastro`} >
                <p>Não possuí uma conta? Cadastre-se</p>
            </Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
 width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 100px;
    p{
        font-family: Roboto;
font-size: 14px;
font-weight: 400;
text-align: center;
color: #FFFFFF;
    }
`
const ListContainer = styled.label`
    width: calc(100vw - 40px); 
    display: flex;
    align-items: center;
    margin: 20px 0;
    font-size: 18px;
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
`