import { useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
	const [todo, setTodo] = useState("");

	const [todos, setTodos] = useState([]);

  const [showFinished, setShowFinished] = useState(true);

	const saveLS = () => {
		localStorage.setItem("todos", JSON.stringify(todos));
	};

	useEffect(() => {
		let todostring = localStorage.getItem("todos");
		if (todostring) {
			let todos = JSON.parse(localStorage.getItem("todos"));
			setTodos(todos);
		}
	}, []);

	const handleEdit = (e, id) => {
		let newTodos = todos.filter((item) => {
			return item.id != id;
		});
		let editTodo = todos.filter((item) => {
			return item.id === id;
		});

		setTodo(editTodo[0].todo);
		setTodos(newTodos);
		saveLS();
	};
	const handleDelete = (e, id) => {
		let newTodos = todos.filter((item) => {
			return item.id != id;
		});
		setTodos(newTodos);
		saveLS();
	};
	const handleAdd = () => {
    if(todo){

      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    }
		setTodo("");
		saveLS();
	};

	const handleCheck = (e) => {
		let id = e.target.name;
		let index = todos.findIndex((item) => {
			return item.id == id;
		});
		let newTodos = [...todos];
		newTodos[index].isCompleted = !newTodos[index].isCompleted;
		setTodos(newTodos);
		saveLS();
	};

	const handleChange = (e) => {
    setTodo(e.target.value);
	};

  const toggleFinish=()=>{
    setShowFinished(!showFinished);
    if(showFinished){

    }
  }

	return (
		<>
			<Navbar />
			<div className="container mx-auto my-5 rounded-xl p-5 bg-violet-200 w-1/2 min-h-[80vh]">
				<div className="addTodo">
					<h2 className="text-lg font-bold">Add a Todo</h2>
					<input
						type="text"
						onChange={handleChange}
						value={todo}
						className="w-80"
					/>
					<button
            disabled={todo.length<3}
						onClick={handleAdd}
						className="bg-blue-400  disabled:bg-slate-500   hover:bg-blue-950 p-2 py-1 text-white rounded-md m-5"
					>
						Add
					</button>
				</div>
        <div className="flex gap-1">

        <input type="checkbox" onClick={toggleFinish} defaultChecked={showFinished} name="" id="" />Show finished
        </div>
				<h1 className="text-lg font-bold">Your Todos</h1>
				<div className="todos">
					{todos.length === 0 && (
						<div className="font-semibold">Nothing To Do</div>
					)}
					{todos.map((item) => {
						return (showFinished||!item.isCompleted) && (
							<div
								key={item.todo}
								className="todo flex w-11/12 justify-between my-3"
							>
								<div className="flex gap-2  w-3/4">
									<input
										name={item.id}
										type="checkbox"
										onChange={handleCheck}
                   defaultChecked={item.isCompleted}
									/>
									<div className={item.isCompleted ? "line-through break-words w-3/4 " : "break-words w-3/4"}>
										{item.todo}
									</div>
								</div>
								<div className="buttons flex h-full">
									<button
										onClick={(e) => {
											handleEdit(e, item.id);
										}}
										className="bg-blue-400 hover:bg-blue-700 p-2 py-1 text-sm text-white rounded-md mx-1"
									>
						
                    <FaEdit/>
									</button>
									<button
										onClick={(e) => {
											handleDelete(e, item.id);
										}}
										className="bg-blue-400 hover:bg-blue-700 p-2 py-1 text-sm  text-white rounded-md mx-1"
									>
										<MdDelete />
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default App;
