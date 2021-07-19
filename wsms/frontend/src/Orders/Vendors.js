import React from 'react';

const Vendors = ({ vendors, filterOrders }) => {
  return (
    <div>
      {vendors.map((vendor, index) => {
        return (
          <button
            type="button"
            key={index}
            onClick={() => filterOrders(vendor)}
          >
            {vendor}
          </button>
        );
      })}
    </div>
  );
};

export default Vendors;
