import { requireSecondOpinionAdmin } from "../../../../lib/secondOpinionAdmin";
import { getSecondOpinionBindings, purgeExpiredSecondOpinions } from "../../../../lib/secondOpinionStorage";

export async function GET(_request: Request, context: { params: Promise<{ fileId: string }> }) {
  const access = await requireSecondOpinionAdmin();
  if (!access.ok) return Response.json({ error: access.status === 401 ? "Sign in required." : "Admin access required." }, { status: access.status });

  const { fileId } = await context.params;
  const { DB, UPLOADS } = getSecondOpinionBindings();
  await purgeExpiredSecondOpinions();
  const row = await DB.prepare("SELECT object_key, file_name, content_type FROM second_opinion_files WHERE id = ? AND expires_at > ?").bind(fileId, Date.now()).first<{ object_key: string; file_name: string; content_type: string }>();
  if (!row) return Response.json({ error: "File not found or expired." }, { status: 404 });

  const object = await UPLOADS.get(row.object_key);
  if (!object) return Response.json({ error: "File not found." }, { status: 404 });
  const fileName = row.file_name.replace(/["\\\r\n]/g, "");
  return new Response(object.body, { headers: { "Content-Type": row.content_type, "Content-Disposition": `attachment; filename="${fileName}"`, "Cache-Control": "private, no-store, max-age=0", "X-Content-Type-Options": "nosniff" } });
}
