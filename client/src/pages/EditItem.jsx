import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CrewmatePreview from '../components/CrewmatePreview';
import BeanPrice from '../components/BeanPrice';
import {
  CHRISTMAS_PACK_PRICE,
  COLOR_OPTIONS,
  HAT_OPTIONS,
  SKIN_OPTIONS,
  VISOR_OPTIONS
} from '../data/options';

const EditItem = ({ onUpdated }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('color');
  const [errorMessage, setErrorMessage] = useState('');

  const [name, setName] = useState('');
  const [color, setColor] = useState('red');
  const [hat, setHat] = useState('none');
  const [skin, setSkin] = useState('none');
  const [visor, setVisor] = useState('none');
  const [hasChristmasPack, setHasChristmasPack] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`/api/items/${id}`);
        const data = await res.json();
        if (res.ok) {
          setName(data.name || '');
          setColor(data.color || 'red');
          setHat(data.hat || 'none');
          setSkin(data.skin || 'none');
          setVisor(data.visor || 'none');
          setHasChristmasPack(data.haschristmaspack || false);
        }
      } catch (err) {
        setErrorMessage('Failed to fetch item data.');
      }
    };
    fetchItem();
  }, [id]);

  const totalPrice = useMemo(() => {
    let sum = 0;
    if (hasChristmasPack) sum += CHRISTMAS_PACK_PRICE;
    const hatItem = HAT_OPTIONS.find((h) => h.id === hat);
    const skinItem = SKIN_OPTIONS.find((s) => s.id === skin);
    const visorItem = VISOR_OPTIONS.find((v) => v.id === visor);
    if (hatItem) sum += hatItem.price;
    if (skinItem) sum += skinItem.price;
    if (visorItem) sum += visorItem.price;
    return sum;
  }, [hasChristmasPack, hat, skin, visor]);

  const handleChristmasPackToggle = (e) => {
    const isChecked = e.target.checked;
    setHasChristmasPack(isChecked);
    if (!isChecked) {
      if (hat === 'santa hat') setHat('none');
      if (skin === 'santa suit') setSkin('none');
      if (visor === "Santa's beard") setVisor('none');
    }
  };

  const handleSelectOption = (category, option) => {
    if (option.requiresChristmas && !hasChristmasPack) {
      alert("⚠️ This item requires the Christmas Pack! Please enable it above to unlock.");
      return;
    }
    if (category === 'color') setColor(option.id);
    if (category === 'hat') setHat(option.id);
    if (category === 'skin') setSkin(option.id);
    if (category === 'visor') setVisor(option.id);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const payload = {
      name,
      color,
      hat: hat === 'none' ? null : hat,
      skin: skin === 'none' ? null : skin,
      visor: visor === 'none' ? null : visor,
      hasChristmasPack,
      price: totalPrice
    };

    try {
      const response = await fetch(`/api/items/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(data.error || 'Failed to update item.');
        return;
      }

      if (onUpdated) {
        await onUpdated();
      }

      navigate(`/item/${id}`);
    } catch (err) {
      setErrorMessage('Network error: ' + err.message);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this crewmate?')) return;
    try {
      await fetch(`/api/items/${id}`, { method: 'DELETE' });
      navigate('/');
    } catch (err) {
      setErrorMessage('Failed to delete item.');
    }
  };

  const activeColorObj = COLOR_OPTIONS.find((c) => c.id === color);

  return (
    <div
      className="customizer-container"
      style={{ '--accent-color': activeColorObj ? activeColorObj.hex : '#C51111' }}
    >
      <h2>Edit Crewmate</h2>
      {errorMessage && <div className="error-banner">{errorMessage}</div>}

      <div className="customizer-layout">
        <div className="preview-pane">
          <CrewmatePreview color={color} hat={hat} skin={skin} visor={visor} />
          <h3 className="preview-name">{name || 'Unnamed Crewmate'}</h3>
          <div className="price-tag">Total Price: <BeanPrice amount={totalPrice} iconSize="1.25em" /></div>
        </div>

        <div className="controls-pane">
          <div className="christmas-pack-toggle">
            <label>
              <input
                type="checkbox"
                checked={hasChristmasPack}
                onChange={handleChristmasPackToggle}
              />
              <span> Enable Christmas Pack (+<BeanPrice amount={CHRISTMAS_PACK_PRICE} />)</span>
            </label>
          </div>

          <div className="subpage-tabs">
            {['color', 'hat', 'skin', 'visor', 'name'].map((tab) => (
              <button
                key={tab}
                type="button"
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="subpage-content">
            {activeTab === 'color' && (
              <div className="options-grid">
                {COLOR_OPTIONS.map((opt) => (
                  <div
                    key={opt.id}
                    className={`option-card ${color === opt.id ? 'selected' : ''}`}
                    onClick={() => handleSelectOption('color', opt)}
                  >
                    <img src={opt.image} alt={opt.name} />
                    <p>{opt.name}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'hat' && (
              <div className="options-grid">
                {HAT_OPTIONS.map((opt) => (
                  <div
                    key={opt.id}
                    className={`option-card ${hat === opt.id ? 'selected' : ''}`}
                    onClick={() => handleSelectOption('hat', opt)}
                  >
                    {opt.image ? <img src={opt.image} alt={opt.name} /> : <div className="no-item">Empty</div>}
                    <p>{opt.name}</p>
                    {opt.requiresChristmas && <small className="req-warning">Requires Pack</small>}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'skin' && (
              <div className="options-grid">
                {SKIN_OPTIONS.map((opt) => (
                  <div
                    key={opt.id}
                    className={`option-card ${skin === opt.id ? 'selected' : ''}`}
                    onClick={() => handleSelectOption('skin', opt)}
                  >
                    {opt.image ? <img src={opt.image} alt={opt.name} /> : <div className="no-item">Empty</div>}
                    <p>{opt.name}</p>
                    {opt.requiresChristmas && <small className="req-warning">Requires Pack</small>}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'visor' && (
              <div className="options-grid">
                {VISOR_OPTIONS.map((opt) => (
                  <div
                    key={opt.id}
                    className={`option-card ${visor === opt.id ? 'selected' : ''}`}
                    onClick={() => handleSelectOption('visor', opt)}
                  >
                    {opt.image ? <img src={opt.image} alt={opt.name} /> : <div className="no-item">Empty</div>}
                    <p>{opt.name}</p>
                    {opt.requiresChristmas && <small className="req-warning">Requires Pack</small>}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'name' && (
              <div className="name-input-pane">
                <label>Crewmate Tag Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={25}
                />
              </div>
            )}
          </div>

          <div className="action-buttons">
            <button className="submit-btn" onClick={handleUpdate}>
              Save Changes
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              Delete Crewmate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItem;