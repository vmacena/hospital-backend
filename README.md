## Test

- `localhost:8080/test`: Route for the test endpoint.

## Register Admin
- `localhost:8080/register/admin`: Route for registering an admin.

- `json: ` {
  "record": "00"
}

## Login Admin
- `localhost:8080/login/admin`: Route for logging in as an admin.

- `json: ` {
  "record": "00"
}

## Prisma

- npx prisma migrate dev --name new migrate name

- npx prisma migrate status

- npx prisma generate

- npx prisma studio

## Ts node

- ts-node prisma/seed.ts