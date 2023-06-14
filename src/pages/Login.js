import React, { useRef, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Logo from "../assets/images/logo.png"; // Import your logo image
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
						<h4 className="text-white mt-5 mb-5">Login to your account</h4>
						{error && <h4 className="text-danger mb-2">Invalid Credentials</h4>}
						<Form className="form text-center" onSubmit={handleSubmit}>
							<Form.Group className="mb-3">
								<Form.Control type="text" placeholder="Username" ref={username} />
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Control type="password" placeholder="Password" ref={password} />
							</Form.Group>
							<Button variant="warning" type="submit" className="text-center">
								Submit
							</Button>
						</Form>
					</Container>
				</div>
			</div>
		</>
	);
}

export default Login;
