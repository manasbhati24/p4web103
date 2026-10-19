import React from 'react';
import { Link } from 'react-router-dom';
import CrewmatePreview from '../components/CrewmatePreview';
import BeanPrice from '../components/BeanPrice';

const ItemsList = ({ items, onDelete }) => {
  return (
    <div className="items-list-container">
      <h2>Meet Your Fellow Crewmates!</h2>
      {items.length === 0 ? (
        <p className="empty-message">No crewmates created yet. Go create one!</p>
      ) : (
        <div className="items-grid">
          {items.map((item) => (
            <div key={item.id} className="crewmate-card">
              <div className="card-actions-overlay">
                <Link
                  to={`/edit/${item.id}`}
                  className="action-icon-btn"
                  title="Customize Crewmate"
                >
                  <img
                    src="/assets/actions/customize.png"
                    alt="Customize"
                    className="action-icon"
                  />
                </Link>
                <button
                  type="button"
                  className="action-icon-btn kill-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item.id);
                  }}
                  title="Kill Crewmate"
                >
                  <img
                    src="/assets/actions/kill.png"
                    alt="Kill"
                    className="action-icon"
                  />
                </button>
              </div>

              <Link to={`/item/${item.id}`} className="card-main-link">
                <div className="card-preview">
                  <CrewmatePreview
                    color={item.color}
                    hat={item.hat}
                    skin={item.skin}
                    visor={item.visor}
                  />
                </div>

                <div className="card-bottom-bar">
                  <h3 className="card-name">{item.name}</h3>
                  <div className="card-cost">
                    <BeanPrice amount={item.price} iconSize="1.1em" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemsList;