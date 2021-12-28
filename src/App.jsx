
import { useState, useEffect } from 'react'
import Formulario from './components/Formulario'
import ListadoImagen from './components/ListadoImagen'


function App() {

  const [busqueda, setBusqueda] = useState('')
  const [imagenes,setImagenes ] = useState([])
  const [paginaactual,setPaginaActual] = useState(1)
  const [totalpaginas,setTotalPaginas] = useState(1)


  useEffect (() =>{
    setPaginaActual(1);
  },[busqueda]);

  useEffect(() => {

    const consultarAPI = async () => {

      if (busqueda === '') return
      const imagenesPorPagina = 30
      const key = '25006443-884068c81521472d6d2e7a85e'
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`

      

      const respuesta = await fetch(url)
      const resultado = await respuesta.json()

      setImagenes(resultado.hits);
      
      const calcularTotalPaginas = Math.ceil(resultado.totalHits/imagenesPorPagina)
      setTotalPaginas(calcularTotalPaginas)

      const jumbotron = document.querySelector('.jumbotron')
      jumbotron.scrollIntoView({behavior:'smooth'})
    }
    consultarAPI()
  }, [busqueda,paginaactual])


  const PaginaAnterior = () =>{
    const nuevaPaginActual = paginaactual -1
    if(nuevaPaginActual===0) return
    setPaginaActual(nuevaPaginActual)
  }

  const PaginaSiguiente = () =>{
    const nuevaPaginActual = paginaactual +1
    if(nuevaPaginActual>totalpaginas) return
    setPaginaActual(nuevaPaginActual)
  }

  return (
    <div className="container">
      <div className='jumbotron'>
        <p className='lead text-center'>Buscador de Imágenes</p>
        <Formulario setBusqueda={setBusqueda} />
      </div>
      <div className='row justify-content-center'>
      <ListadoImagen imagenes={imagenes} />
      {(paginaactual===1) ? null : (<button type='button' className='bbtn btn-info mr-1' onClick={PaginaAnterior} >&laquo; Anterior </button>)}
      {(paginaactual===totalpaginas) ? null : (<button type='button' className='bbtn btn-info' onClick={PaginaSiguiente} >Siguiente &raquo;</button>)}
      </div>
    </div>
  )
}

export default App
