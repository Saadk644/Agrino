import React, { useRef, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Logo from "../assets/images/logo.png"; // Import your logo image
import NIABLogo from "../assets/images/niab-logo.png"; // Import your logo image
import "../assets/css/index.css";
import { useNavigate } from "react-router-dom";

function Login() {
	const navigate = useNavigate();

	const [error, setError] = useState(false);

	const username = useRef();
	const password = useRef();

	const handleSubmit = (e) => {
		setError(false);
		e.preventDefault();
		if (username.current.value == "noman" && password.current.value == "noman123") {
			navigate("/home");
		} else {
			setError(true);
		}
	};

	return (
		<>
			<div className="page">
				<div className="overlay">
					<Container className="d-flex flex-column align-items-center h-100">
						<img className="logo mt-5" src={Logo} alt="Logo" />
						<br></br>
						<br></br>
						<br></br>
						<br></br>
						<h4 className="text-white text-center mt-5 mb-5">The Future of Nitrogen Deficiency Detection and Correction</h4>
						{error && <h4 className="text-danger mb-2">Invalid Credentials</h4>}
						<Form className="form text-center" onSubmit={handleSubmit}>
							<Form.Group className="mb-3">
								<Form.Control type="hidden" placeholder="Username" value="noman" ref={username} />
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Control type="hidden" placeholder="Password" value="noman123" ref={password} />
							</Form.Group>
							<Button variant="warning" type="submit" className="text-center">
								Click Here to Proceed
							</Button>
						</Form>
						<br></br>
						<br></br>
						<br></br>
						<br></br>

						<img className="niab-logo mt-5 w-2" src={NIABLogo} alt="Logo" />
						<p className="text-white text-center mt-5 mb-5">Developed in Collaboration With Nuclear Institute of Agriculture and Biology</p>
					</Container>
				</div>
			</div>
		</>
	);
}

export default Login;
