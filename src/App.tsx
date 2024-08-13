import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from '@aws-amplify/ui-react';

// Generate the client using the Schema type
const client = generateClient<Schema>();

function App() {
  // Define the type for Todo
  type Todo = Schema["getTodo"]['returnType'];

  // State to store the todos
  const [todos, setTodos] = useState<Todo[]>([]);

  // Fetch todos from the server
  const fetchTodos = async () => {
    const { data: todos, errors} = await client.queries.listTodo();
    if (errors) {
      console.log("Error: ", errors);
      return [];
    } else {
      setTodos(todos ?? [])
    }
  }

  // Fetch todos on component mount
  useEffect(() => { 
    fetchTodos();
  }, []);

  // Create a new todo
  const createTodo = async() => {
    const itemContent = window.prompt("Todo content");
    if (!itemContent) return;

    await client.mutations.addTodo({ content: itemContent});
    fetchTodos();
  }

  // Update a todo
  const updateTodo = async(todo: Todo) => {
    if (!todo) return;

    const itemContent = window.prompt("Todo content", todo?.content);
    if (!itemContent) return;
    
    const updatedTodo:Todo = {...todo, content: itemContent };

    await client.mutations.updateTodo({...updatedTodo});
    fetchTodos();
  }

  // Delete a todo
  async function deleteTodo(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) {
    e.stopPropagation();
    await client.mutations.deleteTodo({ id });
    fetchTodos();
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          {/* Display the username */}
          <h1>Hello {user?.username}</h1>
          {/* Sign out button */}
          <button onClick={signOut}>Sign out</button>
          {/* Heading for todos */}
          <h1>My todos</h1>
          {/* Create new todo button */}
          <button onClick={createTodo}>+ new</button>
          <ul>
            {/* Render todos */}
            {todos.map((todo) => {
              if (!todo) return null;
              return (
                <li onClick={() => updateTodo(todo)} key={todo._id}> 
                  {/* Delete todo button */}
                  <button onClick={(event) => deleteTodo(event, todo._id)}>x</button> {todo.content}
                </li>
              )
            })}
          </ul>
          <div>
            {/* Success message */}
            🥳 App successfully hosted. Try creating a new todo.
            <br />
            {/* Link to the next step of the tutorial */}
            <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
              Review next step of this tutorial.
            </a>
          </div>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
