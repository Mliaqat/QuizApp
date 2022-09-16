import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

function LogIn() {
  const [data, setData] = useState<any>([]);
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    useremail: "",
    userpassword: "",
  });
  const handleUserEmail = (e: any) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };
  const getUserDetails = async () => {
    await axios
      .get("https://retest-orcalo-db-default-rtdb.firebaseio.com/LoggedInEmails.json")
      .then((response) => {
        const converdata = Object.keys(response.data);

        const userarray = converdata.map((p) => {
          const arraydata = response.data[p];
          return arraydata;
        });
        setData(userarray);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  const handleSubmitUserDetails = (e: any) => {
    e.preventDefault();
    const finduser = data.find(
      (data: { email: string }) => data.email === userInput.useremail
    );

    if (admin) {
      if (
        data.find(
          (data: { emailValue: string; passwordValue: string }) =>
            data.emailValue === userInput.useremail &&
            data.passwordValue === userInput.userpassword
        )
      ) {
        localStorage.setItem("email", userInput.useremail);
        navigate("/Admin");
      }
    } else {
      if (finduser) {
        alert("Already Exist");
      } else {
        localStorage.setItem("email", userInput.useremail);
        navigate("/quiz");
      }
    }
  };

  return (
    <div className="center">
      <form className="p-3 layout" onSubmit={handleSubmitUserDetails}>
        <div>
          <h3 className="text-white text-center"> Log in</h3>
          <div className="row">
            {" "}
            <div className="col-md-12">
              <label className="mt-3 text-white">Enter Email:</label>
            </div>{" "}
            <div className="col-md-12 mt-2">
              {" "}
              <input
                name="useremail"
                className="border-0 rounded w-100 input-field"
                onChange={handleUserEmail}
              />
            </div>
          </div>
          {admin && (
            <div className="row">
              <div className="col-md-12 ">
                <label className="mt-3 text-white">Enter Password:</label>
              </div>
              <div className="col-md-12 mt-3">
                {" "}
                <input
                  name="userpassword"
                  className="border-0 rounded w-100 input-field"
                  onChange={handleUserEmail}
                />
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-md-12">
              <input
                type="checkbox"
                className="mt-3"
                value="Admin"
                onChange={(e) => setAdmin(e.target.checked)}
              />
              <label className="ms-2 text-white">Are You Admin?</label>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-12 mt-3 ">
              <input type="submit" className="btn login_btn" value="Submit" />{" "}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
