import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  getTasks,
  Project,
  sampleInitialTasks,
  TaskCollection,
  WorkTask,
} from "./DataStructures";
import Typography from "@mui/material/Typography";
import TaskList from "./TaskList";
import TaskGrid from "./TaskGrid";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function CollectionComp(props: any) {
  const [collection, setCollection] = React.useState(
    props.collection as TaskCollection
  );
  let taskList: WorkTask[] = [];
  if (collection && collection.taskList) {
    taskList = getTasks(collection.taskList);
  }
  // const collTaskList = collection.taskList;
  // if (collTaskList) {
  //   taskList = sampleInitialTasks.filter(
  //     (st) =>
  //     collTaskList.findIndex((taskid) => taskid === st.taskId) > -1
  //   );
  // }

  if (collection) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Typography variant="h5" component="span" sx={{ display: "flex" }}>
              Collection:
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h6" component="span" sx={{ display: "flex" }}>
              {collection.collection}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TaskList tasks={taskList} />
          </Grid>
        </Grid>
      </Box>
    );
  } else {
    return <div></div>;
  }
}
