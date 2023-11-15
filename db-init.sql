CREATE TABLE public.persons (
	id serial4 NOT NULL,
	"name" text NOT NULL,
	email text NULL,
	CONSTRAINT persons_email_key UNIQUE (email),
	CONSTRAINT persons_pkey PRIMARY KEY (id)
);

CREATE OR REPLACE FUNCTION public.ping()
 RETURNS text
 LANGUAGE sql
 STABLE
AS $function$   SELECT 'pong'; $function$
;