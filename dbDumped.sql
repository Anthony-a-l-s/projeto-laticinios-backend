CREATE DATABASE /*!32312 IF NOT EXISTS*/ `Laticinios` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `Laticinios`;

--
-- Table structure for table `Company`
--

DROP TABLE IF EXISTS `Company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Company` (
  `legalPersonId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `corporateName` varchar(255) NOT NULL,
  `fantasyName` varchar(255) NOT NULL,
  `cnpj` varchar(30) NOT NULL,
  `stateRegistration` varchar(30) NOT NULL,
  `municipalRegistration` varchar(30) NOT NULL,
  `active` tinyint(1) NOT NULL,
  PRIMARY KEY (`legalPersonId`),
  KEY `userId` (`userId`),
  CONSTRAINT `Company_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Company`
--

LOCK TABLES `Company` WRITE;
/*!40000 ALTER TABLE `Company` DISABLE KEYS */;
/*!40000 ALTER TABLE `Company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acess`
--

DROP TABLE IF EXISTS `acess`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acess` (
  `acessId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `TimestampLogin` timestamp NOT NULL,
  `TimestampLogout` timestamp NOT NULL,
  `ip` varchar(16) NOT NULL,
  `latitude` varchar(500) NOT NULL,
  `longitude` varchar(500) NOT NULL,
  PRIMARY KEY (`acessId`),
  KEY `userId` (`userId`),
  CONSTRAINT `acess_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
);

--
-- Dumping data for table `acess`
--

LOCK TABLES `acess` WRITE;
/*!40000 ALTER TABLE `acess` DISABLE KEYS */;
/*!40000 ALTER TABLE `acess` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `addressId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `zipCode` varchar(9) NOT NULL,
  `city` varchar(50) NOT NULL,
  `district` varchar(50) NOT NULL,
  `street` varchar(50) NOT NULL,
  `state` varchar(2) NOT NULL,
  `number` varchar(6) NOT NULL,
  `complement` varchar(50) NOT NULL,
  `phone` varchar(12) NOT NULL,
  PRIMARY KEY (`addressId`),
  KEY `userId` (`userId`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `checklist`
--

DROP TABLE IF EXISTS `checklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checklist` (
  `checklistId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `active` tinyint(1) NOT NULL,
  `Title` varchar(500) NOT NULL,
  `creationDate` varchar(500) NOT NULL,
  PRIMARY KEY (`checklistId`),
  UNIQUE KEY `userId` (`userId`),
  CONSTRAINT `checklist_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
);
/*!40101 SET character_set_client = @saved_cs_client */;


CREATE TABLE `Entity` (
  `entityId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`entityId`),
  KEY `userId` (`userId`),
  CONSTRAINT `Entity_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
);

--
-- Dumping data for table `checklist`
--

LOCK TABLES `checklist` WRITE;
/*!40000 ALTER TABLE `checklist` DISABLE KEYS */;
/*!40000 ALTER TABLE `checklist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instruments`
--

DROP TABLE IF EXISTS `instruments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instruments` (
  `instrumentId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `IdentificationCode` varchar(20) NOT NULL,
  `lastCalibration` varchar(500) NOT NULL,
  `nextCalibration` varchar(500) NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`instrumentId`),
  KEY `userId` (`userId`),
  CONSTRAINT `instruments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instruments`
--

LOCK TABLES `instruments` WRITE;
/*!40000 ALTER TABLE `instruments` DISABLE KEYS */;
/*!40000 ALTER TABLE `instruments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `loginId` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(256) NOT NULL,
  PRIMARY KEY (`loginId`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `password` (`password`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `naturalPerson`
--

DROP TABLE IF EXISTS `naturalPerson`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `naturalPerson` (
  `naturalPersonId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `cpf` varchar(15) NOT NULL,
  `rg` varchar(15) NOT NULL,
  PRIMARY KEY (`naturalPersonId`),
  KEY `userId` (`userId`),
  CONSTRAINT `naturalPerson_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `naturalPerson`
--

LOCK TABLES `naturalPerson` WRITE;
/*!40000 ALTER TABLE `naturalPerson` DISABLE KEYS */;
/*!40000 ALTER TABLE `naturalPerson` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `notificationId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`notificationId`),
  KEY `userId` (`userId`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productCategory`
--

DROP TABLE IF EXISTS `productCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productCategory` (
  `productcategoryId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT 'nome da categoria',
  PRIMARY KEY (`productcategoryId`),
  UNIQUE KEY `productcategoryId` (`productcategoryId`),
  UNIQUE KEY `name` (`name`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productCategory`
--

LOCK TABLES `productCategory` WRITE;
/*!40000 ALTER TABLE `productCategory` DISABLE KEYS */;
/*!40000 ALTER TABLE `productCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productProvider`
--

DROP TABLE IF EXISTS `productProvider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productProvider` (
  `productProviderId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT 'nome do fornecedor',
  `identificationDocument` int NOT NULL COMMENT 'documento de indentificação(CNPJ ou CPF)',
  PRIMARY KEY (`productProviderId`),
  UNIQUE KEY `productProviderId` (`productProviderId`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productProvider`
--

LOCK TABLES `productProvider` WRITE;
/*!40000 ALTER TABLE `productProvider` DISABLE KEYS */;
/*!40000 ALTER TABLE `productProvider` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `productId` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(255) NOT NULL COMMENT 'nome do produto',
  `productCode` varchar(255) NOT NULL COMMENT 'codigo do produto',
  `productlabel` varchar(255) NOT NULL COMMENT 'rotulo do produto',
  `startOfManufacture` varchar(255) DEFAULT NULL COMMENT 'inicio da fabricação',
  `endOfManufacture` varchar(255) DEFAULT NULL COMMENT 'data de validade',
  `productProviderId` int DEFAULT NULL COMMENT 'id do fornecedor',
  `productCategoryId` int DEFAULT NULL COMMENT 'categoria do produto',
  PRIMARY KEY (`productId`),
  UNIQUE KEY `productId` (`productId`),
  KEY `productCategoryId` (`productCategoryId`),
  KEY `productProviderId` (`productProviderId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`productCategoryId`) REFERENCES `productCategory` (`productcategoryId`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`productProviderId`) REFERENCES `productProvider` (`productProviderId`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `questionId` int NOT NULL AUTO_INCREMENT,
  `description` varchar(1500) NOT NULL,
  `topicId` int NOT NULL,
  PRIMARY KEY (`questionId`),
  UNIQUE KEY `questionId` (`questionId`),
  KEY `topicId` (`topicId`),
  CONSTRAINT `question_ibfk_1` FOREIGN KEY (`topicId`) REFERENCES `topic` (`topicId`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `response`
--

DROP TABLE IF EXISTS `response`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `response` (
  `responseId` int NOT NULL AUTO_INCREMENT,
  `questionId` int NOT NULL,
  `userId` int NOT NULL,
  `response` int NOT NULL,
  `responseDate` timestamp NOT NULL,
  `observation` varchar(1500) NOT NULL,
  `latitude` varchar(500) NOT NULL,
  `longitude` varchar(500) NOT NULL,
  PRIMARY KEY (`responseId`),
  UNIQUE KEY `responseId` (`responseId`),
  UNIQUE KEY `questionId` (`questionId`),
  KEY `userId` (`userId`),
  CONSTRAINT `response_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  CONSTRAINT `response_ibfk_2` FOREIGN KEY (`questionId`) REFERENCES `question` (`questionId`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `response`
--

LOCK TABLES `response` WRITE;
/*!40000 ALTER TABLE `response` DISABLE KEYS */;
/*!40000 ALTER TABLE `response` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `responseImage`
--

DROP TABLE IF EXISTS `responseImage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `responseImage` (
  `responseImagesId` int NOT NULL AUTO_INCREMENT,
  `responseId` int NOT NULL,
  `imageFileName` varchar(500) NOT NULL,
  PRIMARY KEY (`responseImagesId`),
  KEY `responseId` (`responseId`),
  CONSTRAINT `responseImage_ibfk_1` FOREIGN KEY (`responseId`) REFERENCES `response` (`responseId`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responseImage`
--

LOCK TABLES `responseImage` WRITE;
/*!40000 ALTER TABLE `responseImage` DISABLE KEYS */;
/*!40000 ALTER TABLE `responseImage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic`
--

DROP TABLE IF EXISTS `topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic` (
  `topicId` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(500) NOT NULL,
  `checklistId` int NOT NULL,
  PRIMARY KEY (`topicId`),
  KEY `checklistId` (`checklistId`),
  CONSTRAINT `topic_ibfk_1` FOREIGN KEY (`checklistId`) REFERENCES `checklist` (`checklistId`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic`
--

LOCK TABLES `topic` WRITE;
/*!40000 ALTER TABLE `topic` DISABLE KEYS */;
/*!40000 ALTER TABLE `topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `loginId` int UNIQUE NOT NULL,
  `Entity` int NOT NULL,
  `hasCompany` tinyint(1) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `registro` varchar(100) NOT NULL,
  PRIMARY KEY (`userId`),
  KEY `loginId` (`loginId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`loginId`) REFERENCES `login` (`loginId`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'Laticinios'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-12 20:54:43

