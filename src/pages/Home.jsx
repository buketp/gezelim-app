import React, { useState, useEffect } from 'react';
import PlaceModal from '../components/PlaceModal';
import PlaceCard from '../components/PlaceCard';
import { cities } from '../utils/cities';

const Home = () => {
  const [places, setPlaces] = useState(() => {
    const savedPlaces = localStorage.getItem('gezilecekYerler');
    return savedPlaces ? JSON.parse(savedPlaces) : [];
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlace, setEditingPlace] = useState(null);
  const [filterCity, setFilterCity] = useState('');

  useEffect(() => {
    localStorage.setItem('gezilecekYerler', JSON.stringify(places));
  }, [places]);

  const toggleVisited=(id)=>{
    const updatePlaces=places.map(place=>
      place.id===id ? {...place, isVisited: !place.isVisited} : place
    );
    setPlaces(updatePlaces);
  };

  const deletePlace = (id) => {
  if (window.confirm("Bu mekanı listeden silmek istediğinize emin misiniz?")) {
    const filteredPlaces = places.filter(place => place.id !== id);
    setPlaces(filteredPlaces);
  }
};

  const handleEditClick = (place) => {
    setEditingPlace(place);
    setIsModalOpen(true);
  };

  const handleSavePlace = (formData) => {
  if (editingPlace) {
    setPlaces(places.map(p => 
      p.id === editingPlace.id ? { ...p, ...formData } : p
    ));
  } else {
    const newPlace = { ...formData, id: Date.now(), isVisited: false };
    setPlaces([...places, newPlace]);
  }
  setIsModalOpen(false);
  setEditingPlace(null);
};

  const filteredPlaces = filterCity 
    ? places.filter(place => place.city === filterCity) 
    : places;

  return (
    <div className="min-h-screen bg-blue-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 border-b pb-4">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-slate-800 mb-1">🌄 Gezilecek Yerler</h1>
            <h2 className="text-sm font-bold text-slate-500  tracking-widest">Keşfetmen Gereken Yerleri Planla</h2>
          </div>

          <div className="flex justify-between items-end">
            
            <div className="flex flex-col items-start space-y-4">
              <p className="text-slate-600 text-sm font-bold ml-1">Kayıtlı Mekan: {places.length}</p>
              
              <div className="flex flex-col items-start">
                <label className="text-xs font-medium text-slate-400 mb-1 ml-1">Şehir Filtrele</label>
                <select 
                  className="p-2.5 border border-gray-300 rounded-xl bg-gray-100 text-sm text-black shadow-sm min-w-[220px] transition-all"
                  value={filterCity}
                  onChange={(e) => setFilterCity(e.target.value)}
                >
                  <option value="">Tüm Şehirler</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            <button 
              onClick={() => { setEditingPlace(null); setIsModalOpen(true); }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 px-3 rounded-lg shadow-md hover:shadow-xl transition-all transform active:scale-95 mb-1"
            >
              + Ekle
            </button>

          </div>
        </header>

        <PlaceModal 
          isOpen={isModalOpen} 
          onClose={()=> { setIsModalOpen(false); setEditingPlace(null); }} 
          onSave={handleSavePlace} 
          editData={editingPlace}
        />

        <main>
          {filteredPlaces.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-300">
              <p className="text-gray-400 font-semibold">
                {filterCity ? `${filterCity} şehrinde henüz bir yer eklemediniz.` : 'Henüz bir yer eklemediniz.'}
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredPlaces.map((item) => (
                <PlaceCard
                  key={item.id} 
                  place={item}
                  onToggle={() => toggleVisited(item.id)}
                  onEdit={() => handleEditClick(item)}
                  onDelete={() => deletePlace(item.id)}
                />  
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
