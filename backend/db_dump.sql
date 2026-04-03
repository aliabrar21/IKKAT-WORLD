--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

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

ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_category_id_foreign;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_customer_id_foreign;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS order_items_product_id_foreign;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS order_items_order_id_foreign;
DROP INDEX IF EXISTS public.products_group_id_index;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_email_unique;
ALTER TABLE IF EXISTS ONLY public.site_settings DROP CONSTRAINT IF EXISTS site_settings_pkey;
ALTER TABLE IF EXISTS ONLY public.site_settings DROP CONSTRAINT IF EXISTS site_settings_key_unique;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_sku_unique;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_pkey;
ALTER TABLE IF EXISTS ONLY public.otps DROP CONSTRAINT IF EXISTS otps_pkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_pkey;
ALTER TABLE IF EXISTS ONLY public.order_items DROP CONSTRAINT IF EXISTS order_items_pkey;
ALTER TABLE IF EXISTS ONLY public.messages DROP CONSTRAINT IF EXISTS messages_pkey;
ALTER TABLE IF EXISTS ONLY public.knex_migrations DROP CONSTRAINT IF EXISTS knex_migrations_pkey;
ALTER TABLE IF EXISTS ONLY public.knex_migrations_lock DROP CONSTRAINT IF EXISTS knex_migrations_lock_pkey;
ALTER TABLE IF EXISTS ONLY public.customers DROP CONSTRAINT IF EXISTS customers_pkey;
ALTER TABLE IF EXISTS ONLY public.customers DROP CONSTRAINT IF EXISTS customers_email_unique;
ALTER TABLE IF EXISTS ONLY public.custom_orders DROP CONSTRAINT IF EXISTS custom_orders_pkey;
ALTER TABLE IF EXISTS ONLY public.categories DROP CONSTRAINT IF EXISTS categories_pkey;
ALTER TABLE IF EXISTS ONLY public.categories DROP CONSTRAINT IF EXISTS categories_name_unique;
ALTER TABLE IF EXISTS public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.site_settings ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.products ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.otps ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.orders ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.order_items ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.messages ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.knex_migrations_lock ALTER COLUMN index DROP DEFAULT;
ALTER TABLE IF EXISTS public.knex_migrations ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.customers ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.custom_orders ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.categories ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.users_id_seq;
DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.site_settings_id_seq;
DROP TABLE IF EXISTS public.site_settings;
DROP SEQUENCE IF EXISTS public.products_id_seq;
DROP TABLE IF EXISTS public.products;
DROP SEQUENCE IF EXISTS public.otps_id_seq;
DROP TABLE IF EXISTS public.otps;
DROP SEQUENCE IF EXISTS public.orders_id_seq;
DROP TABLE IF EXISTS public.orders;
DROP SEQUENCE IF EXISTS public.order_items_id_seq;
DROP TABLE IF EXISTS public.order_items;
DROP SEQUENCE IF EXISTS public.messages_id_seq;
DROP TABLE IF EXISTS public.messages;
DROP SEQUENCE IF EXISTS public.knex_migrations_lock_index_seq;
DROP TABLE IF EXISTS public.knex_migrations_lock;
DROP SEQUENCE IF EXISTS public.knex_migrations_id_seq;
DROP TABLE IF EXISTS public.knex_migrations;
DROP SEQUENCE IF EXISTS public.customers_id_seq;
DROP TABLE IF EXISTS public.customers;
DROP SEQUENCE IF EXISTS public.custom_orders_id_seq;
DROP TABLE IF EXISTS public.custom_orders;
DROP SEQUENCE IF EXISTS public.categories_id_seq;
DROP TABLE IF EXISTS public.categories;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: custom_orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.custom_orders (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    "sareeType" character varying(255) NOT NULL,
    "colorPreference" character varying(255) NOT NULL,
    message text,
    status character varying(255) DEFAULT 'Pending'::character varying,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: custom_orders_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.custom_orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: custom_orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.custom_orders_id_seq OWNED BY public.custom_orders.id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);


