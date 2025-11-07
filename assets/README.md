# Assets README — Deployment & security notes

This folder contains image placeholders and security & compliance recommendations.

## Security & compliance recommendations
- Use encrypted uploads for NDAs and sensitive documents (SFTP, HTTPS with TLS 1.2+).
- Apply role-based access controls and log access to uploaded files.
- Use a signed Data Processing Agreement (DPA) with any cloud service vendor that stores personal or commercial data.
- Retain consent logs for cookies and data subject requests; store timestamps and change history (localStorage is fine for site-level preference but log server-side for contractual engagements).
- For cross-border transfers, use Standard Contractual Clauses (SCCs) or rely on adequacy decisions where available.
- For production, consider enabling server-side encryption (SSE) and key management (KMS).
- Breach notification: have a clear playbook and notify supervisory authorities within statutory windows (LGPD/GDPR timelines apply).

## License
Images: use copyright-free imagery (Unsplash / Pexels / Pixabay) and keep attribution if required by source.
