"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enumsTypeMap = exports.dataEnum = exports.fixedScalarEnum = void 0;
const types_1 = require("../types");
const numbers_1 = require("./numbers");
const assert_1 = require("assert");
function resolveEnumVariant(value, isNumVariant) {
    return (isNumVariant ? `${value}` : value);
}
/**
 * De/serializer for enums with up to 255 less variants which have no data.
 *
 * @param enumType type of enum to process, i.e. Color or Direction
 *
 * @category beet/enum
 */
function fixedScalarEnum(enumType) {
    const keys = Object.keys(enumType);
    return {
        write(buf, offset, value) {
            const isNumVariant = typeof value === 'number';
            const variantKey = resolveEnumVariant(value, isNumVariant);
            if (!keys.includes(variantKey)) {
                assert_1.strict.fail(`${value} should be a variant of the provided enum type, i.e. [ ${Object.values(enumType).join(', ')} ], but isn't`);
            }
            if (isNumVariant) {
                numbers_1.u8.write(buf, offset, value);
            }
            else {
                const enumValue = enumType[variantKey];
                numbers_1.u8.write(buf, offset, enumValue);
            }
        },
        read(buf, offset) {
            const value = numbers_1.u8.read(buf, offset);
            const isNumVariant = typeof value === 'number';
            const variantKey = resolveEnumVariant(value, isNumVariant);
            if (!keys.includes(variantKey)) {
                assert_1.strict.fail(`${value} should be a of a variant of the provided enum type, i.e. [ ${Object.values(enumType).join(', ')} ], but isn't`);
            }
            return (isNumVariant ? value : enumType[variantKey]);
        },
        byteSize: numbers_1.u8.byteSize,
        description: 'Enum',
    };
}
exports.fixedScalarEnum = fixedScalarEnum;
/**
 * De/Serializes an {@link Enum} that contains a type of data, i.e. a {@link Struct}.
 * The main difference to a Rust enum is that the type of data has to be the
 * same for all enum variants.
 *
 * @template T inner enum data type
 *
 * @param inner the De/Serializer for the data type
 *
 * @category beet/enum
 */
function dataEnum(inner) {
    return {
        write: function (buf, offset, value) {
            numbers_1.u8.write(buf, offset, value.kind);
            inner.write(buf, offset + 1, value.data);
        },
        read: function (buf, offset) {
            const kind = numbers_1.u8.read(buf, offset);
            const data = inner.read(buf, offset + 1);
            return { kind, data };
        },
        byteSize: 1 + inner.byteSize,
        description: `DataEnum<${inner.description}>`,
    };
}
exports.dataEnum = dataEnum;
/**
 * Maps composite beet exports to metadata which describes in which package it
 * is defined as well as which TypeScript type is used to represent the
 * deserialized value in JavaScript.
 *
 * @category TypeDefinition
 */
exports.enumsTypeMap = {
    fixedScalarEnum: {
        beet: 'fixedScalarEnum',
        isFixable: false,
        sourcePack: types_1.BEET_PACKAGE,
        ts: '<TypeName>',
        arg: types_1.BEET_TYPE_ARG_INNER,
        pack: types_1.BEET_PACKAGE,
    },
    dataEnum: {
        beet: 'dataEnum',
        isFixable: false,
        sourcePack: types_1.BEET_PACKAGE,
        ts: 'DataEnum<Kind, Inner>',
        arg: types_1.BEET_TYPE_ARG_INNER,
        pack: types_1.BEET_PACKAGE,
    },
};
//# sourceMappingURL=enums.js.map