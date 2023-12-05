import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RestauranteLista } from '../pages/Home'

type Product = {
  id: number
  price: number
}

type PurchasePayload = {
  products: Product[]
  delivery: {
    receiver: string
    address: {
      description: string
      city: string
      zipCode: string
      number: number
      complement?: string
    }
  }
  payment: {
    card: {
      name: string
      number: string
      code: string
      expires: {
        month: number
        year: number
      }
    }
  }
}

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
    }),
    purchase: builder.mutation<any, PurchasePayload>({
      query: (body) => ({
        url: 'checkout',
        method: 'POST',
        body
      })
    })
  })
})

export const {
  useGetRestaurantesQuery,
  useGetPratosQuery,
  usePurchaseMutation
} = api
export default api
