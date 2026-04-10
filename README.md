# 🧴 RetailAseo — Node & Express Web App

Proyecto integrador del bootcamp Alkemy — **Módulos 6, 7 y 8**
Aplicación web backend para una tienda de artículos de higiene y limpieza.

Docente: Sabina Romero

---

## 🛠️ Stack técnico

| Tecnología | Rol |
|---|---|
| Node.js ≥ 18 | Runtime del servidor |
| Express.js v4 | Framework HTTP |
| Sequelize 6 | ORM para PostgreSQL |
| PostgreSQL | Base de datos relacional |
| dotenv | Variables de entorno |
| nodemon | Recarga automática en desarrollo |
| multer | Subida de archivos (Módulo 8) |
| bcryptjs | Hash de contraseñas (Módulo 8) |
| jsonwebtoken | Autenticación JWT (Módulo 8) |

---

## 📁 Estructura del proyecto
ProyectoRetailAseo_M6-7-8/
├── index.js                   # Punto de entrada del servidor
├── .env                       # Variables de entorno (NO subir a git)
├── .env.example               # Plantilla de variables de entorno
├── .gitignore
├── package.json
├── README.md
├── logs/
│   ├── log.txt                # Registro de requests HTTP (Módulo 6)
│   └── transactions.log       # Registro de transacciones fallidas (Módulo 7)
├── uploads/                   # Imágenes subidas (Módulo 8)
├── public/                    # Archivos estáticos
│   └── styles.css
├── routes/
│   └── router.js              # Rutas del Módulo 6 (/, /status)
├── controllers/               # Controladores del Módulo 6
│   ├── homeController.js
│   └── statusController.js
├── middlewares/
│   └── logger.js              # Logger a archivo plano (Módulo 6)
└── src/                       # Código del Módulo 7 y 8
├── config/
│   ├── database.js        # Conexión Sequelize + PostgreSQL
│   └── multer.js          # Configuración subida de archivos
├── models/
│   ├── index.js           # Centraliza modelos y asociaciones
│   ├── User.js
│   ├── Category.js
│   ├── Product.js
│   ├── Order.js
│   └── OrderItem.js
├── services/
│   ├── userService.js
│   ├── categoryService.js
│   ├── productService.js
│   └── orderService.js
├── controllers/
│   ├── userController.js
│   ├── categoryController.js
│   └── productController.js
└── routes/
├── userRoutes.js
├── categoryRoutes.js
├── productRoutes.js
└── orderRoutes.js
---

## ⚙️ Requisitos del sistema

- **Node.js** v18 o superior
- **PostgreSQL** v14 o superior

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/kary-alett/ProyectoRetailAseo_M6-7-8.git
cd ProyectoRetailAseo_M6-7-8
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env
# Editar .env con tu contraseña de PostgreSQL
```

### 4. Crear la base de datos en PostgreSQL
```sql
CREATE DATABASE retail_aseo;
```

### 5. Iniciar el servidor
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

Las tablas se crean automáticamente al iniciar gracias a `sequelize.sync()`.

---

## 🔌 Endpoints disponibles

### Módulo 6
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Página principal |
| GET | `/status` | Estado del servidor |

### Módulo 7 — API REST

**Usuarios**
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/usuarios` | Listar (`?nombre=Juan`) |
| GET | `/api/usuarios/:id` | Ver un usuario |
| POST | `/api/usuarios` | Crear usuario |
| PUT | `/api/usuarios/:id` | Actualizar usuario |
| DELETE | `/api/usuarios/:id` | Eliminar usuario |

**Categorías**
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/categorias` | Listar (`?search=limpieza`) |
| GET | `/api/categorias/:id` | Ver con sus productos |
| POST | `/api/categorias` | Crear categoría |
| PUT | `/api/categorias/:id` | Actualizar categoría |
| DELETE | `/api/categorias/:id` | Eliminar categoría |

**Productos**
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/productos` | Listar (`?search=&category=&minPrice=&maxPrice=`) |
| GET | `/api/productos/:id` | Ver con su categoría |
| POST | `/api/productos` | Crear producto |
| PUT | `/api/productos/:id` | Actualizar producto |
| DELETE | `/api/productos/:id` | Eliminar producto |

**Pedidos**
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/pedidos` | Listar todos los pedidos |
| GET | `/api/pedidos/:id` | Ver pedido con items |
| POST | `/api/pedidos` | Crear pedido (con transacción) |
| PUT | `/api/pedidos/:id/estado` | Cambiar estado del pedido |

---

## 📊 Modelo de datos y relaciones
User ──────────── Order       (1:N — un usuario tiene muchos pedidos)
Category ──────── Product     (1:N — una categoría tiene muchos productos)
Order ─────────── OrderItem   (1:N — un pedido tiene muchos ítems)
Product ──────── OrderItem    (N:M — a través de OrderItem)

---

## 🔄 Transaccionalidad

La creación de pedidos usa transacciones Sequelize para garantizar consistencia. Si cualquier paso falla se ejecuta un **rollback completo** y el error queda registrado en `logs/transactions.log`.

---

## 📝 Sistema de logs

- **log.txt** — registra cada request HTTP (Módulo 6)
- **transactions.log** — registra errores en transacciones de pedidos (Módulo 7)

---

## 🔐 Autenticación con JWT

### Registro
- POST `/api/auth/register` — crea un usuario nuevo con contraseña hasheada

### Login
- POST `/api/auth/login` — devuelve un token JWT

### Uso del token
En todas las rutas protegidas agrega el header: 
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkByZXRhaWxhc2VvLmNvbSIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzc1Nzg3NTY4LCJleHAiOjE3NzU4NzM5Njh9.BBR-blVkels4Uaf7tdkTtU8w2bjQgfPTT_tFPJ9rhpg

El token expira en **24 horas** (configurable en `.env` con `JWT_EXPIRES_IN`).

### Rutas protegidas 🔒
| Ruta | Motivo |
|---|---|
| GET `/api/auth/me` | Ver perfil propio |
| GET `/api/pedidos` | Solo usuarios autenticados |
| POST `/api/pedidos` | Solo usuarios autenticados |
| PUT `/api/pedidos/:id/estado` | Solo usuarios autenticados |
| POST `/api/upload/avatar` | Solo usuarios autenticados |
| POST `/api/upload/producto/:id` | Solo usuarios autenticados |

---

## 📤 Subida de archivos

| Endpoint | Descripción |
|---|---|
| POST `/api/upload/avatar` | Sube foto de perfil del usuario |
| POST `/api/upload/producto/:id` | Sube imagen de un producto |

- Tipos permitidos: jpeg, jpg, png, gif
- Tamaño máximo: 2 MB
- Las imágenes se guardan en la carpeta `uploads/`
- La URL se asocia automáticamente al registro en la base de datos

---

## 📎 Entregas por módulo

| Módulo | Contenido |
|---|---|
| Parte 1 – Módulo 6 | Servidor Express, rutas /, /status, middleware logger |
| Parte 2 – Módulo 7 | BD PostgreSQL, Sequelize, CRUD completo, relaciones, transacciones |
| Parte 3 – Módulo 8 | JWT, registro/login, rutas protegidas, subida de archivos con Multer |
