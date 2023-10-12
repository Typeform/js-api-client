import { Typeform } from './typeform-types'

export class Insights {
  constructor(private _http: Typeform.HTTPClient) {}

  public summary(args: { uid: string }): Promise<Typeform.Insights> {
    const { uid } = args

    return this._http.request({
      method: 'get',
      url: `/insights/${uid}/summary`,
    })
  }
}
