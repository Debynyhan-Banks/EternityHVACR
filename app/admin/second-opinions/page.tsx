import Link from "next/link";
import { redirect } from "next/navigation";
import { chatGPTSignInPath, chatGPTSignOutPath } from "../../chatgpt-auth";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { requireSecondOpinionAdmin } from "../../lib/secondOpinionAdmin";
import { getSecondOpinionBindings, purgeExpiredSecondOpinions } from "../../lib/secondOpinionStorage";

export const dynamic = "force-dynamic";
export const metadata = { title: "Second-opinion reviews | Eternity admin", robots: { index: false, follow: false } };

type SubmissionRow = {
  id: string; reference: string; name: string; email: string; phone: string; zip: string; service: string;
  details: string; status: string; created_at: number; expires_at: number;
};
type FileRow = { id: string; submission_id: string; file_name: string; content_type: string; size_bytes: number };

export default async function SecondOpinionAdminPage() {
  const access = await requireSecondOpinionAdmin();
  if (!access.ok && access.status === 401) redirect(chatGPTSignInPath("/admin/second-opinions"));

  if (!access.ok) {
    return <main><SiteHeader /><section className="admin-access"><p className="kicker">Restricted workspace</p><h1>Owner/admin access is required.</h1><p>The signed-in account is not on Eternity&apos;s approved upload-review list.</p><Link className="btn-outline" href={chatGPTSignOutPath("/admin/second-opinions")}>Use another account</Link></section><SiteFooter /></main>;
  }

  const { DB } = getSecondOpinionBindings();
  await purgeExpiredSecondOpinions();
  const [submissions, files] = await Promise.all([
    DB.prepare("SELECT id, reference, name, email, phone, zip, service, details, status, created_at, expires_at FROM second_opinion_submissions WHERE expires_at > (unixepoch() * 1000) ORDER BY created_at DESC LIMIT 100").all<SubmissionRow>(),
    DB.prepare("SELECT id, submission_id, file_name, content_type, size_bytes FROM second_opinion_files WHERE expires_at > (unixepoch() * 1000) ORDER BY created_at ASC").all<FileRow>(),
  ]);
  const filesBySubmission = new Map<string, FileRow[]>();
  for (const file of files.results) filesBySubmission.set(file.submission_id, [...(filesBySubmission.get(file.submission_id) ?? []), file]);

  return (
    <main>
      <SiteHeader />
      <section className="admin-hero"><div><p className="eyebrow"><i /> Owner/admin workspace</p><h1>Second-opinion reviews</h1><p>Private customer uploads currently inside the 30-day review window.</p></div><div><span>Signed in as</span><strong>{access.user.email}</strong><Link href={chatGPTSignOutPath("/")}>Sign out</Link></div></section>
      <section className="admin-submissions">
        {submissions.results.length === 0 ? <div className="admin-empty"><h2>No active uploads</h2><p>New second-opinion submissions will appear here until their 30-day expiration.</p></div> : submissions.results.map((submission) => (
          <article key={submission.id} className="admin-submission">
            <header><div><span>Reference {submission.reference}</span><h2>{submission.service}</h2></div><strong>{new Date(submission.created_at).toLocaleDateString("en-US", { timeZone: "America/New_York", month: "short", day: "numeric", year: "numeric" })}</strong></header>
            <dl><div><dt>Customer</dt><dd>{submission.name}</dd></div><div><dt>Phone</dt><dd><a href={`tel:${submission.phone}`}>{submission.phone}</a></dd></div><div><dt>Email</dt><dd><a href={`mailto:${submission.email}`}>{submission.email}</a></dd></div><div><dt>ZIP</dt><dd>{submission.zip}</dd></div></dl>
            <div className="admin-details"><strong>Review request</strong><p>{submission.details}</p></div>
            <div className="admin-files">{(filesBySubmission.get(submission.id) ?? []).map((file) => <a key={file.id} href={`/api/admin/second-opinions/${file.id}`}>Download {file.file_name} <span>{(file.size_bytes / 1024 / 1024).toFixed(1)} MB</span></a>)}</div>
            <small>Expires {new Date(submission.expires_at).toLocaleDateString("en-US", { timeZone: "America/New_York", month: "short", day: "numeric", year: "numeric" })}</small>
          </article>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
