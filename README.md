# Typeform JavaScript SDK

JS Client wrapper for Typeform API

## Installation

## Usage

1. Import client library
``` javascript
  import {createClient} from 'typeform-js-sdk'
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
    .getForms()
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

#### `getForms()`
- Get a list of your typeforms
- Returns a list of typeform with the payload [refenced here](https://developer.typeform.com/create/reference/retrieve-forms/).
``` javascript
  const forms = typeformClient
    .getForms()
    .then(response => {
      //... 
    })

```

#### `getForm({ uid })`
- Get a typeform by UID
- Returns a typeform with the payload [refenced here](https://developer.typeform.com/create/reference/retrieve-form/).
``` javascript
  const form = typeformClient
    .getForm({ uid: 'asdf' })
    .then(response => {
      //... 
    })

```

#### `updateForm({ uid, data = {}, override: false })`
- Get a typeform by UID
- Returns a typeform with the payload [refenced here](https://developer.typeform.com/create/reference/retrieve-form/).

##### Update specific typeform property, as [referenced here](https://developer.typeform.com/create/reference/update-form-patch/)

``` javascript
  const form = typeformClient
    .updateForm({
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
  const form = typeformClient
    .updateForm({
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

#### `deleteForm({ uid })`
- Deletes a typeform by UID
``` javascript
  const form = typeformClient
    .removeForm({ uid: 'asdf' })
    .then(response => {
      //... removed typeform :( 
    })

```
