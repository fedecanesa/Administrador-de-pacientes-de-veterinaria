import React , {Fragment , useState , useEffect} from 'react';
import Cita from './Components/Cita';
import Formulario from './Components/Formulario';

function App() {

  // Citas en LS
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  //Areglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  // Use Effect para realizar ciertas operaciones para cuando el state cambia
  useEffect( () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if(citasIniciales){
      localStorage.setItem('citas' , JSON.stringify(citas))
    } else {
      localStorage.setItem('citas' , JSON.stringify([]))
    }
  } , [citas ] );

  //Función que tome las citas actuales y tome la nueva
  const crearCita = cita => {
    guardarCitas([...citas , cita])
  }

  //Función que elimina la cita por id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas)
  }

  //Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administrador de citas'

  return (
    <Fragment>
        <h1>Administración de pacientes</h1>
        
        <div className="container">
          <div className="row">
            <div className="one-half column">
              <Formulario 
                crearCita={crearCita}
              />
            </div>
            <div className="one-half column">
              <h2>{titulo}</h2>
              {
                citas.map( cita => ( 
                  <Cita 
                    key={cita.id}
                    cita={cita}
                    eliminarCita={eliminarCita}  
                  />
                ))
              }
            </div>
          </div>
        </div>
      </Fragment>
  );
}

export default App;
