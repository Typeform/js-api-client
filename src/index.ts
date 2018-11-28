import { TypeformForms } from './forms';
import { TypeformHttpClient } from './http-client';
import { TypeformImages } from './images';
import { TypeformResponses } from './responses';
import { TypeformTeams } from './teams';
import { TypeformThemes } from './themes';
import { TypeformWebhooks } from './webhooks';
import { TypeformWorkspaces } from './workspaces';

export class TypeformClient {
  private _http: TypeformHttpClient;

  constructor(args: any = {}) {
    if (args['token'] === undefined) {
      throw new Error('Token is missing');
    }
    this._http = new TypeformHttpClient(args);
  }

  get forms(): TypeformForms {
    return new TypeformForms(this._http);
  }

  get images(): TypeformImages {
    return new TypeformImages(this._http);
  }

  get responses(): TypeformResponses {
    return new TypeformResponses(this._http);
  }

  get teams(): TypeformTeams {
    return new TypeformTeams(this._http);
  }

  get themes(): TypeformThemes {
    return new TypeformThemes(this._http);
  }

  get webhooks(): TypeformWebhooks {
    return new TypeformWebhooks(this._http);
  }

  get workspaces(): TypeformWorkspaces {
    return new TypeformWorkspaces(this._http);
  }
}
