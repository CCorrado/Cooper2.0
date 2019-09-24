import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import styles from './TextInput.module.scss'

const TextInput = ({
  name, placeholder, type, error, onChange, onBlur, value, autoFocus
}) => (
  <TextField
    id={name}
    className={error ? styles['error-border'] : styles['text-input']}
    variant='standard'
    error={error}
    type={type}
    name={name}
    label={placeholder}
    value={value}
    onChange={onChange}
    autoFocus={autoFocus}
    onBlur={onBlur}
  />
)

export default TextInput

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  autoFocus: PropTypes.bool
}

TextInput.defaultProps = {
  placeholder: '',
  type: 'text',
  error: false,
  onChange: undefined,
  onBlur: undefined,
  value: '',
  autoFocus: false
}
