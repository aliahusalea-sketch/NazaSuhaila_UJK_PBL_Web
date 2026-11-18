--
-- PostgreSQL database dump
--

\restrict OesdkwuvtovpUFdC6uwr6AjdcTB1FFqnPaNCDbJBytbqyI6o0dumEPWKMM4XxvX

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

-- Started on 2026-11-18 20:05:00

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 49247)
-- Name: student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student (
    id integer NOT NULL,
    nis character varying(50) NOT NULL,
    nama character varying(100) NOT NULL,
    kelas character varying(50) NOT NULL,
    jurusan character varying(50) NOT NULL,
    alamat text,
    tanggal_lahir date
);


ALTER TABLE public.student OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 49246)
-- Name: student_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.student_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.student_id_seq OWNER TO postgres;

--
-- TOC entry 5015 (class 0 OID 0)
-- Dependencies: 219
-- Name: student_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.student_id_seq OWNED BY public.student.id;


--
-- TOC entry 4856 (class 2604 OID 49250)
-- Name: student id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student ALTER COLUMN id SET DEFAULT nextval('public.student_id_seq'::regclass);


--
-- TOC entry 5009 (class 0 OID 49247)
-- Dependencies: 220
-- Data for Name: student; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.student (id, nis, nama, kelas, jurusan, alamat, tanggal_lahir) FROM stdin;
2	2026002	Budi Santoso	10A	IPA	Jl. Sudirman No. 15, Jakarta	2008-01-15
3	2026003	Citra Amelia	10A	IPA	Jl. Gatot Subroto No. 22, Depok	2008-03-22
4	2026004	Dimas Pratama	10A	IPA	Jl. Pahlawan No. 5, Bekasi	2008-05-10
5	2026005	Eka Putri	10B	IPA	Jl. Mawar No. 8, Tangerang	2008-07-18
6	2026006	Farhan Akbar	10B	IPA	Jl. Melati No. 12, Bogor	2008-09-12
7	2026007	Gina Safitri	10B	IPA	Jl. Kenanga No. 30, Jakarta	2008-11-25
8	2026008	Hendra Wijaya	11A	IPA	Jl. Cempaka No. 7, Depok	2007-02-14
9	2026009	Intan Permata	11A	IPA	Jl. Anggrek No. 3, Bekasi	2007-04-20
10	2026010	Joko Saputra	11A	IPA	Jl. Diponegoro No. 45, Bandung	2007-06-08
11	2026011	Kartika Sari	10A	IPS	Jl. Asia Afrika No. 11, Bandung	2008-01-30
12	2026012	Lukman Hakim	10A	IPS	Jl. Ahmad Yani No. 20, Jakarta	2008-03-17
13	2026013	Maya Lestari	10A	IPS	Jl. Melur No. 9, Tangerang	2008-05-24
14	2026014	Nanda Putra	10B	IPS	Jl. Merpati No. 16, Depok	2008-07-09
15	2026015	Olivia Rahma	10B	IPS	Jl. Flamboyan No. 4, Bogor	2008-09-16
16	2026016	Putra Ramadhan	10B	IPS	Jl. Veteran No. 18, Bekasi	2008-11-03
17	2026017	Qori Azzahra	11A	IPS	Jl. Kamboja No. 25, Jakarta	2007-02-21
18	2026018	Rizky Maulana	11A	IPS	Jl. Sudirman No. 32, Bandung	2007-04-11
19	2026019	Sinta Maharani	11B	IPS	Jl. Melati No. 14, Depok	2007-08-19
20	2026020	Taufik Hidayat	11B	IPS	Jl. Mawar No. 21, Tangerang	2007-10-27
1	2026001	Andi	10A	IPA	Jalan Merdeka Raya	2008-03-25
\.


--
-- TOC entry 5016 (class 0 OID 0)
-- Dependencies: 219
-- Name: student_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.student_id_seq', 22, true);


--
-- TOC entry 4858 (class 2606 OID 49259)
-- Name: student student_nis_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_nis_key UNIQUE (nis);


--
-- TOC entry 4860 (class 2606 OID 49257)
-- Name: student student_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_pkey PRIMARY KEY (id);


-- Completed on 2026-11-18 20:05:00

--
-- PostgreSQL database dump complete
--

\unrestrict OesdkwuvtovpUFdC6uwr6AjdcTB1FFqnPaNCDbJBytbqyI6o0dumEPWKMM4XxvX

