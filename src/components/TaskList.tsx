import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  getEmptyTask,
  getSampleTasksForProj,
  sampleTasks,
  WorkTask,
} from "./DataStructures";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import IconButton from "@mui/material/IconButton";
import TaskListDialog from "./TaskListDialog";
import TaskDialog from "./TaskDialog";

const rows: WorkTask[] = getSampleTasksForProj(2);
const initialTask = getEmptyTask();

export default function TaskList() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [taskDialog, setTaskDialog] = React.useState(initialTask);
  const [dialogData, setDialogData] = React.useState({});

  const toggleDialog = (rowId: number) => {
    setTaskDialog(rows[rowId]);
    setOpenDialog(!openDialog);
  };

  const handleDialogAction = (dialogState: boolean, data: any) => {
    // console.log(
    //   "Received Dialog State:" + dialogState + " data:" + JSON.stringify(data)
    // );
    setOpenDialog(dialogState);
    setDialogData(data);
  };

  return (
    <TableContainer component={Paper}>
      <TaskDialog
        open={openDialog}
        handleAction={handleDialogAction}
        task={taskDialog}
      />
      <Stack>
        <Box
          sx={{
            display: "flex",
            padding: 0.5,
          }}
        >
          <Typography variant="subtitle2" gutterBottom component="div">
            Task List {JSON.stringify(dialogData)}
          </Typography>
        </Box>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell> </TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action By</TableCell>
              <TableCell>Target Date</TableCell>
              <TableCell>% Complete</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.subtasks && row.subtasks.length > 0 ? (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        toggleDialog(index);
                      }}
                      size="small"
                    >
                      <AccountTreeOutlinedIcon fontSize="inherit" />
                    </IconButton>
                  ) : (
                    ""
                  )}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.desc}
                </TableCell>
                <TableCell>{row.actionBy}</TableCell>
                <TableCell>{row.targetDate}</TableCell>
                <TableCell>{row.percComplete}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.remarks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stack>
    </TableContainer>
  );
}
