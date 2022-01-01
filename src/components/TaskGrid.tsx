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
  getTaskDisplay,
  getTasks,
  WorkTask,
  WorkTaskDisplay,
} from "./DataStructures";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import IconButton from "@mui/material/IconButton";
import TaskListDialog from "./TaskListDialog";
import TaskDialog from "./TaskDialog";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { renderCellExpand } from "./renderCellExpand";

// const randomTask = genRandomTasks(5);
// const collection: TaskCollection = genRandomCollections(
//   sampleInitialTasks.filter((si) => si.id < 3)
// );
// console.log(JSON.stringify(collection, null, 2));
// const prj: Project = genRandomProject([sampleInitialColl]);
// console.log(JSON.stringify(prj, null, 2));
// const tasks: WorkTask[] = sampleInitialTasks;
const initialTask = getEmptyTask();

export default function TaskGrid(props: any) {
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

  const toggleChildItems = (taskid: number, tasklist?: string[]) => {
    let tRows: WorkTaskDisplay[] = Array.from(rows);
    let rowid = tRows.findIndex((tr) => tr.id == taskid);
    if (tasklist && rowid > -1) {
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

  const columns: GridColDef[] = [
    {
      field: "subtasks",
      headerName: "Sub Tasks",
      width: 20,
      renderCell: (params: GridRenderCellParams<[number, string[]]>) => {
        let ind: number = params.value[0];
        let tasklist: string[] = params.value[1];
        if (tasklist.length > 0) {
          return (
            <div>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                onClick={() => {
                  toggleChildItems(ind, tasklist);
                }}
                size="small"
              >
                <AccountTreeOutlinedIcon fontSize="inherit" />
              </IconButton>
            </div>
          );
        } else {
          return <div></div>;
        }
      },
      valueGetter: (params: GridValueGetterParams) => [
        params.row.id,
        params.row.taskList,
      ],
    },
    { field: "taskId", headerName: "ID", width: 50 },
    {
      field: "task",
      headerName: "Task",
      width: 200,
      editable: true,
      renderCell: renderCellExpand,
    },
    {
      field: "actionBy",
      headerName: "Action By",
      width: 100,
      editable: true,
    },
    {
      field: "targetDate",
      headerName: "Target Date",
      width: 100,
      editable: true,
    },
    {
      field: "percComplete",
      headerName: "% Complete",
      type: "number",
      width: 100,
      editable: true,
      valueFormatter: (params: GridValueFormatterParams) => {
        const valueFormatted = Number(
          (params.value as number) * 100
        ).toLocaleString();
        return `${valueFormatted} %`;
      },
    },
    {
      field: "status",
      headerName: "Status",
      type: "singleSelect",
      valueOptions: ["OPEN", "ASSIGNED", "PENDING", "SUBMITTED", "APPROVED"],
      width: 150,
      editable: true,
    },
    {
      field: "remarks",
      headerName: "Remarks",
      width: 250,
      editable: true,
      renderCell: renderCellExpand,
    },
    {
      field: "joined",
      headerName: "Joined",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 360,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.actionBy || "-"} ${params.row.task || ""}`,
    },
  ];

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          // checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </div>
  );
}
