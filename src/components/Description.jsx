import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export const Description = () => {
  
  const [comics, setComics] = useState([]);
  
  const [currentComicIndex, setCurrentComicIndex] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=7d2e40ca095e35ed921e0b3c3bb1c791&hash=4f6623785f325e1759e6cc60cd342ff4');
        setComics(response.data.data.results);
        const currentIndex = response.data.data.results.findIndex(comic => comic.id.toString() === id);
        setCurrentComicIndex(currentIndex);
      } catch (error) {
        console.error('Error al recuperar los datos del cómic:', error);
      }
    };
    fetchData();
  }, [id]);

  // Renderizar un mensaje de carga mientras se obtienen los datos
  if (!comics.length) {
    return <div>Cargando...</div>;
  }

  // Función para cambiar al cómic anterior
  const goToPreviousComic = () => {
    const newIndex = currentComicIndex === 0 ? comics.length - 1 : currentComicIndex - 1;
    setCurrentComicIndex(newIndex);
  };

  // Función para cambiar al cómic siguiente
  const goToNextComic = () => {
    const newIndex = currentComicIndex === comics.length - 1 ? 0 : currentComicIndex + 1;
    setCurrentComicIndex(newIndex);
    };

  return (
    <div className="container mt-5">
      <div className="container-fluid p-0">
        <div className="text-center mb-4">
          <h1 className="text-blue">{comics[currentComicIndex].title}</h1>
        </div>
        <div className="carousel-container">
          {/* Carrusel de cómics */}
          <div id="comicCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {/* Iterar sobre la lista de cómics y renderizar cada cómic en un carrusel */}
              {comics.map((comic, index) => (
                <div className={`carousel-item ${index === currentComicIndex ? 'active' : ''}`} key={index}>
                  {/* Imagen del cómic */}
                  <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} className="d-block w-100" alt={comic.title} />
                </div>
              ))}
            </div>
            
            {/* Botón para ir al cómic anterior */}
            <button className="carousel-control-prev" type="button" data-bs-target="#comicCarousel" data-bs-slide="prev" onClick={goToPreviousComic}>
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            {/* Botón para ir al cómic siguiente */}
            <button className="carousel-control-next" type="button" data-bs-target="#comicCarousel" data-bs-slide="next" onClick={goToNextComic}>
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        
         {/* Detalles del cómic */}
         <div className="comic-details mt-4">
          {comics.map((comic, index) => (
            <div className={`comic-detail ${index === currentComicIndex ? 'active' : 'd-none'}`} key={index}>
              <div className='comic-background'> 
                <div className="text-white">
                  <h3>Creadores</h3>
                  <ul>
                    {comic.creators.items.map((creator, index) => (
                      <li key={index}>{creator.name} - {creator.role}</li>
                    ))}
                  </ul>

                  <h3>Precio</h3>
                  <h1>
                    {comic.prices.map((price, index) => (
                      <li key={index}>{price.type}: ${price.price}</li>
                    ))}
                  </h1>

                  <p><strong>Número de emisión:</strong> {comic.issueNumber}</p>
                  <p><strong>Serie:</strong> {comic.series.name}</p>
                  <p>Text</p>

                  {/* Botón de enlace a la página de Marvel */}
                  <div className='text-left'>
                    {comic.urls.map((url, index) => (
                      <button key={index} className="btn btn-primary mr-2" onClick={() => window.open(url.url, '_blank')}>Más información</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón para volver a la página principal */}
        <div className="text-center mt-4">
          <button onClick={() => navigate('/')} className="btn btn-primary"><h1>Volver a la página principal</h1></button>
        </div>
      </div>
    </div>
  );
};  