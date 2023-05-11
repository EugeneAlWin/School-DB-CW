--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE schooldb;




--
-- Drop roles
--

DROP ROLE eugene;


--
-- Roles
--

CREATE ROLE eugene;
ALTER ROLE eugene WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:dx/kZsgvd2LpdXa7Cu4hCA==$ZreNNuQMdHLZXlBKPytys4rQd8UDMIlx5ZA62bmkd5Y=:j35AZrBwkvadKXyRKYojtaeHHXogXgClQobcbIlhVhQ=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2 (Debian 15.2-1.pgdg110+1)
-- Dumped by pg_dump version 15.2 (Debian 15.2-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: eugene
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO eugene;

\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: eugene
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: eugene
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: eugene
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2 (Debian 15.2-1.pgdg110+1)
-- Dumped by pg_dump version 15.2 (Debian 15.2-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: eugene
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO eugene;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: eugene
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- Database "schooldb" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2 (Debian 15.2-1.pgdg110+1)
-- Dumped by pg_dump version 15.2 (Debian 15.2-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: schooldb; Type: DATABASE; Schema: -; Owner: eugene
--

CREATE DATABASE schooldb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE schooldb OWNER TO eugene;

\connect schooldb

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: eugene
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO eugene;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: eugene
--

COMMENT ON SCHEMA public IS '';


--
-- Name: Roles; Type: TYPE; Schema: public; Owner: eugene
--

CREATE TYPE public."Roles" AS ENUM (
    'ADMIN',
    'TEACHER',
    'STUDENT',
    'PARENT'
);


ALTER TYPE public."Roles" OWNER TO eugene;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Admins; Type: TABLE; Schema: public; Owner: eugene
--

CREATE TABLE public."Admins" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    name text NOT NULL,
    last_name text NOT NULL,
    surname text NOT NULL,
    phone text DEFAULT '-'::text NOT NULL
);


ALTER TABLE public."Admins" OWNER TO eugene;

--
-- Name: Admins_id_seq; Type: SEQUENCE; Schema: public; Owner: eugene
--

CREATE SEQUENCE public."Admins_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Admins_id_seq" OWNER TO eugene;

--
-- Name: Admins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eugene
--

ALTER SEQUENCE public."Admins_id_seq" OWNED BY public."Admins".id;


--
-- Name: Grades; Type: TABLE; Schema: public; Owner: eugene
--

CREATE TABLE public."Grades" (
    id integer NOT NULL,
    value integer NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    student_id integer NOT NULL,
    subject_id integer NOT NULL,
    teacher_id integer NOT NULL
);


ALTER TABLE public."Grades" OWNER TO eugene;

--
-- Name: Grades_id_seq; Type: SEQUENCE; Schema: public; Owner: eugene
--

CREATE SEQUENCE public."Grades_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Grades_id_seq" OWNER TO eugene;

--
-- Name: Grades_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eugene
--

ALTER SEQUENCE public."Grades_id_seq" OWNED BY public."Grades".id;


--
-- Name: Parents; Type: TABLE; Schema: public; Owner: eugene
--

CREATE TABLE public."Parents" (
    id integer NOT NULL,
    name text NOT NULL,
    last_name text NOT NULL,
    student_id integer NOT NULL,
    surname text NOT NULL,
    user_id integer NOT NULL,
    phone text DEFAULT '-'::text NOT NULL
);


ALTER TABLE public."Parents" OWNER TO eugene;

--
-- Name: Parents_id_seq; Type: SEQUENCE; Schema: public; Owner: eugene
--

CREATE SEQUENCE public."Parents_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Parents_id_seq" OWNER TO eugene;

--
-- Name: Parents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eugene
--

ALTER SEQUENCE public."Parents_id_seq" OWNED BY public."Parents".id;


--
-- Name: Students; Type: TABLE; Schema: public; Owner: eugene
--

CREATE TABLE public."Students" (
    id integer NOT NULL,
    class integer NOT NULL,
    name text NOT NULL,
    surname text NOT NULL,
    last_name text NOT NULL,
    user_id integer NOT NULL,
    phone text DEFAULT '-'::text NOT NULL
);


ALTER TABLE public."Students" OWNER TO eugene;

--
-- Name: Students_id_seq; Type: SEQUENCE; Schema: public; Owner: eugene
--

CREATE SEQUENCE public."Students_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Students_id_seq" OWNER TO eugene;

--
-- Name: Students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eugene
--

ALTER SEQUENCE public."Students_id_seq" OWNED BY public."Students".id;


--
-- Name: Subjects; Type: TABLE; Schema: public; Owner: eugene
--

CREATE TABLE public."Subjects" (
    id integer NOT NULL,
    title text NOT NULL
);


ALTER TABLE public."Subjects" OWNER TO eugene;

--
-- Name: Subjects_id_seq; Type: SEQUENCE; Schema: public; Owner: eugene
--

CREATE SEQUENCE public."Subjects_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Subjects_id_seq" OWNER TO eugene;

--
-- Name: Subjects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eugene
--

ALTER SEQUENCE public."Subjects_id_seq" OWNED BY public."Subjects".id;


--
-- Name: Teachers; Type: TABLE; Schema: public; Owner: eugene
--

CREATE TABLE public."Teachers" (
    id integer NOT NULL,
    email text NOT NULL,
    name text NOT NULL,
    phone text DEFAULT '-'::text NOT NULL,
    surname text NOT NULL,
    last_name text NOT NULL,
    subject_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public."Teachers" OWNER TO eugene;

--
-- Name: Teachers_id_seq; Type: SEQUENCE; Schema: public; Owner: eugene
--

CREATE SEQUENCE public."Teachers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Teachers_id_seq" OWNER TO eugene;

--
-- Name: Teachers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eugene
--

ALTER SEQUENCE public."Teachers_id_seq" OWNED BY public."Teachers".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: eugene
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    login text NOT NULL,
    password text NOT NULL,
    role public."Roles" DEFAULT 'PARENT'::public."Roles" NOT NULL
);


ALTER TABLE public."Users" OWNER TO eugene;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: eugene
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO eugene;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eugene
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: eugene
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


ALTER TABLE public._prisma_migrations OWNER TO eugene;

--
-- Name: Admins id; Type: DEFAULT; Schema: public; Owner: eugene
--

ALTER TABLE ONLY public."Admins" ALTER COLUMN id SET DEFAULT nextval('public."Admins_id_seq"'::regclass);


--
-- Name: Grades id; Type: DEFAULT; Schema: public; Owner: eugene
--

ALTER TABLE ONLY public."Grades" ALTER COLUMN id SET DEFAULT nextval('public."Grades_id_seq"'::regclass);


--
-- Name: Parents id; Type: DEFAULT; Schema: public; Owner: eugene
--

ALTER TABLE ONLY public."Parents" ALTER COLUMN id SET DEFAULT nextval('public."Parents_id_seq"'::regclass);


--
-- Name: Students id; Type: DEFAULT; Schema: public; Owner: eugene
--

ALTER TABLE ONLY public."Students" ALTER COLUMN id SET DEFAULT nextval('public."Students_id_seq"'::regclass);


--
-- Name: Subjects id; Type: DEFAULT; Schema: public; Owner: eugene
--

ALTER TABLE ONLY public."Subjects" ALTER COLUMN id SET DEFAULT nextval('public."Subjects_id_seq"'::regclass);


--
-- Name: Teachers id; Type: DEFAULT; Schema: public; Owner: eugene
--

ALTER TABLE ONLY public."Teachers" ALTER COLUMN id SET DEFAULT nextval('public."Teachers_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: eugene
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Data for Name: Admins; Type: TABLE DATA; Schema: public; Owner: eugene
--

COPY public."Admins" (id, user_id, name, last_name, surname, phone) FROM stdin;
6	61	1	1	1	1
7	64	A	A	A	A
8	70	Z	Z	Z	Z
\.


--
-- Data for Name: Grades; Type: TABLE DATA; Schema: public; Owner: eugene
--

COPY public."Grades" (id, value, date, student_id, subject_id, teacher_id) FROM stdin;
17	6	2023-05-10 00:00:00	13	1	13
21	6	2023-05-26 00:00:00	13	1	13
26	5	2023-05-11 00:00:00	13	1	13
29	5	2023-05-11 00:00:00	13	1	13
\.


--
-- Data for Name: Parents; Type: TABLE DATA; Schema: public; Owner: eugene
--

COPY public."Parents" (id, name, last_name, student_id, surname, user_id, phone) FROM stdin;
\.


--
-- Data for Name: Students; Type: TABLE DATA; Schema: public; Owner: eugene
--

COPY public."Students" (id, class, name, surname, last_name, user_id, phone) FROM stdin;
13	2	X	C	Z	66	V
11	2	X	C	2	60	V
12	1	X	C	Z	63	V
\.


--
-- Data for Name: Subjects; Type: TABLE DATA; Schema: public; Owner: eugene
--

COPY public."Subjects" (id, title) FROM stdin;
1	Математика
2	Русский Язык
\.


--
-- Data for Name: Teachers; Type: TABLE DATA; Schema: public; Owner: eugene
--

COPY public."Teachers" (id, email, name, phone, surname, last_name, subject_id, user_id) FROM stdin;
8	+37533333333	Данила	+37533333333	Шкабров	Сергеевич	1	12
9	+37533333333	Данила	+37533333333	Шкабров	Сергеевич	1	13
10	+37533333333	Данила	+37533333333	Шкабров	Сергеевич2	1	14
12	+37533333333	Данила	+37533333333	Шкабров	Сергеевич22	1	17
13	+37533333333	Данила	+37533333333	Шкабров	Сергеевич222	1	19
14	+37533333333	Данила	+37533333333	Шкабров	Сергеевич	1	20
16	+37533333333	Данила	+37533333333	Шкабров	Сергеевич222	1	24
18	+37533333333	Данила	+37533333333	Шкабров	Сергеевич	1	29
19	+37533333333	Данила	+37533333333	Шкабров	Сергеевич	1	37
20	+37533333333	Данила	+37533333333	Шкабров	Сергеевич23	1	38
23	1	1	1	1	1	1	67
24	D	DAs	AD	AD	AD	1	68
25	E	E	E	E	E	2	72
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: eugene
--

COPY public."Users" (id, login, password, role) FROM stdin;
38	danya233трп2fh	1	TEACHER
64	xcv	c	ADMIN
66	ee	1	STUDENT
67	ee2	1	TEACHER
60	zdanya233тчапрп2f	1	STUDENT
12	danya233	1	TEACHER
13	danya2333	1	TEACHER
14	danya23334	1	TEACHER
68	zdanya233тчапрп2ff	1	TEACHER
70	admin	1	ADMIN
17	danya233345f	1	TEACHER
19	danya233345f2	1	TEACHER
20	danya233тчапр	1	TEACHER
72	euge	1	TEACHER
63	e	1	STUDENT
24	danya233345f2f	1	TEACHER
29	danya233тчапрп2	1	TEACHER
37	danya233тчапрп2f	1	TEACHER
61	eugene	1	ADMIN
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: eugene
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
a431b817-41fb-4e5d-bee8-6ec3b0d0ea62	74321ef4af21dd277012df04272490dac49483b673162e05f491e8db020c4494	2023-05-07 10:44:35.313968+00	20230425114212_init	\N	\N	2023-05-07 10:44:35.273236+00	1
65a8c8b2-22b7-4a75-8e97-33f1648972f0	57635cbe7d89f09a0efc1c964b8ce419b215cbae71e1d2fe4e7893a98a7dc9c4	2023-05-07 10:44:35.380694+00	20230425122311_init	\N	\N	2023-05-07 10:44:35.321279+00	1
6646c66e-340a-4425-8fbb-96e7c72f2851	76ac4a5cd4d59d05c40cc27be102153be50d2f99fbcd07c8b17b44432ab5143a	2023-05-07 10:44:35.516765+00	20230425132211_main_schema	\N	\N	2023-05-07 10:44:35.387677+00	1
6b571423-ae49-4c8a-930b-34d1be73b64a	88e63c2ff91fc98888bef01463a04147f097bd64a83498079d0e7c21464b972b	2023-05-07 10:44:51.102057+00	20230507104450_updated	\N	\N	2023-05-07 10:44:50.990179+00	1
08d5ceab-29dc-4a7b-b1f0-c0d08f4f3508	3af41711a1c607353e37759043d628d181fa99ed98e4831f07dbe01d5034925e	2023-05-07 11:10:47.181414+00	20230507111047_updated2	\N	\N	2023-05-07 11:10:47.164106+00	1
18ab0c0f-26a1-428a-bd2a-6f180b9f5f5c	6981f0c95475194d88724573a9ffbe09bf4517ab1875425726706ca29fbc5656	2023-05-11 18:33:27.786047+00	20230511183327_updated3	\N	\N	2023-05-11 18:33:27.763789+00	1
c0639aeb-1cca-4512-a050-6fff97561271	f458b7a7d626a733cdb2967b8e1b75c42fa075fb1d77529b2e2bb3234f847778	2023-05-11 18:38:09.293495+00	20230511183809_updated3_1	\N	\N	2023-05-11 18:38:09.284259+00	1
0ab400e0-02c1-48c3-b4f1-b462466e7e78	b47b24561789a9f7a00a4530b88187b3818ef260d0934559422b5a070c64e5b3	2023-05-11 18:40:06.690034+00	20230511184006_updated3_2	\N	\N	2023-05-11 18:40:06.677292+00	1
6d143fa8-f6b5-416c-8a29-98764e602b3f	546b1d10b3d886bd6d39cdc75813329e3ba0dfa07105a87d150071997f557aa4	2023-05-11 18:41:11.426365+00	20230511184111_updated3_3	\N	\N	2023-05-11 18:41:11.412204+00	1
c54d9c68-b512-400c-8251-3a9713aaf237	a2fa80679be4967e80d3ed67df222cc64bebd0be2acb5a6b0088c355a2dbac1d	2023-05-11 18:46:49.48157+00	20230511184649_updated3_4	\N	\N	2023-05-11 18:46:49.46235+00	1
c3b64e6a-fcd0-472b-9704-c4c0e46ec2f5	5dfcae1c04fb140c71b1f13d0244b6061904791aecc0083f8f7b72a85b2decc5	2023-05-11 19:53:42.380273+00	20230511195342_updated3_5	\N	\N	2023-05-11 19:53:42.369819+00	1
\.


--
-- Name: Admins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eugene
--

SELECT pg_catalog.setval('public."Admins_id_seq"', 8, true);


--
-- Name: Grades_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eugene
--

SELECT pg_catalog.setval('public."Grades_id_seq"', 29, true);


--
-- Name: Parents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eugene
--

SELECT pg_catalog.setval('public."Parents_id_seq"', 3, true);


--
-- Name: Students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eugene
--

SELECT pg_catalog.setval('public."Students_id_seq"', 13, true);


--
-- Name: Subjects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eugene
--

SELECT pg_catalog.setval('public."Subjects_id_seq"', 2, true);


--
-- Name: Teachers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eugene
--

SELECT pg_catalog.setval('public."Teachers_id_seq"', 25, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eugene
--

SELECT pg_catalog.setval('public."Users_id_seq"', 72, true);


--
-- Name: Admins Admins_pkey; Type: CONSTRAINT; Schema: public; Owner: eugene
--

ALTER TABLE ONLY public."Admins"
    ADD CONSTRAINT "Admins_pkey" PRIMARY KEY (id);


--
-- Name: Grades Grades_pkey; Type: CONSTRAINT; Schema: public; Owner: eugene
--

ALTER TABLE ONLY public."Grades"
    ADD CONSTRAINT "Grades_pkey" PRIMARY KEY (id);


--
-- Name: Parents Parents_pkey; Type: CONSTRAINT; Schema: public; Owner: eugene
--

ALTER TABLE ONLY public."Parents"
    ADD CONSTRAINT "Parents_pkey" PRIMARY KEY (id);


--
-- Name: Students Students_pkey; Type: CONSTRAINT; Schema: public; Owner: eugene
--

ALTER TABLE ONLY public."Students"
    ADD CONSTRAINT "Students_pkey" PRIMARY KEY (id);


--
-- Name: Subjects Subjects_pkey; Type: CONSTRAINT; Schema: public; Owner: eugene
--

ALTER TABLE ONLY public."Subjects"
    ADD CONSTRAINT "Subjects_pkey" PRIMARY KEY (id);


--
-- Name: Teachers Teachers_pkey; Type: CONSTRAINT; Schema: public; Owner: eugene
--

ALTER TABLE ONLY public."Teachers"
    ADD CONSTRAINT "Teachers_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: eugene
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: eugene
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Admins_user_id_key; Type: INDEX; Schema: public; Owner: eugene
--

CREATE UNIQUE INDEX "Admins_user_id_key" ON public."Admins" USING btree (user_id);


--
-- Name: Parents_user_id_key; Type: INDEX; Schema: public; Owner: eugene
--

CREATE UNIQUE INDEX "Parents_user_id_key" ON public."Parents" USING btree (user_id);


--
-- Name: Students_user_id_key; Type: INDEX; Schema: public; Owner: eugene
--

CREATE UNIQUE INDEX "Students_user_id_key" ON public."Students" USING btree (user_id);


--
-- Name: Subjects_title_key; Type: INDEX; Schema: public; Owner: eugene
--

CREATE UNIQUE INDEX "Subjects_title_key" ON public."Subjects" USING btree (title);


--
-- Name: Teachers_user_id_key; Type: INDEX; Schema: public; Owner: eugene
--

CREATE UNIQUE INDEX "Teachers_user_id_key" ON public."Teachers" USING btree (user_id);


--
-- Name: Users_login_key; Type: INDEX; Schema: public; Owner: eugene
--

CREATE UNIQUE INDEX "Users_login_key" ON public."Users" USING btree (login);


--
-- Name: Admins Admins_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eugene
--

ALTER TABLE ONLY public."Admins"
    ADD CONSTRAINT "Admins_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Grades Grades_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eugene
--

ALTER TABLE ONLY public."Grades"
    ADD CONSTRAINT "Grades_student_id_fkey" FOREIGN KEY (student_id) REFERENCES public."Students"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Grades Grades_subject_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eugene
--

ALTER TABLE ONLY public."Grades"
    ADD CONSTRAINT "Grades_subject_id_fkey" FOREIGN KEY (subject_id) REFERENCES public."Subjects"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Grades Grades_teacher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eugene
--

ALTER TABLE ONLY public."Grades"
    ADD CONSTRAINT "Grades_teacher_id_fkey" FOREIGN KEY (teacher_id) REFERENCES public."Teachers"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Parents Parents_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eugene
--

ALTER TABLE ONLY public."Parents"
    ADD CONSTRAINT "Parents_student_id_fkey" FOREIGN KEY (student_id) REFERENCES public."Students"(id);


--
-- Name: Parents Parents_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eugene
--

ALTER TABLE ONLY public."Parents"
    ADD CONSTRAINT "Parents_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Students Students_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eugene
--

ALTER TABLE ONLY public."Students"
    ADD CONSTRAINT "Students_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Teachers Teachers_subject_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eugene
--

ALTER TABLE ONLY public."Teachers"
    ADD CONSTRAINT "Teachers_subject_id_fkey" FOREIGN KEY (subject_id) REFERENCES public."Subjects"(id);


--
-- Name: Teachers Teachers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: eugene
--

ALTER TABLE ONLY public."Teachers"
    ADD CONSTRAINT "Teachers_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: eugene
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

