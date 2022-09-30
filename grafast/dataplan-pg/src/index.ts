import debugFactory from "debug";
import { exportAsMany } from "grafast";
import type { SQL } from "pg-sql2";
import sql from "pg-sql2";

import { formatSQLForDebugging } from "./formatSQLForDebugging.js";

function sqlPrint(fragment: SQL): string {
  const { text } = sql.compile(fragment);
  return formatSQLForDebugging(text);
}

// TODO: polluting the global 'debug' namespace might be a bad idea...
// Registers the '%S' SQL formatter with the 'debug' module.
debugFactory.formatters.S = sqlPrint;

import {
  domainOfCodec,
  enumType,
  getCodecByPgCatalogTypeName,
  isEnumCodec,
  listOfType,
  PgTypeColumn,
  PgTypeColumnExtensions,
  PgTypeColumns,
  PgTypeColumnVia,
  PgTypeColumnViaExplicit,
  rangeOfCodec,
  recordType,
  TYPES,
} from "./codecs.js";
import {
  PgBox,
  PgCircle,
  PgHStore,
  PgInterval,
  PgLine,
  PgLseg,
  PgPath,
  PgPoint,
  PgPolygon,
} from "./codecUtils/index.js";
import {
  PgEnumSource,
  PgEnumSourceExtensions,
  PgEnumSourceOptions,
  PgFunctionSourceOptions,
  PgSource,
  PgSourceBuilder,
  PgSourceExtensions,
  PgSourceOptions,
  PgSourceParameter,
  PgSourceRelation,
  PgSourceRelationExtensions,
  PgSourceRow,
  PgSourceRowAttribute,
  PgSourceUnique,
  PgSourceUniqueExtensions,
} from "./datasource.js";
import {
  PgClient,
  PgClientQuery,
  PgClientResult,
  PgExecutor,
  PgExecutorContext,
  PgExecutorContextPlans,
  PgExecutorInput,
  PgExecutorMutationOptions,
  PgExecutorOptions,
  WithPgClient,
} from "./executor.js";
import { BooleanFilterStep } from "./filters/booleanFilter.js";
import { ClassFilterStep } from "./filters/classFilter.js";
import { ManyFilterStep } from "./filters/manyFilter.js";
import {
  PgClassSingleStep,
  PgDecode,
  PgEncode,
  PgEnumTypeCodec,
  PgEnumValue,
  PgGroupSpec,
  PgOrderSpec,
  PgTypeCodec,
  PgTypeCodecExtensions,
  PgTypedExecutableStep,
  PlanByUniques,
  TuplePlanMap,
} from "./interfaces.js";
import { PgSubscriber } from "./PgSubscriber.js";
import {
  pgClassExpression,
  PgClassExpressionStep,
} from "./steps/pgClassExpression.js";
import {
  PgConditionCapableParentStep,
  PgConditionStep,
} from "./steps/pgCondition.js";
import { PgCursorStep } from "./steps/pgCursor.js";
import { pgDelete, PgDeleteStep } from "./steps/pgDelete.js";
import { pgInsert, PgInsertStep } from "./steps/pgInsert.js";
import { pgPageInfo, PgPageInfoStep } from "./steps/pgPageInfo.js";
import {
  pgPolymorphic,
  PgPolymorphicStep,
  PgPolymorphicTypeMap,
} from "./steps/pgPolymorphic.js";
import {
  pgSelect,
  PgSelectArgumentDigest,
  PgSelectArgumentSpec,
  pgSelectFromRecords,
  PgSelectIdentifierSpec,
  PgSelectLockableParameter,
  PgSelectLockCallback,
  PgSelectMode,
  PgSelectOptions,
  PgSelectParsedCursorStep,
  PgSelectStep,
  sqlFromArgDigests,
} from "./steps/pgSelect.js";
import {
  pgSelectFromRecord,
  pgSelectSingleFromRecord,
  PgSelectSinglePlanOptions,
  PgSelectSingleStep,
} from "./steps/pgSelectSingle.js";
import {
  pgSingleTablePolymorphic,
  PgSingleTablePolymorphicStep,
} from "./steps/pgSingleTablePolymorphic.js";
import { pgUpdate, PgUpdateStep } from "./steps/pgUpdate.js";
import {
  pgValidateParsedCursor,
  PgValidateParsedCursorStep,
} from "./steps/pgValidateParsedCursor.js";
import { TempTableStep } from "./steps/tempTable.js";
import { toPg, ToPgStep } from "./steps/toPg.js";
import {
  withPgClient,
  WithPgClientStep,
  WithPgClientStepCallback,
} from "./steps/withPgClient.js";

