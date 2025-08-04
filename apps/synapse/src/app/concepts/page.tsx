import dbPool from "@db/client";
import Link from "next/link";

export default async function ConceptsPage() {
  const [rows] = await dbPool.execute(`
    SELECT 
      con_id AS 'ID',
      con_date_created AS 'Date Created',
      con_name AS 'Concept',
      con_page_number AS 'Page Number',
      bks_name AS 'Book',
      IFNULL(pal_name, 'None') AS 'Palace',
      rgs_name AS 'Repitition',
      con_revision_date AS 'Revision Date'
    FROM mem_concepts
    LEFT JOIN mem_books ON con_ref_book = bks_id
    LEFT JOIN mem_palaces ON con_ref_palace = pal_id
    LEFT JOIN mem_repitition_groups ON con_ref_repitition_group = rgs_id
    WHERE con_is_archived = 0
  `);

return (
  <div className="container mt-5 text-white
  ">
    <h1>Concepts</h1>
    <table className="table table-dark table-striped table-bordered">
      <thead>
        <tr>
          <th>Concept</th>
          <th>Page Number</th>
          <th>Book</th>
          <th>Palace</th>
          <th>Repetition</th>
          <th>Revision Date</th>
          <th>Date Created</th>
          <th>Review</th>
        </tr>
      </thead>
      <tbody>
        {(rows as any[]).map((concept, i) => (
          <tr key={i}>
            <td>{concept["Concept"]}</td>
            <td>{concept["Page Number"]}</td>
            <td>{concept["Book"]}</td>
            <td>{concept["Palace"]}</td>
            <td>{concept["Repitition"]}</td>
            <td>{concept["Revision Date"] ? new Date(concept["Revision Date"]).toLocaleDateString() : "—"}</td>
            <td>{concept["Date Created"] ? new Date(concept["Date Created"]).toLocaleDateString() : "—"}</td>
            <td><Link href={`/concepts/${concept["ID"]}/review`} className="btn btn-primary btn-sm">View</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

}
