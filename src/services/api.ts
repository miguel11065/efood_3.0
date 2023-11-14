import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RestauranteLista } from '../pages/Home'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fake-api-tau.vercel.app/api/efood/'
  }),
  endpoints: (builder) => ({
    getRestaurantes: builder.query<RestauranteLista[], void>({
      query: () => 'restaurantes'
    }),
    getPratos: builder.query<RestauranteLista, string>({
      query: (id) => `restaurantes/${id}`
    })
  })
})

export const { useGetRestaurantesQuery, useGetPratosQuery } = api
export default api
