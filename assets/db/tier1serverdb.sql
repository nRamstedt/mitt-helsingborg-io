-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Feb 21, 2019 at 01:52 PM
-- Server version: 5.6.34-log
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tier1serverdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `forms`
--

CREATE TABLE `forms` (
  `Id` int(10) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `PersonalNumber` varchar(50) NOT NULL,
  `Address` varchar(100) NOT NULL,
  `ZipCode` varchar(10) NOT NULL,
  `City` varchar(50) NOT NULL,
  `Status` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `forms`
--

INSERT INTO `forms` (`Id`, `Name`, `PersonalNumber`, `Address`, `ZipCode`, `City`, `Status`) VALUES
(1, 'Tom Andreasson', '198404293279', 'Drottninggatan 1', '11120', 'Stockholm', 0),
(2, 'Tom Andreasson', '198404293279', 'Drottninggatan 1', '11120', 'Stockholm', 0),
(3, 'Tom Andreasson', '198404293279', 'Drottninggatan 1', '11120', 'Stockholm', 0),
(4, 'Tom Andreasson', '198404293279', 'Drottninggatan 1', '11120', 'Stockholm', 0),
(5, 'Tom Andreasson', '198404293279', 'Drottninggatan 1', '11120', 'Stockholm', 0),
(6, 'Tom Andreasson', '198404293279', 'Drottninggatan 1', '11120', 'Stockholm', 0),
(7, 'Tom Andreasson', '198404293279', 'Drottninggatan 1', '11120', 'Stockholm', 0),
(8, 'Tom Andreasson', '198404293279', 'Drottninggatan 1', '11120', 'Stockholm', 0),
(9, 'Tom Andreasson', '198404293279', 'Drottninggatan 1', '11120', 'Stockholm', 0),
(10, 'Tom Andreasson', '198404293279', 'Drottninggatan 1', '11120', 'Stockholm', 0),
(11, 'Tom Andreasson', '198404293279', 'Drottninggatan 1', '11121', 'Stockholm', 0),
(12, 'Tom Andreasson', '198404293279', 'Drottninggatan 1', '11120', 'Stockholm', 0),
(13, 'Tom Andreasson', '198404293279', 'Drottninggatan 1', '11120', 'Stockholm', 0),
(14, 'Tom Andreasson', '198404293279', 'Drottninggatan 1', '11120', 'Stockholm', 0),
(15, 'Tom Andreasson', '198404293279', 'Drottninggatan 1', '11120', 'Stockholm', 0),
(16, 'Tom Andreasson', '198404293279', 'Drottninggatan 1', '11120', 'Stockholm', 0),
(17, 'Tom Andreasson', '198404293279', 'Drottninggatan 1', '11120', 'Stockholm', 0),
(18, 'Tom Andreasson', '198404293279', 'Drottninggatan 1', '11120', 'Stockholm', 0),
(19, 'Tom Andreasson', '198404293279', 'Drottninggatan 1', '11120', 'Stockholm', 0),
(20, 'Tom Andreasson', '198404293279', 'Drottninggatan 1', '11120', 'Stockholm', 0);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `Id` int(10) NOT NULL,
  `Date` datetime(6) NOT NULL,
  `UserId` int(100) NOT NULL,
  `TotalAmount` decimal(65,0) NOT NULL,
  `Status` int(3) NOT NULL,
  `ExternalOrderId` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`Id`, `Date`, `UserId`, `TotalAmount`, `Status`, `ExternalOrderId`) VALUES
(24, '0000-00-00 00:00:00.000000', 1, 375, 200, '1024'),
(25, '0000-00-00 00:00:00.000000', 1, 375, 200, '1025'),
(26, '0000-00-00 00:00:00.000000', 3, 375, 200, '1026');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int(10) NOT NULL,
  `PersonalNumber` varchar(100) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `SurName` varchar(100) NOT NULL,
  `Address` varchar(200) NOT NULL,
  `ZipCode` varchar(10) NOT NULL,
  `City` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `PersonalNumber`, `Name`, `SurName`, `Address`, `ZipCode`, `City`) VALUES
(3, '198404293279', 'Tom', 'Andreasson', 'Drottninggatan 2', '11120', 'Stockholm'),
(4, '198912046995', 'Tom', 'Andreasson', 'Drottninggatan 2', '11120', 'Stockholm');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `forms`
--
ALTER TABLE `forms`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `forms`
--
ALTER TABLE `forms`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
