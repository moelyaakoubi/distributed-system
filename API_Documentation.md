
# API Documentation for Personnel Management System

## Base URL
`http://localhost:8000`

---

## Endpoints

### 1. Get All Personnel
- **Endpoint**: `/personnel`
- **Method**: `GET`
- **Description**: Retrieves a list of all personnel in the database.
- **Response**:
  ```json
  [
    {
      "id": 1,
      "name": "John Doe",
      "service": "IT",
      "age": 30
    },
    ...
  ]
  ```

---

### 2. Count Personnel in HR
- **Endpoint**: `/count_personnel_rh`
- **Method**: `GET`
- **Description**: Counts the number of personnel in the "Human Resources" service.
- **Response**:
  ```json
  {
    "count": 5
  }
  ```

---

### 3. Get All Formations
- **Endpoint**: `/formations`
- **Method**: `GET`
- **Description**: Retrieves a list of all formations available.
- **Response**:
  ```json
  [
    {
      "id": 1,
      "NomFormation": "Leadership Training",
      "Sujet": "Management",
      ...
    },
    ...
  ]
  ```

---

### 4. Get Formations in HR
- **Endpoint**: `/formations_rh`
- **Method**: `GET`
- **Description**: Retrieves all formations related to "Human Resources."
- **Response**:
  ```json
  [
    {
      "id": 2,
      "NomFormation": "Conflict Resolution",
      "Sujet": "Human Resources",
      ...
    },
    ...
  ]
  ```

---

### 5. Get Formation with Maximum Engagement in HR
- **Endpoint**: `/forma_max_motivation`
- **Method**: `GET`
- **Description**: Retrieves the HR-related formation with the highest engagement percentage.
- **Response**:
  ```json
  [
    {
      "NomFormation": "Effective Communication",
      "PourcentageEngagement": 95
    }
  ]
  ```

---

### 6. Check if HR Personnel Exists
- **Endpoint**: `/has_personnel_rh`
- **Method**: `GET`
- **Description**: Checks whether there are personnel in the HR service.
- **Response**:
  ```json
  {
    "has_personnel_rh": true
  }
  ```

---

### 7. Get All Sanitary Records
- **Endpoint**: `/relevessanitaires`
- **Method**: `GET`
- **Description**: Retrieves all sanitary records from the database.
- **Response**:
  ```json
  [
    {
      "id": 1,
      "Zone": "Warehouse A",
      "TemperatureAir": 22.5,
      ...
    },
    ...
  ]
  ```

---

### 8. Get Maximum Air Temperature in Sanitary Records
- **Endpoint**: `/relevessanitaires/max_temp`
- **Method**: `GET`
- **Description**: Retrieves the maximum air temperature recorded in any sanitary zone.
- **Response**:
  ```json
  [
    {
      "Zone": "Warehouse B",
      "max_temp": 35.6
    }
  ]
  ```

---

### 9. Get All Articles on Assembly Line
- **Endpoint**: `/articleschainemontage`
- **Method**: `GET`
- **Description**: Retrieves all articles currently in the assembly line.
- **Response**:
  ```json
  [
    {
      "id": 1,
      "IdentifiantProduit": "ABC123",
      "Zone": "Assembly Zone 1",
      "EtatEmballage": "Correct",
      ...
    },
    ...
  ]
  ```

---

### 10. Create New Article
- **Endpoint**: `/articleschainemontage`
- **Method**: `POST`
- **Description**: Adds a new article to the assembly line.
- **Request Body**:
  ```json
  {
    "IdentifiantProduit": "ABC123",
    "Zone": "Assembly Zone 1",
    "EtatEmballage": "Correct",
    "Responsable": "John Smith",
    "Position": "Left",
    "Rotation": 30,
    "Collisions": 0
  }
  ```
- **Response**:
  ```json
  {
    "IdentifiantProduit": "ABC123",
    "Zone": "Assembly Zone 1",
    "EtatEmballage": "Correct",
    "Responsable": "John Smith",
    "Position": "Left",
    "Rotation": 30,
    "Collisions": 0
  }
  ```

---

### 11. Get Article with Fewest Collisions
- **Endpoint**: `/Commercial/A`
- **Method**: `GET`
- **Description**: Retrieves the article with the fewest collisions on the assembly line.
- **Response**:
  ```json
  [
    {
      "id": 2,
      "IdentifiantProduit": "DEF456",
      "Zone": "Assembly Zone 2",
      "Collisions": 1
    }
  ]
  ```

---

### 12. Get Articles with Correct Packaging
- **Endpoint**: `/nb_articles_emballage_correct`
- **Method**: `GET`
- **Description**: Counts the number of articles with "Correct" packaging on the assembly line.
- **Response**:
  ```json
  {
    "NombreArticles": 15
  }
  ```

---

## Interactive API Documentation
FastAPI automatically generates Swagger UI and ReDoc for the above endpoints:

- Swagger UI: Visit `/docs` on the base URL (e.g., `http://localhost:8000/docs`)
- ReDoc: Visit `/redoc` on the base URL (e.g., `http://localhost:8000/redoc`)

Both provide interactive, user-friendly interfaces to test and explore the API.
