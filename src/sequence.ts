import { inject } from '@loopback/core';
import {
  SequenceHandler,
  RequestContext,
  RestBindings,
  FindRoute,
  ParseParams,
  InvokeMethod,
  Send,
  InvokeMiddleware,
  Reject,
  Response,
} from '@loopback/rest';
import corsConfig from './configs/cors.config';

const SequenceActions = RestBindings.SequenceActions;

export class MySequence implements SequenceHandler {
  @inject(SequenceActions.INVOKE_MIDDLEWARE, { optional: true })
  protected invokeMiddleware: InvokeMiddleware = () => false;

  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject
  ) {}

  async handle(context: RequestContext): Promise<void> {
    try {
      const { request, response } = context;

      this.setUpCors(response)

      if (request.method === 'OPTIONS') {
        response.status(corsConfig.optionsSuccessStatus);
        this.send(response, 'ok');
      } else {
        const finished = await this.invokeMiddleware(context);

        if (finished) {
          return;
        }

        const route = this.findRoute(request);
        const args = await this.parseParams(request, route);
        const result = await this.invoke(route, args);
        this.send(response, result);
      }
    } catch (err) {
      this.reject(context, err);
    }
  }

  private setUpCors(response: Response): void {
    response.header('Access-Control-Allow-Origin', corsConfig.origin);
    response.header('Access-Control-Allow-Methods', corsConfig.methods);
    response.header('Access-Control-Allow-Headers', corsConfig.allowedHeaders)
    response.header('Access-Control-Allow-Credentials', corsConfig.credentials)
  }
}
