select
  __forums__."name" as "0",
  __forums__."id" as "1",
  to_char(__forums__."archived_at", 'YYYY-MM-DD"T"HH24:MI:SS.USTZH:TZM'::text) as "2"
from app_public.forums as __forums__
where
  (
    __forums__.archived_at is not null
  ) and (
    true /* authorization checks */
  )
order by __forums__."id" asc;

select __messages_result__.*
from (select 0 as idx, $1::"uuid" as "id0", $2::"timestamptz" as "id1") as __messages_identifiers__,
lateral (
  select
    __messages__."body" as "0",
    __users__."username" as "1",
    __users__."gravatar_url" as "2",
    __messages_identifiers__.idx as "3"
  from app_public.messages as __messages__
  left outer join app_public.users as __users__
  on (__messages__."author_id"::"uuid" = __users__."id")
  where
    (
      (__messages__.archived_at is null) = (__messages_identifiers__."id1" is null)
    ) and (
      __messages__."forum_id" = __messages_identifiers__."id0"
    )
  order by __messages__."id" asc
) as __messages_result__;

select __messages_result__.*
from (select 0 as idx, $1::"uuid" as "id0", $2::"timestamptz" as "id1") as __messages_identifiers__,
lateral (
  select
    __messages__."id" as "0",
    __messages__."body" as "1",
    __users__."username" as "2",
    __users__."gravatar_url" as "3",
    __messages_identifiers__.idx as "4"
  from app_public.messages as __messages__
  left outer join app_public.users as __users__
  on (__messages__."author_id"::"uuid" = __users__."id")
  where
    (
      (__messages__.archived_at is null) = (__messages_identifiers__."id1" is null)
    ) and (
      __messages__."forum_id" = __messages_identifiers__."id0"
    )
  order by __messages__."id" asc
) as __messages_result__;
