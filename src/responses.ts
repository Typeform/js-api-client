import { TypeformHttpClient } from './http-client';

export class TypeformResponses {
  constructor(private _http: TypeformHttpClient) { }

  /**
   * Returns form responses and date and time of form landing and submission.
   * 
   * @param args.uid Unique ID for the form. Find in your form URL. For example, in the URL "https://mysite.typeform.com/to/u6nXL7" the form_id is u6nXL7. 
   * @param args.pageSize Maximum number of responses. Default value is 25. Maximum value is 1000. If your typeform has fewer than 1000 responses, you can retrieve all of the responses in a single request by adding the page_size parameter rather than sending multiple requests that iterate through a page={X} parameter. If your typeform has more than 1000 responses, use the since and until query parameters to narrow the scope of your request.
   * @param args.since Limit request to responses submitted since the specified date and time. In ISO 8601 format, UTC time, to the second, with T as a delimiter between the date and time.
   * @param args.until Limit request to responses submitted until the specified date and time. In ISO 8601 format, UTC time, to the second, with T as a delimiter between the date and time.
   * @param args.after Limit request to responses submitted after the specified token. If you use the after parameter, the responses will be sorted in the order that our system processed them (instead of the default order, submitted_at). This ensures that you can traverse the complete set of responses without repeating entries.
   * @param args.before Limit request to responses submitted before the specified token. If you use the before parameter, the responses will be sorted in the order that our system processed them (instead of the default order, submitted_at). This ensures that you can traverse the complete set of responses without repeating entries.
   * @param args.completed true if form was submitted. Otherwise, false.
   * @param args.sort Order of responses. Currently, responses are automatically sorted by submitted_at,desc---the date they were submitted, from newest to oldest. We plan to add more options for sort order soon.
   * @param args.query Limit request to only responses that that include the specified term.
   * @param args.fields Limit request to only responses for the specified fields.
   * @returns Promise that resolves with a representation of collection of responses to a specific form. It is used for displaying results in a human-friendly format.
   */
  public list(args: { 
    uid: string, pageSize?: number, since?: string, until?: string, after?: string, before?: string,
    completed?: boolean, sort?: string, query?: string, fields?: string[]
  } = {
    uid: undefined
  }): Promise<Response> {
    const { uid, pageSize, since, until, after, before, completed, sort, query, fields } = args;

    return this._http.request({
      method: 'get',
      url: `/forms/${uid}/responses`,
      params: {
        page_size: pageSize,
        since,
        until,
        after,
        before,
        completed,
        sort,
        query,
        fields
      }
    });
  }
}