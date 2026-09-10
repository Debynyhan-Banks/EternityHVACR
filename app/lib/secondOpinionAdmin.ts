import { getChatGPTUser } from "../chatgpt-auth";

export async function requireSecondOpinionAdmin() {
  const user = await getChatGPTUser();
  if (!user) return { ok: false as const, status: 401, user: null };

  const approved = new Set(
    (process.env.SECOND_OPINION_ADMIN_EMAILS ?? "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );

  if (!approved.has(user.email.toLowerCase())) {
    return { ok: false as const, status: 403, user };
  }

  return { ok: true as const, status: 200, user };
}
