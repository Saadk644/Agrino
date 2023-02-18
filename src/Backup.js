import React, { useRef, useState } from "react"
// import { Button, Typography } from "@mui/material";
// import CameraAltIcon from '@mui/icons-material/CameraAlt';
// import { Container } from "@mui/system";
function App() {
    const [imageSrc, setImageSrc] = useState(null);
    const videoRef = useRef(null);
    const imageRef = useRef(null);

    const handleStartCamera = () => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
            })
            .catch((error) => console.error(error));
    };

    const handleTakePicture = () => {
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        canvas
            .getContext("2d")
            .drawImage(
                videoRef.current,
                0,
                0,
                videoRef.current.videoWidth,
                videoRef.current.videoHeight
            );
        const dataUrl = canvas.toDataURL();
        setImageSrc(dataUrl);
        imageRef.current.src = dataUrl;
    };

    return (
        <div>
            {imageSrc ? (
                <div>
                    <img ref={imageRef} src={imageSrc} />
                    <button onClick={() => setImageSrc(null)}>Retake Picture</button>
                </div>
            ) : (
                <div>
                    <video ref={videoRef} autoPlay={true}></video>
                    <button onClick={handleStartCamera}>Open Camera</button>
                    <button onClick={handleTakePicture}>Take Picture</button>
                </div>
            )}
        </div>
    );
}

export default App;
