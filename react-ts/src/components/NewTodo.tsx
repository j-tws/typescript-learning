import React, { useRef } from 'react'
import './NewTodo.css'

interface NewTodoProps {
  addTodo: (todoText: string) => void
}

const NewTodo: React.FC<NewTodoProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null)

  const todoSubmitHandler = (ev: React.FormEvent) => {
    ev.preventDefault()
    const enteredText = textInputRef.current!.value
    props.addTodo(enteredText)
  }

  return (
    <form onSubmit={todoSubmitHandler}>
      <div className="form-control">
        <label htmlFor="todo-text">Todo Text</label>
        <input type="text" id="todo-text" ref={ textInputRef }/>
      </div>
      <button type="submit">Add To Do!</button>
    </form>
  )
}

export default NewTodo