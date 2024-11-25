from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import mysql.connector
from typing import List
from models.article import Article


class Personne(BaseModel):
    nom: str
    age: int




app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your frontend's URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Database connection
def get_db_connection():
    connection = mysql.connector.connect(
        host='localhost',
        user='user',
        password='user',
        database='projet_application_repartie'
    )
    return connection

@app.get("/personnel")
async def all():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM personnel')
    rows = cursor.fetchall()
    cursor.close()
    connection.close()
    return rows

@app.get("/relevessanitaires")
async def all():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM relevessanitaires')
    rows = cursor.fetchall()
    cursor.close()
    connection.close()
    return rows


@app.get("/articleschainemontage")
async def all():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM articleschainemontage')
    rows = cursor.fetchall()
    cursor.close()
    connection.close()
    return rows

@app.post("/articleschainemontage")
async def create_article(article: Article):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    # Adjust the SQL query and fields based on your database schema
    query = '''
    INSERT INTO articleschainemontage 
    (IdentifiantProduit, Zone, EtatEmballage, Responsable, Position, Rotation, Collisions)
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    '''
    data = (
        article.IdentifiantProduit,
        article.Zone,
        article.EtatEmballage,
        article.Responsable,
        article.Position,
        article.Rotation,
        article.Collisions
    )
    
    cursor.execute(query, data)
    connection.commit()
    cursor.close()
    connection.close()
    
    return {**article.dict()}  # Assuming `Article` has a `dict` method for serialization


