alter table public.properties
  add column if not exists province text;

update public.properties
set province = (regexp_match(location, '\(([^)]+)\)\s*$'))[1]
where province is null
  and location ~ '\([^)]+\)\s*$';

create index if not exists properties_province_idx on public.properties (province);
