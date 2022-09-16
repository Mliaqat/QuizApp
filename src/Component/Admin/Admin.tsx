import axios from "axios";
import React, { useEffect, useState } from "react";

function Admin() {
  const [data, setData] = useState<any>([]);
  const quizProgress = async () => {
    await axios
      .get(
        "https://retest-orcalo-db-default-rtdb.firebaseio.com/scoreCard.json"
      )
      .then((response) => {
        const converdata = Object.keys(response.data);
        console.log(converdata);
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
    quizProgress();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <h5>User Score</h5>{" "}
        </div>
        <div className="col-md-4">
          <h5>User Email</h5>{" "}
        </div>
      </div>
      {data.map((p: any) => {
        return (
          <div className="row">
            <div className="col-md-4"> {p.score}</div>
            <div className="col-md-4"> {p.email}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Admin;
