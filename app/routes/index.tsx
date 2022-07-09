import { Form } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";
import type { Todo } from "@prisma/client";

type Loaded = { todos?: Todo[] };

export const loader: LoaderFunction = async () =>
  json({ todos: await db.todo.findMany() });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name");
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (typeof name !== "string") {
    throw new Error(`Form not submitted correctly.`);
  }

  const fields = { name };

  await db.todo.create({ data: fields });
  return redirect(`/`);
};

export default function Index() {
  const { todos } = useLoaderData<Loaded>();
  return (
    <div>
      <h1 className="text-xl">Super todo</h1>
      <Form method="post">
        <label>
          Name
          <input name="name" type="text"></input>
        </label>
        <button>Add</button>
      </Form>
      <ul>
        {todos?.map(({ name, id }) => (
          <div key={id}>
            {name}
            <Form action={`/todos/${id}`} method="post">
              <button>🧨</button>
            </Form>
          </div>
        ))}
      </ul>
    </div>
  );
}
