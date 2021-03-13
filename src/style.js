export const styles = {
    paper: {
      padding: "20px",
      marginTop: "20px",
      marginBottom: "20px",
      borderRadius: "20px",
      boxShadow:
        "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    },
    mainTitle: {
      fontSize: "45px",
      marginBottom: "20px",
    },
    submitButton: {
      marginTop: "20px",
      borderRadius: "999px",
      background: "#07A604",
      "&:hover": {
        backgroundColor: "#07A604",
        boxShadow:
          "0 14px 26px -12px rgba(156, 39, 176, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(156, 39, 176, 0.2)",
      },
    },
    question: {
      fontSize: "25px",
      marginBottom: "10px",
      fontWeight: "600",
      lineHeight: "35px",
    },
    answer: {
      fontSize: "20px",
      marginBottom: "10px",
      fontWeight: "400",
      lineHeight: "25px",
      marginLeft: "10px",
      display: "flex",
    },
    correctAnswer: {
      color: "green",
    },
    results: {
      fontSize: "20px",
      display: "flex",
      fontWeight: "400",
      margin: "0 auto",
      maxWidth: "150px",
      textAlign: "center",
      flexDirection: "column",
    },
  };