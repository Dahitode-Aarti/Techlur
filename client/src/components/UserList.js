import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import MUIDataTable from "mui-datatables";
import UserContext from "./UserContext";
import ArrowForward from "@mui/icons-material/ArrowForward";
import DeleteICon from "@mui/icons-material/DeleteOutlined";
import API from "../api/API";
import Swal from "sweetalert2";
import AddEditUser from "./AddEditUser";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [operation, setOperation] = useState("add");
  const [initialUser, setInitialUser] = useState({});
  const [openDialog, SetOpenDialog] = useState(false);

  const handleClose = () => {
    SetOpenDialog(false);
  };

  const loadUsers = () => {
    API.get("http://localhost:8080/users")
      .then((response) => {
        setUsers(response?.data);
      })
      .catch(console.log());
  };
  useEffect(() => {
    loadUsers();
  }, []);

  const addUser = () => {
    setInitialUser({});
    setOperation("add");
    SetOpenDialog(true);
  };
  const editUser = (user) => {
    setInitialUser(user);
    setOperation("edit");
    SetOpenDialog(true);
  };
  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        API.delete(`/users/${id}`)
          .then((response) => {
            loadUsers();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          })
          .catch((err) => {
            console.log(err);
            Swal.fire(
              "Not Deleted!",
              "Your record could not deleted.",
              "error"
            );
          });
      }
    });
  };

  const columns = [
    {
      name: "name",
      label: "Project_Name",
      Option: {
        sort: true,
        filter: false,
      },
    },

    {
      name: "users",
      label: "Team",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (index) => {
          const userList = users[index]?.users;

          return (
            Array.isArray(userList) &&
            userList?.map((user) => {
              const arr = user?.name?.split(/[\s]+/);
              const name =
                arr?.at(0)?.charAt() + arr?.at(1)?.charAt()?.toUpperCase();
              console.log(name);

              return user?.photo ? (
                <img
                  key={user.id}
                  src={user.photo}
                  alt={user.name}
                  style={{ width: 50, height: 50, borderRadius: 5, margin: 3 }}
                />
              ) : (
                <span
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#999",
                    borderRadius: 5,
                    float: "left",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 3,
                    color: "#fff",
                  }}
                >
                  {name}
                </span>
              );
            })
          );
        },
      },
    },
    {
      name: "status",
      label: "Status",
      Option: {
        sort: true,
        filter: false,
      },
    },

    {
      name: "action",
      label: "ACTION",
      options: {
        sort: false,
        filter: false,
        customBodyRenderLite: (index) => {
          const u = users[index];
          return (
            <>
              <Button
                onClick={() => editUser(u)}
                size="small"
                variant="outlined"
                style={{ marginRight: 5 }}
              >
                Manage <ArrowForward />
              </Button>
              <Button
                onClick={() => deleteUser(u.id)}
                size="small"
                color="error"
                variant="outlined"
              >
                Delete <DeleteICon />
              </Button>
            </>
          );
        },
      },
    },
  ];

  return (
    <>
      <UserContext.Provider
        value={{ loadUsers, handleClose, operation, initialUser }}
      >
        <AddEditUser open={openDialog} handleClose={handleClose} />
      </UserContext.Provider>
      <div style={{ display: "flex", justifyContent: "flex-end", padding: 10 }}>
        <Button
          onClick={addUser}
          variant="contained"
          sx={{ backgroundColor: "green" }}
        >
          + New Project
        </Button>
      </div>
      <MUIDataTable title="User List" data={users} columns={columns} />
    </>
  );
};

export default UserList;
