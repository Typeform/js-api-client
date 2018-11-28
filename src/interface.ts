namespace ICommon {
  export interface Attachment {
    /**
     * Valid values: `"image"` `"video"`
     * Type of attachment.
     */
    type?: 'image' | 'video';
    /**
     * URL for the image or video you want to display. Images must already exist in your account---use the image's Typeform URL, such as
     * `"https://images.typeform.com/images/kbn8tc98AHb"`. For videos, use the video's YouTube.com URL.
     */
    href?: string;
    /**
     * Valid values: 0.4, 0.6, 0.8, 1
     * Optional parameter for responsively scaling videos. Available only for "video" type. Default value is 0.6
     */
    scale?: 0.4 | 0.6 | 0.8 | 1;
  }
  export namespace Field {
    interface Base {
      /**
       * Readable name you can use to reference the field.
       */
      ref?: string;
      /**
       * Unique name you assign to the field on this form.
       */
      title: string;
      /**
       * Valid values: 'date", "dropdown", "email", "file_upload", "group", "legal", "long_text", "multiple_choice", "number",
       * "opinion_scale", "payment", "picture_choice", "rating", "short_text", "statement", "website", "yes_no"
       * The type of field.
       */
      type: 'date' | 'dropdown' | 'email' | 'file_upload' | 'group' | 'legal' | 'long_text' | 'multiple_choice' | 'number' |
      'opinion_scale' | 'payment' | 'picture_choice' | 'rating' | 'short_text' | 'statement' | 'website' | 'yes_no';
      validations: Validations;
      /**
       * Allows you to display images and videos. Available for welcome and thank you screens, as well as date, dropdown, email, group,
       * long_text, multiple_choice, number, opinion_scale, payment, rating, short_text, statement, and yes_no fields.
       */
      attachment: Attachment;
    }
    namespace Properties {
      interface Base {
        /**
         * Question or instruction to display for the field.
         */
        description?: string;
        /**
         * Answer choices. Available for dropdown, multiple_choice, and picture_choice types.
         */
        choices?: Array<{
          /**
           * Readable name you can use to reference the answer choice.
           * Available for multiple_choice and picture_choice types. Not available for dropdown types.
           */
          ref?: string;
          /**
           * Text for the answer choice.
           */
          label?: string;
          /**
           * Identifies the image to use for the answer choice. Available only for picture_choice types.
           */
          attachment?: {
            /**
             * Valid values: image
             * Type of attachment.
             */
            type?: 'image';
            /**
             * URL for the image to use for the answer choice. Images must already exist in your account---use the image's Typeform URL.
             */
            href?: string;
          }
        }>;
        /**
         * Contains the fields that belong in a question group. Only payment and group blocks are not allowed inside a question group.
         * Available for the group type.
         */
        fields?: any[][];
        /**
         * true to allow respondents to select more than one answer choice. false to allow respondents to select only one answer choice.
         * Available for multiple_choice and picture_choice types.
         */
        allow_multiple_selection?: boolean;
        /**
         * true if answer choices should be presented in a new random order for each respondent.
         * false if answer choices should be presented in the same order for each respondent.
         * Available for multiple_choice and picture_choice types.
         */
        randomize?: boolean;
        /**
         * true to include an "Other" option so respondents can enter a different answer choice from those listed.
         * false to limit answer choices to those listed. Available for multiple_choice and picture_choice types.
         */
        allow_other_choice?: boolean;
        /**
         * true to list answer choices vertically. false to list answer choices horizontally. Available for multiple_choice types.
         */
        vertical_alignment?: boolean;
        /**
         * true if you want to use larger-sized images for answer choices. Otherwise, false. Available for picture_choice types.
         */
        supersized?: boolean;
        /**
         * Default: '"
         * true to show text labels and images as answer choices.
         * false to show only images as answer choices. Available for picture_choice types.
         */
        show_labels?: boolean;
        /**
         * true if question should list dropdown answer choices in alphabetical order.
         * false if question should list dropdown answer choices in the order they're listed in the "choices" array.
         * Available for dropdown types.
         */
        alphabetical_order?: boolean;
        /**
         * true if you want to display quotation marks around the statement on the form. Otherwise, false. Available for statement types.
         */
        hide_marks?: boolean;
        /**
         * Default: 'Continue"
         * Text to display in the button associated with the object. Available for group, payment, and statement types.
         */
        button_text?: string;
        /**
         * Number of steps in the scale's range. Minimum is 5 and maximum is 11. Available for opinion_scale and rating types.
         */
        steps?: number;
        /**
         * Valid values: 'cat", "circle", "cloud", "crown", "dog", "droplet", "flag", "heart", "lightbulb", "pencil", "skull", "star",
         * "thunderbolt", "tick", "trophy", "up", "user"
         * Default: 'star"
         * Shape to display on the scale's steps. Available for opinion_scale and rating types.
         */
        shape?: 'cat' | 'circle' | 'cloud' | 'crown' | 'dog' | 'droplet' | 'flag' | 'heart' | 'lightbulb' | 'pencil' | 'skull' | 'star' |
        'thunderbolt' | 'tick' | 'trophy' | 'up' | 'user';
        /**
         * Label to help respondents understand the scale's range. Available for opinion_scale and rating types.
         */
        labels?: {
          /**
           * Text of the left-aligned label for the scale.
           */
          left?: string;
          /**
           * Text of the right-aligned label for the scale.
           */
          right?: string;
          /**
           * Text of the center-aligned label for the scale.
           */
          center?: string;
        };
        /**
         * true if range numbering should start at 1. false if range numbering should start at 0. Available for opinion_scale types.
         */
        start_at_one?: boolean;
      }
      export interface CreateForm extends Base {
        logic?: ICommon.Logic.CreateForm[];
      }
      export interface GetForm extends Base {
        /**
         * Valid values: 'MMDDYYYY", "DDMMYYYY", "YYYYMMDD"
         * Default: 'DDMMYYYY"
         * Format for month, date, and year in answer. Available for date types.
         */
        structure?: 'MMDDYYYY' | 'DDMMYYYY' | 'YYYYMMDD';
        /**
         * Valid values: '/", "-". ".""
         * Default: '/"
         * Character to use between month, day, and year in answer. Available for date types.
         */
        separator?: '/' | '-' | '.';
        /**
         * Valid values:AUDBRLCADCHFDKKEURGBPMXNNOKSEKUSD
         * Default:EUR
         * Currency of the payment. Available for payment types.
         */
        currency?: 'AUD' | 'BRL' | 'CAD' | 'CHF' | 'DKK' | 'EUR' | 'GBP' | 'MXN' | 'NOK' | 'SEK' | 'USD';
        /**
         * Price of the item. Available for payment fields.
         */
        price?: {
          /**
           * Valid values: 'variable"
           */
          type?: 'variable';
          /**
           * Valid values: 'price"
           */
          value?: 'price';
        };
        /**
         * true to display a button. Otherwise, false. Available for group and payment types.
         */
        show_button?: boolean;
      }
    }
    interface Validations {
      /**
       * true if respondents must provide an answer. Otherwise, false. Available for date, dropdown, email, file_upload, legal, long_text
       *  multiple_choice, number, opinion_scale, payment, picture_choice, rating, short_text, website, and yes_no types.
       */
      required?: boolean;
      /**
       * Maximum number of characters allowed in the answer. Available for long_text, number, and short_text types.
       */
      max_length?: number;
      /**
       * Maximum value allowed in the answer. Available for number types.
       */
      min_value?: number;
      /**
       * Maximum value allowed in the answer. Available for number types.
       */
      max_value?: number;
    }
    export interface CreateForm extends Base {
      properties: Properties.CreateForm;
    }
    export interface GetForm extends Base {
      properties: Properties.GetForm;
    }
  }
  export namespace Logic {
    interface Base {
      /**
       * Valid values: 'field", "hidden"
       * Specifies whether the Logic Jump is based on a question field or Hidden Field.
       */
      type: 'field' | 'hidden';
      /**
       * Reference to the field that triggers the the Logic Jump.
       */
      ref?: string;
      //actions
    }
    interface Actions {
      /**
       * Valid values: 'jump", "add", "subtract", "multiply", "divide"
       * Behavior the Logic Jump will take.
       */
      action: 'jump' | 'add' | 'subtract' | 'multiply' | 'divide';
      /**
       * Properties that further specify how the Logic Jump will behave.
       */
      details: {
        /**
         * Specifies where the Logic Jump leads---to another field ("field"), a Hidden Field ("hidden"), or thank you screen ("thankyou").
         */
        to?: {
          /**
           * Valid values: 'field", "hidden", "thankyou"
           * Logic Jump "to" option you are using.
           */
          type: 'field' | 'hidden' | 'thankyou';
          /**
           * The "ref" value for the field, Hidden Field, or thank you screen the Logic Jump leads to.
           */
          value: string;
        }
        /**
         * Keeps a running total for the score or price variable.
         */
        target?: {
          /**
           * Valid values: 'variable"
           * Specifies that the value is a variable.
           */
          type: 'variable';
          /**
           * Valid values: 'score", "price"
           * Variable value to use in calculation.
           */
          value: 'score' | 'price';
        }
        /**
         * Specifies the numeric value to use in the calculation for the score or price variable
         */
        value?: {
          /**
           * Valid values: 'constant"
           * Specifies that the numeric value is a constant.
           */
          type: 'constant';
          /**
           * Numeric value to use in calculation.
           */
          value: number;
        }
      };
      /**
       * Conditions for executing the Logic Jump. Conditions answer the question, "Under what circumstances?"
       * The condition object is the IF statement in your Logic Jump.
       */
      condition: {
        /**
         * Valid values: 'begins_with", "ends_with", "contains", "not_contains", "lower_than", "lower_equal_than", "greater_than",
         * "greater_equal_than", "is", "is_not", "equal", "not_equal", "always", "on", "not_on", "earlier_than", "earlier_than_or_on",
         * "later_than", "later_than_or_on"
         * Operator for the condition.
         */
        op: 'begins_with' | 'ends_with' | 'contains' | 'not_contains' | 'lower_than' | 'lower_equal_than' | 'greater_than' |
        'greater_equal_than' | 'is' | 'is_not' | 'equal' | 'not_equal' | 'always' | 'on' | 'not_on' | 'earlier_than' |
        'earlier_than_or_on' | 'later_than' | 'later_than_or_on';
        /**
         * Object that defines the field type and value to evaluate with the operator.
         */
        vars: Array<{
          /**
           * Valid values: 'field", "hidden", "variable", "constant", "end"
           * Type of value the condition object refers to.
           */
          type: 'field' | 'hidden' | 'variable' | 'constant' | 'end';
          /**
           * Value to check for in the "type" field to evaluate with the operator.
           */
          value: any;
        }>;
      };
    }
    export interface CreateForm extends Base {
      /**
       * Array of objects that define the Logic Jump's behavior.
       */
      actions?: Actions[];
    }
    export interface GetForm extends Base {
      /**
       * Array of objects that define the Logic Jump's behavior.
       */
      actions: Actions[];
    }
  }
  export namespace Settings {
    interface Base {
      /**
       * Valid values: en, es, ca, fr, de, ru, it, da, pt, ch, zh, nl, no, uk, ja, ko, hr, fi, sv, pl, el, hu, tr, cs, et, di
       */
      language?: 'en' | 'es' | 'ca' | 'fr' | 'de' | 'ru' | 'it' | 'da' | 'pt' | 'ch' | 'zh' | 'nl' | 'no' | 'uk' | 'ja' | 'ko' | 'hr' |
      'fi' | 'sv' | 'pl' | 'el' | 'hu' | 'tr' | 'cs' | 'et' | 'di';
      /**
       * Default: '"
       * true if your form is public. Otherwise, false (your form is private).
       */
      is_public?: boolean;
      /**
       * Valid values: 'percentage", "proportion"
       * Default: 'proportion"
       * Basis for the progress bar displayed on the screen. Choose "proportion" to show the number of questions answered so far.
       * Choose "percentage" to show the percentage of questions answered so far.
       */
      progress_bar?: 'percentage' | 'proportion';
      /**
       * Default: '"
       * true to display progress bar on the typeform. Otherwise, false.
       */
      show_progress_bar?: boolean;
      meta?: {
        /**
         * Default: '"
         * true to allow search engines to index your typeform. Otherwise, false.
         */
        allow_indexing?: boolean;
        /**
         * Description for search engines to display for your typeform.
         */
        description?: string;
        image?: {
          /**
           * URL of image for search engines to display for your typeform.
           */
          href?: string;
        }
      };
      /**
       * URL where the typeform should redirect upon submission.
       */
      redirect_after_submit_url?: string;
      /**
       * Google Analytics tracking ID to use for the form.
       */
      google_analytics?: string;
      /**
       * Facebook Pixel tracking ID to use for the form.
       */
      facebook_pixel?: string;
      // google_tag_manager?: string;
      notifications?: {
        /**
         * Settings for notifications sent when respondents complete and submit the typeform.
         */
        self?: {
          /**
           * Default: '"
           * true to send notifications. false to disable notifications.
           */
          enabled?: boolean;
          recipients: string[];
          /**
           * Email address to use for notification Reply-To.
           * Must be a piped value based on respondent's answer to a field: {{field:ref}} or {{hidden:ref}}.
           */
          reply_to?: string;
          /**
           * Subject to use for the notification email. Can combine text and piped value from one or more fields.
           * Available piped values are {{form:title}}, {{account:email}}, {{account:name}}, {{link:report}}
           *  and standard piping for fields {{field:ref}} and hidden fields {{hidden:ref}}.
           */
          subject: string;
          /**
           * Message to include in the body of the notification email. Can combine text and piped value from one or more fields.
           * Available piped values are {{form:title}}, {{account:email}}, {{account:name}}, {{link:report}}, {{form:all_answers}},
           * and standard piping for fields {{field:ref}} and hidden fields {{hidden:ref}}.
           * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
           */
          message: string;
        }
        /**
         * Settings for notifications sent to respondents immediately after submitting the typeform.
         */
        respondent?: {
          /**
           * Default: '"
           * true to send respondent notifications. false to disable respondent notifications.
           */
          enabled?: boolean;
          /**
           * Email where respondent notification will be sent.
           * Must be a piped value based on respondent's answer to a field: {{field:ref}} or {{hidden:ref}}.
           */
          recipient: string;
          reply_to?: string[];
          /**
           * Subject to use for the notification email. Can combine text and piped value from one or more fields.
           * Available piped values are {{form:title}}, {{account:fullname}}, {{account:email}}, {{account:name}}, {{link:report}},
           * and standard piping for fields {{field:ref}} and hidden fields {{hidden:ref}}.
           */
          subject: string;
          /**
           * Message to include in the body of the notification email. Can combine text and piped value from one or more fields.
           * Available piped values are {{form:title}}, {{account:fullname}}, {{account:email}}, {{account:name}}, {{link:report}},
           * {{form:all_answers}}, and standard piping for fields {{field:ref}} and hidden fields {{hidden:ref}}.
           * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
           */
          message: string;
        }
      };
    }
    export interface CreateForm extends Base {
      /**
       * Default: '"
       * true to display Typeform brand on the typeform. false to hide Typeform branding on the typeform.
       * Hiding Typeform branding is available for PRO+ accounts.
       */
      show_typeform_branding?: boolean;
    }
    export interface GetForm extends Base {
      /**
       * Default: '"
       * true to display Typeform brand on the typeform. false to hide Typeform branding on the typeform.
       * Hiding Typeform branding is available for PRO+ accounts.
       */
      show_typeform_branding?: boolean;
    }
  }
  export interface ThankYouScreen {
    /**
     * Readable name you can use to reference the thank you screen.
     */
    ref?: string;
    /**
     * Title for the thank you screen.
     */
    title: string;
    properties?: {
      /**
       * true to display a 'Submit' button on the thank you screen. Otherwise, false.
       */
      show_button?: boolean;
      /**
       * Text to display on the 'Submit' button on the thank you screen.
       */
      button_text?: string;
      /**
       * Valid values: 'reload", "redirect"
       * Specify whether the form should reload or redirect to another URL when respondents click the 'Submit' button. PRO+ feature.
       */
      button_mode?: 'reload' | 'redirect';
      /**
       * URL where the typeform should redirect after submission, if you specified "redirect" for button_mode.
       */
      redirect_url?: string;
      /**
       * true to display social media sharing icons on the thank you screen so respondents can post your typeform's link on Facebook,
       * Twitter, LinkedIn, and Google+. Otherwise, false
       */
      share_icons?: boolean;
    };
    attachment?: Attachment;
  }
  export interface Variables {
    /**
     * Valid values: 0
     * Variable for keeping score as users answer each question (for example, for quizzes).
     */
    score?: 0;
    /**
     * Variable for tracking the total price of all items users select (for example, for shopping carts, donation campaigns, and
     * payment collections).
     */
    price?: number;
  }
  export interface WelcomeScreen {
    /**
     * Readable name you can use to reference the welcome screen.
     */
    ref?: string;
    /**
     * Title for the welcome screen.
     */
    title: string;
    properties?: {
      /**
       * Description of the welcome screen.
       */
      description?: string;
      /**
       * true to display a 'Start' button on the welcome screen. Otherwise, false.
       */
      show_button?: boolean;
      /**
       * Text to display on the 'Start' button on the welcome screen.
       */
      button_text?: string;
    };
    /**
     * Allows you to display images and videos. Available for welcome and thank you screens, as well as date, dropdown, email, group,
     * long_text, multiple_choice, number, opinion_scale, payment, rating, short_text, statement, and yes_no fields.
     */
    attachment?: Attachment;
  }
}

