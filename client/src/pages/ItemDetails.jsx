import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CrewmatePreview from '../components/CrewmatePreview';
import BeanPrice from '../components/BeanPrice';

const ItemDetails = ({ onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      const res = await fetch(`/api/items/${id}`);
      if (res.ok) {
        const data = await res.json();
        setItem(data);
      }
    };
    fetchItem();
  }, [id]);

  if (!item) return <div className="loading">Loading Crewmate...</div>;

  return (
    <div className="detail-view">
      <h2>{item.name}</h2>
      <div className="detail-card">
        <CrewmatePreview
          color={item.color}
          hat={item.hat}
          skin={item.skin}
          visor={item.visor}
        />
        <div className="detail-info">
          <p><strong>Color:</strong> {item.color}</p>
          <p><strong>Hat:</strong> {item.hat || 'None'}</p>
          <p><strong>Skin:</strong> {item.skin || 'None'}</p>
          <p><strong>Visor:</strong> {item.visor || 'None'}</p>
          <p><strong>Christmas Pack:</strong> {item.haschristmaspack ? 'Yes' : 'No'}</p>
          <p><strong>Total Cost:</strong> <BeanPrice amount={item.price} iconSize="1.1em" /></p>
        </div>
      </div>
      <div className="detail-actions">
        <Link to={`/edit/${item.id}`}>
          <button className="edit-btn">Edit Crewmate</button>
        </Link>
        <button
          className="delete-btn"
          onClick={async () => {
            await onDelete(item.id);
            navigate('/');
          }}
        >
          Delete Crewmate
        </button>
      </div>
    </div>
  );
};

export default ItemDetails;