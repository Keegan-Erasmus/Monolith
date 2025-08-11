import dbPool from "@db/client";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

type Props = {
  params: { id: string };
};

export default async function ReviewConcept(props: Props) {
  const { id: conceptId } = await props.params;

  // Get concept data
  const [conceptRows]: any[] = await dbPool.execute(
    `SELECT 
      con_id AS id,
      con_name AS name,
      con_page_number AS page,
      con_revision_date AS revision,
      bks_name AS book,
      pal_name AS palace,
      rgs_name AS repetition
    FROM mem_concepts
    LEFT JOIN mem_books ON con_ref_book = bks_id
    LEFT JOIN mem_palaces ON con_ref_palace = pal_id
    LEFT JOIN mem_repitition_groups ON con_ref_repitition_group = rgs_id
    WHERE con_id = ?`,
    [conceptId]
  );

  const concept = conceptRows[0];
  if (!concept) return notFound();

  // Get repetition multipliers
  const [buttonRows]: any[] = await dbPool.execute(
    `SELECT 
      rmp_id AS id,
      rmp_name AS name,
      rmp_value AS multiplier,
      rmp_color
    FROM mem_concepts
    LEFT JOIN mem_repitition_groups ON con_ref_repitition_group = rgs_id
    LEFT JOIN mem_repitition_multipliers ON rmp_ref_repitition_group = rgs_id
    WHERE rmp_is_archived = 0 AND con_id = ?`,
    [conceptId]
  );

  async function handleReview(multiplierId: number, multiplierValue: number) {
    "use server";

    const conceptIdInt = parseInt(conceptId);

    // Update concept with new revision date
    await dbPool.execute(
      `UPDATE mem_concepts 
       SET con_revision_date = DATE_ADD(IF(DATE(con_revision_date) < DATE(NOW()),NOW(),con_revision_date), INTERVAL (
         DATEDIFF(con_revision_date, IFNULL((
           SELECT rev_date_created 
           FROM mem_revisions 
           WHERE rev_ref_concept = ? 
           ORDER BY rev_date_created DESC 
           LIMIT 1
         ), con_date_created)) * ?
       ) DAY)
       WHERE con_id = ?`,
      [conceptIdInt, multiplierValue, conceptIdInt]
    );

    // Insert revision
    await dbPool.execute(
      `INSERT INTO mem_revisions (rev_ref_concept, rev_ref_repitition_multiplier) VALUES (?, ?)`,
      [conceptIdInt, multiplierId]
    );

  
    // Refresh the page
    redirect('/concepts');
    
  }

  return (
    <div className="container mt-5 mb-5 text-white">
      <div className="card bg-light border-gray">
        <div className="card-body">
          <h3 className="card-title">Review: {concept.name}</h3>
          <p className="card-text"><strong>Page:</strong> {concept.page}</p>
          <p className="card-text"><strong>Book:</strong> {concept.book}</p>
          <p className="card-text"><strong>Palace:</strong> {concept.palace || "—"}</p>
          <p className="card-text"><strong>Repetition:</strong> {concept.repetition || "—"}</p>
          <p className="card-text"><strong>Revision Date:</strong> {concept.revision ? new Date(concept.revision).toLocaleDateString() : "—"}</p>

          <div className="mt-4 d-flex gap-2 flex-wrap">
            {buttonRows.map((btn: any) => (
              <form action={handleReview.bind(null, btn.id, btn.multiplier)} key={btn.id}>
                <button
                  type="submit"
                  className="btn"
                  style={{ backgroundColor: btn.rmp_color,
                    color: "#FFF"
                   }} 
                >
                  {btn.name}
                </button>
              </form>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
