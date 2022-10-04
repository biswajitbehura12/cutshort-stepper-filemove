import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Welcome",
    "Your Work",
    "Your Planning",
    "Finsh Point",
  ];
}
function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <>
          <TextField
            id="full-name"
            label="Full Name"
            variant="outlined"
            placeholder="Enter Your First Name"
            fullWidth
            margin="normal"
            name="fullName"
          />
        
          <TextField
            id="display-name"
            label="Display Name"
            variant="outlined"
            placeholder="Enter Your display Name"
            fullWidth
            margin="normal"
            name="Display Name"
          />
        </>
      );

    case 1:
      return (
        <>
          <TextField
            id="workspace-name"
            label="Workspace Name"
            variant="outlined"
            placeholder="Enter Your Workspace Name"
            fullWidth
            margin="normal"
            name="WorkspaceName"
          />
          <TextField
            id="workspace-url"
            label="WorkspaceUrl"
            variant="outlined"
            placeholder="Enter link"
            fullWidth
            margin="normal"
            name="WorkspaceUrl"
          />
         
        </>
      );
    case 2:
      return (
        <>
          <Card sx={{ minWidth: 100 }}>
      <CardContent>
        
        <Typography variant="h5" component="div">
          For Myself
        </Typography>
        
        
        <Typography variant="body2">
          Write better.Think<br/>more clearly.Stay<br/>organized.
          <br />
        </Typography>
      </CardContent>
      
    </Card>
    <Card sx={{ minWidth: 100 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          With My Team
        </Typography>
       
        <Typography variant="body2">
          Wikis, docs,tasks <br/> projects,all in one ,<br/> place.
          <br />
        </Typography>
      </CardContent>
      
    </Card>
        </>
      );
    default:
      return "";
  }
}

const Cutshortfile = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);

  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setSkippedSteps(skippedSteps.filter((skipItem) => skipItem !== activeStep));
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };

  return (
    <div>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography
                variant="caption"
                align="center"
                style={{ display: "block" }}
              >
                optional
              </Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <Typography variant="h3" align="center">
          Congratulations, Eren!
        </Typography>
      ) : (
        <>
          <form>{getStepContent(activeStep)}</form>
          <Button
            className={classes.button}
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            back
          </Button>
          {isStepOptional(activeStep) && (
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleSkip}
            >
              skip
            </Button>
          )}
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </>
      )}
    </div>
  );
};

export default Cutshortfile;