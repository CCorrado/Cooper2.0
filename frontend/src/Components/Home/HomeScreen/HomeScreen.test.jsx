import { shallow } from 'enzyme'
import React from 'react'
import HomeScreen from './HomeScreen'

let wrapper

beforeEach(() => {
  wrapper = shallow(<HomeScreen />)
})

describe('Home Screen Tests', () => {
  it('should render', () => {
    const div = wrapper.find('.container')
    expect(div.exists()).toBeTruthy()
  })

  it('should render empty state text', () => {
    const emptyText = wrapper.find('.text')
    expect(emptyText.text()).toBe('No course swaps currently available to accept')
  })
})
