import React, { useState, useEffect } from 'react';
import WebSocket from 'isomorphic-ws';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws:///192.168.18.241:3000');
    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = event => {
      const newData = JSON.parse(event.data);
      setData(newData);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center '>
      {data ? (
        <div>
          <h2>Data:</h2>
          <p>ID: {data.id}</p>
          <p>Temperature: {data.temp}</p>
          <p>Oxygen: {data.oxy}</p>
          <p>Heart Rate: {data.heart_rate}</p>
          <p>Humidity: {data.humidity}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
