# 📌 Prueba Técnica – Desarrollador Semi-Senior

Este proyecto implementa una aplicación **fullstack** con **Laravel (PHP)** en el backend y **Angular** en el frontend. 
Se escogió Laravel por ser un framework ampliamente adoptado en la industria, que garantiza el uso de buenas prácticas en arquitectura MVC y desarrollo de APIs REST, permitiendo implementar soluciones escalables de forma ordenada.
El objetivo es registrar empleados, gestionar sus familiares directos y exponer endpoints RESTful que permitan consumir la información desde el frontend y herramientas externas como Postman.
El ambiente fue levantado sobre Windows 11.

---

## 🚀 Tecnologías utilizadas
- **Backend:** Laravel 9.52.20 
- **Frontend:** Angular 20.3 (Angular CLI)  
- **Base de datos:** MySQL 8   
- **Seguridad API:** Token Bearer
- **Estilos:** Bootstrap

---

## ⚙️ Requisitos previos
- PHP >= 8.1  
- Composer >= 2.5 
- Node.js >= 22     

---

## 🛠 Instalación y configuración

### 1. Backend (Laravel)
descarga e instalación de XAMPP Server (con la version que cumpla los requisitos previos)
habilitar servicios Apache y Mysql
descarga e instalación composer
cp .env.example .env
php artisan key:generate
env:
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_empleados
DB_USERNAME=root
DB_PASSWORD=
Ejecutar migraciones:
php artisan migrate
Levantar servidor:
php artisan serve

### 2. Frontend (Angular)
cd empleados-front
npm install
ng serve --proxy-config proxy.conf.json

---

## Estructura base de datos y relaciones
Tabla empleados
| Campo          | Tipo    |
| -------------- | ------- |
| id (PK)        | INT AI  |
| nombre         | VARCHAR |
| correo         | VARCHAR |
| cargo          | VARCHAR |
| fecha_ingreso  | DATE    |

Tabla familiares_directos
| Campo             | Tipo    |
| ----------------- | ------- |
| id (PK)           | INT AI  |
| id_empleado (FK)  | INT     |
| nombre_familiar   | VARCHAR |
| parentesco        | VARCHAR |
| fecha_nacimiento  | DATE    |

Adicionalmente Laravel crea los campos created_at y updated_at en cada tabla

---

## Probar endpoints con POSTMAN
POST http://localhost:8000/api/oauth2/token → La respuesta generará un Token Bearer 'access_token' para probar los endpoints
En los Endpoints a probar a continuación se deberá seleccionar la pestaña Authorization, luego en Auth type seleccionar Bearer Token, pegar el token generado 

-- Endpoints Empleado
GET  http://localhost:8000/api/empleados → listar empleados
POST http://localhost:8000/api/empleados → crear empleados (llenando los datos en Params)
GET  http://localhost:8000/api/empleados/{id} → ver empleado por id
PUT  http://localhost:8000/api/empleados/{id} → actualizar empleado por id (llenando los datos en Params)
DELETE http://localhost:8000/api/empleados/{id} → eliminar empleado (No es buena práctica eliminar sin embargo se hace con fines de la práctica)

-- Endpoints Familiares directos
GET  http://localhost:8000/api/empleados/{id}/familiares → listar familiares
POST http://localhost:8000/api/empleados/{id}/familiares → crear familiares
DELETE http://localhost:8000/api/familiares/{id} → elimina familiares directo por id (No es buena práctica eliminar sin embargo se hace con fines de la práctica)
