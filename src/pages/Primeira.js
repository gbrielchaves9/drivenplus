import React from 'react';
import styled from "styled-components"
import logo from "../assets/logo.png";


export default function Primeira() {


    return (
        <PageContainer>
            <SessionContainer data-test="movie-day">
                <img src={logo} alt={"carregando"} />
            </SessionContainer>



        </PageContainer>


    )
}

const PageContainer = styled.div`
   height: 667px;
width: 100%;
background: #0E0E13;
margin-top:0px;
margin-bottom:0px;


`
const SessionContainer = styled.div`
   
    display: flex;
    align-items: center;
    top :0;
    img {
        height: 50px;
width: 299px;
        }
`