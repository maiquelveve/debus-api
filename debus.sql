-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 11-Abr-2020 às 20:42
-- Versão do servidor: 10.1.30-MariaDB
-- PHP Version: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `debus`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `cidades`
--

CREATE TABLE `cidades` (
  `id` int(11) NOT NULL,
  `id_Estado` int(11) NOT NULL,
  `st_nome` varchar(128) NOT NULL,
  `ibge` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `empresas`
--

CREATE TABLE `empresas` (
  `id` int(11) NOT NULL,
  `st_nome` varchar(80) DEFAULT NULL,
  `st_recefi` varchar(45) DEFAULT NULL,
  `st_cel` varchar(13) DEFAULT NULL,
  `ch_ativo` char(1) NOT NULL DEFAULT 'S',
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `empresas`
--

INSERT INTO `empresas` (`id`, `st_nome`, `st_recefi`, `st_cel`, `ch_ativo`, `id_usuario`) VALUES
(1, 'FRAN TUR', '123999', '992009666', 'S', 1),
(2, 'VEVE TUR', '123456', '99512487', 'S', 1),
(4, 'tazo tUr', '9876543210', '519985466584', 'S', 1),
(5, 'TESTE ', '123', '151951651', 'N', 1),
(6, 'lalalalLLLasdLLL', '1234567892151', '2151651', 'S', 1),
(8, 'olha outro teste ', '555', '12323', 'S', 1),
(9, 'test fn', '888', '13213', 'N', 1),
(10, 'OUTRO TESTE FN', '666', '132', 'N', 1),
(11, 'TESTE02 ', '111', '5199995542', 'N', 1),
(12, 'HDFGH', 'dfghdfg', '5199545454', 'S', 1),
(13, 'FASFG', 'lghjf', '1111111111', 'S', 1),
(14, 'LJASDKLFK', 'poerthg6', '1111111111181', 'N', 1),
(15, 'WERBPIRB', '65f4er', '51992009666', 'N', 1),
(16, 'ASDFASD', 'fgsdfgdf', '5132105291', 'N', 1),
(17, 'ASDFSD', '132165', '56159195195', 'N', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `estados`
--

CREATE TABLE `estados` (
  `id` int(11) NOT NULL,
  `ch_sigla` varchar(2) DEFAULT NULL,
  `st_nome` varchar(60) DEFAULT NULL,
  `id_pais` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `locais_referencias`
--

CREATE TABLE `locais_referencias` (
  `id` int(11) NOT NULL,
  `st_dsc` varchar(128) DEFAULT NULL,
  `id_cidade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `pais`
--

CREATE TABLE `pais` (
  `id` int(11) NOT NULL,
  `ch_sigla` varchar(45) DEFAULT NULL,
  `st_nome` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `passageiros`
--

CREATE TABLE `passageiros` (
  `id` int(11) NOT NULL,
  `st_nome` varchar(100) NOT NULL,
  `st_cpf` char(11) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `st_nome` varchar(100) NOT NULL,
  `st_email` varchar(100) NOT NULL,
  `st_senha` char(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `st_nome`, `st_email`, `st_senha`) VALUES
(1, 'Maiquel Leites', 'maiquel@gmail.com', '$2a$08$2VfVOdiu88.N8hWEp/hrFeLrYQ/ZkxhHqK8/Pk3KMnVf0EOsIdR12');

-- --------------------------------------------------------

--
-- Estrutura da tabela `veiculos`
--

CREATE TABLE `veiculos` (
  `id` int(11) NOT NULL,
  `st_placa` varchar(10) DEFAULT NULL,
  `nr_lugares` int(11) DEFAULT NULL,
  `ch_ativo` char(1) NOT NULL DEFAULT 'S',
  `id_empresa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `veiculos`
--

INSERT INTO `veiculos` (`id`, `st_placa`, `nr_lugares`, `ch_ativo`, `id_empresa`) VALUES
(1, 'IQY3336', 4, 'S', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `viagens`
--

CREATE TABLE `viagens` (
  `id` int(11) NOT NULL,
  `vagas` int(11) DEFAULT NULL,
  `hh_horario` time DEFAULT NULL,
  `nr_id_local_referencia_origem` int(11) NOT NULL,
  `nr_id_local_referencia_destino` int(11) NOT NULL,
  `id_veiculo` int(11) NOT NULL,
  `en_situacao` enum('confirmada','aguardando confirmação','cancelada') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `viagens_passageiros`
--

CREATE TABLE `viagens_passageiros` (
  `id` int(11) NOT NULL,
  `id_viagem` int(11) NOT NULL,
  `id_passageiro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cidades`
--
ALTER TABLE `cidades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_Estado` (`id_Estado`);

--
-- Indexes for table `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `estados`
--
ALTER TABLE `estados`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_pais` (`id_pais`);

--
-- Indexes for table `locais_referencias`
--
ALTER TABLE `locais_referencias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cidade` (`id_cidade`);

--
-- Indexes for table `pais`
--
ALTER TABLE `pais`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `passageiros`
--
ALTER TABLE `passageiros`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `veiculos`
--
ALTER TABLE `veiculos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_empresa` (`id_empresa`);

--
-- Indexes for table `viagens`
--
ALTER TABLE `viagens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nr_id_local_referencia_origem` (`nr_id_local_referencia_origem`),
  ADD KEY `nr_id_local_referencia_destino` (`nr_id_local_referencia_destino`),
  ADD KEY `id_veiculo` (`id_veiculo`);

--
-- Indexes for table `viagens_passageiros`
--
ALTER TABLE `viagens_passageiros`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_viagem` (`id_viagem`),
  ADD KEY `id_passageiro` (`id_passageiro`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cidades`
--
ALTER TABLE `cidades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `empresas`
--
ALTER TABLE `empresas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `estados`
--
ALTER TABLE `estados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `locais_referencias`
--
ALTER TABLE `locais_referencias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pais`
--
ALTER TABLE `pais`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `passageiros`
--
ALTER TABLE `passageiros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `veiculos`
--
ALTER TABLE `veiculos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `viagens`
--
ALTER TABLE `viagens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `viagens_passageiros`
--
ALTER TABLE `viagens_passageiros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `cidades`
--
ALTER TABLE `cidades`
  ADD CONSTRAINT `cidades_ibfk_1` FOREIGN KEY (`id_Estado`) REFERENCES `estados` (`id`);

--
-- Limitadores para a tabela `empresas`
--
ALTER TABLE `empresas`
  ADD CONSTRAINT `empresas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Limitadores para a tabela `estados`
--
ALTER TABLE `estados`
  ADD CONSTRAINT `estados_ibfk_1` FOREIGN KEY (`id_pais`) REFERENCES `pais` (`id`);

--
-- Limitadores para a tabela `locais_referencias`
--
ALTER TABLE `locais_referencias`
  ADD CONSTRAINT `locais_referencias_ibfk_1` FOREIGN KEY (`id_cidade`) REFERENCES `cidades` (`id`);

--
-- Limitadores para a tabela `passageiros`
--
ALTER TABLE `passageiros`
  ADD CONSTRAINT `passageiros_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Limitadores para a tabela `veiculos`
--
ALTER TABLE `veiculos`
  ADD CONSTRAINT `veiculos_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id`);

--
-- Limitadores para a tabela `viagens`
--
ALTER TABLE `viagens`
  ADD CONSTRAINT `viagens_ibfk_1` FOREIGN KEY (`nr_id_local_referencia_origem`) REFERENCES `locais_referencias` (`id`),
  ADD CONSTRAINT `viagens_ibfk_2` FOREIGN KEY (`nr_id_local_referencia_destino`) REFERENCES `locais_referencias` (`id`),
  ADD CONSTRAINT `viagens_ibfk_3` FOREIGN KEY (`id_veiculo`) REFERENCES `veiculos` (`id`);

--
-- Limitadores para a tabela `viagens_passageiros`
--
ALTER TABLE `viagens_passageiros`
  ADD CONSTRAINT `viagens_passageiros_ibfk_1` FOREIGN KEY (`id_viagem`) REFERENCES `viagens` (`id`),
  ADD CONSTRAINT `viagens_passageiros_ibfk_2` FOREIGN KEY (`id_passageiro`) REFERENCES `passageiros` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
