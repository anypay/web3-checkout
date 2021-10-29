import { createContext } from 'react'
import type { IAnypayServiceResponse } from 'services/Anypay'

export const PaymentsComponentContext = createContext<IAnypayServiceResponse | null>(null)
