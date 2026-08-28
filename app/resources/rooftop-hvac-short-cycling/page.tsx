import type { Metadata } from "next";
import AnswerArticle from "../../components/AnswerArticle";
import { getExpertAnswer } from "../../data/answers";

const answer = getExpertAnswer("rooftop-hvac-short-cycling");
export const metadata: Metadata = { title: `${answer.question} | Eternity Mechanical`, description: answer.description, alternates: { canonical: `/resources/${answer.slug}` }, openGraph: { title: answer.question, description: answer.description, url: `/resources/${answer.slug}`, type: "article", images: [] }, twitter: { card: "summary", title: answer.question, description: answer.description, images: [] } };
export default function Page() { return <AnswerArticle answer={answer} />; }
