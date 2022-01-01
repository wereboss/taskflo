import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Project, TaskCollection } from "./DataStructures";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CollectionComp from "./CollectionComp";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function CollectionList(props: any) {
  const [collections, setCollections] = React.useState(
    props.collections as TaskCollection[]
  );
  // console.log("Received Coll List:" + JSON.stringify(collections, null, 2));

  if (collections) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Stack spacing={2}>
          {collections.map((coll) => (
            <CollectionComp key={coll.id} collection={coll} />
          ))}
        </Stack>
      </Box>
    );
  } else {
    return <div></div>;
  }
}
