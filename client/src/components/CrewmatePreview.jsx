import React from 'react';
import { COLOR_OPTIONS, HAT_OPTIONS, SKIN_OPTIONS, VISOR_OPTIONS } from '../data/options';

const CrewmatePreview = ({ color, hat, skin, visor }) => {
  const colorObj = COLOR_OPTIONS.find((c) => c.id === color) || COLOR_OPTIONS[0];
  const hatObj = HAT_OPTIONS.find((h) => h.id === hat);
  const skinObj = SKIN_OPTIONS.find((s) => s.id === skin);
  const visorObj = VISOR_OPTIONS.find((v) => v.id === visor);

  return (
    <div className="crewmate-canvas">
      {colorObj?.image && (
        <img
          src={colorObj.image}
          alt={colorObj.name}
          className="layer layer-body"
        />
      )}

      {skinObj?.image && (
        <img
          src={skinObj.image}
          alt={skinObj.name}
          className="layer layer-skin"
          style={skinObj.style}
        />
      )}

      {visorObj?.image && (
        <img
          src={visorObj.image}
          alt={visorObj.name}
          className="layer layer-visor"
          style={visorObj.style}
        />
      )}

      {hatObj?.image && (
        <img
          src={hatObj.image}
          alt={hatObj.name}
          className="layer layer-hat"
          style={hatObj.style}
        />
      )}
    </div>
  );
};

export default CrewmatePreview;