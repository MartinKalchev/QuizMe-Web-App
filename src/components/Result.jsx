import { Button, Typography } from "@material-ui/core";
import { useEffect } from "react";
import ReviewAnswers from "./ReviewAnswers";

const Result = ({
  classes,
  resetQuiz,
  createMarkup,
  currentQuizStep,
  processedAnswers,
  setCurrentQuizStep,
}) => {

  useEffect(() => {
    window.scrollTo(0, "20px");
  }, []);
  
  return currentQuizStep === "results" ? (
    <div className={classes.results}>
    <Typography variant="h1" className={classes.mainTitle}>
      Your Result
    </Typography>
    <Typography variant="h4">
      {/* Returns the number of correct answers by checking the property correct_answer from the object */}
      {processedAnswers.filter(({ isCorrect }) => isCorrect).length} out of{" "}
      {processedAnswers.length}
    </Typography>
    <Button
      onClick={(e) => {
        setCurrentQuizStep("review");
      }}
      className={classes.submitButton}
      variant="contained"
      color="primary"
    >
      Review
    </Button>{" "}
    <Button
      onClick={resetQuiz}
      className={classes.submitButton}
      variant="contained"
      color="primary"
    >
      Start QuizMe again
    </Button>
  </div>
  ) : <ReviewAnswers 
                    classes={classes} 
                    resetQuiz={resetQuiz}
                    processedAnswers={processedAnswers}
                    createMarkup = {createMarkup}/>
};

export default Result;
