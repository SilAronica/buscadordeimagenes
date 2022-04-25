import React, { Component } from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';

class App extends Component {

  state = {
    termino: '',
    imagenes : [],
    pagina:''
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');

  }

  paginaAnterior = () => {
    //leer el state dela pagina actual
    let pagina = this.state.pagina;

    //Si la pagina es 1, ya no ir acia atrás.
    if(pagina === 1) return null;

    //Sumar uno a la pagina actual
    pagina -= 1;

    //Agregar el cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });

    //console.log(pagina)
  }

  paginaSiguiente = () => {
    //leer el state dela pagina actual
    let pagina = this.state.pagina;

    //Sumar uno a la pagina actual
    pagina += 1;

    //Agregar el cambio al state
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });

    //console.log(pagina);
  }

  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=26019722-aee6009e0b522571d992b7df8&q=${termino}&per_page=30&page=${pagina}`;

    console.log(url);
      fetch(url)
       .then(respuesta => respuesta.json() )
       .then(resultado => this.setState({ imagenes : resultado.hits }) )
  }


  datosBusqueda = (termino) => {
    this.setState({
      termino : termino,
      pagina : 1
    }, () => {
    this.consultarApi();
    })
  }

  render() {
    return (
      <div className="app container shadow p-3 mb-5 bg-white rounded">
        <div className="jumbotron">
          <p className="lead text-center font-weight-bold">BUSCADOR DE IMÁGENES</p>
          <Buscador 
            datosBusqueda={this.datosBusqueda}
          />
        </div>
        <div className="row justify-content-center">
          <Resultado
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />

        </div>
      </div>
    );
  }
}

export default App