--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.knex_migrations_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNED BY public.knex_migrations_lock.index;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(255),
    content text NOT NULL,
    "isRead" boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    order_id integer,
    product_id integer,
    quantity integer DEFAULT 1,
    price numeric(10,2) NOT NULL
);


--
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    customer_id integer,
    "totalAmount" numeric(10,2) NOT NULL,
    status character varying(255) DEFAULT 'Pending'::character varying,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: otps; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.otps (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    otp_code character varying(255) NOT NULL,
    type character varying(255) NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    attempts integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: otps_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.otps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: otps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.otps_id_seq OWNED BY public.otps.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    sku character varying(255) NOT NULL,
    price numeric(10,2) NOT NULL,
    "imageUrl" character varying(255),
    images text[],
    availability character varying(255) DEFAULT 'Available'::character varying,
    "fabricDetails" text,
    length character varying(255),
    "blousePieceInfo" character varying(255),
    "deliveryTime" character varying(255),
    "careInstructions" text,
    category_id integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    group_id character varying(255),
    color_name character varying(255),
    color_code character varying(255)
);


--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: site_settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.site_settings (
    id integer NOT NULL,
    key character varying(255) NOT NULL,
    value jsonb,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: site_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.site_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: site_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.site_settings_id_seq OWNED BY public.site_settings.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255) DEFAULT 'ADMIN'::character varying,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    name character varying(255),
    is_verified boolean DEFAULT false
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: custom_orders id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.custom_orders ALTER COLUMN id SET DEFAULT nextval('public.custom_orders_id_seq'::regclass);


--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);


--
-- Name: knex_migrations_lock index; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_lock_index_seq'::regclass);


