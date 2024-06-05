import react, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getEmp } from "../services/EmpService";
import Loader from "./Loader";

const ViewEmployee = () => {
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

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
          <h2 className="text-center">View Employee</h2>
          {isLoading && <Loader />}
          <div className="card-body">
            <form>
              <div className="form-group mb-2 d-flex gap-2">
                <lable className="form-label fw-bold">First Name:</lable>
                <div>{firstName}</div>
              </div>
              <div className="form-group mb-2 d-flex gap-2">
                <lable className="form-label fw-bold">Last Name:</lable>
                <div>{lastName}</div>
              </div>
              <div className="form-group mb-2 d-flex gap-2">
                <lable className="form-label fw-bold">E-Mail:</lable>
                <div>{email}</div>
              </div>
              <div className="form-group mb-2 d-flex gap-2">
                <lable className="form-label fw-bold">Department:</lable>
                <div>{department}</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
