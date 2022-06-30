import React, {useRef} from 'react';
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import logo from './logo.svg';
import './App.css';

function App() {
  const webcamRef = useRef(null);
  const cameraRef = useRef(null);
  return (
    <div className="App">
      <header className="App-header">
        <Webcam ref={webcamRef}
        style={{
          position:"absolute",
          marginLeft:"auto",
          marginRight:"auto",
          left:0,
          right:0,
          textAlign:"center",
          zindex:9,
          width:640,
          height:480
        }}
        />
        <canvas ref={cameraRef}
        style={{
          position:"absolute",
          marginLeft:"auto",
          marginRight:"auto",
          left:0,
          right:0,
          textAlign:"center",
          zindex:9,
          width:640,
          height:480
        }}/>
      </header>
    </div>
  );
}

export default App;
