# API Documentation

## Base URL: `/api`

### Endpoints

#### GET `/documents`
Retrieves all documents.

**Response**
```json
[
  {
    "type": "bank-draft",
    "title": "Bank Draft",
    "position": 0,
    "thumbnail": "https://picsum.photos/seed/bank/300/200"
  }
]
```

#### GET `/documents/:type`
Retrieves a specific document by type.

**Response**
```json
{
  "type": "bank-draft",
  "title": "Bank Draft",
  "position": 0,
  "thumbnail": "https://picsum.photos/seed/bank/300/200"
}
```

#### PUT `/documents`
Updates multiple documents (used for reordering).

**Request**
```json
[
  {
    "type": "bank-draft",
    "title": "Bank Draft",
    "position": 1,
    "thumbnail": "https://picsum.photos/seed/bank/300/200"
  }
]
```

**Response**
Same as request if successful.

### Error Handling

All endpoints return appropriate HTTP status codes:
- 200: Success
- 201: Created
- 204: No Content (for successful deletions)
- 400: Bad Request
- 404: Not Found
- 500: Server Error

### Mock Implementation

- Uses MSW (Mock Service Worker) for API simulation
- 2000ms artificial delay on all requests
- Data persisted in localStorage
- Automatic position reordering on updates