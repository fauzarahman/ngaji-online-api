-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Waktu pembuatan: 26. Mei 2025 jam 09:43
-- Versi Server: 5.1.41
-- Versi PHP: 5.3.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ngaji-yuk`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `answers`
--

CREATE TABLE IF NOT EXISTS `answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quiz_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `instructor_id` int(11) NOT NULL,
  `reply_to` int(11) DEFAULT NULL,
  `answer_type` varchar(100) NOT NULL,
  `answer_value` text NOT NULL,
  `checked_by` int(11) DEFAULT NULL,
  `is_passed` int(1) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `review_notes` varchar(255) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data untuk tabel `answers`
--


-- --------------------------------------------------------

--
-- Struktur dari tabel `discussion`
--

CREATE TABLE IF NOT EXISTS `discussion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `modules_id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data untuk tabel `discussion`
--

INSERT INTO `discussion` (`id`, `modules_id`, `parent_id`, `user_id`, `content`, `created_date`, `updated_date`) VALUES
(1, 1, NULL, 3, 'Bagaimana cara begitu ?', '2025-04-20 19:06:42', '2025-04-20 19:06:42'),
(2, 2, NULL, 3, 'Bagaimana cara begitu ?', '2025-04-20 19:06:42', '2025-04-20 19:06:42');

-- --------------------------------------------------------

--
-- Struktur dari tabel `donations`
--

CREATE TABLE IF NOT EXISTS `donations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `bank_name` varchar(100) NOT NULL,
  `account_name` varchar(100) NOT NULL,
  `source_bank` varchar(100) NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `proof_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data untuk tabel `donations`
--


-- --------------------------------------------------------

--
-- Struktur dari tabel `lessons`
--

