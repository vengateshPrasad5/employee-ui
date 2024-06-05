import react, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { saveEmp, updateEmp, getEmp } from "../services/EmpService";
import SmallLoader from "./SmallLoader";

const EmpComponent = () => {
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const pageTitle = () => {
    return id ? (
      <h2 className="text-center">Update Employee</h2>
    ) : (
      <h2 className="text-center">Add Employee</h2>
    );
  };

  const saveOrUpdateTodo = async (e) => {
    setLoading(true);
    e.preventDefault();

    const todo = { firstName, lastName, email, department };
    console.log(todo);

    try {
      if (id) {
        await updateEmp(id, todo);
        navigate("/emps");
        setLoading(false);
      } else {
        const response = await saveEmp(todo);
        console.log(response.data);
        navigate("/emps");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true);
      }
      try {
        if (id) {
          const response = await getEmp(id);
          console.log(response.data);
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setDepartment(response.data.department);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offser-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <lable className="form-label">First Name:</lable>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter First Name"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group mb-2">
                <lable className="form-label">Last Name:</lable>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="form-group mb-2">
                <lable className="form-label">E-Mail:</lable>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mb-2">
                <lable className="form-label">Department:</lable>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter department"
                  name="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>
              <div className="d-flex gap-3 align-items-center">
                {isLoading && <SmallLoader />}
                <button
                  className="btn btn-success"
                  onClick={(e) => saveOrUpdateTodo(e)}
                >
                  {id ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpComponent;
