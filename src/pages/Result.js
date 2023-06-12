import React, {useEffect} from "react";
import { Button, Container, Typography } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";




function Result() {
	const location = useLocation();
	const value = location.state.value;


	const styles = {
		padding: '20px',
		border: '3px solid #ffffff',
		borderRadius: '5px',
	  };
	return (
		<Container
			style={{ height: "100vh" }}
			sx={{
				color: "white",
				padding: "5em",
			}}
		>
			<center>
				<Container>
					<div style={styles}>
						<Row className="mb-4">
							<Col>
								<h2>Nitrogen Deficiency is <u> 10% </u></h2>
							</Col>
						</Row>
						<Row>
							<Col>
								<h4>Fertilizer required for removing the deficiency from the field is <u> {value} </u></h4>
							</Col>
						</Row>
					</div>
				</Container>
				<table class="table table-success mt-5" style={{backgroundColor: 'transparent'}}>
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
							<td>Name 1</td>
							<td>Approved</td>
							<td>01/01/2023</td>
							<td>
								<a href="https://www.woitsolutions.com">doc 1</a>
							</td>
						</tr>
						<tr>
							<td>2</td>
							<td>Name 2</td>
							<td>Rejected</td>
							<td>01/02/2023</td>
							<td>
								<a href="https://www.woitsolutions.com">doc 2</a>
							</td>
						</tr>
					</tbody>
				</table>
			</center>
		</Container>
	);
}

export default Result;
