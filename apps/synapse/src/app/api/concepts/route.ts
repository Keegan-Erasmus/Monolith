import { NextRequest, NextResponse } from "next/server";
import dbPool from "@db/client";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const concept = formData.get("concept");
  const pageNumber = formData.get("page_number");
  const book = formData.get("book");
  const palace = formData.get("palace");
  const repetition = formData.get("repetition");
  const revisionDate = formData.get("revision_date");


    await dbPool.execute(
    `INSERT INTO mem_concepts 
        (con_name, con_page_number, con_ref_book, con_ref_palace, con_ref_repitition_group, con_date_created, con_revision_date) 
    VALUES (?, ?, ?, ?, ?, NOW(), ?)`,
    [concept, pageNumber || null, book, palace || null, repetition || null, revisionDate || null]
    );

  return NextResponse.redirect(new URL("/concepts", req.url)); // go back to the list page
}
