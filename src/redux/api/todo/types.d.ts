namespace Todo {
	interface Todo {
		_id?: number
		title: string
		text: string
		more_text: string
		isDone: boolean
	}

	type GetAllTodoReq = void
	type GetAllTodoRes = Todo[]

	type GetOneTodoReq = number
	type GetOneTodoRes = Todo

	type PostTodoReq = Todo
	type PostTodoRes = void

	type PutTodoReq = {
		id: number
		data: Todo
	}
	type PutTodoRes = void

	type PatchTodoReq = Todo
	type PatchTodoRes = void

	type DeleteTodoReq = number
	type DeleteTodoRes = void
}
