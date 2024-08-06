"use client"
import React from "react"
import scss from "./Todo.module.scss"
import { useForm, SubmitHandler } from "react-hook-form"
import { usePostTodoMutation } from "@/redux/api/todo"

export const Todo: React.FC = (): JSX.Element => {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
		reset,
	} = useForm<Todo.PostTodoReq>()
	const [postTodo] = usePostTodoMutation()

	const onSubmit: SubmitHandler<Todo.PostTodoReq> = async (data) => {
		const newTodo = {
			title: data.title,
			text: data.text,
			more_text: data.more_text,
			isDone: false,
		}

		try {
			await postTodo(newTodo)
			reset()
		} catch (err) {
			console.log(err)
		}
	}
	return (
		<div className={scss.todo}>
			<div className="container">
				<div className={scss.content}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<input type="text" placeholder="Title" {...register("title")} />
						<input type="text" placeholder="Short description" {...register("text")} />
						<input type="text" placeholder="Long description" {...register("more_text")} />
						{isSubmitting ? <button type="button">Submitting</button> : <button type="submit">Submit</button>}
					</form>
				</div>
			</div>
		</div>
	)
}