--
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: otps id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.otps ALTER COLUMN id SET DEFAULT nextval('public.otps_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: site_settings id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_settings ALTER COLUMN id SET DEFAULT nextval('public.site_settings_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.categories (id, name, created_at, updated_at) FROM stdin;
5	Silk Ikkat	2026-03-15 15:11:33.838254+05:30	2026-03-15 15:11:33.838254+05:30
6	Cotton Ikkat	2026-03-15 15:11:33.838254+05:30	2026-03-15 15:11:33.838254+05:30
7	Dupattas	2026-03-15 15:11:33.838254+05:30	2026-03-15 15:11:33.838254+05:30
8	Lehengas	2026-03-15 15:11:33.838254+05:30	2026-03-15 15:11:33.838254+05:30
\.


--
-- Data for Name: custom_orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.custom_orders (id, name, phone, email, "sareeType", "colorPreference", message, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.customers (id, name, email, phone, created_at, updated_at) FROM stdin;
1	Abrar Ali	sonuabrar1999@gmail.com	7013712802	2026-03-15 16:14:58.613983+05:30	2026-03-15 16:14:58.613983+05:30
\.


--
-- Data for Name: knex_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.knex_migrations (id, name, batch, migration_time) FROM stdin;
1	20260305202242_init_schema.js	1	2026-03-06 02:10:30.224+05:30
2	20260315094445_add_name_to_users.js	2	2026-03-15 15:15:25.754+05:30
3	20260319151000_create_site_settings.js	3	2026-03-19 15:08:41.102+05:30
4	20260319163000_add_color_variants_to_products.js	4	2026-03-19 16:28:40.557+05:30
5	20260325084426_add_otps_table.js	5	2026-03-25 14:15:19.355+05:30
\.


--
-- Data for Name: knex_migrations_lock; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.knex_migrations_lock (index, is_locked) FROM stdin;
1	0
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.messages (id, name, email, phone, content, "isRead", created_at, updated_at) FROM stdin;
1	Abrar Ali	sonuabrar1999@gmail.com	\N	Crimson Silk Ikat Saree	f	2026-03-16 16:23:26.973356+05:30	2026-03-16 16:23:26.973356+05:30
2	Abrar Ali	sonuabrar1999@gmail.com	\N	I want to buy sarees	f	2026-03-24 18:14:34.818911+05:30	2026-03-24 18:14:34.818911+05:30
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.order_items (id, order_id, product_id, quantity, price) FROM stdin;
10	10	9	1	14500.00
11	11	4	1	14500.00
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders (id, customer_id, "totalAmount", status, created_at, updated_at) FROM stdin;
10	1	14500.00	Delivered	2026-03-24 19:06:28.57256+05:30	2026-03-24 19:06:28.57256+05:30
11	1	14500.00	Processing	2026-03-24 19:20:43.01308+05:30	2026-03-24 19:20:43.01308+05:30
\.


--
-- Data for Name: otps; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.otps (id, email, otp_code, type, expires_at, attempts, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products (id, name, sku, price, "imageUrl", images, availability, "fabricDetails", length, "blousePieceInfo", "deliveryTime", "careInstructions", category_id, created_at, updated_at, group_id, color_name, color_code) FROM stdin;
5	Golden Beige Wedding Ikkat	IK-SLK-002	18000.00	http://localhost:5000/uploads/images-1773911297577.png	{http://localhost:5000/uploads/images-1773911297577.png,http://localhost:5000/uploads/images-1773911297605.png,http://localhost:5000/uploads/images-1773911297621.png,http://localhost:5000/uploads/images-1773911297641.png}	Only 1 Piece Available	\N	\N	\N	\N	\N	5	2026-03-15 15:11:33.843661+05:30	2026-03-15 15:11:33.843661+05:30	\N	Golden Beige	#DAA520
4	Crimson Silk Red Ikkat Saree	IK-SLK-001	14500.00	http://localhost:5000/uploads/images-1773906845147.png	{http://localhost:5000/uploads/images-1773906845147.png,http://localhost:5000/uploads/images-1773908216420.png,http://localhost:5000/uploads/images-1773908635533.png}	Only 1 Piece Available	\N	\N	\N	\N	\N	5	2026-03-15 15:11:33.843661+05:30	2026-03-15 15:11:33.843661+05:30	IK-SLK-001	Crimson Red	#DC143C
8	Crimson Silk Blue Ikkat Saree	IK-SLK-001/Blue	14500.00	http://localhost:5000/uploads/images-1773920397880.png	{http://localhost:5000/uploads/images-1773920397880.png,http://localhost:5000/uploads/images-1773920397909.png,http://localhost:5000/uploads/images-1773920397930.png}	In Stock	\N	\N	\N	\N	\N	5	2026-03-19 17:09:57.962547+05:30	2026-03-19 17:09:57.962547+05:30	IK-SLK-001	Crimson Blue 	#1E3A8A
9	Crimson Silk Black Ikkat Saree	IK-SLK-001/Black	14500.00	http://localhost:5000/uploads/images-1773920785561.png	{http://localhost:5000/uploads/images-1773920785561.png,http://localhost:5000/uploads/images-1773920785596.png,http://localhost:5000/uploads/images-1773920785612.png}	Only 2 Piece Available	\N	\N	\N	\N	\N	5	2026-03-19 17:16:25.64698+05:30	2026-03-19 17:16:25.64698+05:30	IK-SLK-001	Crimson Black	#2B0F14
6	Navi Blue Cotton Ikkat	IK-COT-001	6500.00	http://localhost:5000/uploads/images-1773910626692.png	{http://localhost:5000/uploads/images-1773910626692.png,http://localhost:5000/uploads/images-1773910626733.png,http://localhost:5000/uploads/images-1773910626749.png,http://localhost:5000/uploads/images-1773910626774.png}	In Stock	\N	\N	\N	\N	\N	6	2026-03-15 15:11:33.843661+05:30	2026-03-15 15:11:33.843661+05:30	IK-COT-001	Navy Blue	#000080
11	Emerald Green Ikkat Dupatta	IK-DUP-001	2500.00	http://localhost:5000/uploads/images-1774948281471.png	{http://localhost:5000/uploads/images-1774948281471.png,http://localhost:5000/uploads/images-1774948281505.png,http://localhost:5000/uploads/images-1774948281531.png}	In Stock	Pure Cotton	2.5 meters	\N	\N	\N	7	2026-03-31 14:28:09.224755+05:30	2026-03-31 14:28:09.224755+05:30	\N	Emerald Green	#0F5C3A
10	Yellow Cotton Ikkat	IK-COT-001/yellow	6500.00	http://localhost:5000/uploads/images-1774941317978.png	{http://localhost:5000/uploads/images-1774941317978.png,http://localhost:5000/uploads/images-1774941318045.png,http://localhost:5000/uploads/images-1774941318077.png}	In stock	\N	\N	\N	\N	\N	6	2026-03-31 12:45:18.274672+05:30	2026-03-31 12:45:18.274672+05:30	IK-COT-001	yellow	#FFFF00
12	Royal Magenta Ikkat Lehenga	IK-LEH-001	22000.00	http://localhost:5000/uploads/images-1774950233209.png	{http://localhost:5000/uploads/images-1774950233209.png,http://localhost:5000/uploads/images-1774950233246.png,http://localhost:5000/uploads/images-1774950233275.png}	Only 1 Piece Available	Pure Silk	\N	Includes matching unstitched blouse piece	\N	\N	8	2026-03-31 14:28:09.236063+05:30	2026-03-31 14:28:09.236063+05:30	IK-LEH-001	Royal Magenta	#A0125B
\.


--
-- Data for Name: site_settings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.site_settings (id, key, value, created_at, updated_at) FROM stdin;
1	heritage_section	{"estText": "Three Decades of Excellence", "estYear": "Est. 1995", "imageUrl": "http://localhost:5000/uploads/image-1773914067900.png", "description1": "Preserving the timeless art of Pochampally Ikat weaving. Each saree is handcrafted with precision and tradition, carrying forward centuries of heritage in every thread.", "description2": "Every piece we create reflects the dedication of skilled artisans who have inherited this craft through generations. From the intricate tying and dyeing of yarns to the final weaving on traditional looms, every stage is carried out with care, patience, and uncompromising attention to detail.", "description3": "Since 1995, we have been working directly with master weavers, ensuring authenticity and supporting the artisan community that keeps this beautiful craft alive."}	2026-03-19 15:20:36.149218+05:30	2026-03-19 15:24:30.912615+05:30
2	process_page	{"intro": {"p1": "Pochampally Ikat is more than just a fabric—it's a living art form that has been passed down through generations. The name \\"Ikat\\" comes from the Malay-Indonesian word \\"mengikat,\\" meaning \\"to tie\\" or \\"to bind,\\" referring to the resist-dyeing technique that creates these distinctive patterns.", "p2": "Each piece takes weeks, sometimes months, to complete. From the initial design to the final thread, every step is performed by hand with meticulous attention to detail. Our weavers are not just craftspeople—they are artists preserving a heritage that dates back centuries.", "p3": "What makes Pochampally Ikat unique is the precision required in aligning the dyed yarns during weaving. When done correctly, the patterns emerge with perfect clarity, creating geometric and floral motifs that are instantly recognizable."}, "steps": [{"desc": "The journey begins with conceptualizing the design. Our master weavers sketch traditional Ikat patterns, ensuring each motif carries forward centuries of heritage.", "title": "Design & Planning"}, {"desc": "High-quality silk or cotton yarns are carefully selected and prepared. The yarns are then wound onto bobbins, ready for the intricate dyeing process.", "title": "Yarn Preparation"}, {"desc": "This is the heart of Ikat weaving. Sections of yarn are tightly bound with threads before dyeing, creating resist patterns. The process is repeated multiple times with different colors to achieve the desired design.", "title": "Resist Dyeing (Ikat Technique)"}, {"desc": "The dyed yarns are carefully arranged on the loom as warp threads. This requires immense skill and precision, as the alignment determines the final pattern quality.", "title": "Warping & Setting Up the Loom"}, {"desc": "The actual weaving begins. Our skilled artisans work on traditional handlooms, carefully interlacing the weft threads with the warp. Each pass of the shuttle is deliberate and precise.", "title": "Hand Weaving"}, {"desc": "Once weaving is complete, the fabric undergoes careful finishing. Edges are hemmed, and each piece is thoroughly inspected to ensure it meets our exacting standards of quality and authenticity.", "title": "Finishing & Quality Check"}], "artisans": {"p1": "Behind every saree is a master weaver who has dedicated their life to perfecting this craft. Many of our artisans come from families that have been weaving Ikat for generations, with skills passed down from parent to child", "p2": "We work directly with these talented craftspeople, ensuring fair compensation and supporting the continuation of this beautiful tradition. When you purchase a Pochampally Ikat piece from us, you're not just buying a saree—you're supporting an entire community of artisans and helping preserve a cultural heritage.", "image": "http://localhost:5000/uploads/image-1773915976605.png", "quote": "\\"Every thread tells a story. Every pattern carries a memory. This is not just weaving—it's keeping our heritage alive.\\"", "quoteAuthor": "— Master Weaver, Pochampally"}, "timeline": [{"desc": "Started working directly with master weavers in Pochampally", "year": "1995", "title": "Foundation"}, {"desc": "Received recognition for preserving traditional Ikat techniques", "year": "2005", "title": "Recognition"}, {"desc": "Expanded to serve customers across India", "year": "2015", "title": "Expansion"}, {"desc": "Continuing to preserve and promote authentic Pochampally Ikkat", "year": "2025", "title": "Today"}]}	2026-03-19 15:56:16.645619+05:30	2026-03-19 16:00:39.476027+05:30
3	home_page	{"heroImageUrl": "http://localhost:5000/uploads/image-1774355453657.png"}	2026-03-24 18:00:53.773523+05:30	2026-03-24 18:00:53.773523+05:30
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, email, password, role, created_at, updated_at, name, is_verified) FROM stdin;
2	admin@pochampally.com	$2b$10$s1X5IHCuMkF.TR/N7mPdPuwDiAoYYtGWjokwGdENR20f66w7WOGqC	ADMIN	2026-03-15 15:11:33.831598+05:30	2026-03-15 15:11:33.831598+05:30	\N	f
3	abrar@gmail.com	$2b$10$81jmdt0x15bRFg4xdW.O6em0MPQYvueK691FFt5xz3uTXMrV5s1Z.	USER	2026-03-15 15:15:45.465888+05:30	2026-03-15 15:15:45.465888+05:30	Abrar Ali	f
5	adnan@gmail.com	$2b$10$lhnICkRiaPlHhr6SrbBOkORqaAYyCwMNqRDbyXJxh1wSdx8RjTJ0u	USER	2026-03-15 15:44:27.429915+05:30	2026-03-15 15:44:27.429915+05:30	Adnan Ali	f
6	john@gmail.com	$2b$10$6ZJhh6IoJ8EJNTz5six3BeVhvyPiybQbR2.7TMYlF.rbFxmvKtQo6	USER	2026-03-24 19:18:13.171219+05:30	2026-03-24 19:18:13.171219+05:30	john	f
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_id_seq', 8, true);


--
-- Name: custom_orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.custom_orders_id_seq', 1, true);


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.customers_id_seq', 1, true);


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.knex_migrations_id_seq', 5, true);


--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.knex_migrations_lock_index_seq', 1, true);


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.messages_id_seq', 2, true);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.order_items_id_seq', 11, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.orders_id_seq', 11, true);


--
-- Name: otps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.otps_id_seq', 1, false);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_id_seq', 12, true);


--
-- Name: site_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.site_settings_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- Name: categories categories_name_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_unique UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: custom_orders custom_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.custom_orders
    ADD CONSTRAINT custom_orders_pkey PRIMARY KEY (id);


--
-- Name: customers customers_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_email_unique UNIQUE (email);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: knex_migrations_lock knex_migrations_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: otps otps_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.otps
    ADD CONSTRAINT otps_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: products products_sku_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_sku_unique UNIQUE (sku);


--
-- Name: site_settings site_settings_key_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_key_unique UNIQUE (key);


--
-- Name: site_settings site_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: products_group_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX products_group_id_index ON public.products USING btree (group_id);


--
-- Name: order_items order_items_order_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_foreign FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: order_items order_items_product_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_foreign FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: orders orders_customer_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_customer_id_foreign FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE CASCADE;


--
-- Name: products products_category_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_foreign FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

