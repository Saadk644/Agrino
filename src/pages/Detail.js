import { Button, Container, Typography } from "@mui/material";
import FunctionsIcon from "@mui/icons-material/Functions";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useRef } from "react";
import Topbar from "../ui/Navbar";

function Detail() {
	const link = `${window.baseURL}`;
	console.log(link);
	const navigate = useNavigate();
	const location = useLocation();
	const [error, setError] = useState(false);
	const result = location.state?.value;
	const area = useRef();
	const width = useRef();
	const height = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		setError(false);
		// Perform your submit logic here

		const data = {
			area: area.current.value,
			width: width.current.value,
			height: height.current.value,
		};

		if (!data.height || !data.width) {
			setError(true);
		} else {
			console.log(data);
			//perform calculations here
			console.log(result)
			if(data.area === "Marla"){
				data.width = data.width * 272.25;
				data.height = data.height * 272.25;
			}
			else if(data.area === "Kanal"){
				data.width = data.width * 5445;
				data.height = data.height * 5445;
			}
			else if(data.area === "Acre"){
				data.width = data.width * 43560;
				data.height = data.height * 43560;
			}
			else if(data.area === "Square Feet"){
				data.width = data.width * 1;
				data.height = data.height * 1;
			}
			const formula = parseFloat(data.width) * parseFloat(data.height) * result.deficiency_percent / 100 *  (Math.random() * (0.0034 - 0.0018) + 0.0018) ;
			navigate("/results", { state: { value: formula, result: result } });
		}
	};
	return (
		<>
			<Topbar />

			{/* <Container
				style={{ height: "100vh" }}
				sx={{
					color: "white",
					padding: "5em 1em",
				}}
			> */}
			<div className="page">
				<div className="overlay">
					<center>
						<h3 style={{ color: "white", marginTop:'60px' }}>Please Specify Details</h3>
						{error && <h4 style={{ color: "red" }}>Input all fields</h4>}
						<div class="row mt-5">
							<div class="col-md-3"></div>
							<div class="col-md-6">
								<form onSubmit={handleSubmit} style={{ padding: "0 20px" }}>
									<div class="form-group row">
										<div for="" className="col-md-3 fs-5">
											<label style={{ color: "white" }}>Area Unit</label>
										</div>
										<div className="col-md-7">
											<select class="form-control" ref={area}>
												<option value="Marla">Marla</option>
												<option value="Sq.ft">Sq.ft</option>
												<option value="Canal">Canal</option>
												<option value="Acre">Acre</option>
											</select>
										</div>
									</div>

									<div class="form-group row mt-4">
										<div for="" className="col-md-3 fs-5">
											<label style={{ color: "white" }}>Width</label>
										</div>
										<div className="col-md-7">
											<input type="number" min="0" step="0.01" class="form-control" placeholder="Enter Width" ref={width} />
										</div>
									</div>

									<div class="form-group row mt-4">
										<div for="" className="col-md-3 fs-5">
											<label style={{ color: "white" }}>Length</label>
										</div>
										<div className="col-md-7">
											<input type="number" min="0" step="0.01" class="form-control" placeholder="Enter Height" ref={height} />
										</div>
									</div>
									<button type="submit" class="btn btn-warning mt-5">
										Calculate
									</button>
								</form>
							</div>
							<div class="col-md-3"></div>
						</div>
					</center>
					{/* </Container> */}
				</div>
			</div>
		</>
	);
}

export default Detail;
