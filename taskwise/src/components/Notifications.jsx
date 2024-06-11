import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUnreadNotificationsAsync,
  markNotificationAsReadAsync,
} from "../features/notification/notificationSlice";

const NotificationItem = styled(ListItem)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  padding: "10px 16px",
  width: "100%",
  boxSizing: "border-box",
  borderBottom: "1px solid #eee",
});

const NotificationContent = styled(Box)({
  flexGrow: 1,
  paddingLeft: "16px",
});

const SeeAllNotifications = styled(Typography)({
  textAlign: "center",
  padding: "10px",
  fontWeight: "bold",
  color: "#0073e6",
  cursor: "pointer",
});

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notification.unreadNotifications
  );
  const notificationFetchStatus = useSelector(
    (state) => state.notification.notificationFetchStatus
  );
  // const userId = useSelector((state) => state.user.loggedInUser?.user?._id);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);

  // useEffect(() => {
  //   if (userId) {
  //     dispatch(fetchUnreadNotificationsAsync(userId));
  //   }
  // }, [userId, dispatch]);

  const handleMenuOpen = (event, notification) => {
    setAnchorEl(event.currentTarget);
    setSelectedNotification(notification);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedNotification(null);
  };

  const markAsRead = () => {
    dispatch(markNotificationAsReadAsync(selectedNotification.id))
      .unwrap()
      .then(() => {
        handleMenuClose();
      })
      .catch((error) => {
        console.error("Failed to mark notification as read: ", error);
      });
  };

  const deleteNotification = () => {};

  return (
    <Box width="400px" bgcolor="#fff" border="1px solid #ccc">
      <Typography
        variant="body2"
        fontWeight="bold"
        align="left"
        paddingLeft="30px"
        paddingTop="10px"
        paddingBottom="10px"
      >
        Notifications
      </Typography>
      <Divider style={{ margin: 0 }} />

      {notificationFetchStatus === "loading" ? (
        <Typography align="center" padding="20px">
          Loading...
        </Typography>
      ) : notifications?.length === 0 ? (
        <Typography align="center" padding="20px">
          No new notifications
        </Typography>
      ) : (
        notifications?.map((notification) => (
          <NotificationItem key={notification.id}>
            <NotificationContent>
              <Typography variant="body2" fontWeight="bold" gutterBottom>
                {notification.message}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {new Date(notification.createdAt).toLocaleString()}
              </Typography>
            </NotificationContent>
            <IconButton
              onClick={(e) => handleMenuOpen(e, notification)}
              size="small"
            >
              <MoreVertIcon />
            </IconButton>
          </NotificationItem>
        ))
      )}

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
      <Divider style={{ margin: 0 }} />
      <SeeAllNotifications>See All Notifications</SeeAllNotifications>
    </Box>
  );
};

export default Notifications;
