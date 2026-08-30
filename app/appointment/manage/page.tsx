import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import AppointmentManager from "./AppointmentManager";

export const metadata: Metadata = {
  title: "Manage Appointment | Eternity Mechanical Services",
  description: "Securely view, reschedule or cancel an Eternity Mechanical Services appointment.",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
  openGraph: { images: [] },
  twitter: { images: [] },
};

export default function ManageAppointmentPage() {
  return <main>
    <SiteHeader />
    <section className="appointment-manage-shell">
      <div className="appointment-manage-intro">
        <p className="eyebrow"><i /> Secure appointment access</p>
        <h1>Manage your residential diagnostic appointment.</h1>
        <p>Review the confirmed arrival window, choose another available time or cancel the visit. Changes update Eternity Dispatch immediately.</p>
      </div>
      <AppointmentManager />
    </section>
    <SiteFooter />
  </main>;
}