export {
  BooleanFilterStep,
  ClassFilterStep,
  domainOfCodec,
  enumType,
  getCodecByPgCatalogTypeName,
  isEnumCodec,
  listOfType,
  ManyFilterStep,
  PgBox,
  PgCircle,
  pgClassExpression,
  PgClassExpressionStep,
  PgClassSingleStep,
  PgClient,
  PgClientQuery,
  PgClientResult,
  PgConditionCapableParentStep,
  PgConditionStep,
  PgCursorStep,
  PgDecode,
  pgDelete,
  PgDeleteStep,
  PgEncode,
  PgEnumSource,
  PgEnumSourceExtensions,
  PgEnumSourceOptions,
  PgEnumTypeCodec,
  PgEnumValue,
  PgExecutor,
  PgExecutorContext,
  PgExecutorContextPlans,
  PgExecutorInput,
  PgExecutorMutationOptions,
  PgExecutorOptions,
  PgFunctionSourceOptions,
  PgGroupSpec,
  PgHStore,
  pgInsert,
  PgInsertStep,
  PgInterval,
  PgLine,
  PgLseg,
  PgOrderSpec,
  pgPageInfo,
  PgPageInfoStep,
  PgPath,
  PgPoint,
  PgPolygon,
  pgPolymorphic,
  PgPolymorphicStep,
  PgPolymorphicTypeMap,
  pgSelect,
  PgSelectArgumentDigest,
  PgSelectArgumentSpec,
  pgSelectFromRecord,
  pgSelectFromRecords,
  PgSelectIdentifierSpec,
  PgSelectLockableParameter,
  PgSelectLockCallback,
  PgSelectMode,
  PgSelectOptions,
  PgSelectParsedCursorStep,
  pgSelectSingleFromRecord,
  PgSelectSinglePlanOptions,
  PgSelectSingleStep,
  PgSelectStep,
  pgSingleTablePolymorphic,
  PgSingleTablePolymorphicStep,
  PgSource,
  PgSourceBuilder,
  PgSourceExtensions,
  PgSourceOptions,
  PgSourceParameter,
  PgSourceRelation,
  PgSourceRelationExtensions,
  PgSourceRow,
  PgSourceRowAttribute,
  PgSourceUnique,
  PgSourceUniqueExtensions,
  PgSubscriber,
  PgTypeCodec,
  PgTypeCodecExtensions,
  PgTypeColumn,
  PgTypeColumnExtensions,
  PgTypeColumns,
  PgTypeColumnVia,
  PgTypeColumnViaExplicit,
  PgTypedExecutableStep,
  pgUpdate,
  PgUpdateStep,
  pgValidateParsedCursor,
  PgValidateParsedCursorStep,
  PlanByUniques,
  rangeOfCodec,
  recordType,
  sqlFromArgDigests,
  TempTableStep,
  toPg,
  ToPgStep,
  TuplePlanMap,
  TYPES,
  WithPgClient,
  withPgClient,
  WithPgClientStep,
  WithPgClientStepCallback,
};

exportAsMany("@dataplan/pg", {
  domainOfCodec,
  enumType,
  getCodecByPgCatalogTypeName,
  isEnumCodec,
  listOfType,
  rangeOfCodec,
  recordType,
  TYPES,
  PgEnumSource,
  PgSource,
  PgSourceBuilder,
  PgExecutor,
  BooleanFilterStep,
  ClassFilterStep,
  ManyFilterStep,
  PgSubscriber,
  pgClassExpression,
  PgClassExpressionStep,
  PgConditionStep,
  PgCursorStep,
  pgDelete,
  PgDeleteStep,
  pgInsert,
  PgInsertStep,
  pgPageInfo,
  PgPageInfoStep,
  pgPolymorphic,
  PgPolymorphicStep,
  pgSelect,
  pgSelectFromRecords,
  PgSelectStep,
  sqlFromArgDigests,
  pgSelectFromRecord,
  pgSelectSingleFromRecord,
  PgSelectSingleStep,
  pgSingleTablePolymorphic,
  PgSingleTablePolymorphicStep,
  pgUpdate,
  PgUpdateStep,
  pgValidateParsedCursor,
  PgValidateParsedCursorStep,
  TempTableStep,
  toPg,
  ToPgStep,
  withPgClient,
  WithPgClientStep,
});
