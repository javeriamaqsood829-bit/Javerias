# Security Specification & Threat Model

## 1. Data Invariants
1. Contact Messages (`/messages/{messageId}`):
   - Anonymous/public users can create new message submissions.
   - Public users can NEVER read, list, update, or delete messages (prevents PII leakage of inquiries, emails, and client phone numbers).
   - Only authenticated Admin users (e.g. j88125859@gmail.com or users present in `/admins/{uid}`) can read, list, update status, or delete messages.
2. Portfolio Content Collections (`projects`, `services`, `skills`, `experience`, `testimonials`, `process`, `results`, `siteSettings`, `hero`, `about`, `education`, `certifications`, `socialLinks`, `pageSections`, `seo`, `media`):
   - Public users can only read content (and for projects/services/etc., only published content or public read of portfolio).
   - ONLY authenticated Admin users can create, update, or delete portfolio content.
3. Admin Registry (`/admins/{adminId}`):
   - Read/write access strictly restricted to authenticated administrators.
   - Bootstrapped admin email `j88125859@gmail.com` is granted administrative rights.

## 2. The "Dirty Dozen" Threat Scenarios
1. Unauthenticated reading of the `/messages` collection to harvest client lead emails.
2. Public tampering or deletion of published `/projects` documents.
3. Privilege escalation by creating an unauthorized document in `/admins/{attackerUid}`.
4. Non-admin update of `/siteSettings` to inject malicious redirect URLs or deface the brand.
5. Injected oversized payload (>100KB) into contact message form to create denial of wallet.
6. Malicious client modifying message `status` or deleting lead data.
7. Spoofed email claiming to be admin without verified token.
8. Updating another user's profile or admin documents.
9. Modifying immutable timestamps like `createdAt` during an update.
10. Creating a project without required fields (`title`, `slug`).
11. Attempting to bypass field validation using unknown shadow keys.
12. Listing unverified contact records.
