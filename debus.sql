DROP DATABASE IF EXISTS debus;
CREATE DATABASE IF NOT EXISTS debus DEFAULT CHARACTER SET utf8 ;
USE debus;

DROP TABLE IF EXISTS debus.usuarios;
CREATE TABLE IF NOT EXISTS debus.usuarios (
  id     	INT          NOT NULL AUTO_INCREMENT,
  st_nome   VARCHAR(100) NOT NULL,
  st_email  VARCHAR(100) NOT NULL,
  st_senha  CHAR(128)    NOT NULL,
  
  PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


DROP TABLE IF EXISTS debus.empresas;
CREATE TABLE IF NOT EXISTS debus.empresas (
  id         INT NOT NULL AUTO_INCREMENT,
  st_recefi  VARCHAR(45) NULL,
  st_cel     VARCHAR(13) NULL,
  
  id_usuario INT NOT NULL,
  
  PRIMARY KEY (id),
  FOREIGN KEY (id_usuario) REFERENCES debus.usuarios (id) 
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


DROP TABLE IF EXISTS debus.veiculos;
CREATE TABLE IF NOT EXISTS debus.veiculos (
  id          INT NOT NULL AUTO_INCREMENT,  
  st_placa    VARCHAR(10) NULL,
  nr_lugares  INT NULL,
  id_empresa  INT NOT NULL,
  
  PRIMARY KEY (id),
  FOREIGN KEY (id_empresa) REFERENCES debus.empresas (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


DROP TABLE IF EXISTS debus.pais;
CREATE TABLE IF NOT EXISTS debus.pais (
  id     	INT NOT NULL AUTO_INCREMENT,
  ch_sigla  VARCHAR(45) NULL,
  st_nome   VARCHAR(60) NULL,
  
  PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


DROP TABLE IF EXISTS debus.Estados ;
CREATE TABLE IF NOT EXISTS debus.Estados (
  id       INT NOT NULL AUTO_INCREMENT,
  ch_sigla VARCHAR(2) NULL,
  st_nome  VARCHAR(60) NULL,
  id_pais  INT NOT NULL,
  
  PRIMARY KEY (id),
  FOREIGN KEY (id_pais) REFERENCES debus.pais (id) 
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


DROP TABLE IF EXISTS debus.cidades ;
CREATE TABLE IF NOT EXISTS debus.cidades (
  id        INT NOT NULL AUTO_INCREMENT,
  id_Estado INT NOT NULL,
  st_nome   VARCHAR(128) NOT NULL,
  ibge      INT NOT NULL,
  
  PRIMARY KEY (id),
  FOREIGN KEY (id_Estado) REFERENCES debus.Estados (id) 
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


DROP TABLE IF EXISTS debus.locais_referencias;
CREATE TABLE IF NOT EXISTS debus.locais_referencias (
  id        INT NOT NULL AUTO_INCREMENT,
  st_dsc    VARCHAR(128) NULL,
  id_cidade INT NOT NULL,
  
  PRIMARY KEY (id),
  FOREIGN KEY (id_cidade) REFERENCES debus.cidades (id) 
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


DROP TABLE IF EXISTS debus.viagens;
CREATE TABLE IF NOT EXISTS debus.viagens (
  id                          	 INT NOT NULL AUTO_INCREMENT,
  vagas                       	 INT NULL, 
  hh_horario                  	 TIME NULL,
  nr_id_local_referencia_origem  INT NOT NULL,
  nr_id_local_referencia_destino INT NOT NULL,   
  id_veiculo                     INT NOT NULL,  
  en_situacao                    ENUM('confirmada', 'aguardando confirmação', 'cancelada') NULL,
  
  
  PRIMARY KEY (id),
  FOREIGN KEY (nr_id_local_referencia_origem) REFERENCES debus.locais_referencias (id),  
  FOREIGN KEY (nr_id_local_referencia_destino)REFERENCES debus.locais_referencias (id),    
  FOREIGN KEY (id_veiculo)                 REFERENCES debus.veiculos          (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;



DROP TABLE IF EXISTS debus.passageiros; 
CREATE TABLE IF NOT EXISTS debus.passageiros (
  id         INT NOT NULL AUTO_INCREMENT,  
  st_nome       VARCHAR(100) NOT NULL,
  st_cpf       	CHAR(11) NULL,
  
  id_usuario INT NOT NULL,
  
  PRIMARY KEY (id),
  FOREIGN KEY (id_usuario) REFERENCES debus.usuarios (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;



DROP TABLE IF EXISTS debus.viagens_passageiros ;
CREATE TABLE IF NOT EXISTS debus.viagens_passageiros (
  id               INT NOT NULL AUTO_INCREMENT,
  id_viagem        INT NOT NULL,
  id_passageiro    INT NOT NULL,
  
  PRIMARY KEY (id), 
  FOREIGN KEY (id_viagem)        REFERENCES debus.viagens (id),
  FOREIGN KEY (id_passageiro) REFERENCES debus.passageiros (id)
    
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;