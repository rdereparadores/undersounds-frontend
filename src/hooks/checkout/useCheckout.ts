import { useContext } from 'react'
import { CheckoutContext } from './CheckoutContext'

export const useCheckout = () => {
    return useContext(CheckoutContext)
}