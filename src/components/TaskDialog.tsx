import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { getEmptyTask, WorkTask } from "./DataStructures";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

export default function TaskDialog(props: any) {
  const initialTask = getEmptyTask();
  const [open, setOpen] = React.useState(false);
  const [task, setTask] = React.useState(initialTask);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  //   if (props) {
  //     console.log("Received Flag:" + props.open);
  //     setOpen(props.open);
  //   }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.handleAction(false, {});
    setOpen(false);
  };

  React.useEffect(() => {
    // console.log("about to check props:" + props.open);
    if (props) {
      setOpen(props.open);
      setTask(props.task);
    }
  }, [props.open, props.task]);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Task Details : {task.desc}
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Stack>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  <TableRow
                    key="id"
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>Id:</TableCell>
                    <TableCell>{task.id}</TableCell>
                  </TableRow>
                  <TableRow
                    key="desc"
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>Description:</TableCell>
                    <TableCell>{task.desc}</TableCell>
                  </TableRow>
                  <TableRow
                    key="actionBy"
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>Action By:</TableCell>
                    <TableCell>{task.actionBy}</TableCell>
                  </TableRow>
                  <TableRow
                    key="targetDate"
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>Target Date:</TableCell>
                    <TableCell>{task.targetDate}</TableCell>
                  </TableRow>
                  <TableRow
                    key="percComplete"
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>% Complete:</TableCell>
                    <TableCell>{task.percComplete}</TableCell>
                  </TableRow>
                  <TableRow
                    key="status"
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>Status:</TableCell>
                    <TableCell>{task.status}</TableCell>
                  </TableRow>
                  <TableRow
                    key="remarks"
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>Remarks:</TableCell>
                    <TableCell>{task.remarks}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Stack>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
           */}
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

{
  /* <div>
<Dialog open={open} onClose={handleClose}>
  <DialogTitle>Subscribe</DialogTitle>
  <DialogContent>
    <DialogContentText>
      To subscribe to this website, please enter your email address here.
      We will send updates occasionally.
    </DialogContentText>
    <TextField
      autoFocus
      margin="dense"
      id="name"
      label="Email Address"
      type="email"
      fullWidth
      variant="standard"
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button onClick={handleClose}>Subscribe</Button>
  </DialogActions>
</Dialog>
</div> */
}

// import * as React from "react";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useTheme } from "@mui/material/styles";

// export default function TaskListDialog(props: any) {
//   let openState = false;
//   if (props) {
//     openState = props.open;
//     console.log("Received Flag:" + props.open);
//   }
//   const [open, setOpen] = React.useState(openState);
//   const theme = useTheme();
//   //   const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
//   const fullScreen = true;

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Dialog
//         fullScreen={fullScreen}
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="responsive-dialog-title"
//       >
//         <DialogTitle id="responsive-dialog-title">
//           {"Use Google's location service?"}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Let Google help apps determine location. This means sending
//             anonymous location data to Google, even when no apps are running.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button autoFocus onClick={handleClose}>
//             Disagree
//           </Button>
//           <Button onClick={handleClose} autoFocus>
//             Agree
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
