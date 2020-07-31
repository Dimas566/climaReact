import React, { Fragment, useState, useEffect } from "react";
import Header from "./Components/Header";
import Formulario from "./Components/Formulario";
import Clima from "./Components/Clima";
import Error from "./Components/Error";

function App() {
  //State del formulario
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  });
  //state para la consulta
  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  //state para guardar el error
  const [error, guardarError] = useState(false);

  //Extraer ciudad y pais de la busqueda
  const { ciudad, pais } = busqueda;

  //array de dependencias o useEffect
  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar) {
        const appID = "edfe5d4e7e848db690f5174f23cb9806";
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;
        //const URL = `https://samples.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;
        const respuesta = await fetch(URL);
        const resultado = await respuesta.json();
        guardarResultado(resultado);
        guardarConsultar(false);
        //En caso de que haya error en la consulta
        if (resultado.cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
        }
      }
    };
    consultarAPI();
    // eslint-disable-next-line
  }, [consultar]);

  //Carga condicional de componentes.
  let componente;
  if(error){
    componente = <Error mensaje="No hay resultados" />
  }else{
    componente = <Clima resultado={resultado} />
  }

  return (
    <Fragment>
      <Header titulo="Clima React App" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
