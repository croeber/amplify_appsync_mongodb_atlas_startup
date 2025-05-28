import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import '@aws-amplify/ui-react/styles.css';

const client = generateClient<Schema>();

function App() {
  // type Todo = Schema["addTodo"]['returnType']['todo'];
  type Todo = any;
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const { data } = await client.queries.listUsers();

    if (data?.statusCode === "200")
          setTodos(data.body!)
    else
      alert("Failed to load Todos");

  }

  useEffect(() => { fetchTodos() }, []);


  const createTodo = async() => {
    const itemContent = window.prompt("Todo content");
    if (!itemContent) return;

    const res = await client.mutations.createUser({ duz: '100000032', vista: 'DEVMIAVREDV04', permissions: []});
    if (res.data?.statusCode != "200")
      alert("Failed to create todo");
    
    fetchTodos()
  }

  const updateTodo = async(todo: Todo) => { 
  }

  async function deleteTodo(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) { 
  }

  return (
      <main>
        <h1>My todos</h1>
        <button onClick={createTodo}>+ new</button>
        <ul>
          {todos.map((todo) => {
            if (!todo) return null;
            return (
              <li onClick={() => updateTodo(todo)} key={todo._id}> 
                <button onClick={(event) => deleteTodo(event, todo._id)}>x</button> {todo.content}
              </li>
              
            )
          })}
        </ul>
        <div>
          🥳 App successfully hosted. Try creating a new todo.
          <br />
          <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
            Review next step of this tutorial.
          </a>
        </div>
      </main>
  );
}

export default App;
