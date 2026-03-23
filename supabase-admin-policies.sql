alter table public.profile enable row level security;
alter table public.projects enable row level security;

create policy "Public can read profile"
on public.profile
for select
to anon
using (true);

create policy "Public can read projects"
on public.projects
for select
to anon
using (true);

create policy "Authenticated users can read profile"
on public.profile
for select
to authenticated
using (true);

create policy "Authenticated users can update profile"
on public.profile
for update
to authenticated
using (true)
with check (true);

create policy "Authenticated users can insert profile"
on public.profile
for insert
to authenticated
with check (true);

create policy "Authenticated users can read projects"
on public.projects
for select
to authenticated
using (true);

create policy "Authenticated users can insert projects"
on public.projects
for insert
to authenticated
with check (true);

create policy "Authenticated users can update projects"
on public.projects
for update
to authenticated
using (true)
with check (true);

create policy "Authenticated users can delete projects"
on public.projects
for delete
to authenticated
using (true);
