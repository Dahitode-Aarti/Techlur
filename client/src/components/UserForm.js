import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import UserContext from "./UserContext";
import API from "../api/API";

const UserForm = () => {
  const { loadUsers, handleClose, operation, initialUser } =
    useContext(UserContext);
  const [user, setUser] = useState({
    name: "",
    // team: "",
    status: "",
  });

  useEffect(() => {
    if (initialUser) setUser({ ...user, ...initialUser });
  }, [initialUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = () => {
    if (user.name && user.status) {
      if (operation == "edit") {
        API.put(`users/${user.id}`, user)
          .then((response) => {
            alert("User updated...");
            loadUsers();
            handleClose();
          })
          .catch((err) => {
            console.log(err);
            alert("could not updated the users ");
          });
      } else {
        API.post(`http://localhost:8080/users`, user)
          .then((Response) => {
            alert("user Created....");
            loadUsers();
            handleClose();
          })
          .then(console.log(user))
          .catch((err) => {
            console.log(err);
            alert("could not Created the users");
          });
      }
    }
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item cs={12}>
          <TextField
            variant="outlined"
            label="Project_Name"
            fullWidth
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </Grid>
        {/* <Grid item cs={12}>
          <TextField
            variant="outlined"
            label="team"
            fullWidth
            name="team"
            value={user.team}
            onChange={handleChange}
          />
        </Grid> */}
        <Grid item cs={12}>
          <TextField
            variant="outlined"
            label="status"
            fullWidth
            name="status"
            value={user.status}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Create
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default UserForm;
