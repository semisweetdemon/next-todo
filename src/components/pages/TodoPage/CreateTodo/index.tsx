import React from "react"
import scss from "./index.module.scss"

export const index: React.FC = () => {
	return (
		<section className={scss.index}>
			<div className="container">
				<div className={scss.content}>
					<h1>Todo Create</h1>
				</div>
			</div>
		</section>
	)
}
