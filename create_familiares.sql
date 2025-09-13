CREATE TABLE `familiares_directos` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_empleado` bigint(20) unsigned NOT NULL,
  `nombre_familiar` varchar(150) NOT NULL,
  `parentesco` varchar(100) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `familiares_directos_id_empleado_foreign` (`id_empleado`),
  CONSTRAINT `familiares_directos_id_empleado_foreign` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
