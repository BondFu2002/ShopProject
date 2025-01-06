--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: AdminPassword; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AdminPassword" (
    password text NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public."AdminPassword" OWNER TO postgres;

--
-- Name: AdminPassword_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."AdminPassword_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."AdminPassword_id_seq" OWNER TO postgres;

--
-- Name: AdminPassword_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."AdminPassword_id_seq" OWNED BY public."AdminPassword".id;


--
-- Name: Category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Category" (
    id integer NOT NULL,
    name text NOT NULL,
    description text
);


ALTER TABLE public."Category" OWNER TO postgres;

--
-- Name: Category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Category_id_seq" OWNER TO postgres;

--
-- Name: Category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Category_id_seq" OWNED BY public."Category".id;


--
-- Name: Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product" (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    price double precision NOT NULL,
    stock integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "imageUrl" text,
    published boolean DEFAULT false NOT NULL,
    "CId" integer,
    "MId" integer,
    "categoryId" integer NOT NULL
);


ALTER TABLE public."Product" OWNER TO postgres;

--
-- Name: Product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Product_id_seq" OWNER TO postgres;

--
-- Name: Product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Product_id_seq" OWNED BY public."Product".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    role text DEFAULT 'USER'::text NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: AdminPassword id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AdminPassword" ALTER COLUMN id SET DEFAULT nextval('public."AdminPassword_id_seq"'::regclass);


--
-- Name: Category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category" ALTER COLUMN id SET DEFAULT nextval('public."Category_id_seq"'::regclass);


