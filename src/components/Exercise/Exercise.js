import React from 'react'
import { useState } from 'react'
import { nanoid } from "nanoid"

export default function Exercise() {

    const [newComment, setNewComment] = useState({
        subject:"",
        comment:"",
        author:""
    })

    const [error, setError] = useState("")

    const [list, setList] = useState([])

    const [id, setId] = useState("")

	const [editionMode, setEditionMode] = useState(false)

	const handleChange = (event) => {

        console.log(event.target.value)
		console.log("hola")
		console.log("El campo de texto en el que estás escribiendo es:", event.target.name)

		setNewComment({
			...newComment,
			id: nanoid(),
		 	[event.target.name]: event.target.value
		})

	}

    const handleSubmit = (event) => {
		
		event.preventDefault()

		if(!newComment.subject || !newComment.comment || !newComment.author) {
			setError("Existe un campo vacío. Por favor, verifica nuevamente.")
			return
		}


		setList([
			...list,
			newComment
		])

		setNewComment({
			subject: "",
			comment: "",
			author: ""
		})

		setError("")

	}

    const deleteComment = (id) => {

		console.log(id)

		const filteredComments = list.filter((item) => {
			return item.id !== id
		})

		return setList(filteredComments)
		
	}

	const editComment = (element) => {
		setEditionMode(true)
		setNewComment({
			id: element.id,
			subject: element.subject,
			comment: element.comment,
			author: element.author
		})

		setId(element.id)

	}

    const handleSubmitEdit = (event) => {

		event.preventDefault()

		const filteredArray = list.map((item)=>{
			return item.id === id ? {
				id: id,
				subject: newComment.subject,
				comment: newComment.comment,
				author: newComment.author
			} : item
		})

        console.log(filteredArray)

		setList(filteredArray)

		setEditionMode(false)

		setNewComment({
			subject:"",
			comment:"",
			author:""
		})
    }

  return (
    <div>
        <h1>Seccion de comentarios</h1>

        <div className={editionMode ? "max-w-5xl mx-auto px-6 pb-6 bg-red-100" : "" }>

        <form onSubmit={
					editionMode ?
						(evt) => {handleSubmitEdit(evt)}
						:
						(evt) => { handleSubmit(evt) } 
					}
				>

                    <label htmlFor="subject">Subject</label>
                    <input
                        name="subject"
                        value={newComment.subject}
                        onChange={ evt => { handleChange(evt)} }
                        className={"border shadow-sm mt-2 rounded-md border-gray-200 block w-full focus: border-blue"}
                    />

                    <label htmlFor="comment">Comment</label>
                    <input
                        name="comment"
                        value={newComment.comment}
                        onChange={ evt => { handleChange(evt)} }
                        className={"border shadow-sm mt-2 rounded-md border-gray-200 block w-full focus: border-blue"}
                    />

                    <label htmlFor="author">Author</label>
                    <input
                        name="author"
                        value={newComment.author}
                        onChange={ evt => { handleChange(evt)} }
                        className={"border shadow-sm mt-2 rounded-md border-gray-200 block w-full focus: border-blue"}
                    />

                    {
                        editionMode ?
                        <button type="submit">Editar comentario</button>
                        :
                        <button type="submit">Crear comentario</button>

                    }

                    <p>{ error }</p>

                </form>

        </div>

   
        <h1>Listado de comentarios</h1>

        {
        list.length === 0 ? 
            <p>No hay publicaciones</p> 
            :
            list.map((elt, index) => {
                return (
                    <div className="mb-4 bg-blue-600 text-white" key={index}>
                        <h3>{elt.subject}</h3>
                        <span>Escrito por: {elt.author}</span>
                        <p>{elt.comment}</p>
                        <button
                        onClick={() => editComment(elt)} >
                            Editar
                            </button>
                        <button
                        onClick={() => { deleteComment(elt.id) }}>
                            Borrar
                            </button>
                    </div>
                )
            })
        }

    </div>
  )
}