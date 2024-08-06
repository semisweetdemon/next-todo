"use client"

import { store } from "@/redux/store"
import React from "react"
import { Provider } from "react-redux"

interface ILayoutClient {
	children: React.ReactNode
}

const LayoutClient: React.FC<ILayoutClient> = ({ children }) => {
	return <Provider store={store}>{children}</Provider>
}
export default LayoutClient
