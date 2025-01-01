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
        user='root',
        password='',
        database='projet_application_repartie',
        port=3308

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

@app.get("/count_personnel_rh")
async def count_personnel_rh():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT COUNT(*) as count FROM personnel WHERE service="ressources humaines"')
    result = cursor.fetchone()
    cursor.close()
    connection.close()
    return {"count": result['count']}

@app.get("/formations")
async def all():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM formations')
    rows = cursor.fetchall()
    cursor.close()
    connection.close()
    return rows

@app.get("/formations_rh")
async def formations_rh():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM formations WHERE sujet="ressources humaines"')
    rows = cursor.fetchall()
    cursor.close()
    connection.close()
    return rows

@app.get("/forma_max_motivation")
async def get_max_motivation_formation():
    """
    Récupère la formation en ressources humaines avec le plus haut pourcentage d'engagement.
    """
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        
        query = (
            """
            SELECT NomFormation, PourcentageEngagement
            FROM formations 
            WHERE Sujet = %s AND PourcentageEngagement = (
                SELECT MAX(PourcentageEngagement) 
                FROM formations 
                WHERE Sujet = %s
            )
            """
        )
        sujet = "ressources humaines"
        cursor.execute(query, (sujet, sujet))
        rows = cursor.fetchall()
        
    except Exception as e:
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

    return rows

@app.get("/nb_articles_emballage_correct")
async def get_articles_with_correct_packaging():
    """
    Récupère le nombre d'articles avec un emballage correct.
    """
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        
        query = """
            SELECT COUNT(*) AS NombreArticles 
            FROM articleschainemontage 
            WHERE EtatEmballage = %s
        """
        etat = "Correct"
        cursor.execute(query, (etat,))
        rows = cursor.fetchall()
        
    except Exception as e:
        return {"error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

    return rows

@app.get("/has_personnel_rh")
async def has_personnel_rh():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT COUNT(*) as count FROM personnel WHERE service="ressources humaines"')
    result = cursor.fetchone()
    cursor.close()
    connection.close()
    return {"has_personnel_rh": result['count'] > 0}

@app.get("/relevessanitaires")
async def all():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM relevessanitaires')
    rows = cursor.fetchall()
    cursor.close()
    connection.close()
    return rows

@app.get("/relevessanitaires/max_temp")
async def max_temp():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT Zone, max(TemperatureAir) as max_temp FROM relevessanitaires')
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

@app.get("/Commercial/A")
async def less_collisions():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM articleschainemontage ORDER BY Collisions ASC LIMIT 1')
    article = cursor.fetchall()
    cursor.close()
    connection.close()
    return article


