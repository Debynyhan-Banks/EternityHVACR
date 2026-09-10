import { env } from "cloudflare:workers";

export const RETENTION_DAYS = 30;
export const RETENTION_MS = RETENTION_DAYS * 24 * 60 * 60 * 1000;

type RuntimeBindings = {
  DB: D1Database;
  UPLOADS: R2Bucket;
};

export function getSecondOpinionBindings(): RuntimeBindings {
  const bindings = env as unknown as Partial<RuntimeBindings>;
  if (!bindings.DB || !bindings.UPLOADS) throw new Error("Second-opinion storage is unavailable.");
  return bindings as RuntimeBindings;
}

export async function purgeExpiredSecondOpinions(limit = 25) {
  const { DB, UPLOADS } = getSecondOpinionBindings();
  const now = Date.now();
  const expired = await DB.prepare(
    "SELECT object_key FROM second_opinion_files WHERE expires_at <= ? ORDER BY expires_at ASC LIMIT ?",
  ).bind(now, limit).all<{ object_key: string }>();

  if (expired.results.length) {
    await Promise.all(expired.results.map((row) => UPLOADS.delete(row.object_key)));
  }

  await DB.batch([
    DB.prepare("DELETE FROM second_opinion_files WHERE expires_at <= ?").bind(now),
    DB.prepare("DELETE FROM second_opinion_submissions WHERE expires_at <= ?").bind(now),
  ]);
}
