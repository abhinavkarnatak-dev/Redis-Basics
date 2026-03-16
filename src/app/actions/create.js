"use server";

import { client } from "@/lib/db";
import { redirect } from "next/navigation";

export async function createBook(formData) {
  const { title, rating, author, blurb } = Object.fromEntries(formData);

  const id = Math.floor(Math.random() * 100000);

  await client.hSet(`books:${id}`, {
    title,
    rating,
    author,
    blurb,
  });

  redirect("/");
}