import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getTodos().map((todo) => {
      return db.todo.create({ data: todo });
    })
  );
}

seed();

function getTodos() {
  return [
    {
      name: "Road worker",
    },
    {
      name: "Frisbee",
    },
    {
      name: "Trees",
    },
    {
      name: "Skeletons",
    },
    {
      name: "Hippos",
    },
    {
      name: "Dinner",
    },
    {
      name: "Elevator",
    },
  ];
}
