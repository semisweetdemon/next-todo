import { api as index } from ".."

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getAllTodo: builder.query<Todo.GetAllTodoRes, Todo.GetAllTodoReq>({
			query: () => ({
				method: "GET",
			}),
			providesTags: ["todo"],
		}),
		getOneTodo: builder.query<Todo.GetOneTodoRes, Todo.GetOneTodoReq>({
			query: (id) => ({
				url: `/${id}`,
				method: "GET",
			}),
			providesTags: ["todo"],
		}),
		postTodo: builder.mutation<Todo.PostTodoRes, Todo.PostTodoReq>({
			query: (data) => ({
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["todo"],
		}),
		putTodo: builder.mutation<Todo.PutTodoRes, Todo.PutTodoReq>({
			query: ({ id, data }) => ({
				url: `/${id}`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["todo"],
		}),
		patchTodo: builder.mutation<Todo.PatchTodoRes, Todo.PatchTodoReq>({
			query: (data) => ({
				url: `/${data._id}`,
				method: "PATCH",
				body: { isDone: !data.isDone },
			}),
			invalidatesTags: ["todo"],
		}),
		deleteTodo: builder.mutation<Todo.DeleteTodoRes, Todo.DeleteTodoReq>({
			query: (id) => ({
				url: `/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["todo"],
		}),
	}),
})

export const { useGetAllTodoQuery, useGetOneTodoQuery, usePostTodoMutation, usePutTodoMutation, usePatchTodoMutation, useDeleteTodoMutation } = api
