import React from 'react';

const BeanPrice = ({ amount, className = '', iconSize = '1.1em' }) => {
  const numericAmount = Number(amount) || 0;

  return (
    <span className={`bean-price-tag ${className}`}>
      <img
        src="/assets/bean.webp"
        alt="Beans"
        className="bean-icon"
        style={{ width: iconSize, height: iconSize }}
      />
      <span>{numericAmount.toLocaleString()}</span>
    </span>
  );
};

export default BeanPrice;