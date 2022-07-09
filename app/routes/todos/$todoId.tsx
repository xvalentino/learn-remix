import type { ActionFunction } from "@remix-run/node";
import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({ params }) =>
  await db.todo.delete({ where: { id: params.todoId } });
