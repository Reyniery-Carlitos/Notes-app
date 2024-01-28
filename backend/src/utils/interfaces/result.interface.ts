import { type Request } from "express";
import { BaseEntity } from "../../base/base.entity";
import { User } from "../../user/user.entity";

export interface IResult {
  statusCode: number,
  message: string,
  entity?: BaseEntity | null,
  entities?: BaseEntity[] | null,
  resultkeys: string[]
}

export interface ILoginDataResult extends IResult {
  token: string | null,
  entity: User | null
}

export interface TokenUser {
  id: number,
  username: string
}

export interface CustomRequest extends Request {
  user?: TokenUser
}

export const RESULT_OK = 'ok';
export const NOT_FOUND = 'not-found';