import { useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import { postUser, putUser } from "../api/api";

const UserFormDialog = ({
  isOpen,
  onClose,
  isEdit,
  selectedUser,
  onSuccess,
}) => {
  const [user, setUser] = useState(selectedUser || {});

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    setUser(formJson);

    if (selectedUser?.id) {
      putUser(selectedUser.id, user)
        .then((response) => {
          if (response.status === 200) {
            onSuccess();
          }
        })
        .catch((error) => console.error(error));
    } else {
      postUser(user)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            onSuccess();
          }
        })
        .catch((error) => console.error(error));
    }

    onClose();
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>{isEdit ? "Update User" : "Create User"}</DialogTitle>
        <DialogContent>
          <TextField
            id="name"
            value={user?.first_name}
            name="name"
            label="Name"
            required
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => {
              setUser({
                first_name: e.target.value,
              });
            }}
          />
          <TextField
            id="job"
            name="job"
            label="Job title"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            {isEdit ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserFormDialog;

UserFormDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  selectedUser: PropTypes.object,
  isEdit: PropTypes.bool,
  onSuccess: PropTypes.func,
};
