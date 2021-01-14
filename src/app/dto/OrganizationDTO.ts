import { Member } from "./Member";

export class OrganizationDTO{

    
    public constructor(
        public orgId:string,
        public orgName: string,
        public dateCreated: Date,
        public email: string,
        public user: object,
        public description: string
        ){   }
}