import type { Metadata } from "next";
import AnswerArticle from "../../components/AnswerArticle";
import { getExpertAnswer } from "../../data/answers";

const answer = getExpertAnswer("furnace-repair-vs-replacement");
export const metadata: Metadata = { title: `${answer.question} | Eternity Mechanical`, description: answer.description, alternates: { canonical: `/resources/${answer.slug}` }, openGraph: { title: answer.question, description: answer.description, url: `/resources/${answer.slug}`, type: "article", images: [answer.image] }, twitter: { card: "summary_large_image", title: answer.question, description: answer.description, images: [answer.image] } };
export default function Page() { return <AnswerArticle answer={answer} />; }
