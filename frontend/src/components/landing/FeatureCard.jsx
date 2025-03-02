import React from 'react'

const FeatureCard = ({title,desc}) => {
    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="text-gray-600 mt-2">{desc}</p>
        </div>
      );
}

export default FeatureCard