insert into "c"."left_arm" as __left_arm__ ("length_in_metres") values ($1::"float8") returning
  __left_arm__."id"::text as "0",
  __left_arm__."person_id"::text as "1",
  __left_arm__."length_in_metres"::text as "2",
  __left_arm__."mood" as "3"