import axios from "axios";
import React, { useEffect, useState } from "react";

function Quiz() {
  const [data, setData] = useState<any>([]);
  const [index, setIndex] = useState(1);
  const [correct, setCorrect] = useState(0);
  const [checkBoxValue, setCheckBoxValue] = useState("");
  const email = localStorage.getItem("email");
  const userdata = {
    score: correct,
    email: email,
  };
  const QuizData = async () => {
    await axios
      .get(
        "https://orcalotest-default-rtdb.firebaseio.com/quizAppQuestions.json"
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
    QuizData();
  }, []);
  const postResult = async () => {
    await axios
      .post(
        "https://orcalotest-default-rtdb.firebaseio.com/scoreCard.json",
        userdata
      )
      .then((response) => {
        console.log(response);
      });
  };

  console.log(correct);

  const handleChange = (id: number, p: React.SetStateAction<string>) => {
    setCheckBoxValue(p);
    console.log(id, p);
    console.log();
    if (data[id - 1].correctOption === p) {
      setCorrect(correct + 1);
    }
  };

  console.log(email);
  const incrementQuestion = () => {
    const increment = index + 1;
    setIndex(increment);
    setCheckBoxValue("");
  };
  return (
    <div className="container bg-success p-3">
      {index <= 8 && <h5 className="text-white">Qestion No: {index}</h5>}
      {data
        .filter((data: { id: number }) => data.id === index)
        .map((data: any) => {
          const id = data.id;
          return (
            <div key={data.id}>
              <p className="text-white mt-3 text-start"> {data.question}</p>
              {data.options.map((p: any) => {
                return (
                  <>
                    <div className="row ">
                      <div className="col-md-1 text-end">
                        {" "}
                        <input
                          type="radio"
                          name="quiz"
                          onChange={() => {
                            handleChange(id, p);
                          }}
                          value={checkBoxValue}
                        />
                      </div>{" "}
                      <div className="col-md-2 text-start ">
                        <p className="text-white">{p}</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          );
        })}
      {index <= 8 && (
        <button
          onClick={() => {
            incrementQuestion();
          }}
          className="btn btn-light"
        >
          Next
        </button>
      )}
      {index > 8 && (
        <div className="text-white">
          {" "}
          you scored {correct}/{data.length}
        </div>
      )}
      {index > 8 && (
        <button onClick={postResult} className="btn btn-light ms-3 mt-3">
          Submit
        </button>
      )}
    </div>
  );
}
export default Quiz;
