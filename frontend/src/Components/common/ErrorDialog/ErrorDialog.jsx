import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import styles from './ErrorDialog.module.scss'
import close from '../../../images/close.svg'

export default function ErrorDialog ({ message, isShown, setShown }) {
  return (
    <Dialog open={isShown}>
      <div className={styles.dialog}>
        <button
          type='button'
          className={styles['close-icon']}
          onClick={setShown}
        >
          <img className={styles['close-img']} src={close} alt='close' />
        </button>
        <div className={styles.title}>
          {'Error'}
        </div>
        <div className={styles.message}>
          {message}
        </div>
      </div>
    </Dialog>
  )
}

ErrorDialog.propTypes = {
  message: PropTypes.string.isRequired,
  setShown: PropTypes.func.isRequired,
  isShown: PropTypes.bool.isRequired
}
