CREATE DATABASE `sandwich` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;

CREATE TABLE `sandwich` (
  `id` double NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `clasificacion` enum('Clásico','Vegetariano','Vegano','Especial') DEFAULT 'Clásico',
  `imagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `usuario` (
  `id` double NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('Administrador','Cliente') DEFAULT 'Cliente',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO sandwich.sandwich (nombre, descripcion, precio, clasificacion, imagen) VALUES('', NULL, NULL, 'Clásico', NULL);
INSERT INTO sandwich.usuario (nombre, apellido, direccion, email, username, password, rol) VALUES('', NULL, NULL, '', '', '', 'Cliente');