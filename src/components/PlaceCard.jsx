import React from 'react';

const PlaceCard = ({ place, onToggle, onEdit, onDelete }) => {
  return (
    <div className={`bg-white border rounded-lg p-5 shadow-sm transition-all flex justify-between items-center ${
      place.isVisited ? 'border-gray-200 bg-gray-50/30' : 'border-blue-200 bg-blue-50'
    }`}>
      <div className="flex items-center gap-4 flex-1">
        <input
          type="checkbox"
          checked={place.isVisited}
          onChange={onToggle}
          className="w-5 h-5 cursor-pointer accent-blue-900"
        />
        
        <div className="flex-1">

          <div className="flex flex-col items-start gap-1">
            <h3 className={`text-xl font-bold transition-all ${
              place.isVisited ? 'line-through text-gray-400' : 'text-gray-800'
            }`}>
              {place.name}
            </h3>
            <span className={`text-xs font-semibold px-2 py-1 rounded ${
              place.isVisited ? 'bg-gray-100 text-gray-400' : ' text-blue-700'
            }`}>
              📍{place.city}
            </span>
          </div>

          <p className={`text-sm mt-1 italic transition-all ${
            place.isVisited ? 'text-gray-300' : 'text-gray-600'
          }`}>
          </p>
        </div>
      </div>

      <div className="ml-4 flex flex-col items-end gap-2">
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full border ${
            place.isVisited
              ? 'bg-gray-100 text-gray-700 border-gray-200'
              : 'bg-green-100 text-green-900 border-green-600'
            }`}
        >
          {place.isVisited ? 'Gezildi' : 'Gezilecek'}
        </span>

        <button  //düzenle butonu
          onClick={onEdit}
          className="text-xs  bg-blue-100 border-gray-400 hover:bg-gray-300 text-gray-700 font-bold py-1.5 px-3 rounded shadow-sm transition-colors"
        >
          Düzenle
        </button>
        
        <button //sil butonu
          onClick={onDelete}
          className="text-xs bg-red-50 border border-red-200 hover:bg-red-100 text-red-600 font-bold py-1.5 px-3 rounded shadow-sm transition-colors"
        >
          Sil
        </button>
      </div>
    </div>
  );
};

export default PlaceCard;