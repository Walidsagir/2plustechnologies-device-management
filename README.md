# 2plus Technologies Device Management

2plus is a device-management platform for enrolling devices, assigning operational responsibility, and monitoring device status across an organization. The web client is built with React, with a FastAPI backend and SQLAlchemy persistence planned for the service layer.

## Roles

- **Super admin:** Manages the organization, users, role assignments, and platform-wide device records.
- **Aggregator:** Oversees assigned agents and their devices, with enrollment totals rolled up across the aggregator's scope.
- **Agent:** Enrolls and manages devices within their assigned scope and can review their own enrollment totals.
- **Technician:** Handles assigned device support and maintenance work, and updates service status and notes.

Access to devices and reporting should be scoped to the signed-in user's role and assigned organization, aggregator, or agent.

## Device Monitoring and Enrollment Reporting

The monitoring view is intended to show device inventory and operational status, including enrollment state, last-seen activity, and service status. Summary reporting should include:

- Total enrolled devices per aggregator, including their agents' enrollments.
- Total enrolled devices per agent.
- Enrollment and status breakdowns for authorized scopes.

Enrollment totals should be computed from persisted device records and filtered by the user's access scope, rather than maintained as manually updated counters.

## Technology

- **Frontend:** React with Vite.
- **API:** FastAPI, providing authenticated endpoints for users, roles, devices, monitoring, and enrollment summaries.
- **Persistence:** SQLAlchemy ORM for database models, queries, and transactions.

The repository currently contains the React/Vite frontend shell. The FastAPI service, database models, authentication, monitoring workflows, and enrollment reports remain to be implemented.

## Frontend Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Run the frontend checks:

```bash
npm run lint
npm run build
```
