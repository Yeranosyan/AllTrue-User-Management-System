import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import { deleteUser } from "../api/api";

export default function UserDeleteDialog({
  isOpen,
  onClose,
  selectedUser,
  onSuccess,
}) {
  const handleSubmit = () => {
    deleteUser(selectedUser.id)
      .then((response) => {
        if (response.status === 204) {
          onSuccess();
        }
      })
      .catch((error) => console.error(error));

    onClose();
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        PaperProps={{
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>{"Delete user"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete user {selectedUser.first_name}{" "}
            {selectedUser.last_name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" autoFocus onClick={onClose}>
            No
          </Button>
          <Button variant="contained" onClick={handleSubmit} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
UserDeleteDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  selectedUser: PropTypes.object,
  onSuccess: PropTypes.func,
};
