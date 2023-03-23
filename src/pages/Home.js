import React, { useContext } from 'react';
import { UserContext } from '../App';

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>Olá, {user.name}!</h1>
      <img src={user.image} alt="Imagem do usuário" />
      <h2>{user.title}</h2>
    </div>
  );
}