import dbPool from "@db/client";

export default async function NewConceptPage() {
  const [books] = await dbPool.execute("SELECT bks_id, bks_name FROM mem_books");
  const [palaces] = await dbPool.execute("SELECT pal_id, pal_name FROM mem_palaces");
  const [groups] = await dbPool.execute("SELECT rgs_id, rgs_name FROM mem_repitition_groups");

  return (
    <div className="container mt-5 text-white">
      <h1>Create New Concept</h1>
      <form action="/api/concepts" method="POST">
        <div className="mb-3">
          <label className="form-label">Concept Name</label>
          <input type="text" name="concept" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Page Number</label>
          <input type="number" name="page_number" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Book</label>
          <select name="book" className="form-select" required>
            <option value="">Select a book</option>
            {(books as any[]).map((book) => (
              <option key={book.bks_id} value={book.bks_id}>
                {book.bks_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Palace</label>
          <select name="palace" className="form-select">
            <option value="">None</option>
            {(palaces as any[]).map((palace) => (
              <option key={palace.pal_id} value={palace.pal_id}>
                {palace.pal_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Repetition Group</label>
          <select name="repetition" className="form-select">
            <option value="">None</option>
            {(groups as any[]).map((group) => (
              <option key={group.rgs_id} value={group.rgs_id}>
                {group.rgs_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
            <label className="form-label">First Revision Date</label>
            <input type="date" name="revision_date" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Save Concept</button>
      </form>
    </div>
  );
}
