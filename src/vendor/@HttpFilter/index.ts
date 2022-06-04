export abstract class HttpFilter {
  abstract catch(err, req, res, next): Promise<void> | void;
}
