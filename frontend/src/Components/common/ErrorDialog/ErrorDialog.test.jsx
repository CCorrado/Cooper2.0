import { shallow } from 'enzyme'
import React from 'react'
import ErrorDialog from './ErrorDialog'

let wrapper
const setShown = jest.fn()

beforeEach(() => {
  wrapper = shallow(<ErrorDialog isShown setShown={setShown} message='Test Error' />)
})

describe('Error Dialog Tests', () => {
  it('should render', () => {
    const div = wrapper.find('.dialog')
    expect(div.exists()).toBeTruthy()
  })

  it('should render close', () => {
    const closeButton = wrapper.find('button')
    const closeIcon = wrapper.find('img')
    expect(closeIcon.props().src).toBe('close.svg')
    expect(closeButton.props().className).toBe('close-icon')
    closeButton.simulate('click')
    expect(setShown).toHaveBeenCalledTimes(1)
  })

  it('should render message', () => {
    const messageText = wrapper.find('.message')
    expect(wrapper.find('.title').text()).toBe('Error')
    expect(messageText.text()).toBe('Test Error')
  })
})
