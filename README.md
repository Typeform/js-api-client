# Typeform JavaScript SDK

[![Build Status](https://travis-ci.com/Typeform/js-api-client.svg?token=nePyGZWpdyBxUnh9PswC&branch=master)](https://travis-ci.com/Typeform/js-api-client)

JS Client wrapper for Typeform API

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
  - [Initialize](#initialize)
- [Reference](#reference)
  - [Create Client](#createclienttoken)
  - [Forms](#forms)
  - [Images](#images)
  - [Teams](#teams)
  - [Themes](#themes)
  - [Workspaces](#workspaces)
  - [Responses](#responses)
  - [Webhooks](#webhooks)
- [Examples](#examples)
- [Testing](#testing)
- [Suggestions](#suggestions-or-feedback)

## Installation

``` bash
# install with yarn
yarn add @typeform/api-client

# install with npm
npm install @typeform/api-client --save
```

## Usage

### Initialize

1. Import client library
``` javascript
  import { createClient } from '@typeform/api-client'
```

2. Create a instance with your personal token
``` javascript
  const typeformAPI = createClient({
    token: '<your token>'
  })
```

3. Use any of the methods available in the [reference](#reference)
``` javascript
  // will retrieve all forms
  typeformAPI
    .forms
    .list()
    .then(response => {
      // do what do you want with your typeforms
    })
```

## Reference

#### `createClient({token})`
- Creates a new instance of Typeform's JS client
- Returns an instance with the methods described below
``` javascript
  const typeformClient = createClient({
    token: '<your token>'
  })
```

Client returns the following properties:
- `forms`
- `images`
- `teams`
- `workspaces`
- `themes`
- `responses`
- `webhooks`

Each one of them encapsulates the operations related to it (like listing, updating, deleting the resource).

### Forms 

#### `forms.list({ page: 1, pageSize = 10, search = '', page })`
- Get a list of your typeforms
- Returns a list of typeform with the payload [referenced here](https://developer.typeform.com/create/reference/retrieve-forms/).

#### `forms.get({ uid })`
- Get a typeform by UID
- Returns a typeform with the payload [referenced here](https://developer.typeform.com/create/reference/retrieve-form/).

#### `forms.update({ uid, data = {}, override = false })`
- Update a typeform by UID
- Returns a typeform with the payload [referenced here](https://developer.typeform.com/create/reference/update-form/).

#### `forms.delete({ uid })`

#### `forms.messages.get({ uid })`
- Get custom messages of a given UID

#### `forms.messages.update({ uid })`
- Updates custom messages typeform for the given UID

### Images

#### `images.list()`
- Gets your images collection

#### `images.get({ id, returns, size, backgroundSize, choiceSize })`
- Get custom image by ID
- `returns`: json, binary (default)
- `size`: default, thumbnail, mobile,
- `backgroundSize`: default, thumbnail, mobile, tablet
- `choiceSize`: default, thumbnail, supersize, supermobile, supersizefit, supermobilefit

#### `images.add({ image, mediaType, fileName })`
- Update an image to Typeform

#### `images.delete({ id })`
- Deletes an image with the given ID

### Teams

#### `teams.get({ id })`
- Gets team information for the given ID

#### `teams.addMembers({ id, members })`
- Add members to a team for the given ID
- `members`: `string` or an `array` and should be the email fo the user
- Adding multiple members at once is possible using an array of emails

#### `teams.removeMembers({ id, members })`
- Remove members to a team for the given ID
- `members`: `string` or an `array` and should be the email fo the user
- Deleting multiple members at once is possible using an array of emails

### Themes

#### `themes.list({ page, pageSize })`
- Gets your themes collection
- `page`: default `1`
- `pageSize: default `10` 

#### `themes.get({ id })`
- Gets a theme for the given ID

#### `themes.create({ background, colors, font, hasTransparentButton, name })`
- Creates a theme with the given configuration
- See more details of the payload in [the documentation](https://developer.typeform.com/create/reference/create-theme/)

#### `themes.update({ background, colors, font, hasTransparentButton, name })`
- Creates a theme with the given configuration
- See more details of the payload in [the documentation](https://developer.typeform.com/create/reference/update-theme/)

#### `themes.delete({ id })`
- Deletes the theme with the given ID

### Workspaces

#### `workspaces.list({ page, pageSize, search })`
- Gets your workspaces
- `page`: default `1`
- `pageSize`: default `10` 
- `search`: search a workspace that partially matches the search string

#### `workspaces.get({ id })`
- Gets the workspace information for the given ID

#### `workspaces.update({ id, data })`
- Gets the workspace information for the given ID
- `data`: operation that is wanted to perform, see more details in [the documentation](https://developer.typeform.com/create/reference/update-workspace/)

#### `workspaces.delete({ id })`
- Deletes the workspace for the given ID

#### `workspaces.get({ id })`
- Gets the workspace information for the given ID

#### `workspaces.addMembers({ id, members })`
- Add members to a workspace for the given ID
- `members`: `string` or an `array` and should be the email fo the user
- Adding multiple members at once is possible using an array of emails

#### `workspaces.removeMembers({ id, members })`
- Remove members from a workspace for the given ID
- `members`: `string` or an `array` and should be the email fo the user
- Removing multiple members at once is possible using an array of emails

### Responses

#### `responses.list({ uid, pageSize, since, until, after, before, completed, sort, query, fields })`
- List responses from the given ID
- `uid`: typeform UID
- For parameter details check [the documentation](https://developer.typeform.com/responses/reference/retrieve-responses/)

### Webhooks

#### `webhook.get({ uid, tag })`
- Get detailf for a webhook with the given tag
- `uid`: typeform UID
- `tag`: tag of the webhook created

#### `webhook.create({ uid, tag, url, enable = false })`
- Create a webhook with the given tag
- `uid`: typeform UID
- `tag`: (string) tag of the webhook, how are you going to identify it
- `url`: (string) url of the service you want to notify
- `enable`: (bool)

#### `webhook.update({ uid, tag, url, enable = false })`
- Update a webhook with the given tag
- `uid`: typeform UID
- `tag`: (string) tag of the webhook, how are you going to identify it
- `url`: (string) url of the service you want to notify
- `enable`: (bool)

#### `webhook.delete({ uid, tag })`
- Delete a webhook with the given tag for a given typeform
- `uid`: typeform UID
- `tag`: (string) tag of the webhook

## Examples

##### Update specific typeform property, as [referenced here](https://developer.typeform.com/create/reference/update-form-patch/)

``` javascript
  typeformClient
    .forms
    .update({
      uid: 'asdf',
      data: [
        {
          "op": "replace",
          "path": "/title",
          "value": 'new title'
        }
      ]
    })
    .then(response => {
      //... 
    })
```

##### Update the whole typeform

``` javascript
  typeformClient
    .forms
    .update({
      uid: 'asdf',
      override: true,
      data: {
        "title": newTitle,
        "theme": {
          "href": "https://api.typeform.com/themes/6lPNE6"
        }
      }
    })
    .then(response => {
      //... 
    })
```

**Note:**
The theme property applies a `theme` to the form. If you don't specify a value for the 'theme' property, Typeform applies a new copy of the default theme to the form, **even if you already have a copy of the default theme applied to this form**. 

##### Uploading an image
``` javascript
  typeformClient
    .images
    .add({
      image: "bGRqZmxzZGpmbHNoZmtoc2RrZmpoc2tqZA==",
      mediaType: "image/gif",
      fileName: "newimage.gif"
    })
    .then(response => {
      //...
    })

```

##### Getting the thumbnail of an image

``` javascript
  typeformClient
    .images
    .get({ id: 'asdf', size: 'thumbnail' })
    .then(response => {
      //...
    })

```

### Testing

To run unit tests.

``` bash
yarn install

# Runs unit tests
yarn test:unit

```

### Suggestions or feedback?

Fill out this [conversation](https://bit.ly/2wmzCXi) 🙂
