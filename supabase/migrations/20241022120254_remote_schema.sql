grant delete on table "storage"."s3_multipart_uploads" to "postgres";

grant insert on table "storage"."s3_multipart_uploads" to "postgres";

grant references on table "storage"."s3_multipart_uploads" to "postgres";

grant select on table "storage"."s3_multipart_uploads" to "postgres";

grant trigger on table "storage"."s3_multipart_uploads" to "postgres";

grant truncate on table "storage"."s3_multipart_uploads" to "postgres";

grant update on table "storage"."s3_multipart_uploads" to "postgres";

grant delete on table "storage"."s3_multipart_uploads_parts" to "postgres";

grant insert on table "storage"."s3_multipart_uploads_parts" to "postgres";

grant references on table "storage"."s3_multipart_uploads_parts" to "postgres";

grant select on table "storage"."s3_multipart_uploads_parts" to "postgres";

grant trigger on table "storage"."s3_multipart_uploads_parts" to "postgres";

grant truncate on table "storage"."s3_multipart_uploads_parts" to "postgres";

grant update on table "storage"."s3_multipart_uploads_parts" to "postgres";

create policy "Allow anonymous uploads"
on "storage"."objects"
as permissive
for insert
to public
with check ((bucket_id = 'resumes'::text));


create policy "Allow public read access"
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'resumes'::text));


create policy "Give all Insert access to folder 1livt5k_1"
on "storage"."objects"
as permissive
for insert
to public
with check ((bucket_id = 'videos'::text));


create policy "Give users authenticated access to folder 1jgvrq_0"
on "storage"."objects"
as permissive
for select
to public
using (((bucket_id = 'audio'::text) AND ((storage.foldername(name))[1] = 'interviews'::text) AND (auth.role() = 'authenticated'::text)));


create policy "Give users authenticated access to folder 1jgvrq_1"
on "storage"."objects"
as permissive
for insert
to public
with check (((bucket_id = 'audio'::text) AND ((storage.foldername(name))[1] = 'interviews'::text) AND (auth.role() = 'authenticated'::text)));


create policy "Give users authenticated access to folder 1jgvrq_2"
on "storage"."objects"
as permissive
for update
to public
using (((bucket_id = 'audio'::text) AND ((storage.foldername(name))[1] = 'interviews'::text) AND (auth.role() = 'authenticated'::text)));


create policy "Give users authenticated access to folder 1livt5k_0"
on "storage"."objects"
as permissive
for select
to authenticated
using ((bucket_id = 'videos'::text));



