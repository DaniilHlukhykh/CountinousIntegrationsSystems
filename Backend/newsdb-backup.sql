--
-- PostgreSQL database dump
--

\restrict FdVHGWdTtx8GsMjHWftPke4sbzrINQeXgZZ5ydRM0cHrA80ovAfgPTxjrewVXtw

-- Dumped from database version 18.6 (Debian 18.6-1.pgdg13+2)
-- Dumped by pg_dump version 18.6 (Debian 18.6-1.pgdg13+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: newspost_entity_genre_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.newspost_entity_genre_enum AS ENUM (
    'Politic',
    'Business',
    'Sport',
    'Other'
);


ALTER TYPE public.newspost_entity_genre_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: newspost_entity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.newspost_entity (
    id integer NOT NULL,
    title character varying NOT NULL,
    text text NOT NULL,
    genre public.newspost_entity_genre_enum NOT NULL,
    "isPrivate" boolean NOT NULL,
    "authorId" integer
);


ALTER TABLE public.newspost_entity OWNER TO postgres;

--
-- Name: newspost_entity_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.newspost_entity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.newspost_entity_id_seq OWNER TO postgres;

--
-- Name: newspost_entity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.newspost_entity_id_seq OWNED BY public.newspost_entity.id;


--
-- Name: user_entity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_entity (
    id integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public.user_entity OWNER TO postgres;

--
-- Name: user_entity_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_entity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_entity_id_seq OWNER TO postgres;

--
-- Name: user_entity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_entity_id_seq OWNED BY public.user_entity.id;


--
-- Name: newspost_entity id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newspost_entity ALTER COLUMN id SET DEFAULT nextval('public.newspost_entity_id_seq'::regclass);


--
-- Name: user_entity id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_entity ALTER COLUMN id SET DEFAULT nextval('public.user_entity_id_seq'::regclass);


--
-- Data for Name: newspost_entity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.newspost_entity (id, title, text, genre, "isPrivate", "authorId") FROM stdin;
1	Updated title	Hello from TypeORM	Sport	f	1
\.


--
-- Data for Name: user_entity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_entity (id, email, password) FROM stdin;
1	test@example.com	8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92
\.


--
-- Name: newspost_entity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.newspost_entity_id_seq', 2, true);


--
-- Name: user_entity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_entity_id_seq', 1, true);


--
-- Name: newspost_entity PK_0e8b711eb08ecc6ae8714032c16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newspost_entity
    ADD CONSTRAINT "PK_0e8b711eb08ecc6ae8714032c16" PRIMARY KEY (id);


--
-- Name: user_entity PK_b54f8ea623b17094db7667d8206; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_entity
    ADD CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY (id);


--
-- Name: user_entity UQ_415c35b9b3b6fe45a3b065030f5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_entity
    ADD CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE (email);


--
-- Name: newspost_entity FK_334ee3c528ed9842540bce62ac1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newspost_entity
    ADD CONSTRAINT "FK_334ee3c528ed9842540bce62ac1" FOREIGN KEY ("authorId") REFERENCES public.user_entity(id);


--
-- PostgreSQL database dump complete
--

\unrestrict FdVHGWdTtx8GsMjHWftPke4sbzrINQeXgZZ5ydRM0cHrA80ovAfgPTxjrewVXtw

