import React, { useState, useRef } from "react";
import { Button, Container, Typography } from "@mui/material";
import FunctionsIcon from '@mui/icons-material/Functions';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
function CameraPage() {
    const [imageSrc, setImageSrc] = useState(null);
    const [toggle, setToggle] = useState(false)
    const [stream, setStream] = useState(null);
    const videoRef = useRef(null);
    const imageRef = useRef(null);

    const handleStartCamera = (e) => {
        if (e == "Open") {
            setToggle(!toggle)
        } else {
            setImageSrc(null)

        }
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
                setStream(stream);
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

    const handleCloseCamera = () => {
        setToggle(!toggle)
        window.location.reload(false)
        // navigator.mediaDevices
        //     .getUserMedia({ video: true })
        //     .then((stream) => {
        //         videoRef.current.srcObject = stream;
        //         setStream(stream);
        //     })
        //     .catch((error) => console.error(error));
        // // if (stream) {
        // stream.getTracks().forEach((track) => track.stop());
        // setStream(null);
        // setImageSrc(null);
        // }
    };
    const handleCloseCameraButton = () => {

        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(null);
            setImageSrc(null);
        }
    };
    return (
        <Container sx={{
            backgroundImage: "linear-gradient(180deg, #80FF72, #7EE8FA)",
            color: "white",
            padding: '5em',
            boxShadow: "10px 10px 8px #888888"
        }}>

            <div>
                <center>
                    <Typography variant="h2" sx={{
                        padding: '1em',
                    }}>
                        Agrino
                    </Typography>
                    <Typography variant="h4" component="p" sx={{
                        padding: '1em',
                    }}>
                        Calculate Nitrogen Deficiency Camera
                    </Typography>
                </center>
            </div>
            <div>
                {imageSrc ? (
                    // <div>
                    //     <img ref={imageRef} src={imageSrc} />
                    //     <button onClick={() => setImageSrc(null)}>Retake Picture</button>
                    //     <button onClick={handleCloseCamera}>Close Camera</button>
                    // </div>
                    <center>

                        <br />
                        {toggle ?
                            <>

                                <img ref={imageRef} src={imageSrc} />
                                <br /><br /><br />
                                <Button variant="filled" sx={{
                                    margin: "2em",
                                    borderRadius: "11px",
                                    border: "1px solid white",
                                    color: "white",
                                    "&:hover": {
                                        color: "black",
                                        borderRadius: "11px",
                                        border: "1px solid black",
                                    }
                                }} startIcon={<CameraAltIcon />} onClick={() => handleStartCamera("Retake")}>Retake Picture</Button>
                                <Button variant="filled" sx={{
                                    margin: "2em",
                                    borderRadius: "11px",
                                    border: "1px solid white",
                                    color: "white",
                                    "&:hover": {
                                        color: "black",
                                        borderRadius: "11px",
                                        border: "1px solid black",
                                    }
                                }} startIcon={<CameraAltIcon />} onClick={handleCloseCamera}>Close Camera</Button>
                            </>
                            :
                            <Button variant="filled" sx={{
                                margin: "2em",
                                borderRadius: "11px",
                                border: "1px solid white",
                                color: "white",
                                "&:hover": {
                                    color: "black",
                                    borderRadius: "11px",
                                    border: "1px solid black",
                                }
                            }} startIcon={<CameraAltIcon />} onClick={handleStartCamera}>Open Camera</Button>

                        }
                    </center>
                ) : (
                    <center>
                        {toggle ?
                            <>
                                <video ref={videoRef} autoPlay={true}></video>
                                <br />
                                <br /><br />

                                <Button variant="filled" sx={{
                                    margin: "2em",
                                    borderRadius: "11px",
                                    border: "1px solid white",
                                    color: "white",
                                    "&:hover": {
                                        color: "black",
                                        borderRadius: "11px",
                                        border: "1px solid black",
                                    }
                                }} startIcon={<CameraAltIcon />} onClick={handleTakePicture}>Take Picture</Button>
                                <Button variant="filled" sx={{
                                    margin: "2em",
                                    borderRadius: "11px",
                                    border: "1px solid white",
                                    color: "white",
                                    "&:hover": {
                                        color: "black",
                                        borderRadius: "11px",
                                        border: "1px solid black",
                                    }
                                }} startIcon={<CameraAltIcon />} onClick={handleCloseCamera}>Close Camera</Button>
                            </>
                            :
                            <Button variant="filled" sx={{
                                margin: "2em",
                                borderRadius: "11px",
                                border: "1px solid white",
                                color: "white",
                                "&:hover": {
                                    color: "black",
                                    borderRadius: "11px",
                                    border: "1px solid black",
                                }
                            }} startIcon={<CameraAltIcon />} onClick={() => handleStartCamera("Open")}>Open Camera</Button>

                        }


                        {/* <button onClick={handleTakePicture}>Take Picture</button> */}
                    </center>
                )}
            </div>

        </Container >
    );
}

export default CameraPage;
