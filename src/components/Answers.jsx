import {
    Grid,
    Paper,
    Select,
    Button,
    MenuItem,
    Typography,
    InputLabel,
    FormControl,
  } from "@material-ui/core";
import { useState, useEffect } from "react";
import Result from "./Result"

const Answers = ({ 
    quizData,
    classes,
    createMarkup,  
    resetQuiz,
    currentQuizStep,
    setCurrentQuizStep,
    }) => {
        // Stores the answers selected by the user
        const [selectedAnswers, setSelectedAnswers] = useState([]);

        // This state handles the check whether the selected answers
        // are correct or incorrect
        const [processedAnswers, setProcessedAnswers] = useState([]);


    // Function that handles the results of the answers
  const resultHandler = (e) => {
    e.preventDefault();

    const processedAnswers = selectedAnswers.map(({ answer, question }) => {
      const relatedQuestion = quizData.find(
        (category) => category.question === question
      );
      // Check if the answer selected by the user corresponds with the
      // answer from the original data (if it is correct)
      if (relatedQuestion.correct_answer === answer) {
        return { correctAnswer: answer, isCorrect: true, question };
      }
      return {
        correctAnswer: relatedQuestion.correct_answer,
        wrongAnswer: answer,
        isCorrect: false,
        question,
      };
    });

    setProcessedAnswers(processedAnswers);
  };
  


  // Handles the user input when he selects an answer and if he changes it to add it to the selectedAnswers array
  const handleAnswerChange = (e, selectedQuestion) => {
    e.preventDefault();
    const { value } = e.target;

    const isExistQuestion =
      selectedAnswers.length &&
      selectedAnswers.find((answer) => answer.question === selectedQuestion);

    if (isExistQuestion && isExistQuestion.answer) {
      const updatedAnswers = selectedAnswers.map((answer) => {
        if (answer.question === selectedQuestion) {
        // replace the old asnwer with the new selected
          return { question: selectedQuestion, answer: value };
        }
        // otherwise return the old answer
        return answer;
      });
      setSelectedAnswers(updatedAnswers);
    } else {
        // Add the new answer to the array of answers
      setSelectedAnswers([
        ...selectedAnswers,
        { question: selectedQuestion, answer: value },
      ]);
    }
  };


  // Shows the list of answers related to the given question and sets the answer to the
  // answer selected by the user
  const relatedAnswer = (question, selectedAnswers) => {
    if (selectedAnswers && selectedAnswers.length) {
      const relatedQuestion = selectedAnswers.find(
        (answer) => answer.question === question
      );
      // Return the answer to the question
      return (relatedQuestion && relatedQuestion.answer) || "";
    }
    return "";
  };

  // When component is rendered auto scroll to the top
  useEffect(() => {
    window.scrollTo(0, "20px");
  }, []);


    // If there is no processed data display the questions and answers
    return !processedAnswers.length ? (
     <>
        <Typography variant="h1" className={classes.mainTitle}>
        Answer the Questions:
      </Typography>
      <form onSubmit={resultHandler}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            {quizData.map((quiz) => (
              <Paper key={quiz.question} className={classes.paper}>
                <Typography variant="h5" className={classes.question}>
                  <span dangerouslySetInnerHTML={createMarkup(quiz.question)} />
                </Typography>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="answer-select-label">
                    Select answer:
                  </InputLabel>
                  <Select
                    required
                    name="answer"
                    id="answer-select"
                    label="Select answer"
                    value={relatedAnswer(quiz.question, selectedAnswers)}
                    labelId="answer-select-label"
                    onChange={(e) => handleAnswerChange(e, quiz.question)}
                  >
                    {quiz.answers.map((answer) => (
                      <MenuItem key={answer} value={answer}>
                        <span dangerouslySetInnerHTML={createMarkup(answer)} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Paper>
            ))}
            <Button
              className={classes.submitButton}
              variant="contained"
              color="primary"
              type="submit"
            >
              See Result
            </Button>
          </Grid>
            <Button
                onClick={resetQuiz}
                className={classes.submitButton}
                variant="contained"
                color="primary"
              >
                  Reset QuizMe
              </Button>
        </Grid>
      </form>
    </>
    // If there is processed data display the result component
    ) : <Result resetQuiz={resetQuiz}
                classes={classes}
                createMarkup={createMarkup}
                processedAnswers={processedAnswers} 
                currentQuizStep={currentQuizStep}
                setCurrentQuizStep={setCurrentQuizStep}
                />
};

export default Answers
