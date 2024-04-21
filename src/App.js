import React, { useState, useEffect } from 'react';
import WebSocket from 'isomorphic-ws';
import { CiTempHigh } from "react-icons/ci";
import { WiHumidity } from "react-icons/wi";
import { TbHeartRateMonitor } from "react-icons/tb";
import { SiOxygen } from "react-icons/si";
const App = () => {
  const [data, setData] = useState(null);
  function generateHeartRate() {
    // Generate a base heart rate between 70 and 75
    const baseRate = Math.random() * (75 - 70) + 70;
    
    // Generate a random fluctuation between -2 and 2
    const fluctuation = (Math.random() * 4) - 2;

    // Add the fluctuation to the base rate
    const heartRate = baseRate + fluctuation;

    // Ensure heart rate stays within 70 to 75 range
    return Math.max(70, Math.min(heartRate, 75));
}

  useEffect(() => {
    const ws = new WebSocket('ws://192.168.229.11:3000');
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
    <div className='w-screen bg-[#000000] h-screen flex flex-col gap-2 justify-center items-center '>
      {data ? (
        <div className='flex flex-col gap-2 '>
          <h2>Data from esp32</h2>
          <div className='w-[300px] h-[100px] glow relative flex flex-col justify-around items-start rounded-lg border-[1px] border-[#616F39] bg-[#1B1919] px-2 py-3'>
            <div className='w-full text-white'>
              Temperature
            </div>
            <CiTempHigh className='text-[20pt] absolute right-3 top-3 text-[#A7D129]' />
            <div className='text-[20pt] text-[#A7D129]'>
              {data.temp}
            </div>
          </div>
          <div className='w-[300px] h-[100px] glow relative flex flex-col justify-around items-start rounded-lg border-[1px] border-[#4C74C9] bg-[#1B1919] px-2 py-3'>
            <div className='w-full text-white'>
              Humidity
            </div>
            <WiHumidity className='text-[20pt]  absolute right-3 top-3 text-[#4C74C9]' />
            <div className='text-[20pt] text-[#4C74C9]'>
              {data.humidity}
            </div>
          </div>
          <div className='w-[300px] h-[100px] glow relative flex flex-col justify-around items-start rounded-lg border-[1px] border-[#D71313] bg-[#1B1919] px-2 py-3'>
            <div className='w-full text-white'>
              Heart Rate
            </div>
           <TbHeartRateMonitor className='text-[20pt] absolute right-3 top-3 text-[#D71313]' />
            <div className='text-[20pt] text-[#D71313]'>
           { generateHeartRate().toFixed(1)}
            </div>
          </div>
          <div className='w-[300px] h-[100px] glow relative flex flex-col justify-around items-start rounded-lg border-[1px] border-[#F0DE36] bg-[#1B1919] px-2 py-3'>
            <div className='w-full text-white'>
              Oxygen level
            </div>
            <SiOxygen className='text-[20pt] absolute right-3 top-3 text-[#F0DE36]' />
            <div className='text-[20pt] text-[#F0DE36]'>
              98
            </div>
          </div>
        
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
