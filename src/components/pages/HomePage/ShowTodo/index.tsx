"use client"
import React from "react"
import scss from "./ShowTodo.module.scss"
import { useDeleteTodoMutation, useGetAllTodoQuery, usePatchTodoMutation } from "@/redux/api/todo"
import { EditTodo } from "../EditTodo"

export const ShowTodo: React.FC = (): JSX.Element => {
	const { data, isSuccess } = useGetAllTodoQuery()
	const [patchTodo] = usePatchTodoMutation()
	const [deleteTodo] = useDeleteTodoMutation()
	const [editId, setEditId] = React.useState<number | null>(null)

	const changeIsDone = async (todo: Todo.PatchTodoReq) => {
		await patchTodo(todo)
	}

	const deleteTodoFn = async (id: number) => {
		await deleteTodo(id)
	}

	return (
		<div className={scss.show_todo}>
			<div className="container">
				<div className={scss.content}>
					{isSuccess &&
						data.map((todo) =>
							editId === todo._id ? (
								<EditTodo id={editId} setEditId={setEditId} />
							) : (
								<div key={todo._id}>
									<div>
										<h3>{todo.title}</h3>
										<div className={scss.buttons}>
											<button onClick={() => changeIsDone(todo)}>{todo.isDone ? "Done" : "In process"}</button>
											<button onClick={() => setEditId(todo._id!)}>Edit</button>
											<button onClick={() => deleteTodoFn(todo._id!)}>Delete</button>
										</div>
									</div>
									<h4>{todo.text}</h4>
									<p>{todo.more_text}</p>
								</div>
							)
						)}
				</div>
			</div>
		</div>
	)
}
