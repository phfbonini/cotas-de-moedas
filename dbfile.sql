-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: cotas
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `currencies`
--

DROP TABLE IF EXISTS `currencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `currencies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `symbol` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=341 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currencies`
--

LOCK TABLES `currencies` WRITE;
/*!40000 ALTER TABLE `currencies` DISABLE KEYS */;
INSERT INTO `currencies` VALUES (1,'AED','United Arab Emirates Dirham',''),(2,'AFN','Afghan Afghani',''),(3,'ALL','Albanian Lek',''),(4,'AMD','Armenian Dram',''),(5,'ANG','Netherlands Antillean Guilder',''),(6,'AOA','Angolan Kwanza',''),(7,'ARS','Argentine Peso',''),(8,'AUD','Australian Dollar',''),(9,'AWG','Aruban Florin',''),(10,'AZN','Azerbaijani Manat',''),(11,'BAM','Bosnia-Herzegovina Convertible Mark',''),(12,'BBD','Barbadian Dollar',''),(13,'BDT','Bangladeshi Taka',''),(14,'BGN','Bulgarian Lev',''),(15,'BHD','Bahraini Dinar',''),(16,'BIF','Burundian Franc',''),(17,'BMD','Bermudan Dollar',''),(18,'BND','Brunei Dollar',''),(19,'BOB','Bolivian Boliviano',''),(20,'BRL','Brazilian Real',''),(21,'BSD','Bahamian Dollar',''),(22,'BTC','Bitcoin',''),(23,'BTN','Bhutanese Ngultrum',''),(24,'BWP','Botswanan Pula',''),(25,'BYN','New Belarusian Ruble',''),(26,'BYR','Belarusian Ruble',''),(27,'BZD','Belize Dollar',''),(28,'CAD','Canadian Dollar',''),(29,'CDF','Congolese Franc',''),(30,'CHF','Swiss Franc',''),(31,'CLF','Chilean Unit of Account (UF)',''),(32,'CLP','Chilean Peso',''),(33,'CNY','Chinese Yuan',''),(34,'COP','Colombian Peso',''),(35,'CRC','Costa Rican Colón',''),(36,'CUC','Cuban Convertible Peso',''),(37,'CUP','Cuban Peso',''),(38,'CVE','Cape Verdean Escudo',''),(39,'CZK','Czech Republic Koruna',''),(40,'DJF','Djiboutian Franc',''),(41,'DKK','Danish Krone',''),(42,'DOP','Dominican Peso',''),(43,'DZD','Algerian Dinar',''),(44,'EGP','Egyptian Pound',''),(45,'ERN','Eritrean Nakfa',''),(46,'ETB','Ethiopian Birr',''),(47,'EUR','Euro',''),(48,'FJD','Fijian Dollar',''),(49,'FKP','Falkland Islands Pound',''),(50,'GBP','British Pound Sterling',''),(51,'GEL','Georgian Lari',''),(52,'GGP','Guernsey Pound',''),(53,'GHS','Ghanaian Cedi',''),(54,'GIP','Gibraltar Pound',''),(55,'GMD','Gambian Dalasi',''),(56,'GNF','Guinean Franc',''),(57,'GTQ','Guatemalan Quetzal',''),(58,'GYD','Guyanaese Dollar',''),(59,'HKD','Hong Kong Dollar',''),(60,'HNL','Honduran Lempira',''),(61,'HRK','Croatian Kuna',''),(62,'HTG','Haitian Gourde',''),(63,'HUF','Hungarian Forint',''),(64,'IDR','Indonesian Rupiah',''),(65,'ILS','Israeli New Sheqel',''),(66,'IMP','Manx pound',''),(67,'INR','Indian Rupee',''),(68,'IQD','Iraqi Dinar',''),(69,'IRR','Iranian Rial',''),(70,'ISK','Icelandic Króna',''),(71,'JEP','Jersey Pound',''),(72,'JMD','Jamaican Dollar',''),(73,'JOD','Jordanian Dinar',''),(74,'JPY','Japanese Yen',''),(75,'KES','Kenyan Shilling',''),(76,'KGS','Kyrgystani Som',''),(77,'KHR','Cambodian Riel',''),(78,'KMF','Comorian Franc',''),(79,'KPW','North Korean Won',''),(80,'KRW','South Korean Won',''),(81,'KWD','Kuwaiti Dinar',''),(82,'KYD','Cayman Islands Dollar',''),(83,'KZT','Kazakhstani Tenge',''),(84,'LAK','Laotian Kip',''),(85,'LBP','Lebanese Pound',''),(86,'LKR','Sri Lankan Rupee',''),(87,'LRD','Liberian Dollar',''),(88,'LSL','Lesotho Loti',''),(89,'LTL','Lithuanian Litas',''),(90,'LVL','Latvian Lats',''),(91,'LYD','Libyan Dinar',''),(92,'MAD','Moroccan Dirham',''),(93,'MDL','Moldovan Leu',''),(94,'MGA','Malagasy Ariary',''),(95,'MKD','Macedonian Denar',''),(96,'MMK','Myanma Kyat',''),(97,'MNT','Mongolian Tugrik',''),(98,'MOP','Macanese Pataca',''),(99,'MRO','Mauritanian Ouguiya',''),(100,'MUR','Mauritian Rupee',''),(101,'MVR','Maldivian Rufiyaa',''),(102,'MWK','Malawian Kwacha',''),(103,'MXN','Mexican Peso',''),(104,'MYR','Malaysian Ringgit',''),(105,'MZN','Mozambican Metical',''),(106,'NAD','Namibian Dollar',''),(107,'NGN','Nigerian Naira',''),(108,'NIO','Nicaraguan Córdoba',''),(109,'NOK','Norwegian Krone',''),(110,'NPR','Nepalese Rupee',''),(111,'NZD','New Zealand Dollar',''),(112,'OMR','Omani Rial',''),(113,'PAB','Panamanian Balboa',''),(114,'PEN','Peruvian Nuevo Sol',''),(115,'PGK','Papua New Guinean Kina',''),(116,'PHP','Philippine Peso',''),(117,'PKR','Pakistani Rupee',''),(118,'PLN','Polish Zloty',''),(119,'PYG','Paraguayan Guarani',''),(120,'QAR','Qatari Rial',''),(121,'RON','Romanian Leu',''),(122,'RSD','Serbian Dinar',''),(123,'RUB','Russian Ruble',''),(124,'RWF','Rwandan Franc',''),(125,'SAR','Saudi Riyal',''),(126,'SBD','Solomon Islands Dollar',''),(127,'SCR','Seychellois Rupee',''),(128,'SDG','Sudanese Pound',''),(129,'SEK','Swedish Krona',''),(130,'SGD','Singapore Dollar',''),(131,'SHP','Saint Helena Pound',''),(132,'SLE','Sierra Leonean Leone',''),(133,'SLL','Sierra Leonean Leone',''),(134,'SOS','Somali Shilling',''),(135,'SRD','Surinamese Dollar',''),(136,'STD','São Tomé and Príncipe Dobra',''),(137,'SVC','Salvadoran Colón',''),(138,'SYP','Syrian Pound',''),(139,'SZL','Swazi Lilangeni',''),(140,'THB','Thai Baht',''),(141,'TJS','Tajikistani Somoni',''),(142,'TMT','Turkmenistani Manat',''),(143,'TND','Tunisian Dinar',''),(144,'TOP','Tongan Paʻanga',''),(145,'TRY','Turkish Lira',''),(146,'TTD','Trinidad and Tobago Dollar',''),(147,'TWD','New Taiwan Dollar',''),(148,'TZS','Tanzanian Shilling',''),(149,'UAH','Ukrainian Hryvnia',''),(150,'UGX','Ugandan Shilling',''),(151,'USD','United States Dollar',''),(152,'UYU','Uruguayan Peso',''),(153,'UZS','Uzbekistan Som',''),(154,'VEF','Venezuelan Bolívar Fuerte',''),(155,'VES','Sovereign Bolivar',''),(156,'VND','Vietnamese Dong',''),(157,'VUV','Vanuatu Vatu',''),(158,'WST','Samoan Tala',''),(159,'XAF','CFA Franc BEAC',''),(160,'XAG','Silver (troy ounce)',''),(161,'XAU','Gold (troy ounce)',''),(162,'XCD','East Caribbean Dollar',''),(163,'XDR','Special Drawing Rights',''),(164,'XOF','CFA Franc BCEAO',''),(165,'XPF','CFP Franc',''),(166,'YER','Yemeni Rial',''),(167,'ZAR','South African Rand',''),(168,'ZMK','Zambian Kwacha (pre-2013)',''),(169,'ZMW','Zambian Kwacha',''),(170,'ZWL','Zimbabwean Dollar','');
/*!40000 ALTER TABLE `currencies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotes`
--

DROP TABLE IF EXISTS `quotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quotes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `source_currency` varchar(10) NOT NULL,
  `quote_date` date NOT NULL,
  `rates` json NOT NULL,
  PRIMARY KEY (`id`),
  KEY `source_currency` (`source_currency`),
  KEY `quote_date` (`quote_date`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotes`
--

LOCK TABLES `quotes` WRITE;
/*!40000 ALTER TABLE `quotes` DISABLE KEYS */;
INSERT INTO `quotes` VALUES (1,'USD','2023-05-03','{\"USDBRL\": 4.99582, \"USDEUR\": 0.90373, \"USDJPY\": 134.570497}'),(2,'USD','2023-05-03','{\"USDBRL\": 4.995602, \"USDEUR\": 0.90377, \"USDJPY\": 134.560232}'),(3,'USD','2023-05-03','{\"USDEUR\": 0.903398}');
/*!40000 ALTER TABLE `quotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `searches`
--

DROP TABLE IF EXISTS `searches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `searches` (
  `id` int NOT NULL AUTO_INCREMENT,
  `source_currency` varchar(10) NOT NULL,
  `target_currencies` json NOT NULL,
  `search_date` datetime NOT NULL,
  `quote_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `source_currency` (`source_currency`),
  KEY `search_date` (`search_date`),
  KEY `quote_id` (`quote_id`),
  CONSTRAINT `searches_ibfk_1` FOREIGN KEY (`quote_id`) REFERENCES `quotes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `searches`
--

LOCK TABLES `searches` WRITE;
/*!40000 ALTER TABLE `searches` DISABLE KEYS */;
INSERT INTO `searches` VALUES (1,'USD','[\"EUR\", \"BRL\", \"JPY\"]','2023-05-03 20:09:01',1),(2,'USD','[\"BRL\", \"EUR\", \"JPY\"]','2023-05-03 20:10:11',2),(3,'USD','[\"EUR\"]','2023-05-03 20:58:34',3);
/*!40000 ALTER TABLE `searches` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-03 21:48:14
