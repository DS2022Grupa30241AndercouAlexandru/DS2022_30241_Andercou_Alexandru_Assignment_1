--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: device; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.device (
    id bigint NOT NULL,
    address character varying(255),
    description character varying(255),
    maximum_hourly_energy_consumption real,
    name character varying(255),
    owner bigint
);


ALTER TABLE public.device OWNER TO postgres;

--
-- Name: hibernate_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hibernate_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hibernate_sequence OWNER TO postgres;

--
-- Name: measurement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.measurement (
    id bigint NOT NULL,
    energy_consumption real,
    unity_of_measurement character varying(255),
    date date,
    "time" time without time zone,
    owner bigint
);


ALTER TABLE public.measurement OWNER TO postgres;

--
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    id bigint NOT NULL,
    password character varying(255),
    type character varying(255),
    username character varying(255)
);


ALTER TABLE public.role OWNER TO postgres;

--
-- Name: user_account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_account (
    id bigint NOT NULL,
    name character varying(255),
    role_id bigint
);


ALTER TABLE public.user_account OWNER TO postgres;

--
-- Data for Name: device; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.device (id, address, description, maximum_hourly_energy_consumption, name, owner) FROM stdin;
42	strada Govora 18	an electronic multimeter	120	multimeter50x3	34
37	Strada Richerdson nr 33	Smart Phone for rich people	100	Iphone 13	41
43	Strada Careiuluio 32	masina de spalat inteligenta	300	Philips	41
79	Strada Richerdson nr 33	black smart and big	60	Samsung A13	36
44	Strada Observatorului nr 54	Samsung smart phone	100	Galaxy A03	34
\.


--
-- Data for Name: measurement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.measurement (id, energy_consumption, unity_of_measurement, date, "time", owner) FROM stdin;
53	55	KW/h	2022-10-02	15:00:00	44
70	0	KW/h	2022-09-30	04:00:00	44
78	27	KW/h	2022-10-04	16:52:00	44
77	27	KW/h	2022-10-02	16:52:00	44
65	35	KW/h	2022-09-30	23:00:00	42
46	30	KW/h	2022-09-30	03:00:00	44
45	25	KW/h	2022-10-03	02:00:00	44
61	55	KW/h	2022-09-30	20:00:00	44
63	23	KW/h	2022-09-30	22:00:00	44
64	27	KW/h	2022-09-30	23:00:00	42
68	45	KW/h	2022-10-02	11:00:00	42
67	45	KW/h	2022-09-30	11:00:00	44
66	24	KW/h	2022-09-30	10:00:00	44
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role (id, password, type, username) FROM stdin;
35	34567	USER	matei_turcu
40	54321	ADMIN	pop_marius
33	1234	USER	alexandru
13	12347	ADMIN	Maria_admin
57	1357	USER	tvr_love
51	12345	ADMIN	alex_admin
\.


--
-- Data for Name: user_account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_account (id, name, role_id) FROM stdin;
14	Maria Pop	13
36	Matei Turcu	35
41	Marius Pop	40
52	Andercou Alexandru-Stefan	51
58	Mircea Radu	57
34	Andercou Alexandru	33
\.


--
-- Name: hibernate_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hibernate_sequence', 80, true);


--
-- Name: device device_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.device
    ADD CONSTRAINT device_pkey PRIMARY KEY (id);


--
-- Name: measurement measurement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.measurement
    ADD CONSTRAINT measurement_pkey PRIMARY KEY (id);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- Name: user_account user_account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_account
    ADD CONSTRAINT user_account_pkey PRIMARY KEY (id);


--
-- Name: user_account fk4j8uoaeve853dcbl0tjd0yoq0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_account
    ADD CONSTRAINT fk4j8uoaeve853dcbl0tjd0yoq0 FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- Name: measurement fk9ki27vumfgue2ghu5h241v2mb; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.measurement
    ADD CONSTRAINT fk9ki27vumfgue2ghu5h241v2mb FOREIGN KEY (owner) REFERENCES public.device(id);


--
-- Name: device fkl7p2lrwkeybwxv6lr3wuni3ed; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.device
    ADD CONSTRAINT fkl7p2lrwkeybwxv6lr3wuni3ed FOREIGN KEY (owner) REFERENCES public.user_account(id);


--
-- PostgreSQL database dump complete
--

