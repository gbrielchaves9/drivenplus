import styled from "styled-components";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export default function Segunda() {
  const [form, setForm] = useState({ email: "", password: "", name: "", cpf: "" });
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  function pegaDados(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function enviaDados(e) {
    e.preventDefault();
    const dadosConta = {
      email: form.email,
      name: form.name,
      cpf: form.cpf,
      password: form.password,
    };
    console.log(dadosConta);
    const URL = "https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up";
    const promise = axios.post(URL, dadosConta);
    promise
      .then((res) => {
        console.log(res.data);
        alert("usuário cadastrado!");
        alert("pedido enviado");
        navigate("/");
      })
      .catch((err) => console.log(err.response.data));
  }

  return (
    <PageContainer>
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
          <button type="submit">Cadastrar</button>
        </form>
      </ListContainer>
      <Link to={`/`} data-test="login-link">
        <p>Já tem uma conta? Faça login!</p>
      </Link>
    </PageContainer>
  );
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