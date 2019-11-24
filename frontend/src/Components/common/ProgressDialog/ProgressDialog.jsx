import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'
import styles from './ProgressDialog.module.scss'

export default function ProgressDialog ({ open }) {
  return (
    open && (
      <div className={styles.container}>
        <CircularProgress style={{ alignSelf: 'center' }} />
      </div>
    )
  )
}

ProgressDialog.propTypes = {
  open: PropTypes.bool.isRequired
}
