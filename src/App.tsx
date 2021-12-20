import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import Container from "@mui/material/Container";
import NavBar from "./components/Navbar";
import Stack from "@mui/material/Stack";
import TaskList from "./components/TaskList";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function App() {
  return (
    <div className="App">
      <Container maxWidth="md">
        <NavBar />
        <Container maxWidth="md"></Container>
        <Stack spacing={2}>
          <Box sx={{ display: "flex", padding: 1 }}>
            <Typography variant="body1" gutterBottom>
              TaskFlo Project: Project Name
            </Typography>
          </Box>
          <TaskList />
          <TaskList />
          <TaskList />
        </Stack>
      </Container>
    </div>
  );
}

export default App;
