-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Waktu pembuatan: 28. April 2025 jam 03:05
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
-- Struktur dari tabel `lessons`
--

CREATE TABLE IF NOT EXISTS `lessons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `module_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `video_header_id` int(11) DEFAULT NULL,
  `week_number` int(1) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `module_id` (`module_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data untuk tabel `lessons`
--

INSERT INTO `lessons` (`id`, `module_id`, `title`, `description`, `video_header_id`, `week_number`, `created_date`, `updated_date`) VALUES
(1, 1, 'Muqadimah', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ''Content here, content here'', making it look like readable English.', NULL, 1, '2025-04-20 19:12:45', '2025-04-20 19:12:45'),
(2, 2, 'Muqadimah', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don''t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn''t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.', NULL, 1, '2025-04-20 19:06:42', '2025-04-20 19:06:42');

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
  `instructor_id` varchar(225) NOT NULL,
  `weeks` int(11) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data untuk tabel `modules`
--

INSERT INTO `modules` (`id`, `title`, `description`, `video_header_id`, `instructor_id`, `weeks`, `created_date`, `updated_date`) VALUES
(1, 'Lesson 1', 'Idzhar', NULL, '3', 4, '2025-04-20 19:06:42', '2025-04-20 19:06:42'),
(2, 'Lesson 2', 'Idghom', NULL, '3', 4, '2025-04-20 19:06:42', '2025-04-20 19:06:42');

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
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data untuk tabel `profiles`
--

INSERT INTO `profiles` (`id`, `user_id`, `display_name`, `jobtitle`, `tagline`, `about_me`, `skills`, `avatar`, `created_date`, `updated_date`) VALUES
(1, 2, 'Fauza Rahman', 'Admin Ngaji Yuk', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 3, 'Fauzi Rahman', 'Imam Masjid Raden Rauf', NULL, NULL, NULL, NULL, NULL, NULL),
(3, 4, 'Reazy Ega', 'Karyawan Magang', NULL, NULL, NULL, NULL, NULL, NULL),
(4, 23, 'vina', 'irt', NULL, NULL, NULL, '1745578317077-4001.jpeg', '2025-04-25 10:51:57', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `quiz`
--

CREATE TABLE IF NOT EXISTS `quiz` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `modules_id` int(11) NOT NULL,
  `type` varchar(100) NOT NULL COMMENT 'text / file',
  `question` text NOT NULL,
  `media_id` int(11) DEFAULT NULL,
  `answer_type` varchar(50) NOT NULL COMMENT 'text/file',
  `is_completed` int(1) NOT NULL COMMENT '1:true/0:false',
  `created_date` datetime NOT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data untuk tabel `quiz`
--

INSERT INTO `quiz` (`id`, `modules_id`, `type`, `question`, `media_id`, `answer_type`, `is_completed`, `created_date`, `updated_date`) VALUES
(1, 1, 'text', 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled ?', NULL, 'text', 0, '2025-04-20 19:37:59', NULL),
(2, 2, 'text', 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled ?', NULL, 'text', 0, '2025-04-20 19:06:42', NULL);

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
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=28 ;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`, `created_date`, `updated_date`) VALUES
(2, 'fauza@mail.com', '$2b$10$VQcHhO2/ez/6wF.I6qJgDOvC5bcO7QzYhrrFfMbNuM5zNF1R8TUFW', 'admin', NULL, NULL),
(3, 'fauzi@mail.com', '$2b$10$8q72Pn0qHjmzzopj15B2JuWmaJIEb79NFUF67QgKDUdCNC6Uf0HqC', 'guru', NULL, NULL),
(4, 'rezy@mail.com', '$2b$10$yHaIzKeucV4QgsrpIW2uI.YArQ0mRcYFrRRzrViu9SPIyb8q/lpJi', 'santri', NULL, NULL),
(23, 'vina@mail.com', '$2b$10$bNJBlY665uC1nqYTtNTZ..ZUF1iUsxk6IfbF5lf5ySR6Mg5bybgA2', 'santri', '2025-04-25 10:51:56', NULL);

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
