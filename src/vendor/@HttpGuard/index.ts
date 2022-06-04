export abstract class HttpGuard {
  abstract guard(req, res, next): Promise<boolean> | boolean;
}
