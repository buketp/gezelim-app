import React, { useState,useEffect } from 'react';

const PlaceModal = ({ isOpen, onClose, onSave, editData }) => {
  const [name, setName] = useState(editData ? editData.name : '');
  const [city, setCity] = useState(editData ? editData.city : '');

  useEffect(() => {
    if (isOpen) {
      setName(editData ? editData.name : '');
      setCity(editData ? editData.city : '');
    }
  }, [isOpen, editData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !city.trim()) return;

    onSave({
      name: name,
      city: city,
    });

    onClose(); 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 text-center">
          {editData ? 'Mekanı Güncelle' : 'Yeni Mekan Ekle'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <label className="block text-sm font-bold text-gray-500 uppercase mb-2">Mekan Adı</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 bg-gray-50 text-black rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="text-center">
            <label className="block text-sm font-bold text-gray-500 uppercase mb-2">Şehir</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 bg-gray-50 text-black rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end pt-4 space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2.5 px-6 rounded-lg transition-all shadow-md"
            >
              İptal
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg transition-all shadow-md active:scale-95"
            >
              {editData ? 'Güncelle' : 'Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceModal;