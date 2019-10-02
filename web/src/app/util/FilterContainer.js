import React from 'react'
import p from 'prop-types'
import {
  Hidden,
  Popover,
  SwipeableDrawer,
  withStyles,
  IconButton,
  Grid,
  Button,
} from '@material-ui/core'
import { FilterList as FilterIcon } from '@material-ui/icons'

const style = theme => {
  return {
    actions: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    overflow: {
      overflow: 'visible',
    },
    container: {
      padding: 8,
      [theme.breakpoints.up('md')]: {
        width: 'min-content',
        minWidth: '17em',
        maxWidth: '22em',
      },
      [theme.breakpoints.down('sm')]: { width: '100%' },
    },
    formContainer: {
      margin: 0,
    },
  }
}

@withStyles(style)
export default class FilterContainer extends React.PureComponent {
  state = {
    anchorEl: null,
  }

  // todo: fill in rest
  static propTypes = {
    // https://material-ui.com/api/icon-button/
    iconButtonProps: p.object,
  }

  renderContent() {
    return (
      <Grid container spacing={2} className={this.props.classes.container}>
        <Grid
          item
          container
          xs={12}
          spacing={2}
          className={this.props.classes.formContainer}
        >
          {this.props.children}
        </Grid>
        <Grid item xs={12} className={this.props.classes.actions}>
          {this.props.onReset && (
            <Button onClick={this.props.onReset}>Reset</Button>
          )}
          <Button
            onClick={() =>
              this.setState({
                anchorEl: null,
              })
            }
          >
            Done
          </Button>
        </Grid>
      </Grid>
    )
  }

  render() {
    const { classes, iconButtonProps } = this.props
    return (
      <React.Fragment>
        <IconButton
          color='inherit'
          onClick={e =>
            this.setState({
              anchorEl: e.target,
            })
          }
          title='filter'
          aria-expanded={Boolean(this.state.anchorEl)}
          {...iconButtonProps}
        >
          <FilterIcon />
        </IconButton>
        <Hidden smDown>
          <Popover
            anchorEl={this.state.anchorEl}
            classes={{
              paper: classes.overflow,
            }}
            open={!!this.state.anchorEl}
            onClose={() =>
              this.setState({
                anchorEl: null,
              })
            }
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {this.renderContent()}
          </Popover>
        </Hidden>
        <Hidden mdUp>
          <SwipeableDrawer
            anchor='top'
            classes={{
              paper: classes.overflow,
            }}
            disableDiscovery
            disableSwipeToOpen
            open={!!this.state.anchorEl}
            onClose={() =>
              this.setState({
                anchorEl: null,
              })
            }
            onOpen={() => {}}
          >
            {this.renderContent()}
          </SwipeableDrawer>
        </Hidden>
      </React.Fragment>
    )
  }
}
