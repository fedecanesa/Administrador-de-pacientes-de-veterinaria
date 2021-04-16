import React, {Fragment , useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    //Crear State de Citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        humano: '',
        fecha:'',
        hora: '',
        sintomas: ''
    })

    const [error, actualizarError] = useState(false)

    //Función que se ejecuta cadda vez que el usuario escribe en un input
    const handlerChange = e => {
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }

    //Extraer valores
    const { mascota , humano , fecha , hora , sintomas } = cita

    //Cuando el usuario presiona agregar cita
    const handlerSubmit = e => {
        e.preventDefault();

        //Validar
        if(mascota.trim() === '' || humano.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
           actualizarError(true)
           return;
        }

        //Eliminar el mensaje de error
        actualizarError(false);

        //Asignar un ID
        cita.id = uuidv4();

        //Crear la cita
        crearCita(cita)

        //Reiniciar el fomr
        actualizarCita({ 
            mascota: '',
            humano: '',
            fecha:'',
            hora: '',
            sintomas: ''
        })
    }

    return ( 
        <Fragment>
            <h2>Crear Citas</h2>
            
            { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}


            <form
                onSubmit={handlerSubmit}
            >
                <label>Nombre Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={handlerChange}
                    value={mascota}
                />
                <label>Humano de la Mascota</label>
                <input 
                    type="text"
                    name="humano"
                    className="u-full-width"
                    placeholder="Nombre del Humano de la mascota"
                    onChange={handlerChange}
                    value={humano}
                />
                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={handlerChange}
                    value={fecha}
                />
                <label>Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={handlerChange}
                    value={hora}
                />
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={handlerChange}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>
     );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
 
export default Formulario;