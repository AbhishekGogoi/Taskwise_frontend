import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/system";

const notificationsData = [
  {
    id: 1,
    message:
      "Jamie Pines has responded to your email. Good Morning Joseph, Yes, I am inter . . .",
    time: "5 Hours Ago",
    type: "Applicant Tracking",
  },
  {
    id: 2,
    message:
      "Your coworker (Chandra McClain) has added a note. Candidate hasn’t been respons . . .",
    time: "Yesterday at 12:31pm",
    type: "Sourcing Platform: Search",
  },
  {
    id: 3,
    message:
      "Your job posting (Hilton Receptionist) has expired. To renew job posting please . . .",
    time: "April, 16 at 3:23pm",
    type: "Applicant Tracking",
  },
  {
    id: 4,
    message:
      "Your recent search (Receptionist, . . .) could include 2 more locations. Learn More.",
    time: "April, 7 at 11:05am",
    type: "Sourcing Platform: Insights",
  },
  {
    id: 5,
    message:
      "Your job posting (Hilton Receptionist) will expire in 2 weeks. Please renew job . . .",
    time: "March, 28 at 4:51pm",
    type: "Applicant Tracking",
  },
  {
    id: 6,
    message: "Down for scheduled maintenance. From 11pm to 3am. Learn More.",
    time: "March, 28 at 2:29pm",
    type: "",
  },
];

const NotificationItem = styled(ListItem)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  padding: "10px 16px",
  borderBottom: "1px solid #eee",
});

const NotificationContent = styled(Box)({
  flexGrow: 1,
});

const SeeAllNotifications = styled(Typography)({
  textAlign: "center",
  padding: "10px",
  fontWeight: "bold",
  color: "#0073e6",
  cursor: "pointer",
});

const Notifications = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleMenuOpen = (event, notification) => {
    setAnchorEl(event.currentTarget);
    setSelectedNotification(notification);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedNotification(null);
  };

  const markAsRead = () => {
    console.log(`Marking notification ${selectedNotification.id} as read`);
    handleMenuClose();
  };

  const deleteNotification = () => {
    setNotifications(
      notifications.filter(
        (notification) => notification.id !== selectedNotification.id
      )
    );
    handleMenuClose();
  };

  return (
    <Box
      width="300px"
      border="1px solid #ccc"
      borderRadius="5px"
      bgcolor="#fff"
    >
      <List>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id}>
            <NotificationContent>
              <Typography variant="body2" fontWeight="bold" gutterBottom>
                {notification.message}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {notification.time}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {notification.type}
              </Typography>
            </NotificationContent>
            <IconButton
              onClick={(e) => handleMenuOpen(e, notification)}
              size="small"
            >
              <MoreVertIcon />
            </IconButton>
          </NotificationItem>
        ))}
      </List>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={markAsRead}>Mark As Read</MenuItem>
        <MenuItem onClick={deleteNotification}>Delete</MenuItem>
      </Menu>
      <Divider />
      <SeeAllNotifications>See All Notifications</SeeAllNotifications>
    </Box>
  );
};

export default Notifications;
