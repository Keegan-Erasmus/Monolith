import dbPool from "@db/client";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function ReviewConcept({ params }: Props) {
  const conceptId = params.id;

  const [rows]: any[] = await dbPool.execute(
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

  const concept = rows[0];
  if (!concept) return notFound();

  return (
    <div className="container mt-5 text-white">
      <h1>Review: {concept.name}</h1>
      <p><strong>Page:</strong> {concept.page}</p>
      <p><strong>Book:</strong> {concept.book}</p>
      <p><strong>Palace:</strong> {concept.palace || "—"}</p>
      <p><strong>Repetition:</strong> {concept.repetition || "—"}</p>
      <p><strong>Revision Date:</strong> {concept.revision ? new Date(concept.revision).toLocaleDateString() : "—"}</p>
    </div>
  );
}
