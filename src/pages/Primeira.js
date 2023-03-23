import React, { useState } from 'react';
import axios from 'axios';
import logo from "../assets/logo.png";
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

export default function Primeira() {
    const [email, setEmail] = useState("");
    const [password, setSenha] = useState("");
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser(token);
        }
    }, [setUser]);


    function enviaDados(e) {
        e.preventDefault();
        const dadosConta = { email: email, password: password };
        axios
            .post('https://mock-api.driven.com.br/api/v4/driven-plus/auth/login', dadosConta)
            .then(res => {
                const token = res.data.token;
                setUser(token);
                localStorage.setItem('token', token);
                alert("dados enviados")
                navigate("/subscriptions");
                console.log(res.data)
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
                        onChange={e => setSenha(e.target.value)}
                    />
                    <button type="submit">Entrar</button>
                </form>
            </ListContainer>
            <Link to={`/cadastro`} data-test="movie">
                <p>Não possuí uma conta? Cadastre-se</p>
            </Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
 width: 100%;
    height: 100vh;
    background-color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 100px;
    p{
        font-family: Lexend Deca;
font-size: 14px;
font-weight: 400;
text-align: center;
    }
`
const ListContainer = styled.label`
    width: calc(100vw - 40px); 
    display: flex;
    align-items: center;
    margin: 20px 0;
    font-size: 18px;
    button {
        display:flex;
        justify-content: center;
        align-self: center;
        background: #FF4791;
    }
    input {
        width: calc(100vw - 60px);
        height: 45px;
left: 36px;
top: 279px;
border-radius: 5px;
    }
`