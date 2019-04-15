import { createParamDecorator } from '@nestjs/common';

export const sessionUser = createParamDecorator((data, req) => {
  return req.session.passport.user;
});
