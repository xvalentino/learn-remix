import { Form } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

type Loaded = { todos?: { name: string }[] };

export const loader: LoaderFunction = async () =>
  json<Loaded>({ todos: [{ name: "wow" }] });

export default function Index() {
  const { todos } = useLoaderData<Loaded>();
  return (
    <div>
      <h1 className="text-xl">Super todo</h1>
      <Form action="/todos" method="post">
        <label>
          Name
          <input name="name" type="text"></input>
        </label>
        <button>Add</button>
      </Form>
      <ul>
        {todos?.map((todo: { name: string }) => (
          <div key={todo.name}>{todo.name}</div>
        ))}
      </ul>
    </div>
  );
}
