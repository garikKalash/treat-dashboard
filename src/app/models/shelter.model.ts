import { Address } from "./address.model";
import {Comment} from "./comment.model";

export class Shelter {
  name?: string;
  orgId?: string;
  visitors?: number;
  shelterLink?: string;
  shelterAddress?: Address;
  comments?: Comment[] = [];

  monthlyNeedMeals?: number;
  monthlyNeedTreats?: number;
  availableInSystem?: boolean;
}
