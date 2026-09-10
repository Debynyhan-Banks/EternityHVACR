import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const secondOpinionSubmissions = sqliteTable("second_opinion_submissions", {
  id: text("id").primaryKey(),
  reference: text("reference").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  zip: text("zip").notNull(),
  service: text("service").notNull(),
  details: text("details").notNull(),
  status: text("status").notNull().default("submitted"),
  consentAt: integer("consent_at").notNull(),
  createdAt: integer("created_at").notNull(),
  expiresAt: integer("expires_at").notNull(),
}, (table) => [
  uniqueIndex("second_opinion_reference_idx").on(table.reference),
  index("second_opinion_expires_idx").on(table.expiresAt),
]);

export const secondOpinionFiles = sqliteTable("second_opinion_files", {
  id: text("id").primaryKey(),
  submissionId: text("submission_id").notNull().references(() => secondOpinionSubmissions.id, { onDelete: "cascade" }),
  objectKey: text("object_key").notNull(),
  fileName: text("file_name").notNull(),
  contentType: text("content_type").notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  createdAt: integer("created_at").notNull(),
  expiresAt: integer("expires_at").notNull(),
}, (table) => [
  uniqueIndex("second_opinion_object_key_idx").on(table.objectKey),
  index("second_opinion_files_submission_idx").on(table.submissionId),
  index("second_opinion_files_expires_idx").on(table.expiresAt),
]);
