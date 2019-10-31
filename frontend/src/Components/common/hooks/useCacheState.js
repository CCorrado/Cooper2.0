import { useState, useEffect } from 'react'

export default function useCacheState (key, defaultValue = null) {
  function getCacheValue (keyOfValue) {
    return JSON.parse(localStorage.getItem(keyOfValue))
  }

  function saveCacheValue (keyOfValue, value) {
    localStorage.setItem(keyOfValue, JSON.stringify(value))
  }

  const [stateValue, setStateValue] = useState(getCacheValue(key))

  function setValue (value) {
    saveCacheValue(key, value)
    return setStateValue(value)
  }

  function removeValue (keyOfValue) {
    localStorage.removeItem(keyOfValue)
  }

  function initialize () {
    const initialValue = getCacheValue(key)
    if (initialValue === null) {
      setValue(defaultValue)
    }
  }

  useEffect(() => {
    initialize()
  }, [])

  return [
    stateValue,
    setValue,
    removeValue
  ]
}
