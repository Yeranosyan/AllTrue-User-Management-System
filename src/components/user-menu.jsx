import { useState } from "react";
import { Button } from "@mui/material";
import UserFormDialog from "./user-form-dialog";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SettingsIcon from "@mui/icons-material/Settings";
import PropTypes from "prop-types";
import styled from "styled-components";

function UserMenu({ userCreated }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const onSuccess = () => {
    userCreated();
  };

  return (
    <>
      {isOpen ? (
        <UserFormDialog
          isOpen={isOpen}
          onClose={handleClose}
          onSuccess={onSuccess}
        />
      ) : (
        <></>
      )}
      <MenuContainer>
        <h4 style={{ display: "flex", alignItems: "center" }}>
          <SettingsIcon style={{ paddingRight: "5px", color: "#1976d2" }} />
          User Management System
        </h4>
        <Button
          variant="contained"
          onClick={handleOpen}
          style={{ fontWeight: "bold" }}
        >
          <PersonAddAlt1Icon style={{ paddingRight: "6px" }} />
          Create
        </Button>
      </MenuContainer>
    </>
  );
}

export default UserMenu;

UserMenu.propTypes = {
  userCreated: PropTypes.func,
};

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 0 10px;
  border: 1px solid rgba(211, 211, 211, 0.573);
  border-radius: 5px 5px 0 0;
`;
