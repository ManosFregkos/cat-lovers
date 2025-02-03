import {Box, CircularProgress} from "@mui/material";

export default function BusyIndicator() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
}