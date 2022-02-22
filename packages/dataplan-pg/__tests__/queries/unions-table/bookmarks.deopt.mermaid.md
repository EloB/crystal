```mermaid
graph TD
    classDef path fill:#eee,stroke:#000,color:#000
    classDef plan fill:#fff,stroke-width:3px,color:#000
    classDef itemplan fill:#fff,stroke-width:6px,color:#000
    classDef sideeffectplan fill:#f00,stroke-width:6px,color:#000

    %% subgraph fields
    P1{{"~"}}:::path
    P2{{">personByPersonId"}}:::path
    P3([">pe…nId>personId"]):::path
    %% P2 -.-> P3
    P4([">pe…nId>username"]):::path
    %% P2 -.-> P4
    P5[/">pe…nId>personBookmarksList"\]:::path
    P6>">pe…nId>personBookmarksList[]"]:::path
    P5 -.- P6
    P7([">pe…nId>pe…t[]>id"]):::path
    %% P6 -.-> P7
    P8{{">pe…nId>pe…t[]>person"}}:::path
    P9([">pe…nId>pe…t[]>person>username"]):::path
    %% P8 -.-> P9
    %% P6 -.-> P8
    P10{{">pe…nId>pe…t[]>bookmarkedEntity"}}:::path
    P11([">pe…nId>pe…t[]>bo…ity>personId"]):::path
    %% P10 -.-> P11
    P12([">pe…nId>pe…t[]>bo…ity>username"]):::path
    %% P10 -.-> P12
    P13([">pe…nId>pe…t[]>bo…ity>postId"]):::path
    %% P10 -.-> P13
    P14{{">pe…nId>pe…t[]>bo…ity>author"}}:::path
    P15([">pe…nId>pe…t[]>bo…ity>author>username"]):::path
    %% P14 -.-> P15
    %% P10 -.-> P14
    P16([">pe…nId>pe…t[]>bo…ity>body"]):::path
    %% P10 -.-> P16
    P17([">pe…nId>pe…t[]>bo…ity>commentId"]):::path
    %% P10 -.-> P17
    P18{{">pe…nId>pe…t[]>bo…ity>author"}}:::path
    P19([">pe…nId>pe…t[]>bo…ity>author>username"]):::path
    %% P18 -.-> P19
    %% P10 -.-> P18
    P20{{">pe…nId>pe…t[]>bo…ity>post"}}:::path
    P21([">pe…nId>pe…t[]>bo…ity>post>body"]):::path
    %% P20 -.-> P21
    %% P10 -.-> P20
    P22([">pe…nId>pe…t[]>bo…ity>body"]):::path
    %% P10 -.-> P22
    %% P6 -.-> P10
    %% P2 -.-> P5
    %% P1 -.-> P2
    %% end

    %% define plans
    __Value_3["__Value[_3∈0]<br /><context>"]:::plan
    __Value_5["__Value[_5∈0]<br /><rootValue>"]:::plan
    InputStaticLeaf_7["InputStaticLeaf[_7∈0]"]:::plan
    PgSelect_8["PgSelect[_8∈0]<br /><people>"]:::plan
    First_12["First[_12∈0]"]:::plan
    PgSelectSingle_13["PgSelectSingle[_13∈0]<br /><people>"]:::plan
    PgClassExpression_14["PgClassExpression[_14∈0]<br /><__people__.#quot;person_id#quot;>"]:::plan
    PgClassExpression_15["PgClassExpression[_15∈0]<br /><__people__.#quot;username#quot;>"]:::plan
    __Item_21>"__Item[_21∈1]<br /><_92>"]:::itemplan
    PgSelectSingle_22["PgSelectSingle[_22∈1]<br /><person_bookmarks>"]:::plan
    PgClassExpression_23["PgClassExpression[_23∈1]<br /><__person_b...rks__.#quot;id#quot;>"]:::plan
    PgClassExpression_24["PgClassExpression[_24∈1]<br /><__person_b...person_id#quot;>"]:::plan
    PgSelect_25["PgSelect[_25∈1]<br /><people>"]:::plan
    First_29["First[_29∈1]"]:::plan
    PgSelectSingle_30["PgSelectSingle[_30∈1]<br /><people>"]:::plan
    PgClassExpression_31["PgClassExpression[_31∈1]<br /><__people__.#quot;username#quot;>"]:::plan
    PgClassExpression_32["PgClassExpression[_32∈1]<br /><__person_b...ed_entity#quot;>"]:::plan
    PgClassExpression_33["PgClassExpression[_33∈1]<br /><(__person_...person_id#quot;>"]:::plan
    PgClassExpression_34["PgClassExpression[_34∈1]<br /><(__person_....#quot;post_id#quot;>"]:::plan
    PgClassExpression_35["PgClassExpression[_35∈1]<br /><(__person_...omment_id#quot;>"]:::plan
    List_36["List[_36∈1]<br /><_33,_34,_35>"]:::plan
    PgPolymorphic_37["PgPolymorphic[_37∈1]"]:::plan
    First_42["First[_42∈1]"]:::plan
    PgSelectSingle_43["PgSelectSingle[_43∈1]<br /><people>"]:::plan
    PgClassExpression_44["PgClassExpression[_44∈1]<br /><__people__.#quot;person_id#quot;>"]:::plan
    PgClassExpression_45["PgClassExpression[_45∈1]<br /><__people__.#quot;username#quot;>"]:::plan
    First_50["First[_50∈1]"]:::plan
    PgSelectSingle_51["PgSelectSingle[_51∈1]<br /><posts>"]:::plan
    PgClassExpression_52["PgClassExpression[_52∈1]<br /><__posts__.#quot;post_id#quot;>"]:::plan
    PgClassExpression_53["PgClassExpression[_53∈1]<br /><__posts__.#quot;author_id#quot;>"]:::plan
    PgSelect_54["PgSelect[_54∈1]<br /><people>"]:::plan
    First_58["First[_58∈1]"]:::plan
    PgSelectSingle_59["PgSelectSingle[_59∈1]<br /><people>"]:::plan
    PgClassExpression_60["PgClassExpression[_60∈1]<br /><__people__.#quot;username#quot;>"]:::plan
    PgClassExpression_61["PgClassExpression[_61∈1]<br /><__posts__.#quot;body#quot;>"]:::plan
    First_66["First[_66∈1]"]:::plan
    PgSelectSingle_67["PgSelectSingle[_67∈1]<br /><comments>"]:::plan
    PgClassExpression_68["PgClassExpression[_68∈1]<br /><__comments...omment_id#quot;>"]:::plan
    PgClassExpression_69["PgClassExpression[_69∈1]<br /><__comments...author_id#quot;>"]:::plan
    PgSelect_70["PgSelect[_70∈1]<br /><people>"]:::plan
    First_74["First[_74∈1]"]:::plan
    PgSelectSingle_75["PgSelectSingle[_75∈1]<br /><people>"]:::plan
    PgClassExpression_76["PgClassExpression[_76∈1]<br /><__people__.#quot;username#quot;>"]:::plan
    PgClassExpression_77["PgClassExpression[_77∈1]<br /><__comments__.#quot;post_id#quot;>"]:::plan
    PgSelect_78["PgSelect[_78∈1]<br /><posts>"]:::plan
    Access_79["Access[_79∈0]<br /><_3.pgSettings>"]:::plan
    Access_80["Access[_80∈0]<br /><_3.withPgClient>"]:::plan
    Object_81["Object[_81∈0]<br /><{pgSettings,withPgClient}>"]:::plan
    First_82["First[_82∈1]"]:::plan
    PgSelectSingle_83["PgSelectSingle[_83∈1]<br /><posts>"]:::plan
    PgClassExpression_84["PgClassExpression[_84∈1]<br /><__posts__.#quot;body#quot;>"]:::plan
    PgClassExpression_85["PgClassExpression[_85∈1]<br /><__comments__.#quot;body#quot;>"]:::plan
    Map_86["Map[_86∈1]<br /><_22:{#quot;0#quot;:3,#quot;1#quot;:4}>"]:::plan
    List_87["List[_87∈1]<br /><_86>"]:::plan
    Map_88["Map[_88∈1]<br /><_22:{#quot;0#quot;:6,#quot;1#quot;:7,#quot;2#quot;:8}>"]:::plan
    List_89["List[_89∈1]<br /><_88>"]:::plan
    Map_90["Map[_90∈1]<br /><_22:{#quot;0#quot;:10,#quot;1#quot;:11,#quot;2#quot;:12,#quot;3#quot;:13}>"]:::plan
    List_91["List[_91∈1]<br /><_90>"]:::plan
    Access_92["Access[_92∈0]<br /><_12.0>"]:::plan

    %% plan dependencies
    Object_81 --> PgSelect_8
    InputStaticLeaf_7 --> PgSelect_8
    PgSelect_8 --> First_12
    First_12 --> PgSelectSingle_13
    PgSelectSingle_13 --> PgClassExpression_14
    PgSelectSingle_13 --> PgClassExpression_15
    Access_92 ==> __Item_21
    __Item_21 --> PgSelectSingle_22
    PgSelectSingle_22 --> PgClassExpression_23
    PgSelectSingle_22 --> PgClassExpression_24
    Object_81 --> PgSelect_25
    PgClassExpression_24 --> PgSelect_25
    PgSelect_25 --> First_29
    First_29 --> PgSelectSingle_30
    PgSelectSingle_30 --> PgClassExpression_31
    PgSelectSingle_22 --> PgClassExpression_32
    PgSelectSingle_22 --> PgClassExpression_33
    PgSelectSingle_22 --> PgClassExpression_34
    PgSelectSingle_22 --> PgClassExpression_35
    PgClassExpression_33 --> List_36
    PgClassExpression_34 --> List_36
    PgClassExpression_35 --> List_36
    PgClassExpression_32 --> PgPolymorphic_37
    List_36 --> PgPolymorphic_37
    List_87 --> First_42
    First_42 --> PgSelectSingle_43
    PgSelectSingle_43 --> PgClassExpression_44
    PgSelectSingle_43 --> PgClassExpression_45
    List_89 --> First_50
    First_50 --> PgSelectSingle_51
    PgSelectSingle_51 --> PgClassExpression_52
    PgSelectSingle_51 --> PgClassExpression_53
    Object_81 --> PgSelect_54
    PgClassExpression_53 --> PgSelect_54
    PgSelect_54 --> First_58
    First_58 --> PgSelectSingle_59
    PgSelectSingle_59 --> PgClassExpression_60
    PgSelectSingle_51 --> PgClassExpression_61
    List_91 --> First_66
    First_66 --> PgSelectSingle_67
    PgSelectSingle_67 --> PgClassExpression_68
    PgSelectSingle_67 --> PgClassExpression_69
    Object_81 --> PgSelect_70
    PgClassExpression_69 --> PgSelect_70
    PgSelect_70 --> First_74
    First_74 --> PgSelectSingle_75
    PgSelectSingle_75 --> PgClassExpression_76
    PgSelectSingle_67 --> PgClassExpression_77
    Object_81 --> PgSelect_78
    PgClassExpression_77 --> PgSelect_78
    __Value_3 --> Access_79
    __Value_3 --> Access_80
    Access_79 --> Object_81
    Access_80 --> Object_81
    PgSelect_78 --> First_82
    First_82 --> PgSelectSingle_83
    PgSelectSingle_83 --> PgClassExpression_84
    PgSelectSingle_67 --> PgClassExpression_85
    PgSelectSingle_22 --> Map_86
    Map_86 --> List_87
    PgSelectSingle_22 --> Map_88
    Map_88 --> List_89
    PgSelectSingle_22 --> Map_90
    Map_90 --> List_91
    First_12 --> Access_92

    %% plan-to-path relationships
    __Value_5 -.-> P1
    PgSelectSingle_13 -.-> P2
    PgClassExpression_14 -.-> P3
    PgClassExpression_15 -.-> P4
    Access_92 -.-> P5
    PgSelectSingle_22 -.-> P6
    PgClassExpression_23 -.-> P7
    PgSelectSingle_30 -.-> P8
    PgClassExpression_31 -.-> P9
    PgPolymorphic_37 -.-> P10
    PgClassExpression_44 -.-> P11
    PgClassExpression_45 -.-> P12
    PgClassExpression_52 -.-> P13
    PgSelectSingle_59 -.-> P14
    PgClassExpression_60 -.-> P15
    PgClassExpression_61 -.-> P16
    PgClassExpression_68 -.-> P17
    PgSelectSingle_75 -.-> P18
    PgClassExpression_76 -.-> P19
    PgSelectSingle_83 -.-> P20
    PgClassExpression_84 -.-> P21
    PgClassExpression_85 -.-> P22

    %% allocate buckets
    classDef bucket0 stroke:#696969
    class __Value_3,__Value_5,InputStaticLeaf_7,PgSelect_8,First_12,PgSelectSingle_13,PgClassExpression_14,PgClassExpression_15,Access_79,Access_80,Object_81,Access_92 bucket0
    classDef bucket1 stroke:#a52a2a
    class __Item_21,PgSelectSingle_22,PgClassExpression_23,PgClassExpression_24,PgSelect_25,First_29,PgSelectSingle_30,PgClassExpression_31,PgClassExpression_32,PgClassExpression_33,PgClassExpression_34,PgClassExpression_35,List_36,PgPolymorphic_37,First_42,PgSelectSingle_43,PgClassExpression_44,PgClassExpression_45,First_50,PgSelectSingle_51,PgClassExpression_52,PgClassExpression_53,PgSelect_54,First_58,PgSelectSingle_59,PgClassExpression_60,PgClassExpression_61,First_66,PgSelectSingle_67,PgClassExpression_68,PgClassExpression_69,PgSelect_70,First_74,PgSelectSingle_75,PgClassExpression_76,PgClassExpression_77,PgSelect_78,First_82,PgSelectSingle_83,PgClassExpression_84,PgClassExpression_85,Map_86,List_87,Map_88,List_89,Map_90,List_91 bucket1
```