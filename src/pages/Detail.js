import { Button, Container, Typography } from "@mui/material";
import FunctionsIcon from "@mui/icons-material/Functions";
import { useNavigate } from "react-router-dom";
import React, {useState, useRef} from 'react'

function Detail() {
	const navigate = useNavigate();
    const [error, setError] = useState(false)
    const area = useRef()
    const width = useRef()
    const height = useRef()

    const handleSubmit = (e) => {
		e.preventDefault();
        setError(false)
		// Perform your submit logic here

        const data = {
            area: area.current.value,
            width: width.current.value,
            height: height.current.value,
        }

        if(!(data.height) || !(data.width)){
            setError(true)
        }
        else{
            console.log(data)

            //perform calculations here
            const formula = parseFloat(data.width) * parseFloat(data.height) * 50
            navigate("/results", { state: { value: formula } })

        }
	};
	return (
		<Container
        style={{ height: '100vh' }}
			sx={{
				color: "white",
				padding: "5em",
			}}
		>
			<center>
				<h3>Please Specify Details</h3>
                {error && <h4 style={{color:'red'}}>Input all fields</h4>}
				<div class="row mt-5">
					<div class="col-md-3"></div>
					<div class="col-md-6">
						<form onSubmit={handleSubmit}>
							<div class="form-group row">
								<div for="" className="col-md-3 fs-5">
									<label>Area Unit</label>
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
									<label>Width</label>
								</div>
								<div className="col-md-7">
									<input type="number" min='0' step="0.01" class="form-control" placeholder="Enter Width" ref={width}/>
								</div>
							</div>

                            <div class="form-group row mt-4">
								<div for="" className="col-md-3 fs-5">
									<label>Height</label>
								</div>
								<div className="col-md-7">
									<input type="number" min='0' step="0.01" class="form-control" placeholder="Enter Height" ref={height}/>
								</div>
							</div>
                            <button type="submit" class="btn btn-primary mt-5">Calculate</button>
						</form>
					</div>
					<div class="col-md-3"></div>
				</div>
			</center>
		</Container>
	);
}

export default Detail;
