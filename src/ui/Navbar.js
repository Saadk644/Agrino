import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "../assets/css/index.css";
import Logo from "../assets/images/logo.png"; // Import your logo image
import { Link } from "react-router-dom";

function Topbar() {
	return (
		<>
			<Navbar bg="dark" variant="dark">
				<Container>
					<Link to="/home">
						<Navbar.Brand>
							<img className="main-logo" src={Logo} alt="Logo" />
						</Navbar.Brand>
					</Link>
					<Nav className="ms-auto">
						<Link to="/home">
							<button className="btn btn-warning me-2">Home</button>
						</Link>
					</Nav>
				</Container>
			</Navbar>
		</>
	);
}

export default Topbar;
