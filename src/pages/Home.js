import React, { useContext } from 'react';
import { UserContext } from '../App';

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user.membership && (
        <div>
          <img src={user.membership.image} alt="Imagem do plano" />
          <h2>{user.membership.name}</h2>
          <p>Preço: R${user.membership.price}/mês</p>
          <ul>
            {user.membership.perks.map(perk => (
              <li key={perk.id}>{perk.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}