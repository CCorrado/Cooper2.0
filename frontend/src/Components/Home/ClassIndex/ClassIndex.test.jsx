import { shallow } from 'enzyme'
import React from 'react'
import ClassIndex from './ClassIndex'

let wrapper
const onSwapClicked = jest.fn()

beforeEach(() => {
  wrapper = shallow(<ClassIndex onSwapClicked={onSwapClicked} />)
})

describe('Class Index Tests', () => {
  it('should render', () => {
    const div = wrapper.find('.container')
    expect(div.exists()).toBeTruthy()
  })

  it('should render empty state text', () => {
    const emptyText = wrapper.find('.text')
    expect(emptyText.text()).toBe('No courses currently registered')
  })
})
