export abstract class HttpFilter {
  private static token = "filter";
  abstract catch(err, req, res, next): Promise<void> | void;
}
