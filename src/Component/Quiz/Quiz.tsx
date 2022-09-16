import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Quiz.scss";

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
        "https://retest-orcalo-db-default-rtdb.firebaseio.com/quizAppQuestions.json"
      )
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
    QuizData();
  }, []);
  const postResult = async () => {
    await axios
      .post(
        "https://retest-orcalo-db-default-rtdb.firebaseio.com/scoreCard.json",
        userdata
      )
      .then((response) => {
        console.log(response);
      });
  };

  const handleChange = (id: number, index: React.SetStateAction<string>) => {
    setCheckBoxValue(index);
    if (data[id - 1].correctOption === index) {
      setCorrect(correct + 1);
    }
  };

  const incrementQuestion = () => {
    const increment = index + 1;
    setIndex(increment);
    setCheckBoxValue("");
  };
  return (
    <div className="quiz-wrapper">
    <div className="bg bg-success p-3 ">
      <div className="center form">
        {index <= 8 && <h5 className="text-color">Question No: {index}</h5>}
        {data
          .filter((data: { id: number }) => data.id === index)
          .map((data: any) => {
            const id = data.id;
            return (
              <div key={data.id}>
                <div>
                  <p className="mt-3 fw-bold text-start"> {data.question}</p>
                </div>
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
                          <p className="fw-bold">{p}</p>
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
          <>
            <div className="fw-bold">
              Total Score: {correct}/{data.length}
            </div>
            <button onClick={postResult} className="btn btn-light ms-3 mt-3">
              Submit
            </button>
          </>
        )}
      </div>
    </div>
    </div>
  );
}
export default Quiz;
