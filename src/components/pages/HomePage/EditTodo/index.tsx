"use client"
import React from "react"
import scss from "./EditTodo.module.scss"
import { SubmitHandler, useForm } from "react-hook-form"
import { useGetOneTodoQuery, usePutTodoMutation } from "@/redux/api/todo"

interface IEditTodo {
	id: number
	setEditId: React.Dispatch<React.SetStateAction<number | null>>
}

export const EditTodo: React.FC<IEditTodo> = ({ id, setEditId }): JSX.Element => {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
		setValue,
		reset,
	} = useForm<Todo.Todo>()

	const { data, isSuccess, refetch } = useGetOneTodoQuery(id)
	const [putTodo] = usePutTodoMutation()

	const cancel = () => {
		setEditId(null)
	}

	const onSubmit: SubmitHandler<Todo.Todo> = async (data) => {
		try {
			const { _id, ...request } = data

			const newObj = {
				id: _id!,
				data: request,
			}
			await putTodo(newObj)
			reset()
			cancel()
		} catch (err) {
			console.log(err)
		}
	}

	React.useEffect(() => {
		refetch()
		if (isSuccess) {
			setValue("_id", data._id)
			setValue("title", data.title)
			setValue("text", data.text)
			setValue("more_text", data.more_text)
			setValue("isDone", data.isDone)
		}

		return () => {
			reset()
		}
	}, [isSuccess, id])
	return (
		<div className={scss.edit_todo}>
			<div className={scss.content}>
				<button onClick={cancel}>Cancel</button>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input type="text" placeholder="Title" {...register("title", { minLength: 2, required: true })} />
					<input type="text" placeholder="Short description" {...register("text", { minLength: 5, required: true })} />
					<input type="text" placeholder="Long description" {...register("more_text", { minLength: 10, required: true })} />
					{isSubmitting ? <button type="button">Submitting</button> : <button type="submit">Submit</button>}
				</form>
			</div>
		</div>
	)
}
