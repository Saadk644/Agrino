import React, { useState, useRef, useEffect } from "react";
import { Button, Container, Typography } from "@mui/material";
import FunctionsIcon from '@mui/icons-material/Functions';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { makeStyles } from '@mui/styles';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
const useStyles = makeStyles({
    typography: {
        padding: '1em',
        fontSize: '2rem',
        '@media (max-width: 600px)': {
            fontSize: '1rem',
        },
    },
    headerStyle: {
        padding: '1em',
        '@media (max-width: 600px)': {
            fontSize: '1.7rem',
        },
    },
    takePicture: {
        '@media (max-width: 600px)': {
            display: 'none',
            boder: 'none'
        },
    }
});
function CameraPage() {
    const classes = useStyles();
    const [imageSrc, setImageSrc] = useState(null);
    const [file, setfile] = useState()
    const [toggle, setToggle] = useState(false)
    const [stream, setStream] = useState(null);
    const [csfbr, setcsfbr] = useState()
    const videoRef = useRef(null);
    const imageRef = useRef(null);
    useEffect(() => {
        var myHeaders = new Headers();
        // myHeaders.append("Cookie", "csrftoken=jvRIcOguHNm7cGv5NPUhdtyBIPqRCsAPc6tWAetqou1k9LgXIUyfW3i9yZU8Zyoq");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/token", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setcsfbr(result.csrfToken)
            })
            .catch(error => console.log('error', error));
    }, [])

    useEffect(() => {
        console.log("This is image Ref", imageSrc)

  
        var myHeaders = new Headers();
        // myHeaders.append("Cookie", "csrftoken=jvRIcOguHNm7cGv5NPUhdtyBIPqRCsAPc6tWAetqou1k9LgXIUyfW3i9yZU8Zyoq");

        var formdata = new FormData();
        formdata.append("image", imageSrc);
        formdata.append("csrfToken", csfbr);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }, [imageSrc])
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
        const dataUrl = canvas.toDataURL('image/png');
        setImageSrc(dataUrl);
     
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

            color: "white",
            padding: '5em',
        }}>

            <div>
                <center>
                    <Typography variant="h2" sx={{
                        padding: '1em',
                        '@media (max-width: 600px)': {
                            fontSize: '2rem',
                        },
                    }}>
                        Agrino
                    </Typography>
                    <Typography variant="h4" component="p" sx={{
                        padding: '1em',
                        fontSize: '2rem',
                        '@media (max-width: 600px)': {
                            fontSize: '1rem',
                        },
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
                                <div style={{ position: 'relative', paddingBottom: '56.25%', paddingTop: '0', height: '0' }}>
                                    <img src={imageSrc} style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }} />
                                </div>
                                <br /><br /><br />
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                }}>
                                    <Button
                                        variant="filled"
                                        sx={{
                                            margin: "2em",
                                            borderRadius: "11px",
                                            border: "1px solid white",
                                            color: "white",
                                            "&:hover": {
                                                color: "black",
                                                borderRadius: "11px",
                                                border: "1px solid black",
                                            },
                                            '@media (max-width: 600px)': {
                                                border: 'none'
                                            },
                                        }}
                                        startIcon={<CameraAltIcon />}
                                        onClick={() => handleStartCamera("Retake")}
                                    >
                                        <span className={classes.takePicture}>Retake Picture</span>
                                    </Button>

                                    <Button
                                        variant="filled"
                                        sx={{
                                            margin: "2em",
                                            borderRadius: "11px",
                                            border: "1px solid white",
                                            color: "white",
                                            "&:hover": {
                                                color: "black",
                                                borderRadius: "11px",
                                                border: "1px solid black",
                                            },
                                            '@media (max-width: 600px)': {
                                                border: 'none'
                                            },
                                        }}
                                        startIcon={<NotInterestedIcon />}
                                        onClick={handleCloseCamera}
                                    >
                                        <span className={classes.takePicture}>Close Camera</span>
                                    </Button>
                                </div>
                            </>
                            :
                            <Button variant="filled" sx={{
                                margin: "2em 2em 2em 2em",
                                borderRadius: "11px",
                                border: "1px solid white",
                                color: "white",
                                '@media (max-width: 600px)': {
                                    border: 'none'
                                },
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
                                <div style={{ position: 'relative', paddingBottom: '56.25%', paddingTop: '0', height: '0' }}>
                                    <video src="your-video.mp4" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }} ref={videoRef} autoPlay={true}></video>
                                </div>
                                {/* <video ref={videoRef} autoPlay={true}></video> */}
                                <br />
                                <br /><br />

                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                }}>
                                    <Button
                                        variant="filled"
                                        sx={{
                                            margin: "2em",
                                            borderRadius: "11px",
                                            border: "1px solid white",
                                            color: "white",
                                            "&:hover": {
                                                color: "black",
                                                borderRadius: "11px",
                                                border: "1px solid black",
                                            },
                                            '@media (max-width: 600px)': {
                                                border: 'none'
                                            },
                                        }}
                                        startIcon={<CameraAltIcon />}
                                        onClick={handleTakePicture}
                                    >
                                        <span className={classes.takePicture}>Take Picture</span>
                                    </Button>

                                    <Button
                                        variant="filled"
                                        sx={{
                                            margin: "2em",
                                            borderRadius: "11px",
                                            border: "1px solid white",
                                            color: "white",
                                            "&:hover": {
                                                color: "black",
                                                borderRadius: "11px",
                                                border: "1px solid black",
                                            },
                                            '@media (max-width: 600px)': {
                                                border: 'none'
                                            },
                                        }}
                                        startIcon={<NotInterestedIcon />}
                                        onClick={handleCloseCamera}
                                    >
                                        <span className={classes.takePicture}>Close Camera</span>
                                    </Button>
                                </div>

                            </>
                            :
                            //This is Camera

                            <Button variant="filled" sx={{
                                margin: "2em 2em 30em 2em",
                                borderRadius: "11px",
                                border: "1px solid white",
                                color: "white",
                                "&:hover": {
                                    color: "black",
                                    borderRadius: "11px",
                                    border: "1px solid black",
                                },
                                '@media (max-width: 600px)': {
                                    border: 'none'
                                },
                            }} startIcon={<CameraAltIcon />} onClick={() => handleStartCamera("Open")}><span className={classes.takePicture}>Open Camera</span></Button>

                        }


                        {/* <button onClick={handleTakePicture}>Take Picture</button> */}
                    </center>
                )}
            </div>

        </Container >
    );
}

export default CameraPage;
