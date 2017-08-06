

import { Member } from "models/member";

export interface IGetMembersResponse {
  _embedded: {
    members: Member[]
  }
}