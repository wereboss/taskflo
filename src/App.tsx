import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import Container from "@mui/material/Container";
import NavBar from "./components/Navbar";
import Stack from "@mui/material/Stack";
import TaskList from "./components/TaskList";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { sampleProj } from "./components/DataStructures";
import ProjectComp from "./components/ProjectComp";

function App() {
  return (
    <div className="App">
      <Container maxWidth="lg">
        <NavBar />
        <Container maxWidth="lg"></Container>
        <Stack spacing={2}>
          <ProjectComp project={sampleProj} />
          {/* <Box sx={{ display: "flex", padding: 1 }}>
            <Typography variant="body1" gutterBottom>
              TaskFlo Project: Project Name
            </Typography>
          </Box>
          <TaskList />
          <TaskList />
          <TaskList /> */}
        </Stack>
      </Container>
    </div>
  );
}

export default App;
