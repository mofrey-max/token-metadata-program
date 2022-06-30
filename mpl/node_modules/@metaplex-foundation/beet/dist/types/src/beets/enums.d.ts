import { FixedSizeBeet, SupportedTypeDefinition } from '../types';
export declare type Enum<T> = {
    [key: number | string]: string | number | T;
} | number | T;
/**
 * De/serializer for enums with up to 255 less variants which have no data.
 *
 * @param enumType type of enum to process, i.e. Color or Direction
 *
 * @category beet/enum
 */
export declare function fixedScalarEnum<T>(enumType: Enum<T>): FixedSizeBeet<Enum<T>, Enum<T>>;
/**
 * Represents an {@link Enum} type which contains fixed size data.
 *
 * @template Kind the enum variant, i.e. `Color.Red`
 * @template Data the data value, i.e. '#f00'
 *
 * @category beet/composite
 */
export declare type DataEnum<Kind, Data> = {
    kind: Kind & number;
    data: Data;
};
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
export declare function dataEnum<Kind, Data>(inner: FixedSizeBeet<Data>): FixedSizeBeet<DataEnum<Kind, Data>>;
/**
 * @category TypeDefinition
 */
export declare type EnumsExports = keyof typeof import('./enums');
/**
 * @category TypeDefinition
 */
export declare type EnumsTypeMapKey = 'fixedScalarEnum' | 'dataEnum';
/**
 * @category TypeDefinition
 */
export declare type EnumsTypeMap = Record<EnumsTypeMapKey, SupportedTypeDefinition & {
    beet: EnumsExports;
}>;
/**
 * Maps composite beet exports to metadata which describes in which package it
 * is defined as well as which TypeScript type is used to represent the
 * deserialized value in JavaScript.
 *
 * @category TypeDefinition
 */
export declare const enumsTypeMap: EnumsTypeMap;
