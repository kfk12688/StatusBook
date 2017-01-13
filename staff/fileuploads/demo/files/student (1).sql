-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 29, 2015 at 11:50 AM
-- Server version: 5.5.16
-- PHP Version: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `csebatch2011`
--

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE IF NOT EXISTS `sports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `regno` varchar(225) NOT NULL,
  `fname` varchar(20) NOT NULL,
  `lname` varchar(20) NOT NULL,
  `email` text NOT NULL,
  `npassword` text NOT NULL,
  `cpassword` text NOT NULL,
  `dob` varchar(10) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `mobile` double NOT NULL,
  `amobile` double NOT NULL,
  `paddress` text NOT NULL,
  `taddress` text NOT NULL,
  `nationality` text NOT NULL,
  `relegion` text NOT NULL,
  `hobbies` text NOT NULL,
  `aoi` text NOT NULL,
  `profile_image` varchar(1000) NOT NULL,
  `coverphoto` text NOT NULL,
  `lilostatus` varchar(20) NOT NULL,
  `profile_image_small` varchar(1000) NOT NULL,
  `subject` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=69 ;

--
-- Dumping data for table `student`
--

INSERT INTO `sports` (`id`, `regno`, `fname`, `lname`, `email`, `npassword`, `cpassword`, `dob`, `gender`, `mobile`, `amobile`, `paddress`, `taddress`, `nationality`, `relegion`, `hobbies`, `aoi`, `profile_image`, `coverphoto`, `lilostatus`, `profile_image_small`, `subject`) VALUES
(50, '710311104035', 'sathish', 'subramaniam', 'sathishk746@gmail.com', '710311104035', '', '09/30/1993', '', 8344335123, 7708430211, 'Dharapuram', 'Dharapuram', 'Indian', 'Hindhu', 'playing', 'network', '', '', 'Offline', '', 'cs2401'),
(52, '710311104023', 'CSE', '', '', '710311104023', '', '', '', 0, 0, '', '', '', '', '', '', '', '', '', '', ''),
(53, '710311104034', 'CSE', '', '', '710311104034', '', '', '', 0, 0, '', '', '', '', '', '', '', '', 'Online', '', ''),
(55, '710311104501', 'sanila', '', '', '710311104501', '', '', '', 0, 0, '', '', '', '', '', '', '', '', 'Offline', '', ''),
(56, '710311104303', 'CSE', '', '', '710311104303', '', '', '', 0, 0, '', '', '', '', '', '', '', '', '', '', ''),
(57, '3545', 'English Club', '', '', '3545', '', '', '', 0, 0, '', '', '', '', '', '', '', '', 'Offline', '', ''),
(59, '3546', 'Maths Club', '', '', '3546', '', '', '', 0, 0, '', '', '', '', '', '', '', '', 'Online', '', ''),
(60, '3547', 'Nss', '', '', '3547', '', '', '', 0, 0, '', '', '', '', '', '', '', '', 'Offline', '', ''),
(61, '3548', 'Sparc', '', '', '3548', '', '', '', 0, 0, '', '', '', '', '', '', '', '', 'Offline', '', ''),
(62, '4553', 'Saravanan', 'B', '', '4553', '', '', '', 0, 0, '', '', '', '', '', '', '', '', 'Online', '', 'cs2401'),
(63, '4554', 'Staff2', '', '', '4554', '', '', '', 0, 0, '', '', '', '', '', '', '', '', '', '', ''),
(64, '4555', 'Staff3', '', '', '4555', '', '', '', 0, 0, '', '', '', '', '', '', '', '', 'Online', '', 'ma2111'),
(65, '4556', 'Staff4', '', '', '4556', '', '', '', 0, 0, '', '', '', '', '', '', '', '', '', '', ''),
(66, '4557', 'Staff5', '', '', '4557', '', '', '', 0, 0, '', '', '', '', '', '', '', '', '', '', ''),
(67, '4558', 'Ramasamy', '', '', '4558', '', '', '', 0, 0, '', '', '', '', '', '', '', '', 'Online', '', ''),
(68, '710311104029', 'CSE', '', '', '710311104029', '', '', '', 0, 0, '', '', '', '', '', '', '', '', '', '', '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
