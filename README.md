# Development

Pasos para levantar la app en desarrollo

1. Levantar la base de datos

```
docker compose up -d
```

2. Renombrar el .env.template a .env
3. Reemplazar las variables de entorno
4. ejecutar ` npm install`

# Prisma commnads

```
npx prisma init
npx prisma migrate dev
npx prisma generate

```

5. Lanzar la app en desarrollo

`npm run dev`

4. Ejecutar el SEED para [crear la base de datos local](localhost:3000/api/seed)
