export class Organization{

    
    public constructor(
        public orgName: string,
        public dateCreated: Date,
        public email: string,
        public user: object,
        public description: string){   }
}