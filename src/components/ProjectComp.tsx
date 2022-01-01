import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Project,
  sampleInitialColl,
  sampleInitialCollList,
} from "./DataStructures";
import Typography from "@mui/material/Typography";
import CollectionList from "./CollectionList";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ProjectComp(props: any) {
  const [project, setProject] = React.useState(props.project as Project);
  const collList = sampleInitialCollList.filter(
    (sc) =>
      project.collectionList.findIndex((collid) => collid === sc.collId) > -1
  );
  // console.log(
  //   "sampleInitialCollList:" + JSON.stringify(sampleInitialCollList, null, 2)
  // );
  // console.log(
  //   "project.collectionList:" + JSON.stringify(project.collectionList, null, 2)
  // );
  // console.log(
  //   "filter:" +
  //     JSON.stringify(
  //       sampleInitialCollList.filter(
  //         (sc) =>
  //           project.collectionList.findIndex((collid) => collid === sc.collId) >
  //           -1
  //       ),
  //       null,
  //       2
  //     )
  // );
  if (project) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Typography variant="h5" component="span" sx={{ display: "flex" }}>
              Project:
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h6" component="span" sx={{ display: "flex" }}>
              {project.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CollectionList collections={collList} />
          </Grid>
        </Grid>
      </Box>
    );
  } else {
    return <div></div>;
  }
}
