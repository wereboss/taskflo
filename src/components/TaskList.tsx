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
  genRandomCollections,
  genRandomProject,
  genRandomTasks,
  getEmptyTask,
  getTaskDisplay,
  getTasks,
  Project,
  sampleInitialColl,
  sampleInitialTasks,
  TaskCollection,
  WorkTask,
  WorkTaskDisplay,
} from "./DataStructures";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import IconButton from "@mui/material/IconButton";
import TaskListDialog from "./TaskListDialog";
import TaskDialog from "./TaskDialog";
import ActionsMenu from "./ActionsMenu";
import ArrowRightSharpIcon from "@mui/icons-material/ArrowRightSharp";

// const randomTask = genRandomTasks(5);
// const collection: TaskCollection = genRandomCollections(
//   sampleInitialTasks.filter((si) => si.id < 3)
// );
// console.log(JSON.stringify(collection, null, 2));
// const prj: Project = genRandomProject([sampleInitialColl]);
// console.log(JSON.stringify(prj, null, 2));
// const tasks: WorkTask[] = sampleInitialTasks;
const initialTask = getEmptyTask();

export default function TaskList(props: any) {
  const [openDialog, setOpenDialog] = React.useState(false);
  // const [taskDialog, setTaskDialog] = React.useState(initialTask);
  const [taskListDialog, setTaskListDialog] = React.useState([initialTask]);
  const [parentDialog, setParentDialog] = React.useState(initialTask);
  const [dialogData, setDialogData] = React.useState({});
  const [rows, setRows] = React.useState(
    getTaskDisplay(props.tasks as WorkTask[])
  );

  const toggleDialog = (
    taskList: string[] = [],
    parent: WorkTask = initialTask
  ) => {
    setTaskListDialog(getTasks(taskList));
    setParentDialog(parent);
    setOpenDialog(!openDialog);
  };

  const handleDialogAction = (dialogState: boolean, data: any) => {
    // console.log(
    //   "Received Dialog State:" + dialogState + " data:" + JSON.stringify(data)
    // );
    setOpenDialog(dialogState);
    setDialogData(data);
  };

  const toggleChildItems = (rowid: number, tasklist?: string[]) => {
    let tRows: WorkTaskDisplay[] = Array.from(rows);
    if (tasklist) {
      if (!tRows[rowid].showChild) {
        // Dialog is closed, going to open - expand tasks into subtasks
        // console.log("About to add child:" + JSON.stringify(tasklist));
        let childTasks: WorkTaskDisplay[] = getTaskDisplay(getTasks(tasklist));
        // console.log("Child Tasks:" + JSON.stringify(childTasks, null, 2));
        tRows[rowid].showChild = true;
        for (let index = 0; index < childTasks.length; index++) {
          tRows.splice(rowid + index + 1, 0, childTasks[index]);
        }
        // console.log("New Tasks:" + JSON.stringify(tRows, null, 2));
        // setDialogData({ data: "Refreshed" });
        setRows(tRows);
      } else {
        //Dialog is open, collapse subtasks into task
        // console.log("About to remove child:" + JSON.stringify(tasklist));
        let childTasks: WorkTaskDisplay[] = getTaskDisplay(getTasks(tasklist));
        tRows[rowid].showChild = false;
        tRows.splice(rowid + 1, childTasks.length);
        setRows(tRows);
      }
    }
  };

  React.useEffect(() => {
    // setDialogData({ data: "Added" });
  }, [rows]);

  return (
    <TableContainer component={Paper}>
      <TaskListDialog
        open={openDialog}
        handleAction={handleDialogAction}
        taskList={taskListDialog}
        parent={parentDialog}
      />
      <Stack>
        <Box
          sx={{
            display: "flex",
            padding: 0.5,
          }}
        >
          <Typography variant="subtitle2" gutterBottom component="div">
            Tasks List View: {JSON.stringify(dialogData)}
          </Typography>
        </Box>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell> </TableCell>
              <TableCell>ID</TableCell>
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
                <TableCell>
                  {row.taskList && row.taskList.length > 0 ? (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        toggleChildItems(index, row.taskList);
                      }}
                      size="small"
                    >
                      <AccountTreeOutlinedIcon fontSize="inherit" />
                    </IconButton>
                  ) : (
                    <ActionsMenu />
                  )}
                </TableCell>
                <TableCell>[{row.taskId}]</TableCell>
                <TableCell>
                  {Array.from(row.childTabs || "").map((str, sid) => (
                    <ArrowRightSharpIcon key={sid} fontSize="medium" />
                  ))}
                  {row.task}
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
