
import React, { useState } from 'react'
import PT from 'prop-types'
import {
  Button,
  Dialog,
  Icon,
  InputGroup,
  Label,
  Intent,
} from "@blueprintjs/core"
import classes from './Login.scss'

const LoginDialog = ({ open, setUserName, handlerSetShowLoginDialog }) => {
  const [userNameInput, setUserNameInput] = useState('');

  const handlerChangeName = ({target}) => setUserNameInput(target.value);

  const handleClose = () => handlerSetShowLoginDialog(false);
  
  const handleContinue = () => {
    setUserName(userNameInput);
    handlerSetShowLoginDialog(false);
  }

  return (
    <Dialog
      isOpen={open}
      onClose={handleClose}
    >
      <div className={classes.bodyDialog}>
        <div className={classes.closeImage}>
          <Icon icon="cross" onClick={handleClose} />
        </div>
        <div className={classes.dialogWrap}>
          <div className={classes.left}>
            <Icon icon="user" iconsize={'40px'} />
          </div>
          <div className={classes.right}>
            <Label htmlFor="input-username">Please enter your username to continue:</Label>
            <InputGroup id="input-username" type="text" onChange={handlerChangeName} value={userNameInput} />
            <div className={classes.btnWrap}>
              <Button onClick={handleClose}>Close</Button>
              <Button disabled={userNameInput === ''} intent={Intent.PRIMARY} onClick={handleContinue}>Continue</Button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

LoginDialog.propTypes = {
  open: PT.bool,
  setUserName: PT.func,
  handlerSetShowLoginDialog: PT.func,
}

export default LoginDialog;