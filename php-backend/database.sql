-- ===========================================================
-- Lovable / sukhoy_site — Portfolio site
-- Импортируйте этот файл один раз через phpMyAdmin
-- Кодировка: utf8mb4, движок InnoDB
-- ===========================================================
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------------
-- Кейсы (проекты в портфолио)
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS cases (
  id                  INT AUTO_INCREMENT PRIMARY KEY,
  slug                VARCHAR(255)  NOT NULL UNIQUE,
  title               VARCHAR(255)  NOT NULL,
  short_description   VARCHAR(500)  NOT NULL DEFAULT '',
  description         TEXT          NULL,
  client_name         VARCHAR(255)  NOT NULL DEFAULT '',
  niche               VARCHAR(255)  NOT NULL DEFAULT '',
  project_type        VARCHAR(50)   NOT NULL DEFAULT 'landing',
  duration            VARCHAR(100)  NOT NULL DEFAULT '',
  year                VARCHAR(10)   NOT NULL DEFAULT '',
  tech_stack          VARCHAR(500)  NOT NULL DEFAULT '',
  tags                VARCHAR(500)  NOT NULL DEFAULT '',  -- comma-separated
  external_url        VARCHAR(500)  NOT NULL DEFAULT '',
  preview_image       VARCHAR(500)  NOT NULL DEFAULT '',  -- маленькое превью (карточка)
  full_image          VARCHAR(500)  NOT NULL DEFAULT '',  -- большая полная развёртка сайта
  category            VARCHAR(50)   NOT NULL DEFAULT 'landing',
  sort_order          INT           NOT NULL DEFAULT 0,
  is_published        TINYINT(1)    NOT NULL DEFAULT 1,
  created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_category (category),
  INDEX idx_sort (sort_order),
  INDEX idx_published (is_published)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- Результаты после запуска (для блока "Результаты" в кейсе)
-- icon = ключ из RESULT_ICONS на фронте (growth, money, target, …)
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS case_results (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  case_id       INT NOT NULL,
  metric        VARCHAR(255) NOT NULL,
  before_value  VARCHAR(100) NOT NULL DEFAULT '',
  after_value   VARCHAR(100) NOT NULL DEFAULT '',
  icon          VARCHAR(30)  NOT NULL DEFAULT 'stats',
  sort_order    INT          NOT NULL DEFAULT 0,
  FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE,
  INDEX idx_case (case_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- Отзывы клиентов
-- case_slug — необязательная привязка к кейсу для перехода со скроллом
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS reviews (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  text        TEXT          NOT NULL,
  name        VARCHAR(100)  NOT NULL,
  role        VARCHAR(150)  NOT NULL DEFAULT '',
  rating      TINYINT       NOT NULL DEFAULT 5,
  case_slug   VARCHAR(100)  NOT NULL DEFAULT '',
  sort_order  INT           NOT NULL DEFAULT 0,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_sort (sort_order),
  INDEX idx_case_slug (case_slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------
-- Заявки с сайта (если когда-то добавите формы; сейчас не используется)
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS leads (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(255) NOT NULL DEFAULT '',
  contact      VARCHAR(255) NOT NULL,
  message      TEXT         NULL,
  source_page  VARCHAR(255) NOT NULL DEFAULT '',
  is_read      TINYINT(1)   NOT NULL DEFAULT 0,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_created (created_at),
  INDEX idx_read (is_read)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

-- ===========================================================
-- Готово. Авторизация админки идёт через PHP-сессии (config.php)
-- ===========================================================
