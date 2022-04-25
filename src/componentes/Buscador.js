import React, { Component } from "react";

class Buscador extends Component {
    
    busquedaRef = React.createRef();

    obtenerDatos = (e) => {
        //e.preventDefault (método):previene la acción por default.
        e.preventDefault();

        //Tomamos el valor del input
        const termino = this.busquedaRef.current.value;
        //Lo enviamos al componente Principal
        this.props.datosBusqueda(termino);
    }
        
    render() {
        return(
            //"This..." se refiere a: este mismo archivo, esta misma instacia.
            <form onSubmit={this.obtenerDatos}> 
                <div className="row">
                    <div className="form-group col-md-8">
                        <input ref={this.busquedaRef} type="text" className="form-control form-control-lg font-italic " placeholder="Busca tu imagen. Ejemplo: Café"/>
                    </div>
                    <div className="form-group col-md-4">
                        <input type="submit" className="btn btn-lg btn-danger btn-block" value="Buscar..."/>
                    </div>
                </div>
            </form>
         );
    }
}

export default Buscador;