CREATE TABLE IF NOT EXISTS `lessons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `module_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `video_header_id` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `is_deleted` int(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `module_id` (`module_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data untuk tabel `lessons`
--

INSERT INTO `lessons` (`id`, `module_id`, `title`, `description`, `video_header_id`, `thumbnail`, `created_by`, `created_date`, `updated_date`, `is_deleted`) VALUES
(1, 1, 'Muqadimah', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ''Content here, content here'', making it look like readable English.', 'https://www.youtube.com/watch?v=uBU30B75YTI&list=TLPQMjkwNDIwMjXbRCdtRXrJIQ&index=1&pp=gAQBiAQB', '', 3, '2025-04-20 19:12:45', '2025-04-20 19:12:45', 0),
(2, 2, 'Muqadimah', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don''t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn''t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.', 'https://www.youtube.com/watch?v=uBU30B75YTI&list=TLPQMjkwNDIwMjXbRCdtRXrJIQ&index=1&pp=gAQBiAQB', '', 3, '2025-04-20 19:06:42', '2025-04-20 19:06:42', 0),
(7, 1, 'Pelatihan 1', 'pelatihan 1', 'https://www.youtube.com/watch?v=Lr6AuYuqheE&ab_channel=MuzammilHasballah', '', 3, '2025-05-25 08:16:53', '2025-05-25 08:47:05', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `media`
--

CREATE TABLE IF NOT EXISTS `media` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `url` varchar(255) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data untuk tabel `media`
--


-- --------------------------------------------------------

--
-- Struktur dari tabel `modules`
--

CREATE TABLE IF NOT EXISTS `modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `video_header_id` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `section_id` int(11) NOT NULL,
  `instructor_id` int(11) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `is_deleted` int(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data untuk tabel `modules`
--

INSERT INTO `modules` (`id`, `title`, `description`, `video_header_id`, `thumbnail`, `section_id`, `instructor_id`, `created_date`, `updated_date`, `is_deleted`) VALUES
(1, 'Izhar', NULL, NULL, NULL, 1, 3, '2025-04-20 19:06:42', '2025-04-20 19:06:42', 0),
(2, 'Idgham Bigunnah', NULL, NULL, NULL, 1, 3, '2025-04-20 19:06:42', '2025-04-20 19:06:42', 0),
(3, 'Idgham Bilagunnah', NULL, NULL, NULL, 1, 3, '2025-05-15 11:52:02', NULL, 0),
(4, 'Iqlab', NULL, NULL, NULL, 1, 3, '2025-05-15 11:52:44', NULL, 0),
(5, 'Ikhfa', NULL, NULL, NULL, 1, 3, '2025-05-15 11:52:41', NULL, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `profiles`
--

CREATE TABLE IF NOT EXISTS `profiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `jobtitle` varchar(255) DEFAULT NULL,
  `tagline` varchar(100) DEFAULT NULL,
  `about_me` text,
  `skills` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data untuk tabel `profiles`
--

INSERT INTO `profiles` (`id`, `user_id`, `display_name`, `jobtitle`, `tagline`, `about_me`, `skills`, `avatar`, `created_date`, `updated_date`) VALUES
(1, 2, 'Admin', 'Admin Ngaji Yuk', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 3, 'Fauzi Rahman', 'Imam Masjid Raden Rauf', NULL, NULL, NULL, NULL, NULL, NULL),
(3, 4, 'Reazy Ega S', 'Karyawan Magang', '', '', '', '1748184327999-pngwing.com.png', NULL, NULL),
(4, 23, 'vina', 'irt', NULL, NULL, NULL, '1745578317077-4001.jpeg', '2025-04-25 10:51:57', NULL),
(10, 31, 'Akmaludin', 'Guru STM Malabar', NULL, NULL, NULL, '1748175858066-WhatsApp Image 2025-04-14 at 19.34.46_0e9bd0fe.jpg', NULL, NULL),
(8, 28, 'Rafi', 'Mahasiswa', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `quiz`
--

CREATE TABLE IF NOT EXISTS `quiz` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `modules_id` int(11) NOT NULL,
  `type` varchar(100) DEFAULT NULL COMMENT 'text / file',
  `question` text NOT NULL,
  `media_id` varchar(225) DEFAULT NULL,
  `answer_type` varchar(50) DEFAULT NULL COMMENT 'text/file',
  `created_by` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime DEFAULT NULL,
  `is_deleted` int(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data untuk tabel `quiz`
--

INSERT INTO `quiz` (`id`, `modules_id`, `type`, `question`, `media_id`, `answer_type`, `created_by`, `created_date`, `updated_date`, `is_deleted`) VALUES
(1, 1, 'text', 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled ?', NULL, 'text', 3, '2025-04-20 19:37:59', NULL, 0),
(2, 2, 'text', 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled ?', NULL, 'text', 3, '2025-04-20 19:06:42', NULL, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `sections`
--

CREATE TABLE IF NOT EXISTS `sections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `section_name` varchar(225) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data untuk tabel `sections`
--

INSERT INTO `sections` (`id`, `section_name`) VALUES
(1, 'Nun sukun dan tanwin'),
(2, 'Mim sukun'),
(3, 'Ghunnah'),
(4, 'Mad'),
(5, 'Shifr');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=32 ;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`, `created_date`, `updated_date`) VALUES
(2, 'admin', '$2b$10$VQcHhO2/ez/6wF.I6qJgDOvC5bcO7QzYhrrFfMbNuM5zNF1R8TUFW', 'admin', NULL, NULL),
(3, 'fauzi@mail.com', '$2b$10$8q72Pn0qHjmzzopj15B2JuWmaJIEb79NFUF67QgKDUdCNC6Uf0HqC', 'guru', NULL, NULL),
(4, 'rezy@mail.com', '$2b$10$yHaIzKeucV4QgsrpIW2uI.YArQ0mRcYFrRRzrViu9SPIyb8q/lpJi', 'santri', NULL, NULL),
(23, 'vina@mail.com', '$2b$10$bNJBlY665uC1nqYTtNTZ..ZUF1iUsxk6IfbF5lf5ySR6Mg5bybgA2', 'santri', '2025-04-25 10:51:56', NULL),
(31, 'akmal@mail.com', '$2b$10$Z1EcpPFXvDzJeOd2gefaP.bkWcGbbyVtECL96vvas3UXy8gBrjdzy', 'guru', '2025-05-25 12:24:17', NULL),
(28, 'rafi@mail.com', '$2b$10$rKvbCNghZ8gDaXsVB7x1IOQe9qJXmW5nlhSGArI6jrCbOoBmbfbHe', 'santri', '2025-04-29 02:59:59', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `videologs`
--

CREATE TABLE IF NOT EXISTS `videologs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `last_position` int(11) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `is_complete` int(1) DEFAULT NULL COMMENT '1:true/0:false',
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data untuk tabel `videologs`
--


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
