import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Comic = () => {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=7d2e40ca095e35ed921e0b3c3bb1c791&hash=4f6623785f325e1759e6cc60cd342ff4');
        setComics(response.data.data.results);
      } catch (error) {
        console.error('Error al recuperar los datos del cómic:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="comic-background">
      <div className='text-center'>
        <h1 className='text-white'>Marvel Comics</h1>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {comics.map(per => (
          <div className='col' key={per.id}>
            <div className="card" style={{ width: '18rem' }}>
              <img src={per.thumbnail.path + '.' + per.thumbnail.extension} className="card-img-top" alt={per.title} style={{ maxHeight: '800px' }} />
              <div className="card-body" style={{ maxHeight: '250px', overflow: 'hidden' }}>
                <h5 className="card-title">{per.title}</h5>
                <p className="card-text">{per.description}</p>
                <Link to={`/comic/${per.id}`} className="btn btn-primary">Ver más</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
