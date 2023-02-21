# Homster
Fullstack game library app written in TypeScript & GraphQL that let you buy and browse games and engage in many communities in similar way like Steam.


# Usage
## Development setup
In order to follow **exact** setup guide you need Docker and Docker Compose installed, however this is not required to run the application.

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
    - [ ] Users
    - [ ] Games
    - [ ] Studio
    - [ ] Tags
    - [ ] Genres
    - [X] Dealing with file uploading
    - [ ] Tests
        - [ ] Unit
        - [ ] E2E
- [ ] DevOps
    - [ ] GitHub Actions
- [ ] UI & UX
    - [X] Navbar & Themes
    - [ ] Landing page
    - [X] Auth Pages
        - [X] Login & Register page
    - [ ] Store pages
        - [ ] Home
        - [ ] Wishlist
        - [ ] News
        - [ ] About


## Tech stack
- Backend:
    - Nest.js (Fastify)
    - PostgreSQL (Prisma)
    - GraphQL (Mercurius)
- Frontend
    - Next.js
    - Tailwind & DaisyUI
    - GraphQL (Urql)

## License
[MIT](https://choosealicense.com/licenses/mit/)
