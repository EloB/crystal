import type { PgInsertPlan, PgSource } from "@dataplan/pg";
import { pgInsert } from "@dataplan/pg";
import type { ObjectPlan } from "graphile-crystal";
import { constant } from "graphile-crystal";
import { ExecutablePlan, object } from "graphile-crystal";
import { EXPORTABLE } from "graphile-exporter";
import type { Plugin } from "graphile-plugin";
import type { GraphQLOutputType } from "graphql";

import { getBehavior } from "../behavior";
import { version } from "../index";

declare global {
  namespace GraphileEngine {
    interface Inflection {
      createField(
        this: Inflection,
        source: PgSource<any, any, any, any>,
      ): string;
      createInputType(
        this: Inflection,
        source: PgSource<any, any, any, any>,
      ): string;
      createPayloadType(
        this: Inflection,
        source: PgSource<any, any, any, any>,
      ): string;
      tableFieldName(
        this: Inflection,
        source: PgSource<any, any, any, any>,
      ): string;
    }
  }
}

const isInsertable = (source: PgSource<any, any, any, any>) => {
  if (source.parameters) return false;
  if (!source.codec.columns) return false;
  if (source.codec.isAnonymous) return false;
  const behavior = getBehavior(source.extensions);
  if (behavior && !behavior.includes("create")) {
    return false;
  }
  return true;
};

export const PgMutationCreatePlugin: Plugin = {
  name: "PgMutationCreatePlugin",
  description: "Adds 'create' mutation for supported sources",
  version: version,

  inflection: {
    add: {
      createField(options, source) {
        return this.camelCase(`create-${this.tableType(source.codec)}`);
      },
      createInputType(options, source) {
        return this.upperCamelCase(`${this.createField(source)}-input`);
      },
      createPayloadType(options, source) {
        return this.upperCamelCase(`${this.createField(source)}-payload`);
      },
      tableFieldName(options, source) {
        return this.camelCase(`${this.tableType(source.codec)}`);
      },
    },
  },

  schema: {
    hooks: {
      init(_, build) {
        const {
          inflection,
          graphql: { GraphQLString, GraphQLNonNull },
        } = build;
        const insertableSources = build.input.pgSources.filter(isInsertable);

        insertableSources.forEach((source) => {
          build.recoverable(null, () => {
            const tableTypeName = inflection.tableType(source.codec);
            const inputTypeName = inflection.createInputType(source);
            const tableFieldName = inflection.tableFieldName(source);
            build.registerInputObjectType(
              inputTypeName,
              {},
              () => ({
                fields: ({ fieldWithHooks }) => {
                  const TableInput = build.getGraphQLTypeByPgCodec(
                    source.codec,
                    "input",
                  );
                  return {
                    clientMutationId: {
                      type: GraphQLString,
                      plan: EXPORTABLE(
                        () =>
                          function plan($input: ObjectPlan<any>, value) {
                            $input.set("clientMutationId", value);
                          },
                        [],
                      ),
                    },
                    ...(TableInput
                      ? {
                          [tableFieldName]: fieldWithHooks(
                            {
                              fieldName: tableFieldName,
                            },
                            () => ({
                              description: build.wrapDescription(
                                `The \`${tableTypeName}\` to be created by this mutation.`,
                                "field",
                              ),
                              type: new GraphQLNonNull(TableInput),
                              plan: EXPORTABLE(
                                () =>
                                  function plan(
                                    $object: ObjectPlan<{
                                      result: PgInsertPlan<any, any, any>;
                                    }>,
                                  ) {
                                    const $record =
                                      $object.getPlanForKey("result");
                                    return $record.setPlan();
                                  },
                                [],
                              ),
                            }),
                          ),
                        }
                      : null),
                  };
                },
              }),
              `PgMutationCreatePlugin input for ${source.name}`,
            );

            const payloadTypeName = inflection.createPayloadType(source);
            build.registerObjectType(
              payloadTypeName,
              {
                isMutationPayload: true,
                pgCodec: source.codec,
              },
              ExecutablePlan as any,
              () => ({
                fields: ({ fieldWithHooks }) => {
                  const TableType = build.getGraphQLTypeByPgCodec(
                    source.codec,
                    "output",
                  ) as GraphQLOutputType | undefined;
                  return {
                    clientMutationId: {
                      type: GraphQLString,
                      plan: EXPORTABLE(
                        (constant) =>
                          function plan($mutation: ObjectPlan<any>) {
                            return (
                              $mutation.getPlanForKey(
                                "clientMutationId",
                                true,
                              ) ?? constant(null)
                            );
                          },
                        [constant],
                      ),
                    },
                    ...(TableType
                      ? {
                          [tableFieldName]: fieldWithHooks(
                            {
                              fieldName: tableFieldName,
                            },
                            {
                              type: TableType,
                              plan: EXPORTABLE(
                                () =>
                                  function plan(
                                    $object: ObjectPlan<{
                                      result: PgInsertPlan<any, any, any>;
                                    }>,
                                  ) {
                                    return $object.get("result");
                                  },
                                [],
                              ),
                            },
                          ),
                        }
                      : null),
                  };
                },
              }),
              `PgMutationCreatePlugin payload for ${source.name}`,
            );
          });
        });

        return _;
      },

      GraphQLObjectType_fields(fields, build, context) {
        const {
          inflection,
          sql,
          graphql: { GraphQLNonNull },
        } = build;
        const {
          scope: { isRootMutation },
          Self,
          fieldWithHooks,
        } = context;
        if (!isRootMutation) {
          return fields;
        }

        const insertableSources = build.input.pgSources.filter(isInsertable);
        return insertableSources.reduce((memo, source) => {
          return build.recoverable(memo, () => {
            const createFieldName = inflection.createField(source);
            const payloadTypeName = inflection.createPayloadType(source);
            const payloadType = build.getOutputTypeByName(payloadTypeName);
            const mutationInputType = build.getInputTypeByName(
              inflection.createInputType(source),
            );
            const tableFieldName = inflection.tableFieldName(source);

            return build.extend(
              memo,
              {
                [createFieldName]: fieldWithHooks(
                  { fieldName: createFieldName },
                  {
                    args: {
                      input: {
                        type: new GraphQLNonNull(mutationInputType),
                        plan: EXPORTABLE(
                          () =>
                            function plan(
                              _: any,
                              $object: ObjectPlan<{
                                result: PgInsertPlan<any, any, any>;
                              }>,
                            ) {
                              return $object;
                            },
                          [],
                        ),
                      },
                    },
                    type: payloadType,
                    plan: EXPORTABLE(
                      (object, pgInsert, source) =>
                        function plan() {
                          return object({
                            result: pgInsert(source, {}),
                          });
                        },
                      [object, pgInsert, source],
                    ),
                  },
                ),
              },
              `Adding create mutation for ${source.name}`,
            );
          });
        }, fields);
      },
    },
  },
};
