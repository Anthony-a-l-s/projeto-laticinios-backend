CREATE TABLE `login` (
  `loginId` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `email` varchar(50) UNIQUE NOT NULL,
  `password` varchar(256) UNIQUE NOT NULL
);

CREATE TABLE `users` (
  `userId` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `loginId` int UNIQUE NOT NULL,
  `Entity` varchar(50)[] NOT NULL,
  `hasCompany` tinyint(1) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `registro` varchar(100) NOT NULL
);

CREATE TABLE `address` (
  `addressId` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `zipCode` varchar(9) NOT NULL,
  `city` varchar(50) NOT NULL,
  `district` varchar(50) NOT NULL,
  `street` varchar(50) NOT NULL,
  `state` varchar(2) NOT NULL,
  `number` varchar(6) NOT NULL,
  `complement` varchar(50) NOT NULL,
  `phone` varchar(12) NOT NULL
);

CREATE TABLE `acess` (
  `acessId` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `TimestampLogin` timestamp NOT NULL,
  `TimestampLogout` timestamp NOT NULL,
  `ip` varchar(16) NOT NULL,
  `latitude` varchar(500) NOT NULL,
  `longitude` varchar(500) NOT NULL
);

CREATE TABLE `Company` (
  `legalPersonId` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `corporateName` varchar(255) NOT NULL,
  `fantasyName` varchar(255) NOT NULL,
  `cnpj` varchar(30) NOT NULL,
  `stateRegistration` varchar(30) NOT NULL,
  `municipalRegistration` varchar(30) NOT NULL,
  `active` boolean NOT NULL
);

CREATE TABLE `Entity` (
  `entityId` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `name` varchar(20) NOT NULL,
);

CREATE TABLE `naturalPerson` (
  `naturalPersonId` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `cpf` varchar(15) NOT NULL,
  `rg` varchar(15) NOT NULL
);

CREATE TABLE `notifications` (
  `notificationId` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `description` varchar(255) NOT NULL
);

CREATE TABLE `checklist` (
  `checklistId` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `active` boolean NOT NULL,
  `Title` varchar(500) NOT NULL,
  `creationDate` varchar(500) NOT NULL
);

CREATE TABLE `question` (
  `questionId` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `description` varchar(1500) NOT NULL,
  `topicId` int NOT NULL
);

CREATE TABLE `topic` (
  `topicId` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `Title` varchar(500) NOT NULL,
  `checklistId` int NOT NULL
);

CREATE TABLE `response` (
  `responseId` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `questionId` int UNIQUE NOT NULL,
  `userId` int NOT NULL,
  `response` int NOT NULL,
  `responseDate` timestamp NOT NULL,
  `observation` varchar(1500) NOT NULL,
  `latitude` varchar(500) NOT NULL,
  `longitude` varchar(500) NOT NULL
);

CREATE TABLE `responseImage` (
  `responseImagesId` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `responseId` int NOT NULL,
  `imageFileName` varchar(500) NOT NULL
);

CREATE TABLE `instruments` (
  `instrumentId` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `IdentificationCode` varchar(20) NOT NULL,
  `lastCalibration` varchar(500) NOT NULL,
  `nextCalibration` varchar(500) NOT NULL,
  `userId` int NOT NULL
);

CREATE TABLE `products` (
  `productId` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `productName` varchar(255) NOT NULL COMMENT 'nome do produto',
  `productCode` varchar(255) NOT NULL COMMENT 'codigo do produto',
  `productlabel` varchar(255) NOT NULL COMMENT 'rotulo do produto',
  `startOfManufacture` varchar(255) COMMENT 'inicio da fabricação',
  `endOfManufacture` varchar(255) COMMENT 'data de validade',
  `productProviderId` int COMMENT 'id do fornecedor',
  `productCategoryId` int COMMENT 'categoria do produto'
);

CREATE TABLE `productProvider` (
  `productProviderId` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT 'nome do fornecedor',
  `identificationDocument` int(14) NOT NULL COMMENT 'documento de indentificação(CNPJ ou CPF)'
);

CREATE TABLE `productCategory` (
  `productcategoryId` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) UNIQUE NOT NULL COMMENT 'nome da categoria'
);

ALTER TABLE `login` COMMENT = 'Login e senha do usuário';

ALTER TABLE `acess` COMMENT = 'Dados sobre cada acesso no sistema';

ALTER TABLE `instruments` COMMENT = 'instrumentos do controle de calibrão';

ALTER TABLE `products` ADD FOREIGN KEY (`productCategoryId`) REFERENCES `productCategory` (`productcategoryId`);

ALTER TABLE `products` ADD FOREIGN KEY (`productProviderId`) REFERENCES `productProvider` (`productProviderId`);

ALTER TABLE `users` ADD FOREIGN KEY (`loginId`) REFERENCES `login` (`loginId`);

ALTER TABLE `address` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `checklist` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `response` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `response` ADD FOREIGN KEY (`questionId`) REFERENCES `question` (`questionId`);

ALTER TABLE `question` ADD FOREIGN KEY (`topicId`) REFERENCES `topic` (`topicId`);

ALTER TABLE `responseImage` ADD FOREIGN KEY (`responseId`) REFERENCES `response` (`responseId`);

ALTER TABLE `Company` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `naturalPerson` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `notifications` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `topic` ADD FOREIGN KEY (`checklistId`) REFERENCES `checklist` (`checklistId`);

ALTER TABLE `users` ADD FOREIGN KEY (`userId`) REFERENCES `acess` (`userId`);

ALTER TABLE `instruments` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `Entity` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);
