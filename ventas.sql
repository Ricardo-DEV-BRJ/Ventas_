-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-06-2025 a las 07:03:04
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ventas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_cat` varchar(50) NOT NULL,
  `nom_cat` varchar(50) NOT NULL,
  `hab_cat` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_cat`, `nom_cat`, `hab_cat`) VALUES
('27366878-7cc3-4de6-ab45-b7655680b75e', 'Enlatados', 1),
('507570c7-ccde-487c-8a30-19566fe0a16d', 'Prueba', 1),
('84d4e6e0-c4a1-46c7-9ab6-e484a5ef765c', 'Curtidos', 1),
('a9dd9e56-2cf5-46a4-b6b6-b128b67fd91d', 'Curtidos', 0),
('ca1d36e1-fc55-4879-b374-472e40b30eba', 'Vegetales', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id_cli` varchar(50) NOT NULL,
  `nom_cli` varchar(50) NOT NULL,
  `ape_cli` varchar(50) NOT NULL,
  `iden` varchar(30) NOT NULL,
  `tel_cli` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `hab_cli` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cli`, `nom_cli`, `ape_cli`, `iden`, `tel_cli`, `email`, `hab_cli`) VALUES
('57fa99dd-2b52-4027-879a-f9109eae71e7', 'Juan', 'Briceño', 'V-28445397', '0424-7504320', 'ricardo@gmail.com', 1),
('e04b9df8-1272-4989-b798-65f8201093cf', 'Juan', 'Briceño', 'V-2844556', '0424-7504320', 'ricardo@gmail.com', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_venta`
--

CREATE TABLE `detalle_venta` (
  `id_ven` varchar(50) NOT NULL,
  `num_fac` int(11) NOT NULL,
  `descrip` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`descrip`)),
  `tasa` double NOT NULL,
  `monto_bs` double NOT NULL,
  `monto_dolar` double NOT NULL,
  `id_pag` varchar(50) NOT NULL,
  `fec_ven` date NOT NULL,
  `id_cli` varchar(50) NOT NULL,
  `aten_por` varchar(50) NOT NULL,
  `obs` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_venta`
--

INSERT INTO `detalle_venta` (`id_ven`, `num_fac`, `descrip`, `tasa`, `monto_bs`, `monto_dolar`, `id_pag`, `fec_ven`, `id_cli`, `aten_por`, `obs`) VALUES
('26cab253-c277-4570-80cf-9c3d584f6f52', 22, '[{\"id_prod\":\"c6d5801c-4327-4ed0-a7b4-bbd07e282499\",\"cantidad\":5,\"prec_uni\":20,\"monto_prod\":100},{\"id_prod\":\"fdf77aec-6c24-48ab-b9a2-92883369f0ef\",\"cantidad\":5,\"prec_uni\":20,\"monto_prod\":100}]', 100, 100, 1, '19abef64-aba5-4c13-bad9-aae7855ffd0f', '2025-06-16', '57fa99dd-2b52-4027-879a-f9109eae71e7', 'riki', '123'),
('33d6b5b2-5a4f-4094-b8e1-eb3997aacbec', 25, '[{\"id_prod\":\"c6d5801c-4327-4ed0-a7b4-bbd07e282499\",\"nom_prod\":\"Leche\",\"cantidad\":5,\"prec_uni_bs\":20,\"prec_uni_dolar\":20,\"monto_prod_bs\":100,\"monto_prod_dolar\":100},{\"id_prod\":\"fdf77aec-6c24-48ab-b9a2-92883369f0ef\",\"nom_prod\":\"Arroz\",\"cantidad\":5,\"prec_uni_bs\":20,\"prec_uni_dolar\":20,\"monto_prod_bs\":100,\"monto_prod_dolar\":100}]', 100, 100, 1, '19abef64-aba5-4c13-bad9-aae7855ffd0f', '2025-06-17', '57fa99dd-2b52-4027-879a-f9109eae71e7', 'riki', '123'),
('69d1f406-6b70-4d3f-af27-355aca079867', 21, '[{\"id_prod\":\"c6d5801c-4327-4ed0-a7b4-bbd07e282499\",\"cantidad\":5,\"prec_uni\":20,\"monto_prod\":100},{\"id_prod\":\"fdf77aec-6c24-48ab-b9a2-92883369f0ef\",\"cantidad\":5,\"prec_uni\":20,\"monto_prod\":100}]', 0, 100, 0, '19abef64-aba5-4c13-bad9-aae7855ffd0f', '2025-06-16', '57fa99dd-2b52-4027-879a-f9109eae71e7', 'riki', '123'),
('9bf8f506-13d8-402c-a7d0-5849af0af930', 23, '[{\"id_prod\":\"c6d5801c-4327-4ed0-a7b4-bbd07e282499\",\"cantidad\":5,\"prec_uni\":20,\"monto_prod\":100},{\"id_prod\":\"fdf77aec-6c24-48ab-b9a2-92883369f0ef\",\"cantidad\":5,\"prec_uni\":20,\"monto_prod\":100}]', 100, 100, 1, '19abef64-aba5-4c13-bad9-aae7855ffd0f', '2025-06-17', '57fa99dd-2b52-4027-879a-f9109eae71e7', 'riki', '123'),
('b88049c0-9209-44f4-979f-3f6b49f867ef', 20, '[{\"id_prod\":\"c6d5801c-4327-4ed0-a7b4-bbd07e282499\",\"cantidad\":5,\"prec_uni\":20,\"monto_prod\":100},{\"id_prod\":\"fdf77aec-6c24-48ab-b9a2-92883369f0ef\",\"cantidad\":5,\"prec_uni\":20,\"monto_prod\":100}]', 0, 100, 0, '19abef64-aba5-4c13-bad9-aae7855ffd0f', '2025-06-16', '57fa99dd-2b52-4027-879a-f9109eae71e7', 'riki', '123'),
('c4af1e3e-b462-420f-888a-3792b4280292', 24, '[{\"id_prod\":\"c6d5801c-4327-4ed0-a7b4-bbd07e282499\",\"nom_prod\":\"Leche\",\"cantidad\":5,\"prec_uni_bs\":20,\"prec_uni_dolar\":20,\"monto_prod_bs\":100,\"monto_prod_dolar\":100},{\"id_prod\":\"fdf77aec-6c24-48ab-b9a2-92883369f0ef\",\"nom_prod\":\"Arroz\",\"cantidad\":5,\"prec_uni_bs\":20,\"prec_uni_dolar\":20,\"monto_prod_bs\":100,\"monto_prod_dolar\":100}]', 100, 100, 1, '19abef64-aba5-4c13-bad9-aae7855ffd0f', '2025-06-17', '57fa99dd-2b52-4027-879a-f9109eae71e7', 'riki', '123'),
('f9c32ab3-79ea-45ec-a75b-e1a5466069d0', 26, '[{\"id_prod\":\"c6d5801c-4327-4ed0-a7b4-bbd07e282499\",\"nom_prod\":\"Leche\",\"cantidad\":5,\"prec_uni_bs\":20,\"prec_uni_dolar\":20,\"monto_prod_bs\":100,\"monto_prod_dolar\":100},{\"id_prod\":\"fdf77aec-6c24-48ab-b9a2-92883369f0ef\",\"nom_prod\":\"Arroz\",\"cantidad\":5,\"prec_uni_bs\":20,\"prec_uni_dolar\":20,\"monto_prod_bs\":100,\"monto_prod_dolar\":100},{\"id_prod\":\"05e0b138-2a28-4587-8396-8be77ef4f733\",\"nom_prod\":\"Mango\",\"cantidad\":5,\"prec_uni_bs\":20,\"prec_uni_dolar\":20,\"monto_prod_bs\":100,\"monto_prod_dolar\":100}]', 100, 100, 1, '19abef64-aba5-4c13-bad9-aae7855ffd0f', '2025-06-18', '57fa99dd-2b52-4027-879a-f9109eae71e7', 'riki', '123');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `devoluciones`
--

CREATE TABLE `devoluciones` (
  `id_dev` varchar(50) NOT NULL,
  `id_ven` varchar(50) NOT NULL,
  `num_fac` int(11) NOT NULL,
  `monto_bs` double NOT NULL,
  `monto_dolar` double NOT NULL,
  `prods` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`prods`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `devoluciones`
--

INSERT INTO `devoluciones` (`id_dev`, `id_ven`, `num_fac`, `monto_bs`, `monto_dolar`, `prods`) VALUES
('5f15a0b5-005f-4d7b-a7bf-06840274ca03', '33d6b5b2-5a4f-4094-b8e1-eb3997aacbec', 25, 100, 1, '[{\"id_prod\":\"c6d5801c-4327-4ed0-a7b4-bbd07e282499\",\"nom_prod\":\"Leche\",\"cantidad\":5,\"prec_uni_bs\":20,\"prec_uni_dolar\":20,\"monto_prod_bs\":100,\"monto_prod_dolar\":100},{\"id_prod\":\"fdf77aec-6c24-48ab-b9a2-92883369f0ef\",\"nom_prod\":\"Arroz\",\"cantidad\":5,\"prec_uni_bs\":20,\"prec_uni_dolar\":20,\"monto_prod_bs\":100,\"monto_prod_dolar\":100}]'),
('834ec933-4a02-42c0-ab78-7e3150543731', '9bf8f506-13d8-402c-a7d0-5849af0af930', 23, 100, 1, '[{\"id_prod\":\"c6d5801c-4327-4ed0-a7b4-bbd07e282499\",\"cantidad\":5,\"prec_uni\":20,\"monto_prod\":100},{\"id_prod\":\"fdf77aec-6c24-48ab-b9a2-92883369f0ef\",\"cantidad\":5,\"prec_uni\":20,\"monto_prod\":100}]'),
('9b50082c-3881-4fd4-a779-146fb2522ec5', 'f9c32ab3-79ea-45ec-a75b-e1a5466069d0', 26, 100, 1, '[{\"id_prod\":\"c6d5801c-4327-4ed0-a7b4-bbd07e282499\",\"nom_prod\":\"Leche\",\"cantidad\":5,\"prec_uni_bs\":20,\"prec_uni_dolar\":20,\"monto_prod_bs\":100,\"monto_prod_dolar\":100},{\"id_prod\":\"fdf77aec-6c24-48ab-b9a2-92883369f0ef\",\"nom_prod\":\"Arroz\",\"cantidad\":5,\"prec_uni_bs\":20,\"prec_uni_dolar\":20,\"monto_prod_bs\":100,\"monto_prod_dolar\":100},{\"id_prod\":\"05e0b138-2a28-4587-8396-8be77ef4f733\",\"nom_prod\":\"Mango\",\"cantidad\":5,\"prec_uni_bs\":20,\"prec_uni_dolar\":20,\"monto_prod_bs\":100,\"monto_prod_dolar\":100}]');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `existencia`
--

CREATE TABLE `existencia` (
  `id_prod_exi` varchar(50) NOT NULL,
  `id_prod` varchar(50) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `cod_lote` varchar(50) NOT NULL,
  `fec_lote` date NOT NULL,
  `prec_uni_bs` double NOT NULL,
  `prec_uni_dolar` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `existencia`
--

INSERT INTO `existencia` (`id_prod_exi`, `id_prod`, `cantidad`, `cod_lote`, `fec_lote`, `prec_uni_bs`, `prec_uni_dolar`) VALUES
('039a4865-5351-41f9-9544-8cdfb1817a0b', 'fdf77aec-6c24-48ab-b9a2-92883369f0ef', 20, '1120', '2025-06-16', 100, 10),
('611aceec-94c3-44ed-bc40-57d124aae0c6', '05e0b138-2a28-4587-8396-8be77ef4f733', 20, '1120', '2025-06-16', 100, 50),
('9b4f9317-1301-4644-aca9-7fd2a69842ed', 'c6d5801c-4327-4ed0-a7b4-bbd07e282499', 20, '1120', '2025-06-16', 100, 50),
('a8515b9a-9304-4ba2-899a-e07375cde0c5', 'fdf77aec-6c24-48ab-b9a2-92883369f0ef', 20, '1120', '2025-06-16', 100, 50),
('aa21eb28-c35e-4343-a935-b0c604351e7a', 'fdf77aec-6c24-48ab-b9a2-92883369f0ef', 20, '1120', '2025-06-16', 100, 50),
('bd0c1eab-dbdc-457d-a59f-25355c37f5e7', 'c6d5801c-4327-4ed0-a7b4-bbd07e282499', 20, '1120', '2025-06-16', 100, 50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `graf_prod`
--

CREATE TABLE `graf_prod` (
  `id_graf` varchar(50) NOT NULL,
  `id_ven` varchar(50) NOT NULL,
  `id_prod` varchar(50) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fec_prod_ven` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `id_pag` varchar(50) NOT NULL,
  `monto_bs` double NOT NULL,
  `monto_dolar` double NOT NULL,
  `met_ref` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`met_ref`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pagos`
--

INSERT INTO `pagos` (`id_pag`, `monto_bs`, `monto_dolar`, `met_ref`) VALUES
('19abef64-aba5-4c13-bad9-aae7855ffd0f', 100, 0, '[{\"metodo\":\"Efectivo\",\"ref\":\"Sin referencia\",\"monto\":100},{\"metodo\":\"Efectivo\",\"ref\":\"Sin referencia\",\"monto\":100},{\"metodo\":\"Efectivo\",\"ref\":\"Sin referencia\",\"monto\":100}]'),
('4f0f6fc0-0c34-447d-ac68-f0057db494df', 1000, 10, '[{\"metodo\":\"Efectivo\",\"moneda\":\"Bolivares\",\"ref\":\"Sin referencia\",\"monto\":1000},{\"metodo\":\"Efectivo\",\"moneda\":\"Dolares\",\"ref\":\"Sin referencia\",\"monto\":10}]'),
('wqda', 122, 0, '[{\"hola\":\"1234\"}]');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_prod` varchar(50) NOT NULL,
  `nom_prod` varchar(50) NOT NULL,
  `id_cat` varchar(50) NOT NULL,
  `id_prov` varchar(50) NOT NULL,
  `existencia` int(11) NOT NULL,
  `hab_prod` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_prod`, `nom_prod`, `id_cat`, `id_prov`, `existencia`, `hab_prod`) VALUES
('05e0b138-2a28-4587-8396-8be77ef4f733', 'Mango', '27366878-7cc3-4de6-ab45-b7655680b75e', '3e8b46b2-ca71-4be3-acbe-d8cc5e2214d2', 20, 1),
('c6d5801c-4327-4ed0-a7b4-bbd07e282499', 'Leche', '27366878-7cc3-4de6-ab45-b7655680b75e', '3e8b46b2-ca71-4be3-acbe-d8cc5e2214d2', 75, 1),
('fdf77aec-6c24-48ab-b9a2-92883369f0ef', 'Arroz', '27366878-7cc3-4de6-ab45-b7655680b75e', '3e8b46b2-ca71-4be3-acbe-d8cc5e2214d2', 75, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id_prov` varchar(50) NOT NULL,
  `nom_prov` varchar(50) NOT NULL,
  `iden_prov` varchar(50) NOT NULL,
  `fec_prov` date NOT NULL,
  `hab_prov` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`id_prov`, `nom_prov`, `iden_prov`, `fec_prov`, `hab_prov`) VALUES
('3e8b46b2-ca71-4be3-acbe-d8cc5e2214d2', 'prueba', 'prubea', '2025-06-14', 1),
('d47e2999-db35-4832-a25a-5b3de6e26e5c', 'INSERINCA, C.A', 'J-40011237-0', '2025-06-14', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` varchar(50) NOT NULL,
  `nom_rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nom_rol`) VALUES
('a7586f7c-e1c6-423f-840f-6b8d4bf5e3d4', 'Superadmin'),
('c9e85673-4eea-4239-98b3-d7cd97602727', 'Vendedor'),
('f1809cbc-7e21-4999-8a62-5b1776da4b9b', 'Administrador'),
('f97859ec-7b39-49e6-b2f0-1ae342d925d2', 'Gerente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usu` varchar(50) NOT NULL,
  `iden` varchar(50) NOT NULL,
  `nom_usu` varchar(50) NOT NULL,
  `ape_usu` varchar(50) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `clave` varchar(100) NOT NULL,
  `id_rol` varchar(50) NOT NULL,
  `hab_usu` tinyint(1) NOT NULL,
  `fec_usu` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usu`, `iden`, `nom_usu`, `ape_usu`, `usuario`, `clave`, `id_rol`, `hab_usu`, `fec_usu`) VALUES
('4e5f25f7-89ae-4939-b769-d2c07c68d3ae', '1234', 'admin', 'admin', 'admin', '$2b$10$u.GWdJla51wfw7L9uYlVNe6G0fRDX.fKCbJDiWTYk6mWLkREwWoES', 'a7586f7c-e1c6-423f-840f-6b8d4bf5e3d4', 1, '2025-06-19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id_ven` varchar(50) NOT NULL,
  `tip_factura` varchar(50) NOT NULL,
  `monto_bs` double NOT NULL,
  `monto_dolar` double NOT NULL,
  `fec_ven` date NOT NULL,
  `aten_por` varchar(50) NOT NULL,
  `hab_ven` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id_ven`, `tip_factura`, `monto_bs`, `monto_dolar`, `fec_ven`, `aten_por`, `hab_ven`) VALUES
('b88049c0-9209-44f4-979f-3f6b49f867ef', 'Fiscal', 100, 0, '2025-06-16', 'riki', 1),
('69d1f406-6b70-4d3f-af27-355aca079867', 'Fiscal', 100, 0, '2025-06-16', 'riki', 1),
('26cab253-c277-4570-80cf-9c3d584f6f52', 'Fiscal', 100, 1, '2025-06-16', 'riki', 1),
('9bf8f506-13d8-402c-a7d0-5849af0af930', 'Fiscal', 100, 1, '2025-06-17', 'riki', 1),
('c4af1e3e-b462-420f-888a-3792b4280292', 'Fiscal', 100, 1, '2025-06-17', 'riki', 1),
('33d6b5b2-5a4f-4094-b8e1-eb3997aacbec', 'Fiscal', 100, 1, '2025-06-17', 'riki', 1),
('f9c32ab3-79ea-45ec-a75b-e1a5466069d0', 'Fiscal', 100, 1, '2025-06-18', 'riki', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_cat`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cli`),
  ADD UNIQUE KEY `iden` (`iden`);

--
-- Indices de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD PRIMARY KEY (`id_ven`),
  ADD UNIQUE KEY `num_fac` (`num_fac`),
  ADD KEY `id_pag` (`id_pag`),
  ADD KEY `id_cli` (`id_cli`);

--
-- Indices de la tabla `devoluciones`
--
ALTER TABLE `devoluciones`
  ADD PRIMARY KEY (`id_dev`),
  ADD UNIQUE KEY `num_fac` (`num_fac`),
  ADD KEY `id_ven` (`id_ven`);

--
-- Indices de la tabla `existencia`
--
ALTER TABLE `existencia`
  ADD PRIMARY KEY (`id_prod_exi`),
  ADD KEY `id_prod` (`id_prod`);

--
-- Indices de la tabla `graf_prod`
--
ALTER TABLE `graf_prod`
  ADD PRIMARY KEY (`id_graf`),
  ADD KEY `id_ven` (`id_ven`),
  ADD KEY `id_prod` (`id_prod`);

--
-- Indices de la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD PRIMARY KEY (`id_pag`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_prod`),
  ADD KEY `id_cat` (`id_cat`),
  ADD KEY `id_prov` (`id_prov`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id_prov`),
  ADD UNIQUE KEY `nom_prov` (`nom_prov`),
  ADD UNIQUE KEY `iden_prov` (`iden_prov`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usu`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD UNIQUE KEY `iden` (`iden`),
  ADD KEY `id_rol` (`id_rol`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD KEY `id_ven` (`id_ven`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  MODIFY `num_fac` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD CONSTRAINT `detalle_venta_ibfk_1` FOREIGN KEY (`id_pag`) REFERENCES `pagos` (`id_pag`),
  ADD CONSTRAINT `detalle_venta_ibfk_2` FOREIGN KEY (`id_cli`) REFERENCES `clientes` (`id_cli`);

--
-- Filtros para la tabla `devoluciones`
--
ALTER TABLE `devoluciones`
  ADD CONSTRAINT `devoluciones_ibfk_1` FOREIGN KEY (`id_ven`) REFERENCES `detalle_venta` (`id_ven`);

--
-- Filtros para la tabla `existencia`
--
ALTER TABLE `existencia`
  ADD CONSTRAINT `existencia_ibfk_1` FOREIGN KEY (`id_prod`) REFERENCES `productos` (`id_prod`);

--
-- Filtros para la tabla `graf_prod`
--
ALTER TABLE `graf_prod`
  ADD CONSTRAINT `graf_prod_ibfk_2` FOREIGN KEY (`id_prod`) REFERENCES `productos` (`id_prod`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_prov`) REFERENCES `proveedores` (`id_prov`),
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`id_cat`) REFERENCES `categorias` (`id_cat`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`);

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`id_ven`) REFERENCES `detalle_venta` (`id_ven`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
