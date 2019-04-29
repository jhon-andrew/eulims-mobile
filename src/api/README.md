API Documentation
===

| Endpoint         | Description                                         |
| ---------------- | --------------------------------------------------- |
| `/server-status` | Check if current server is online.                  |
| `/login`         | Authenticate a user.                                |
| `/user`          | Get currently authenticated user.                   |
| `/sampleCode`    | Search for sample codes.                            |
| `/analysis`      | Get analysis data based from the given Sample Code. |

---

## Example Requests
---

### `/server-status`
> Check if current server is online.

Method: `GET`

Sample Response:

```json
{
  "status": "online"
}  
```
---

### `/login`
> Authenticate a user.

Method: `POST`

Sample POST Data:
```json
{
  "email": "anecbook@gmail.com",
  "password": "123456"
}
```

Sample Response:
```json
// If authentication passed:
{
  "token": "W29iamVjdCBPYmplY3Rd",
  "user": {
    "email": "anecbook@gmail.com",
    "firstName": "Jhon Andrew",
    "middleInitial": "Q",
    "lastName": "Baes",
    "userType": "Laboratory Manager"
  }
}

// If authentication fails:
{
  "error": "Either username or password is incorrect."
}
```
---

### `/user`
> Get currently authenticated user.

Method: `GET`

Requires a valid `token` provided as a parameter.

Sample GET Data:
```json
{
  "token": "abcde12345"
}
```

Sample Response:
```json
{
  "token": "W29iamVjdCBPYmplY3Rd",
  "user": {
    "email": "anecbook@gmail.com",
    "firstName": "Jhon Andrew",
    "middleInitial": "Q",
    "lastName": "Baes",
    "userType": "Laboratory Manager"
  }
}
```
---

### `/sampleCode`
> Search for sample codes that starts with the given query.

Method: `GET`

Requires a valid `token` provided as a parameter.

Sample GET Data:
```json
{
  "token": "abcde12345",
  "q": "CHE-08"
}
```

Sample Response:
```json
{
  "sampleCodes": [
    {
      "id": 1,
      "text": "CHE-0810"
    },
    {
      "id": 2,
      "text": "CHE-0811"
    },
    {
      "id": 3,
      "text": "CHE-0812"
    }
  ]
}
```
---

### `/analysis`
> Get analysis data based from the given Sample Code.

Method: `GET`

Sample GET Data:
```json
{
  "token": "abcde12345",
  "id": "CHE-0812"
}
```

Sample Response:
```json
// If sample code exist
{
  "sampleCode": "CHE-0812",
  "samples": [
    {
      "name": "Oil",
      "description": "Scheme: QFCS, Round: FC221, Sample: 778-Fat Quality Storage: 2-8 C, approx. 150 g sample, in an amber glass bottle."
    }
  ],
  "tests": [
    {
      "id": 1,
      "name": "Package B",
      "method": null,
      "progress": 0,
      "workflow": 6,
      "status": "pending",
      "procedures": [
        {
          "procedure": "Oxidation",
          "startDate": "2019-04-29",
          "endDate": "2019-04-29",
          "status": "pending"
        }
      ]
    }
  ]
}

// If sample code does NOT exist
{
  "error": "Sample code does not exist."
}
```
---
