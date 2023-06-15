import React, { useEffect } from "react";
import { Button, Container, Typography } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Topbar from "../ui/Navbar";

function Result() {
	const location = useLocation();
	const value = location.state.value;
	const result = location.state.result;
	console.log(result);

	const styles = {
		padding: "20px",
		border: "3px solid #E7A218",
		borderRadius: "5px",
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
					<center style={{marginTop: '100px'}}>
						<Container>
							<div style={styles}>
								<Row className="mb-4">
									<Col>
										<Typography
											variant="h3"
											component="p"
											sx={{
												padding: "0.5em",
												fontSize: "2rem",
												color: "white",
												"@media (max-width: 600px)": {
													fontSize: "1.2rem",
													padding: "0",
												},
											}}
										>
											As Known, Nitrogen required per plant is 2% - 4 %
										</Typography>
									</Col>
								</Row>
								<Row className="mb-4">
									<Col>
										<Typography
											variant="h3"
											// component="p"
											sx={{
												padding: "0.5em",
												fontSize: "2rem",
												color: "white",
												"@media (max-width: 600px)": {
													fontSize: "1.2rem",
													padding: "0",
												},
											}}
										>
											Nitrogen Deficiency found is <u> {result.deficiency_percent}% </u>
										</Typography>
									</Col>
								</Row>
								<Row>
									<Col>
										<Typography
											variant="h3"
											component="p"
											sx={{
												padding: "0.5em",
												fontSize: "2rem",
												color: "white",
												"@media (max-width: 600px)": {
													fontSize: "1.2rem",
													padding: "0",
												},
											}}
										>
											Fertilizer required for removing the deficiency from the field is <u> {value.toFixed(2)} lbs</u>
										</Typography>
									</Col>
								</Row>
							</div>
						</Container>
						<div className="table-responsive p-5">
							<table class="table table-success mt-5" style={{ backgroundColor: "transparent" }}>
								<thead>
									<tr>
										<th>ID</th>
										<th>Name</th>
										<th>Status</th>
										<th>Date</th>
										<th>Documents</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>1</td>
										<td>Nitrox</td>
										<td>Approved</td>
										<td>01/01/2023</td>
										<td>
											<a href="https://www.pnas.org/doi/epdf/10.1073/pnas.96.4.1175?download=true">doc 1</a>
										</td>
									</tr>
									<tr>
										<td>2</td>
										<td>Fauji Nitrate</td>
										<td>Approved</td>
										<td>01/02/2023</td>
										<td>
											<a href="https://www.pnas.org/doi/epdf/10.1073/pnas.96.4.1175?download=true">doc 2</a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</center>
				</div>
			</div>
		</>
	);
}

export default Result;
