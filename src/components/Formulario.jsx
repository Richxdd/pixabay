
import { useState } from 'react'

import Error from './Error.jsx'

const Formulario = ({setBusqueda}) => {

    const [termino, setTermino] = useState('')
    const [error, setError] = useState('')

    const buscarImagenes = e =>{
        e.preventDefault()

        if(termino.trim()===''){
            setError(true)
            return
        }
        setError(false)
        setBusqueda(termino)
    }

    return (
        <form onSubmit={buscarImagenes}>
            <div className='row'>
                <div className='form-group col-md-8'>
                    <input
                        type='text'
                        className='form-control form-control-lg'
                        placeholder='Busca una imagen, ejemplo: futbol o café'
                        onChange={e=>setTermino(e.target.value)}
                    />
                </div>
                <div className='form-group col-md-4'>
                    <input type='submit' className='btn btn-lg btn-danger btn-block' value='Buscar' />
                </div>
            </div>
            {error ? <Error mensaje='Agrega un termino de búsqueda' />:null}
        </form>
    )
}

export default Formulario
