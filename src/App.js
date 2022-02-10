import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import imagen from './criptomoneda1.jpg';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;
const Heading = styled.h1` 
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {

      const cotizarCriptomoneda = async () => {
          // Evitamos la ejecucion la primera vez
          if(moneda === '') return;

          // Consultar la API para obtener la cotizacion
          const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

          const resultado = await axios.get(url);

          // Mostrar el Spinner
          guardarCargando(true);

          // Ocultar el Spinner y mostrar el resultado
          setTimeout(() => {

            // Cambiar el estado de cargando
            guardarCargando(false);

            // Guardar cotizacion
            guardarResultado( resultado.data.DISPLAY[criptomoneda][moneda] );
          }, 3000);

          
      }
      cotizarCriptomoneda();
  }, [moneda, criptomoneda]);

  // Mostrar Spinner o resultado
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />

  return (
    <Contenedor>
        <div>
          <Imagen 
            src={imagen}
            alt="Imagen Crypto"
          />
        </div>
        <div>
            <Heading>Cotiza Criptomonedas al Instante</Heading>

            <Formulario 
              guardarMoneda={guardarMoneda}
              guardarCriptomoneda={guardarCriptomoneda}
            />

            {componente}
            
        </div>
    </Contenedor>
  );
}

export default App;





















//
/// El xenón es un elemento químico de la tabla periódica cuyo símbolo es Xe y su número atómico el 54. Gas noble inodoro, muy pesado, incoloro, el xenón está presente en la atmósfera terrestre solo en trazas y fue parte del primer compuesto de gas noble sintetizado.
//
///
//
// console.log('Cotizando...');
// npm i @emotion/core @emotion/styled axios
// A esto se le conoce como pseudo elemento
// &::after {
//   content: '';
//   width: 100px;
//   height: 6px;
//  
//   }
// `;