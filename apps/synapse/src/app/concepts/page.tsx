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

  const concepts = rows as any[];

  return (
    <div className="container mt-5 mb-5 text-white">
      <h1 className="mb-4">Concepts</h1>

      {/* Desktop Table */}
      <div className="table-responsive d-none d-md-block">
        <table className="table table-dark table-striped table-bordered align-middle text-nowrap">
          <thead className="table-secondary text-dark">
            <tr>
              <th>ID</th>
              <th>Concept</th>
              <th>Page</th>
              <th>Book</th>
              <th>Palace</th>
              <th>Repetition</th>
              <th>Revision Date</th>
              <th>Created</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {concepts.map((concept, i) => (
              <tr key={i}>
                <td>{concept["ID"]}</td>
                <td>{concept["Concept"]}</td>
                <td>{concept["Page Number"]}</td>
                <td>{concept["Book"]}</td>
                <td>{concept["Palace"]}</td>
                <td>{concept["Repitition"]}</td>
                <td>
                  {concept["Revision Date"]
                    ? new Date(concept["Revision Date"]).toLocaleDateString()
                    : "—"}
                </td>
                <td>
                  {concept["Date Created"]
                    ? new Date(concept["Date Created"]).toLocaleDateString()
                    : "—"}
                </td>
                <td>
                  <Link
                    href={`/concepts/${concept["ID"]}/review`}
                    className="btn btn-sm btn-primary"
                  >
                    Review
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="d-block d-md-none">
        {concepts.map((concept, i) => (
          <div key={i} className="card bg-dark text-white mb-3 border-light">
            <div className="card-body">
              <h5 className="card-title mb-2">{concept["Concept"]}</h5>
              <p className="card-text mb-1"><strong>Page:</strong> {concept["Page Number"]}</p>
              <p className="card-text mb-1"><strong>Book:</strong> {concept["Book"]}</p>
              <p className="card-text mb-1"><strong>Palace:</strong> {concept["Palace"]}</p>
              <p className="card-text mb-1"><strong>Repetition:</strong> {concept["Repitition"]}</p>
              <p className="card-text mb-1">
                <strong>Revision:</strong> {concept["Revision Date"]
                  ? new Date(concept["Revision Date"]).toLocaleDateString()
                  : "—"}
              </p>
              <p className="card-text mb-3">
                <strong>Created:</strong> {concept["Date Created"]
                  ? new Date(concept["Date Created"]).toLocaleDateString()
                  : "—"}
              </p>
              <Link
                href={`/concepts/${concept["ID"]}/review`}
                className="btn btn-sm btn-outline-primary"
              >
                Review
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
