# Homster
Fullstack game library app written in TypeScript & GraphQL that let you buy and browse games and engage in many communities in similar way like Steam.


# Usage
## Development setup
In order to follow **exact** setup guide you need Docker and Docker Compose installed, however this is not required to run the application.

Homster comes with database seeding script for development purposes. You can run it by either "prisma db seed" or directly by command in `api` directory:
```bash
ts-node --transpile-only ./database/seed.ts
```

###  0. Environmental variables
Create **``.env``** file in **``api``** root directory and fill with following:
```code
api.port=4000

web.origin=http://localhost:3000
web.production_origin='https://www.your-production-domain.com/'

cookie.secret='secret'
session.key1='random-hex1'
session.key2='random-hex2'

DATABASE_URL="postgresql://admin-user:admin-password@localhost:5432/homster-db?schema=public"
``` 
you can generate hex secrets **[here](https://seanwasere.com/generate-random-hex/)**

### 1. Backend
Go to **``api``** directory, install dependencies and run:
```code
nest start --watch
```

### 2. Frontend
Go to **``web``** directory, install dependencies and run 
```code
next dev
```

## Features & to do
- [ ] API:
    - [X] Auth
    - [X] Users
    - [X] Games
    - [X] Studio
    - [X] Tags
    - [X] Genres
    - [X] Dealing with file uploading
    - [ ] Tests
        - [ ] Unit
        - [ ] E2E
- [ ] DevOps
    - [ ] GitHub Actions
- [ ] UI & UX
    - [X] Navbar & Themes
    - [X] Landing page
    - [X] Auth Pages
        - [X] Login & Register page
    - [ ] Store pages
        - [X] Home
        - [ ] Wishlist
        - [ ] News
        - [X] Single game
    - [ ] Special pages
		- [X] User profile
        - [ ] Studio
        - [ ] Admin
        - [ ] Moderation


## Tech stack
- Backend:
    - Nest.js
    - PostgreSQL (Prisma)
    - GraphQL (Apollo)
- Frontend
    - Next.js
    - Tailwind & DaisyUI
    - GraphQL (Urql)

## License
[MIT](https://choosealicense.com/licenses/mit/)
