import dbPool from "@db/client";
import Link from "next/link";

export default async function ConceptsPage() {
  const [rows] = await dbPool.execute(`
  WITH cte_revisions AS (
  SELECT
  dense_rank() OVER (partition BY rev_ref_concept order by rev_date_created ASC ) AS 'cte_rank'
  ,rmp_color AS 'cte_color'
  ,rev_ref_concept AS 'cte_concept'
  FROM mem_revisions
  LEFT JOIN mem_repitition_multipliers ON rev_ref_repitition_multiplier = rmp_id
  ORDER BY rev_date_created ASC 
  )
  SELECT 
  con_id AS 'ID',
  con_date_created AS 'Date Created',
  con_name AS 'Concept',
  con_page_number AS 'Page Number',
  bks_name AS 'Book',
  IFNULL(pal_name, 'None') AS 'Palace',
  rgs_name AS 'Repitition',
  con_revision_date AS 'Revision Date',
  rank_1.cte_color AS 'color_1',
  rank_2.cte_color AS 'color_2',
  rank_3.cte_color AS 'color_3',
  rank_4.cte_color AS 'color_4',
  rank_5.cte_color AS 'color_5'
  FROM mem_concepts
  LEFT JOIN mem_books ON con_ref_book = bks_id
  LEFT JOIN mem_palaces ON con_ref_palace = pal_id
  LEFT JOIN mem_repitition_groups ON con_ref_repitition_group = rgs_id
  LEFT JOIN cte_revisions AS rank_1 ON rank_1.cte_concept = con_id AND rank_1.cte_rank = 1
  LEFT JOIN cte_revisions AS rank_2 ON rank_2.cte_concept = con_id AND rank_2.cte_rank = 2
  LEFT JOIN cte_revisions AS rank_3 ON rank_3.cte_concept = con_id AND rank_3.cte_rank = 3
  LEFT JOIN cte_revisions AS rank_4 ON rank_4.cte_concept = con_id AND rank_4.cte_rank = 4
  LEFT JOIN cte_revisions AS rank_5 ON rank_5.cte_concept = con_id AND rank_5.cte_rank = 5
  WHERE con_is_archived = 0
  `);

  const concepts = rows as any[];

  return (
<div className="container mt-5 mb-5 text-white">
  <h1 className="mb-4">Concepts</h1>

  {/* Desktop Table */}
  <div className="table-responsive d-none d-md-block">
    <table className="table table-acive table-striped table-bordered align-middle text-nowrap">
      <thead className="table-secondary text-dark">
        <tr>
          <th>ID</th>
          <th>Concept</th>
          <th>Page</th>
          <th>Book</th>
          <th>Palace</th>
          <th>Repetition</th>
          <th>Revision Date</th>
          <th>Review</th>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>5</th>
        </tr>
      </thead>
      <tbody>
        {concepts.map((concept, i) => {
          const revisionDate = concept["Revision Date"] ? new Date(concept["Revision Date"]) : null;
          const isDue = revisionDate && revisionDate <= new Date();

          return (
            <tr key={i}>
              <td>{concept["ID"]}</td>
              <td>{concept["Concept"]}</td>
              <td>{concept["Page Number"]}</td>
              <td>{concept["Book"]}</td>
              <td>{concept["Palace"]}</td>
              <td>{concept["Repitition"]}</td>
              <td>{revisionDate ? revisionDate.toLocaleDateString() : "—"}</td>
              <td>
                <Link
                  href={`/concepts/${concept["ID"]}/review`}
                  className={`btn btn-sm ${isDue ? "btn-warning" : "btn-primary"}`}
                >
                  Review
                </Link>
              </td>
              <td style={{ backgroundColor: concept["color_1"] }}></td>
              <td style={{ backgroundColor: concept["color_2"] }}></td>
              <td style={{ backgroundColor: concept["color_3"] }}></td>
              <td style={{ backgroundColor: concept["color_4"] }}></td>
              <td style={{ backgroundColor: concept["color_5"] }}></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>

  {/* Mobile Cards */}
  <div className="d-block d-md-none">
    {concepts.map((concept, i) => {
      const revisionDate = concept["Revision Date"] ? new Date(concept["Revision Date"]) : null;
      const isDue = revisionDate && revisionDate <= new Date();

      return (
        <div key={i} className="card bg-dark text-white mb-3 border-light">
          <div className="card-body">
            <h5 className="card-title mb-2">{concept["Concept"]}</h5>
            <p className="card-text mb-1"><strong>Page:</strong> {concept["Page Number"]}</p>
            <p className="card-text mb-1"><strong>Book:</strong> {concept["Book"]}</p>
            <p className="card-text mb-1"><strong>Palace:</strong> {concept["Palace"]}</p>
            <p className="card-text mb-1"><strong>Repetition:</strong> {concept["Repitition"]}</p>
            <p className="card-text mb-1">
              <strong>Revision:</strong> {revisionDate ? revisionDate.toLocaleDateString() : "—"}
            </p>
            <p className="card-text mb-3">
              <strong>Created:</strong> {concept["Date Created"]
                ? new Date(concept["Date Created"]).toLocaleDateString()
                : "—"}
            </p>
            <Link
              href={`/concepts/${concept["ID"]}/review`}
              className={`btn btn-sm ${isDue ? "btn-warning" : "btn-outline-primary"}`}
            >
              Review
            </Link>
          </div>
        </div>
      );
    })}
  </div>
</div>

  );
}
