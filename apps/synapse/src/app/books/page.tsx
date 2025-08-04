import dbPool from "@db/client";


export default async function ConceptsPage() {
  const [rows] = await dbPool.execute("SELECT bks_name FROM mem_books where bks_is_archived = 0");

  return (
    <div className="container mt-5">
      <h1>Books</h1>
      <ul>
        {(rows as any[]).map((book, i) => (
          <li key={i}>{book.bks_name}</li>
        ))}
      </ul>
    </div>
  );
}