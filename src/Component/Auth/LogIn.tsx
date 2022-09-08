import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      .get("https://orcalotest-default-rtdb.firebaseio.com/LoggedInEmails.json")
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
        navigate("/QuizApp");
      }
    }
  };

  return (
    <>
      <form
        className="form w-50 m-auto bg-success position-absolute mt-5 start-0  end-0 p-3"
        onSubmit={handleSubmitUserDetails}
      >
        <div>
          <h3 className="text-white"> Log in</h3>
          <div className="row">
            {" "}
            <div className="col-md-12">
              <label className="mt-3 text-white">Enter Email:</label>
            </div>{" "}
            <div className="col-md-12 mt-3">
              {" "}
              <input
                name="useremail"
                className="rounded-pill border-0 w-50"
                onChange={handleUserEmail}
              />
            </div>
          </div>
          {admin && (
            <div className="row">
              <div className="col-md-12 ">
                <label className="mt-3 text-white">Enter Password:</label>
              </div>{" "}
              <div className="col-md-12 mt-3">
                {" "}
                <input
                  name="userpassword"
                  className="rounded-pill border-0 w-50"
                  onChange={handleUserEmail}
                />
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-md-12">
              <input
                type="checkbox"
                className="ms-2 mt-3"
                value="Admin"
                onChange={(e) => setAdmin(e.target.checked)}
              />
              <label className="ms-2 text-white">Are You Admin?</label>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-12 mt-3 ">
              <input type="submit" className="btn btn-light" value="submit" />{" "}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default LogIn;
