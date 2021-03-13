import {
    Grid,
    Paper,
    Select,
    Button,
    MenuItem,
    Container,
    Typography,
    InputLabel,
    FormControl,
    makeStyles,
  } from "@material-ui/core";
import axios from "axios"
import { useEffect, useState } from "react"
import React from 'react'
import Answers from "./Answers"
import { styles } from "../style"
import { useConfirm } from 'material-ui-confirm';


// Allows normal html code to be rendered in the react component
export const createMarkup = (text) => {
    return { __html: text };
  };

  // CSS styling
const useStyles = makeStyles((theme) => styles);

const Categories = () => {

    // Create initial state
    const [quizData, setQuizData] = useState([]);

    const [quizCategories, setQuizCategories] = useState([]);

    // Category state in order for the user to select the category of questions
    const [category, setCategory] = useState({ id: "", name: "" });

    // This state keeps track of the current step the user is on the quiz
    const [currentQuizStep, setCurrentQuizStep] = useState("start");

    const classes = useStyles();

    const confirm = useConfirm();

    // Fetch quiz categories from the Trivia API
    const fetchQuizData = async () => {

      const url = `https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple&category=${
        category.id}`;

        const { data } = await axios.get(url);
            
            // Return all the quiz categories and the arrays of answers
            const formattedData = data.results.map((cat) => {
                const incorrectAnswersIndexes = cat.incorrect_answers.length;
                // Add the correct answer randomly so it doesnt appear at the same place every time
                const randIndex = Math.round(Math.random() * (incorrectAnswersIndexes - 0) + 0);
                
                cat.incorrect_answers.splice(
                    randIndex,
                    0,
                    cat.correct_answer
                    );
                return {
                    ...cat,
                    answers: cat.incorrect_answers,
                };
            });
            // The initial state of start will be overwritten and the form will be removed from the screen
            // and the questions will be displayed
            setCurrentQuizStep("results");
            setQuizData(formattedData);
    };

    const fetchQuizCategories = async () => {
        const { data } = await axios.get(
            "https://opentdb.com/api_category.php");
        setQuizCategories(data.trivia_categories)
    };

    // Call this function once after page is loaded
    useEffect(() => {
        fetchQuizCategories();
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        if (!quizData.length && category.id) {
          fetchQuizData();
        }
      };


      // Select the category of the quiz questions
      const selectChangeHandler = (e) => {
        e.preventDefault();  // Prevents normal requests in order to run react code
        const selectedCategory = quizCategories.find(
          (cat) => cat.id === e.target.value);
        setCategory(selectedCategory);
      };

      if (!quizCategories.length) {
        return null;
      }

      // Function which handles the reset button functionality
      const resetQuiz = (e) => {
        e.preventDefault()

        confirm({description: "This will reset the Quiz", confirmationText: "Yes"})
        .then(() => {
          setQuizData([])
          setCategory("")
          setCurrentQuizStep("start")
          window.scrollTo(0, "20px")});

        
      };

    return (
        <Container>
        <Paper className={classes.paper}>
            {currentQuizStep === "start" ? (
            <>
              <Typography variant="h1" className={classes.mainTitle}>
                Welcome to QuizMe <br></br> Choose a category and get questions:
              </Typography>
              <form onSubmit={submitHandler}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="category-select-label">
                        Select category:
                      </InputLabel>
                      <Select
                        required
                        name="category"
                        value={category.id || ""}
                        id="category-select"
                        label="Select category"
                        labelId="category-select-label"
                        onChange={selectChangeHandler}
                      >
                        {quizCategories.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            <span
                            // This removes strange characters and formats the data correctly
                              dangerouslySetInnerHTML={createMarkup(
                                category.name
                              )}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>  
                </Grid>
                <Button
                  className={classes.submitButton}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Start
                </Button>
              </form>{" "}
              </> ) : ( 
                <Answers 
                quizData={quizData}
                classes={classes}
                resetQuiz={resetQuiz}
                currentQuizStep={currentQuizStep}
                setCurrentQuizStep={setCurrentQuizStep}
                createMarkup={createMarkup} 
              />
              )}
        </Paper>
      </Container>
     )
};

export default Categories;