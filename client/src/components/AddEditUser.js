import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useContext } from "react";
import UserContext from "./UserContext";
import UserForm from "./UserForm";

const AddEditUser = ({ open }) => {
  const { handleClose, operation } = useContext(UserContext);
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{operation == "edit" ? "Edit" : "Add"} User</DialogTitle>
        <DialogContent>
          <UserForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddEditUser;