--
-- Name: Product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product" ALTER COLUMN id SET DEFAULT nextval('public."Product_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: AdminPassword; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AdminPassword" (password, id) FROM stdin;
021203	1
\.


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Category" (id, name, description) FROM stdin;
1	food	something can eat
3	phone	mobile phone
4	animal	some animals
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" (id, name, description, price, stock, "createdAt", "updatedAt", "imageUrl", published, "CId", "MId", "categoryId") FROM stdin;
1	apple	good	10	560	2024-12-24 01:45:33.167	2024-12-27 13:45:11.529	string	t	1	1	1
3	vivo	phone	3222	37	2024-12-24 07:16:40.784	2024-12-27 13:45:12.492	\N	t	1	2	3
12	ts	i am sb	1	1	2025-01-01 06:18:20.403	2025-01-01 06:19:07.761	\N	t	1	1	4
5	pig	so shit	200	10	2024-12-24 08:06:01.903	2025-01-01 06:19:08.994	\N	t	1	1	4
11	小米15	good phone	5999	40	2024-12-27 13:45:46.841	2025-01-01 06:19:11.641	\N	t	1	1	3
2	iqoo neo5	well	3560	70	2024-12-24 07:02:30.476	2024-12-25 07:24:19.799	string	t	1	2	3
8	iqoo neo11	good phone	4999	20	2024-12-25 03:00:01.048	2024-12-25 07:24:36.999	\N	t	1	2	3
7	iqoo neo10	string	4450	30	2024-12-25 02:58:20.468	2024-12-25 07:29:28.462	\N	t	1	2	3
6	iqoo neo9	string	3450	30	2024-12-25 02:56:47.115	2024-12-25 07:29:33.843	\N	t	1	2	3
4	banana	yellow	3	432	2024-12-24 08:02:35.489	2024-12-26 09:57:12.96	\N	t	1	1	1
10	oppo	string	4500	10	2024-12-25 07:08:49.755	2024-12-26 09:57:13.973	\N	t	1	2	3
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, username, email, password, "createdAt", "updatedAt", role) FROM stdin;
3	Bond	bond@123.com	$2b$10$c0ZOmJ51YqVdN7Kt8.i3XOgzoZT/7FRxkUwC5jjY2oTIe1s9svM9W	2024-12-26 05:42:47.942	2024-12-27 01:38:39.72	ADMIN
2	ljl	ljl@123.com	$2b$10$pJtzB8BJQtBpCO9p9BRMT.A43QUNIxUfu4aoEjHk/3UcDcJ97XwIu	2024-12-23 09:11:08.925	2024-12-27 09:50:24.609	USER
1	fqx	fqx@123.com	$2b$10$f5F0OEOz5xnBoCgtxg4PS.PHCJVn3V94aNTabk4iNHhoJNQzxh26K	2024-12-23 08:52:13.658	2024-12-27 09:50:30.794	NORMAL
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
548c5dd4-628b-41f1-8414-ebbd8cc72e7e	e48450ed59ffdf996469f337466fb3672751baaaa6e136b5c31340da20a3825c	2024-12-23 11:05:40.501416+08	20241220021211_init	\N	\N	2024-12-23 11:05:40.493014+08	1
ffa984b1-7588-490f-b699-ef35b1063f05	942618b70b06b0be6e568d2daea2ad479c50f6476359beccadadcbb162ee4d97	2024-12-23 11:05:40.505003+08	20241220024338_init	\N	\N	2024-12-23 11:05:40.502117+08	1
d5d0fefa-a203-4cf5-af2b-bc63187f50d8	23c2830e447fd5f6d0bd3fbac1199d424ef6930f0469b1ea95e133f5a51068f7	2024-12-23 11:05:40.516976+08	20241220073923_add_user_model	\N	\N	2024-12-23 11:05:40.505859+08	1
061a1416-db50-4b9b-afb1-fe57200094ff	62a646f6339280b472569ef316bb205663d223c15fbf9929db5b2ff594076786	2024-12-23 11:05:40.521406+08	20241220074053_change_user_model	\N	\N	2024-12-23 11:05:40.517785+08	1
4050827c-8702-4018-934d-394b47c46fd9	a0d81ef79ca4076bdcb8505cc79af944c68ea46f5afaae2f2b157b38d1871baa	2024-12-23 11:05:40.529363+08	20241223030051_add_category_id_to_product	\N	\N	2024-12-23 11:05:40.522143+08	1
ef172585-85e9-441b-9dbd-d33170a9bc65	5dfda4fbfeb35b417b3cf23a6a31ce824ff19451a124741919b5e66daca516ff	2024-12-25 15:03:26.40953+08	20241225070326_change_category_field	\N	\N	2024-12-25 15:03:26.404125+08	1
e91cebd0-7e71-4ef8-a4f2-fd36feb1ea30	5740773f1350b7fd885c6860173a3a45bbf2296df09984ab7c8a73151b40ad8b	2024-12-26 14:23:23.868144+08	20241226062323_add_admin_password_add_role	\N	\N	2024-12-26 14:23:23.846717+08	1
78c5fd76-c1be-4c03-915b-4595ccff4f80	fe45f2e7e6dde7dfd01aa203dcb7635c872759a50467a8a4d19268572c7585c5	2024-12-26 14:28:27.749841+08	20241226062827_change_admin_password	\N	\N	2024-12-26 14:28:27.736951+08	1
145713f7-c409-43eb-9e17-6c0723bf5f16	82bc1123c3c47ff973c1a9b51fdd479e1ba36a331f2f2edc8f1099f7539a2de7	2024-12-26 16:56:59.304116+08	20241226085659_change_admin_password	\N	\N	2024-12-26 16:56:59.290474+08	1
dbe499a6-2256-42c1-9939-e564241327bd	32faf27db47d2efbe17eb427bcc1edae7959d29b373845166ba727e57da8f327	2024-12-27 09:19:22.415181+08	20241227011922_change_role	\N	\N	2024-12-27 09:19:22.411926+08	1
dc6373f5-54b3-4a0b-9d08-db4ef4b1d175	e11429bc114151a8c3018cf1b3c74171515f86dc9615428a6b972c693e077e90	2024-12-27 09:46:02.948011+08	20241227014602_delete_role	\N	\N	2024-12-27 09:46:02.937942+08	1
\.


--
-- Name: AdminPassword_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."AdminPassword_id_seq"', 1, false);


--
-- Name: Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Category_id_seq"', 4, true);


--
-- Name: Product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Product_id_seq"', 12, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 3, true);


--
-- Name: AdminPassword AdminPassword_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AdminPassword"
    ADD CONSTRAINT "AdminPassword_pkey" PRIMARY KEY (id);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: AdminPassword_password_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "AdminPassword_password_key" ON public."AdminPassword" USING btree (password);


--
-- Name: Category_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Category_name_key" ON public."Category" USING btree (name);


--
-- Name: Product_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Product_name_key" ON public."Product" USING btree (name);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Product Product_CId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_CId_fkey" FOREIGN KEY ("CId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Product Product_MId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_MId_fkey" FOREIGN KEY ("MId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Product Product_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

