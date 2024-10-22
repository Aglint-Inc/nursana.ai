drop policy "Allow public read access" on "storage"."objects";

drop policy "Give users authenticated access to folder 1jgvrq_0" on "storage"."objects";

drop policy "Give users authenticated access to folder 1jgvrq_2" on "storage"."objects";

drop policy "Give users authenticated access to folder 1jgvrq_1" on "storage"."objects";

create policy "Allow authenticated read access"
on "storage"."objects"
as permissive
for select
to authenticated
using ((bucket_id = 'resumes'::text));


create policy "Give all users Insert access to folder 1jgvrq_0"
on "storage"."objects"
as permissive
for insert
to public
with check ((bucket_id = 'audio'::text));


create policy "Give users authenticated read access to folder 1jgvrq_1"
on "storage"."objects"
as permissive
for select
to authenticated
using ((bucket_id = 'audio'::text));



