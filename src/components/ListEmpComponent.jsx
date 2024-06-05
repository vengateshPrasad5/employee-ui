/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { isAdminUser } from "../services/AuthService";
import { getAllEmps, deleteEmp } from "../services/EmpService";
import Loader from "./Loader";

const ListEmpComponent = () => {
  const [emp, setEmps] = useState([]);
  const [isloading, setLoading] = useState(false);

  const navigate = useNavigate();

  const isAdmin = isAdminUser();

  useEffect(() => {
    listEmps();
  }, []);

  const listEmps = async () => {
    setLoading(true);
    try {
      const response = await getAllEmps();
      setEmps(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  function addEmp() {
    navigate("/add-emp");
  }

  function updateEmp(id) {
    navigate(`/update-emp/${id}`);
  }

  function viewEmp(id) {
    navigate(`/view-emp/${id}`);
  }

  const removeEmp = async (id) => {
    try {
      const response = await deleteEmp(id);
      listEmps();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">List of Employees</h2>
      {isloading && <Loader />}
      {isAdmin && (
        <button className="btn btn-primary mb-2" onClick={addEmp}>
          Add Employee
        </button>
      )}

      <div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr className="text-center">
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {emp.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.firstName}</td>
                <td>{todo.lastName}</td>
                <td>{todo.email}</td>
                <td>{todo.department}</td>
                <td>
                  <button
                    className="btn btn-info mx-2"
                    onClick={() => viewEmp(todo.id)}
                  >
                    View
                  </button>
                  {isAdmin && (
                    <button
                      className="btn btn-info"
                      onClick={() => updateEmp(todo.id)}
                    >
                      Update
                    </button>
                  )}
                  {isAdmin && (
                    <button
                      className="btn btn-danger"
                      style={{ marginLeft: "10px" }}
                      onClick={() => removeEmp(todo.id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListEmpComponent;
