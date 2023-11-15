import axiosLib from 'axios'
import MockAdapter from 'axios-mock-adapter'

export const axios = new MockAdapter(axiosLib)
