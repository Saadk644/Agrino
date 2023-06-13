import React, { useState, useRef, useEffect } from "react";
import { Button, Container, Typography, Grid } from "@mui/material";
import FunctionsIcon from "@mui/icons-material/Functions";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import UploadFile from "@mui/icons-material/UploadFile";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import { makeStyles } from "@mui/styles";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import { styled } from "@mui/system";
import Loader from "../ui/Loader";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const useStyles = makeStyles({
	typography: {
		padding: "1em",
		fontSize: "2rem",
		"@media (max-width: 600px)": {
			fontSize: "1rem",
		},
	},
	headerStyle: {
		padding: "1em",
		"@media (max-width: 600px)": {
			fontSize: "1.7rem",
		},
	},
	takePicture: {
		"@media (max-width: 600px)": {
			display: "none",
			boder: "none",
		},
	},
	colorStatus: {
		paddingTop: "1.5em",
	},
	circle: {
		position: "absolute",
		zIndex: "100",
		border: "4px solid white",
		width: "25rem",
		height: "20rem",
		// borderRadius: '50%',
	},
});
const StyledForm = styled("form")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	gap: theme.spacing(2),
}));
function CameraPage() {
	const navigate = useNavigate();

	const classes = useStyles();
	const [selectedFile, setSelectedFile] = useState(null);
	const [imageSrc, setImageSrc] = useState(null);
	const [toggle, setToggle] = useState(false);
	const [uploadImage, setUploadImage] = useState(false);
	const [stream, setStream] = useState(null);
	const [color, setColor] = useState();
	const videoRef = useRef(null);
	const imageRef = useRef(null);
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState({});

	const handleFileChange = (e) => {
		setSelectedFile(e.target.files[0]);
	};

	const dataURLToFile = (dataUrl, filename) => {
		const arr = dataUrl.split(",");
		const mime = arr[0].match(/:(.*?);/)[1];
		const bstr = atob(arr[1]);
		let n = bstr.length;
		const u8arr = new Uint8Array(n);
		while (n--) {
		  u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], filename, { type: mime });
	  };
	  
	useEffect(() => {
		var imageStr = "";
		if (imageSrc != null) {
			console.log("This is image Ref", imageSrc);
			setLoading(true)
			// imageStr = imageSrc.split(",")[1];

			var formdata = new FormData();
			formdata.append("file",  dataURLToFile(imageSrc, "image.png"));

			const url = `http://127.0.0.1:8000/`;
			const options = {
				method: "POST",
				body: formdata,
				processData: false,
				contentType: false,
				mimeType: "multipart/form-data",
				headers: {
					"X-CSRFToken": Cookies.get("csrftoken"),
				},
			};
			fetch(url, options)
				.then((response) => response.json())
				.then((result) => {
					console.log(result);
					setColor(result?.color);
					setLoading(false)
					setResult(result)
				})
				.catch((error) => console.log("error", error));
		}
	}, [imageSrc]);

	const handleStartCamera = (e) => {
		setUploadImage(false);
		if (e == "Open") {
			setToggle(!toggle);
		} else {
			setImageSrc(null);
		}
		navigator.mediaDevices
			.getUserMedia({ video: true })
			.then((stream) => {
				videoRef.current.srcObject = stream;
				setStream(stream);
			})
			.catch((error) => console.error(error));
	};

	const uploadImageBtnHandler = () => {
		setUploadImage(!uploadImage);
	};

	const handleTakePicture = () => {
		const canvas = document.createElement("canvas");
		canvas.width = videoRef.current.videoWidth;
		canvas.height = videoRef.current.videoHeight;
		canvas.getContext("2d").drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
		const dataUrl = canvas.toDataURL("image/png");
		setImageSrc(dataUrl);
	};

	const handleCloseCamera = () => {
		setToggle(!toggle);
		window.location.reload(false);
	};
	const handleCloseCameraButton = () => {
		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
			setStream(null);
			setImageSrc(null);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Perform your submit logic here
		console.log(selectedFile);
		setLoading(true);

		const formdata = new FormData();
		formdata.append("file", selectedFile);

		const url = `http://127.0.0.1:8000/`;
		const options = {
			method: "POST",
			body: formdata,
			processData: false,
			contentType: false,
			mimeType: "multipart/form-data",
			headers: {
				"X-CSRFToken": Cookies.get("csrftoken"),
			},
		};
		fetch(url, options)
			.then((response) => response.json())
			.then((data) => {
				console.log("Success:", data);
				setLoading(false);
				setResult(data)
				navigate("/detail", {state: {value: data}});
			});

	};

	const proceedHandler = async () => {
		if (stream) {
			await stream.getTracks().forEach((track) => track.stop());
			setStream(null);
		}
		navigate("/detail", {state: {value: result}});
	};

	return (
		<Container
			sx={{
				color: "white",
				padding: "5em 1em",
			}}
		>
			{loading && <Loader />}
			<div>
				<center>
					<Typography
						variant="h2"
						sx={{
							padding: "1em",
							"@media (max-width: 600px)": {
								fontSize: "2rem",
							},
						}}
					>
						Agrino
					</Typography>
					<Typography
						variant="h4"
						component="p"
						sx={{
							padding: "1em",
							fontSize: "2rem",
							"@media (max-width: 600px)": {
								fontSize: "1rem",
							},
						}}
					>
						Calculate Nitrogen Deficiency Camera
					</Typography>
					{uploadImage && (
						<div>
							<form className="text-center" onSubmit={handleSubmit}>
								<div class="form-group row">
									<div className="col-md-3"></div>
									<div className="col-md-6">
										<input type="file" class="form-control" accept=".jpg,.png,.jpeg" onChange={handleFileChange} />
									</div>
									<div className="col-md-3 p-0"></div>
								</div>
								<Button type="submit" variant="contained" color="primary" className="mt-4">
									Submit
								</Button>
							</form>
						</div>
					)}
				</center>
			</div>
			<div>
				{imageSrc ? (
					<center>
						<br />
						{toggle ? (
							<>
								<div style={{ position: "relative", paddingBottom: "56.25%", paddingTop: "0", height: "0" }}>
									<img src={imageSrc} style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }} />
									<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh" }}>
										<div className={classes.circle}>
											<span>
												<h6>Targeted Area</h6>
											</span>
										</div>
									</div>
								</div>

								<div className={classes.colorStatus}>
									<h2>
										<strong>RGB Code: </strong>
										{color}
									</h2>
								</div>
								<br />
								<br />
								<br />
								<div
									style={{
										display: "flex",
										justifyContent: "space-evenly",
									}}
								>
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
											"@media (max-width: 600px)": {
												border: "none",
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
											"@media (max-width: 600px)": {
												border: "none",
											},
										}}
										startIcon={<ArrowRightAlt />}
										onClick={proceedHandler}
									>
										<span className={classes.takePicture}>Proceed</span>
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
											"@media (max-width: 600px)": {
												border: "none",
											},
										}}
										startIcon={<NotInterestedIcon />}
										onClick={handleCloseCamera}
									>
										<span className={classes.takePicture}>Close Camera</span>
									</Button>
								</div>
							</>
						) : (
							<Button
								variant="filled"
								sx={{
									margin: "2em 2em 2em 2em",
									borderRadius: "11px",
									border: "1px solid white",
									color: "white",
									"@media (max-width: 600px)": {
										border: "none",
									},
									"&:hover": {
										color: "black",
										borderRadius: "11px",
										border: "1px solid black",
									},
								}}
								startIcon={<CameraAltIcon />}
								onClick={handleStartCamera}
							>
								Open Camera
							</Button>
						)}
					</center>
				) : (
					<center>
						{toggle ? (
							<>
								<div style={{ position: "relative", paddingBottom: "56.25%", paddingTop: "0", height: "0" }}>
									<video src="your-video.mp4" style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }} ref={videoRef} autoPlay={true}></video>
									<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh" }}>
										<div className={classes.circle}>
											<span style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", fontSize: "0.5em" }}>
												<h6>Targeted Area</h6>
											</span>
										</div>
									</div>
								</div>
								{/* <video ref={videoRef} autoPlay={true}></video> */}
								<br />
								<br />
								<br />

								<div
									style={{
										display: "flex",
										justifyContent: "space-evenly",
									}}
								>
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
											"@media (max-width: 600px)": {
												border: "none",
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
											"@media (max-width: 600px)": {
												border: "none",
											},
										}}
										startIcon={<NotInterestedIcon />}
										onClick={handleCloseCamera}
									>
										<span className={classes.takePicture}>Close Camera</span>
									</Button>
								</div>
							</>
						) : (
							//This is Camera
							<div>
								<Button
									variant="filled"
									sx={{
										margin: "2em 2em 30em 2em",
										borderRadius: "11px",
										border: "1px solid white",
										color: "white",
										"&:hover": {
											color: "black",
											borderRadius: "11px",
											border: "1px solid black",
										},
										"@media (max-width: 600px)": {
											border: "none",
										},
									}}
									startIcon={<CameraAltIcon />}
									onClick={() => handleStartCamera("Open")}
								>
									<span className={classes.takePicture}>Open Camera</span>
								</Button>
								<Button
									variant="filled"
									sx={{
										margin: "2em 2em 30em 2em",
										borderRadius: "11px",
										border: "1px solid white",
										color: "white",
										"&:hover": {
											color: "black",
											borderRadius: "11px",
											border: "1px solid black",
										},
										"@media (max-width: 600px)": {
											border: "none",
										},
									}}
									startIcon={<UploadFile />}
									onClick={uploadImageBtnHandler}
								>
									<span className={classes.takePicture}>Upload Image</span>
								</Button>
							</div>
						)}

						{/* <button onClick={handleTakePicture}>Take Picture</button> */}
					</center>
				)}
			</div>
		</Container>
	);
}

export default CameraPage;
