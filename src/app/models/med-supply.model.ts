import {MedSupplyTypeModel} from "./med-supply-type.model";

export class MedSupplyDto {
    supplyId?: string;
    medSupplyType?: MedSupplyTypeModel;
    kibbles?: number;
    logoUrl?: string;
    name?: string;
}
