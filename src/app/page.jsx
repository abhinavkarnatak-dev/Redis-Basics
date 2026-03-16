import Link from "next/link";
import { client } from "@/lib/db";

const getBooks = async () => {
  const result = await client.zRangeWithScores("books", 0, -1);

  // pipelines
  const books = await Promise.all(
    result.map((b) => {
      return client.hGetAll(`books:${b.score}`);
    }),
  );

  return books;
};

export default async function Home() {
  const books = await getBooks();
  return (
    <main>
      <nav className="flex justify-between">
        <h1 className="font-bold">Books on Redis!</h1>
        <Link href="/create" className="btn">
          Add a new book
        </Link>
      </nav>

      {books.map((book) => (
        <div key={book.title} className="card">
          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
          <p>Rating: {book.rating}</p>
          <p>Blurb: {book.blurb}</p>
        </div>
      ))}
    </main>
  );
}