import * as beet from '@metaplex-foundation/beet';
import { Creator } from './Creator';
export declare type Data = {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: beet.COption<Creator[]>;
};
export declare const dataBeet: beet.FixableBeetArgsStruct<Data>;
