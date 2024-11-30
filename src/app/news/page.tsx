import React from 'react';

export default async function Page() {

  return (
    <div>
      {news.map((item) => (
        <div key={item._id}>
          <h2>{item.title}</h2>
          <p>{item.subtitle}</p>
        </div>
      ))}
    </div>
  );
}
