import React from 'react'
import { DialogActions, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1),
  },
  dialogActions: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
  },
}))

export default function DialogNavigation(props) {
  const {
    activeStep,
    formFields,
    onClose,
    onLastStep,
    onSubmit,
    setActiveStep,
    steps,
  } = props
  const classes = useStyles()

  const stepForward = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const stepBackward = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const nextIsDisabled = () => {
    switch (activeStep) {
      case 0:
        return !(formFields.summary && formFields.details)
      case 1:
        return formFields.selectedServices.length === 0
      default:
        return false
    }
  }

  const getNextBtnLabel = () => {
    switch (activeStep) {
      case steps.length - 1:
        return 'Done'
      case steps.length - 2:
        return 'Submit'
      default:
        return 'Next'
    }
  }

  const getBackBtnLabel = () => {
    switch (activeStep) {
      case 0:
        return 'Cancel'
      default:
        return 'Back'
    }
  }

  const handleNext = e => {
    e.preventDefault()
    switch (activeStep) {
      case steps.length - 1:
        onClose()
        break
      case steps.length - 2:
        onSubmit()
        stepForward()
        break
      default:
        stepForward()
    }
  }

  const handleBack = () => {
    switch (activeStep) {
      case 0:
        return onClose()
      default:
        return stepBackward()
    }
  }

  // NOTE buttons are mounted in order of tab precedence and arranged with CSS
  // https://www.maxability.co.in/2016/06/13/tabindex-for-accessibility-good-bad-and-ugly/
  return (
    <DialogActions className={classes.dialogActions}>
      <Button
        variant='contained'
        color='primary'
        onClick={handleNext}
        className={classes.button}
        disabled={nextIsDisabled()}
        type={activeStep === steps.length - 2 ? 'submit' : 'button'}
        form={activeStep === steps.length - 2 ? 'create-alert-form' : null}
      >
        {getNextBtnLabel()}
      </Button>

      {!onLastStep && (
        <Button onClick={handleBack} className={classes.button}>
          {getBackBtnLabel()}
        </Button>
      )}
    </DialogActions>
  )
}
