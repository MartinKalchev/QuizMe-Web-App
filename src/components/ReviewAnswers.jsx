import { Paper, Button, Typography } from "@material-ui/core";
import { Check, Close } from "@material-ui/icons";
import { useEffect } from "react";

const ReviewAnswers = ({ processedAnswers, createMarkup, classes, resetQuiz }) => {

    useEffect(() => {
        window.scrollTo(0, "20px");
      }, []);
      
  const showAnswers = (answers) => {
    return answers.map(
      ({ question, isCorrect, correctAnswer, wrongAnswer }) => (
        <Paper key={question} className={classes.paper}>
          <Typography variant="h2" className={classes.question}>
            <span dangerouslySetInnerHTML={createMarkup(question)} />
          </Typography>

          {isCorrect ? (
            <Typography
              variant="h2"
              className={`${classes.answer} ${classes.correctAnswer}`}
            >
            {/* Check component indicates the right answer */}
              <Check />
              <span
                className={classes.answer}
                dangerouslySetInnerHTML={createMarkup(correctAnswer)}
              />
            </Typography>
          ) : (
            <>
              <Typography
                variant="h3"
                color="secondary"
                className={classes.answer}
              >
                {/* Close component indicates that the answer is wrong */}
                <Close />
                <span
                  className={classes.answer}
                  dangerouslySetInnerHTML={createMarkup(wrongAnswer)}
                />
              </Typography>
              <Typography
                variant="h3"
                className={`${classes.answer} ${classes.correctAnswer}`}
              >
                <Check />
                <span
                  className={classes.answer}
                  dangerouslySetInnerHTML={createMarkup(correctAnswer)}
                />
              </Typography>
            </>
          )}
        </Paper>
      )
    );
  };

  return (
    <>
      <Typography variant="h1" className={classes.mainTitle}>
        Summary:
      </Typography>
      {showAnswers(processedAnswers)}
      <Button
        className={classes.submitButton}
        onClick={resetQuiz}
        variant="contained"
        color="primary"
      >
        Reset QuizMe
      </Button>
    </>
  );
};

export default ReviewAnswers;
