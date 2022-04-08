import { mount } from '@vue/test-utils'
import Tab1Page from '@/views/Task.vue'

describe('Task.vue', () => {
  it('renders tab 1 Todos', () => {
    const wrapper = mount(Tab1Page)
    expect(wrapper.text()).toMatch('Tab 1 page')
  })
})