export namespace ITypeform {
  export namespace Forms {
    export interface Create {
      /**
       * Title to use for the typeform.
       */
      title: string;
      settings?: ICommon.Settings.CreateForm;
      /**
       * URL of the theme to use for the typeform.
       * If you don't specify a URL for the theme, Typeform applies a new copy of the default theme to the form.
       */
      theme?: string;
      /**
       * URL of the workspace to use for the typeform.
       * If you don't specify a URL for the workspace, Typeform saves the form in the default workspace.
       */
      workspace?: {
        href?: string;
      };
      /**
       * Default: '"
       * Array of Hidden Fields to use in the form.
       */
      hidden?: string[];
      variables?: ICommon.Variables;
      welcome_screens?: ICommon.WelcomeScreen[];
      thankyou_screens?: ICommon.ThankYouScreen[];
      fields?: ICommon.Field.CreateForm[];
      logic?: ICommon.Logic.CreateForm[];
    }
    export interface Get {
      id?: string;
      title?: string;
      /**
       * Default: 'en"
       */
      language?: string;
      /**
       * Default: '"
       */
      fields?: ICommon.Field.GetForm[];
      hidden?: string[];
      welcome_screens?: ICommon.WelcomeScreen[];
      thankyou_screens?: ICommon.ThankYouScreen[];
      logic?: ICommon.Logic.GetForm;
      theme?: {
        href?: string;
      };
      workspace?: {
        href?: string;
      };
      _links?: {
        display?: string;
      };
      settings?: ICommon.Settings.GetForm;
    }
    export interface List {
      total_items: number;
      page_count: number;
      items: Array<{
        id: string;
        title: string;
        last_updated_at: string;
        self: {
          href: string;
        };
        theme: {
          href: string;
        };
        _links: {
          display: string;
        }
      }>;
    }
    export interface Messages {
      /**
       * Default tooltip button message. Maximum 28 characters.
       * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'label.buttonHint.default'?: string;
      /**
       * Tooltip button message for long text blocks. Maximum 28 characters.
       * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'label.buttonHint.longtext'?: string;
      /**
       * Server connection error message. Maximum 128 characters.
       * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'label.warning.connection'?: string;
      /**
       * Default continue button message. Maximum 100 characters.
       */
      'label.buttonNoAnswer.default'?: string;
      /**
       * List of errors message. Maximum 128 characters.
       * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'label.warning.correction'?: string;
      /**
       * Credit card name message. You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'block.payment.cardNameTitle'?: string;
      /**
       * Credit card number message. You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'block.payment.cardNumberTitle'?: string;
      /**
       * Credit card security number message
       */
      'block.payment.cvcDescription'?: string;
      /**
       * Credit card CVC number message. You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'block.payment.cvcNumberTitle'?: string;
      /**
       * Text input placeholder. Maximum 100 characters.
       */
      'block.shortText.placeholder'?: string;
      /**
       * Invalid email error message. Maximum 64 characters.
       * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'label.error.emailAddress'?: string;
      /**
       * Credit card expiry month message. You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'label.error.expiryMonthTitle'?: string;
      /**
       * Credit card expiry year message. You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'label.error.expiryYearTitle'?: string;
      /**
       * Fallback alert message. You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'label.warning.fallbackAlert'?: string;
      /**
       * File upload button message. Maximum 34 characters.
       * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'block.fileUpload.choose'?: string;
      /**
       * File upload dragging action message. Maximum 35 characters.
       * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'block.fileUpload.drag'?: string;
      /**
       * Still processing file upload message.
       * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'block.fileUpload.uploadingProgress'?: string;
      /**
       * File too big error message. You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'label.error.sizeLimit'?: string;
      /**
       * Private form error message. Accepts variable form:name. Maximum 128 characters.
       * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'label.warning.formUnavailable'?: string;
      /**
       * Incomplete fields error message. Maximum 42 characters.
       * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'label.error.incompleteForm'?: string;
      /**
       * Key letter hint message. Maximum 100 characters.
       */
      'label.hint.key'?: string;
      /**
       * Legal field deny message. You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'block.legal.reject'?: string;
      /**
       * Legal field accept message. You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'block.legal.accept'?: string;
      /**
       * Number maximum value tooltip message. Accepts variable field:max. Maximum 64 characters.
       * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'label.error.maxValue'?: string;
      /**
       * Text fields maximum length tooltip message. Accepts variable field:max_length. Maximum 64 characters.
       * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'label.error.maxLength'?: string;
      /**
       * Number minimum value tooltip message. Accepts variable field:min. Maximum 64 characters.
       * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'label.error.minValue'?: string;
      /**
       * Number minimum and maximum range value tooltip message. Accepts variables field:min and field:max. Maximum 64 characters.
       * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'label.error.range'?: string;
      /**
       * Choose as many as you like message for multiple choice fields. Maximum 45 characters.
       * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'block.multipleChoice.hint'?: string;
      /**
       * Required value error message. Maximum 64 characters.
       * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'label.error.mustEnter'?: string;
      /**
       * Required selection error message. Maximum 64 characters.
       * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'label.error.mustSelect'?: string;
      /**
       * Keyboard shortcut for the "No" option. Maximum 1 character.
       */
      'label.no.shortcut'?: string;
      /**
       * Representation for the word "No." You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'label.no.default'?: string;
      /**
       * Not suggestions found for dropdown fields error message. Maximum 64 characters.
       * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'block.dropdown.hint'?: string;
      /**
       * Other answer message. Maximum 100 characters.
       */
      'block.multipleChoice.other'?: string;
      /**
       * Completion percentage message. Accepts variable progress:percent. Maximum 100 characters.
       */
      'label.progress.percent'?: string;
      /**
       * Completion proportion message. Accepts variables progress:step and progress:total. Maximum 100 characters.
       */
      'label.progress.proportion'?: string;
      /**
       * Required field error message. Maximum 64 characters.
       * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'label.error.required'?: string;
      /**
       * Review fields error message. Accepts variable form:unanswered_fields. Maximum 64 characters.
       * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'label.preview'?: string;
      /**
       * Review button message. Maximum 100 characters.
       */
      'label.button.review'?: string;
      /**
       * Server error message. Maximum 128 characters.
       * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'label.error.server'?: string;
      /**
       * Share text message. Maximum 100 characters.
       */
      'label.action.share'?: string;
      /**
       * Submit button message. Maximum 100 characters.
       */
      'label.button.submit'?: string;
      /**
       * Successful submit message. Maximum 128 characters.
       * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'label.warning.success'?: string;
      /**
       * Answer confirm. Maximum 100 characters.
       */
      'label.button.ok'?: string;
      /**
       * Legal field terms and conditions message. Maximum 64 characters.
       * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'label.error.mustAccept'?: string;
      /**
       * Long text field tooltip message. Maximum 128 characters.
       * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'block.longtext.hint'?: string;
      /**
       * Placeholder message with instructions for dropdown fields. Maximum 100 characters.
       */
      'block.dropdown.placeholder'?: string;
      /**
       * Placeholder message with instructions for dropdown fields on touch devices. Maximum 100 characters.
       */
      'block.dropdown.placeholderTouch'?: string;
      /**
       * Invalid URL error message. Maximum 64 characters.
       * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'label.error.url'?: string;
      /**
       * Keyboard shortcut for the "Yes" option. Maximum 1 character.
       */
      'label.yes.shortcut'?: string;
      /**
       * Representation for the word "Yes". You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
       */
      'label.yes.default'?: string;
    }
  }
  export namespace Images {
    export interface Image {
      /**
       * Unique ID for the image.
       */
      id?: string;
      /**
       * URL for the image.
       */
      src?: string;
      /**
       * File name for the image (specified when image is created).
       */
      file_name?: string;
      /**
       * Width of the image in pixels.
       */
      width?: number;
      /**
       * Height of the image in pixels.
       */
      height?: number;
      /**
       * Valid values: 'image/gif", "image/jpeg", "image/png"
       * The MIME type of the image.
       */
      media_type?: 'image/gif' | 'image/jpeg' | 'image/png';
      /**
       * True if image has alpha channel (some degree of transparency). Otherwise, false.
       */
      has_alpha?: boolean;
      /**
       * Average color of the image in hexadecimal format.
       */
      avg_color?: string;
    }
    export interface ListImage {
      /**
       * Unique ID for the image.
       */
      id?: string;
      /**
       * URL for the image.
       */
      src?: string;
      /**
       * File name for the image (specified when image is created).
       */
      file_name?: string;
    }
  }
  export namespace Teams {
    export interface Get {
      /**
       * Total number of seats included on your team.
       */
      total_seats?: number;
      /**
       * Array of objects that include information about each team member.
       */
      members?: Array<{
        /**
         * Name of the team member's Typeform account.
         */
        name?: string;
        /**
         * The email address associated with the team member's Typeform account.
         */
        email?: string;
        /**
         * Valid values: 'owner", "member"
         * The team member's role on the team. The account holder is owner, and all other team members are member.
         */
        role?: 'owner' | 'member';
      }>;
    }
  }
  export namespace Themes {
    interface Base {
      /**
       * Settings for the background.
       */
      background?: {
        /**
         * Background image URL.
         */
        href?: string;
        /**
         * Valid values: 'fullscreen", "repeat", "no-repeat"
         * Default:fullscreen
         * Layout for the background.
         */
        layout?: 'fullscreen' | 'repeat' | 'no-repeat';
        /**
         * Brightness for the background. -1 is least bright (minimum) and 1 is most bright (maximum).
         */
        brightness: number;
      };
      /**
       * Colors the theme will apply to answers, background, buttons, and questions.
       */
      colors: {
        /**
         * Default: '#4FB0AE"
         * Color the theme will apply to answers. Hexadecimal value.
         */
        answer: string;
        /**
         * Default: '#FFFFFF"
         * Color the theme will apply to the background. Hexadecimal value.
         */
        background: string;
        /**
         * Default: '#4FB0AE"
         * Color the theme will apply to buttons. Hexadecimal value.
         */
        button: string;
        /**
         * Default: '#3D3D3D"
         * Color the theme will apply to questions. Hexadecimal value.
         */
        question: string;
      };
      /**
       * Valid values: 'Acme", "Arial", "Arvo", "Avenir Next", "Bangers", "Cabin", "Cabin Condensed", "Courier", "Crete Round",
       * "Dancing Script", "Exo", "Georgia", "Handlee", "Helvetica Neue", "Karla", "Lato", "Lekton", "Lobster", "Lora", "McLaren",
       * "Montserrat", "Nixie One", "Old Standard TT", "Open Sans", "Oswald", "Playfair Display", "Quicksand", "Raleway", "Signika",
       * "Sniglet", "Source Sans Pro", "Vollkorn"
       * Default: 'Source Sans Pro"
       * Font for the theme.
       */
      font: 'Acme' | 'Arial' | 'Arvo' | 'Avenir Next' | 'Bangers' | 'Cabin' | 'Cabin Condensed' | 'Courier' | 'Crete Round' |
      'Dancing Script' | 'Exo' | 'Georgia' | 'Handlee' | 'Helvetica Neue' | 'Karla' | 'Lato' | 'Lekton' | 'Lobster' | 'Lora' |
      'McLaren' | 'Montserrat' | 'Nixie One' | 'Old Standard TT' | 'Open Sans' | 'Oswald' | 'Playfair Display' | 'Quicksand' |
      'Raleway' | 'Signika' | 'Sniglet' | 'Source Sans Pro' | 'Vollkorn';
      /**
       * Name for the theme.
       */
      name: string;
    }
    export interface Create extends Base {
      /**
       * true if buttons should be transparent. Otherwise, false.
       */
      hasTransparentButton?: boolean;
    }
    export interface Theme extends Base {
      /**
       * true if buttons should be transparent. Otherwise, false.
       */
      has_transparent_button?: boolean;
      /**
       * Unique ID of the theme.
       */
      id?: string;
      /**
       * Valid values: 'public", "private"
       * Default: 'private"
       * Specifies whether the theme is public (one of Typeform's built-in themes that are available in all accounts)
       * or private (a theme you created).You can only change private themes. You can't change Typeform's public themes.
       */
      visibility?: 'public' | 'private';
    }
    export interface List {
      items: Theme[];
      page_count: number;
      total_items: number;
    }
    export interface Update extends Create {
      /**
       * Theme ID.
       */
      id: string;
    }
  }
  export namespace Webhooks {
    export interface CreateOrUpdate {
      /**
       * Unique ID for the form. Find in your form URL.
       * For example, in the URL "https://mysite.typeform.com/to/u6nXL7" the form_id is u6nXL7.
       */
      uid: string;
      /**
       * Unique name you want to use for the webhook.
       */
      tag: string;
      /**
       * Webhook URL
       */
      url: string;
      /**
       * True if you want to send responses to the webhook immediately. Otherwise, false.
       */
      enable?: boolean;
    }
    export interface WebHook {
      /**
       * Unique ID for the webhook.
       */
      id: string;
      /**
       * Unique ID for the typeform.
       */
      form_id: string;
      /**
       * Unique name you want to use for the webhook.
       */
      tag: string;
      /**
       * Webhook URL.
       */
      url: string;
      /**
       * True if you want to send responses to the webhook immediately. Otherwise, false.
       */
      enabled: boolean;
      /**
       * Date and time when webhook was created.
       * In ISO 8601 format, UTC time, to the second, with T as a delimiter between the date and time.
       */
      created_at: string;
      /**
       * Date of last update to webhook. In ISO 8601 format, UTC time, to the second, with T as a delimiter between the date and time.
       */
      updated_at: string;
    }
  }
}
