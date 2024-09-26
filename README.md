# Development

Pasos para levantar la app en desarrollo

1. Levantar la base de datos

```sh {"id":"01J8QV9WSK0PJBGG2THBSECTHV"}
docker compose up -d
```

2. Renombrar el .env.template a .env
3. Reemplazar las variables de entorno
4. ejecutar ` npm install`

# Prisma commnads

```sh {"id":"01J8QV9WSK0PJBGG2THF57WGNM"}
npx prisma init
npx prisma migrate dev
npx prisma generate

```

5. Lanzar la app en desarrollo

`npm run dev`

4. Ejecutar el SEED para [crear la base de datos local](localhost:3000/api/seed)

```sh {"id":"01J8QVA3ZS1TX2EX7XGT1XYTYX"}
npm run seed
```
