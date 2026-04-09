# 🧴 RetailAseo — Node & Express Web App

Proyecto integrador del bootcamp Alkemy — **Módulos 6, 7 y 8**  
Aplicación web backend para una tienda de artículos de higiene y limpieza.

---

## 🛠️ Stack técnico

| Tecnología | Rol |
|---|---|
| Node.js ≥ 18 | Runtime del servidor |
| Express.js | Framework HTTP |
| Sequelize 6 | ORM para PostgreSQL |
| PostgreSQL | Base de datos relacional |
| dotenv | Variables de entorno |
| nodemon | Recarga automática en desarrollo |
| multer | Subida de archivos (Módulo 8) |
| bcryptjs | Hash de contraseñas (Módulo 8) |
| jsonwebtoken | Autenticación JWT (Módulo 8) |

---

## 📁 Estructura del proyecto

```
ProyectoRetailAseo_M6-7-8/
├── index.js                   # Punto de entrada del servidor
├── .env                       # Variables de entorno (NO subir a git)
├── .env.example               # Plantilla de variables de entorno
├── .gitignore
├── package.json
├── seed.sql                   # Datos de prueba para poblar la BD
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
    │   └── multer.js          # Configuración de subida de archivos
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
    │   └── orderService.js    # Incluye transaccionalidad
    ├── controllers/
    │   ├── userController.js
    │   ├── categoryController.js
    │   └── productController.js
    └── routes/
        ├── userRoutes.js
        ├── categoryRoutes.js
        ├── productRoutes.js
        └── orderRoutes.js
```

**Decisión de arquitectura:** se separó el código nuevo en la carpeta `src/` para no romper lo que ya funcionaba del Módulo 6, y se siguió el patrón routes → controllers → services → models para mantener cada capa con una sola responsabilidad.

---

## ⚙️ Requisitos

- **Node.js** v18 o superior
- **PostgreSQL** v14 o superior (corriendo localmente)

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
# Desarrollo (recarga automática)
npm run dev

# Producción
npm start
```

Las tablas se crean automáticamente con `sequelize.sync({ alter: true })` al iniciar.

### 6. Cargar datos de prueba (opcional)
```bash
psql -U postgres -d retail_aseo -f seed.sql
```

---

## 🔌 Endpoints disponibles

### Base URL: `http://localhost:3000`

#### Módulo 6 (se mantienen)
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Página principal |
| GET | `/status` | Estado del servidor |

#### Módulo 7 — API REST

**Usuarios**
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/usuarios` | Listar usuarios (`?nombre=Juan`) |
| GET | `/api/usuarios/:id` | Ver un usuario |
| POST | `/api/usuarios` | Crear usuario |
| PUT | `/api/usuarios/:id` | Actualizar usuario |
| DELETE | `/api/usuarios/:id` | Eliminar usuario |

**Categorías**
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/categorias` | Listar (`?search=limpieza`) |
| GET | `/api/categorias/:id` | Ver categoría con sus productos |
| POST | `/api/categorias` | Crear categoría |
| PUT | `/api/categorias/:id` | Actualizar categoría |
| DELETE | `/api/categorias/:id` | Eliminar categoría |

**Productos**
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/productos` | Listar (`?search=&category=&minPrice=&maxPrice=`) |
| GET | `/api/productos/:id` | Ver producto con categoría |
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

```
User ──────────── Order          (1:N — un usuario tiene muchos pedidos)
Category ──────── Product        (1:N — una categoría tiene muchos productos)
Order ─────────── OrderItem      (1:N — un pedido tiene muchos ítems)
Product ──────── OrderItem       (N:M — un producto aparece en muchos ítems)
```

---

## 🔄 Transaccionalidad (Lección 4)

La creación de pedidos usa transacciones de Sequelize para garantizar consistencia:

1. Verifica stock de cada producto
2. Crea el registro del pedido
3. Crea cada OrderItem con el precio histórico
4. Descuenta el stock de cada producto

Si **cualquier paso falla**, se ejecuta un **rollback completo** y se registra el error en `logs/transactions.log`.

---

## 🗃️ ORM vs SQL manual

Se eligió **Sequelize** porque:
- Permite definir modelos y relaciones en JavaScript puro
- Maneja migraciones con `sync({ alter: true })`
- Soporta transacciones de forma nativa
- Abstrae las diferencias entre motores de base de datos
- Evita SQL injection al parametrizar automáticamente las queries

---

## 📝 Sistema de logs

**log.txt** — registra cada request HTTP:
```
[8/4/2026] [14:30:00] GET /api/usuarios
[8/4/2026] [14:30:05] POST /api/pedidos
```

**transactions.log** — registra errores en transacciones:
```
[8/4/2026 14:31:00] ERROR TRANSACCIÓN — Stock insuficiente para "Cloro Líquido 1L"
```

---

## 📎 Entregables por módulo

| Módulo | Contenido |
|---|---|
| Parte 1 – Módulo 6 | Servidor, rutas /, /status, logger |
| Parte 2 – Módulo 7 | BD conectada, CRUD completo, ORM, relaciones, transacciones |
| Parte 3 – Módulo 8 | JWT, rutas protegidas, subida de archivos |
