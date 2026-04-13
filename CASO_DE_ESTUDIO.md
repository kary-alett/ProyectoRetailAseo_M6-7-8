# 📚 Caso de Estudio — RetailAseo: Node & Express Web App

**Portafolio Técnico | Bootcamp Alkemy — Full Stack JavaScript Trainee**  
**Autora:** Karina Alejandra Trujillo Trujillo  
**GitHub:** [kary-alett](https://github.com/kary-alett)

---

## 📌 Descripción del proyecto

RetailAseo es una **API RESTful backend** completa para la gestión de una tienda de artículos de higiene y limpieza. Fue desarrollada de forma progresiva en tres módulos del bootcamp, cubriendo desde la estructura básica del servidor hasta la autenticación segura con JWT y la subida de archivos.

El proyecto simula un entorno de trabajo real donde una empresa de tecnología necesita un backend escalable para gestionar usuarios, productos, categorías y pedidos, con datos persistidos en una base de datos relacional.

**Repositorio:** [ProyectoRetailAseo_M6-7-8](https://github.com/kary-alett/ProyectoRetailAseo_M6-7-8)

---

## 🎯 Desafío principal

El mayor desafío técnico fue implementar la **creación de pedidos con transaccionalidad completa**. Este proceso involucra múltiples operaciones encadenadas que deben ejecutarse todas juntas o ninguna:

1. Verificar el stock disponible de cada producto
2. Crear el registro del pedido en la base de datos
3. Crear cada ítem del pedido con el precio histórico
4. Descontar el stock de cada producto

Si cualquiera de estas operaciones falla (por ejemplo, stock insuficiente), **todos los cambios deben revertirse automáticamente** para evitar datos inconsistentes. Implementar esto correctamente, entendiendo cómo pasar el objeto de transacción a cada operación de Sequelize, fue el mayor aprendizaje técnico del proyecto.

---

## 💡 Solución propuesta

Se implementó una transacción explícita de Sequelize con `commit` y `rollback`:

```javascript
const createOrder = async (user_id, items) => {
  const t = await sequelize.transaction();
  try {
    // 1. Verificar stock de cada producto
    for (const item of items) {
      const product = await Product.findByPk(item.product_id, { transaction: t });
      if (product.stock < item.cantidad) {
        throw new Error(`Stock insuficiente para "${product.nombre}"`);
      }
    }
    // 2. Crear el pedido
    const order = await Order.create({ user_id, total }, { transaction: t });
    // 3. Crear ítems y descontar stock
    for (const item of itemsConPrecio) {
      await OrderItem.create({ ...item }, { transaction: t });
      await product.update({ stock: product.stock - item.cantidad }, { transaction: t });
    }
    await t.commit(); // Confirmar todos los cambios
    return order;
  } catch (error) {
    await t.rollback(); // Revertir si algo falló
    logTransactionError(error); // Registrar en logs/transactions.log
    throw error;
  }
};
```

**Clave aprendida:** cada operación dentro de la transacción debe recibir `{ transaction: t }` como parámetro, de lo contrario Sequelize no la incluye en el mismo bloque atómico.

---

## 🛠️ Herramientas técnicas utilizadas

| Tecnología | Rol en el proyecto |
|---|---|
| Node.js v18 | Runtime del servidor |
| Express.js | Framework HTTP y routing |
| Sequelize 6 | ORM para manejo de modelos y relaciones |
| PostgreSQL | Base de datos relacional |
| bcryptjs | Hash seguro de contraseñas |
| jsonwebtoken | Autenticación stateless con JWT |
| Multer | Subida y validación de archivos |
| dotenv | Variables de entorno seguras |
| Git / GitHub | Control de versiones y publicación |

---

## 📈 Métricas de impacto

| Métrica | Resultado |
|---|---|
| Endpoints implementados | 20+ endpoints funcionales |
| Entidades modeladas | 5 (User, Category, Product, Order, OrderItem) |
| Tipos de relaciones | 1:N y N:M con tabla intermedia |
| Rutas protegidas con JWT | 6 rutas |
| Operaciones CRUD completas | 4 entidades |
| Validación de archivos | Tipo (jpeg/png/gif) + tamaño (máx. 2MB) |
| Módulos del bootcamp cubiertos | 3 (M6 + M7 + M8) |
| Tiempo de desarrollo | 3 semanas (una etapa por módulo) |

---

## 🧠 Principales aprendizajes

**Arquitectura:** aprendí a estructurar un proyecto backend en capas (routes → controllers → services → models) donde cada archivo tiene una única responsabilidad. Esto hace el código escalable y fácil de mantener.

**Transaccionalidad:** entendí la diferencia entre ejecutar operaciones independientes en la base de datos y ejecutarlas dentro de un bloque atómico. Las transacciones son fundamentales para mantener la integridad de los datos en operaciones compuestas.

**Seguridad:** implementé autenticación stateless con JWT, hasheo de contraseñas con bcrypt, validación de tipos de archivo con Multer y almacenamiento de credenciales en variables de entorno. Ninguna contraseña ni secreto viaja en el código.

**Documentación técnica:** desarrollé el hábito de documentar cada decisión técnica (por qué elegí Sequelize sobre SQL manual, por qué protegí esas rutas específicas, cómo funciona el rollback). Esta habilidad es tan importante como el código mismo en un equipo de trabajo.

**Git como hábito:** cada módulo tiene su propio commit descriptivo con el prefijo convencional (`feat:`, `docs:`, `fix:`), lo que permite entender la historia del proyecto de un vistazo.

---

## 🏆 Habilidades técnicas aplicadas

- Diseño e implementación de APIs RESTful
- Modelado de base de datos relacional con Sequelize
- Autenticación y autorización con JWT
- Manejo seguro de archivos con Multer
- Transacciones y control de integridad en PostgreSQL
- Arquitectura modular MVC en Node.js
- Control de versiones con Git y GitHub
- Documentación técnica profesional en Markdown

---

## 🎯 ¿Por qué elegí este proyecto para mi portafolio?

Elegí RetailAseo porque es el proyecto más completo y representativo de mi crecimiento durante el bootcamp. Cubre el ciclo completo de un backend real: desde servir contenido estático hasta exponer una API segura con autenticación y persistencia de datos.

Lo que más me enorgullece es que no es solo código que funciona, sino código que está bien estructurado, documentado y versionado — tres pilares que distinguen a un desarrollador profesional de uno que simplemente "hace que funcione".

Además, el proyecto demuestra capacidad de aprendizaje progresivo: cada módulo construyó sobre el anterior sin romper lo existente, lo que refleja cómo funciona el desarrollo de software en un entorno real con entregas iterativas.

---

## 🗂️ Otros proyectos en el portafolio

| Proyecto | Tecnologías | Descripción |
|---|---|---|
| RetailAseo M6 | Node.js, Express | Servidor base con rutas, middlewares y logger |
| RetailAseo M7 | Sequelize, PostgreSQL | Base de datos, ORM, CRUD y transacciones |
| RetailAseo M8 | JWT, Multer | API segura con autenticación y subida de archivos |

---

*Portafolio desarrollado como parte del Bootcamp Full Stack JavaScript Trainee — Alkemy 2026*  
*Contacto: [GitHub](https://github.com/kary-alett) | [LinkedIn](https://linkedin.com/in/karina-trujillo)*
