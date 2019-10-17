import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import PropTypes from 'prop-types'
import styles from './ProgressDialog.module.scss'

export default function ProgressDialog ({ open }) {
  return (
    <div className={styles.container}>
      <Dialog
        open={open}
        disableBackdropClick
        disableEscapeKeyDown
      >
        <CircularProgress />
      </Dialog>
    </div>
  )
}

ProgressDialog.propTypes = {
  open: PropTypes.bool.isRequired
}
