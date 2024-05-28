import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "9rem",
  flexGrow: 1,
  width: "100%",
  maxWidth: "800px",
  margin: "auto",
  boxSizing: "border-box",
});

const ProfileHeader = styled(Grid)(({ theme }) => ({
  marginBottom: "20px",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
  [theme.breakpoints.up("md")]: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const ProfileInfo = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "5rem",
});

const InfoBox = styled(Box)({
  backgroundColor: "#f5f5f5",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
});

const EditField = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const ChangePasswordContainer = styled(Box)({
  marginTop: "30px",
  paddingLeft: "20px",
  width: "100%",
});

const ProfileText = styled(Typography)({
  backgroundColor: "#f2f1ff",
  color: "#3f51b5",
  padding: "8px 16px",
  borderRadius: "4px",
  position: "absolute", // Position absolutely
  top: "5rem", // Adjust top position as needed
  left: "14rem", // Adjust left position as needed
});

const PageWrapper = styled(Box)({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "hidden", // Prevent overflow on the main page
});

const ProfileSettingsPage = () => {
  const [isEditing, setIsEditing] = useState({ email: false, title: false });
  const [email, setEmail] = useState("smith@gmail.com");
  const [title, setTitle] = useState("Product Designer");

  const handleEditClick = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleSaveClick = (field) => {
    setIsEditing({ ...isEditing, [field]: false });
  };

  return (
    <PageWrapper>
      <ProfileText variant="h6">Profile</ProfileText>
      <Container>
        <ProfileHeader container spacing={2}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: "flex", alignItems: "center", gap: "20px" }}
          >
            <Avatar
              alt="Smith"
              src="/broken-image.jpg"
              sx={{ width: 80, height: 80 }}
            />
            <Stack spacing={0.5}>
              <Typography variant="h6">Smith</Typography>
              <Typography variant="body2" color="textSecondary">
                @tantriono213
              </Typography>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" },
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                minWidth: "200px",
                height: "40px",
              }}
            >
              Save User Profile
            </Button>
          </Grid>
        </ProfileHeader>

        <ProfileInfo container spacing={2}>
          <Grid item xs={12}>
            <InfoBox>
              <EditField sx={{ paddingBottom: "2rem" }}>
                <TextField
                  id="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="standard"
                  fullWidth
                />
                {isEditing.email ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSaveClick("email")}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={() => handleEditClick("email")}
                  >
                    Edit
                  </Button>
                )}
              </EditField>
              <EditField>
                <TextField
                  id="title"
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  variant="standard"
                  fullWidth
                />
                {isEditing.title ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSaveClick("title")}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={() => handleEditClick("title")}
                  >
                    Edit
                  </Button>
                )}
              </EditField>
            </InfoBox>
          </Grid>
        </ProfileInfo>
        <ChangePasswordContainer>
          <Typography variant="h6">Password & Authentication</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            You can change your password periodically to increase the security
            of your account. Make sure you remember your current password to
            prove that the person who changed the password was actually you.
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Change Password
          </Button>
        </ChangePasswordContainer>
      </Container>
    </PageWrapper>
  );
};

export default ProfileSettingsPage;
