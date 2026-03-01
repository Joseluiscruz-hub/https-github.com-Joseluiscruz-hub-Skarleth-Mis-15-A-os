// Updated Parents component

import React from 'react';
import ParentCard from './ParentCard';

const Parents = () => (
  <div>
    <h2>Godparents</h2>
    <div>
      <ParentCard name="John Doe" />
      <ParentCard name="Jane Doe" />
      {/* Other ParentCards can be added here */}
    </div>
  </div>
);

export default Parents;