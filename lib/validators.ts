/**
 * lib/validators.ts
 * Zod schemas for API route validation.
 */
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(80, 'Name must be at most 80 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message must be at most 2000 characters'),
  honeypot: z.string().max(0, 'Bot detected').optional(),
});

export type ContactFormInput = z.infer<typeof contactSchema>;

export const githubStatsQuerySchema = z.object({
  repo: z.string().regex(/^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/, 'Invalid repo format. Expected: owner/name'),
});
