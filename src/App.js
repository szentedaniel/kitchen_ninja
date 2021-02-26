// eslint-disable-next-line
import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  const [{ Accelerometer_gx, Accelerometer_gy, Accelerometer_gz,
    Accelerometer_x, Accelerometer_y, Accelerometer_z, Accelerometer_i, Gyroscope_z, Gyroscope_x, Gyroscope_y}, setMotion] = useState({ Accelerometer_gx: 0, Accelerometer_gy: 0, Accelerometer_gz: 0, Accelerometer_x: 0, Accelerometer_y: 0, Accelerometer_z:0,
                                                                                                                                      Accelerometer_i: 0, Gyroscope_x: 0, Gyroscope_y: 0, Gyroscope_z: 0});
  const [{alpha, gamma, beta}, setOrientation] = useState({alpha: 0, gamma: 0, beta: 0})
  

    function requestPermission(){
      if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
          .then(permissionState => {
            if (permissionState === 'granted') {

            }
          })
          .catch(console.error);
      } else {
        // handle regular non iOS 13+ devices

      }

      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
          .then(permissionState => {
            if (permissionState === 'granted') {
              
            }
          })
          .catch(console.error);
      } else {
        // handle regular non iOS 13+ devices
      }
    }
    

      useEffect(() => {
        if (window.DeviceOrientationEvent) {
        const handleOrientationEvent = event => {
            setOrientation({
               alpha: event.alpha,
               gamma: event.gamma,
               beta: event.beta
             })
        };
        window.addEventListener('deviceorientation', handleOrientationEvent, true);
        return () => window.removeEventListener('deviceorientation', handleOrientationEvent);
      }else{
        return null;
      }
    }, []);



  useEffect(() => {
    const handleMotionEvent = event => {
      setMotion({
        Accelerometer_gx: event.accelerationIncludingGravity.x,
        Accelerometer_gy: event.accelerationIncludingGravity.y,
        Accelerometer_gz: event.accelerationIncludingGravity.z,
 
        Accelerometer_x: event.acceleration.x,
        Accelerometer_y: event.acceleration.y,
        Accelerometer_z: event.acceleration.z,
 
        Accelerometer_i: event.interval,
 
        Gyroscope_z: event.rotationRate.alpha,
        Gyroscope_x: event.rotationRate.beta,
        Gyroscope_y: event.rotationRate.gamma,
      })
    };
    window.addEventListener('devicemotion', handleMotionEvent, true);
    return () => window.removeEventListener('devicemotion', handleMotionEvent);
}, []);

    
 
  return (
    <div className="App">
      <header className="App-header">
        <h1>Orientation</h1>
        <h2>alpha: {alpha}</h2>
        <h2>gamma: {gamma}</h2>
        <h2>beta: {beta}</h2>
        <h1>Accelerometer</h1>
        <h2>x: {Accelerometer_x}</h2>
        <h2>y: {Accelerometer_y}</h2>
        <h2>z: {Accelerometer_z}</h2>
        <h2>Data interval: {Accelerometer_i}</h2>
        <h1>Accelerometer including gravity</h1>
        <h2>x: {Accelerometer_gx}</h2>
        <h2>y: {Accelerometer_gy}</h2>
        <h2>z: {Accelerometer_gz}</h2>
        <h1>Gyroscope</h1>
        <h2>x: {Gyroscope_x}</h2>
        <h2>y: {Gyroscope_y}</h2>
        <h2>z: {Gyroscope_z}</h2>
        <button onClick={requestPermission}>Gyerunk</button>
        <h2>ehh</h2>
        <img src={logo} alt=""/>
      </header>
    </div>
  );
}

export default App;
