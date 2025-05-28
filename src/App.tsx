import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import '@aws-amplify/ui-react/styles.css';

const client = generateClient<Schema>();

function App() {
  // type Todo = Schema["addTodo"]['returnType']['todo'];
  type User = any;
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const { data } = await client.queries.listUsers({
      headers:{
        'Authorization': 'da2-gyri722x5fbebmaotuimqxtjai',
      }
    });

    if (data?.statusCode === "200")
      setUsers(data.body!)
    else
      alert("Failed to load Todos");

  }

  useEffect(() => { fetchUsers() }, []);


  const createTodo = async() => {
    const itemContent = window.prompt("Todo content");
    if (!itemContent) return;

    const res = await client.mutations.createUser({ duz: '100000032', vista: 'DEVMIAVREDV04', permissions: []});
    if (res.data?.statusCode != "200")
      alert("Failed to create");
    
    fetchUsers()
  }

  return (
      <main>
        <h1>My todos</h1>
        <button onClick={createTodo}>+ new</button>
        <ul>
          {users.map((item) => {
            if (!item) return null;
            return (
              <li key={item._id}> 
                {item.duz}
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
