# HandyHub frontend folder structure

Same layout as the PH Healthcare frontend. Names follow HandyHub roles: customer, technician, and admin.

| PH Healthcare | HandyHub |
|---|---|
| `public/clinic` | `public/services` — home and footer photos |
| `public/doctors` | `public/technicians` — portrait photos |
| `src/api/doctor.api.ts` | `src/api/technician.api.ts` |
| `src/api/contact.api.ts` | no contact API; `src/api/analytics.api.ts` instead |
| `(dashboard)/patient` | `(dashboard)/customer` → `/customer` |
| `(dashboard)/doctor` | `(dashboard)/technician` → `/technician` |
| journal page | not used |

`login.jpg` and `register.jpg` still belong in `public/` when you add those photos. The login page already reads `/login.jpg`.

```text
handyhub-fronted
├── public
│   ├── services
│   ├── technicians
│   └── logo.svg
├── src
│   ├── api
│   │   ├── auth.api.ts
│   │   ├── technician.api.ts
│   │   ├── appointment.api.ts
│   │   ├── schedule.api.ts
│   │   ├── user.api.ts
│   │   └── analytics.api.ts
│   ├── app
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── (public)
│   │   │   ├── (marketing)        home, technicians, about, help, contact
│   │   │   └── (authentication)   login, register, verify, apply, password reset
│   │   └── (dashboard)
│   │       ├── customer
│   │       ├── technician
│   │       ├── admin
│   │       └── change-password
│   ├── components
│   │   ├── auth
│   │   ├── dashboard
│   │   ├── form
│   │   ├── layout/public
│   │   ├── modules
│   │   ├── theme
│   │   └── ui
│   ├── hooks
│   ├── lib
│   ├── providers
│   ├── routes
│   ├── types
│   ├── utils
│   └── validation
├── Note
│   └── Folder_stacter.md
├── biome.json
├── components.json
├── next.config.ts
├── package.json
└── tsconfig.json
```

Put new UI in the matching folder. API calls go in `src/api`. Page sections go in `src/components/modules/<feature>`. Sidebar links go in `src/routes`.
