import { Button, Container, Typography } from "@mui/material";
import FunctionsIcon from '@mui/icons-material/Functions';
import { useNavigate } from "react-router-dom";
function MainPage() {
    const navigate = useNavigate()
    const handleRouting = () => {
        navigate("/CameraPage")
    }
    return (
        <Container sx={{
            backgroundImage: "linear-gradient(180deg, #80FF72, #7EE8FA)",
            color: "white",
            padding: '5em',
            boxShadow: "10px 10px 8px #888888"
        }}>
            <center>
                <Typography variant="h2" sx={{
                    padding: '1em',
                }}>
                    Agrino
                </Typography>
                <Typography variant="h4" sx={{
                    padding: '1em',
                }}>
                    <p>Make your farm more efficient</p>
                </Typography>
                <Button variant="filled"
                    sx={{
                        margin: "2em",
                        borderRadius: "11px",
                        border: "1px solid white",
                        color: "white",
                        "&:hover": {
                            color: "black",
                            border: "1px solid black",
                        }
                    }}
                    startIcon={<FunctionsIcon />}
                    onClick={handleRouting}
                >
                    Calculate Nitrogen Deficiency
                </Button>

                {/* <button type="button" class="btn btn-link border rounded-pill text-white text-decoration-none" onClick={handleRouting}>Calculate Nitroger Deficiency</button> */}
            </center>
        </Container >
    );
}

export default MainPage;
