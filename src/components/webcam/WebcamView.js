import React from 'react'
import { useState, useRef, useEffect, useCallback } from 'react'
import Webcam from "react-webcam";
import "./webcam.css"
const WebcamView = () => {
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [showCam, setShowCam] = useState(true)
    
    const showWebcam = () => {
      if(showCam){
        setShowCam(false)
      }else{
        setShowCam(true)
      }
    }

    const handleStartCaptureClick = useCallback(() => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
          mimeType: "video/webm"
        });
        mediaRecorderRef.current.addEventListener(
          "dataavailable",
          handleDataAvailable
        );
        mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);

    const handleDataAvailable = useCallback(
        ({ data }) => {
          if (data.size > 0) {
            setRecordedChunks((prev) => prev.concat(data));
          }
        },
        [setRecordedChunks]
    );

    const handleStopCaptureClick = useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);

    const handleDownload = useCallback(() => {
        if (recordedChunks.length) {
          const blob = new Blob(recordedChunks, {
            type: "video/mp4"
          });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          document.body.appendChild(a);
          // a.style = "display: none";
          a.href = url;
          a.download = "react-webcam-stream-capture.mp4";
          a.click();
          window.URL.revokeObjectURL(url);
          setRecordedChunks([]);
        }
    }, [recordedChunks]);

    const videoConstraints = {
      resizeMode: "cover"
    }
    return (
        <div>
          {
            showCam ?
            <div className='webcam-inner'>
              <Webcam width={"100%"} audio={true} ref={webcamRef} videoConstraints={videoConstraints} controls={true} a/>
              {
                capturing ? 
                <div>
                    <button onClick={handleStopCaptureClick}>Stop Capture</button>
                </div> 
                : 
                <div>
                    <button onClick={handleStartCaptureClick}>Start Capture</button>
                </div>
              }
              <div>
                <button onClick={showWebcam}>Go Offline</button>
              </div>
            </div>
            : 
            <div>
              <button onClick={showWebcam}>Go Online</button>
            </div>
          }
          {
              recordedChunks.length > 0 ?
              <div>
                  <button onClick={handleDownload}>Download</button>
              </div>
              : <></>
          }
          
        </div>
    )
}

export default WebcamView


// const WebcamStreamCapture = () => {
    
    
  
    
  
    
  
    
  
//     return (
//       <>
        
//       </>
//     );
//   };
  
//   ReactDOM.render(<WebcamStreamCapture />, document.getElementById("root"));
