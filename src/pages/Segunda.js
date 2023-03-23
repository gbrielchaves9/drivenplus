import styled from "styled-components"
import React, { useState } from 'react';
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import axios from "axios"

export default function Segunda() {
    const [form, setForm] = useState({ email: "", password: "", name: "", cpf: "" })
    function pegaDados(event) {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    function enviaDados(e) {
        e.preventDefault()
        const dadosConta = {
            email: form.email,
            name: form.name,
            cpf: form.cpf,
            password: form.password,
        }
        console.log(dadosConta)
        const URL = "https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up"
        const promise = axios.post(URL, dadosConta);
        promise
            .then(res => {
                console.log(res.data);
                alert("usuário cadastrado!")
            })
            .catch(err => console.log(err.response.data));
            alert("erro no cadastro !")
    }
    return (
        <PageContainer>
            <img src={logo} alt={"carregando"} />

            <ListContainer>
                <form onSubmit={enviaDados}>
                    <input
                        type="text"
                        placeholder="nome"
                        required
                        name="name"
                        value={form.name}
                        onChange={pegaDados}
                    />
                    <input
                        type="text"
                        placeholder="cpf"
                        required
                        name="cpf"
                        value={form.cpf}
                        onChange={pegaDados}
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        required
                        name="email"
                        value={form.email}
                        onChange={pegaDados}
                    />
                    <input
                        type="password"
                        placeholder="senha"
                        required
                        name="password"
                        value={form.password}
                        onChange={pegaDados}
                    />
                    <button type="submit">
                        Cadastrar
                    </button>
                </form>
            </ListContainer>

            <Link to={`/`} data-test="login-link" >
                <p>Já tem uma conta? Faça login!</p>
            </Link>
        </PageContainer>
    )
}
const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 65px;
    img{
        height: 178px;
        width: 180px;
    }

    p{
        font-family: Lexend Deca;
font-size: 14px;
font-weight: 400;
text-align: center;
    }
`
const ListContainer = styled.label`
background-color:red;
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    align-items: center;
    button {
        align-self: center;
        background: #52B6FF;
    }
    input {
        width: calc(100vw - 60px);
        height: 45px;
left: 36px;
top: 279px;
border-radius: 5px;
    }
`