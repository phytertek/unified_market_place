# enmapi API Authentication component

## by enmapi

### Dependencies

```
* enmapi
* bcrypt
* jwt-simple
* express-useragent
* object-hash
```

### Routes

```
|- {HOST}/auth
|- /register -- POST -- { email, password }
|-- registers new user, returns auth token

|- /update -- POST -- Authenticated -- { email, password }
|-- updates supplied values

|- /login -- POST -- { email, password }
|-- tests credentials, returns active or new auth token

|- /logout -- GET -- Authenticated
|-- removes active token
```

### Schema

```
|- User
|- email -- String -- required -- unique
|- password -- String -- required
|- activeTokens -- Array -- Ref: Token
|- Token
|- user -- String -- Ref: User
|- token -- String -- required -- unique
|- source -- Object -- required
|- created_date -- Date - required -- default Now()
|- expire_date -- Date - required -- default Now() + Days(n)
```

### Services

```
|- Authentication
|- authorizeRoute -- route middleware for JWT authentication
```

```

```
