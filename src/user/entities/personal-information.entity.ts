export class PersonalInformationEntity {
    lastname: string;
    firstname: string;
    personalinfo: PersonalInfo
}
class PersonalInfo {
    idcard: string;
    phonenumber: string;
    birthday: Date;
    address: string
}