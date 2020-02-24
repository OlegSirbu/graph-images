import React, { useState } from 'react'
import PT from 'prop-types'

import { 
  Icon,
  Button,
  Popover,
  Menu,
  MenuItem
} from "@blueprintjs/core"

import classes from '../../routes/Images/List.scss';

const PopoverMenu = ({ user, handlerLogOut }) => {
  const [isShowMenu, setIsShowMenu] = useState(false);

  return(
    <Popover
      enforceFocus={false}
      isOpen={isShowMenu}
    >
        <Button 
          minimal
          onClick={() => {
            setIsShowMenu(true);
          }}
        >
          <Icon icon="user" />
          <span className={classes.user}>{user}</span>
        </Button>
        <Menu>
          <MenuItem href="/images/new" icon="add" text="Add image" />
          <MenuItem text="Logout" onClick={() => { 
            setIsShowMenu(false)
            handlerLogOut()
             }} />
        </Menu>
    </Popover>
  )
}

PopoverMenu.propTypes = {
  user: PT.string,
  handlerLogOut: PT.func,
}


export default PopoverMenu;
