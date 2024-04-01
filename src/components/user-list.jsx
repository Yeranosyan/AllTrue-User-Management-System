import { useEffect, useState } from "react";
import { IconButton, Snackbar } from "@mui/material";
import { getUsers } from "../api/api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import DeleteIcon from "@mui/icons-material/Delete";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import UserMenu from "./user-menu";
import UserFormDialog from "./user-form-dialog";
import UserDeleteDialog from "./user-delete-dialog";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(0);
  const [userUpdated, setUserUpdated] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [userDeleted, setUserDeleted] = useState(false);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [isUserDeleteOpen, setIsUserDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    getUsers(page)
      .then((response) => {
        const userData = response.data;
        setUsers(userData.data);
        setTotal(userData.total);
        setPerPage(userData.per_page);
      })
      .catch((error) => console.error(error));
  }, [page, userCreated, userUpdated, userDeleted]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleUserFormOpen = (user) => {
    setIsUserFormOpen(true);
    setSelectedUser(user);
  };
  const handleUserFormClose = () => {
    setIsUserFormOpen(false);
  };

  const handleUserDeleteOpen = (user) => {
    setIsUserDeleteOpen(true);
    setSelectedUser(user);
  };
  const handleUserDeleteClose = () => {
    setIsUserDeleteOpen(false);
  };

  const onUserCreated = () => {
    setUserCreated(true);
  };
  const onUserUpdated = () => {
    setUserUpdated(true);
  };
  const onUserDeleted = () => {
    setUserDeleted(true);
  };

  return (
    <>
      {isUserFormOpen ? (
        <UserFormDialog
          isOpen={isUserFormOpen}
          onClose={handleUserFormClose}
          onSuccess={onUserUpdated}
          isEdit={true}
          selectedUser={selectedUser}
        />
      ) : (
        <></>
      )}

      {isUserDeleteOpen ? (
        <UserDeleteDialog
          isOpen={isUserDeleteOpen}
          onClose={handleUserDeleteClose}
          onSuccess={onUserDeleted}
          selectedUser={selectedUser}
        />
      ) : (
        <></>
      )}

      {userCreated ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={userCreated}
          autoHideDuration={2000}
          message="User was created successfully."
          onClose={() => {
            setUserCreated(false);
          }}
        />
      ) : (
        <></>
      )}

      {userUpdated ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={userUpdated}
          autoHideDuration={2000}
          message="User was updated successfully."
          onClose={() => {
            setUserUpdated(false);
          }}
        />
      ) : (
        <></>
      )}

      {userDeleted ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={userDeleted}
          autoHideDuration={2000}
          message="User was deleted successfully."
          onClose={() => {
            setUserDeleted(false);
          }}
        />
      ) : (
        <></>
      )}

      <UserMenu userCreated={onUserCreated} />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">User ID</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell align="center" style={{ width: "50px" }}>
                  {user.id}
                </TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.first_name}</TableCell>
                <TableCell align="center">{user.last_name}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => handleUserFormOpen(user)}
                    style={{ color: "#1976d2" }}
                    aria-label="edit"
                  >
                    <NoteAltIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleUserDeleteOpen(user)}
                    style={{ color: "#e53935" }}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={total}
        rowsPerPage={perPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </>
  );
}
