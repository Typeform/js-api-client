# Typeform JavaScript SDK

JS Client wrapper for Typeform API

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
  - [Initialise](#initialise)
- [Reference](#reference)
  - [Create Client](createclienttoken)
  - [Forms](#forms)
  - [Images](#images)
  - [Teams](#teams)
  - [Themes](#themes)
  - [Workspaces](#workspaces)
- [Testing](#testing)
- [Suggestions](#suggestions)

## Installation

``` bash
# install with yarn
yarn add @typeform/js

# install with npm
npm install @typeform/js --save
```

## Usage

### Intialise

1. Import client library
``` javascript
  import {createClient} from '@typeform/js'
```

2. Create a instance with your personal token
``` javascript
  const typeformAPI = createClient({
    token: '<your token>'
  })
```

3. Use any of the methods available in the reference
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

Each one of them encapsulates the operations related to it (like listing, updating, deleting the resource).

### Forms 

#### `forms.list({ page: 1, page_size: 10, search: '' })`
- Get a list of your typeforms
- Returns a list of typeform with the payload [refenced here](https://developer.typeform.com/create/reference/retrieve-forms/).
``` javascript
  typeformClient
    .forms
    .list()
    .then(response => {
      //... 
    })

```

#### `forms.get({ uid })`
- Get a typeform by UID
- Returns a typeform with the payload [refenced here](https://developer.typeform.com/create/reference/retrieve-form/).
``` javascript
  typeformClient
    .forms
    .get({ uid: 'asdf' })
    .then(response => {
      //... 
    })

```

#### `forms.update({ uid, data = {}, override: false })`
- Get a typeform by UID
- Returns a typeform with the payload [refenced here](https://developer.typeform.com/create/reference/retrieve-form/).

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

#### `forms.delete({ uid })`
- Deletes a typeform by UID
``` javascript
  typeformClient
    .forms
    .delete({ uid: 'asdf' })
    .then(response => {
      //... removed typeform :( 
    })

```

#### `forms.messages.get({ uid })`
- Get custom messages typeform of a given UID
``` javascript
  typeformClient
    .forms
    .messages
    .get({ uid: 'asdf' })
    .then(response => {
      //...
    })

```

#### `forms.messages.update({ uid })`
- Updates custom messages typeform of a given UID
``` javascript
  typeformClient
    .forms
    .messages
    .update({ uid: 'asdf' })
    .then(response => {
      //...
    })

```

### Images

#### `images.list()`
- Get your images collection
``` javascript
  typeformClient
    .images
    .list()
    .then(response => {
      //...
    })

```

#### `images.get({ id, returns, size, backgroundSize, choiceSize })`
- Get custom image by ID
- `returns`: json, binary (default)
- `size`: default, thumbnail, mobile,
- `backgroundSize`: default, thumbnail, mobile, tablet
- `choiceSize`: default, thumbnail, supersize, supermobile, supersizefit, supermobilefit
``` javascript
  typeformClient
    .images
    .get({ id: 'asdf', size: 'thumbnail' })
    .then(response => {
      //...
    })

```

#### `images.add({ image, media_type, file_name })`
- Update an image to Typeform
``` javascript
  typeformClient
    .images
    .add({
      "image": "bGRqZmxzZGpmbHNoZmtoc2RrZmpoc2tqZA==",
      "media_type": "image/gif",
      "file_name": "newimage.gif"
    })
    .then(response => {
      //...
    })

```

#### `images.delete({ id })`
- Deletes an image with the given ID
``` javascript
  typeformClient
    .images
    .remove({ id: 'asdf' })
    .then(response => {
      //...
    })

```

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

#### `themes.list({ page, page_size })`
- Gets your themes collection
- `page`: default `1`
- `page_size: default `10` 

#### `themes.get({ id })`
- Gets a theme for the given ID

#### `themes.create({ background, colors, font, has_transparent_button, name })`
- Creates a theme with the given configuration
- See more details of the payload in [the documentation](https://developer.typeform.com/create/reference/create-theme/)

#### `themes.update({ background, colors, font, has_transparent_button, name })`
- Creates a theme with the given configuration
- See more details of the payload in [the documentation](https://developer.typeform.com/create/reference/update-theme/)

#### `themes.delete({ id })`
- Deletes the theme with the given ID

### Workspaces

#### `workspaces.list({ page, page_size, search })`
- Gets your workspaces
- `page`: default `1`
- `page_size: default `10` 
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
- Remove members to a workspace for the given ID
- `members`: `string` or an `array` and should be the email fo the user
- Removing multiple members at once is possible using an array of emails

### Testing

The project has implemeted unit and integration tests.

##### Unit test:
``` javascript
yarn install
yarn test:unit
```

##### Integration test:
``` javascript
yarn install
TYPEFORM_TOKEN='<your personal token>' yarn test:integration
```

### Suggestions

Fill out this [typeform](https://jepser.typeform.com/to/q2JHJw) 🙂
