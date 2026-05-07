import { IncomingHttpHeaders } from "http";
import { fromNodeHeaders } from "better-auth/node";

import { auth } from "../../../lib/auth";

type SetUserPasswordUseCaseRequest = {
  id: string;
  password: string;
  headers: IncomingHttpHeaders;
};

export class SetUserPasswordUseCase {
  async execute({ id, password, headers }: SetUserPasswordUseCaseRequest) {
    return auth.api.setUserPassword({
      body: {
        userId: id,
        newPassword: password,
      },
      headers: fromNodeHeaders(headers),
    });
  }
}
